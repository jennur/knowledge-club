<script setup>

  const props = defineProps({
    listItems: {
      type: Array,
      required: true
    },
    fontSize: {
      type: String,
      default: "base",
      validator: (value) => ["sm", "base", "lg", "xl", "xxl"].includes(value)
    },
    numberColor: {
      type: String,
      default: "black",
      validator: (value) => ["black", "grey", "rose", "emerald", "blue"].includes(value)
    }
  })

  const { listItems, fontSize, numberColor } = props;

</script>

<template>
  <ol :class="`numbered-list ${fontSize} ${numberColor}`">
    <li class="flex items-center" v-for="(item, index) in listItems" :key="item">
      <b class="number">{{ index + 1 }}</b>
      <span class="text font-light">{{ item }}</span>
    </li>
  </ol>
</template>

<style lang="postcss" scoped>

  .numbered-list.black .number {
    @apply text-black;
  }

  .numbered-list.grey .number {
    @apply text-gray-600;
  }

  .numbered-list.rose .number {
    @apply text-rose-600;
  }
  
  .numbered-list.emerald .number {
    @apply text-emerald-600;
  }
  
  .numbered-list.blue .number {
    @apply text-blue-600;
  }
  
  
  .numbered-list.sm li {
     @apply mb-2;
  }
  .numbered-list.sm li .text {
     @apply text-sm;
  }
  .numbered-list.sm li .number {
     @apply text-base mr-2;
  }
  
  .numbered-list.base li {
     @apply  mb-3;
  }
  .numbered-list.base li .text {
     @apply text-base;
  }
  .numbered-list.base li .number {
     @apply text-lg mr-3;
  }
  

  .numbered-list.lg li {
     @apply  mb-4;
  }
  .numbered-list.lg li .text {
     @apply text-lg;
  }
  .numbered-list.lg li .number {
     @apply text-xl mr-4;
  }
  

  .numbered-list.xl li {
     @apply mb-4;
  }
  .numbered-list.xl li .text {
     @apply text-xl;
  }
  .numbered-list.xl li .number {
     @apply text-2xl mr-4;
  }

  .numbered-list.xxl li {
    @apply mb-4;
  }
  .numbered-list.xxl li .text {
     @apply text-2xl;
  }
  .numbered-list.xxl li .number {
     @apply text-3xl mr-4;
  }
</style>