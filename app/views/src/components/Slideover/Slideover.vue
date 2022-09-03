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
  const sliderTab = ref('notes');

  const defaultTab = 'notes';

  function setActiveTab(tab) {
    sliderTab.value = tab;
  }

</script>

<template>
  <div class="flex justify-between" id="slider">
    <ChapterToolBar
      @switchTab="setActiveTab"
      class="toolbar bg-slate-200 py-4 -ml-4"
    />
    <div id="slider-content" class="basis-full md:border-t md:border-slate-200 pt-5 px-4">
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
</template>

<style lang="postcss" scoped>
  .slider-content {
  }

  .slider-container.closed {
    @apply translate-x-72 sm:translate-x-96 md:translate-x-[34rem];
  }

  h2 {
    @apply text-xs uppercase text-gray-600 font-medium mb-4;
  }

  .toolbar {
    height: calc(100vh - 4.2rem);
  }
</style>