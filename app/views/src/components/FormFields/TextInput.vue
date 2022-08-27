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
  const { type, name, placeholder, id, required, hasError } = props;
  const iconBgColorClass = hasError && "border-red-200 bg-red-200" || "border-slate-200 bg-slate-200border-slate-200 bg-slate-200";
  const iconTextColorClass = hasError && "text-red-400" || "text-gray-400";
  const inputColorClass = hasError && "border-red-200" || "border-slate-200";
</script>

<template>
  <label class="flex items-center">
    <div :class="`border-2 ${iconBgColorClass} py-1 px-2`">
      <font-awesome-icon :icon="props.iconClass" :class="iconTextColorClass" />
    </div>
    <input 
      :type="props.type" 
      v-model="value"
      :name="props.name" 
      :placeholder="props.placeholder" 
      :id="props.id" 
      :required="required" 
      :class="`w-full ${inputColorClass} box-border border-b-4 border-r-4 px-2 py-1`"
      @input="emit('update:value', value)"
      >
  </label>
</template>