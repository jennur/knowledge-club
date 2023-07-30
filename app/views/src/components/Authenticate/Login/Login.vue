<script setup>
  import { ref, computed } from "vue";
  import store from "../../../store/index";
  import TextInput from "../../Inputs/TextInput.vue";
  import SimpleButton from "../../Buttons/SimpleButton.vue";
  import InlineLink from "../../Links/InlineLink.vue";

  const emit = defineEmits(["success"]);

  const props = defineProps(["headline", "hasSignUpLink"])
  const username = ref("");
  const password = ref("");
  const errorMsg = ref("");

  function login() {
    store.dispatch("auth/login", { 
      username: username.value, 
      password: password.value 
    })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        errorMsg.value = err?.response?.data?.message;
      });
  }
</script>

<template>
  <form @submit.prevent="login">
    <h2 v-if="props.headline" class="text-lg mb-4">
      {{ props.headline }}
    </h2>
    <TextInput 
      @update:value="username=$event"
      type="text"
      name="username"
      id="login-username"
      placeholder="Username"
      iconClass="fas fa-user"
      class="mb-4"
      required
    />

    <TextInput 
      @update:value="password=$event"
      type="password"
      name="password"
      id="login-password"
      placeholder="Password"
      iconClass="fas fa-lock"
      class="mb-4"
      required
    />

    <SimpleButton type="submit" buttonText="Log in" fluid dark/>
    <p 
      v-if="errorMsg"
      class="border border-red-300 bg-red-50 py-1 px-2 mt-2 text-sm text-left text-red-500"
    >
      {{ errorMsg }}
    </p>

    <p v-if="props.hasSignUpLink" class="text-sm mt-4">If you don't have an account yet,
      <InlineLink :to="{ name: 'signup' }" linkText="sign up!"/>
    </p>
  </form>
</template>