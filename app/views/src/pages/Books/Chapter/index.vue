<script setup>
  import store from "@/store/index"
  import { useRoute, RouterLink } from "vue-router";
  import { computed, ref, watch } from 'vue'
  import encodeUrl from "../../../helpers/urlEncoder/encodeUrl";

  import ChapterLayout from "@/layouts/ChapterLayout.vue";
  import ChapterToolTabs from "@/components/ChapterToolTabs/ChapterToolTabs.vue";
  import HighlightToolbar from "@/components/HighlightToolbar/HighlightToolbar.vue";
  import Modal from "@/components/Modal/Modal.vue";
  import MarkdownEditor from "@/components/Inputs/MarkdownEditor.vue";
  import getHighlightedText from "@/helpers/highlightFunctions/getHighlightedText";
  import getSelectedText from "@/helpers/highlightFunctions/getSelectedText";
  import processSelectedText from "@/helpers/highlightFunctions/processSelectedText";
  import addChapterNote from "@/helpers/noteFunctions/addChapterNote";

  const route = useRoute();
  const { id: bookId, chapterNum } = route.params;

  store.dispatch("chapters/getChapter", { bookId, chapterNum });
  store.dispatch("chapters/getFocusedBook", bookId);

  const dbObj = ref(null);
  const textWithHighlights = ref(null);
  const showHighlightToolBar = ref(null);
  const toolbarPosition = ref(null);
  const errorMsg = ref(null);

  const user = computed(() => store.state.auth.user);
  const chapterData = computed(() => store.state.chapters.focusedChapter);
  const allHighlightsVisible = computed(() => store.state.chapters.focusedChapter?.visibleHighlights?.all);
  const bookData = computed(() => store.state.chapters.focusedBook);
  const isFirstChapter = parseInt(chapterNum) - 1 < 0;
  const isLastChapter = parseInt(chapterNum) + 1 === store.state.chapters.chapters.length;

  function handleTextSelect() {
    const selection = window.getSelection();

    if(selection.type === "Caret") {
      showHighlightToolBar.value = false;
      return;
    }
    let position = selection.getRangeAt(0).getBoundingClientRect();

    toolbarPosition.value = {
      top: `${position.top + position.height}px`,
      left: `${position.left}px`
    };

    dbObj.value = processSelectedText(selection);
    showHighlightToolBar.value = true;
    console.log("DB_OBJ:", dbObj.value);
  }

  function storeSelectedText(text, note) {  
    store.dispatch("chapters/postHighlight", {
      ...dbObj.value,
      bookId,
      chapterNum,
      fromUser: user.value.username,
      note
    })
    .then((highlight) => {
      console.log("Highlight", highlight);
      if(note) store.dispatch("chapters/openToolTab", "notes");
    })
    .catch((err) => {
      console.log("Error:", err);
      errorMsg.value = err.message;
    })

    showHighlightToolBar.value = false;
  }

  function toggleHighlights(show) {
    try {
      textWithHighlights.value = show ?  getHighlightedText() : null;
    }
    catch(err) {
      console.log("Error doing highlights:", err);
    }
  }

  watch(allHighlightsVisible, (newVal, oldVal) => {
    toggleHighlights(!!newVal);
  })

  const highlight = ref(null);

  function openNewNoteTab() {
    let selectedText = getSelectedText();
    highlight.value = selectedText;
  }

  function saveNote(note) {
    storeSelectedText(note.highlight, note.note);
    console.log("Saving note");
  }
  function hideHighlightToolbar() {
    showHighlightToolBar.value = false;
  }
</script>

<template>
  <ChapterLayout>
    <template #sidebar>
      <ChapterToolTabs 
        class="md:mt-2" 
        :highlight="highlight"
        @saveNote="saveNote"
      />
    </template>

    <template #main>
      <div class="pb-16 mt-4">
        <div class="flex items-center justify-between">
          <RouterLink 
            :to="{ name: 'book', params: { id: bookId }}"
            class="text-xs uppercase text-gray-400"
          >
            {{ bookData?.title }}
          </RouterLink>

          <div class="text-xs uppercase text-gray-400">
            <RouterLink 
              v-if="!isFirstChapter"
              :to="{ name: 'chapter', params: { id: bookId, chapterNum: parseInt(chapterNum) - 1 }}"
            >
              Previous chapter
            </RouterLink>
            <span v-if="!isFirstChapter && !isLastChapter" class="mx-1">|</span>
            <RouterLink 
              v-if="!isLastChapter"
              :to="{ name: 'chapter', params: { id: bookId, chapterNum: parseInt(chapterNum) + 1 }}"
            >
              Next chapter
            </RouterLink>
          </div>
        </div>

        <h1 class="mt-2" v-html="chapterData?.chapterName"></h1>
        <div class="chapter-content"
          @mouseup="handleTextSelect"
          @keyup="handleTextSelect"
          v-html="textWithHighlights || chapterData?.chapterContent"
        >
        </div>

        <HighlightToolbar 
          v-if="showHighlightToolBar"
          v-click-outside="hideHighlightToolbar"
          class="absolute"
          :style="toolbarPosition"
          @saveHighlight="storeSelectedText"
          @addNote="openNewNoteTab"
        />
      </div>
    </template>

  </ChapterLayout>
</template>


<style lang="postcss">

  .highlight{
    @apply bg-emerald-200;
  }

  .book-page {
    @apply pt-8 pb-6;
  }

  .page-num {
    @apply text-slate-400 text-sm pb-8;
  }
  .page-num::before {
    content: "Page ";
  }
</style>