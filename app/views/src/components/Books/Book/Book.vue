<script setup>
  import { ref, computed } from "vue";
  import moment from "moment";
  import store from "../../../store/index";
  import encodeUrl from "../../../helpers/urlEncoder/encodeUrl";
  import Modal from "../../Modal/Modal.vue";
  import Login from "../../Authenticate/Login/Login.vue";
  import BookCover from "./BookCover.vue";

  const props = defineProps({
    book: {
      type: Object,
      required: true
    }
  })
  const modalOpen = ref(false);
  const bookAccessModalId = "book-access-modal";

  const { book } = props;

  const userAuthenticated = computed(() => store?.state?.auth?.user);

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

    <component :is="!userAuthenticated && 'span' || 'RouterLink'"
      :to="{ name: 'book', params: { id: book.bookUUID }}"
      :role="!userAuthenticated ? 'button' : ''"
      :aria-label="`Book title: ${book.title}`"
      :aria-expanded="modalOpen"
      :aria-controls="bookAccessModalId"
      aria-haspopup="dialog"
      class="block box-border text-gray-600 text-sm m-2 cursor-pointer"
      @click.stop="authenticate"
    >

      <BookCover :bookId="book?.bookUUID" />

      <div class="mt-1">{{ book.title }}</div>
      <div class="text-xs text-gray-400 mt-2">
        Added {{ moment(book.createdAt).startOf('minute').fromNow() }}
      </div>
    </component>
  </div>
</template>