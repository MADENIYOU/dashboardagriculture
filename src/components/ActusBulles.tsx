'use client'

import { useEffect, useState } from 'react'

export default function ActusBubbles() {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/actus')
      .then(res => res.json())
      .then(data => setArticles(data)) // Pas de `.articles`
      .catch(err => console.error('Erreur lors du chargement des articles:', err))
  }, [])

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {articles.map((a, idx) => (
        <div key={idx} className="p-4 bg-green-100 rounded-xl w-64 shadow-md hover:shadow-lg transition-shadow">
          {a.image && (
            <img
              src={a.image}
              alt={a.title}
              className="rounded w-full h-40 object-cover"
            />
          )}
          <h3 className="text-lg font-semibold mt-2 line-clamp-2">{a.title}</h3>
          {a.date && <p className="text-xs text-gray-500">{a.date}</p>}
          {a.excerpt && <p className="text-sm mt-1 line-clamp-3">{a.excerpt}</p>}
          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 mt-2 block text-sm font-medium hover:underline"
          >
            Lire plus →
          </a>
        </div>
      ))}
    </div>
  )
}
