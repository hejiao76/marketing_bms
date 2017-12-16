<template>
  <div class="con_list">
    <!--<h5>待处理事项</h5>-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="120px" size="small" :label-position="labelPosition">
        <el-row>
          <el-col :span="13">
            <el-form-item label="秒杀券名称:" prop="activityName">
              <el-input   v-model="filterForm.ticketName" placeholder="请输入商品名称" style="width: 92%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="秒杀券有效期:">
            <el-col :span="5">
              <el-date-picker v-model="filterForm.activityStartDate" :editable="false" :picker-options="optionsActivityStart" type="date" style="width: 100%;" placeholder="选择开始日期"></el-date-picker>
            </el-col>
            <el-col  :span="1" style="text-align: center;">-</el-col>
            <el-col :span="5">
              <el-date-picker v-model="filterForm.activityEndDate" :editable="false" :picker-options="optionsActivityEnd" type="date" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="13" style="text-align: right">
              <el-form-item class="fr">
                <el-button type="primary" @click="searchFn">查 询</el-button>
                <el-button @click="resetForm('filterForm')">重 置</el-button>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="list_div">
      <el-row>
        <el-col :span="20">
          <el-tabs type="card" @tab-click="changeActivityType">
            <el-tab-pane name="0" label="全部活动"></el-tab-pane>
            <el-tab-pane name="1" label="有效"></el-tab-pane>
            <el-tab-pane name="2" label="无效"></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addTicket()" class="fr mr20 ">新建秒杀券</el-button>
        </el-col>
      </el-row>
      <div style="margin-bottom:15px;"><span class="totalTip">共找到以下 <span style="padding:0 10px;color: #409eff">{{totalRow}}</span>条数据</span></div>
      <el-table class="table_min_height mt10" :data="resData" ref="singleTable" @sort-change="sortTable">
        <el-table-column prop="name" label="秒杀券名称" align="center"></el-table-column>
        <el-table-column label="秒杀券状态" align="center"> <template slot-scope="scope">{{Final.seckill_ticket[scope.row.status]}}</template></el-table-column>
        <el-table-column align="center" label="秒杀券有效期" sortable="custom"><template scope="scope">{{getMoment(scope.row.beginTime)}}至<br/>{{getMoment(scope.row.endTime)}}</template></el-table-column>
        <el-table-column prop="carTypeName" align="center" label="秒杀券适用车系" ></el-table-column>
        <el-table-column prop="amount" align="center"  label="单个秒杀券金额"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button type="text" v-if="scope.row.status==1" @click="updateTicket(scope.row.id)">编辑</el-button>
            <el-button v-if="scope.row.status==1" type="text" @click="invalidTicket(scope.row.id)">无效</el-button>
            <el-button type="text" @click="copyTicket(scope.row.id)">复制</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>

    </div>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import Api from "./../../fetch/api";
  import * as Util from "./../../util/util";
  import VTipMsg from "./../../components/tipMsg.vue";
  import TestData from "./../../util/TestData"
  export default {
    data() {
      return {
        labelPosition:'left',
        optionsActivityStart :{
          disabledDate:(time) => {
            if(this.filterForm.activityEndDate){
              let d = new Date (this.filterForm.activityEndDate)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.filterForm.activityStartDate){
              let d = new Date (this.filterForm.activityStartDate)
              return time.getTime() <d.getTime();
            }
          }
        },
        filterForm: {
          ticketName:'',//秒杀券名称
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
        },
        activityType : 0,
        resData : [],
        currentPage: 1,
        totalRow: 0,
        pageRecorders: 10,
        Final: Final,
        dataNumber:'',
        sortType:1,
      }
    },
    components: {
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    mounted () {
      this.requestData();
    },
    watch: {
      "$route": function (to, from) {
//        this.resetForm();
      }
    },
    methods: {
      /**
       * 格式化时间
       * @returns {}
       */
      getMoment(val){
        return this.$moment(val).format('YYYY-MM-DD');
      },
      /**
       * table排序
       * @returns
       */
      sortTable(obj){
        if(obj.order == 'descending'){
          this.sortType = 2
        }else{
          this.sortType = 1
        }
        this.requestData();
      },
      /**
       * 复制券
       * @returns {}
       */
      copyTicket (id) {
        this.$router.push({name: 'marketing_sedKill_ticket_copy', params: {type:'copy',ticketId:id}})
      },
      /**
       * 修改券
       * @returns {}
       */
      updateTicket (id) {
        this.$router.push({name: 'marketing_sedKill_ticket_edit', params: {ticketId:id}})
      },
      /**
       * 新建券
       * @returns {}
       */
      addTicket () {
        this.$router.push({name: 'marketing_sedKill_ticket_edit', params: {ticketId:'new'}})
      },
      /**
       * invalid无效券
       * @returns {}
       */
      invalidTicket (id) {
        this.$confirm('确认设置无效吗？','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            Api.sk_activity_ticket_update_status({id:id,status:2})
              .then(res => {
                if (res.status) {
                  this.currentPage = 1;
                  this.requestData();
                  this.$message({
                    showClose: true,
                    message: '设置无效成功！',
                    type: 'success'
                  });
                }else {
                  this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                  });
                }
              }).catch(err => {
              this.$message({
                showClose: true,
                message: '数据请求失败！',
                type: 'error'
              });
            });
          })
      },

      changeActivityType (tab, event){
        this.activityType = tab.name;
        this.requestData();
      },
      /**
       * 翻页控件触发事件
       * @returns {}
       */
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
        this.requestData();
      },
      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {}
        if (this.filterForm.ticketName) {
          param.name = this.filterForm.ticketName
        }
        if (this.filterForm.activityStartDate) {
          param.beginTime = Util.toDateString(this.filterForm.activityStartDate.getTime());
        }
        if (this.filterForm.activityEndDate) {
          param.endTime = Util.toDateString(this.filterForm.activityEndDate.getTime());
        }
        param.status = this.activityType;
        param.pageIndex = this.currentPage;
        param.pageSize = this.pageRecorders;
        param.sortType = this.sortType
        return param;
      },
      searchFn () {
        this.currentPage = 1;
        this.requestData();
      },
      /**
       * 请求列表数据
       */
      requestData (data) {
        var p = this.getFilterParam();
        Api.sk_activity_ticket_list(p)
          .then(res => {
            if (res.status) {
              this.resData = res.result;
              this.totalRow = res.dataNumber;
            }else {
              this.resData = [];
              this.currentPage = 1;
            }
          }).catch(err => {
          this.$message({
            showClose: true,
            message: '数据请求失败！',
            type: 'error'
          });
        });
      },
      /**
       * 重置表单
       */
      resetForm() {
        this.filterForm={
             ticketName:'',//秒杀券名称
             activityStartDate:'',//活动开始时间
             activityEndDate:'', //活动结束时间
        }
        this.searchFn();
      }
    }
  }
</script>
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
  .st_list-btn{
    color: #527EFE;
  }
  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
