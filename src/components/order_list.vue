<template>
  <div>
    <div><span class="totalTip">共找到以下10条数据</span></div>
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
        width="100">
      </el-table-column>
      <el-table-column
        label="客户姓名"
        prop="userName"
        width="100">
      </el-table-column>
      <el-table-column
        label="客户手机号"
        prop="userPhone"
        width="100">
      </el-table-column>
      <el-table-column
        prop="payAmount"
        label="秒杀支付金额"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        show-overflow-tooltip>
        <template slot-scope="scope"><el-button
          size="mini"
          @click="chekcOder()">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                   :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                   :total="totalRow"></el-pagination>
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
      currentPage: 1,
      totalRow: 100,
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
    },
    /**
     * 翻页控件触发事件
     * @returns {}
     */
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.requestData();
    },
    toDetail (companyInfoId){
      this.$router.push({name: 'companyDetail', params: {companyInfoId: companyInfoId}})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
