<script setup>
  import { ref } from "vue";
  import LeftMenu from "./Header/LeftMenu.vue";
  import RightMenu from "./Header/RightMenu.vue";
  import Footer from "./Footer/Footer.vue";
  import Switch from "@/components/Inputs/Switch.vue";
  import ScrollButton from "@/components/Buttons/ScrollButton.vue";

  const storedSBBasis = localStorage.getItem("sidebar-basis");
  const storedMCBasis = localStorage.getItem("main-content-basis");

  const isDragging = ref(false);
  const sidebarBasis = ref(storedSBBasis || "25%");
  const mainContentBasis = ref(storedMCBasis || "75%");

  function initSidebarResize(event) {
    isDragging.value = true;
    window.addEventListener("mousemove", resizeSidebar);
    window.addEventListener("mouseup", endSidebarResize);
  }
  function resizeSidebar(event) {
    if(isDragging.value) {
      const screenWidth = window.innerWidth;
      const newWidth = event.clientX;
      const widthPercent = (newWidth/screenWidth)*100;

      sidebarBasis.value = `${widthPercent}%`;
      mainContentBasis.value = `${100 - widthPercent}%`;
    }
  }
  function endSidebarResize(event) {
    isDragging.value = false;
    localStorage.setItem("sidebar-basis", sidebarBasis.value);
    localStorage.setItem("main-content-basis", mainContentBasis.value);
    window.removeEventListener("mousemove", resizeSidebar);
    window.removeEventListener("mouseup", endSidebarResize);
  }

  const currentColorTheme = localStorage.getItem("colorTheme") || "day";
  const colorTheme = ref(currentColorTheme);

  function toggleDarkMode(value) {
    let newColorTheme = value ? "night" : "day"
    colorTheme.value = newColorTheme;
    localStorage.setItem("colorTheme", newColorTheme);
  }
</script>

<template>
  <div id="chapter-layout" :class="colorTheme">
    <div class="flex justify-between w-full md:hidden py-1 px-4 border-b border-solid border-slate-100">
      <LeftMenu />
      <RightMenu />
    </div>

    <div class="flex w-full justify-between relative">
      <section 
        id="interaction-board"
        class="interaction-board sticky top-0 left-0 md:pt-2 pl-4"
        :style="{ flexBasis: sidebarBasis }"
      >
        <LeftMenu class="hidden md:block" />

        <slot name="sidebar"></slot>

        <button 
          @mousedown="initSidebarResize"
          aria-hidden="true"
          class="sidebar-handle"
        ></button>
      </section>

      <div ref="mainContent" :style="{ flexBasis: mainContentBasis }">
        <div class="flex items-center md:py-[.35rem] md:border-b md:border-solid md:border-slate-100">
          <label class="flex items-center text-xs ml-4 mt-4 md:mt-0">
            <Switch @switch="toggleDarkMode" :checked="colorTheme === 'night'" />
            <span>Dark mode</span>
          </label>
          
          <RightMenu class="hidden md:flex py-1 px-4" />
        </div>
        <main class="grow px-4">
          <slot name="main"></slot>

          <ScrollButton />
        </main>

        <Footer class="hidden md:flex" />
      </div>
    </div>
    <Footer class="md:hidden" />
  </div>
</template>


<style lang="postcss">

  .night .select-dropdown {
    @apply text-slate-200;
  }

  .night .select-options {
    @apply text-slate-100 bg-slate-800;
  }

  .night .select-options .option {
    @apply hover:bg-slate-700;
  }

  .sidebar-handle {
    @apply absolute top-0 right-0 
      w-[.2rem] h-full px-3 focus:outline-none cursor-ew-resize;
  }
  .sidebar-handle::before {
    content: "";
    @apply absolute top-1/2 -translate-y-1/2 right-1 border-[3px] border-dotted border-slate-300 w-[.5rem] h-8;
  }

  .night .sidebar-handle::before {
    @apply border-slate-500;
  }

  .interaction-board {
    @apply h-screen bg-slate-100 overflow-y-hidden text-black;
  }

  .night .interaction-board {
    @apply bg-slate-800 text-slate-100;
  }

  .night #slider {
    @apply text-slate-200;
  }

  .night #slider .c-toolbar {
    @apply bg-slate-700;
  }

  .night #slider .c-toolbar .tool-button.active .icon {
    @apply text-blue-400;
  }

  .night #slider #slider-content {
    @apply border-slate-700 text-slate-200;
  }
  .night #slider #slider-content h2 {
    @apply text-slate-200;
  }

  .night {
    @apply bg-slate-900 text-slate-200;
  }

  .night .highlight {
    @apply bg-emerald-800;
  }

  .night .icon-button .icon,
  .night .icon-button .text,
  .night .icon-link {
    @apply text-slate-200 hover:text-slate-400;
  }
  .night .h-toolbar .icon-button .icon,
  .night .h-toolbar .icon-button .text {
    @apply text-gray-700 hover:text-gray-900;
  }

  .night .editor {
    @apply text-gray-900;
  }

  .night .quote::before, .night .quote::after {
    @apply text-white;
  }

  .night #slider #slider-content .new-note .highlight-text,
  .night #slider #slider-content .note .highlight-text {
    @apply bg-blue-900;
  }
  .night #slider #slider-content .compiled,
  .night #slider #slider-content .compiled h1,
  .night #slider #slider-content .compiled h2,
  .night #slider #slider-content .compiled h3 {
    @apply text-gray-900;
  }
</style>
