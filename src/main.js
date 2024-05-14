import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCarousel from 'vue3-carousel';

import mitt from 'mitt'
const emitter = mitt();





import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const pinia = createPinia();
const app =  createApp(App);


app.use(pinia);
app.config.globalProperties.$emitter = emitter;
app.use(VueAxios, axios);
app.use(router).use(VueCarousel);
app.component('Loading', Loading);
app.mount('#app');
