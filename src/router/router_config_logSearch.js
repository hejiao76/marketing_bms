
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const logsearch = r => require.ensure([], () => r(require('../page/logSearch/log_search_base')), 'logsearch')
const logsearch_OrderLog = r => require.ensure([], () => r(require('../page/logSearch/log_search')), 'logsearch_OrderLog')
// const log_search_equipment = r => require.ensure([], () => r(require('../page/logSearch/log_search_equipment')), 'log_search_equipment')
// const log_search_operation = r => require.ensure([], () => r(require('../page/logSearch/log_search_operation')), 'log_search_operation')
const routerConfig = [{
  path: '/logsearch',
  component:logsearch,
   redirect:'/logsearch/logsearch_OrderLog',  //根据实际业务 重定向到之路由默认跳转到订单日志
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      name:"logsearch_OrderLog",
      path:'logsearch_OrderLog',
      component:logsearch_OrderLog
    }
    // ,{
    //   name:"log_search_equipment",
    //   path:'log_search_equipment',
    //   component:log_search_equipment
    // },{
    //   name:"log_search_operation",
    //   path:'log_search_operation',
    //   component:log_search_operation
    // }
  ]
}];

export default routerConfig;
