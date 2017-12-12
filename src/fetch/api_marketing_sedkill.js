import * as fetch from "./fetch"

export default {
    /*************方法命名规则：sk_ 前缀 sk_ 前缀 sk_ 前缀   写注释 写注释***************/
      // /**
      //   * 秒杀活动列表接口
      //   * @param params
      //   * @returns {*}
      // */
      // sk_activity_list(params) {
      //   return fetch.fetch('wuliu-web-user/emp/trade/tradeAuditList.action', params);
      // },
  /**
   * 秒杀券列表接口
   * @param params
   * @returns {*}
   */
  sk_activity_ticket_list(params) {
    return fetch.fetch('seckill/getCouponList', params,'get');
  },
  /**
   * 新增秒杀券
   * @param params
   * @returns {*}
   */
  sk_activity_ticket_add(params) {
    return fetch.fetch('seckill/addCoupon', params);
  },
  /**
   * 编辑秒杀券
   * @param params
   * @returns {*}
   */
  sk_activity_ticket_update(params) {
    return fetch.fetch('seckill/updateCoupon', params);
  },
  /**
   * 查询秒杀券详情
   * @param params
   * @returns {*}
   */
  sk_activity_ticket_detail(params) {
    return fetch.fetch('seckill/getCoupon', params);
  },
  /**
   * 设置秒杀券是否有效
   * @param params
   * @returns {*}
   */
  sk_activity_ticket_update_status(params) {
    return fetch.fetch('seckill/updateCouponStatus', params);
  },
  /**
   * 获取秒杀活动列表
   * @param params
   * @returns {*}
   */
  sk_activity_list(params) {
    return fetch.fetch('seckill/getActivityList', params,'get');
  },
  /**
   * 秒杀活动新增
   * @param params
   * @returns {*}
   */
  sk_activity_add(params) {
    return fetch.fetch('seckill/addActivity', params);
  },
  /**
   * 秒杀活动新增
   * @param params
   * @returns {*}
   */
  sk_activity_update(params) {
    return fetch.fetch('seckill/updateActivity', params);
  },
  /**
   * 秒杀活动详情
   * @param params
   * @returns {*}
   */
  sk_activity_detail(params) {
    return fetch.fetch('seckill/getActivity', params);
  },
  /**
   * 秒杀活动上下架
   * @param params
   * @returns {*}
   */
  sk_activity_update_status(params) {
    return fetch.fetch('seckill/updateActivityStatus', params);
  },
  /**
   * 秒杀活动订单列表
   * @param params
   * @returns {*}
   */
  sk_activity_order_list(params) {
    return fetch.fetch('seckill/getOrderList', params,"get");
  },
  /**
   * 秒杀活动订单详情
   * @param params
   * @returns {*}
   */
  sk_activity_order_detail(params) {
    return fetch.fetch('seckill/getOrderInfo', params,"get");
  },
  /**
   * 秒杀活动中奖用户
   * @param params
   * @returns {*}
   */
  sk_activity_winning_list(params) {
    return fetch.fetch('seckill/getWinningList', params,"get");
  },

}
