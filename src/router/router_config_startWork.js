
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const startwork = r => require.ensure([], () => r(require('../page/startWork/start_work_base')), 'startwork')
const startwork_1 = r => require.ensure([], () => r(require('../page/startWork/start_work')), 'startwork_1')
const start_work_detail = r => require.ensure([], () => r(require('../page/startWork/start_work_detail')), 'start_work_detail')
const routerConfig = [{
  path: '/startwork',
  component:startwork,
  redirect:'/startwork/startwork_1',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      name:'startwork_1',
      path:'startwork_1',
      component:startwork_1
    },
    {
      name:'startWorkDetail',
      path:'startWorkDetail/:companyInfoId',
      component:start_work_detail
    }
  ]
}];

export default routerConfig;
