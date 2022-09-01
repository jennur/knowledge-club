<script setup>
import filterTool from "./filterTool.vue"
import chatTool from "../Chat/Chat.vue"

  const props = defineProps({
    bookId: String,
    chapterId:String
  })

function toggleSlideover(){
    document.getElementById('slideover').classList.toggle('translate-x-full');
}
</script>

<template>
<div>
    <div class="h-full w-96 bg-slate-200 absolute right-0 duration-300 ease-out transition-all translate-x-full flex-col" id="slideover" >
        <div id="interaction-menu" class="flex flex-row" role="tablist">
            <font-awesome-icon icon="fa-solid fa-xmark justify-center" class="flex-1/12 text-2xl mt-2 ml-2" @click="toggleSlideover"/>
            <ul class="flex flex-wrap grow flex-row text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 -mb-px" data-tabs-toggle="#tab-content" id="my-tab" role="tablist">
                
                <li class="mr-2" role="presentation">
                    <button id="chat-tab" class="inline-block p-4 text-red-600 rounded-t-lg bg-gray-50 hover:bg-gray-100" role="tab" aria-selected="false" aria-controls="chat-tool" data-tabs-target="#chat-tool">Chat</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button id="article-tab" class="inline-block p-4 text-red-600 rounded-t-lg bg-gray-50 hover:bg-gray-100" role="tab" aria-selected="false" aria-controls="#article-tool" data-tabs-target="#article-tool">Article</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button id="filter-tab" class="inline-block p-4 text-red-600 rounded-t-lg bg-gray-50 hover:bg-gray-100" role="tab" aria-controls="filter-tool" data-tabs-target="#filter-tool">Filter</button>
                </li>
            </ul>
        </div>
        
        <div id="tab-content">
            <div class= "hidden" id="filter-tool" role="tabpanel" aria-labelledby="filter-tab">
                <filterTool />
            </div>
            <div id="chat-tool" role = "tabpanel" aria-labelledby="chat-tab">
               <chatTool :roomId="`${props.bookId}-${props.chapterId}`"/>
            </div>
            <div class= "hidden" id="article-tool" role = "tabpanel" aria-labelledby="article-tab">
               Article
            </div>
        </div>
    </div>
</div>
</template>