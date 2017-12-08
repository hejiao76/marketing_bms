<template>
  <div>
    <el-dialog class="choose-hd" center title="订单详情" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="verify">
        <p>用户信息</p>
      </div>
      <div class="verify-txt">
        <ul>
          <li>用户姓名：{{result.userName}}</li>
          <li>用户手机号：{{result.userPhone}}</li>
        </ul>
      </div>
      <div class="verify margin-top-20">
        <p>订单信息</p>
      </div>
      <div class="verify-txt">
        <ul>
          <li>订单编号：{{result.orderNum}}</li>
          <li >活动名称：{{result.itemName}}</li>
          <li>订单创建时间：{{result.createTime}}</li>
          <li>订单状态：{{Final.seckill_order[result.status]}}</li>
          <li>活动支付金额：{{result.amount}}</li>
          <li>核销码：{{result.verifyCode}}</li>
          <li>支付完成时间：{{result.payTime}}</li>
          <li>取消时间：{{result.cancelTime}}</li>
          <li>退款完成时间：{{result.refundTime}}</li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Api from "./../fetch/api"
  import Final from "./../util/Final"
export default {
  data () {
    return {
      dialogTableVisible : false,
      result:'',
      Final: Final,
    }
  },
  created () {

  },
  components: {

  },
  methods:{
    handleClose(){
      this.dialogTableVisible = false
    },
    showDialog (id) {
      this.dialogTableVisible=true;
      Api.sk_activity_order_list({orderNum:id})
        .then(res => {
          if (res.status) {
            this.result = res.result;
            this.dialogTableVisible=true;
          }else {

          }
        }).catch(err => {
        this.$message({
          showClose: true,
          message: '数据请求失败！',
          type: 'error'
        });
      });

    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
