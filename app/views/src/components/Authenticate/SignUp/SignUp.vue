<script setup>
  import { ref, computed } from "vue";
  import store from "../../../store/index";
  import TextInput from "../../Inputs/TextInput.vue";
  import SimpleButton from "../../Buttons/SimpleButton.vue";

  const emit = defineEmits(["success"]);

  const username = ref("");
  const email = ref("");
  const password = ref("");
  const passwordCompare = ref("");

  const passwordError = ref(false);
  const fieldErrors = ref(null);
  const errorMsg = ref("");
  const errorFields = computed(() => fieldErrors.value && [...fieldErrors.value].map(error => {
      return error.field;
    })
  )

  function checkForm() {
    fieldErrors.value = [];
    
    if(password.value !== passwordCompare.value) {
      passwordError.value = true;
    } 
    else {
      passwordError.value = false;
      store.dispatch("auth/register", { 
          username: username.value, 
          password: password.value, 
          email: email.value 
        })
        .then(() => {
          emit("success");
        })
        .catch(err => {
          console.log("SignUp.vue error:", err);
          fieldErrors.value = err?.response?.data?.errors;
          errorMsg.value = err?.response?.data?.message;
        })
    }
  }
</script>

<template>
  <form @submit.prevent="checkForm">
    <TextInput 
      @update:value="username=$event"
      type="text"
      name="username"
      id="signup-username"
      placeholder="Username"
      iconClass="fas fa-user"
      class="mb-4"
      :hasError="errorFields?.includes('username')"
    />

    <TextInput 
      @update:value="email=$event"
      type="text"
      name="email"
      id="signup-email"
      placeholder="E-mail"
      iconClass="fas fa-envelope"
      class="mb-4"
      :hasError="errorFields?.includes('email')"
    />

    <TextInput 
      @update:value="password=$event"
      type="password"
      name="password"
      id="signup-password"
      placeholder="Password"
      iconClass="fas fa-lock"
      class="mb-4"
      :hasError="passwordError || errorFields?.includes('password')"
    />

    <TextInput 
      @update:value="passwordCompare=$event"
      type="password"
      name="password"
      id="signup-password-compare"
      placeholder="Repeat password"
      iconClass="fas fa-lock"
      class="mb-4"
      :hasError="passwordError || errorFields?.includes('password')"
    />

    <SimpleButton type="submit" buttonText="Sign up" fluid customColors class="bg-emerald-600 text-white  mb-2" />

      <p v-if="errorMsg" class="error-container">
      {{ errorMsg }}
      </p>
      <div v-if="fieldErrors" class="error-container">
        <p v-for="error in fieldErrors" :key="error.field" class="my-1">
          {{ error.message }}
        </p>
      </div>
      <p v-if="passwordError" class="error-container">
        Passwords don't match
      </p>
  </form>
</template>

<style lang="postcss" scoped>
  .error-container {
    @apply border border-red-300 bg-red-50 py-1 px-2 mt-2 text-sm text-left text-red-500;
  }
</style>