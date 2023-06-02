import { createApp } from 'vue'
import VueWorkout from './VueWorkout.vue'
import apiClient from './api/apiClient'

const app = createApp(VueWorkout)
app.config.globalProperties.$axios = apiClient
app.mount('#app')
