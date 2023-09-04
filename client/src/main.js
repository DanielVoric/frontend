import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/global-style.css';

//modificiraju se requestovi prije nego se posalju, tj dodaje se token svakom requestu, za auth
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const app = createApp(App);

app.use(router);

app.mount('#app');
