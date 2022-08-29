<script setup>
  import { ref } from "vue"
  const emit = defineEmits(["update:value"])
  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    iconClass: String,
    name: String,
    id: String,
    required: Boolean,
    hasError: Boolean
  })

  const value = ref("");
</script>

<template>
  <label :class="`input-label ${props.hasError ? 'error' : ''}`">
    <div class="icon-wrapper">
      <font-awesome-icon :icon="props.iconClass" class="icon" />
    </div>
    <input 
      :type="props.type" 
      v-model="value"
      :name="props.name" 
      :placeholder="props.placeholder" 
      :id="props.id" 
      :required="required" 
      class="text-input"
      @input="emit('update:value', value)"
      >
  </label>
</template>

<style lang="postcss" scoped>
  .input-label {
    @apply flex items-center;
  }

  .input-label .text-input {
    @apply w-full box-border border-slate-200 border-b-4 border-r-4 px-2 py-1;
  }

  .input-label.error .text-input {
    @apply border-red-200;
  }

  .input-label .icon-wrapper {
    @apply border-slate-200 bg-slate-200 text-gray-400 border-2 py-1 px-2;
  }

  .input-label.error .icon-wrapper {
    @apply border-red-200 bg-red-200 text-red-400;
  }
</style>