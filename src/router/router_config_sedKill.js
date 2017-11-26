
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const marketing_sedKill = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_base')), 'marketing_sedKill');

const routerConfig = [{
  path: '/sedkill',
  component:marketing_sedKill,
  redirect:'/sedkill',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      path:'sedkill',//公司管理员查询
      name:"sedkill",
      component:marketing_sedKill
    }
  ]
}];

export default routerConfig;
