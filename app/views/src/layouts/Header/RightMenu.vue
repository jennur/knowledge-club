<script setup>
  import { ref } from "vue";
  import { RouterLink } from 'vue-router'
  import IconLink from "../../components/Links/IconLink.vue"
  import IconButton from "../../components/Buttons/IconButton.vue"
  import store from "../../store/index"

  const user = ref(store.state.auth.user);
</script>

<template>
  <nav class="flex flex-1 justify-end">
    <div v-if="store.state.auth.user" class="flex items-center">
      <!-- <IconLink path="/books" linkText="Books" iconClass="fa-solid fa-book" /> -->
      <!-- <IconLink path="/chat" linkText="Chat" iconClass="fa-solid fa-comment" /> -->
      <IconLink path="/account" linkText="Account" iconClass="fa-solid fa-user" />
      <!-- <IconButton vertical @click="store.dispatch('auth/logout')" buttonText="Log out" iconClass="fa-solid fa-right-from-bracket" /> -->
    </div>
  </nav>
</template>