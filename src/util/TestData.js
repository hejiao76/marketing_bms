/**
 * Created by jsb-cpyy on 2017/8/30.
 */
const OBJ ={
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
        ticketName:'5000元购车优惠券',
        isvalid:'有效',
        activityStartDate:"2017-12-28",
        activityEndDate:"2017-12-28",
        createDate:"2017-12-29 10:12:11",
        applyCar:'迈腾',
        sedkillMoney:'2000',
        sedKillStartDate:'2017-12-29 12:00:00',
        ticketCount:'100',
        maxPayCount:'10',
        signUpStartTime:'2017-12-10',
        singUpStartTime:'2017-12-28',
      },{
        ticketId:2,
        ticketName:'5000元购车优惠券',
        isvalid:'有效',
        activityStartDate:"2017-12-29",
        activityEndDate:"2017-12-29",
        createDate:"2017-12-30",
        applyCar:'迈腾',
        sedkillMoney:'2000',
        sedKillStartDate:'2017-12-30 12:00:00',
        ticketCount:'100',
        maxPayCount:'10',
        signUpStartTime:'2017-12-10',
        singUpStartTime:'2017-12-29',
      }]
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

      },
      {
        orderNum:'002',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'全部订单列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付',

      },
      {
        orderNum:'003',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'全部订单列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付',

      }
    ],
    // 待支付
    unpaid:[
      {
        orderNum:'001',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'待支付列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付'

      }
    ],
    //取消
    cancel:[
      {
        orderNum:'001',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'取消列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付'

      }
    ],
    //退款中
    refundIng:[
      {
        orderNum:'001',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'退款中列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付'

      }
    ],
    // 退款完成
    refundEnd:[
      {
        orderNum:'001',
        userName:'合脚',
        phoneNum:'1234567',
        orderName:'退款完成列表',
        createTime:'2013-10-10',
        sedkillMoney:'1.00',
        sedkillStatus:'已支付'

      }
    ]

  },
}
export  default OBJ;
