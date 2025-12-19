import { GoogleGenAI, Type } from "@google/genai";
import { VehicleType, VehicleRecommendation, PRICING } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVehicleRecommendation = async (cargoDescription: string): Promise<VehicleRecommendation> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are a logistics expert. Analyze the following cargo description and recommend the most suitable vehicle type from the following list.
      
      EXPRESS VEHICLES (Fast, smaller loads):
      - ${VehicleType.EXPRESS_SMALL_VAN}: Max 2 pallets, light loads.
      - ${VehicleType.EXPRESS_MEDIUM_VAN}: Standard van.
      - ${VehicleType.EXPRESS_LARGE_VAN}: Larger volume.
      - ${VehicleType.EXPRESS_LIFT}: Needs a tail lift for loading/unloading.

      EXTRA EXPRESS (Specialized vans):
      - ${VehicleType.EXTRA_LEN_450}: Length up to 450cm.
      - ${VehicleType.EXTRA_LEN_480}: Length up to 480cm.
      - ${VehicleType.EXTRA_WID_230}: Extra width 230cm.
      - ${VehicleType.EXTRA_HEI_240}: Extra height 240cm.
      - ${VehicleType.EXTRA_TOP_LOAD}: Needs crane loading (open top).
      - ${VehicleType.EXTRA_HAZARDOUS}: Hazardous materials/chemicals.

      TRUCKS (Heavy loads):
      - ${VehicleType.TRUCK_3T}: Approx 3000kg load.
      - ${VehicleType.TRUCK_5T}: Approx 5000kg load.
      - ${VehicleType.TRUCK_12T}: Medium truck.
      - ${VehicleType.TRUCK_24T}: Full trailer, max 24000kg.

      Cargo Description: "${cargoDescription}"

      Return the result in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedVehicle: {
              type: Type.STRING,
              // We restrict to known types to ensure safety
              enum: Object.values(VehicleType),
              description: "The recommended vehicle type string."
            },
            reasoning: {
              type: Type.STRING,
              description: "A short explanation of why this vehicle was chosen based on the cargo."
            }
          },
          required: ["recommendedVehicle", "reasoning"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as VehicleRecommendation;

  } catch (error) {
    console.error("Gemini recommendation error:", error);
    // Fallback default
    return {
      recommendedVehicle: VehicleType.EXPRESS_SMALL_VAN,
      reasoning: "AI service unavailable. Defaulting to smallest vehicle. Please consult our support team."
    };
  }
};
