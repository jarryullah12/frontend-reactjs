import { GoogleGenAI, Type } from '@google/genai';

type GeminiRequest =
  | { type: 'generateSummary'; payload: { jobTitle: string; skills: string[] } }
  | { type: 'improveBullet'; payload: { bullet: string } }
  | { type: 'generateCoverLetter'; payload: { myJobTitle: string; recipientCompany: string; mySkills: string[]; myExperience: string } }
  | { type: 'analyzeAts'; payload: { text?: string; base64Data?: string; mimeType?: string } }
  | { type: 'parseResume'; payload: { text: string } };

const json = (statusCode: number, body: any) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(body)
  };
};

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return json(500, { error: 'Gemini API Key is not configured on the server.' });
  }

  let parsed: GeminiRequest | null = null;
  try {
    parsed = event.body ? (JSON.parse(event.body) as GeminiRequest) : null;
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  if (!parsed || typeof (parsed as any).type !== 'string') {
    return json(400, { error: 'Missing request type' });
  }

  try {
    const genAI = new GoogleGenAI({ apiKey });
    const modelName = 'gemini-3.1-flash-lite';

    switch (parsed.type) {
      case 'generateSummary': {
        const payload = parsed.payload;
        const result = await genAI.models.generateContent({
          model: modelName,
          contents: `Generate a compelling professional summary for a ${payload.jobTitle} with these skills: ${payload.skills.join(', ')}. Keep it under 60 words and make it impactful.`
        });
        return json(200, { text: result.text });
      }
      case 'improveBullet': {
        const payload = parsed.payload;
        const result = await genAI.models.generateContent({
          model: modelName,
          contents: `Improve the following resume bullet point to be more achievement-oriented and professional: "${payload.bullet}". Use action verbs and metrics if possible. Keep it to a single sentence.`
        });
        return json(200, { text: result.text });
      }
      case 'generateCoverLetter': {
        const payload = parsed.payload;
        const result = await genAI.models.generateContent({
          model: modelName,
          contents: `Write a professional cover letter for a ${payload.myJobTitle} position at ${payload.recipientCompany}. 
My skills include: ${payload.mySkills.join(', ')}. 
Highlight this experience: "${payload.myExperience}".
Keep it to 3 short paragraphs. The tone should be confident but professional. 
Do not include placeholders like [Your Name], just write the body content.`
        });
        return json(200, { text: result.text });
      }
      case 'analyzeAts': {
        const payload = parsed.payload;
        const atsParts: any[] = [];
        if (payload.text) {
          atsParts.push({ text: `Resume Content:\n${payload.text}\n\n` });
        } else if (payload.base64Data && payload.mimeType) {
          atsParts.push({ inlineData: { mimeType: payload.mimeType, data: payload.base64Data } });
        } else {
          return json(400, { error: 'Missing resume data' });
        }

        atsParts.push({
          text: `Analyze this resume for ATS (Applicant Tracking System) compatibility. 
Provide a strict score out of 100.
Identify critical issues (formatting, keywords, structure).
List missing keywords that are common for this type of role.
Return ONLY a valid JSON object.`
        });

        const result = await genAI.models.generateContent({
          model: modelName,
          contents: atsParts,
          config: {
            responseMimeType: 'application/json',
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

        let body: any = {};
        try {
          body = JSON.parse(result.text || '{}');
        } catch {
          body = {};
        }
        return json(200, body);
      }
      case 'parseResume': {
        const payload = parsed.payload;
        const result = await genAI.models.generateContent({
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
            responseMimeType: 'application/json',
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

        let body: any = {};
        try {
          body = JSON.parse(result.text || '{}');
        } catch {
          body = {};
        }
        return json(200, body);
      }
      default:
        return json(400, { error: 'Invalid request type' });
    }
  } catch (e: any) {
    return json(500, { error: `AI processing failed: ${e?.message || String(e)}` });
  }
};

