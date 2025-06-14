import { NextResponse } from 'next/server';
import axios from 'axios';


const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
if (!GEMINI_API_KEY) {
  throw new Error('La variable d\'environnement GEMINI_API_KEY est manquante.');
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Vérifie que le format des messages est valide
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Format de messages invalide" },
        { status: 400 }
      );
    }

    
    const lastUserMessage = messages.findLast((msg: any) => msg.role === 'user')?.content || '';
    
    const topicPrompt = `
      Tu es un expert agricole sénégalais. Analyse la question suivante et réponds uniquement par "agriculture" si elle concerne :
      - Les cultures, sols, variétés locales, techniques agricoles, climat agricole, marchés agricoles, ou tout sujet lié à l'agriculture au Sénégal.
      Sinon, réponds uniquement par "autre".

      Question : "${lastUserMessage}"
    `;

    const topicCheckResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: topicPrompt }] }],
        generationConfig: { temperature: 0, maxOutputTokens: 2048 },
      }
    );

    const topicResult = topicCheckResponse.data.candidates?.[0]?.content?.parts?.[0]?.text.trim().toLowerCase();

    if (topicResult !== 'agriculture') {
      return NextResponse.json({
        choices: [{
          message: {
            content: "Je suis désolé mais je ne suis spécialisé que dans les questions liées à l'agriculture sénégalaise. Je ne peux pas répondre à ce sujet ; mais je serais ravi de t'aider sur le domaine de l'agriculture"
          }
        }]
      });
    }

    // --- Étape 2 : Convertir les messages en format compatible Gemini ---
    const recentMessages = [...messages].slice(-6);

    const geminiContents = recentMessages.flatMap((msg: any) => {
      const role = msg.role === 'user' ? 'user' : 'model';
      return [{ role, parts: [{ text: msg.content }] }];
    });
    
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: geminiContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, aucune réponse générée.";

    return NextResponse.json({ choices: [{ message: { content: reply } }] });

  } catch (error: any) {
    console.error('Erreur Gemini:', error.message);
    if (error.response) {
      console.error('Réponse d’erreur détaillée:', error.response?.data);
    }
    return NextResponse.json(
      { error: "Erreur lors de la génération de la réponse", details: error.message },
      { status: 500 }
    );
  }
}