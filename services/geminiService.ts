import { GoogleGenAI } from "@google/genai";

const CLINIC_CONTEXT = `
You are the AI Virtual Consultant for "Lumina Dermatology" (루미나 피부과).
Your goal is to politely and professionally assist potential patients by recommending treatments based on their skin concerns.

Here is the list of treatments available at our clinic:
1. Laser Toning (레이저 토닝): For pigmentation, melasma, and brightening.
2. Ulthera & Thermage (울쎄라 & 써마지): Non-surgical lifting and tightening for anti-aging.
3. Aqua Peel (아쿠아필): Deep cleansing, removing dead skin cells, hydration.
4. Botox & Fillers (보톡스 & 필러): Wrinkle reduction and volume augmentation.
5. Acne Care (여드름 케어): PDT, extrusion, and soothing treatments.
6. Rejuran Healer (리쥬란 힐러): Skin booster for regeneration and elasticity.

Rules:
- Be empathetic and professional.
- Recommend specific treatments from the list above based on the user's description.
- Always include a disclaimer that this is an AI recommendation and they should book a consultation with a doctor for a diagnosis.
- Keep answers concise (under 150 words).
- Respond in Korean (Polite form / 존댓말).
`;

export const getSkinConsultation = async (userQuery: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: CLINIC_CONTEXT,
        temperature: 0.7,
      }
    });

    return response.text || "죄송합니다. 현재 응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};