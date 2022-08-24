<script setup>
  import { ref, computed } from "vue"
  import TextInput from "../FormFields/TextInput.vue"
  import SimpleButton from "../Buttons/SimpleButton.vue"

  const emit = defineEmits(['sendForm']);
  const props = defineProps({
    fieldErrors: {
      type: Array,
      default: () => []
    },
    errorMsg: {
      type: String,
      default: ""
    }
  });
  const errorFields = computed(() => props.fieldErrors && [...props.fieldErrors].map(error => {
      return error.field;
    })
  )

  const username = ref("");
  const email = ref("");
  const password = ref("");
  const passwordCompare = ref("");

  const passwordError = ref(false);

  function checkForm(){
    if(password.value !== passwordCompare.value) {
      passwordError.value = true;
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
      :hasError="errorFields.includes('username')"
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
      :hasError="errorFields.includes('email')"
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
      :hasError="passwordError || errorFields.includes('password')"
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
      :hasError="passwordError || errorFields.includes('password')"
    />

    <SimpleButton type="submit" buttonText="Sign up" fullWidth dark class="mb-2" />

    <div class="text-left text-sm text-red-500">
      <p v-if="props.errorMsg">{{ errorMsg }}</p>
      <p v-for="error in props.fieldErrors" :key="error.field" class="">
        {{ error.message }}
      </p>
      <p v-if="passwordError" class="">Passwords don't match</p>
    </div>
  </form>
</template>