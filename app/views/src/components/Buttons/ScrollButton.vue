<script setup>
  import { ref } from "vue";

  const showUpButton = ref(false);
  const showDownButton = ref(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
  
  function handleScroll() {
    showUpButton.value = window.scrollY > 100;
    showDownButton.value = window.scrollY > 100 && 
      window.scrollY < document.body.scrollHeight - window.innerHeight;

  }
  window.addEventListener("scroll", handleScroll);
</script>

<template>
  <div class="scroll-wrapper">
    <button v-if="showUpButton" class="scroll-button" @click="scrollToTop" aria-hidden="true">
      <font-awesome-icon :icon="['fas', 'caret-up']" />
    </button>
    <button v-if="showDownButton" class="scroll-button mt-2" @click="scrollToBottom" aria-hidden="true">
      <font-awesome-icon :icon="['fas', 'caret-down']" />
    </button>
  </div>
</template>

<style lang="postcss" scoped>
  .scroll-wrapper {
    @apply flex flex-col fixed bottom-8 right-8;
    animation: popup .3s;
  }
  .scroll-button {
    @apply  bg-slate-300 hover:bg-slate-400 
    transition-all px-4 py-2 rounded;
    animation: popup .3s;
  }

  .night .scroll-button {
    @apply  bg-slate-600 hover:bg-slate-400 
    transition-all px-4 py-2 rounded;
    animation: popup .3s;
  }

  @keyframes popup {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>