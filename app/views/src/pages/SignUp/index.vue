<script setup>
  import { useRouter } from "vue-router";
  import SignUp from "../../components/Authenticate/SignUp/SignUp.vue";
  const router = useRouter();

</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-lg my-6 text-center">Join the community to expand your knowledge!</h1>
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto">
      <SignUp @signupSuccess="router.push({ name: 'home', query: { signupSuccess: true }})" />
    </div>
</div>
</template>

