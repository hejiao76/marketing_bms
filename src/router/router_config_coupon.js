
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const marketing_coupon = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_base')), 'marketing_coupon');
const marketing_coupon_list = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_list')), 'marketing_coupon_list');
const marketing_coupon_edit = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_edit')), 'marketing_coupon_edit');
const marketing_coupon_ticket_list = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_ticket_list')), 'marketing_coupon_ticket_list');
const marketing_coupon_ticket_edit = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_ticket_edit')), 'marketing_coupon_ticket_edit');
const marketing_coupon_record_list = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_record_list')), 'marketing_coupon_record_list');
const marketing_coupon_detail = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_detail')), 'marketing_coupon_detail');
const marketing_coupon_ticket_detail = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_ticket_detail')), 'marketing_coupon_ticket_detail');

const routerConfig = [{
  path: '/coupon',
  component:marketing_coupon,
   redirect:'/coupon/list',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      path:'list',//优惠券活动列表  抵扣券活动列表
      name:"marketing_coupon_list",
      component:marketing_coupon_list
    },
    {
      path:'edit/:couponId',//优惠券活动编辑
      name:"marketing_coupon_edit",
      component:marketing_coupon_edit
    },
    {
      path:'ticket_list',//优惠券券列表 抵扣券列表抵扣券活动
      name:"marketing_coupon_ticket_list",
      component:marketing_coupon_ticket_list
    },
    {
      path:'ticket_edit/:ticketId',//优惠券券编辑    添加抵扣券活动
      name:"marketing_coupon_ticket_edit",
      component:marketing_coupon_ticket_edit
    },
    {
      path:'ticket_edit/:type/:ticketId',//优惠券券编辑    添加抵扣券活动
      name:"marketing_coupon_ticket_copy",
      component:marketing_coupon_ticket_edit
    },
    {
      path:'record_list/',//优惠券订单列表   消耗记录
      name:"marketing_coupon_record_list",
      component:marketing_coupon_record_list
    },
    {
      path:'datail/:couponId',//抵扣券活动详情
      name:"marketing_coupon_detail",
      component:marketing_coupon_detail
    },
    {
      path:'ticket_datail/:ticketId',//抵扣券详情
      name:"marketing_coupon_ticket_detail",
      component:marketing_coupon_ticket_detail
    },
  ]
}];

export default routerConfig;
