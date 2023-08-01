<script setup>
  import store from "@/store/index"
  import { computed } from 'vue'

  const props = defineProps({
    /**
     * @param {Array} routes List of route objects to show in the breadcrumbs
     * @param {Object} route.title Name of the route
     * @param {Object} route.route.name Reference to defined route in routes.js
     * @param {Object} route.route.params Params defined in routes.js
     *
     */
    routes: {
      type: Object,
      required: true
    },
    currentRoute: {
      type: String,
      // required: true
    }
  })
</script>

<template>
  <div class="flex align-middle flex-wrap text-xs uppercase text-gray-400">
    <span v-for="route in props.routes" :key="route.title">
      <RouterLink class="breadcrumb" 
        :to="{ name: route.name, params: route.params}"
      >{{ route.title }}</RouterLink>
      <span class="mx-1 text-slate-700">/</span>
    </span>
    <span class="current-route" v-html="props.currentRoute"></span>
  </div>
</template>

<style lang="postcss" scoped>
  .breadcrumb {
    @apply hover:underline;
  }

  .current-route { 
    @apply text-slate-700;
  }
  .night .current-route {
    @apply text-slate-100;
  }
</style>