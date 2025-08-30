import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LearnAI - Educational AI Tools',
  description: 'AI-powered learning tools: Flashcard Maker, Quiz Generator, and Study Buddy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col`}>
        {/* Header */}
        <header className="h-16 flex justify-between items-center px-8 
          bg-gradient-to-r from-black via-slate-900 to-cyan-900 
          shadow-md border-b border-white/10">
          
          {/* Left Title */}
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            Studious <span className="text-cyan-400">AI</span>
          </h1>
          
          {/* Right Author */}
          <span className="text-sm text-gray-400 italic">
            by Sipra Sanghamitra Dash
          </span>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
