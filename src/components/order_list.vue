<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="活动名称"
        width="350">
        <template slot-scope="scope">{{ scope.row.oderName }}</template>
      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="oderStatus"
        width="150">
      </el-table-column>
      <el-table-column
        label="客户姓名"
        prop="userName"
        width="150">
      </el-table-column>
      <el-table-column
        label="客户手机号"
        prop="userPhone"
        width="150">
      </el-table-column>
      <el-table-column
        prop="payAmount"
        label="秒杀支付金额"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope"><el-button
          size="mini"
          @click="chekcOder()">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from "./../fetch/api"
  import Final from "./../util/Final"
export default {
  name: 'header',
  data () {
    return {
      tableData3: [{
        oderNum:'1234556',
        orderCreatTime:'2017-10-01',
        oderName:'500元购车优惠券500元购车优惠券',
        oderStatus:'已支付',
        userName:'阿娇',
        userPhone:'010101001',
        payAmount:'23123'
      }, ],
    }
  },
  created () {

  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 查看订单详情
     */
    chekcOder(){
      console.log('开发中！');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
