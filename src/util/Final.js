/**
 * Created by jsb-cpyy on 2017/8/30.
 */
const OBJ ={
  IMGURL:"http://wuliu-web.zhidianlife.com/",
  // IMGURL:"https://audit.zhidianlife.com/",
  START_WORK:1, //开始工作
  LGT_CHECK:2, //物流审核
  DATA_SEARCH:3, //数据查询
  LOG_SEARCH:4, //日志查询
  LGTS_SETTING:5, //物流商配置
  SETTING:6, //设置
  APPROVAL:7, //审批
  CHECK_TYPES : [{  //物流审核----企业审核类型
    value:1,
    label:"同城众包"
  },{
    value:2,
    label:"同城快递"
  },{
    value:3,
    label:"专线公司"
  },{
    value:4,
    label:"其他三方物流"
  },{
    value:5,
    label:"合作快递"
  }],
  //发货方式
  SEND_TYPE:{
    1:"整车",
    2:"零担"
  },
  //物流单状态
  ORDER_STATUS:{
    1:"已取消",
    2:"未接单",
    3:"抢单中",
    4:"待收货",
    5:"已完成",
    6:"待确认",
    7:"未派车"
  },
  //车型
  CAR_TYPE:{
    1:"厢式车",
    2:"平板车",
    3:"高低板车",
    4:"高栏车",
    5:"中拦车",
    6:"低栏车",
    7:"罐式车",
    8:"冷藏车",
    9:"保温车",
    10:"危险品车",
    11:"铁笼车",
    12:"集装箱",
    13:"自卸货车",
    14:"其他车型"
  },
  //车长
  CAR_LENGTH:{
    4.2:4.2,
    4.8:4.8,
    5.2:5.2,
    5.8:5.8,
    6.2:6.2,
    6.5:6.5,
    6.8:6.8,
    7.2:7.2,
    8:8,
    9.6:9.6,
    12:12,
    13:13,
    13.5:13.5,
    15:15,
    16.5:16.5,
    17.5:17.5,
    18.5:18.5,
    20:20,
    22:22,
    24:24
  },
  CAR_LENGTH_ARRAY:[4.2,4.8,5.2,5.8,6.2,6.5,6.8,7.2,8,9.6,12,13,13.5,15,16.5,17.5,18.5,20,22,24],
  //货物单位
  GOODS_UNIT:{
    "吨":"吨",
    "件":"件",
    "车":"车",
    "个":"个",
    "台":"台",
    "箱":"箱"
  },
  //货物类型
  GOODS_TYPE:{
    1:"设备",
    2:"矿产",
    3:"建材",
    4:"食品",
    5:"蔬菜",
    6:"生鲜",
    7:"药品",
    8:"化工",
    9:"木材",
    10:"家畜",
    11:"纺织品",
    12:"日用品",
    13:"电子电器",
    14:"农副产品",
    15:"其他类型"
  },
  //账期accountPeriod
  ACCOUNT_PERIOD: {
    1: '半个月',
    2: '一个月'
  },
  //承运公司状态
  COMPANY_TYPE: {
    1: '正常',
    2: '关闭'
  },
  //物流单审核状态
  CHECK_TYPE_MAPPING:{
    1:["1","2","3","LQ","CQ"],
    2:["5","6"],
    3:["4","YQ"],
    4:["CX"],
    5:["8"]
  },
  EXPRESS_MODAL:{
    1:"同城众包",
    2:"同城快递",
    3:"专线物流",
    4:"其他三方物流",
    5:"合作快递"
  },
  EXPRESS_MODAL_DATA:{
    1:"同城众包",
    2:"同城快递",
    3:"专线公司",
    4:"合同物流公司",
    5:"货运公司",
    6:"仓储服务"
  },
  //数据审核状态
  EXPRESS_TYPE_DATA:{
    1:"待审核",
    2:"补充审核",
    3:"待复审",
    4:"审核不通过",
    5:"审核通过",
    6:"复审通过",
    8:"证件逾期"
  },
  //骑士状态
  QIAHI_STATUS:{
    1:"审核中",
    2:"审核通过",
    3:"审核未通过"
  },
  //骑士认证类型
  QISHI_TYPE:{
    1:"个人认证",
    2:"驻仓骑手",
    3:"站点员工"
  },
  ORDER_MODULETYPE:{
    KUAIDI:"快递",
    TONGCHENG:"同城",
    ZHENGCHE:"整车",
    LINGDAN:"零担"
  },
  ZHUCANG_AUTHTYPE:{
    1:"普通",
    2:"驻仓"
  },
  //ZHUCANG_QUERYTYPE:{//me
  //	1:"审核中",
  //	2:"通过",
  //	3:"不通过"
  //}
  ZHUCANG_QUERYTYPE:{//蛟哥
    0:[0],
    1:[1],
    2:[2],
    3:[3]
  },
  ZCQISHOU_STATUS:{
    0:"未认证",
    1:"审核中",
    2:"审核通过",
    3:"未通过"
  },
  QUERY_TYPE:{
    1:["qishi"],
    2:["driver"]
  },
  TRADE_TYPE:{
    qishi:"骑士",
    driver:"司机"
  },
  ORDER_MODULETYPE:{
    KUAIDI:"快递",
    TONGCHENG:"同城",
    ZHENGCHE:"整车",
    LINGDAN:"零担"
  },
  /***************菜单路由映射配置********重要***********重要****************/
  MENU_ROUTER_MAPPING: {
    107:{name:"开始工作",path:"/startwork/startwork_1",icon:"h_icon01",sort:1},
    101:{name:"物流审核",path:"/lgtcheck",icon:"h_icon02",sort:2},
    102:{name:"数据查询",path:"/datasearch",icon:"h_icon03",sort:3},
    103:{name:"日志查询",path:"/logsearch",icon:"h_icon04",sort:4},
    104:{name:"物流商配置",path:"/lgtssetting",icon:"h_icon05",sort:5},
    106:{name:"审批",path:"/approval",icon:"h_icon09",sort:6},
    105:{name:"设置",path:"/setting",icon:"h_icon06",sort:7},
    101101:{name:"企业审核",path:"/lgtcheck/companycheck/1",icon:""},
    101102:{name:"个人审核",path:"/lgtcheck/personalcheck/0",icon:""},
    101103:{name:"司机审核",path:"/lgtcheck/drivercheck/0",icon:""},
    101104:{name:"共享平台司机审核",path:"/lgtcheck/truckDrivercheck/0",icon:""},
    101105:{name:"共享平台车辆审核",path:"/lgtcheck/truckcheck/0",icon:""},
    102104:{name:"用户查询",path:"/datasearch/datasearch_CompanyManager",icon:"",sort:102},
    102101:{name:"订单查询",path:"/datasearch/datasearch_OrderQuery",icon:"",sort:101},
    102102:{name:"业绩查询",path:"/datasearch/datasearchStoPer/qishi",icon:"",sort:103},
    102103:{name:"提成查询",path:"/datasearch/datasearchRR/qishi",icon:"",sort:104},
    103101:{name:"众包订单",path:"/logsearch/logsearch_OrderLog",icon:""},
    103102:{name:"众包日志",path:"",icon:""},
    103103:{name:"物流信息预警",path:"",icon:""},
    103104:{name:"骑手设备",path:"",icon:""},
    103105:{name:"骑手操作",path:"",icon:""},
    104101:{name:"合作商行配置",path:"/lgtssetting/express",icon:""},
    104103:{name:"同城众包",path:"/lgtssetting/city",icon:""},
    104102:{name:"专线公司",path:"/lgtssetting/lineCompany",icon:""},
    104104:{name:"司机账号绑定",path:"/lgtssetting/driver",icon:""},
    105101:{name:"个人信息",path:"/setting/setting_personInfor",icon:""},
    105102:{name:"员工管理",path:"/setting/setting_staff_management",icon:""},
    105103:{name:"权限匹配",path:"/setting/setting_permission_match",icon:""},
    106101:{name:"业绩超额审批",path:"/approval/approval_OrderLog",icon:""},
  },

  THIRD_ROUTE_NODE : [
    /******物流审核---企业审核子菜单*******/
    {menucode: "101101101", parentMenuCode: "101101", menuName: "待审核",name:"待审核",path:"/lgtcheck/companycheck/1",icon:""},
    {menucode: "101101102", parentMenuCode: "101101", menuName: "已通过",name:"已通过",path:"/lgtcheck/companycheck/2",icon:""},
    {menucode: "101101103", parentMenuCode: "101101", menuName: "不通过",name:"不通过",path:"/lgtcheck/companycheck/3",icon:""},
    {menucode: "101101104", parentMenuCode: "101101", menuName: "已提交",name:"已提交",path:"/lgtcheck/companycheck/4",icon:""},
    /******物流审核---个人审核子菜单*******/
    {menucode: "101102101", parentMenuCode: "101102", menuName: "全部",name:"全部",path:"/lgtcheck/personalcheck/0",icon:""},
    {menucode: "101102102", parentMenuCode: "101102", menuName: "待审核",name:"待审核",path:"/lgtcheck/personalcheck/1",icon:""},
    {menucode: "101102103", parentMenuCode: "101102", menuName: "已通过",name:"已通过",path:"/lgtcheck/personalcheck/2",icon:""},
    {menucode: "101102104", parentMenuCode: "101102", menuName: "不通过",name:"不通过",path:"/lgtcheck/personalcheck/3",icon:""},
    /******物流审核---司机审核子菜单*******/
    {menucode: "101103101", parentMenuCode: "101103", menuName: "全部",name:"全部",path:"/lgtcheck/drivercheck/0",icon:""},
    {menucode: "101103102", parentMenuCode: "101103", menuName: "待审核",name:"待审核",path:"/lgtcheck/drivercheck/1",icon:""},
    {menucode: "101103103", parentMenuCode: "101103", menuName: "已通过",name:"已通过",path:"/lgtcheck/drivercheck/2",icon:""},
    {menucode: "101103104", parentMenuCode: "101103", menuName: "不通过",name:"不通过",path:"/lgtcheck/drivercheck/3",icon:""},
    /******物流审核---共享平台司机审核子菜单*******/
    {menucode: "101104101", parentMenuCode: "101104", menuName: "全部",name:"全部",path:"/lgtcheck/truckDrivercheck/0",icon:""},
    {menucode: "101104102", parentMenuCode: "101104", menuName: "待审核",name:"待审核",path:"/lgtcheck/truckDrivercheck/1",icon:""},
    {menucode: "101104103", parentMenuCode: "101104", menuName: "已通过",name:"已通过",path:"/lgtcheck/truckDrivercheck/2",icon:""},
    {menucode: "101104104", parentMenuCode: "101104", menuName: "不通过",name:"不通过",path:"/lgtcheck/truckDrivercheck/3",icon:""},
    /******物流审核---共享平台车辆审核子菜单*******/
    {menucode: "101105101", parentMenuCode: "101105", menuName: "全部",name:"全部",path:"/lgtcheck/truckcheck/0",icon:""},
    {menucode: "101105102", parentMenuCode: "101105", menuName: "待审核",name:"待审核",path:"/lgtcheck/truckcheck/1",icon:""},
    {menucode: "101105103", parentMenuCode: "101105", menuName: "已通过",name:"已通过",path:"/lgtcheck/truckcheck/2",icon:""},
    {menucode: "101105104", parentMenuCode: "101105", menuName: "不通过",name:"不通过",path:"/lgtcheck/truckcheck/3",icon:""},
    /******数据查询---用户查询子菜单*******/
    {menucode: "102104101", parentMenuCode: "102104", menuName: "公司管理员查询",name:"公司管理员查询",path:"/datasearch/datasearch_CompanyManager",icon:""},
    {menucode: "102104102", parentMenuCode: "102104", menuName: "骑士信息查询",name:"骑士信息查询",path:"/datasearch/datasearch_QiShiImg",icon:""},
    {menucode: "102104103", parentMenuCode: "102104", menuName: "个人认证骑手",name:"个人认证骑手",path:"/datasearch/datasearchGrrz/qishi",icon:""},
    {menucode: "102104104", parentMenuCode: "102104", menuName: "个人认证司机",name:"个人认证司机",path:"/datasearch/datasearchGrrz/driver",icon:""},
    /******数据查询---订单查询子菜单*******/
    {menucode: "102101101", parentMenuCode: "102101", menuName: "订单查询",name:"订单查询",path:"/datasearch/datasearch_OrderQuery",icon:""},
    /******数据查询---业绩查询子菜单*******/
    {menucode: "102102101", parentMenuCode: "102102", menuName: "骑士业绩查询",name:"骑士业绩查询",path:"/datasearch/datasearchStoPer/qishi",icon:""},
    {menucode: "102102102", parentMenuCode: "102102", menuName: "司机业绩查询",name:"司机业绩查询",path:"/datasearch/datasearchStoPer/driver",icon:""},
    /******数据查询---提成查询子菜单*******/
    {menucode: "102103101", parentMenuCode: "102103", menuName: "骑士开发奖励",name:"骑士开发奖励",path:"/datasearch/datasearchRR/qishi",icon:""},
    {menucode: "102103102", parentMenuCode: "102103", menuName: "司机开发奖励",name:"司机开发奖励",path:"/datasearch/datasearchRR/driver",icon:""},
    // /******日志查询---众包订单子菜单*******/
    // {menucode: "103101101", parentMenuCode: "103101", menuName: "订单日志",name:"订单日志",path:"/logsearch/logsearch_OrderLog",icon:""},
    // /******日志查询---众包订单子菜单*******/
    // {menucode: "103101101", parentMenuCode: "103101", menuName: "订单日志",name:"订单日志",path:"/logsearch/logsearch_OrderLog",icon:""},
    /******物流商配置---快递合作商子菜单*******/
    {menucode: "104101101", parentMenuCode: "104101", menuName: "快递合作商",name:"快递合作商",path:"/lgtssetting/express",icon:""},
    /******审批---业绩超额子菜单*******/
    {menucode: "106101101", parentMenuCode: "106101", menuName: "提现超上限(员工)",name:"提现超上限(员工)",path:"/approval/approval_OrderLog",icon:""},
  ],

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
