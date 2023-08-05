<script setup>
  const props = defineProps({
    buttonText: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: () => "md",
      validator: (value) => ["xs", "sm", "md", "lg"].includes(value)
    },
    type: {
      type: String,
      default: () => null,
      validator: (value) => ["button", "submit"].includes(value)
    },
    fluid: Boolean,
    dark: Boolean,
    customColors: Boolean,
    disabled: Boolean
  });
  const { dark, fluid, size, customColors, disabled } = props;
  const colorClass = customColors ? "" : (dark && "bg-gray-700 hover:bg-gray-900/90 text-slate-100" || "border border-slate-200 hover:bg-slate-200 text-gray-700 hover:text-gray-900/90");
  const widthClass = fluid && "w-full" || "";
  const sizeClass = `text-${size}`;
</script>

<template>
  <button
    :disabled="disabled"
    :type="props.type" 
    :class="`button ${colorClass} ${widthClass} ${sizeClass}`"
  >
    {{ props.buttonText }}
  </button>
</template>

<style lang="postcss" scoped>
  .button {
    @apply rounded transition-colors px-4 py-1;
  }

  .button:disabled {
    @apply bg-gray-400;
  }
</style>