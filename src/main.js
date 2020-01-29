import Vue from 'vue'
import App from './App.vue'
import './styles/reset.less'
import router from './router'

import 'babel-polyfill';
import Es6Promise from 'es6-promise';
require('es6-promise').polyfill();
Es6Promise.polyfill();

Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
