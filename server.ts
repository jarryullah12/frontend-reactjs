import express from "express";
import path from "path";
import { createServer as createHttpServer } from "http";
import { createServer as createViteServer, loadEnv } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables from .env file
const env = loadEnv('', process.cwd(), '');

async function startServer() {
  const app = express();
  const PORT = 5000;

  app.use("/_supabase", express.raw({ type: "*/*", limit: "10mb" }), async (req, res) => {
    // Read REAL Supabase URL directly from .env to avoid proxy loops
    const envFile = loadEnv('', process.cwd(), '');
    const realSupabaseUrl = process.env.VITE_SUPABASE_URL || envFile.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || envFile.VITE_SUPABASE_ANON_KEY;

    if (!realSupabaseUrl || !supabaseAnonKey || realSupabaseUrl.includes('_supabase')) {
      console.error("[Supabase Proxy] Invalid target URL:", realSupabaseUrl);
      return res.status(500).json({ error: "Supabase server proxy is not configured correctly." });
    }

    const targetUrl = realSupabaseUrl.replace(/\/$/, "") + req.originalUrl.replace(/^\/_supabase/, "");
    console.log(`[Supabase Proxy] ${req.method} ${targetUrl}`);

    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") headers[key] = value;
    }

    delete headers["host"];
    delete headers["connection"];
    delete headers["content-length"];

    headers["apikey"] = supabaseAnonKey;

    const incomingAuth = headers["authorization"];
    const incomingToken =
      typeof incomingAuth === "string" && incomingAuth.toLowerCase().startsWith("bearer ")
        ? incomingAuth.slice(7).trim()
        : "";

    if (!incomingToken || incomingToken === "public-anon" || incomingToken === "placeholder_key") {
      headers["authorization"] = `Bearer ${supabaseAnonKey}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s server-side timeout

      const fetchOptions: any = {
        method: req.method,
        headers,
        signal: controller.signal
      };

      if (req.method !== "GET" && req.method !== "HEAD" && req.body && Buffer.isBuffer(req.body) && req.body.length > 0) {
        fetchOptions.body = req.body;
      }

      console.log(`[Supabase Proxy] Fetching ${targetUrl}...`);
      const response = await fetch(targetUrl, fetchOptions);
      clearTimeout(timeoutId);
      console.log(`[Supabase Proxy] Response: ${response.status} ${response.statusText}`);

      res.status(response.status);
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === "content-encoding") return;
        res.setHeader(key, value);
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      res.send(buffer);
    } catch (error: any) {
      console.error(`[Supabase Proxy] Error: ${error.message}`);
      res.status(502).json({ error: "Supabase proxy request failed", message: error?.message || String(error) });
    }
  });

  app.use(express.json({ limit: '10mb' }));

  // Gemini API Endpoint
  app.post("/api/gemini", async (req, res) => {
    const { type, payload } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;

    console.log(`[Gemini API] Request: ${type}`, payload ? "(payload present)" : "(no payload)");

    if (!apiKey) {
      console.error("[Gemini API] GEMINI_API_KEY is missing in environment");
      return res.status(500).json({ error: "Gemini API Key is not configured on the server." });
    }

    try {
      const genAI = new GoogleGenAI({ apiKey });
      const modelName = "gemini-3.1-flash-lite"; // Requested by user
      
      console.log(`[Gemini API] Using model: ${modelName}`);

      switch (type) {
        case "generateSummary":
          const summaryResult = await genAI.models.generateContent({
             model: modelName,
             contents: `Generate a compelling professional summary for a ${payload.jobTitle} with these skills: ${payload.skills.join(', ')}. Keep it under 60 words and make it impactful.`
          });
          res.json({ text: summaryResult.text });
          break;

        case "improveBullet":
          const bulletResult = await genAI.models.generateContent({
             model: modelName,
             contents: `Improve the following resume bullet point to be more achievement-oriented and professional: "${payload.bullet}". Use action verbs and metrics if possible. Keep it to a single sentence.`
          });
          res.json({ text: bulletResult.text });
          break;

        case "generateCoverLetter":
          const coverResult = await genAI.models.generateContent({
             model: modelName,
             contents: `Write a professional cover letter for a ${payload.myJobTitle} position at ${payload.recipientCompany}. 
            My skills include: ${payload.mySkills.join(', ')}. 
            Highlight this experience: "${payload.myExperience}".
            Keep it to 3 short paragraphs. The tone should be confident but professional. 
            Do not include placeholders like [Your Name], just write the body content.`
          });
          res.json({ text: coverResult.text });
          break;

        case "analyzeAts":
          const atsParts: any[] = [];
          if (payload.text) {
            atsParts.push({ text: `Resume Content:\n${payload.text}\n\n` });
          } else if (payload.base64Data && payload.mimeType) {
            atsParts.push({ inlineData: { mimeType: payload.mimeType, data: payload.base64Data } });
          } else {
             return res.status(400).json({ error: "Missing resume data" });
          }
          atsParts.push({ text: `Analyze this resume for ATS (Applicant Tracking System) compatibility. 
                   Provide a strict score out of 100.
                   Identify critical issues (formatting, keywords, structure).
                   List missing keywords that are common for this type of role.
                   Return ONLY a valid JSON object.` });

          const atsResponse = await genAI.models.generateContent({
             model: modelName,
             contents: atsParts,
             config: {
               responseMimeType: "application/json",
               responseSchema: {
                 type: Type.OBJECT,
                 properties: {
                   score: { type: Type.NUMBER },
                   summary: { type: Type.STRING },
                   issues: { type: Type.ARRAY, items: { type: Type.STRING } },
                   missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                   verdict: { type: Type.STRING }
                 }
               }
             }
          });
          res.json(JSON.parse(atsResponse.text || '{}'));
          break;

        case "parseResume":
          const parseResponse = await genAI.models.generateContent({
             model: modelName,
             contents: `Parse the following resume text and convert it into a structured JSON format.
                
                Text:
                ${payload.text}
                
                Return ONLY a valid JSON object following this schema:
                {
                  "personalInfo": {
                    "fullName": string,
                    "email": string,
                    "phone": string,
                    "location": string,
                    "website": string,
                    "summary": string,
                    "jobTitle": string
                  },
                  "experience": [
                    {
                      "company": string,
                      "position": string,
                      "startDate": string,
                      "endDate": string,
                      "description": string
                    }
                  ],
                  "education": [
                    {
                      "school": string,
                      "degree": string,
                      "field": string,
                      "startDate": string,
                      "endDate": string
                    }
                  ],
                  "skills": string[],
                  "languages": string[],
                  "projects": [
                    {
                      "name": string,
                      "link": string,
                      "description": string
                    }
                  ],
                  "references": [
                    {
                      "name": string,
                      "company": string,
                      "email": string,
                      "phone": string
                    }
                  ]
                }`,
             config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  personalInfo: {
                    type: Type.OBJECT,
                    properties: {
                      fullName: { type: Type.STRING },
                      email: { type: Type.STRING },
                      phone: { type: Type.STRING },
                      location: { type: Type.STRING },
                      website: { type: Type.STRING },
                      summary: { type: Type.STRING },
                      jobTitle: { type: Type.STRING }
                    }
                  },
                  experience: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        company: { type: Type.STRING },
                        position: { type: Type.STRING },
                        startDate: { type: Type.STRING },
                        endDate: { type: Type.STRING },
                        description: { type: Type.STRING }
                      }
                    }
                  },
                  education: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        school: { type: Type.STRING },
                        degree: { type: Type.STRING },
                        field: { type: Type.STRING },
                        startDate: { type: Type.STRING },
                        endDate: { type: Type.STRING }
                      }
                    }
                  },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  languages: { type: Type.ARRAY, items: { type: Type.STRING } },
                  projects: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        link: { type: Type.STRING },
                        description: { type: Type.STRING }
                      }
                    }
                  },
                  references: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        company: { type: Type.STRING },
                        email: { type: Type.STRING },
                        phone: { type: Type.STRING }
                      }
                    }
                  }
                }
              }
            }
          });
          res.json(JSON.parse(parseResponse.text || '{}'));
          break;

        default:
          res.status(400).json({ error: "Invalid request type" });
      }
    } catch (error: any) {
      console.error("Gemini Error:", error);
      const errorMessage = error.message || error.toString();
      res.status(500).json({ error: `AI processing failed: ${errorMessage}` });
    }
  });

  const httpServer = createHttpServer(app);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: { server: httpServer } },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
