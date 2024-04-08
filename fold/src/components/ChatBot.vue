<template>
  <div class="chatbot">
    <div class="chat-container" ref="chatContainer">
      <div v-for="(message, index) in chatMessages" :key="index" class="message" :class="{ 'user-message': message.isUserMessage, 'bot-message': !message.isUserMessage }">
        {{ message.text }}
      </div>
    </div>
    <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatMessages: [],
      userInput: "",
      apiUrl: "http://127.0.0.1:8000/generate_text/",
      defaultMaxLen: 15,
      defaultNumSequences: 1,
      defaultMaxNewTokens: 15
    };
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === "") return;

      // Add user message to chat
      this.chatMessages.push({ text: this.userInput, isUserMessage: true });
      this.userInput = "";

      const messageToBeSent = this.chatMessages.map(message => message.text).join('');
      console.log(messageToBeSent)
      // Call API to generate text
      try {
        // const response = await fetch(`${this.apiUrl}?text=${encodeURIComponent(this.chatMessages.slice(-1)[0].text)}&maxlen=${this.defaultMaxLen}&num_return_sequences=${this.defaultNumSequences}`);
        const response = await fetch(`${this.apiUrl}?text=${encodeURIComponent(messageToBeSent)}&max_new_tokens=${this.defaultMaxNewTokens}&num_return_sequences=${this.defaultNumSequences}`);
        console.log(response)
        const data = await response.json();
        const generatedText = data.generated_text[0]; // Assuming only one sequence returned

        // Add bot message to chat
        this.chatMessages.push({ text: generatedText, isUserMessage: false });

        // Scroll to the bottom of the chat
        this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
      } catch (error) {
        console.error("Error calling API:", error);
        // Handle error
      }
    },
  },
};
</script>

<style>
.chatbot {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.chat-container {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
}

.user-message {
  background-color: #f0f0f0;
  text-align: right;
}

.bot-message {
  background-color: #eaf6ff;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
