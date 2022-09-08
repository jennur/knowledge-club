<script setup>
import store from "../../../store/index"
import { ref } from "vue";
import SimpleButton from "../../Buttons/SimpleButton.vue";

const file = ref(null);
const errorMsg = ref(null);

function onSelect(e){
  console.log("Selected File.")
  file.value = new FormData();
  file.value.append('file',e.target.files[0])
  console.log(file.value.get("file"))
}

function onSubmit(){
  errorMsg.value = null;
  console.log("FileValue", file.value);
  if(file.value) {
    console.log("Submitted File")
    console.log(file.value.get("file"))
    store.dispatch("books/addBook", file.value)
      .then(response => {
        console.log("Successfully added book:", response);
      })
      .catch(err => {
        console.log("Error dispatch:", err);
        errorMsg.value = err.message;
      })
  }
}  

</script>
<template>
  <div class="outer-content-wrapper py-16">
    <div class="mb-4">
      <input type="file" @change="onSelect">
      <SimpleButton dark @click="onSubmit" buttonText="Upload!"></SimpleButton>
    </div>
    <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
  </div>
</template>