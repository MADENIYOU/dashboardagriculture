'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaSpinner } from 'react-icons/fa'

const POSTS_PER_PAGE = 12

export default function ActusBubbles() {
  const [articles, setArticles] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/actus')
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Erreur lors du chargement des articles:', err)
        setLoading(false)
      })
  }, [])

  // Calcul des pages
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE)
  const currentPosts = articles.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  return (
    <>
      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-green-600 text-3xl" />
          <span className="ml-2 text-green-700 font-medium">Chargement des actualités...</span>
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center px-5 py-2 rounded-lg transition-all ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <FaArrowLeft className="mr-2" /> Précédent
          </button>

          <span className="text-sm text-gray-600 font-medium">
            Page <strong className="text-green-700">{currentPage}</strong> sur{' '}
            <strong className="text-green-700">{totalPages}</strong>
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center px-5 py-2 rounded-lg transition-all ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Suivant <FaArrowRight className="ml-2" />
          </button>
        </div>
      )}

      {/* Grille d'articles avec animations */}
      {!loading && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`page-${currentPage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex gap-6 flex-wrap justify-center"
          >
            {currentPosts.map((a, idx) => (
              <motion.div
                key={`article-${currentPage}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-5 bg-green-50 rounded-xl w-60 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all border border-green-100"
              >
                {a.image && (
                  <img
                    src={a.image}
                    alt={a.title}
                    className="rounded-t-lg w-full h-44 object-cover"
                  />
                )}
                <h3 className="text-lg font-bold mt-3 text-gray-800 line-clamp-2">{a.title}</h3>
                {a.date && <p className="text-xs text-green-700 mt-1">{a.date}</p>}
                {a.excerpt && (
                  <p className="text-sm mt-2 text-gray-600 line-clamp-3">{a.excerpt}</p>
                )}
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-green-600 hover:text-green-800 text-sm font-medium hover:underline"
                >
                  Lire plus →
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination stylisée */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center px-5 py-2 rounded-lg transition-all ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <FaArrowLeft className="mr-2" /> Précédent
          </button>

          <span className="text-sm text-gray-600 font-medium">
            Page <strong className="text-green-700">{currentPage}</strong> sur{' '}
            <strong className="text-green-700">{totalPages}</strong>
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center px-5 py-2 rounded-lg transition-all ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Suivant <FaArrowRight className="ml-2" />
          </button>
        </div>
      )}
    </>
  )
}