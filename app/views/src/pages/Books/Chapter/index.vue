<script setup>
  import store from "@/store/index"
  import { useRoute, RouterLink } from "vue-router";
  import { computed, ref, watch, onMounted } from 'vue'

  import ChapterLayout from "@/layouts/ChapterLayout.vue";
  import ChapterToolTabs from "@/components/ChapterToolTabs/ChapterToolTabs.vue";
  import Breadcrumbs from "@/components/Navigation/Breadcrumbs.vue";
  import ChapterNavigation from "@/components/Navigation/ChapterNavigation.vue";
  import HighlightToolbar from "@/components/HighlightToolbar/HighlightToolbar.vue";
  import setHighlights from "@/helpers/highlightFunctions/getContainerWithHighlights";
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
  const highlightedCC = ref(null)
  const toolbarPosition = ref(null);

  const allHighlights = computed(() => store.state.chapters.focusedChapter.highlights);
  const user = computed(() => store.state.auth.user);
  const chapterData = computed(() => store.state.chapters.focusedChapter);
  const allHighlightsVisible = computed(() => store.state.chapters.focusedChapter?.visibleHighlights?.all);
  const bookData = computed(() => store.state.chapters.focusedBook);
  const ccNode = computed(() => document.getElementById("chapter-content"));

  function getHighLights() {
    let ccCopy = ccNode.value.cloneNode(true);
    if (ccCopy.hasChildNodes()) {
      highlightedCC.value = setHighlights(ccCopy, allHighlights.value);
    }
  }

  function handleTextSelect() {
    const selection = window.getSelection();
    if(selection.type === "Caret") {
      showHighlightToolBar(false);
      return;
    }
    const range = selection.getRangeAt(0);
    const { top, height, left } = range.getBoundingClientRect();
    highlight.value = highlightModel(range);

    highlightContainerFromRange(ccNode.value, range);
    toolbarPosition.value = { top: `${top + height}px`, left: `${left}px` };

    showHighlightToolBar(true);
  }

  function storeSelectedText(highlightObj, note) {
    const { userId, username } = user.value;
  
    store.dispatch("chapters/postHighlight", {
        ...highlightDbObject(highlightObj),
        bookId,
        chapterNum,
        fromUser: JSON.stringify({ userId, username }),
        note
      })
      .then((response) => {
        if(response.articles) store.dispatch("chapters/openToolTab", "notes");
      })
      .catch(err => {
        console.error(err.message);
        errorMsg.value = err.message;
      });

    showHighlightToolBar(false);
  }

  function toggleHighlights(show) {
    if(!highlightedCC.value) getHighLights();
    textWithHighlights.value = show ?  highlightedCC.value : null;
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
          <Breadcrumbs :routes="[
              { title: 'Home', name: 'home' }, 
              { title: 'Books', name: 'books' }, 
              { title: bookData?.title, name: 'book', params: { id: bookId } }
            ]"
            :current-route="chapterData?.chapterName"
          />
        </div>

        <div class="sticky-container flex justify-center mt-10">
          <ChapterNavigation :bookId="bookId" :chapterNum="chapterNum" />
        </div>

        <h1 class="mt-8" v-html="chapterData?.chapterName"></h1>
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
  .sticky-container {
    @apply sticky top-0 bg-white p-4 md:p-6;
  }
  .night .sticky-container {
    @apply sticky top-0 bg-slate-900 p-4 md:p-6;
  }
  .highlight{
    @apply bg-emerald-200;
  }

  .book-page {
    @apply first:pt-0 pt-8 pb-6;
  }

  .page-num {
    @apply text-slate-400 text-sm pb-8;
  }
  .page-num::before {
    content: "Page ";
  }
</style>