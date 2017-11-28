
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const marketing_sedKill = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_base')), 'marketing_sedKill');
const marketing_sedKill_list = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_list')), 'marketing_sedKill_list');
const marketing_sedKill_edit = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_edit')), 'marketing_sedKill_edit');
const marketing_sedKill_ticket_list = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_ticket_list.vue')), 'marketing_sedKill_ticket_list');
const marketing_sedKill_ticket_edit = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_ticket_edit.vue')), 'marketing_sedKill_ticket_edit');

const routerConfig = [{
  path: '/sedkill',
  component:marketing_sedKill,
  redirect:'/sedkill',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      path:'list',//公司管理员查询
      name:"list",
      component:marketing_sedKill_list
    },
    {
      path:'edit',//公司管理员查询
      name:"edit/:sedKillId",
      component:marketing_sedKill_edit
    },
    {
      path:'ticket_list',//公司管理员查询
      name:"ticket_list",
      component:marketing_sedKill_ticket_list
    },
    {
      path:'ticket_edit',//公司管理员查询
      name:"ticket_edit/:ticketId",
      component:marketing_sedKill_ticket_edit
    },
  ]
}];

export default routerConfig;
