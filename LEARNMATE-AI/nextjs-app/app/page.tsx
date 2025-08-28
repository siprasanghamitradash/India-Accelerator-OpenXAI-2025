'use client'

import { useState } from 'react'
import Flashcards from './pages/Flashcard'
import Quiz from './pages/Quiz'
import StudyBuddy from './pages/StudyBuddy'

interface Flashcard {
  front: string
  back: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export default function LearnAI() {
  const [activeTab, setActiveTab] = useState('flashcards')

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-cyan-900 text-white">
      <div className="container mx-auto px-4 py-10">
        
        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 flex space-x-4 shadow-md">
            {[
              { id: 'flashcards', label: '🃏 Flashcards', desc: 'Make Flashcards' },
              { id: 'quiz', label: '📝 Quiz', desc: 'Create Quiz' },
              { id: 'study-buddy', label: '🤖 Study Buddy', desc: 'Ask Questions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg transition-all duration-300 transform ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="text-sm font-semibold">{tab.label}</div>
                <div className="text-xs opacity-75">{tab.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
          {activeTab === 'flashcards' && <Flashcards />}
          {activeTab === 'quiz' && <Quiz />}
          {activeTab === 'study-buddy' && <StudyBuddy />}
        </div>
      </div>
    </div>
  )
}
