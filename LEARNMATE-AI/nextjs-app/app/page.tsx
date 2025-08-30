'use client'

import { useState } from 'react'
import Flashcards from './pages/Flashcard'
import Quiz from './pages/Quiz'
import StudyBuddy from './pages/StudyBuddy'
import { FaClone, FaQuestionCircle, FaRobot } from 'react-icons/fa'

export default function LearnAI() {
  const [activeTab, setActiveTab] = useState('flashcards')

  const tabs = [
    { id: 'flashcards', desc: 'Make Flashcards', icon: <FaClone /> },
    { id: 'quiz', desc: 'Create Quiz', icon: <FaQuestionCircle /> },
    { id: 'study-buddy', desc: 'Ask Questions', icon: <FaRobot /> }
  ]

  return (
    <div className='flex w-full h-full bg-gradient-to-br from-slate-900 via-black to-cyan-950 relative'>
      <div className="absolute top-20 left-40 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-32 right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

    
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div className="w-24 bg-white/10 backdrop-blur-lg border-r border-white/10 
                      flex flex-col justify-evenly items-center h-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative p-4 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-110'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="text-3xl">{tab.icon}</div>

            {/* Tooltip */}
            <div className="absolute left-20 top-1/2 -translate-y-1/2 opacity-0 
                            group-hover:opacity-100 bg-black/80 text-white 
                            text-xs px-3 py-1 rounded-md whitespace-nowrap 
                            transition-opacity duration-300">
              {tab.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-6">
        {activeTab === 'flashcards' && <Flashcards />}
        {activeTab === 'quiz' && <Quiz />}
        {activeTab === 'study-buddy' && <StudyBuddy />}
      </div>
    </div>
    </div>
  )
}
