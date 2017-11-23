import * as fetch from "./fetch"

export default {
  /*************方法命名规则：lc_ 前缀 lc_ 前缀 lc_ 前缀   写注释 写注释***************/
  //-----------------------------企业审核接口-----------------------------------------//
  /**
   * 测试方法
   */
  lc_test(params) {
    return fetch.fetch('/test', params);
  },
  /**
   * 企业审核列表查询
   * @param params
   * @returns {*}
   */
  lc_company_check_list (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/getCompanyAuditList.action', params);
  },

  /**
   * 企业审核企业详情
   * @param params
   * @returns {*}
   */
  lc_company_check_info (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/getCompanyInfo.action', params);
  },
  /**
   * 企业审核信息提交
   * @param params
   * @returns {*}
   */
  lc_company_check_info_commit (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/auditCompanyInfo.action', params);
  },
  /**
   * 撤销审批
   * @param params
   * @returns {*}
   */
  lc_revoke_audit (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/revokeAudit.action', params);
  },
  /**
   * 撤销审批
   * @param params
   * @returns {*}
   */
  lc_get_audit_remark (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/getAuditRemark.action', params);
  },
  /**
   * 请求审批记录
   * @param params
   * @returns {*}
   */
  lc_show_audit_log (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/showAuditLog.action', params);
  },
  /**
   * 请求审批记录
   * @param params
   * @returns {*}
   */
  lc_show_audit_log_detail (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/showAuditSnapshot.action', params);
  },
  /**
   * 抢单模式获取详情ID
   * @param params
   * @returns {*}
   */
  ls_get_scramble_id (params) {
    return fetch.fetch("wuliu-web-user/wuliu/audit/grabAudit.action?tag="+Math.random(), params);
  },
//-----------------------------个人审核接口-----------------------------------------//
  /**
   * 个人审核列表查询
   * @param params
   * @returns {*}
   */
  lc_personal_check_list (params) {
    return fetch.fetch('wuliu-web-user/audit/qishi/list.action', params,"get");
  },

  /**
   * 个人审核个人详情
   * @param params
   * @returns {*}
   */
  lc_personal_check_info (params) {
    return fetch.fetch('wuliu-web-user/audit/qishi/detail.action', params,"get");
  },
  /**
   * 个人审核信息提交
   * @param params
   * @returns {*}
   */
  lc_personal_check_info_commit (params) {
    return fetch.fetch('wuliu-web-user/audit/qishi/agree.action', params);
  },
  /**
   * 审核不通过
   * @param params
   * @returns {*}
   */
  lc_personal_check_fail_info_commit (params) {
    return fetch.fetch('wuliu-web-user/audit/qishi/reject.action', params);
  },
  /**
   * 撤销个人审批
   * @param params
   * @returns {*}
   */
  lc_personal_revoke_audit (params) {
    return fetch.fetch('wuliu-web-user/audit/qishi/cancel.action', params);
  },
  /**
   * 个人信息异常标记
   * @param params
   * @returns {*}
   */
  lc_personal_review_info_ex (params) {
    return fetch.fetch('wuliu-web-user/emp/trade/reviewInfoEx.action', params);
  },

//-----------------------------司机审核接口-----------------------------------------//
  /**
   * 司机审核列表查询
   * @param params
   * @returns {*}
   */
  lc_driver_check_list (params) {
    return fetch.fetch('wuliu-web-user/audit/driver/list.action', params,"get");
  },
  /**
   * 司机审核司机详情
   * @param params
   * @returns {*}
   */
  lc_driver_check_info (params) {
    return fetch.fetch('wuliu-web-user/audit/driver/detail.action', params,"get");
  },
  /**
   * 司机审核信息提交
   * @param params
   * @returns {*}
   */
  lc_driver_check_info_commit (params) {
    return fetch.fetch('wuliu-web-user/audit/driver/agree.action', params);
  },
  /**
   * 审核不通过
   * @param params
   * @returns {*}
   */
  lc_driver_check_fail_info_commit (params) {
    return fetch.fetch('wuliu-web-user/audit/driver/reject.action', params);
  },
  /**
   * 获取车辆类型及长宽高荷载信息
   * @param params
   * @returns {*}
   */
  lc_driver_query_vehicle_info (params) {
    return fetch.fetch('wuliu-web-user/audit/driver/queryVehicleInfoInfo.action', params,"get");
  },
  /**
   * 修改车辆类型
   * @param params
   * @returns {*}
   */
  lc_driver_update_new_vehicle_type (params) {
    return fetch.fetch('wuliu-web-user/audit/driver/updateNewVehicleType.action', params);
  },
  /**
   * 撤销司机审批
   * @param params
   * @returns {*}
   */
  lc_driver_revoke_audit (params) {
    return fetch.fetch('wuliu-web-user/audit/driver/cancel.action', params);
  },
  /**
   * 司机信息异常标记
   * @param params
   * @returns {*}
   */
  lc_driver_review_info_ex (params) {
    return fetch.fetch('wuliu-web-user/emp/trade/reviewInfoEx.action', params);
  },
  //-----------------------------共享平台司机审核接口-----------------------------------------//
  /**
   * 共享平台司机审核列表查询
   * @param params
   * @returns {*}
   */
  truckDriver_check_list (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/getDriverList.action', params,"get");
  },
  /**
   * 共享平台司机审核司机详情
   * @param params
   * @returns {*}
   */
  truckDriver_check_info (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/getDriverDetail.action', params,"get");
  },
  /**
   * 共享平台司机审核信息提交
   * @param params
   * @returns {*}
   */
  truckDriver_check_info_commit (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/agreeDriver.action', params);
  },
  /**
   * 共享平台司机不通过
   * @param params
   * @returns {*}
   */
  truckDriver_check_fail_info_commit (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/rejectDriver.action', params);
  },
  /**
   * 撤销共享平台司机审批
   * @param params
   * @returns {*}
   */
  truckDriver_revoke_audit (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/cancelDriver.action', params);
  },
  //-----------------------------共享平台车辆审核接口-----------------------------------------//
  /**
   * 共享平台车辆审核列表查询
   * @param params
   * @returns {*}
   */
  truck_check_list (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/getTruckList.action', params,"get");
  },
  /**
   * 共享平台车辆审核详情
   * @param params
   * @returns {*}
   */
  truck_check_info (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/getTruckDetail.action', params,"get");
  },
  /**
   * 共享平台车辆审核信息提交
   * @param params
   * @returns {*}
   */
  truck_check_info_commit (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/agreeTruck.action', params);
  },
  /**
   * 共享平台车辆不通过
   * @param params
   * @returns {*}
   */
  truck_check_fail_info_commit (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/rejectTruck.action', params);
  },
  /**
   * 撤销共享车辆审批
   * @param params
   * @returns {*}
   */
  truck_revoke_audit (params) {
    return fetch.fetch('wuliu-web-user/audit/truck/cancelTruck.action', params);
  },
}
