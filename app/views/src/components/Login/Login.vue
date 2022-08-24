<script setup>
  import { ref, defineEmits } from "vue";
  import TextInput from "../FormFields/TextInput.vue";
  import SimpleButton from "../Buttons/SimpleButton.vue";

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
      @update:value="password=$event"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      iconClass="fas fa-lock"
      required
      class="mb-4"
    />

    <SimpleButton type="submit" buttonText="Log in" fullWidth dark/>

    <p v-if="msg" class="mt-2 text-red-500">{{ props.msg }}</p>
  </form>
</template>