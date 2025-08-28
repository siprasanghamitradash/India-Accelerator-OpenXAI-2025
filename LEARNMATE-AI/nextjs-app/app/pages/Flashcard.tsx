'use client'
import { useState } from 'react'

interface Flashcard {
  front: string
  back: string
}

export default function Flashcards() {
  const [notes, setNotes] = useState('')
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateFlashcards = async () => {
    if (!notes.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      })
      const data = await res.json()
      if (data.flashcards) {
        setFlashcards(data.flashcards)
        setCurrentCard(0)
        setFlipped(false)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">🃏 Flashcard Maker</h2>

      {flashcards.length === 0 ? (
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your study notes here..."
            className="w-full h-40 p-4 rounded-lg border-0 bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
          />
          <button
            onClick={generateFlashcards}
            disabled={loading || !notes.trim()}
            className="mt-4 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Flashcards'}
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 text-white/80">
            Card {currentCard + 1} of {flashcards.length}
          </div>

          {/* Flashcard */}
          <div
            className="relative w-full h-48 perspective"
            onClick={() => setFlipped(!flipped)}
          >
            <div
              className={`relative w-full h-full text-white text-lg font-medium transition-transform duration-500 transform-style-preserve-3d ${
                flipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-indigo-600 rounded-xl backface-hidden">
                {flashcards[currentCard]?.front}
              </div>
              {/* Back */}
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-green-600 rounded-xl backface-hidden rotate-y-180">
                {flashcards[currentCard]?.back}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentCard(currentCard - 1)}
              disabled={currentCard === 0}
              className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 hover:bg-white/30"
            >
              Previous
            </button>
            <button
              onClick={() => setFlashcards([])}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              New Flashcards
            </button>
            <button
              onClick={() => setCurrentCard(currentCard + 1)}
              disabled={currentCard === flashcards.length - 1}
              className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 hover:bg-white/30"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
