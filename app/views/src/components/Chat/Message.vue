<script >
export default {
    props:{
        message:""
    },
  name: 'Message',
  data () {
    return {
      formula: '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$',
    }
  }
}
</script >


<template>
    <div class="">
        <vue-mathjax :formula="message" />
    </div>
</template>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>