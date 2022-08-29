<script setup>
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import SignUp from "./SignUp/SignUp.vue";
  import Login from "./Login/Login.vue";
  import IconButton from "../Buttons/IconButton.vue";
  import Modal from "../Modal/Modal.vue";

  const route = useRoute();
  const props = defineProps({
    signupMessage: String
  })
  const message = ref(props.signupMessage);
  const modalOpen = ref(false);
  const signedUp = ref(route.query.signupSuccess)
  const signUpModalId = "sign-up-modal";

  function toggleModal() {
    modalOpen.value = !modalOpen.value;
  }

  function signupSuccess() {
    signedUp.value = true;
    toggleModal();
  }
</script>

<template>
  <div>
    <Modal :modalId="signUpModalId" :modalOpen="modalOpen" @close="toggleModal">
      <SignUp @signupSuccess="signupSuccess" class="bg-white rounded-3xl p-16" />
    </Modal>

    <div 
      v-if="signedUp"
      class="w-2/3 text-center mx-auto text-2xl text-emerald-500 px-4 py-3 bg-emerald-100 rounded-tl-3xl rounded-tr-3xl"
    >
      Awesome!
    </div>

    <div :class="`rounded-3xl bg-white p-16 ${signedUp ? 'pt-8' : ''}`">
      <p v-if="signedUp" class="text-center text-sm text-green-800 mb-6">
        You successfully signed up, you can now login with your credentials
      </p>

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
        :aria-controls="signUpModalId"
        :aria-expanded="modalOpen"
      />
    </div>
  </div>
</template>
