
import { AtsResult } from "../types";

const callGeminiApi = async (type: string, payload: any) => {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload }),
  });
  
  if (!response.ok) {
    let errorMessage = "Failed to communicate with AI server";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      console.error("Could not parse error response", e);
    }
    throw new Error(errorMessage);
  }
  
  return response.json();
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
