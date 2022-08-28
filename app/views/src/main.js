import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import './assets/main.css'
import VueMathjax from 'vue-mathjax-next';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { 
  faBook, 
  faComment,
  faLock, 
  faRightFromBracket,
  faRightToBracket, 
  faUser, 
  faUserPlus,
  faShareFromSquare,
  faSpa,
  faEnvelope,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faBook, 
    faComment,
    faLock,
    faRightFromBracket,
    faRightToBracket,
    faUser,
    faUserPlus,
    faShareFromSquare,
    faSpa,
    faEnvelope,
    faXmark
  )

const app = createApp(App)
  .use(router)
  .use(store)
  .use(VueMathjax)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
