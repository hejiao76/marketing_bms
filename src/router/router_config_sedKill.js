
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const marketing_sedKill = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_base')), 'marketing_sedKill');
const marketing_sedKill_list = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_list')), 'marketing_sedKill_list');
const marketing_sedKill_edit = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_edit')), 'marketing_sedKill_edit');
const marketing_sedKill_ticket_list = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_ticket_list.vue')), 'marketing_sedKill_ticket_list');
const marketing_sedKill_ticket_edit = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_ticket_edit.vue')), 'marketing_sedKill_ticket_edit');
const marketing_sedKill_order_list = r => require.ensure([], () => r(require('../page/marketingSedKill/marketing_sedKill_order_list.vue')), 'marketing_sedKill_order_list');

const routerConfig = [{
  path: '/sedkill',
  component:marketing_sedKill,
  redirect:'/sedkill',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      path:'list',//秒杀活动列表
      name:"marketing_sedKill_list",
      component:marketing_sedKill_list
    },
    {
      path:'edit/:sedKillId',//秒杀活动编辑
      name:"marketing_sedKill_edit",
      component:marketing_sedKill_edit
    },
    {
      path:'ticket_list',//秒杀券列表
      name:"marketing_sedKill_ticket_list",
      component:marketing_sedKill_ticket_list
    },
    {
      path:'ticket_edit/:ticketId',//秒杀券编辑
      name:"marketing_sedKill_ticket_edit",
      component:marketing_sedKill_ticket_edit
    },
    {
      path:'ticket_edit/:type/:ticketId',//秒杀券复制
      name:"marketing_sedKill_ticket_copy",
      component:marketing_sedKill_ticket_edit
    },
    {
      path:'order_list',//秒杀订单列表
      name:"marketing_sedKill_order_list",
      component:marketing_sedKill_order_list
    },
  ]
}];

export default routerConfig;
