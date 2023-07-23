<script setup>
import DropZone from 'dropzone-vue';
import store from "../../../store/index"
import { ref } from "vue";
import SimpleButton from "../../Buttons/SimpleButton.vue";
import 'dropzone-vue/dist/dropzone-vue.common.css';

const files = ref([]);
const errorMsg = ref(null);
const successMsg = ref(null);
const isLoading = ref(false);

function onSelect(item) {
  console.log("Selected File.", item);
  let file = new FormData();
  file.append('file', item.file);
  files.value = [...files.value, { file, id: item.id }];
}

function onSubmit() {
  errorMsg.value = null;
  successMsg.value = null;
  isLoading.value = true
  console.log("FileValue", files.value);
  
  if(files.value.length) {
    files.value.forEach(fileObj => {
      console.log("Submitted File")
      console.log(fileObj.file.get("file"))
      store.dispatch("books/addBook", fileObj.file)
        .then(response => {
          console.log("Successfully added book:", response);
          isLoading.value = false;
          successMsg.value = response.message;
        })
        .catch(err => {
          console.log("Error dispatch:", err);
          isLoading.value = false;
          errorMsg.value = err.message;
        })
    })
  }
}

function onFileRemove(file) {
  let addedFiles = files.value;
  for (let i = 0; i < addedFiles.length; i++) {
    if(file.id === addedFiles[i].id) {
      files.value.splice(i, 1);
      return;
    }
  }
}

function onError(err) {
  let error = "";
  switch (err.error) {
    case "MAX_FILE":
      error = `You can only upload ${maxNumFiles} files at once.
      The excess files were removed.`;
      break;
    case "MAX_FILE_SIZE":
      error = `You can only upload ${maxFileSize / 1000000} MB.`;
      break;
    default:
      error = "Something went wrong.";
  }
  errorMsg.value = error;
}

const maxNumFiles = 5;
const maxFileSize = 1000000;

</script>
<template>
  <div class="my-10">
    <div class="md:flex">
      <div class="bg-yellow-50 w-full md:w-64 p-4 md:mr-4">
        <ul class="text-sm">
          <li>
            <strong>Max number of files:</strong> {{ maxNumFiles }}
          </li>
          <li>
            <strong>Max file size:</strong> {{ maxFileSize / 1000000 }}MB
          </li>
        </ul>
      </div>
      <div class="grow mt-2 md:mt-0">
        <DropZone 
          class="min-w-full"
          :method="null"
          dropzoneClassName="p-16 bg-slate-200"
          :maxFiles="maxNumFiles"
          :maxFileSize="maxFileSize"
          :uploadOnDrop="true"
          :multipleUpload="true"
          :parallelUpload="null"
          :acceptedFiles="['epub']"
          @addedFile="onSelect"
          @removedFile="onFileRemove"
          @errorAdd="onError"
        >
          <template v-slot:message>
            Drop files here or click to select
          </template>
        </DropZone>
        <div class="flex">
          <div class="grow mr-1">
            <div v-if="isLoading" class="mt-1 text-xs text-orange-600 flex items-center">
              <div class="spinner mr-2"></div> <p>Uploading book...</p>
            </div>
            <p v-if="successMsg" class="mt-1 p-2 text-xs text-green-600">
              {{ successMsg }}
            </p>
            <p v-if="errorMsg" class="mt-1 p-2 text-xs text-red-500">
              {{ errorMsg }}
            </p>
          </div>
          <SimpleButton class="mt-1" dark @click="onSubmit" buttonText="Upload"></SimpleButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">

  .dropzone {
    @apply flex flex-wrap;
  }

  .dropzone__details.dropzone__details--style {

  }

  .dropzone__file-size {
    @apply mr-1 mb-0 min-w-max text-sm;
  }

  .dropzone__file-size > span {
    @apply bg-transparent;
  }

  .dropzone__filename > span {
    @apply text-sm bg-transparent hover:bg-white;
  }

  .dropzone__item.dropzone__item--style {
    @apply border border-blue-400 border-dashed rounded-none grow m-1;
  }

  .dropzone__item--style:not(.dropzone--has-thumbnail) > .dropzone__item-thumbnail {
    @apply border-none;
  }

  .dropzone__progress {
    @apply rounded-none;
  }
  .dropzone__progress .dropzone__progress-bar {
    @apply bg-blue-500;
  }

  .spinner {
    @apply border-2 border-dotted border-spacing-1 border-orange-400 w-5 h-5 rounded-full animate-spin-slow;
  }
</style>