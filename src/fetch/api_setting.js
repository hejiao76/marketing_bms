import * as fetch from "./fetch"

export default {
  /*************方法命名规则： 前缀 set_ 前缀 set_ 前缀 set_   写注释 写注释***************/
  /**
   * 测试方法
   */
  set_test(params) {
    return fetch.fetch('/test', params);
  },
  set_person_infor(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/getLoginUserInfo.action',params);
  },
  //更新帐号
  set_update_user(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/updateUser.action',params);
  },
  //修改密码
  set_update_pwd(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/updatePwd.action',params);
  },
  //查询用户列表
  set_user_list(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/systemAdmin/userList.action',params);
  },
  //根据用户编号查询用户信息
  set_query_user(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/systemAdmin/queryUser.action',params);
  },
  //更新用户可选权限
  set_update_menus(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/systemAdmin/updateUserMenus.action',params);
  },
  //添加用户
  set_add_user(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/systemAdmin/addUser.action',params);
  },
  //获取所有职位
  set_get_roles(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/systemAdmin/getAllRoles.action',params);
  },
  //根据职位获取可选菜单
  set_menus_role(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/systemAdmin/getMenusByRole.action',params);
  },
  //职位添加菜单
  set_add_menus(params){
    return fetch.fetch('/wuliu-web-user/audit/sys/systemAdmin/addMenusForRole.action',params);
  }
}
