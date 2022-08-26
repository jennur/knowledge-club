<script setup>
  import { ref } from "vue";
  import store from "../../store";

  const user = store.state.auth.user;
</script>

<template>
  <div class="about">
    <h1 class="text-xl mt-6 mb-4 text-center">My account</h1>
    <dl class="flex">
      <dd class="flex-1 bg-slate-300 p-4 mr-2">
        <div class="text-xs uppercase">Username</div>
        <div>{{ user.username }}</div>
      </dd>

      <dd class="flex-1 bg-slate-300 p-4 mr-2">
        <div class="text-xs uppercase">E-mail</div>
        <div>{{ user.email }}</div>
      </dd>

      <dd v-if="user.biography" class="flex-1 bg-slate-300 p-4 mr-2">
        <div class="text-xs uppercase">Biography</div>
        <div>{{ user.biography }}</div>
      </dd>
    </dl>
  </div>
</template>

<style>

</style>
