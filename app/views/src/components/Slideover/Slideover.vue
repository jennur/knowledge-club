<script setup>
  import { ref } from "vue";
  import ChapterToolBar from "../ChapterToolBar/ChapterToolBar.vue";
  import HighlightFilter from "../HighlightFilter/HighlightFilter.vue";
  import NoteList from "../Notes/NoteList/NoteList.vue";
  import NewNote from "../Notes/NewNote/NewNote.vue";
  import Chat from "../Chat/Chat.vue"
  import { chapterRoomId } from "../../helpers/chatRoomIds";

  const emit = defineEmits(["sliderStatus", "toggleHighlights"]);
  const props = defineProps({
    bookId: String,
    chapterId: String
  })

  const { bookId, chapterId } = props;

  const open = ref(false);
  const sliderTab = ref(null);

  const defaultTab = 'notes';

  function openSlider(tab) {
    open.value = true;
    sliderTab.value = tab || defaultTab;
    emit("sliderStatus", true);
  }

  function toggleSlider() {
    open.value = !open.value;
    if(!sliderTab.value) sliderTab.value = defaultTab;
    emit("sliderStatus", open.value);
  }

</script>

<template>
<div>
  <div ref="slideOver" :class="`slider-container ${open ? 'right-0' : 'closed right-4'}`" id="slider">
    <ChapterToolBar 
      @openSlider="openSlider"
      @toggleSlider="toggleSlider"
      :class="`${open ? 'rounded-tl-3xl rounded-bl-3xl' : 'rounded-3xl'} py-4`" 
    />

    <div :class="`${open ? 'opacity-1': 'opacity-0'} slider-content`">

      <div v-if="sliderTab === 'notes'">
        <h2>Notes</h2>

        <NoteList />
      </div>

      <div v-if="sliderTab === 'highlights'">
        <h2>Highlights</h2>

        <HighlightFilter />
      </div>

      <div v-if="sliderTab === 'add-note'">
        <h2>New note</h2>

        <NewNote />
      </div>

      <div v-if="sliderTab === 'chat'" class="flex flex-col h-full">
        <h2>Chat room</h2>

        <Chat :roomId="chapterRoomId(bookId, chapterId)" />
      </div>
    </div>
  </div>
</div>
</template>

<style lang="postcss" scoped>

  .slider-container {
    @apply h-5/6 min-h-max flex absolute top-16
      duration-200 ease-out transition-all;
  }
  .slider-content {
    @apply w-72 sm:w-96 md:w-[34rem] bg-slate-200 p-4;
  }

  .slider-container.closed {
    @apply translate-x-72 sm:translate-x-96 md:translate-x-[34rem];
  }

  h2 {
    @apply text-xs uppercase text-gray-600 font-medium mb-4;
  }
</style>