import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import axios from 'axios'
import util from './common/js/util'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.$ajax = axios;
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueRouter)


//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

// 初始判断是否存在cookie不存在的话直接跳转到登录页面
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    // console.log(store.state.count)
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && (to.path != '/login' && to.path != '/register')) {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

