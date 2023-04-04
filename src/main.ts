import { createApp } from 'vue'
import './assets/tailwindcss.css'
import App from './App.vue'
import router from './router'
import VueTailWindUI from 'simple-tailwind-ui'
const app = createApp(App)

app.use(router)
app.use(VueTailWindUI)

app.mount("#app");