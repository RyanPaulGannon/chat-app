import z from 'zod'
import OpenAI from 'openai'

// const apiKey = z.string().parse(process.env.CHAT_GPT_API_KEY)
const apiKey = z.string().parse(process.env.CHAT_API_KEY)

const openai = new OpenAI({
  apiKey,
})

export default eventHandler(async (event) => {
  const body = await readBody(event)

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: body,
      },
    ],
    model: 'gpt-3.5-turbo',
  })

  const chatGPTMessage = chatCompletion.choices[0].message.content

  return chatGPTMessage
})
