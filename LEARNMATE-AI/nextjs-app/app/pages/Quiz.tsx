'use client'
import { useState } from 'react'

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export default function Quiz() {
  const [quizText, setQuizText] = useState('')
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)

  const generateQuiz = async () => {
    if (!quizText.trim()) return
    setLoading(true)
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: quizText })
      })
      const data = await response.json()
      if (data.quiz) {
        setQuiz(data.quiz)
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setShowResults(false)
        setScore(0)
      }
    } catch (error) {
      console.error('Error generating quiz:', error)
    }
    setLoading(false)
  }

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)

    if (answerIndex === quiz[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
      }
    }, 1500)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">📝 Quiz Maker</h2>

      {quiz.length === 0 && !showResults ? (
        <div>
          <textarea
            value={quizText}
            onChange={(e) => setQuizText(e.target.value)}
            placeholder="Paste text here and I'll create a quiz for you..."
            className="w-full h-40 p-4 rounded-lg border-0 bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
          />
          <button
            onClick={generateQuiz}
            disabled={loading || !quizText.trim()}
            className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Quiz...' : 'Create Quiz'}
          </button>
        </div>
      ) : showResults ? (
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h3>
          <p className="text-xl text-white mb-6">
            You scored {score} out of {quiz.length} (
            {Math.round((score / quiz.length) * 100)}%)
          </p>
          <button
            onClick={() => {
              setQuiz([])
              setShowResults(false)
              setScore(0)
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            Take Another Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 text-white">
            Question {currentQuestion + 1} of {quiz.length}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {quiz[currentQuestion]?.question}
            </h3>

            <div className="space-y-3">
              {quiz[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg transition-all quiz-option ${
                    selectedAnswer === null
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : selectedAnswer === index
                      ? index === quiz[currentQuestion].correct
                        ? 'correct'
                        : 'incorrect'
                      : index === quiz[currentQuestion].correct
                      ? 'correct'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-4 p-4 bg-white/20 rounded-lg">
                <p className="text-white font-medium">Explanation:</p>
                <p className="text-white/90">
                  {quiz[currentQuestion]?.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
