<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <h1 style="text-align: center">Chat</h1>

    <div
      style="
        flex-grow: 1;
        overflow-y: auto;
        border: 1px solid #ccc;
        padding: 10px;
      "
      ref="scrollableContent"
    >
      <div
        v-for="message in messages"
        :key="message"
        style="border: 1px solid #ccc; padding: 10px"
      >
        {{ message }}
      </div>
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        padding: 10px;
        border-top: 1px solid #ccc;
      "
    >
      <input
        v-model="newMessage"
        style="flex-grow: 1; padding: 5px; margin-right: 10px"
        placeholder="Type your message..."
      />
      <button
        @click="sendMessage"
        style="
          padding: 5px 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
        "
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatMessage } from '~/types/ChatMessage'

const messages = ref<string[]>([])
const newMessage = ref('')
const botMessage = ref('')

async function sendMessage() {
  if (newMessage.value.trim() !== '') {
    const userMessage: ChatMessage = {
      role: 'user',
      content: newMessage.value,
    }

    messages.value.push(userMessage.content)

    newMessage.value = ''

    const { data } = await useFetch('/api/chatGPT', {
      method: 'POST',
      body: JSON.stringify(userMessage.content),
    })

    botMessage.value = data.value || 'Sorry, I am struggling with that request'

    messages.value.push(botMessage.value)
  }
}
</script>
