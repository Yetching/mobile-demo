import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 样式
import './styles/index.less';

import Vant from 'vant';

// 自动设置rem基准值
import 'amfe-flexible';

function bootStrap() {
  const app = createApp(App);

  app.use(Vant);

  app.use(store);

  app.use(router);

  app.mount('#app');
}

// 默认
// createApp(App).use(store).use(router).mount('#app');

bootStrap();
