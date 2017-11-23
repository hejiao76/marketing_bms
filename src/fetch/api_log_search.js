import * as fetch from "./fetch"

export default {
  /*************方法命名规则： 前缀 lgs_ 前缀 lgs_ 前缀 lgs_   写注释 写注释***************/
  /**
   * 测试方法
   */
    lgs_test(params) {
      return fetch.fetch('/test', params);
    },
    /**
     * 订单日志
     */
    lgs_orderNum(params){
      return fetch.fetch('/wuliu-web-user/order/zb/getZbLogByGlobalOrderNum.action',params)
    }
}
