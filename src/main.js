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
import TestData from "./util/TestData"

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
  api.base_checkLogin({})
    .then(res =>{
      if(res.status==true && res.code==200){
        if(res.result.ownerType){
            localStorage.setItem("ownerType",res.result.ownerType)
        }else{
            localStorage.removeItem("ownerType");
        }
        // loadVue();
        initApp();
      }else if(res.status==true && res.code==999){
        window.location.href=res.result;
      }
    }).catch(error => {
      console.log("error-------",error);
  });
}

/**
 * 初始化权限菜单
 */
function initApp (){
  console.log("initApp");
  api.base_menus_resource({})
    .then(res =>{
      if(res.status==true){
        let roleMenus=res.result;
        roleMenus=TestData.left_menu_data;  //测试数据
        let treeObj={parentId:-1,resourceId:0,resourceName:"根节点",children:[]};
        buildRolesMenuTree(treeObj,roleMenus);
        localStorage.setItem("roleMenus",JSON.stringify(treeObj));
        loadVue();
      }else{
        // this.$refs.tipMsgRef.showTipMsg({
        //   msg:res.message,
        //   type:"error"
        // });
      }
    }).catch(error =>{
        console.log(error);
  });
}
/**
 * 构建权限菜单树
 */
function buildRolesMenuTree(pnode,roleMenus) {
  if(pnode && roleMenus.length>0) {
    for (let i = 0; i < roleMenus.length; i++) {
      if (roleMenus[i].parentId == pnode.resourceId) {
        if(roleMenus[i].resourceUrl){
          if (pnode.children) {
            pnode.children.push(roleMenus[i]);
          } else {
            pnode.children = [];
            pnode.children.push(roleMenus[i]);
            if (roleMenus[i].path) {
              pnode.resourceUrl = roleMenus[i].path;  //为父级节点 重新配置path
              console.log(pnode.resourceUrl);
            }
          }
          buildRolesMenuTree(roleMenus[i], roleMenus, this);
        }
      }
    }
    if (pnode.children) {
      pnode.children.sort(function (a, b) {
        return a["orderNum"] - b["orderNum"];
      });
    }
  }
}
/**
 * 用户权限验证成功后---菜单数据拉去成功后--初始化VUE
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


