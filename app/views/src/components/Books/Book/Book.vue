<script setup>
  import { ref, computed, defineEmits } from "vue";
  import moment from "moment";
  import store from "../../../store/index";
  import encodeUrl from "../../../helpers/urlEncoder/encodeUrl";
  import Modal from "../../Modal/Modal.vue";
  import Login from "../../Authenticate/Login/Login.vue";
  import BookCover from "./BookCover.vue";
  import IconButton from "../../Buttons/IconButton.vue"

  const emit = defineEmits(["remove"])
  const bookAccessModalId = "book-access-modal";
  const removeHover = ref(false);
  const errorMsg = ref(null);

  const { book, manager } = defineProps({
    book: {
      type: Object,
      required: true
    },
    manager: Boolean
  })
  const modalOpen = ref(false);

  const userAuthenticated = computed(() => store?.state?.auth?.user);

  function toggleModal() {
    modalOpen.value = !modalOpen.value;
  }

  function authenticate() {
    if(!store?.state?.auth?.user) {
      toggleModal();
    }
  }

  function handleRemove() {
    store.dispatch("books/deleteBook", book.bookUUID)
      .then(() => {
        emit("remove");
      })
      .catch(err => {
        errorMsg.value = err.message;
        setTimeout(() => {
          errorMsg.value = null;
        }, 10000);
      });
  }
</script>

<template>
  <div :class="`transition-colors flex flex-col items-center justify-between grow ${removeHover ? 'bg-red-100' : ''}`">
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
      class="block box-border text-gray-600 text-sm min-w-full p-2 cursor-pointer"
      @click.stop="authenticate"
    >

      <BookCover :bookId="book?.bookUUID" />

      <div class="mt-1">{{ book.title }}</div>
      <div class="text-xs text-gray-400 mt-2">
        Added {{ moment(book.createdAt).startOf('minute').fromNow() }}
      </div>
    </component>
    <div v-if="manager" class="relative mb-7 text-center">
      <IconButton  
        buttonText="Remove"
        iconClass="trash"
        size="xs"
        customColors
        :class="`transition-colors bg-red-400 text-slate-100 ${removeHover ? 'bg-red-500' : ''}`"
        @click.native="handleRemove"
        @mouseover="removeHover = true"
        @mouseleave="removeHover = false"
      />
      
      <p v-if="errorMsg" class="transition-all bg-red-50 p-2 z-10 text-red-500 text-xs absolute top-full">{{ errorMsg }}</p>

    </div>
  </div>
</template>

<style lang="postcss" scoped>


</style>