import Vue from 'vue'
import Router from 'vue-router'


import RouterConfigBase from "./router_config_base"
import RouterConfigDataSearch from "./router_config_dataSearch"
import RouterConfigLgtCheck from "./router_config_lgtCheck"
import RouterConfigLgtsSetting from "./router_config_lgtsSetting"
import RouterConfigLogSearch from "./router_config_logSearch"
import RouterConfigSetting from "./router_config_setting"
import RouterConfigStartWork from "./router_config_startWork"
import RouterConfigApproval from "./router_config_approval"

Vue.use(Router)
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
// const home = r => require.ensure([], () => r(require('../page/home')), 'home');
// const login = r => require.ensure([], () => r(require('../page/login')), 'login')

var routerConfig = [];
routerConfig = routerConfig.concat(RouterConfigBase,RouterConfigDataSearch,RouterConfigLgtCheck,RouterConfigLgtsSetting,RouterConfigLogSearch,RouterConfigSetting,RouterConfigStartWork,RouterConfigApproval)
console.log(routerConfig)
// debugger;
export default new Router ({
  linkActiveClass: 'active',
  routes:routerConfig
  //   component: App, //顶层路由，对应index.html
  //   children: [ //二级路由。对应App.vue
  //     //地址为空时跳转home页面
  //     {
  //       path: '',
  //       redirect: '/home'
  //     },
  //     {
  //       path: '/home',
  //       component:home
  //     }]
  // }]
})
