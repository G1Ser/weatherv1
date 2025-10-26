import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './router';

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
