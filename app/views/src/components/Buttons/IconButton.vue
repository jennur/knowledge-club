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
  const { vertical, customColors, dark, size, fluid } = props;

  const widthClass = fluid && "w-full" || ""
  const flexDirClass = vertical && "flex-col" || "";
  const colorClass = customColors ? "" : (dark && "bg-gray-700 hover:bg-gray-900/90 text-slate-100" || "text-gray-700 hover:text-gray-900/90");
  const sizeClass = size && `text-${size}` || "text-xs"
  const iconSizeClass = vertical && "text-xl mb-1" || `${sizeClass} mr-2`;
  const paddingClass = vertical && "p-2" || "py-2 px-4";
</script>

<template>
  <button :type="props.type" :class="`flex items-center justify-center ${widthClass} ${flexDirClass} ${colorClass} ${sizeClass} ${paddingClass} transition-colors`">
    <font-awesome-icon :icon="props.iconClass" :class="iconSizeClass" />
    <div :class="`${sizeClass}`">{{ props.buttonText }}</div>
  </button>
</template>