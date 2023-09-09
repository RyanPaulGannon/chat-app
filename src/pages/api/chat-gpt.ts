import z from 'zod'
import OpenAI from 'openai'
import { NextApiRequest, NextApiResponse } from 'next'

// const apiKey = z.string().parse(process.env.CHAT_GPT_API_KEY)
const apiKey = z.string().parse(process.env.CHAT_API_KEY)

const openai = new OpenAI({
  apiKey,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { message } = req.body

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'gpt-3.5-turbo',
    })

    const chatGPTMessage = chatCompletion.choices[0].message.content

    res.status(200).json({ message: chatGPTMessage })
  } catch (error) {
    console.error('Error processing message:', error)

    res.status(500).json({ error: 'Internal server error' })
  }
}
