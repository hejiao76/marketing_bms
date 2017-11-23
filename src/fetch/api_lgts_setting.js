import * as fetch from "./fetch"

const base = {
  /**
   * 快递合作商
   */
  base_express(params) {
    return fetch.fetch('/wuliu-web-user/wuliu/company/companyInfoList.action', params)
  },
  /**
   * 获取合作商配置信息
   */
  base_express_getInfo(params) {
    return fetch.fetch('/wuliu-web-user/wuliu/company/getCompanyConfigureInfo.action', params)
  },
  /**
   * 所属企业模糊查询
   */
  base_express_findExpressList(params) {
    return fetch.fetch('/wuliu-web-user/wuliu/company/findExpreeList.action', params)
  },
  /**
   * 省市区
   */
  base_express_province(params) {
    return fetch.fetch('/wuliu-web-user/place/getPlaceList.action', params, 'get')
  },
  /**
   * 下载标准格式
   */
  base_express_download() {
    return window.open('action/wuliu-web-user/wuliu/company/download.action')
  },
  /**
   * 保存合作商配置信息
   */
  base_express_saveInfo(params) {
    return fetch.fetch('/wuliu-web-user/wuliu/company/addCompanyConfigureInfo.action', params)
  },
  /**
   * 同城众包
   */
  base_city(params) {
    return fetch.fetch('/wuliu-web-user/wuliu/tczb/getCompanyList.action', params)
  },
  /**
   * 获取同城众包与合作商配置信息
   */
  base_city_getInfo(params) {
    return fetch.fetch('/wuliu-web-user/wuliu/tczb/getCompanStoreById.action', params)
  },
  /**
   * 保存同城众包与合作商配置信息
   */
  base_city_saveInfo(params) {
    return fetch.fetch('/wuliu-web-user/wuliu/tczb/addCompanStore.action', params)
  },
  /**
   * 专线公司
   */
  base_line(params) {
    return fetch.fetch('/wuliu-web-user/audit/zxgs/list.action', params, 'get')
  },
  /**
   * 查看专线公司明细
   */
  base_line_getInfo(params) {
    return fetch.fetch('/wuliu-web-user/audit/zxgs/detail.action', params, 'get')
  },
  /**
   * 更新专线公司明细
   */
  base_line_saveInfo(params) {
    return fetch.fetch('/wuliu-web-user/audit/zxgs/updateConfig.action', params)
  },
  /**
   * 获取综合仓绑定的司机列表
   */
  base_driver(params) {
    return fetch.fetch('/wuliu-web-user/audit/driver/getDriverList.action', params, 'get')
  },
  /**
   * 查找仓库编号
   */
  base_store_code(params) {
    return fetch.fetch('/wuliu-web-user/wuliu/tczb/getStoreByCode.action', params)
  },
  /**
   * 综合仓司机绑定
   */
  base_driver_bind(params) {
    return fetch.fetch('/wuliu-web-user/audit/driver/bind.action', params)
  },
  /**
   * 综合仓司机删除
   */
  base_driver_del(params) {
    return fetch.fetch('/wuliu-web-user/audit/driver/del.action', params)
  },
  /**
   * 综合仓司机修改
   */
  base_driver_edit(params) {
    return fetch.fetch('/wuliu-web-user/audit/driver/edit.action', params)
  }
}
// export default {
//   /*************方法命名规则：ls_ 前缀 ls_ 前缀 ls_ 前缀   写注释 写注释***************/
//   /**
//    * 测试方法
//    */
//   ls_test(params) {
//     return fetch.fetch('/express', params);
//   }
// }
export  default  Object.assign(base);
