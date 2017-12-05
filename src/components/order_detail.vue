<template>
  <div>
    <el-dialog class="choose-hd" center title="订单详情" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="verify">
        <p>用户信息</p>
      </div>
      <div class="verify-txt">
        <ul>
          <li style="color: red">用户姓名：{{activeName}}</li>
          <li>用户手机号：18614086655</li>
        </ul>
      </div>
      <div class="verify margin-top-20">
        <p>订单信息</p>
      </div>
      <div class="verify-txt">
        <ul>
          <li>订单编号：M000000000001</li>
          <li >活动名称：</li>
          <li>订单创建时间：2017-11-11 15:00:00</li>
          <li>订单状态：已支付</li>
          <li>活动支付金额：1.11元</li>
          <li>核销码：HGH156485</li>
          <li>支付完成时间：2018-05-18 14:00</li>
          <li>取消时间：2018-05-18 15:00</li>
          <li>退款完成时间：2018-05-18 16:00</li>
          <li>核销码：HGH156485</li>
          <li>支付完成时间：2018-05-18 14:00</li>
          <li>取消时间：2018-05-18 15:00</li>
          <li>退款完成时间：2018-05-18 16:00</li>

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
      activeName : '',
    }
  },
  created () {

  },
  methods:{
    handleClose(){
      this.dialogTableVisible = false
    },
    showDialog (name) {
      this.dialogTableVisible=true;
      this.activeName = name
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
