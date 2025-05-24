import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import App from './App.vue'
Amplify.configure(outputs);

const app = createApp(App)
app.use(createPinia())

app.mount('#app')
