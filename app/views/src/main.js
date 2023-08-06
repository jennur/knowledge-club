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
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAtom,
  faBars,
  faBook,
  faBox,
  faBoxOpen,
  faBrain,
  faCaretUp,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCheck,
  faCircleExclamation,
  faCog,
  faComment,
  faDna,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFileCirclePlus,
  faFlaskVial,
  faFloppyDisk,
  faFolderOpen,
  faGripVertical,
  faHandsPraying,
  faLock,
  faNoteSticky,
  faPaperPlane,
  faPenToSquare,
  faRightFromBracket,
  faRightToBracket, 
  faScrewdriverWrench,
  faShareFromSquare,
  faSpa,
  faSquareRootVariable,
  faStethoscope,
  faTrash,
  faUpload,
  faUser, 
  faUserPlus,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faAtom,
    faBars,
    faBook,
    faBox,
    faBoxOpen,
    faBrain,
    faCaretUp,
    faCaretDown,
    faCaretLeft,
    faCaretRight,
    faCheck,
    faCircleExclamation,
    faCog,
    faComment,
    faDna,
    faEnvelope,
    faEye,
    faEyeSlash,
    faFileCirclePlus,
    faFlaskVial,
    faFloppyDisk,
    faFolderOpen,
    faGripVertical,
    faHandsPraying,
    faLock,
    faNoteSticky,
    faPaperPlane,
    faPenToSquare,
    faRightFromBracket,
    faRightToBracket,
    faScrewdriverWrench,
    faShareFromSquare,
    faSpa,
    faSquareRootVariable,
    faStethoscope,
    faTrash,
    faUpload,
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
