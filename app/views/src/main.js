import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import './assets/main.css'

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
  )

createApp(App)
  .use(router)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
