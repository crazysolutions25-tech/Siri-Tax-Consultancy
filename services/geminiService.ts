
import { GoogleGenAI, Type } from "@google/genai";
import { MockAPI } from "./api";

const SYSTEM_INSTRUCTION = `
You are Siri, the Expert AI Assistant for Siri Tax Consultancy. 
You are directly linked to the company's backend database.
- We have offices in two locations: Visakhapatnam (Vizag) and Srikakulam.
- The company was founded in 2019.
- Use 'check_application_status' if a user asks about their specific query using an email.
- Use 'get_business_stats' if a user asks about how many clients or inquiries the company has handled.
- Be professional, accurate, and encourage users to visit any of our branches for complex audits.
- Contact: 89777 56671.

When Deep Thinking mode is requested:
- Provide exhaustive, multi-step analysis.
- Cite specific tax sections where applicable.
- Consider multiple financial scenarios.
- Focus on maximum accuracy and long-term planning.
`;

const tools = [
  {
    name: "check_application_status",
    parameters: {
      type: Type.OBJECT,
      description: "Checks status of an inquiry by email.",
      properties: { email: { type: Type.STRING } },
      required: ["email"]
    }
  },
  {
    name: "get_business_stats",
    parameters: {
      type: Type.OBJECT,
      description: "Gets real-time stats about the consultancy business like total inquiries.",
      properties: {}
    }
  }
];

export async function getChatResponse(
  userMessage: string, 
  history: { role: 'user' | 'model', text: string }[],
  useDeepThinking: boolean = false
) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = [
    ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
    { role: 'user', parts: [{ text: userMessage }] }
  ];

  try {
    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: useDeepThinking ? 0.2 : 0.7,
      topP: useDeepThinking ? 0.8 : 0.95,
      tools: [{ functionDeclarations: tools }]
    };

    if (useDeepThinking) {
      // Maximize reasoning for complex tax law interpretations
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents as any,
      config,
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];
      let resultData;

      if (call.name === "check_application_status") {
        const apiRes = await MockAPI.leads.checkStatusByEmail(call.args.email as string);
        resultData = apiRes.success ? apiRes.data : apiRes.message;
      } else if (call.name === "get_business_stats") {
        const apiRes = await MockAPI.leads.getStats();
        resultData = apiRes.data;
      }

      const followUp = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...contents,
          { role: 'model', parts: [{ functionCall: call }] },
          { role: 'user', parts: [{ functionResponse: { name: call.name, response: { result: resultData } } }] }
        ] as any,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      return followUp.text;
    }

    return response.text || "Database connection slightly unstable. Please try again.";
  } catch (error) {
    console.error("AI Error:", error);
    return "I am currently performing a backend sync. Please reach out to us at 89777 56671.";
  }
}

export async function analyzeDocument(base64Data: string, mimeType: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: "Analyze this financial document. Extract: 1. Document Type, 2. Key Amounts (Total, Tax), 3. Dates, 4. Compliance Warnings." }
        ]
      },
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text;
  } catch (error) {
    return "Vision analysis failed. Please ensure the document is clear.";
  }
}
