import * as fetch from "./fetch"

export default {
  /*************方法命名规则： 前缀 sw_ 前缀 sw_ 前缀 sw_   写注释 写注释***************/
  /**
   * 测试方法
   */
  sw_test(params) {
    return fetch.fetch('/test', params);
  },
  /**
   * 工作开始列表查询
   */
  sw_check_list(params){
    return fetch.fetch('wuliu-web-user/wuliu/audit/getStartWorkList.action',params)
  },
  /**
   * 工作开始企业详情
   * @param params
   * @returns {*}
   */
  sw_check_info (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/getCompanyInfo.action', params);
  },
  /**
   * 工作开始信息提交
   * @param params
   * @returns {*}
   */
  sw_check_info_commit (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/auditCompanyInfo.action', params);
  },

  /**
   * 审核不通过理由
   * @param params
   * @returns {*}
   */
  sw_get_audit_remark (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/getAuditRemark.action', params);
  },
  /**
   * 请求审批记录
   * @param params
   * @returns {*}
   */
  sw_show_audit_log (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/showAuditLog.action', params);
  },
  /**
   * 请求审批记录
   * @param params
   * @returns {*}
   */
  sw_show_audit_log_detail (params) {
    return fetch.fetch('wuliu-web-user/wuliu/audit/showAuditSnapshot.action', params);
  }
}
