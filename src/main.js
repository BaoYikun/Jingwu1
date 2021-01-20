// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {get, post, put} from './request/http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import common from "./assets/js/common";
// 适配
import 'lib-flexible'
// 组件
import JwHeader from '@/components/JwHeader.vue'
import JwFooter from '@/components/JwFooter.vue'

Vue.prototype.$common = common;
Vue.use(ElementUI);
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$put = put;
Vue.config.productionTip = false

Vue.component(
  'jw-header',
  JwHeader
)
Vue.component(
  'jw-footer',
  JwFooter
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
