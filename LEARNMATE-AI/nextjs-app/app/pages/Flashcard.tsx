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

  const progress =
    flashcards.length > 0 ? ((currentCard + 1) / flashcards.length) * 100 : 0

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <h2 className="text-3xl font-bold text-white mb-6">🃏 Flashcard Maker</h2>

      {/* BEFORE generation */}
      {flashcards.length === 0 ? (
        <div className="flex flex-col w-full max-w-4xl space-y-6">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your study notes here..."
            className="w-full h-48 p-4 rounded-xl bg-white/10 text-white 
                       placeholder-white/50 focus:ring-2 focus:ring-cyan-400 
                       border border-white/20 backdrop-blur-sm text-lg"
          />
          <button
            onClick={generateFlashcards}
            disabled={loading || !notes.trim()}
            className="self-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 
                       text-white font-semibold rounded-xl shadow-lg hover:from-cyan-600 
                       hover:to-blue-700 transition-all disabled:opacity-50 text-lg"
          >
            {loading ? 'Generating...' : 'Generate Flashcards'}
          </button>
        </div>
      ) : (
        <>
          {/* Flashcard */}
          <div
            className="relative w-[600px] h-[350px] perspective mx-auto mb-10 cursor-pointer"
            onClick={() => setFlipped(!flipped)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 
                          transform-style-preserve-3d ${
                flipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 flex items-center justify-center p-8 
                              bg-gradient-to-br from-cyan-600 to-blue-700 
                              rounded-2xl border border-white/20 
                              text-xl text-white font-semibold shadow-2xl backface-hidden">
                {flashcards[currentCard]?.front}
              </div>
              {/* Back */}
              <div className="absolute inset-0 flex items-center justify-center p-8 
                              bg-gradient-to-br from-green-600 to-emerald-700 
                              rounded-2xl border border-white/20 
                              text-xl text-white font-semibold shadow-2xl rotate-y-180 backface-hidden">
                {flashcards[currentCard]?.back}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-[600px] mb-8">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-white/70 text-sm mt-2">
              Card {currentCard + 1} of {flashcards.length}
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-between w-[600px]">
            <button
              onClick={() => {
                setCurrentCard(currentCard - 1)
                setFlipped(false)
              }}
              disabled={currentCard === 0}
              className="px-6 py-3 bg-white/10 text-white rounded-lg 
                         hover:bg-white/20 disabled:opacity-50 text-lg"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setFlashcards([])
                setFlipped(false)
              }}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg"
            >
              New
            </button>
            <button
              onClick={() => {
                setCurrentCard(currentCard + 1)
                setFlipped(false)
              }}
              disabled={currentCard === flashcards.length - 1}
              className="px-6 py-3 bg-white/10 text-white rounded-lg 
                         hover:bg-white/20 disabled:opacity-50 text-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
