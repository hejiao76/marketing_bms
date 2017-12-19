// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  store from "./store/index"
import moment from "moment";
import VueMoment from "vue-moment";
import axios from 'axios'

import api from "./fetch/api"
import * as util from "./util/util"
import Final from "../static/baseSetting/Final"

let ticket=util.getUrlParam(window.location.href,Final.TICKET_NAME);
if(ticket){
  api.base_checkLogin({ticket:ticket})
      .then(res =>{
      if(res.status==true && res.code==200){
        window.location.href=window.location.href.split("?")[0]+"#"+window.location.href.split("#")[1];

      }else if(res.status==true && res.code==999){
        window.location.href=res.result;
      }
    }).catch(error => {
      console.log("error-------",error);
    });
}else {
  api.base_checkLogin({ticket:ticket})
    .then(res =>{
      if(res.status==true && res.code==200){
        loadVue();
      }else if(res.status==true && res.code==999){
        window.location.href=res.result;
      }
    }).catch(error => {
      console.log("error-------",error);
  });
}
/**
 * 用户权限验证成功后----初始化VUE
 */
function loadVue (){
  Vue.config.productionTip = false
  Vue.use(ElementUI);
  Vue.use(VueMoment, moment);
  Vue.prototype.$http = axios;
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store:store,
    // template: '<App/>',
    ...App
  })
}

