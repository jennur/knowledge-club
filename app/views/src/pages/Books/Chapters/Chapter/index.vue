<script setup>
  import store from "@/store/index"
  import { useRoute, RouterLink } from "vue-router";
  import { computed, ref, watch } from 'vue'
  import ChapterLayout from "@/layouts/ChapterLayout.vue";
  import ChapterToolTabs from "@/components/ChapterToolTabs/ChapterToolTabs.vue";
  import HighlightToolbar from "@/components/HighlightToolbar/HighlightToolbar.vue";
  import Modal from "@/components/Modal/Modal.vue";
  import MarkdownEditor from "@/components/Inputs/MarkdownEditor.vue";
  import getHighlightedText from "@/helpers/highlightFunctions/getHighlightedText";
  import getSelectedText from "@/helpers/highlightFunctions/getSelectedText";
  import addChapterNote from "@/helpers/noteFunctions/addChapterNote";

  const route = useRoute();
  const { id: bookId, chapterNum } = route.params;

  store.dispatch("chapters/getChapter", { bookId, chapterNum });
  store.dispatch("chapters/getFocusedBook", bookId);

  const textWithHighlights = ref(null);
  const showHighlightToolBar = ref(null);
  const toolbarPosition = ref(null);
  const errorMsg = ref(null);

  const user = computed(() => store.state.auth.user);
  const chapterData = computed(() => store.state.chapters.focusedChapter);
  const allHighlightsVisible = computed(() => store.state.chapters.focusedChapter?.visibleHighlights?.all);
  const bookData = computed(() => store.state.chapters.focusedBook);

  function handleTextSelect() {
    let selection = window.getSelection();

    if(selection.type === "Caret") {
      showHighlightToolBar.value = false;
      return;
    }

    let position = selection.getRangeAt(0).getBoundingClientRect();

    toolbarPosition.value = {
      top: `${position.top + position.height}px`,
      left: `${position.left}px`
    };
    showHighlightToolBar.value = true;
  }

  function storeSelectedText(text, note) {
    let selectedText = text || getSelectedText();
    const { startloc, endloc } = selectedText;
    
    if(startloc !== endloc) {
      store.dispatch("chapters/postHighlight", {
        bookId,
        chapterNum,
        startloc,
        endloc,
        fromUser: user.value.username,
        content: selectedText.text,
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
    }
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
      <div class="pr-16 pb-16">
        <RouterLink 
          :to="{ name: 'chapters', params: { id: bookId } }" 
          class="text-xs uppercase text-gray-400"
        >
          {{ bookData?.title }}
        </RouterLink>

        <h1 class="mt-2">{{ chapterData?.chapterName }}</h1>
        <div 
          @mouseup="handleTextSelect"
          @keyup="handleTextSelect"
          v-html="textWithHighlights || chapterData?.chapterContent"
        >
        </div>

        <HighlightToolbar 
          v-if="showHighlightToolBar" 
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
</style>