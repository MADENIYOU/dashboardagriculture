import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const res = await fetch('https://agriculture.gouv.sn/category/actualite/', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Erreur lors du chargement de la page' }, { status: 500 });
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const articles: {
      title: string;
      date: string;
      image: string;
      excerpt: string;
      url: string;
    }[] = [];

    $('.blog-listing').each((_, el) => {
      const title = $(el).find('.entry-title a').text().trim();
      const url = $(el).find('.entry-title a').attr('href') || '';
      const date = $(el).find('.entry-date a').text().trim();
      const image = $(el).find('.entry-thumbnail img').attr('src') || '';
      const excerpt = $(el).find('.entry-content p').text().trim();

      if (title && url) {
        articles.push({ title, date, image, excerpt, url });
      }
    });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne', details: String(error) }, { status: 500 });
  }
}
