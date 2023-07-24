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
  const fieldErrors = ref([]);
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
      required
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
      required
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
      required
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
      required
      class="mb-4"
      :hasError="passwordError || errorFields?.includes('password')"
    />

    <SimpleButton type="submit" buttonText="Sign up" fluid customColors class="bg-emerald-600 text-white  mb-2" />

    <div class="text-left text-sm text-red-500">
      <p v-if="errorMsg">{{ errorMsg }}</p>
      <p v-for="error in fieldErrors" :key="error.field" class="">
        {{ error.message }}
      </p>
      <p v-if="passwordError" class="">Passwords don't match</p>
    </div>
  </form>
</template>