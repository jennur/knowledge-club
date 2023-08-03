<script setup>
  const props = defineProps({
    iconClass: {
      type: String,
      required: true 
    },
    buttonText: {
      type: String
    },
    ariaLabel: {
      type: String
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
    vertical: Boolean,
    dark: Boolean,
    customColors: Boolean
  });
  const { vertical, customColors, dark, size, fluid, iconClass, buttonText, type, ariaLabel } = props;

  const fluidClass = fluid && "fluid" || ""
  const verticalClass = vertical && "vertical" || "";
  const colorClass = customColors ? "" : (dark && "dark" || "basic");
  const sizeClass = size && size || ""
  const hasText = buttonText && "has-text" || ""
</script>

<template>
  <button 
    :type="type" 
    :class="`icon-button ${hasText} ${sizeClass} ${verticalClass} ${fluidClass} ${colorClass}`"
    :aria-label="ariaLabel"
  >
    <font-awesome-icon :icon="iconClass" class="icon" aria-hidden="true" />
    <div v-if="buttonText" class="text">{{ buttonText }}</div>
  </button>
</template>

<style lang="postcss" scoped>
  .icon-button {
    @apply flex items-center justify-center transition-colors py-2 px-4;
  }

  .icon-button.basic {
    @apply text-gray-700 hover:text-gray-900/90;
  }

  /* Sizes */

  .icon-button.xs {
    @apply text-xs;
  }

  .icon-button.xs .icon {
    @apply text-xs mr-2;
  }

  .icon-button.sm {
    @apply text-sm;
  }

  .icon-button.sm .icon {
    @apply text-sm mr-2;
  }

  .icon-button.md {
    @apply text-base;
  }

  .icon-button.md .icon {
    @apply text-base mr-2;
  }

  .icon-button.lg {
    @apply text-lg;
  }

  .icon-button.lg .icon {
    @apply text-lg mr-2;
  }

  /* Vertical */
  .icon-button.vertical {
    @apply flex-col p-2;
  }

  .icon-button.vertical.has-text .icon {
    @apply text-xl;
  }

  .icon-button.vertical .text {
    @apply text-xs mt-1;
  }

  /* Fluid */
  .icon-button.fluid {
    @apply w-full;
  }

  /* Dark */
  .icon-button.dark {
    @apply bg-gray-700 hover:bg-gray-900/90 text-slate-100;
  }

  .icon-button.vertical .icon {
    @apply mr-0;
  }
</style>