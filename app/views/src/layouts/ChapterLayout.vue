<script setup>
  import { ref } from "vue";
  import LeftMenu from "./Header/LeftMenu.vue";
  import RightMenu from "./Header/RightMenu.vue";
  import Footer from "./Footer/Footer.vue";

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


</script>

<template>
  <div id="chapter-layout">
    <div class="flex justify-between w-full md:hidden py-1 px-4">
      <LeftMenu />
      <RightMenu />
    </div>

    <div class="flex w-full justify-between relative">
      <section 
        id="interaction-board"
        class="h-screen bg-slate-100 overflow-y-hidden sticky top-0 left-0 p-4"
        :style="sidebarBasis"
      >
        <LeftMenu class="hidden md:block pb-8" />

        <slot name="sidebar"></slot>

        <button 
          @mousedown="initSidebarResize"
          aria-hidden="true"
          class="sidebar-handle"
        ></button>
      </section>

      <div ref="mainContent" :style="mainContentBasis">
        <RightMenu class="hidden md:flex py-1 px-4" />

        <main class="px-4">
          <slot name="main"></slot>
        </main>

        <Footer class="hidden md:flex" />
      </div>
    </div>
    <Footer class="md:hidden" />
  </div>
</template>


<style lang="postcss" scoped>
  .sidebar-handle {
    @apply absolute top-0 right-0 
      w-[.2rem] h-full px-3 focus:outline-none cursor-ew-resize;
  }
  .sidebar-handle::before {
    content: "";
    @apply absolute top-1/2 -translate-y-1/2 right-2 bg-slate-400 w-[.2rem] h-8;
  }
</style>