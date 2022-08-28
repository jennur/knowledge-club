<script setup>
  import { ref } from "vue";
  import moment from "moment";
  import store from "../../../store/index";
  import Modal from "../../Modal/Modal.vue";
  import Login from "../../Authenticate/Login/Login.vue";

  const props = defineProps({
    book: {
      type: Object,
      required: true
    }
  })
  const modalOpen = ref(false);
  const { book } = props;

  function toggleModal() {
    modalOpen.value = !modalOpen.value;
  }

  function authenticate() {
    if(!store?.state?.auth?.user) {
      toggleModal();
    }
  }
</script>

<template>
  <div>
    <Modal modalId="book-access-modal" :modalOpen="modalOpen" @close="toggleModal">
      <Login 
        class="bg-white rounded-3xl p-16" 
        headline="Login to access this book"
        :hasSignUpLink="true"
      />
    </Modal>

    <component :is="store?.state?.auth?.user && 'RouterLink' || 'button'"
      :to="`/books/${book.bookUUID}/chapters`" 
      class="block box-border text-gray-600 text-sm m-2"
      @click.stop="authenticate"
    >

      <div class="h-40 sm:h-60 md:h-60 lg:h-70 bg-slate-200 text-2xs text-slate-400 p-2 mb-2">
        Book cover
      </div>
      <div>{{book.title}}</div>
      <div class="text-xs text-gray-400 mt-2">
        Added {{ moment(book.createdAt).startOf('day').fromNow() }}
      </div>
    </component>
  </div>
</template>