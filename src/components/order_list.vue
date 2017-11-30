<template>
  <div class="tab-content">
    <div class="tab-pane active">
      <div class="margin-bottom-10">
        共找到以下
        <span>10</span>条消息
      </div>
      <div style="border: 1px solid #EFF0F5;">
        <!-- 订单表格 beigin -->
        <table class="table-order" cellspacing="0" aria-describedby="example_info">
          <thead>
          <tr>
            <th class="col-md-2"><input style="float:left;margin: 14px 8px 0px 5px" type="checkbox"><span style="float: left;">全选</span>活动名称</th>
            <th class="col-md-2">订单状态</th>
            <th class="col-md-2">客户姓名</th>
            <th class="col-md-2">客户手机号</th>
            <th class="col-md-2">秒杀支付金额</th>
            <th class="col-md-2">操作</th>
          </tr>
          </thead>
          <tbody  v-for="item in message">
          <tr class="tr-th">
            <td colspan="10">
              <span class="inp-check"><input type="checkbox"/></span>
              <span class="number">订单编号:{{item.orderNum}}</span>
              <span class="datatime">订单创建时间：{{item.createTime}}</span>
            </td>
          </tr>
          <tr class="tr-td">
            <td>
              <div class="car-list">
                <div class="car-list-txt">
                  <a tabindex="_blank">{{item.orderName}}</a>
                </div>
              </div>
              <div class="clear"></div>
            </td>
            <td>{{item.sedkillStatus}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.phoneNum}}</td>
            <td class="price">1{{item.sedkillMoney}}</td>
            <td>
              <a class="more-txt "  @click="chekcOder(item.orderName)" href="javascript:;">查看详情</a>
            </td>
          </tr>

          </tbody>
        </table>
        <!-- 订单表格 end -->
      </div>
    </div>
  </div>
</template>

<script>
  import Api from "./../fetch/api"
  import Final from "./../util/Final"
export default {
  name: 'header',
  props: ['message','callback'],
  data () {
    return {
      currentPage: 1,
      totalRow: 100,
    }
  },
  created () {

  },
  methods:{
    /**
     * 查看订单详情
     */
    chekcOder(name){
      this.callback(name)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border:none;
  }
  .el-tabs__item{
    background: #EFF0F6;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item{
    float: left;
    border-left:none;
    margin-right:10px;
    border-bottom: 1px solid #dfe4ed;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
    border-left: 1px solid #dfe4ed;
    border-right: 1px solid #dfe4ed;
    border-top: 3px solid #527EFE;
    background: #fff;
  }
</style>
