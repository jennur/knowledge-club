<script setup>
  const props = defineProps({
    iconClass: String,
    buttonText: String,
    vertical: Boolean
  })
  const flexDirClass = props.vertical && "flex-col" || ""
</script>

<template>
  <button :class="`flex ${flexDirClass} items-center p-2 hover:text-gray-900/90`">
    <font-awesome-icon :icon="props.iconClass" :class="`text-xl ${vertical ? 'mb-1' : 'mr-2'}`" />
    <div class="text-xs">{{ props.buttonText }}</div>
  </button>
</template>