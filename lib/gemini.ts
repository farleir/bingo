import { GoogleGenAI } from "@google/genai";

// Conforme as diretrizes, assume-se que process.env.API_KEY está pré-configurado e disponível.
// Em um app de produção, esta chave NUNCA deve ser exposta no lado do cliente.
// O ideal é usar uma função de backend (serverless function) como intermediário.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Gera uma frase de bingo criativa e engraçada usando a API Gemini.
 * @param number O número do bingo a ser anunciado.
 * @returns Uma promessa que resolve para a frase gerada.
 */
export async function generateBingoPhrase(number: number): Promise<string> {
  try {
    const prompt = `Você é um locutor de bingo carismático e icônico do Brasil, com um ótimo senso de humor. Sua voz é marcante e todos na festa param para ouvir. Anuncie o número ${number} de forma criativa e engraçada, usando uma referência cultural brasileira se possível. Seja breve e impactante. Diga apenas a frase do anúncio, sem repetir o número.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Limpa aspas e possíveis novas linhas da resposta.
    return response.text.trim().replace(/"/g, '');
  } catch (error) {
    console.error("Error generating phrase with Gemini:", error);
    // Frase de fallback em caso de erro na API.
    return `... E o número é ${number}!`;
  }
}
