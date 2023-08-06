<script setup>
  import DropZone from 'dropzone-vue';
  import store from "@/store/index"
  import { ref, computed } from "vue";
  import IconButton from "../../Buttons/IconButton.vue";
  import Spinner from "@/components/Loading/Spinner.vue";
  import SelectDropdown from "@/components/Inputs/SelectDropdown.vue";
  import 'dropzone-vue/dist/dropzone-vue.common.css';
  import categoryOptions from "@/helpers/categoryOptions/categoryOptions.js";

  const files = ref([]);
  const errorMsg = ref(null);
  const successMsg = ref(null);
  const isLoading = ref(false);
  const selectedCategory = ref(null);

  const computedCategoryOptions = computed(() => 
    categoryOptions(selectedCategory)
  );

  function onSelect(item) {
    errorMsg.value = null;
    let formData = new FormData();
    formData.append('file', item.file);
    files.value = [...files.value, { formData, id: item.id }];
  }

  function onSubmit() {
    if(!selectedCategory.value) {
      errorMsg.value = "You must select a category";
      return;
    }
    errorMsg.value = null;
    successMsg.value = null;
    isLoading.value = true
    
    if(files.value.length) {
      files.value.forEach(fileObj => {

        fileObj.formData.append("category", 
          selectedCategory.value.value
        );

        store.dispatch("books/addBook", fileObj.formData)
          .then(response => {
            isLoading.value = false;
            errorMsg.value = null;
            successMsg.value = response.message;
          })
          .catch(err => {
            isLoading.value = false;
            successMsg.value = null;
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
    successMsg.value = null;
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
  const maxFileSize = 5000000;
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
          class="min-w-full rounded"
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

        <div class="flex justify-between mt-2">
          <div class="flex items-center">
            <SelectDropdown
              :defaultText="computedCategoryOptions.default.text"
              :defaultIcon="computedCategoryOptions.default.icon"
              :options="computedCategoryOptions.options"
            />
            <div class="mr-1">
              <Spinner v-if="isLoading" text="Uploading book..." class="ml-2" />
              <p v-if="successMsg" class="ml-2 px-4 py-2 text-xs bg-green-50 text-green-600">
                <font-awesome-icon icon="check" class="mr-1" />
                {{ successMsg }}
              </p>
              <p v-if="errorMsg" class="ml-2 px-4 py-2 text-xs bg-red-100 text-red-500">
                <font-awesome-icon icon="circle-exclamation" class="mr-1" />
                {{ errorMsg }}
              </p>
            </div>
          </div>

          <IconButton
            dark
            buttonText="Upload"
            size="sm"
            iconClass="upload"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">

  .dropzone {
    @apply flex flex-wrap;
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
</style>