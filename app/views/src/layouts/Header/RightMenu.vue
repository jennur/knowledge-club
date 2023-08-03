<script setup>
  import { ref, computed } from "vue";
  import store from "@/store/index";
  import NavigationDropdown from "@/components/Navigation/NavigationDropdown.vue";

  const user = ref(store.state.auth.user);

  const adminOptions = computed(() => {
    return user.value && user.value.roles.includes("ROLE_ADMIN") && [
      {
        name: 'Book manager', 
        icon: 'fa-solid fa-book', 
        route: { name: 'book-manager' }
      }
    ] || [];
  })
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
          ...adminOptions,
          { 
            name: 'Log out', 
            icon: 'fa-solid fa-right-from-bracket', 
            click: () => store.dispatch('auth/logout'),
            divider: true
          },
        ]"
      />
    </div>
  </nav>
</template>