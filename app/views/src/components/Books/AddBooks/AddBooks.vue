<script>
import store from "../../../store/index"


export default {
    name: "FileUpload",
    data(){
        return {
            file:""
        }
    },
    methods:{
        onSelect(e){
            console.log("Selected File.")
            this.file = new FormData();
            this.file.append('file',e.target.files[0])
            console.log(this.file.get("file"))
        },
        onSubmit(){
            console.log("Submitted File")
            console.log(this.file.get("file"))
            store.dispatch("books/addBook",this.file)
        }   
    }
}

</script>
<template>
  <div>
    <input type="file" @change="onSelect" ref="file">
        <button @click="onSubmit">Upload!</button>
  </div>
</template>