import { NextResponse } from 'next/server';
import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    console.log("Appel à l'API Gemini avec URL :", GEMINI_API_URL + `?key=${GEMINI_API_KEY}`);

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Format de messages invalide" },
        { status: 400 }
      );
    }

    // Dernier message utilisateur
    const lastUserMessage = messages.findLast((msg: any) => msg.role === 'user')?.content || '';

    // Prompt d'analyse du sujet
    const topicPrompt = `
Tu es un expert agricole sénégalais. Analyse la question suivante et réponds uniquement par "agriculture" si elle concerne :
- Les cultures, sols, variétés locales, techniques agricoles, climat agricole, marchés agricoles, ou tout sujet lié à l'agriculture au Sénégal.
Sinon, réponds uniquement par "autre".

Question : "${lastUserMessage}"
`;

    // Vérification si c'est en lien avec l'agriculture
    const topicCheckResponse = await axios.post(
      GEMINI_API_URL + `?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: topicPrompt }] }],
        generationConfig: { temperature: 0, maxOutputTokens: 20 },
      }
    );

    const topicResult = topicCheckResponse.data.candidates?.[0]?.content?.parts?.[0]?.text.trim().toLowerCase();

    if (topicResult !== 'agriculture') {
      return NextResponse.json({
        choices: [{
          message: {
            content: "Je suis spécialisé dans les questions liées à l'agriculture sénégalaise. Je ne peux pas répondre à ce sujet."
          }
        }]
      });
    }

    // Si c’est bien une question agricole, générer une réponse détaillée
    const finalPrompt = `
Tu es un expert agricole sénégalais. Réponds de manière claire et concise aux questions sur l'agriculture au Sénégal.
Privilégie les informations locales : cultures, variétés, saisons, méthodes adaptées au Sénégal.

Historique des échanges :
${messages.map((m: any) => `${m.role === 'user' ? 'Utilisateur' : 'Assistant'}: ${m.content}`).join('\n')}

Réponds maintenant à la dernière question ci-dessus.
`;

    const response = await axios.post(
      GEMINI_API_URL + `?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: finalPrompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, aucune réponse générée.";

    return NextResponse.json({ choices: [{ message: { content: reply } }] });

  } catch (error: any) {
    console.error('Erreur Gemini:', error.message);
    return NextResponse.json(
      { error: "Erreur lors de la génération de la réponse", details: error.message },
      { status: 500 }
    );
  }
}