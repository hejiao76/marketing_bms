/**
 * Created by jsb-cpyy on 2017/11/30.
 */
const proxy='/action' //代理请求目标声明
const OBJ ={
  PROXY:proxy, //代理请求目标
  TICKET_NAME:"ticket",  //登录Ticket字段配置  换COOKIE
  LOGIN_PAGE_URL:"http://www.baidu.com", //登录页面地址配置
  IMG_PATH:"http://img.familyku.com",  //图片访问地址配置
  UPLOAD_PATH:proxy+"/sys/upload",  //图片上传配置
  SYS_TYPE:localStorage.getItem("ownerType"),//系统类型

  DEFAULT_IMG:{ //默认图片配置
    prizeDraw:{ //抽奖
      default_title:"http://img.familyku.com/data/att/defaultImg/prize_draw_title.png", //标题图片
      default_bg:"http://img.familyku.com/data/att/defaultImg/prize_draw_bg.png", //背景图片
      default_share:"http://img.familyku.com/data/att/defaultImg/prize_draw_share.png"  //分享图片
    },
  },


  seckill_order:{
    0:"全部", 1:"待支付",2:"已支付",3:"已取消",4:"退款中",5:"已退款"
  },
  COUPON_TYPE:{
    1:"抵扣车款", 2:"其他权益" ,3:"抵扣车款,其他权益"
  },
  COUPON_STATUS:{
    1:"待上线" ,2:"进行中" , 3:"已结束"
  },
  PRIZE_STATUS:{
    1:"未开启",2:"进行中",3:"已结束"
  },
  seckill_ticket:{
   1:"有效",2:"无效"
  },
  PATH_MAPPING : ["startWorkDetail","companyDetail","personalDetail","personalDetailInfo","driverDetail","driverDetailInfo","truckDriverDetail","truckDriverDetailInfo","truckDetail","truckDetailInfo"],  //左侧菜单适配路由名称
  PATH_MAPPING_OBJ : {//左侧菜单适配路由映射地址
    "startWorkDetail" : {name :"startWorkDetail",defaultPathMap:"/startwork/startwork_1"},
    "companyDetail" : {name :"companyDetail",defaultPathMap:"/lgtcheck/companycheck/1"},
    "personalDetail" : {name :"personalDetail",defaultPathMap:"/lgtcheck/personalcheck/0"},
    "personalDetailInfo" : {name :"personalDetailInfo",defaultPathMap:"/lgtcheck/personalcheck/0"},
    "driverDetail" : {name :"driverDetail",defaultPathMap:"/lgtcheck/drivercheck/0"},
    "driverDetailInfo" : {name :"driverDetailInfo",defaultPathMap:"/lgtcheck/drivercheck/0"},
    "truckDriverDetail" : {name :"truckDriverDetail",defaultPathMap:"/lgtcheck/truckDrivercheck/0"},
  }

}
export  default OBJ;
