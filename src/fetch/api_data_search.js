import * as fetch from "./fetch"
/**
 * 数据查询
 */
export default {
    /*************方法命名规则：ds_ 前缀 ds_ 前缀 ds_ 前缀   写注释 写注释***************/
  /**
   * 公司管理员查询
   * @param params
   * @returns {*}
   */
    ds_test(params) {
        return fetch.fetch('/wuliu-web-user/wuliu/user/getCompanyAdminUser.action', params);
    },
  /**
   * 骑士信息查询
   */
    ds_qsImg(params){
      return fetch.fetch('/wuliu-web-user/order/zb/getQishiInfo.action',params);
  },
  /**
   * 骑士信息查看
   */
    ds_qsImg_check(params){
      return fetch.fetch('/wuliu-web-user/order/zb/getIdCardByPhone.action',params);
  },
  /**
   * 个人认证
   */
   ds_grrz(params){
      return fetch.fetch('/wuliu-web-user/order/zb/grrzQishiInfo.action',params);
  },
  /**
   * 订单查询数据展示
   */
    ds_orderQuery(params){
      return fetch.fetch('/wuliu-web-user/wuliu/order/getOrderInfo.action',params);
  },
  /**
   * 仓库业绩查询
   */
    ds_stoPer(params){
      return fetch.fetch('/wuliu-web-user/order/zb/getZhcAchievement.action',params);
  },
  /**
   * 仓库业绩查询查看
   */
  ds_stoPer_check(params){
    return fetch.fetch('/wuliu-web-user/order/zb/getStoreYjDetails.action',params);
  },
  /**
   * 开发人员奖励
   */
  ds_RR(params){
    return fetch.fetch('/wuliu-web-user/order/zb/queryRecommendReward.action',params);
  },
  /**
   * 开发人员奖励查看
   */
  ds_RR_check(params){
    return fetch.fetch('/wuliu-web-user/order/zb/getEmpRewardDetails.action',params);
  }
}
