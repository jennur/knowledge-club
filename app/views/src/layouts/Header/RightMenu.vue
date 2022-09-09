<script setup>
  import { ref } from "vue";
  import store from "@/store/index";
  import NavigationDropdown from "@/components/Inputs/NavigationDropdown.vue";

  const user = ref(store.state.auth.user);
</script>

<template>
  <nav class="flex flex-1 justify-end">
    <div v-if="store.state.auth.user" class="flex items-center py-2">
      <NavigationDropdown
        :user="store.state.auth.user"
        :options="[
          { 
            name: 'Account', 
            icon: 'fa-solid fa-lock', 
            route: { name: 'account' } 
          },
          { 
            name: 'Log out', 
            icon: 'fa-solid fa-right-from-bracket', 
            click: () => store.dispatch('auth/logout'),
            divider: true
          }
        ]"
      />
    </div>
  </nav>
</template>