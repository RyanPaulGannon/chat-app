<template>
    <div class="chat-container">
        <h1 class="chat-title">Chat</h1>

        <div class="chat-messages" ref="scrollableContent">
            <div v-for="message in messages" :key="message.content" :class="{
                'user-message': message.role === 'user',
                'bot-message': message.role === 'bot',
            }">
                {{ message.content }}
            </div>
        </div>

        <div class="chat-input">
            <input v-model="newMessage" class="message-input" placeholder="Type your message..." />
            <button @click="sendMessage" class="send-button">Send</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChatMessage } from '~/types/ChatMessage'

const messages = ref<ChatMessage[]>([])
const newMessage = ref<string>('')
const botMessage = ref<string>('')

async function sendMessage() {
    if (newMessage.value.trim() !== '') {
        const userMessage: ChatMessage = {
            role: 'user',
            content: newMessage.value,
        }

        messages.value.push(userMessage)

        newMessage.value = ''

        const { data } = await useFetch('/api/chatGPT', {
            method: 'POST',
            body: JSON.stringify(userMessage),
        })

        botMessage.value = data.value || 'Sorry, I am struggling with that request'

        messages.value.push({ role: 'bot', content: botMessage.value })
    }
}
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.chat-title {
    text-align: center;
    margin: 10px 0;
}

.chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.user-message {
    align-self: flex-start;
    background-color: #007bff;
    color: #fff;
    max-width: 70%;
    padding: 10px;
    margin: 5px 0;
    border-radius: 10px;
}

.bot-message {
    align-self: flex-end;
    background-color: #f0f0f0;
    color: #000;
    max-width: 70%;
    padding: 10px;
    margin: 5px 0;
    border-radius: 10px;
}

.chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ccc;
}

.message-input {
    flex-grow: 1;
    padding: 5px;
    margin-right: 10px;
}

.send-button {
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>
