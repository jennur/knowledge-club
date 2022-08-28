<script setup>
import store from "../../../../store/index"
import {useRoute} from "vue-router";
const route = useRoute();
store.dispatch("chapters/getChapter",{bookId:route.params.id,chapterNum:route.params.chapternum})

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

function doSomethingWithSelectedText() {
    var selectedText = getSelectedText();
    if (selectedText) {
        alert("Got selected text " + selectedText);
    }
}

document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;
</script>
<template>
  <div class="about">
    {{store.state.chapters.focusedChapter.data.chapterContent}}
  </div>
</template>

<style>

</style>