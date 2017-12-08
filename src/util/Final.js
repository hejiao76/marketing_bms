/**
 * Created by jsb-cpyy on 2017/8/30.
 */
const OBJ ={
  seckill_order:{
    0:"全部", 1:"待支付",2:"已支付",3:"已取消",4:"退款中",5:"已退款"
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
