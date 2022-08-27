<script setup>
import store from "../../../../store/index"
import {useRoute} from "vue-router";
const route = useRoute();
store.dispatch("chapters/getChapter",{bookId:route.params.id,chapterNum:route.params.chapternum})
</script>
<template>
  <div class="about">
    {{store.state.chapters.focusedChapter.data.chapterContent}}
  </div>
</template>

<style>

</style>