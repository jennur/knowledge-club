<script setup>
  import { ref } from "vue";
  import SignUp from "./SignUp/SignUp.vue";
  import Login from "./Login/Login.vue";
  import IconButton from "../Buttons/IconButton.vue";
  import Modal from "../Modal/Modal.vue";
  const props = defineProps({
    signupMessage: String
  })
  const message = ref(props.signupMessage);
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
    <Modal id="signp-modal" :modalOpen="modalOpen" @close="toggleModal">
      <SignUp @signupSuccess="signupSuccess" class="bg-white rounded-3xl p-16" />
    </Modal>

    <div class="rounded-3xl bg-white p-16">
      <Login />

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
