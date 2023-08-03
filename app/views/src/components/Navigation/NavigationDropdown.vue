<script setup>
  import { ref } from "vue";
  import { RouterLink } from "vue-router";

  const props = defineProps({
      user: Object,
      options: Array
  })
  const showOptions = ref(false);

  function hideOptions(){
    showOptions.value = false;
  }
</script>

<template>
  <div class="select-dropdown">
    <div class="select-display" @click="showOptions = !showOptions">
      <div>
        <font-awesome-icon icon="fa-solid fa-user" class="icon mr-3" />
        <span class="select-name">{{ user.username }}</span>
      </div>
      <font-awesome-icon icon="fa-solid fa-caret-down" class="icon ml-2 text-xs" />
    </div>
    <div v-if="showOptions" v-click-outside="hideOptions" class="select-options">
      <component 
        v-for="option in options" 
        :key="option.name" 
        :is="option.route ? RouterLink : 'button'"
        :class="`option ${option.divider ? 'border-t border-slate-200': ''}`"
        @click="option.click"
        :to="option.route"
      >
        <font-awesome-icon v-if="option.icon" :icon="option.icon" class="icon mr-2 text-xs" />
        <span class="select-name">{{ option.name }}</span>
      </component>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .select-dropdown {
    @apply z-50 relative w-40 min-w-max text-sm text-gray-800 cursor-pointer;
  }

  .select-display {
    @apply w-full flex items-center justify-between py-1 px-4 border border-slate-300 text-sm;
  }

  .select-options {
    @apply bg-white  w-full absolute top-full mt-2 border border-slate-300 shadow-md;
  }

  .select-options .option {
    @apply w-full text-left block py-2 px-4 hover:bg-slate-100;
  }
</style>