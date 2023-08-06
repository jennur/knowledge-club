<script setup>
  import store from "@/store/index"
  import { useRoute, RouterLink } from "vue-router";
  import { computed, onBeforeMount, ref, watch } from 'vue'

  import Spinner from "@/components/Loading/Spinner.vue";
  import ChapterLayout from "@/layouts/ChapterLayout.vue";
  import ChapterToolTabs from "@/components/ChapterToolTabs/ChapterToolTabs.vue";
  import Breadcrumbs from "@/components/Navigation/Breadcrumbs.vue";
  import ChapterNavigation from "@/components/Navigation/ChapterNavigation.vue";
  import HighlightToolbar from "@/components/HighlightToolbar/HighlightToolbar.vue";
  import setHighlights from "@/helpers/highlightFunctions/getContainerWithHighlights";
  import highlightContainerFromRange from "@/helpers/highlightFunctions/highlightContainerFromRange";
  import {
    highlight as highlightModel,
    highlightToDbObject
  } from "@/models/highlight";

  const route = useRoute();
  const { category, id: bookId, chapterNum } = route.params;

  const errorMsg = ref(null);
  const highlight = ref(null);
  const showingHighlightToolBar = ref(null);
  const textWithHighlights = ref(null);
  const toolbarPosition = ref(null);
  const ccNode = ref(null);
  const loading = ref(false);

  const user = computed(() => store.state.auth.user);
  const bookData = computed(() => store.state.chapters.focusedBook);
  const chapterData = computed(() => store.state.chapters.focusedChapter);
  const allHighlights = computed(() => store.state.chapters.focusedChapter.highlights);
  const allHighlightsVisible = computed(() => store.state.chapters.focusedChapter?.visibleHighlights?.all);
  const highlightedCC = computed(() => store.state.chapters.focusedChapter?.highlightedChapterContent);

  onBeforeMount(() => {
    loading.value = true;
    store.dispatch("chapters/getFocusedBook", bookId);
    store.dispatch("chapters/getChapter", { bookId, chapterNum })
      .then(() => {
        loading.value = false;
        if(allHighlightsVisible.value) toggleHighlights(true);
      })
      .catch(err => {
        console.error("[Y]", err.message);
      });
  })

  function handleTextSelect() {
    errorMsg.value = null;
    const selection = window.getSelection();
    if(selection.type === "Caret") {
      showHighlightToolBar(false);
      highlight.value = null;
      return;
    }
    const range = selection.getRangeAt(0);

    if(range) {
      const { top, height, left } = range.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      const adjustedTop = top + scrollY;
      const adjustedLeft = left + scrollX;
      highlight.value = highlightModel(range);

      highlightContainerFromRange(ccNode.value, range);
      toolbarPosition.value = { 
        top: `${adjustedTop + height}px`, 
        left: `${adjustedLeft}px`
      };
      showHighlightToolBar(true);
    }
  }

  function storeSelectedText(highlightObj, note) {
    const { userId, username } = user.value;
  
    store.dispatch("chapters/postHighlight", {
        ...highlightToDbObject(highlightObj),
        bookId,
        chapterNum,
        fromUser: JSON.stringify({ userId, username }),
        note
      })
      .then((response) => {
        store.dispatch("chapters/openToolTab", "notes");
      })
      .catch(err => {
        errorMsg.value = err.response.data.message || err.message;
      });

    showHighlightToolBar(false);
  }

  function showHighlightToolBar(value) {
    const selection = window.getSelection();
    if(!value && selection && selection.type !== "Caret") {
      value = true;
    }
    showingHighlightToolBar.value = value;
  }

  function toggleHighlights(show) {
    textWithHighlights.value = show ?  highlightedCC.value : null;
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
        :bookId="bookId"
        :chapterNum="chapterNum"
        @saveNote="(note) => storeSelectedText(note.highlight, note.note)"
        :savingError="errorMsg"
      />
    </template>

    <template #main>
      <div class="pb-16 mt-4">
        <div class="flex items-center justify-between">
          <Breadcrumbs :routes="[
              { title: 'Home', name: 'home' }, 
              { title: 'Books', name: 'books' }, 
              { 
                title: category, 
                name: 'category',
                params: { category }
              },
              { 
                title: bookData?.title,
                name: 'category-book',
                params: { id: bookId, category } 
              }
            ]"
            :current-route="chapterData?.chapterName"
          />
        </div>

        <div class="sticky-container flex justify-center mt-10">
          <ChapterNavigation
            :bookId="bookId"
            :chapterNum="chapterNum"
            :category="category"
          />
        </div>

        <h1 class="mt-8" v-html="chapterData?.chapterName"></h1>
        <Spinner v-if="loading" text="Loading chapter..." />
        <div
          v-if="!loading && chapterData.chapterContent" 
          ref="ccNode" id="chapter-content" class="chapter-content"
          @mouseup="handleTextSelect"
          @keyup="handleTextSelect"
          v-html="textWithHighlights || chapterData.chapterContent"
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