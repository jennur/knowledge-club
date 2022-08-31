<script setup>
import store from "../../../../store/index"
import {useRoute} from "vue-router";
import { onMounted } from 'vue'
import Slideover from "../../../../components/Slideover/Slideover.vue"
const route = useRoute();

store.dispatch("chapters/getChapter",{
  bookId: route.params.id,
  chapterNum: route.params.chapternum
})

function getSelectedText() {
    var text = "";
    var text_range = {startloc:0,endloc:0};
    
    if(!window.getSelection().focusNode.previousSibling){
      text = window.getSelection();
      text_range = {startloc:text.anchorOffset,endloc:text.focusOffset}
    }
    else if (typeof window.getSelection != "undefined") {
        let last_loc= parseInt(window.getSelection().focusNode.previousSibling.attributes.loc.value)
        text = window.getSelection();
        text_range = {startloc:last_loc + text.anchorOffset,endloc:last_loc + text.focusOffset}

    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange();
    }
    return text_range;
}

function doSomethingWithSelectedText() {
    var selectedText = getSelectedText();

    if(selectedText.startloc!=selectedText.endloc){
      store.dispatch("chapters/postHighlight", {
        bookId:route.params.id,
        chapterNum:route.params.chapternum,
        startloc:selectedText.startloc,
        endloc:selectedText.endloc,
        fromUser:store.state.auth.user.username,
        content:""
      })
    }
}
  
function do_highlight(sortedHighlights,inputText) {
  let original_chapter_content = store.state.chapters.focusedChapter.data.chapterContent
  let out = ""
  let cur_index = original_chapter_content.length;
  let cur_highlight =""
  for(let highlight of sortedHighlights){
    if(highlight.endloc<cur_index){
      console.log(highlight.endloc,cur_index)
      console.log(original_chapter_content.substring(highlight.endloc,cur_index))
      out = original_chapter_content.substring(highlight.endloc,cur_index-1) + out
    }
    
    cur_highlight = `<span class='highlight' loc=${highlight.endloc}>` + original_chapter_content.substring(highlight.startloc,highlight.endloc)  + "</span>"
    out = cur_highlight + out
    cur_index = highlight.startloc
  }
  if (cur_index>0){
    out = original_chapter_content.substring(0,cur_index) + out
  }
  console.log(original_chapter_content)
  inputText.innerHTML = out

}
function highlightSort(a,b){
  if(a.startloc>b.startloc){
    return -1;
  }
  else if(a.startloc<b.startloc){
    return 1
  }
  else{
    return 0
  }
}

onMounted(()=>{
  var inputText = document.getElementsByClassName("chapter-content")[0];
  let allHighlights = store.state.chapters.focusedChapter.highlights.sort(highlightSort)

  do_highlight(allHighlights,document.getElementsByClassName("chapter-content")[0]);
  
})


document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;
</script>
<template>
  <div class="chapter">
    <Slideover/>
    <div class="chapter-content">
    {{ store.state.chapters.focusedChapter.data.chapterContent }}
    </div>
  </div>
  
</template>

<style>
.highlight{
  background-color: aqua;
}

</style>