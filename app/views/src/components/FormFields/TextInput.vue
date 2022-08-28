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