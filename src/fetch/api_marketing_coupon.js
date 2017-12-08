import * as fetch from "./fetch"

export default {
  /*************方法命名规则：cp_ 前缀 cp_ 前缀 cp_ 前缀   写注释 写注释***************/
  /**
    * 验证抵扣券名称是否存在
    * @param params
    * @returns {*}
  */
  cp_activity_coupon_nameRepetition(params) {
    return fetch.fetch('coupon/couponNameRepetition', params,"post","json");
  },
  /**
   * 新增编辑抵扣券
   * @param params
   * @returns {*}
   */
  cp_activity_coupon_save(params) {
    return fetch.fetch('coupon/saveCoupon', params,"post","json" );
  },
  /**
   *查询抵扣券详情
   * @param params
   * @returns {*}
   */
  cp_activity_coupon_info(params) {
    return fetch.fetch('coupon/couponInfo', params,"post","json");
  },
  /**
   *查询抵扣券列表
   * @param params
   * @returns {*}
   */
  cp_activity_coupon_list(params) {
    return fetch.fetch('coupon/couponList', params,"post","json");
  },
  /**
   * 禁用抵扣券
   * @param params
   * @returns {*}
   */
  cp_activity_coupon_forbidden(params) {
    return fetch.fetch('coupon/forbidden', params,"post","json");
  },
  /**
   * 抵扣券消费记录列表
   * @param params
   * @returns {*}
   */
  cp_activity_coupon_use_list(params) {
    return fetch.fetch('coupon/couponUserList', params,"post","json");
  },
  /**
   * 校验抵扣券活动名称是否存在
   * @param params
   * @returns {*}
   */
  cp_activity_nameRepetition(params) {
    return fetch.fetch('coupon/couponActivityNameRepetition', params ,"post","json");
  },
  /**
   * 抵扣券活动---新增----筛选可用抵扣券
   * @param params
   * @returns {*}
   */
  cp_activity_filter_coupon(params) {
    return fetch.fetch('coupon/couponList2', params ,"post","json");
  },
  /**
   * 新增抵扣券活动
   * @param params
   * @returns {*}
   */
  cp_activity_save(params) {
    return fetch.fetch('coupon/saveCouponActivity', params ,"post","json");
  },
  /**
   * 抵扣券活动列表
   * @param params
   * @returns {*}
   */
  cp_activity_list(params) {
    return fetch.fetch('coupon/couponActivityList', params ,"post","json");
  },
  /**
   * 抵扣券活动停止
   * @param params
   * @returns {*}
   */
  cp_activity_stop(params) {
    return fetch.fetch('coupon/stopActivity', params ,"post","json");
  },
  /**
   * 抵扣券活动详情
   * @param params
   * @returns {*}
   */
  cp_activity_detail(params) {
    return fetch.fetch('coupon/couponActivityInfo', params,"post","json");
  },
  /**
   * 抵扣券活动礼包查询
   * @param params
   * @returns {*}
   */
  cp_activity_gift_list(params) {
    return fetch.fetch('coupon/giftList', params,"post","json");
  },
  /**
   * 抵扣券活动查询车系
   * @param params
   * @returns {*}
   */
  cp_activity_car_series_list(params) {
    return fetch.fetch('coupon/carSeriesList', params,"post","json");
  },
}
