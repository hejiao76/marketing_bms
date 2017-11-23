
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const lgtssetting = r => require.ensure([], () => r(require('../page/lgtsSetting/lgts_setting_base')), 'lgtssetting')
const express = r => require.ensure([], () => r(require('../page/lgtsSetting/lgts_setting_express')), 'express')
const city = r => require.ensure([], () => r(require('../page/lgtsSetting/lgts_setting_city.vue')), 'city')
const lineCompany = r => require.ensure([], () => r(require('../page/lgtsSetting/lgts_setting_line.vue')), 'lineCompany')
const driver = r => require.ensure([], () => r(require('../page/lgtsSetting/lgts_setting_driver.vue')), 'driver')
const routerConfig = [{
  path: '/lgtssetting',
  component:lgtssetting,
  redirect:'/lgtssetting/express',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      name:'lgtssetting_express',
      path:'express',
      component:express
    },
    {
      name:'lgtssetting_city',
      path:'city',
      component:city
    },
    {
      name:'lgtssetting_lineCompany',
      path:'lineCompany',
      component:lineCompany
    },
    {
      name:'lgtssetting_driver',
      path:'driver',
      component:driver
    }
  ]
}];

export default routerConfig;
