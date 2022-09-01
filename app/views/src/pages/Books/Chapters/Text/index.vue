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

function toggleHighlights () {
  if(!textWithHighlights.value) showHighlights();
  else textWithHighlights.value = null;
}


</script>
<template>
  <div class="outer-content-wrapper mt-8 mb-16">
    <Slideover :bookId="`${bookId}`" :chapterId="`${chapterNum}`"/>
    <div class="flex flex-col md:flex-row">
      <div class="my-4 md:mr-4">
        <ChapterToolBar 
          @toggleHighlights="toggleHighlights"
          @addNote="addChapterNote"
        />
      </div>
      <div>
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
    </div>
  </div>
  
</template>

<style>
.highlight{
  background-color: aqua;
}

</style>