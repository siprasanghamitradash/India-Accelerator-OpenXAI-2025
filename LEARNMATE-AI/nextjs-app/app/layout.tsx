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
      <body className={inter.className}>
  <header className="flex justify-between items-center px-6 py-4 
  bg-gradient-to-r from-black via-slate-900 to-cyan-900 shadow-lg">
  <h1 className="text-2xl font-bold text-white tracking-wide">
    Studious AI
  </h1>
  <span className="text-sm text-gray-300 italic">
    by Sipra Sanghamitra Dash
  </span>
</header>

  <main>{children}</main>
</body>

    </html>
  )
} 