import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pages/index';
Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.path === '/') {
    next({ path: '/index' });
    return false;
  }
  next();
})

export default router
