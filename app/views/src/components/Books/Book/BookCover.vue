<script setup>
  import { ref, onBeforeUnmount } from 'vue';

  const props = defineProps(["coverImage"])
  
  const imageUrl = ref(null);

  if(props.coverImage){
    let imgData = bufferToBase64(props.coverImage.data);
    imageUrl.value = `data:image/jpeg;base64,${imgData}`
  }

  function bufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
</script>

<template>
  <img :src="imageUrl" />
</template>