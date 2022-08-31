<script setup>

function toggleSlideover(){
    document.getElementById('slideover').classList.toggle('translate-x-full');
}
</script>

<template>
<div>
    <div class="h-full w-96 bg-slate-200 absolute right-0 duration-300 ease-out transition-all translate-x-full flex-col" id="slideover" >
        <div id="interaction-menu" class="flex flex-row">
        <font-awesome-icon icon="fa-solid fa-xmark" class="flex-1/12 text-2xl mt-2 ml-2" @click="toggleSlideover"/>
        <input type="text" class="flex-11/12 grow ml-10 mt-1">
        </div>
        <div id="tool-controller" class="flex flex-col">
            <div>
                <input type="checkbox" class="default:ring-4" id="checkbox1"/> 
                <label for="checkbox1">Blah</label>
            </div>
            <div>
                <input type="checkbox" class="default:ring-4" id="checkbox1"/> 
                <label for="checkbox1">Blah</label>
            </div>
            <div>
                <input type="checkbox" class="default:ring-4" id="checkbox1"/> 
                <label for="checkbox1">Blah</label>
            </div>
            <div>
                <input type="checkbox" class="default:ring-4" id="checkbox1"/> 
                <label for="checkbox1">Blah</label>
            </div>
        </div>
        
    </div>
</div>
</template>