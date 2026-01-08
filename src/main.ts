import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './main.scss';
import getGitInfo from './utils/git';
import performanceMonitor from './utils/performance';

if (process.env.NODE_ENV === 'production') {
  getGitInfo();
  performanceMonitor.init();
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
