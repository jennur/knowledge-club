<script setup>
import store from "../../../../store/index"
import { useRoute } from "vue-router";
import { onMounted, computed, ref, watch } from 'vue'
import Slideover from "../../../../components/Slideover/Slideover.vue"
import ChapterToolBar from "../../../../components/ChapterToolBar/ChapterToolBar.vue";

import getHighlightedText from "./highlightFunctions/getHighlightedText";
import addChapterNote from "./noteFunctions/addChapterNote";

const route = useRoute();
const { id: bookId, chapternum: chapterNum } = route.params;

store.dispatch("chapters/getChapter", { bookId, chapterNum })
store.dispatch("chapters/getFocusedBook", bookId);

const chapterContentElem = ref(null);
const textWithHighlights = ref(null);
const user = computed(() => store.state.auth.user);
const chapterData = computed(() => store.state.chapters.focusedChapter);
const allHighlightsVisible = computed(() => store.state.chapters.focusedChapter?.visibleHighlights?.all);
const bookData = computed(() => store.state.chapters.focusedBook);


function getSelectedText() {
    var text = "";
    var text_range = { startloc: 0, endloc: 0 };
    
    if(!window.getSelection().focusNode.previousSibling){
      text = window.getSelection();
      text_range = { startloc: text.anchorOffset, endloc: text.focusOffset };
    }
    else if (typeof window.getSelection != "undefined") {
        let last_loc= parseInt(window.getSelection().focusNode.previousSibling.attributes.loc.value);
        text = window.getSelection();
        text_range = {startloc:last_loc + text.anchorOffset,endloc:last_loc + text.focusOffset}

    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange();
    }
    return text_range;
}

const storeSelectedText = () => {
    var selectedText = getSelectedText();
    const { startloc, endloc } = selectedText;
    
    if(startloc !== endloc) {
      store.dispatch("chapters/postHighlight", {
        bookId,
        chapterNum,
        startloc,
        endloc,
        fromUser: user.value.username,
        content: ""
      })
    }
}

function showHighlights () {
  try {
    textWithHighlights.value = getHighlightedText();
  }
  catch(err) {
    console.log("Error doing highlights:", err);
  }
}

function hideHighlights() {
  textWithHighlights.value = null;
}

watch(allHighlightsVisible, (newVal, oldVal) => {
  if(newVal) showHighlights();
  else hideHighlights();
})

const sliderOpen = ref(false);

function setSliderStatus(value) {
  sliderOpen.value = value;
}
</script>

<template>
  <div :class="`outer-content-wrapper mb-16 ${sliderOpen ? 'static' : 'relative'}`">
    <div class="pr-16">
      <span class="text-xs uppercase text-gray-400">{{ bookData?.title }}</span>
      <h1 class="mt-2">{{ chapterData?.chapterName }}</h1>
      <div 
        ref="chapterContentElem" 
        @mouseup="storeSelectedText"
        @keyup="storeSelectedText"
        v-html="textWithHighlights || chapterData?.chapterContent"
      >
      </div>
    </div>
    <Slideover
      :bookId="bookId" 
      :chapterId="chapterNum"
      @sliderStatus="setSliderStatus"
    />
  </div>
  
</template>

<style>
.highlight{
  @apply bg-emerald-300;
}

</style>