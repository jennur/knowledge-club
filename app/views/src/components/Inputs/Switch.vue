<script setup>
import { ref } from "vue";
  const emit = defineEmits(["switch"]);

  function handleSwitch(event) {
    emit('switch', event.target.checked);
  }
</script>

<template>
  <input 
      class="switch mr-2"
      type="checkbox" 
      @input="handleSwitch" 
    />
</template>

<style lang="postcss" scoped>

  .switch {
    @apply appearance-none relative w-8 border border-gray-600 p-2 rounded-full;
  }
  .switch::before {
    content: "";
    @apply absolute m-[.125rem] top-0 left-[.05rem] translate-x-0 w-3 h-3 
      bg-slate-600 rounded-full transition-all duration-200;
  }

  .switch:checked::before {
    @apply translate-x-full bg-black;
  }
</style>