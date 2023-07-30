<script setup>
  import { shallowRef, watch } from "vue";
  import { useRoute } from "vue-router";
  import DefaultLayout from "./layouts/DefaultLayout.vue";

  const route = useRoute();
  const layout = shallowRef(DefaultLayout);

  watch(route, async () => {
    try {
      const component = await import(`./layouts/${route.meta.layout}.vue`)
      layout.value = component?.default || DefaultLayout;
    } catch (err) {
      layout.value = DefaultLayout;
    }
  })
</script>

<template>
  <div>
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>
