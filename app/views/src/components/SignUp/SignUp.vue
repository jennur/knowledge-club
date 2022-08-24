<script setup>
import { ref, defineEmits } from "vue"
import TextInput from "../FormFields/TextInput.vue"
import SimpleButton from "../Buttons/SimpleButton.vue"

const emit = defineEmits(['sendForm']);
const props = defineProps(["msg"]);

const username = ref("");
const email = ref("");
const password = ref("");
const passwordCompare = ref("");

const errMsg = ref("");

function checkForm(){
  console.log("Username:", username.value);
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
    <TextInput 
      @update:value="username=$event"
      type="text"
      name="username"
      id="username"
      placeholder="Username"
      iconClass="fas fa-user"
      required
      class="mb-4"
    />

    <TextInput 
      @update:value="email=$event"
      type="text"
      name="email"
      id="email"
      placeholder="E-mail"
      iconClass="fas fa-envelope"
      required
      class="mb-4"
    />

    <TextInput 
      @update:value="password=$event"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      iconClass="fas fa-lock"
      required
      class="mb-4"
    />

    <TextInput 
      @update:value="passwordCompare=$event"
      type="password"
      name="password"
      id="password-compare"
      placeholder="Repeat password"
      iconClass="fas fa-lock"
      required
      class="mb-4"
    />

    <SimpleButton type="submit" buttonText="Sign up" fullWidth dark />
    <p v-if="props.msg || errMsg" class="mt-2 text-red-500">{{ props.msg || errMsg }}</p>
  </form>
</template>