<script setup>
import store from "../../../../store/index"
import {useRoute} from "vue-router";
const route = useRoute();

store.dispatch("chapters/getChapter",{
  bookId: route.params.id,
  chapterNum: route.params.chapternum
})

function getSelectedText() {
    var text = "";
    var text_range = {startloc:0,endloc:0};
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection();
        text_range = {startloc:text.anchorOffset,endloc:text.focusOffset}
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange();
    }
    return text_range;
}

function doSomethingWithSelectedText() {
    var selectedText = getSelectedText();
    store.dispatch("chapters/postHighlight", {
      bookId:route.params.id,
      chapterNum:route.params.chapternum,
      startloc:selectedText.startloc,
      endloc:selectedText.endloc,
      fromUser:store.state.auth.user.username,
      content:""
    }
      );
    
}
// function highlight(startloc,endloc) {
//   var inputText = document.getElementsByClassName("chapter-content");
//   var innerHTML = inputText.innerHTML;
//   if (startloc >= 0) { 
//    innerHTML = innerHTML.substring(0,startloc) + "<span class='highlight'>" + innerHTML.substring(startloc,endloc) + "</span>" + innerHTML.substring(endloc);
//    inputText.innerHTML = innerHTML;
//   }
// }
// highlight(5,10);

document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;
</script>
<template>
  <div class="chapter-content">
    {{ store.state.chapters.focusedChapter.data.chapterContent }}
  </div>
</template>

<style>

</style>