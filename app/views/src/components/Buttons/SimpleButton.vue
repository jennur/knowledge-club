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
    fullWidth: Boolean,
    dark: Boolean,
    type: {
      type: String,
      default: () => "button",
      validator: (value) => ["button", "submit"].includes(value)
    }
  });
  const colorClass = props.dark && "bg-gray-700 hover:bg-gray-900/90 text-slate-100" || "border border-slate-200 hover:bg-slate-200 text-gray-700 hover:text-gray-900/90";
  const widthClass = props.fullWidth && "w-full" || "";
  const sizeClass = `text-${props.size}`;
</script>

<template>
  <button :type="props.type" :class="`${colorClass} ${widthClass} ${sizeClass} transition-colors px-4 py-1`">
    {{ props.buttonText }}
  </button>
</template>