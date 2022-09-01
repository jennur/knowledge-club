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
  const bookAccessModalId = "book-access-modal";

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
    <Modal :modalId="bookAccessModalId" :modalOpen="modalOpen" @close="toggleModal">
      <Login 
        class="bg-white rounded-3xl p-16" 
        headline="Login to access this book"
        :hasSignUpLink="true"
        @success="toggleModal"
      />
    </Modal>

    <component :is="!store?.state?.auth?.user && 'span' || 'RouterLink'"
      :to="`/books/${book.bookUUID}/chapters`"
      :role="!store?.state?.auth?.user ? 'button' : ''"
      :aria-label="`Book title: ${book.title}`"
      :aria-expanded="modalOpen"
      :aria-controls="bookAccessModalId"
      aria-haspopup="dialog"
      class="block box-border text-gray-600 text-sm m-2 cursor-pointer"
      @click.stop="authenticate"
    >

      <div class="h-40 sm:h-60 md:h-60 lg:h-70 xl:h-80 bg-slate-200 text-2xs text-slate-400 p-2 mb-2">
        Book cover
      </div>
      <div>{{book.title}}</div>
      <div class="text-xs text-gray-400 mt-2">
        Added {{ moment(book.createdAt).startOf('day').fromNow() }}
      </div>
    </component>
  </div>
</template>