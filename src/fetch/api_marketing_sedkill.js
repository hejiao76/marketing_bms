import * as fetch from "./fetch"

export default {
    /*************方法命名规则：sk_ 前缀 sk_ 前缀 sk_ 前缀   写注释 写注释***************/
      /**
        * 秒杀活动列表接口
        * @param params
        * @returns {*}
      */
      sk_activity_list(params) {
        return fetch.fetch('wuliu-web-user/emp/trade/tradeAuditList.action', params);
      }
}
