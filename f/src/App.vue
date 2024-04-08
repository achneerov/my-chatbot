<template>
  <div id="app">
    <Chatbot />
  </div>
</template>

<script>
import Chatbot from './components/ChatBot.vue';

export default {
  name: 'App',
  components: {
    Chatbot,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}
</style>
