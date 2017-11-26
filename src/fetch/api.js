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
      return fetch.fetch('/wuliu-web-user/wuliu/audit/veifyToken.action?tag='+new Date().getTime(),params);
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
    }
}

export  default  Object.assign(base,apiMarketingCoupon,apiMarketingPrizeDra,apiMarketingSedKill);
