<template>
  <div>
    <el-dialog class="choose-hd" center title="订单详情" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="verify">
        <p style="color: #404C73;">用户信息</p>
      </div>
      <div class="verify-txt">
        <ul>
          <li>用户姓名：{{result.userName}}</li>
          <li>用户手机号：{{result.userPhone}}</li>
        </ul>
      </div>
      <div class="verify margin-top-20">
        <p style="color: #404C73;">订单信息</p>
      </div>
      <div class="verify-txt">
        <ul>
          <li>订单编号：{{result.orderNum}}</li>
          <li >活动名称：{{result.itemName}}</li>
          <li>订单创建时间：{{getMoment(result.createTime)}}</li>
          <li>订单状态：{{Final.seckill_order[result.status]}}</li>
          <li>活动支付金额：{{result.amount}}</li>
          <li v-if="result.verifyCode">核销码：{{result.verifyCode}}</li>
          <li v-if="result.payTime">支付完成时间：{{getMoment(result.payTime)}}</li>
          <li v-if="result.status==3">取消时间：{{getMoment(result.cancelTime)}}</li>
          <li v-if="result.refundTime">退款完成时间：{{getMoment(result.refundTime)}}</li>
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
  import Final from "../../static/baseSetting/Final"
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
    /**
     * 格式化时间
     * @returns {}
     */
    getMoment(val){
      if(val){
        return this.$moment(val).format('YYYY-MM-DD HH:mm:ss');
      }else{
        return "";
      }

    },
    handleClose(){
      this.dialogTableVisible = false
    },
    showDialog (id) {
      this.dialogTableVisible=true;
      Api.sk_activity_order_detail({orderNum:id})
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
