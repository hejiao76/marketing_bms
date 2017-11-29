// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import  store from "./store/index"
import axios from 'axios';
import './static/UE/ueditor.config'
import './static/UE/ueditor.all.min'
import './static/UE/lang/zh-cn/zh-cn'
import './static/UE/ueditor.parse.min'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  // template: '<App/>',
  ...App
})
