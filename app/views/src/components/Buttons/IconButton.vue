<script setup>
  const props = defineProps({
    iconClass: {
      type: String,
      required: true 
    },
    buttonText: {
      type: String,
      required: true
    },
    vertical: Boolean,
    dark: Boolean
  });
  const flexDirClass = props.vertical && "flex-col" || "";
  const colorClass = props.dark && "bg-gray-700 hover:bg-gray-900/90 text-slate-100" || "text-gray-700 hover:text-gray-900/90";
  const iconSize = props.vertical && "text-xl" || "text-xs";
</script>

<template>
  <button :class="`flex ${flexDirClass} ${colorClass} transition-colors items-center p-2`">
    <font-awesome-icon :icon="props.iconClass" :class="`${iconSize} ${vertical ? 'mb-1' : 'mr-1'}`" />
    <div class="text-xs">{{ props.buttonText }}</div>
  </button>
</template>