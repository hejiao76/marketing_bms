import * as fetch from "./fetch"

export default {
/*************方法命名规则：pd_ 前缀 pd_ 前缀 pd_ 前缀   写注释 写注释***************/
  /**
    * 抽奖活动-----新增抽奖活动
    * @param params
    * @returns {*}
  */
  pd_activity_add(params) {
    return fetch.fetch('ottery/add', params);
  },
  /**
   * 抽奖活动----获取活动编辑详情
   * @param params
   * @returns {*}
   */
  pd_activity_toedit(params) {
    return fetch.fetch('lottery/edit', params,"get");
  },
  /**
   * 抽奖活动---保存活动编辑详情
   * @param params
   * @returns {*}
   */
  pd_activity_update(params) {
    return fetch.fetch('lottery/update', params);
  },
  /**
   * 抽奖活动----列表
   * @param params
   * @returns {*}
   */
  pd_activity_list(params) {
    return fetch.fetch('lottery/list', params,"get");
  },
  /**
   * 抽奖活动----删除活动
   * @param params
   * @returns {*}
   */
  pd_activity_delete(params) {
    return fetch.fetch('lottery/del', params);
  },
  /**
   * 抽奖活动----结束活动
   * @param params
   * @returns {*}
   */
  pd_activity_over(params) {
    return fetch.fetch('lottery/over', params);
  },
  /**
   * 抽奖活动----查看活动详情
   * @param params
   * @returns {*}
   */
  pd_activity_info(params) {
    return fetch.fetch('lottery/info', params);
  },
  /**
   * 抽奖活动----中奖记录列表
   * @param params
   * @returns {*}
   */
  pd_activity_info(params) {
    return fetch.fetch('lottery/winning/list', params,"get");
  },
  /**
   * 抽奖活动----中奖记录导出
   * @param params
   * @returns {*}
   */
  pd_activity_export(params) {
    return fetch.fetch('lottery/winning/exp', params,"post");
  },

}
