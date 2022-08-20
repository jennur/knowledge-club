import { createApp } from 'vue'
import router from './router'
import App from './Suspenser.vue'
import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
        faBook, 
        faUser
    )

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
