import Vue from 'vue'
import Router from 'vue-router'


import RouterConfigBase from "./router_config_base"
import RouterConfigCoupon from "./router_config_coupon"
import RouterConfigPrizeDraw from "./router_config_prizeDraw"
import RouterConfigSedKill from "./router_config_sedKill"

Vue.use(Router)
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
// const home = r => require.ensure([], () => r(require('../page/home')), 'home');
// const login = r => require.ensure([], () => r(require('../page/login')), 'login')

var routerConfig = [];
routerConfig = routerConfig.concat(RouterConfigBase,RouterConfigCoupon,RouterConfigPrizeDraw,RouterConfigSedKill)
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
