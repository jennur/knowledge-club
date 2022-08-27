<script setup>
  import { ref } from "vue";
  import SignUp from "./SignUp/SignUp.vue";
  import Login from "./Login/Login.vue";
  import IconButton from "../Buttons/IconButton.vue";

  const message = ref("");
  const modalOpen = ref(false);

  function toggleModal() {
    modalOpen.value = !modalOpen.value;
  }

  function signupSuccess(msg) {
    message.value = msg;
    toggleModal();
  }
</script>

<template>
  <div>
    <div id="signup-modal" v-if="modalOpen" class="absolute w-full h-screen top-0 left-0 z-20 bg-slate-100/70 backdrop-blur flex items-center justify-center">
      <div class="relative p-8">
        <button @click="toggleModal" aria-label="Close modal" class="absolute top-0 right-9 md:right-0">
          <font-awesome-icon icon="fas fa-xmark" />
        </button>
        <SignUp @signinSuccess="signupSuccess" class="w-full bg-white border border-slate-200 rounded-3xl p-16" />
      </div>
    </div>

    <div class="border border-slate-200 rounded-3xl w-96 mx-auto mt-12 p-16">
      <Login class="" />

      <div class="relative py-6">
        <span class="z-10 p-2 bg-white text-xs text-gray-400 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">OR</span>
        <span class="w-full border-b border-b-gray-400 absolute" />
      </div>

      <IconButton
        fluid
        customColors
        @click="toggleModal"
        iconClass="fas fa-user-plus"
        buttonText="Create new account"
        size="md"
        class="bg-emerald-600 text-white mx-auto"
        aria-haspopup="dialog"
        aria-controls="signup-modal"
        :aria-expanded="modalOpen"
      />

      <p v-if="message" class="text-center text-sm text-green-800 mt-2">
        {{ message }}
      </p>
    </div>
  </div>
</template>
