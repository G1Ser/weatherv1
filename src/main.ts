import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './main.scss';
import getGitInfo from './utils/git';
import performanceMonitor from './utils/performance';

// Configure global SVG base path
import { configureSvgIcon } from './shared/svgIcon';
configureSvgIcon({ basePath: '/svgs' });

if (process.env.NODE_ENV === 'production') {
  getGitInfo();
  performanceMonitor.init();
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
