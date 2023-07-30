<script setup>
  import store from "@/store/index"
  import { useRoute, RouterLink } from "vue-router";
  import { computed, ref, watch, onMounted } from 'vue'

  import ChapterLayout from "@/layouts/ChapterLayout.vue";
  import ChapterToolTabs from "@/components/ChapterToolTabs/ChapterToolTabs.vue";
  import HighlightToolbar from "@/components/HighlightToolbar/HighlightToolbar.vue";
  import getContainerWithHighlights from "@/helpers/highlightFunctions/getContainerWithHighlights";
  import highlightContainerFromRange from "@/helpers/highlightFunctions/highlightContainerFromRange";

  import { 
    highlight as highlightModel, 
    highlightDbObject
  } from "@/models/highlight";

  const route = useRoute();
  const { id: bookId, chapterNum } = route.params;

  store.dispatch("chapters/getChapter", { bookId, chapterNum });
  store.dispatch("chapters/getFocusedBook", bookId);

  const errorMsg = ref(null);
  const highlight = ref(null);
  const showingHighlightToolBar = ref(null);
  const textWithHighlights = ref(null);
  const highlightedChapterContent = ref(null)
  const toolbarPosition = ref(null);

  const allHighlights = computed(() => store.state.chapters.focusedChapter.highlights);
  const user = computed(() => store.state.auth.user);
  const chapterData = computed(() => store.state.chapters.focusedChapter);
  const allHighlightsVisible = computed(() => store.state.chapters.focusedChapter?.visibleHighlights?.all);
  const bookData = computed(() => store.state.chapters.focusedBook);
  const chapterContentNode = computed(() => document.getElementById("chapter-content"));

  // TODO: Make this into a component:
  const isFirstChapter = parseInt(chapterNum) - 1 < 0;
  const isLastChapter = parseInt(chapterNum) + 1 === store.state.chapters.chapters.length;
  //

  function getHighLights() {
    let chapterContentCopy = chapterContentNode.value.cloneNode(true);
    if (chapterContentCopy.hasChildNodes()) {
      highlightedChapterContent.value = getContainerWithHighlights(chapterContentCopy, allHighlights.value);
    }
  }

  function handleTextSelect() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const position = range.getBoundingClientRect();
    highlight.value = highlightModel(range);

    if(selection.type === "Caret") {
      showHighlightToolBar(false);
    }
    else {
      highlightContainerFromRange(chapterContentNode.value, range);
      toolbarPosition.value = {
        top: `${position.top + position.height}px`,
        left: `${position.left}px`
      };

      showHighlightToolBar(true);
    }
  }

  function storeSelectedText(highlightObj, note) {  
    const userObj = {
      userId: user.value.userId,
      username: user.value.username
    }
  
    store.dispatch("chapters/postHighlight", {
      ...highlightDbObject(highlightObj),
      bookId,
      chapterNum,
      fromUser: JSON.stringify(userObj),
      note
    })
    .then((response) => {
      if(note) store.dispatch("chapters/openToolTab", "notes");
    })
    .catch((err) => {
      console.log(err.message);
      errorMsg.value = err.message;
    })

    showHighlightToolBar(false);
  }

  function toggleHighlights(show) {
    if(!highlightedChapterContent.value) getHighLights();
    textWithHighlights.value = show ?  highlightedChapterContent.value : null;
  }

  function showHighlightToolBar(value) {
    showingHighlightToolBar.value = value;
  }

  watch(allHighlightsVisible, (newVal, oldVal) => {
    toggleHighlights(!!newVal);
  })
</script>

<template>
  <ChapterLayout>
    <template #sidebar>
      <ChapterToolTabs 
        class="md:mt-2" 
        :highlight="highlight"
        @saveNote="(note) => storeSelectedText(note.highlight, note.note)"
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
        <div id="chapter-content" class="chapter-content"
          @mouseup="handleTextSelect"
          @keyup="handleTextSelect"
          v-html="textWithHighlights || chapterData?.chapterContent"
        >
        </div>

        <HighlightToolbar 
          v-if="showingHighlightToolBar"
          v-click-outside="() => showHighlightToolBar(false)"
          class="absolute"
          :style="toolbarPosition"
          @saveHighlight="() => storeSelectedText(highlight)"
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