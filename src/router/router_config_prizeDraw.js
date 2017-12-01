
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const marketing_prizeDraw = r => require.ensure([], () => r(require('../page/marketingPrizeDraw/marketing_prizeDraw_base')), 'marketing_prizeDraw');
const marketing_prizeDraw_list = r => require.ensure([], () => r(require('../page/marketingPrizeDraw/marketing_prizeDraw_list')), 'marketing_prizeDraw_list');
const marketing_prizeDraw_edit = r => require.ensure([], () => r(require('../page/marketingPrizeDraw/marketing_prizeDraw_edit')), 'marketing_prizeDraw_edit');
const marketing_prizeDraw_prize_list = r => require.ensure([], () => r(require('../page/marketingPrizeDraw/marketing_prizeDraw_prize_list')), 'marketing_prizeDraw_prize_list');

const routerConfig = [{
  path: '/prizeDraw',
  component:marketing_prizeDraw,
  redirect:'/prizeDraw/list',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      path:'list',//抽奖活动列表
      name:"marketing_prizeDraw_list",
      component:marketing_prizeDraw_list
    },
    {
      path:'edit/:prizeDrawId',//新建/编辑抽奖活动
      name:"marketing_prizeDraw_edit",
      component:marketing_prizeDraw_edit
    },
    {
      path:'prize_list',//中奖列表
      name:"marketing_prizeDraw_prize_list",
      component:marketing_prizeDraw_prize_list
    }
  ]
}];

export default routerConfig;
