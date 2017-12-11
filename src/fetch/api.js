import * as fetch from "./fetch"

import  apiMarketingCoupon from './api_marketing_coupon'
import  apiMarketingPrizeDra from './api_marketing_prize_draw'
import  apiMarketingSedKill from './api_marketing_sedkill'

const base = {
    /**
     * 用户登录
     */
    base_login(params) {
      return fetch.fetch('/wuliu-web-user/audit/sys/loginUser.action', params);
    },

    base_checkLogin (params){
      return fetch.fetch('/admin/veifyToken.action?tag='+new Date().getTime(),params);
    },
    /**
     * 用户注册
     */
    base_regist(params) {
      return fetch.fetch('/users/api/userRegist', params)
    },
    /**
     * 退出
     */
    base_loginOut(params) {
      return fetch.fetch('/wuliu-web-user/wuliu/audit/logout.action', params)
    },

    /**
     *  查询省市
     */
    base_sys_location (params){
      return fetch.fetch('/sys/location', params,"get")
    },
    /**
     *  查询全部车系
     */
    base_sys_car_serials (params){
      return fetch.fetch('/sys/car/serials', params,"get")
    },
    /**
     *  查询车系车型
     */
    base_sys_car_list (params){
      return fetch.fetch('/sys/car/list', params,"get")
    },
    /**
     *  查询礼包列表
     */
    base_sys_gift_list (params){
      return fetch.fetch('/sys/gift/list', params,"get")
    },
    /**
     *  通过车系查询礼包列表下拉列表
     */
    base_sys_gift_list_select (params){
      return fetch.fetch('/sys/gift/list2', params,"get")
    },
    /**
     *  查询单个礼包详情
     */
    base_sys_gift_info (params){
      return fetch.fetch('/sys/gift/info', params,"get")
    },


}

export  default  Object.assign(base,apiMarketingCoupon,apiMarketingPrizeDra,apiMarketingSedKill);
