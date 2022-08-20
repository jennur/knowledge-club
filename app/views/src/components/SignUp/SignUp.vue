<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(['sendForm'])
const props = defineProps(["msg"])

const username = ref("");
const email = ref("");
const password = ref("");
const passwordCompare = ref("");

const errMsg = ref("");

function checkForm(){
  if(password.value !== passwordCompare.value) {
    errMsg.value = "Passwords don't match";
  } 
  else {
    emit("sendForm", {
      username: username.value,
      email: email.value,
      password: password.value
    })
  }
}
</script>

<template>
  <form class="w-full sm:w-6/12 md:w-4/12 mx-auto" @submit.prevent="checkForm">
    <label class="flex items-center mb-4">
      <font-awesome-icon icon="fas fa-user" class="text-gray-800 mr-2" />
      <input v-model="username" type="text" name="username" placeholder="Username" id="username" required class="w-full border-b-4 border-r-4 p-1">
    </label>

    <label class="flex items-center mb-4">
      <font-awesome-icon icon="fas fa-user" class="text-gray-800 mr-2" />
      <input v-model="email" type="text" name="email" placeholder="E-mail" id="email" required class="w-full border-b-4 border-r-4 p-1">
    </label>

    <label class="flex items-center mb-4">
      <font-awesome-icon icon="fas fa-lock" class="text-gray-800 mr-2" />
      <input v-model="password" type="password" name="password" placeholder="Password" id="password" required class=" w-full border-b-4 border-r-4 p-1">
    </label>

    <label class="flex items-center">
      <font-awesome-icon icon="fas fa-lock" class="text-gray-800 mr-2" />
      <input v-model="passwordCompare" type="password" name="password2" placeholder="Repeat password" id="password2" required class=" w-full border-b-4 border-r-4 p-1">
    </label>

    <button type="submit" class="w-full bg-gray-800 hover:bg-gray-700 text-slate-100 px-4 py-1 mt-2">
      Sign up
    </button>
    <p v-if="props.msg || errMsg" class="mt-2 text-red-500">{{ props.msg || errMsg }}</p>
  </form>
</template>