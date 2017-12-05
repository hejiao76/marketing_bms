<template>
  <div>
    <el-dialog class="choose-hd" center title="订单详情" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="verify-txt">
        <ul>
          <li>活动名称：幸运大转盘转转转转转</li>
          <li>活动状态：进行中</li>
          <li>活动时间：2017-11-01 00:00:00至2017-11-01 00:00:00</li>
          <li>参与人数：10000人</li>
        </ul>
      </div>
      <div class="verify margin-top-20">
        <p>奖品详情</p>
      </div>
      <div class="verify-txt">
        <ul>
          <li>
            <div class="verify-txt-left">
              一等奖：
            </div>
            <div class="verify-txt-right">
              <p class="verify-txt-title">转盘抽奖尊享礼包（1/10）</p>
              <p>(礼包礼品：航嘉导航仪1，车载音箱1，购车抵扣券1)</p>
            </div>
          </li>
          <li>
            <div class="verify-txt-left">
              二等奖：
            </div>
            <div class="verify-txt-right">
              <p class="verify-txt-title">转盘抽奖乐享礼包（1/20）</p>
              <p>(礼包礼品：航嘉导航仪1，车载音箱1，购车抵扣券1)</p>
            </div>
          </li>
          <li>
            <div class="verify-txt-left">
              三等奖：
            </div>
            <div class="verify-txt-right">
              <p class="verify-txt-title">转盘抽奖尊享礼包（1/10）</p>
              <p>(礼包礼品：航嘉导航仪1，车载音箱1，购车抵扣券1)</p>
            </div>
          </li>
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
    }
  },
  created () {

  },
  methods:{
    handleClose(){
      this.dialogTableVisible = false
    },
    showDialog (name) {
      this.dialogTableVisible = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
