
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const setting = r => require.ensure([], () => r(require('../page/setting/setting_base')), 'setting');
const setting_personInfor = r => require.ensure([], () => r(require('../page/setting/setting_person_infor')), 'setting_personInfor');
const setting_staff_management = r => require.ensure([], () => r(require('../page/setting/setting_staff_management')), 'setting_staff_management');
const setting_permission_match = r => require.ensure([], () => r(require('../page/setting/setting_permission_match')), 'setting_permission_match');
const routerConfig = [{
  path: '/setting',
  component:setting,
  redirect:'/setting/setting_personInfor',  //根据实际业务 重定向到之路由
  children: [//二级路由  path不加 '/'  path 不加 '/'  path 不加 '/'  重要的事情说三遍  加了 '/' 代表根级
    {
      name:'setting_personInfor',
      path:'setting_personInfor',//个人信息
      component:setting_personInfor
    },
    {
      name:'setting_staff_management',
      path:'setting_staff_management',//员工管理
      component:setting_staff_management
    },
    {
      name:'setting_permission_match',
      path:'setting_permission_match',//权限匹配
      component:setting_permission_match
    }
  ]
}];

export default routerConfig;
