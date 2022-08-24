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
  required: Boolean
})

const value = ref("");

</script>

<template>
  <label class="flex items-center">
    <font-awesome-icon :icon="props.iconClass" class="text-gray-800 mr-2" />
    <input 
      :type="props.type" 
      v-model="value"
      :name="props.name" 
      :placeholder="props.placeholder" 
      :id="props.id" 
      :required="required" 
      class="w-full border-slate-200 border-b-4 border-r-4 p-1"
      @input="emit('update:value', value)"
      >
  </label>
</template>