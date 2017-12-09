<template>
  <div>
    <el-dialog class="choose-hd" center title="订单详情" :visible.sync="dialogTableVisible" :before-close="handleClose">
      <div class="verify-txt">
        <ul>
          <li>活动名称：{{details.name}}</li>
          <li>活动状态：{{details.status}}</li>
          <li>活动时间：{{details.beginTime}}&nbsp;至&nbsp;{{details.endTime}}</li>
          <li>参与人数：{{details.joinSize}}人</li>
        </ul>
      </div>
      <div class="verify margin-top-20">
        <p>奖品详情</p>
      </div>
      <div class="verify-txt">
        <ul>
          <li v-for="item in details.prizeList">
            <div class="verify-txt-left">
              {{item.level}}：
            </div>
            <div class="verify-txt-right">
              <p class="verify-txt-title">{{item.giftGroupName}}（{{item.prizeCount}}/{{item.surplusQuantity}}）</p>
              <p>{{item.details}}</p>
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
      details:'',
    }
  },
  created () {

  },
  methods:{
    handleClose(){
      this.dialogTableVisible = false
    },
    showDialog (code) {
      Api.pd_activity_info({activityCode:code})
        .then(res => {
          if (res.status) {
              this.details = res.result;
              this.dialogTableVisible = true;
          }else {

          }
        }).catch(err => {
        this.$message({
          showClose: true,
          message: '数据请求失败！',
          type: 'error'
        });
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
