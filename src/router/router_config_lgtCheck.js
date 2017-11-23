
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const lgtcheck = r => require.ensure([], () => r(require('../page/lgtCheck/lgt_check_base')), 'lgtcheck');
// const company_check_wait = r => require.ensure([], () => r(require('../page/lgtCheck/company_check_wait')), 'company_check_wait');
const company_check_list = r => require.ensure([], () => r(require('../page/lgtCheck/company_check_list')), 'company_check_list');
const company_check_detail = r => require.ensure([], () => r(require('../page/lgtCheck/company_check_detail')), 'company_check_detail');
const personal_check_list = r => require.ensure([], () => r(require('../page/lgtCheck/personal_check_list')), 'personal_check_list');
const personal_check_detail = r => require.ensure([], () => r(require('../page/lgtCheck/personal_check_detail')), 'personal_check_detail');
const personal_check_detail_info = r => require.ensure([], () => r(require('../page/lgtCheck/personal_check_detail_info')), 'personal_check_detail_info');
const driver_check_list = r => require.ensure([], () => r(require('../page/lgtCheck/driver_check_list')), 'driver_check_list');
const driver_check_detail = r => require.ensure([], () => r(require('../page/lgtCheck/driver_check_detail')), 'driver_check_detail');
const driver_check_detail_info = r => require.ensure([], () => r(require('../page/lgtCheck/driver_check_detail_info')), 'driver_check_detail_info');
const truckDriver_check_list = r => require.ensure([], () => r(require('../page/lgtCheck/truckDriver_check_list')), 'truckDriver_check_list');
const truckDriver_check_detail = r => require.ensure([], () => r(require('../page/lgtCheck/truckDriver_check_detail')), 'truckDriver_check_detail');
const truckDriver_check_detail_info = r => require.ensure([], () => r(require('../page/lgtCheck/truckDriver_check_detail_info')), 'truckDriver_check_detail_info');
const truck_check_list = r => require.ensure([], () => r(require('../page/lgtCheck/truck_check_list')), 'truck_check_list');
const truck_check_detail = r => require.ensure([], () => r(require('../page/lgtCheck/truck_check_detail')), 'truck_check_detail');
const truck_check_detail_info = r => require.ensure([], () => r(require('../page/lgtCheck/truck_check_detail_info')), 'truck_check_detail_info');
const routerConfig = [{
  path: '/lgtcheck',
  component:lgtcheck,
  //redirect:'/lgtcheck/test',  //根据实际业务 重定向到之路由
  redirect:'/lgtcheck/companycheck/1',
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      name:'companycheck',
      path:'companycheck/:checkstatus',
       component:company_check_list
    },
    {
      name:'companyDetail',
      path:'companyDetail/:companyInfoId',
      component:company_check_detail
    },
    {
      name:'companyDetailScramble',
      path:'companyDetail/scramble/:companyInfoId',
      component:company_check_detail
    },
    {
      name:'personalcheck',
      path:'personalcheck/:checkstatus',
      component:personal_check_list
    },
    {
      name:'personalDetail',
      path:'personalDetail/:personalInfoId',
      component:personal_check_detail
    },
    {
      name:'personalDetailInfo',
      path:'personalDetailInfo/:personalInfoId',
      component:personal_check_detail_info
    }, {
      name:'drivercheck',
      path:'drivercheck/:checkstatus',
      component:driver_check_list
    },
    {
      name:'driverDetail',
      path:'driverDetail/:driverInfoId',
      component:driver_check_detail
    },
    {
      name:'driverDetailInfo',
      path:'driverDetailInfo/:driverInfoId',
      component:driver_check_detail_info
    },
    {
      name:'truckDrivercheck',
      path:'truckDrivercheck/:checkstatus',
      component:truckDriver_check_list
    },
    {
      name:'truckDriverDetail',
      path:'truckDriverDetail/:truckDriverInfoId',
      component:truckDriver_check_detail
    },
    {
      name:'truckDriverDetailInfo',
      path:'truckDriverDetailInfo/:truckDriverInfoId',
      component:truckDriver_check_detail_info
    },
    {
      name:'truckcheck',
      path:'truckcheck/:checkstatus',
      component:truck_check_list
    },
    {
      name:'truckDetail',
      path:'truckDetail/:truckInfoId',
      component:truck_check_detail
    },
    {
      name:'truckDetailInfo',
      path:'truckDetailInfo/:truckInfoId',
      component:truck_check_detail_info
    }
    // {
    //   path:'waitcheck',
    //   component:company_check_wait
    // },
    // {
    //   path:'pass',
    //   component:company_check_wait
    // }
  ]
}];

export default routerConfig;
