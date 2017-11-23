
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const datasearch = r => require.ensure([], () => r(require('../page/dataSearch/data_search_base')), 'datasearch');
const datasearch_CompanyManager = r => require.ensure([], () => r(require('../page/dataSearch/data_search')), 'datasearch_CompanyManager');
const datasearch_QiShiImg = r => require.ensure([], () => r(require('../page/dataSearch/data_search_qsImg')), 'datasearch_QiShiImg');
const datasearch_GrRz = r => require.ensure([], () => r(require('../page/dataSearch/data_search_grrz')), 'datasearch_GrRz');
const datasearch_OrderQuery = r => require.ensure([], () => r(require('../page/dataSearch/data_search_orderQuery')), 'datasearch_OrderQuery');
const datasearch_stoPar = r => require.ensure([], () => r(require('../page/dataSearch/data_search_storagePerformance')), 'datasearch_stoPar');
const datasearch_RR = r => require.ensure([], () => r(require('../page/dataSearch/data_search_RecommendReward')), 'datasearch_RR');
const routerConfig = [{
  path: '/datasearch',
  component:datasearch,
  redirect:'/datasearch/datasearch_CompanyManager',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      path:'datasearch_CompanyManager',//公司管理员查询
      name:"datasearch_CompanyManager",
      component:datasearch_CompanyManager
    },
    {
      path:'datasearch_QiShiImg',//骑士信息查询
      name:"datasearch_QiShiImg",
      component:datasearch_QiShiImg
    },{
       name:'datasearchGrrz',
       path:'datasearchGrrz/:grrzQueryType',//个人认证信息
       component:datasearch_GrRz,
      watch:{
         '$route' (to,from) {
           console.log("router page");
         }
      }
    },{
      path:'datasearch_OrderQuery',//订单查询
      name:"datasearch_OrderQuery",
      component:datasearch_OrderQuery
    },{
      name:'datasearchStoPer',
      path:'datasearchStoPer/:stoPerQueryType',//个人认证信息
      component:datasearch_stoPar,
      watch:{
        '$route' (to,from) {
          console.log("router page");
        }
      }
    },{
      name:'datasearchRR',
      path:'datasearchRR/:RRQueryType',//个人认证信息
      component:datasearch_RR,
      watch:{
        '$route' (to,from) {
          console.log("router page");
        }
      }
    }
  ]
}];

export default routerConfig;
