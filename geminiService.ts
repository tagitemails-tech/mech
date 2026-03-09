
import { GoogleGenAI } from "@google/genai";

const PRODUCT_CONTEXT = `
You are the AI Assistant for "Mech-Sphere Industries", a successful startup founded by a "Young Couple" with a vision to serve mechanical industries in an elite way. 
Established: 25 Feb 2022.
Location: No.23, Ground Floor, Srigandada Kaval, Vishwaneedum Post, Hegganahalli Cross, Bengaluru Urban, Karnataka – 560091.
Motto: "Mech moves the world" and "Price Meets Quality: Feel the Difference".

Core Competencies:
- Hydraulic Fittings (Straight, Elbow, T-types, Banjo)
- Hose Pipe Fittings (1/8" to 3" sizes)
- CNC Precision Turned Components (Steel, SS, Aluminum, Brass)
- Thread Standards: BSP, BSPT, Metric, NPT, UNF etc.
- Materials used: EN8 Standard Carbon Steel, SS304, SS316.

Customer Base: L&T, Wipro, Jindal etc.
Services: Precision turning (2, 3, 4 jaw), customized hydraulic fittings, drilling, tapping, and hose crimping assembly.

Goal: Help users find the right hydraulic adaptors or fittings based on the technical specifications in the catalog. Be professional and technical.
`;

export const getGeminiResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: PRODUCT_CONTEXT,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our technical assistant is currently offline. Please call us directly at our Bengaluru office: +91 9902322017.";
  }
};
