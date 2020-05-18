import Vue from 'vue';
import Router from 'vue-router';
import Login from 'pages/login';
Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/') {
    next({ path: '/login' });
    return false;
  }
  next();
})
export default router
