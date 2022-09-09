<script setup>
  import { ref } from "vue";
  import LeftMenu from "./Header/LeftMenu.vue";
  import RightMenu from "./Header/RightMenu.vue";
  import Footer from "./Footer/Footer.vue";
  import Switch from "../components/Inputs/Switch.vue";

  const isDragging = ref(false);
  const sidebarBasis = ref({ flexBasis: "25%" });
  const mainContentBasis = ref({ flexBasis: "75%" });

  function initSidebarResize(event) {
    isDragging.value = true;
    window.addEventListener("mouseover", resizeSidebar);
    window.addEventListener("mouseup", endSidebarResize);
  }
  function resizeSidebar(event) {
    if(isDragging.value) {
      const screenWidth = window.innerWidth;
      const newWidth = event.clientX;
      const widthPercent = (newWidth/screenWidth)*100;

      sidebarBasis.value = { flexBasis: `${widthPercent}%`};
      mainContentBasis.value = { flexBasis: `${100 - widthPercent}%`};
    }
  }
  function endSidebarResize(event) {
    isDragging.value = false;
    window.removeEventListener("mouseover", resizeSidebar);
    window.removeEventListener("mouseup", endSidebarResize);
  }

  const colorTheme = ref("day");

  function toggleDarkMode(value) {
    colorTheme.value = value ? "night" : "day";
  }

</script>

<template>
  <div id="chapter-layout" :class="colorTheme">
    <div class="flex justify-between w-full md:hidden py-1 px-4">
      <LeftMenu />
      <RightMenu />
    </div>

    <div class="flex w-full justify-between relative">
      <section 
        id="interaction-board"
        class="interaction-board sticky top-0 left-0 md:pt-2 pl-4"
        :style="sidebarBasis"
      >
        <LeftMenu class="hidden md:block" />

        <slot name="sidebar"></slot>

        <button 
          @mousedown="initSidebarResize"
          aria-hidden="true"
          class="sidebar-handle"
        ></button>
      </section>

      <div ref="mainContent" :style="mainContentBasis">
        <div class="flex items-center">
          <label class="flex items-center text-xs ml-4">
            <Switch @switch="toggleDarkMode" />
            <span>Dark mode</span>
          </label>
          <RightMenu class="hidden md:flex py-1 px-4" />
        </div>
        <main class="grow px-4">
          <slot name="main"></slot>
        </main>

        <Footer class="hidden md:flex" />
      </div>
    </div>
    <Footer class="md:hidden" />
  </div>
</template>


<style lang="postcss">
  .sidebar-handle {
    @apply absolute top-0 right-0 
      w-[.2rem] h-full px-3 focus:outline-none cursor-ew-resize;
  }
  .sidebar-handle::before {
    content: "";
    @apply absolute top-1/2 -translate-y-1/2 right-2 bg-slate-400 w-[.2rem] h-8;
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
