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

  const fieldErrors = ref([]);
  const errorMsg = ref("");
  const errorFields = computed(() => fieldErrors.value && [...fieldErrors.value].map(error => {
      return error.field;
    })
  );

  function login() {
    fieldErrors.value = [];
    
    store.dispatch("auth/login", { username: username.value, password: password.value })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log("Login.vue error:", err);
        fieldErrors.value = err?.response?.data?.errors;
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
      required
      class="mb-4"
      :hasError="errorFields?.includes('username')"
    />

    <TextInput 
      @update:value="password=$event"
      type="password"
      name="password"
      id="login-password"
      placeholder="Password"
      iconClass="fas fa-lock"
      required
      class="mb-4"
      :hasError="errorFields?.includes('password')"
    />

    <SimpleButton type="submit" buttonText="Log in" fluid dark/>
    <p v-if="errorMsg" class="mt-2 text-left text-red-500">{{ errorMsg }}</p>
    <p v-for="error in fieldErrors" :key="error.field || error.message" class="mt-2 text-left text-red-500">
      {{ error.message }}
    </p>

    <p v-if="props.hasSignUpLink" class="text-sm mt-4">If you don't have an account yet,
      <InlineLink :to="{ name: 'signup' }" linkText="sign up!"/>
    </p>
  </form>
</template>