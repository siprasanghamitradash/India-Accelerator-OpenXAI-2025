import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { question, history } = await req.json()

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    // Build conversation context
    const historyText = (history || [])
      .map((chat: { question: string; answer: string }) => 
        `User: ${chat.question}\nAssistant: ${chat.answer}`
      )
      .join("\n\n")

    const prompt = `
You are a helpful study buddy AI. Answer the user's questions clearly, step by step. 
Stay consistent with the conversation context. Encourage learning and provide examples.

Conversation so far:
${historyText}

New Question: ${question}
    `

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3:1b',
        prompt,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get response from Ollama')
    }

    const data = await response.json()

    return NextResponse.json({
      answer: data.response || 'I could not process your question. Please try again!',
    })
  } catch (error) {
    console.error('Study Buddy API error:', error)
    return NextResponse.json(
      { error: 'Failed to get study buddy response' },
      { status: 500 }
    )
  }
}
