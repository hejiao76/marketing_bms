import * as fetch from "./fetch"

import  apiDataSearch from './api_data_search'
import  apiLgtCheck from './api_lgt_check'
import  apiLgtsSetting from './api_lgts_setting'
import  apiLogSearch from './api_log_search'
import  apiSetting from './api_setting'
import  apiStartWork from './api_start_work'
import  apiApproval from './api_approval'

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

export  default  Object.assign(base,apiDataSearch,apiLgtCheck,apiLgtsSetting,apiLogSearch,apiSetting,apiStartWork,apiApproval);
