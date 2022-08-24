<script setup>
  import { ref, computed } from "vue";
  import TextInput from "../FormFields/TextInput.vue";
  import SimpleButton from "../Buttons/SimpleButton.vue";

  const emit = defineEmits(["sendForm"]);
  const props = defineProps({
    fieldErrors: {
      type: Array,
      default: () => []
    },
    errorMsg: {
      type: String,
      default: ""
    }
  });

  const errorFields = computed(() => props.fieldErrors && [...props.fieldErrors].map(error => {
      return error.field;
    })
  );

  const username = ref("");
  const password = ref("");

</script>

<template>
  <form class="w-full sm:w-6/12 md:w-4/12 mx-auto" @submit.prevent="emit('sendForm', username, password)">
    <TextInput 
      @update:value="username=$event"
      type="text"
      name="username"
      id="username"
      placeholder="Username"
      iconClass="fas fa-user"
      required
      class="mb-4"
      :hasError="errorFields.includes('username')"
    />

    <TextInput 
      @update:value="password=$event"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      iconClass="fas fa-lock"
      required
      class="mb-4"
      :hasError="errorFields.includes('password')"
    />

    <SimpleButton type="submit" buttonText="Log in" fullWidth dark/>
    <p v-if="props.errorMsg" class="mt-2 text-left text-red-500">{{ errorMsg }}</p>
    <p v-for="error in props.fieldErrors" :key="error.field || error.message" class="mt-2 text-left text-red-500">
      {{ error.message }}
    </p>
  </form>
</template>