
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const marketing_coupon = r => require.ensure([], () => r(require('../page/marketingCoupon/marketing_coupon_base')), 'marketing_coupon');

const routerConfig = [{
  path: '/marketing_coupon',
  component:marketing_coupon,
  // redirect:'/marketing_coupon/marketing_coupon',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      path:'marketing_coupon',//公司管理员查询
      name:"marketing_coupon",
      component:marketing_coupon
    }
  ]
}];

export default routerConfig;
