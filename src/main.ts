import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './main.scss';

// 创建Vue应用实例
const app = createApp(App);
app.use(router);

// 挂载应用
app.mount('#app');
