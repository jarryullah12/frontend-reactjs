import express from "express";
import path from "path";
import { createServer as createHttpServer } from "http";
import { createServer as createViteServer, loadEnv } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env file
const MODE = process.env.NODE_ENV === "production" ? "production" : "development";
const env = loadEnv(MODE, process.cwd(), '');

async function startServer() {
  const app = express();
  const PORT = 5000;

  app.use("/_supabase", express.raw({ type: "*/*", limit: "10mb" }), async (req, res) => {
    // Read REAL Supabase URL directly from .env to avoid proxy loops
    const envFile = loadEnv(MODE, process.cwd(), '');
    const realSupabaseUrl = process.env.VITE_SUPABASE_URL || envFile.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || envFile.VITE_SUPABASE_ANON_KEY;

    if (!realSupabaseUrl || !supabaseAnonKey || realSupabaseUrl.includes('_supabase')) {
      console.error("[Supabase Proxy] Invalid target URL:", realSupabaseUrl);
      return res.status(500).json({ error: "Supabase server proxy is not configured correctly." });
    }

    const targetUrl = realSupabaseUrl.replace(/\/$/, "") + req.originalUrl.replace(/^\/_supabase/, "");
    console.log(`[Supabase Proxy] ${req.method} ${targetUrl}`);
    console.log(`[Supabase Proxy] Headers: ${JSON.stringify(Object.keys(req.headers))}`);

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

    // If no token or placeholder token, use the real anon key
    const isPlaceholder = !incomingToken || 
                         incomingToken === "public-anon" || 
                         incomingToken === "placeholder_key" || 
                         incomingToken === "undefined" || 
                         incomingToken === "null";

    if (isPlaceholder) {
      console.log(`[Supabase Proxy] Using Anon Key for ${req.method} ${targetUrl}`);
      headers["authorization"] = `Bearer ${supabaseAnonKey}`;
    } else {
      console.log(`[Supabase Proxy] Using User Token (${incomingToken.substring(0, 10)}...) for ${req.method} ${targetUrl}`);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s server-side timeout

      const wantsAuthRedirect =
        typeof req.originalUrl === "string" && req.originalUrl.startsWith("/_supabase/auth/v1/authorize");

      const fetchOptions: any = {
        method: req.method,
        headers,
        signal: controller.signal,
        redirect: wantsAuthRedirect ? "manual" : "follow"
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
      if (response.status >= 400) {
        console.error(`[Supabase Proxy] Error response: ${response.status}`, buffer.toString());
      }
      res.send(buffer);
    } catch (error: any) {
      console.error(`[Supabase Proxy] Error: ${error.message}`);
      res.status(502).json({ error: "Supabase proxy request failed", message: error?.message || String(error) });
    }
  });

  app.use(express.json({ limit: '10mb' }));

  const getServerSupabase = () => {
    const envFile = loadEnv(MODE, process.cwd(), '');
    const realSupabaseUrl = process.env.VITE_SUPABASE_URL || envFile.VITE_SUPABASE_URL;
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY || envFile.VITE_SUPABASE_ANON_KEY;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || envFile.SUPABASE_SERVICE_ROLE_KEY;

    if (!realSupabaseUrl || !anonKey) {
      throw new Error("Supabase URL/Key missing on server");
    }

    const keyToUse = serviceRoleKey || anonKey;
    return createClient(realSupabaseUrl, keyToUse, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
    });
  };

  app.delete("/api/account", async (req, res) => {
    try {
      const envFile = loadEnv(MODE, process.cwd(), '');
      const realSupabaseUrl = process.env.VITE_SUPABASE_URL || envFile.VITE_SUPABASE_URL;
      const anonKey = process.env.VITE_SUPABASE_ANON_KEY || envFile.VITE_SUPABASE_ANON_KEY;
      const serviceRoleKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY || envFile.SUPABASE_SERVICE_ROLE_KEY;

      if (!realSupabaseUrl || !anonKey) {
        return res.status(500).json({ error: "Supabase URL/Key missing on server" });
      }

      const authHeader = String(req.headers.authorization || '');
      const token = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : '';
      if (!token) {
        return res.status(401).json({ error: "Missing Authorization token" });
      }

      const authClient = createClient(realSupabaseUrl, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
      });

      const { data: { user }, error: userError } = await authClient.auth.getUser(token);
      if (userError || !user) {
        return res.status(401).json({ error: "Invalid or expired session" });
      }

      if (!serviceRoleKey) {
        return res.status(500).json({ error: "Server is not configured for account deletion (missing service role key)" });
      }

      const adminClient = createClient(realSupabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
      });

      const { error: resumeError } = await adminClient.from('resumes').delete().eq('user_id', user.id);
      if (resumeError) {
        return res.status(500).json({ error: resumeError.message || "Failed to delete resumes" });
      }

      const { error: profileError } = await adminClient.from('profiles').delete().eq('id', user.id);
      if (profileError) {
        return res.status(500).json({ error: profileError.message || "Failed to delete profile" });
      }

      const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(user.id);
      if (authDeleteError) {
        return res.status(500).json({ error: authDeleteError.message || "Failed to delete auth user" });
      }

      return res.json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  });

  app.get("/api/blog/posts", async (req, res) => {
    try {
      const includeContent = String(req.query.includeContent || "0") === "1";
      const supabase = getServerSupabase();
      const selectColumns = includeContent
        ? "*"
        : "id,title,excerpt,author,date,category,image,status";

      let { data, error } = await supabase
        .from("blog_posts")
        .select(selectColumns)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error && typeof error.message === "string" && error.message.toLowerCase().includes("created_at")) {
        const retry = await supabase
          .from("blog_posts")
          .select(selectColumns)
          .eq("status", "published")
          .order("date", { ascending: false });
        data = retry.data;
        error = retry.error;
      }

      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ posts: data || [] });
    } catch (e: any) {
      res.status(500).json({ error: e?.message || String(e) });
    }
  });

  app.get("/api/blog/post/:id", async (req, res) => {
    try {
      const supabase = getServerSupabase();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", req.params.id)
        .eq("status", "published")
        .single();
      if (error) return res.status(404).json({ error: error.message });
      res.json({ post: data });
    } catch (e: any) {
      res.status(500).json({ error: e?.message || String(e) });
    }
  });

  app.get("/api/blog/recent", async (req, res) => {
    try {
      const limit = Math.max(1, Math.min(10, Number(req.query.limit || 3)));
      const excludeId = String(req.query.excludeId || "");
      const supabase = getServerSupabase();

      let query: any = supabase
        .from("blog_posts")
        .select("id,title,excerpt,author,date,category,image,status")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (excludeId) {
        query = query.neq("id", excludeId);
      }

      const { data, error } = await query;
      if (error) return res.status(500).json({ error: error.message });
      res.json({ posts: data || [] });
    } catch (e: any) {
      res.status(500).json({ error: e?.message || String(e) });
    }
  });

  // Gemini API Endpoint
  const applyCors = (req: any, res: any) => {
    const origin = String(req.headers.origin || '');
    if (!origin) return;

    const envFile = loadEnv(MODE, process.cwd(), '');
    const raw = String(process.env.CORS_ORIGINS || envFile.CORS_ORIGINS || '');
    const allowList = raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const defaultAllowed = [
      'http://localhost:5000',
      'http://127.0.0.1:5000'
    ];

    const isExplicitlyAllowed = [...defaultAllowed, ...allowList].includes(origin);
    const isNetlifyAllowed = origin.endsWith('.netlify.app');
    if (isExplicitlyAllowed || isNetlifyAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
  };

  app.options("/api/gemini", (req, res) => {
    applyCors(req, res);
    res.status(204).send();
  });

  app.post("/api/gemini", async (req, res) => {
    applyCors(req, res);
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
