<script setup>
  const emit = defineEmits(["close"])
  const props = defineProps({
    modalId: {
      type: String,
      required: true
    },
    modalOpen: Boolean
  })
</script>

<template>
  <div :id="props.modalId" v-if="props.modalOpen" class="fixed w-full h-screen max-h-screen top-0 left-0 z-20 bg-slate-100/70 backdrop-blur flex items-center justify-center">
    <div class="relative max-h-full p-8 m-4">
      <button @click.stop="emit('close')" aria-label="Close modal" class="absolute top-0 right-9 md:right-0">
        <font-awesome-icon icon="fas fa-xmark" />
      </button>
        <slot />
    </div>
  </div>
</template>