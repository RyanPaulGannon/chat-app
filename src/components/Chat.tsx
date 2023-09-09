import { useState, useEffect } from 'react'

export default function Chat({ updatePreview }: { updatePreview: any }) {
  type ChatMessage = {
    role: string
    content: string
    error?: string
  }

  const [newMessage, setNewMessage] = useState<string>('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'Hello! How can I help you today?' },
  ])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleInputKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (newMessage.trim() === '') {
        setErrorMessage('Please enter a message')
        setTimeout(() => setErrorMessage(''), 1500)
        return
      } else {
        sendMessage()
      }
    }
  }

  async function sendMessage() {
    if (newMessage.trim() === '') {
      setErrorMessage('Please enter a message')
      setTimeout(() => setErrorMessage(''), 1500)
      return
    }

    try {
      const userMessage: ChatMessage = {
        role: 'user',
        content: newMessage,
      }

      setTimeout(() => setIsLoading(true), 500, 0)

      setMessages((prevMessages) => [userMessage, ...prevMessages])

      const response = await fetch('/api/chat-gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      })

      if (response.ok) {
        setNewMessage('')

        const responseData = await response.json()
        const botResponse: ChatMessage = {
          role: 'bot',
          content: responseData.message,
        }

        setMessages((prevMessages) => [botResponse, ...prevMessages])
        updatePreview(responseData.message)
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.error || 'Unknown error'

        const botResponse: ChatMessage = {
          role: 'bot',
          content: errorMessage,
          error: errorMessage,
        }

        setMessages((prevMessages) => [botResponse, ...prevMessages])
      }
    } catch (error: any) {
      const errorMessage = "Sorry, I'm struggling with that request"

      const botResponse: ChatMessage = {
        role: 'bot',
        content: errorMessage,
        error: errorMessage,
      }

      setMessages((prevMessages) => [botResponse, ...prevMessages])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages')
    if (chatContainer) {
      chatContainer.scrollTop = 0
    }
  }, [messages])

  return (
    <div className="chat-wrapper">
      <div>
        <h1>Chat</h1>
        <div className="chat-container">
          <div className="chat-messages">
            {isLoading && (
              <div className="chat-message bot-message">Loading...</div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.role === 'user' ? 'user-message' : 'bot-message'
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="input-container">
        <p>{errorMessage}</p>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleInputKeyPress}
          required
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
