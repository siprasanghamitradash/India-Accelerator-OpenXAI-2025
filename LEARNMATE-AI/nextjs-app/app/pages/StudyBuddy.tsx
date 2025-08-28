'use client'

import { useState } from 'react'

export default function StudyBuddy() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [chatHistory, setChatHistory] = useState<{ question: string; answer: string }[]>([])
  const [loading, setLoading] = useState(false)

  const askStudyBuddy = async () => {
  if (!question.trim()) return

  setLoading(true)
  try {
    const response = await fetch('/api/study-buddy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        history: chatHistory   // 👈 send chat history
      })
    })

    const data = await response.json()
    if (data.answer) {
      const newChat = { question, answer: data.answer }
      setChatHistory((prev) => [...prev, newChat])
      setAnswer(data.answer)
      setQuestion('')
    }
  } catch (error) {
    console.error('Error asking study buddy:', error)
  }
  setLoading(false)
}


  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">🤖 Ask-Me Study Buddy</h2>

      {/* Input */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything you want to learn about..."
            className="flex-1 p-4 rounded-lg border-0 bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
            onKeyDown={(e) => e.key === 'Enter' && askStudyBuddy()}
          />
          <button
            onClick={askStudyBuddy}
            disabled={loading || !question.trim()}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </div>

      {/* Chat history */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
        {chatHistory.map((chat, index) => (
          <div key={index} className="space-y-2">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-blue-500/40 text-white rounded-2xl rounded-br-sm p-4 max-w-prose shadow-md whitespace-pre-line">
                <p className="font-semibold">You:</p>
                <p>{chat.question}</p>
              </div>
            </div>

            {/* Bot Message */}
            <div className="flex justify-start">
              <div className="bg-green-500/30 text-white rounded-2xl rounded-tl-sm p-4 max-w-prose shadow-md whitespace-pre-line">
                <p className="font-semibold">Study Buddy:</p>
                <p>{chat.answer}</p>
              </div>
            </div>
          </div>
        ))}

        {chatHistory.length === 0 && (
          <div className="text-center text-white/60 py-8">
            Ask me anything and I'll help you learn!  
            I can explain concepts, provide examples, and answer your questions.
          </div>
        )}
      </div>
    </div>
  )
}
