import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import './assets/main.css'
import VueMathjax from 'vue-mathjax-next';
import vClickOutside from "click-outside-vue3";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import ChapterLayout from "./layouts/ChapterLayout.vue";


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faBars,
  faBook,
  faCaretDown,
  faComment,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFileCirclePlus,
  faFloppyDisk,
  faFolderOpen,
  faLock,
  faNoteSticky,
  faPaperPlane,
  faRightFromBracket,
  faRightToBracket, 
  faShareFromSquare,
  faSpa,
  faUser, 
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faBars,
    faBook,
    faCaretDown,
    faComment,
    faEnvelope,
    faEye,
    faEyeSlash,
    faFileCirclePlus,
    faFloppyDisk,
    faFolderOpen,
    faLock,
    faNoteSticky,
    faPaperPlane,
    faRightFromBracket,
    faRightToBracket,
    faShareFromSquare,
    faSpa,
    faUser,
    faUserPlus,
    faXmark
  )

const app = createApp(App)
  .use(router)
  .use(store)
  .use(VueMathjax)
  .use(vClickOutside)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('default-layout', DefaultLayout)
  .component('chapter-layout', ChapterLayout)
  .mount('#app')
