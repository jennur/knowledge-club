<script setup>
  import { ref, computed } from "vue";
  import store from "@/store/index";
  import SelectDropdown from "@/components/Inputs/SelectDropdown.vue";

  const user = computed(() => store.state.auth.user);

  const adminOptions = computed(() => {
    return user.value && user.value.roles.includes("ROLE_ADMIN") && [
      {
        name: 'Book manager', 
        icon: 'book', 
        route: { name: 'book-manager' }
      }
    ] || [];
  })
</script>

<template>
  <nav class="flex flex-1 justify-end">
    <div v-if="user" class="flex items-center py-2">
      <SelectDropdown
        :defaultText="user.username"
        defaultIcon="user"
        :options="[
          { 
            name: 'Account', 
            icon: 'lock', 
            route: { name: 'account' } 
          },
          ...adminOptions,
          { 
            name: 'Log out', 
            icon: 'right-from-bracket', 
            click: () => store.dispatch('auth/logout'),
            divider: true
          },
        ]"
      />
    </div>
  </nav>
</template>