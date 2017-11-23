
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const approval = r => require.ensure([], () => r(require('../page/approval/approval_base')), 'approval')
const approval_OrderLog = r => require.ensure([], () => r(require('../page/approval/approval_list')), 'approval_OrderLog')
const routerConfig = [{
  path: '/approval',
  component:approval,
  redirect:'approval/approval_OrderLog',
  //redirect:'/startwork/startwork_1',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    // {
    //   path:'startwork_1',
    //   component:startwork_1
    // }
    {
      name:'approval_OrderLog',
      path:'approval_OrderLog',
      component:approval_OrderLog
    }
  ]
}];

export default routerConfig;


