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
  const { vertical, customColors, dark, size, fluid } = props;
  const widthClass = fluid && "w-full" || ""
  const flexDirClass = vertical && "flex-col" || "";
  const colorClass = customColors ? "" : (dark && "bg-gray-700 hover:bg-gray-900/90 text-slate-100" || "text-gray-700 hover:text-gray-900/90");
  const sizeClass = size && `text-${size}` || "text-xs"
  const iconSizeClass = size || vertical && "text-xl" || "text-xs";
  const paddingClass = vertical && "p-2" || "py-2 px-4";
  const contentClass = fluid && "mx-auto" || ""
</script>

<template>
  <button :type="props.type" :class="`flex items-center justify-center ${widthClass} ${flexDirClass} ${colorClass} ${sizeClass} ${paddingClass} transition-colors`">
    <font-awesome-icon :icon="props.iconClass" :class="`${iconSizeClass} ${vertical ? 'mb-1' : 'mr-2'}`" />
    <div :class="`${sizeClass}`">{{ props.buttonText }}</div>
  </button>
</template>