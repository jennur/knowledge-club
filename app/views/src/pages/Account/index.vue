<script setup>
  import { ref, computed, watch } from "vue";
  import store from "@/store";
  import SelectDropdown from "@/components/Inputs/SelectDropdown.vue";
  import categoryOptions from "@/helpers/categoryOptions/categoryOptions.js";
  import IconButton from "@/components/Buttons/IconButton.vue";

  const user = computed(() => store.state.auth.user);

  const selectedCategory = ref(null);
  const favoriteCategories = ref(user.value?.favoriteCategories || []);
  const successMsg = ref(null);
  const errorMsg = ref(null);

  const computedCategoryOptions = computed(() => {
    let categories = categoryOptions(selectedCategory);
    categories.options = categories.options.filter(category => {
      for(let favorite of favoriteCategories.value) {
        if (favorite.name === category.name) {
          return false;
        }
      }
      return true;
    })
    return categories;
  });

  function removeFavorite(category) {
    favoriteCategories.value = favoriteCategories.value.filter(favorite => {
      if(category.name === favorite.name) return false;
      return true;
    });
  }

  function handleSave() {
    store.dispatch("auth/updateFavoriteCategories", {
        categories: JSON.stringify(favoriteCategories.value),
        userId: user.value.userId
      })
      .then(() => {
        successMsg.value = "Saved favorite categories";
        setTimeout(() => { successMsg.value = null }, 10000);
      })
      .catch(err => {
        errorMsg.value = err.message;
        setTimeout(() => { errorMsg.value = null }, 10000);
        console.error("[Y]", err.message);
      })
  }

  watch(selectedCategory, (newVal, oldVal) => {
    favoriteCategories.value.push(newVal);
  })
</script>

<template>
  <div class="container ml-4">
    <h1 class="setting-block text-xl mb-2 text-center">
      My profile
    </h1>
    <ul class="flex flex-wrap">
      <li class="setting-block flex-1 mr-1">
        <div class="setting-header">
          <h2 class="setting-headline">Username</h2>
          <font-awesome-icon icon="pen-to-square" class="edit-icon"/>
        </div>
        <div>{{ user?.username }}</div>
      </li>

      <li class="setting-block flex-1 ml-1">
        <div class="setting-header">
          <h2 class="setting-headline">E-mail</h2>
          <font-awesome-icon icon="pen-to-square" class="edit-icon"/>
        </div>
        <div>{{ user?.email }}</div>
      </li>

      <li class="setting-block basis-full mt-2">
        <div class="setting-header">
          <h2 class="setting-headline">Biography</h2>
          <font-awesome-icon icon="pen-to-square" class="edit-icon"/>
        </div>
        <div>{{ user?.biography }}</div>
      </li>

      <li class="setting-block basis-full mt-2">
        <div class="setting-header">
          <h2 class="setting-headline">Favorite categories</h2>
        </div>

        <p class="text-xs font-light text-slate-500 mb-4">
          Select your favorite categories to affect what content is shown to you
        </p>

        <div class="flex items-center">
          <SelectDropdown
            :defaultText="computedCategoryOptions.default.text"
            :defaultIcon="computedCategoryOptions.default.icon"
            :options="computedCategoryOptions.options"
          />
          <IconButton
            iconClass="floppy-disk"
            buttonText="Save"
            size="xs"
            class="ml-2"
            dark
            @click="handleSave"
          />
        </div>

        <p v-if="successMsg" class="success-msg mt-2">
          <font-awesome-icon icon="check" class="mr-2" />
          {{ successMsg }}
        </p>
        <p v-if="errorMsg" class="error-msg mt-2">
          <font-awesome-icon icon="xmark" class="mr-2" />
          {{ errorMsg }}
        </p>
        <div class="favorite-categories mt-4">
          <span 
            v-for="category in favoriteCategories"
            :key="category.value"
            class="category-pill"
          >
            <font-awesome-icon :icon="category.icon" class="text-sm mx-1" />
            {{ category.name }}
            <button @click="() => removeFavorite(category)">
              <font-awesome-icon icon="xmark" class="edit-icon" />
            </button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
  .success-msg {
    @apply px-4 py-2 bg-green-50 text-green-700 text-xs ;
  }

  .error-msg {
    @apply px-4 py-2 bg-red-100 text-red-500 text-xs;
  }

  .setting-block {
    @apply bg-slate-50 rounded p-4;
  }

  .setting-header {
    @apply flex items-center mb-1;
  }
  .setting-headline {
    @apply text-xs uppercase;
  }

  .edit-icon {
    @apply mx-1 text-xs text-blue-500 hover:text-blue-600 cursor-pointer
    transition-all;
  }

  .category-pill {
    @apply inline-flex items-center text-sm border border-blue-300 hover:border-blue-400
    rounded-full px-1 py-1 mr-2 my-1 animate-pop-in;
  }
</style>
