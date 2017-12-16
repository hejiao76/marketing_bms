/**
 * Created by jsb-cpyy on 2017/8/30.
 */
const OBJ ={
  left_menu_data : [
   /*************抽奖活动**************/
    {
      "orderNum": 1,
      "parentId": 0,
      "resourceId": 1,
      "resourceKey": "1",
      "resourceName": "抽奖活动",
      "resourceUrl": "/prizeDraw"
    },
    {
      "orderNum": 101,
      "parentId": 1,
      "resourceId": 101,
      "resourceKey": "101",
      "resourceName": "新增抽奖活动",
      "resourceUrl": "/prizeDraw/edit/new"
    },
    {
      "orderNum": 102,
      "parentId": 1,
      "resourceId": 102,
      "resourceKey": "102",
      "resourceName": "抽奖活动管理",
      "resourceUrl": "/prizeDraw/list"
    },
    {
      "orderNum": 103,
      "parentId": 1,
      "resourceId": 103,
      "resourceKey": "103",
      "resourceName": "中奖记录",
      "resourceUrl": "/prizeDraw/prize_list"
    },

    /*************抵扣券活动**************/
    {
      "orderNum": 2,
      "parentId": 0,
      "resourceId": 2,
      "resourceKey": "2",
      "resourceName": "抵扣券活动",
      "resourceUrl": "/coupon"
    },
    {
      "orderNum":201,
      "parentId": 2,
      "resourceId": 201,
      "resourceKey": "201",
      "resourceName": "添加抵扣券活动",
      "resourceUrl": "/coupon/edit/new"
    },
    {
      "orderNum": 202,
      "parentId": 2,
      "resourceId": 202,
      "resourceKey": "102",
      "resourceName": "抵扣券活动管理",
      "resourceUrl": "/coupon/list"
    },

    /*************抵扣券**************/
    {
      "orderNum": 3,
      "parentId": 0,
      "resourceId": 3,
      "resourceKey": "3",
      "resourceName": "抵扣券",
      "resourceUrl": "/coupon"
    },
    {
      "orderNum": 301,
      "parentId": 3,
      "resourceId": 301,
      "resourceKey": "301",
      "resourceName": "添加抵扣券",
      "resourceUrl": "/coupon/ticket_edit/new"
    },
    {
      "orderNum": 302,
      "parentId": 3,
      "resourceId": 302,
      "resourceKey": "302",
      "resourceName": "抵扣券管理",
      "resourceUrl": "/coupon/ticket_list"
    },
    {
      "orderNum": 303,
      "parentId": 3,
      "resourceId": 303,
      "resourceKey": "303",
      "resourceName": "抵扣券消费记录",
      "resourceUrl": "/coupon/record_list"
    },


    /*************秒杀活动**************/
    {
      "orderNum": 4,
      "parentId": 0,
      "resourceId": 4,
      "resourceKey": "4",
      "resourceName": "秒杀活动",
      "resourceUrl": "/sedkill"
    },
    {
      "orderNum": 401,
      "parentId": 4,
      "resourceId": 401,
      "resourceKey": "401",
      "resourceName": "新建活动",
      "resourceUrl": "/sedkill/edit/new"
    },
    {
      "orderNum": 402,
      "parentId":4,
      "resourceId": 402,
      "resourceKey": "402",
      "resourceName": "活动管理",
      "resourceUrl": "/sedkill/list"
    },
    {
      "orderNum": 403,
      "parentId": 4,
      "resourceId": 403,
      "resourceKey": "403",
      "resourceName": "订单管理",
      "resourceUrl": "/sedkill/order_list"
    },
    /*************秒杀券**************/
    {
      "orderNum":5,
      "parentId": 0,
      "resourceId": 5,
      "resourceKey": "5",
      "resourceName": "秒杀券",
      "resourceUrl": "/sedkill"
    },
    {
      "orderNum": 501,
      "parentId": 5,
      "resourceId": 501,
      "resourceKey": "501",
      "resourceName": "新建秒杀券",
      "resourceUrl": "/sedkill/ticket_edit/new"
    },
    {
      "orderNum": 502,
      "parentId": 5,
      "resourceId": 502,
      "resourceKey": "502",
      "resourceName": "秒杀券管理",
      "resourceUrl": "/sedkill/ticket_list"
    }
  ],
  /**
   * 秒杀活动选择秒杀券列表数据
   */
  sedKill_newTicket_data : [{
    ticketId:1,
    name:'500元迈腾购车秒杀券1',
    starTime:'2017-11',
    endTime:'2017-11',
    creatTime:'2017-11 10:52'
  },
    {
      ticketId:2,
      name:'500元迈腾购车秒杀券2',
      starTime:'2017-11',
      endTime:'2017-11',
      creatTime:'2017-11 10:52'
    },
    {
      ticketId:3,
      name:'500元迈腾购车秒杀券3',
      starTime:'2017-11',
      endTime:'2017-11',
      creatTime:'2017-11 10:52'
    },
    {
      ticketId:4,
      name:'500元迈腾购车秒杀券4',
      starTime:'2017-11',
      endTime:'2017-11',
      creatTime:'2017-11 10:52'
    },
    {
      ticketId:5,
      name:'500元迈腾购车秒杀券5',
      starTime:'2017-11',
      endTime:'2017-11',
      creatTime:'2017-11 10:52'
    },
    {
      ticketId:6,
      name:'500元迈腾购车秒杀券6',
      starTime:'2017-11',
      endTime:'2017-11',
      creatTime:'2017-11 10:52'
    }],
  /**
   * 秒杀活动绑定秒杀券列表数据
   */
  sedKill_checked_ticket_data : {
    status:200,
    result:{
      activityName:"秒杀活动测试数据1",
      id:1,
      activityStartDate:"2017-11-30",
      activityEndDate:"2017-12-6",
      shareImg:"http://www.baidu.com",
      checked_ticket:[{
        ticketId:1,
        ticketName:'秒杀活动测试数据1',
        isvalid:'有效',
        validityStartDate:"2017-12-28",
        validityEndDate:"2017-12-28",
        createDate:"2017-12-29 10:12:11",
        applyCar:'迈腾',
        sedkillMoney:'2000',
        sedKillStartDate:'2017-12-28 12:00:00',
        ticketCount:'10',
        maxPayCount:'20',
        tmp:{},
        signUpStartTime:'2017-12-27 08:00:00',
        signUpEndTime:'2017-12-27 10:00:00',
      }
        ,{
          ticketId:2,
          ticketName:'秒杀活动测试数据2',
          isvalid:'有效',
          validityStartDate:"2017-12-29",
          validityEndDate:"2017-12-30",
          createDate:"2017-12-30",
          applyCar:'迈腾',
          sedkillMoney:'1',
          sedKillStartDate:'2017-12-30 12:00:00',
          ticketCount:'100',
          maxPayCount:'200',
          signUpStartTime:'2017-12-27 01:00:00',
          signUpEndTime:'2017-12-27 02:00:00',
          tmp:{}
        }
      ]
    }
  },
  sedKill_list_data: [{
    activityName:"测试活动1",
    activityArea:"北京、上海、广州",
    activityStartDate:"2017-11-28",
    activityEndDate:"2017-12-28",
    createDate:"2017-11-28",
    activity_getNum:200,
    activity_pv:10000,
    activity_url:"http://www.baidu.com"
  },{
    activityName:"测试活动2",
    activityArea:"北京、上海、广州",
    activityStartDate:"2017-11-28",
    activityEndDate:"2017-12-28",
    createDate:"2017-11-28",
    activity_getNum:220,
    activity_pv:20000,
    activity_url:"http://www.baidu.com"
  },{
    activityName:"测试活动3",
    activityArea:"北京、上海、广州",
    activityStartDate:"2017-11-28",
    activityEndDate:"2017-12-28",
    createDate:"2017-11-28",
    activity_getNum:240,
    activity_pv:19000,
    activity_url:"http://www.baidu.com"
  }],
  sedKill_ticket_list_data: [{
    ticketName:'5000元购车优惠券',
    isvalid:'有效',
    activityEndDate:"2017-12-28",
    applyCar:'迈腾',
    sedkillMoney:'2000',

  },{
    ticketName:'5000元购车优惠券',
    isvalid:'有效',
    activityEndDate:"2017-12-28",
    applyCar:'迈腾',
    sedkillMoney:'2000',

  },{
    ticketName:'5000元购车优惠券',
    isvalid:'有效',
    activityEndDate:"2017-12-28",
    applyCar:'迈腾',
    sedkillMoney:'2000',

  },{
    ticketName:'5000元购车优惠券',
    isvalid:'有效',
    activityEndDate:"2017-12-28",
    applyCar:'迈腾',
    sedkillMoney:'2000',

  },{
    ticketName:'5000元购车优惠券',
    isvalid:'有效',
    activityEndDate:"2017-12-28",
    applyCar:'迈腾',
    sedkillMoney:'2000',

  }],
  orderList:{
    allorder:[ //全部订单
      {
        orderNum:'001',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'全部订单列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付',
        orderStatus:'unpaid',
        orderStatus:'cancel',
        orderStatus:'refundIng',
        orderStatus:'refundEnd',

      },
      {
        orderNum:'001',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'全部订单列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付',
        orderStatus:'unpaid',
        orderStatus:'cancel',
        orderStatus:'refundIng',
        orderStatus:'refundEnd',

      },
      {
        orderNum:'001',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'全部订单列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付',
        orderStatus:'unpaid',
        orderStatus:'cancel',
        orderStatus:'refundIng',
        orderStatus:'refundEnd',

      },

    ],


  },
  ////抽奖列表
  prize_list:[
    {
      isStart:1,
      createDate:'2015-10-15',
      buyNum:111,
      allBuyNum:1000,
      startDate:'2013-11-15',
      endDate:'2013-10-21',
      activityStatus:'进行中',
      activity_pv:221,
      activityName:'购车好礼',
    },
    {
      isStart:1,
      createDate:'2015-10-14',
      buyNum:112,
      allBuyNum:1000,
      startDate:'2013-11-14',
      endDate:'2013-10-21',
      activityStatus:'进行中',
      activity_pv:2222,
      activityName:'购车好礼',

    },
    {
      isStart:2,
      createDate:'2015-10-13',
      buyNum:113,
      allBuyNum:223,
      startDate:'2013-11-13',
      endDate:'2013-11-21',
      activityStatus:'未开启',
      activity_pv:19000,
      activityName:'购车好礼',
    },
    {
      isStart:2,
      createDate:'2015-10-12',
      buyNum:114,
      allBuyNum:1000,
      startDate:'2013-11-12',
      endDate:'2013-10-21',
      activityStatus:'未开启',
      activity_pv:224,
      activityName:'购车好礼',
    },
    {
      isStart:3,
      createDate:'2015-10-11',
      buyNum:115,
      activity_pv:225,
      allBuyNum:1000,
      startDate:'2013-11-11',
      endDate:'2013-10-21',
      activityStatus:'已结束',
      activityName:'购车好礼',
    }
  ]
}
export  default OBJ;
