<script setup>

import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["msg"]);
const emit = defineEmits(["sendForm"]);

const username = ref("");
const password = ref("");

function checkForm() {

  emit("sendForm", username.value, password.value);
}
</script>

<template>
  <form class="w-full sm:w-6/12 md:w-4/12 mx-auto" @submit.prevent="checkForm">
    <label class="flex items-center mb-4">
      <font-awesome-icon icon="fas fa-user" class="text-gray-800 mr-2" />
      <input v-model="username" type="text" name="username" placeholder="Username" id="username" required class="w-full border-b-4 border-r-4 p-1">
    </label>
    <label class="flex items-center">
      <font-awesome-icon icon="fas fa-lock" class="text-gray-800 mr-2" />
      <input v-model="password" type="password" name="password" placeholder="Password" id="password" required class=" w-full border-b-4 border-r-4 p-1">
    </label>
    <button type="submit" class="w-full bg-gray-800 hover:bg-gray-700 text-slate-100 px-4 py-1 mt-2">
      Login
    </button>
    <p v-if="msg" class="mt-2 text-red-500">{{ props.msg }}</p>
  </form>
</template>