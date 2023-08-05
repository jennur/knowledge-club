<script setup>
  import { ref, watch, computed } from "vue";
  import { chapterRoomId } from "@/helpers/chatRoomIds";
  import store from "@/store/index.js";
  import ChapterToolBar from "./ChapterToolBar/ChapterToolBar.vue";
  import HighlightFilter from "./HighlightFilter/HighlightFilter.vue";
  import NoteList from "./NoteList/NoteList.vue";
  import NewNote from "./NewNote/NewNote.vue";
  import Chat from "./Chat/Chat.vue"

  const emit = defineEmits(["sliderStatus", "toggleHighlights", "saveNote"]);
  const props = defineProps({
    bookId: String,
    chapterNum: String,
    highlight: Object,
    savingError: String
  })

  const toolTab = computed(() => store.state.chapters.focusedChapter.currentToolTab);
  const highlight = computed(() => props.highlight);

  function setActiveTab(tab) {
    store.dispatch("chapters/openToolTab", tab)
    .catch((err) => {
      console.error("[Y]", err.message);
    })
  }

  watch(highlight, (newVal, oldVal) => {
    setActiveTab("add-note");
  })

</script>

<template>
  <div class="flex justify-between" id="slider">
    <ChapterToolBar
      @switchTab="setActiveTab"
      :activeTab="toolTab"
      class="c-toolbar bg-slate-200 py-4 -ml-4"
    />
    <div id="slider-content" class="basis-full md:border-t md:border-slate-200 pt-5 px-4 pb-16">
      <div v-if="toolTab === 'notes'">
        <h2>Notes</h2>

        <NoteList />
      </div>

      <div v-if="toolTab === 'highlights'">
        <h2>Highlights</h2>

        <HighlightFilter />
      </div>

      <div v-if="toolTab === 'add-note'">
        <h2>New note</h2>

        <NewNote 
          :highlight="highlight" 
          @save="note => emit('saveNote', note)"
          :savingError="savingError"
        />
      </div>

      <div v-if="toolTab === 'chat'" class="flex flex-col h-full">
        <h2>Chat room</h2>

        <Chat :roomId="chapterRoomId(bookId, chapterNum)" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

#slider {
  @apply max-h-full;
}
  #slider-content {
    @apply max-h-full overflow-scroll;
  }

  .slider-container.closed {
    @apply translate-x-72 sm:translate-x-96 md:translate-x-[34rem];
  }

  h2 {
    @apply text-xs uppercase text-gray-600 font-medium mb-4;
  }

  .c-toolbar {
    height: calc(100vh - 4.2rem);
  }
</style>