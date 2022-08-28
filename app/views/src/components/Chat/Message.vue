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