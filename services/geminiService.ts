
import { AtsResult } from "../types";

const getGeminiEndpoints = () => {
  const endpoints: string[] = ["/api/gemini", "/.netlify/functions/gemini"];
  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    const isNetlify = host.endsWith(".netlify.app") || host.includes("netlify");
    if (isNetlify) {
      return ["/.netlify/functions/gemini", "/api/gemini"];
    }
  }
  return endpoints;
};

const callGeminiApi = async (type: string, payload: any) => {
  const endpoints = getGeminiEndpoints();
  let lastError: unknown = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, payload }),
      });

      if (response.ok) {
        return response.json();
      }

      if (response.status === 404) {
        lastError = new Error(`AI endpoint not found: ${endpoint}`);
        continue;
      }

      let errorMessage = `AI server error (${response.status})`;
      try {
        const asJson = await response.json();
        errorMessage = asJson?.error || errorMessage;
      } catch {
        try {
          const asText = await response.text();
          if (asText) errorMessage = `${errorMessage}: ${asText.substring(0, 200)}`;
        } catch {
        }
      }
      throw new Error(errorMessage);
    } catch (e: any) {
      const message = String(e?.message || e);
      const looksLikeNetwork = message.toLowerCase().includes("failed to fetch") || message.toLowerCase().includes("network");
      lastError = e;
      if (looksLikeNetwork) {
        continue;
      }
      throw e;
    }
  }

  throw (lastError as any) || new Error("Failed to communicate with AI server");
};

export const generateProfessionalSummary = async (jobTitle: string, skills: string[]) => {
  try {
    const data = await callGeminiApi("generateSummary", { jobTitle, skills });
    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating summary. Please try again.";
  }
};

export const improveExperienceBullet = async (bullet: string) => {
  try {
    const data = await callGeminiApi("improveBullet", { bullet });
    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return bullet;
  }
};

export const generateCoverLetter = async (myJobTitle: string, recipientCompany: string, mySkills: string[], myExperience: string) => {
  try {
    const data = await callGeminiApi("generateCoverLetter", { myJobTitle, recipientCompany, mySkills, myExperience });
    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am writing to express my interest in the position...";
  }
};

export const analyzeAtsScore = async (payload: { base64Data?: string; mimeType?: string; text?: string; }): Promise<AtsResult | null> => {
  try {
    return await callGeminiApi("analyzeAts", payload);
  } catch (error) {
    console.error("Gemini ATS Error:", error);
    return null;
  }
};

export const parseResumeFromText = async (text: string) => {
  try {
    return await callGeminiApi("parseResume", { text });
  } catch (error: any) {
    console.error("Gemini Parse Error:", error);
    throw new Error(error.message || "Failed to parse resume");
  }
};
