import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

let app = createApp(App).use(router).mount('#app')
