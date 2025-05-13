// app/api/chat/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Format de messages invalide" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Expert en agriculture sénégalaise. Réponses concises en français (2-3 phrases max).'
        },
        ...messages
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return NextResponse.json({
      reply: response.choices[0]?.message?.content || "Désolé, aucune réponse générée"
    });

  } catch (error) {
    console.error('Erreur OpenAI:', error);
    
    return NextResponse.json(
      { error: "Erreur de service" },
      { status: 500 }
    );
  }
}