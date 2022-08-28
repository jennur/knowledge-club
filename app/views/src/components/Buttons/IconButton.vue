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
    size: {
      type: String,
      default: () => null,
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
  const { vertical, customColors, dark, size, fluid, iconClass, buttonText, type } = props;

  const fluidClass = fluid && "fluid" || ""
  const verticalClass = vertical && "vertical" || "";
  const colorClass = customColors ? "" : (dark && "dark" || "basic");
  const sizeClass = size && size || ""
</script>

<template>
  <button 
    :type="type" 
    :class="`icon-button ${sizeClass} ${verticalClass} ${fluidClass} ${colorClass}`">
    <font-awesome-icon :icon="iconClass" class="icon" />
    <div class="text">{{ buttonText }}</div>
  </button>
</template>