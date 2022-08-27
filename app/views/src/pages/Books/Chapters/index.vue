<script setup>
  import store  from "../../../store/index"
  store.dispatch("chapters/getAllChapters")
  


</script>
<template>
  <div class="about">
    <h1>{{$route.params.id}}</h1>
  </div>
</template>

<style>

</style>

