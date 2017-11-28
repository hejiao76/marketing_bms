<template>
  <div class="con_list">
    <!--<h5>待处理事项</h5>-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="100px" size="small">
        <el-row>
          <el-col :span="14">
            <el-form-item label="秒杀券名称:" prop="activityName">
              <el-input   v-model="filterForm.activityName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
        <div style="width:550px;">
          <el-form-item label="秒杀券有效期:">
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
            </el-col>
            <el-col class="line ml5" :span="1" style="text-align: center;width:30px;">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="选择结束日期"></el-date-picker>
            </el-col>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="list_div">
      <el-row>
        <el-col :span="20">
          <el-tabs type="card" @tab-click="changeActivityType">
            <el-tab-pane name="0" label="全部活动"></el-tab-pane>
            <el-tab-pane name="1" label=" 有效 "></el-tab-pane>
            <el-tab-pane name="2" label="无效"></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addTicket" class="fr mr20 ">新建秒杀券</el-button>
        </el-col>
      </el-row>
      <div><span class="totalTip">共找到以下10条数据</span></div>
      <el-table class="table_min_height mt10" :data="resData" ref="singleTable" border highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="index" label="" width="55"></el-table-column>
        <el-table-column prop="ticketName" label="秒杀券名称" align="center" min-width="90" ></el-table-column>
        <el-table-column prop="isvalid" label="秒杀券状态" align="center" min-width="80"></el-table-column>
        <el-table-column prop="activityEndDate" align="center" label="秒杀券有效期" min-width="100"></el-table-column>
        <el-table-column prop="applyCar" align="center" label="秒杀券适用车系"></el-table-column>
        <el-table-column prop="sedkillMoney" align="center" label="单个秒杀券金额"></el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template scope="scope">
            <div v-if="activityType==0">
              <el-button @click="updateTicket" type="text" style="padding-top:0px;padding-bottom:0px;">编辑</el-button>
              <el-button @click="copyTicket" type="text" style="padding-top:0px;padding-bottom:0px;">复制</el-button>
              <el-button @click="invalidTicket" type="text" style="padding-top:0px;padding-bottom:0px;">无效</el-button>
            </div>
            <div v-if="activityType==1">
              <el-button @click="updateTicket" type="text" style="padding-top:0px;padding-bottom:0px;">编辑</el-button>
              <el-button @click="invalidTicket" type="text" style="padding-top:0px;padding-bottom:0px;">无效</el-button>
            </div>
            <div v-if="activityType==2">
              <el-button @click="updateTicket" type="text" style="padding-top:0px;padding-bottom:0px;">编辑</el-button>
              <el-button @click="invalidTicket" type="text" style="padding-top:0px;padding-bottom:0px;">无效</el-button>
            </div>
            <div v-if="activityType==3">
              <el-button @click="updateTicket" type="text" style="padding-top:0px;padding-bottom:0px;">编辑</el-button>
              <el-button @click="invalidTicket" type="text" style="padding-top:0px;padding-bottom:0px;">无效</el-button>
            </div>
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
      }
    },
    components: {
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){
      this.requestData();
    },
    mounted () {
      //      this.requestData();
    },
    watch: {
      "$route": function (to, from) {
        this.resetForm();
      }
    },
    methods: {
      /**
       * 复制券
       * @returns {}
       */
      copyTicket () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"复制券还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 修改券
       * @returns {}
       */
      updateTicket () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"编辑券还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 新建券
       * @returns {}
       */
      addTicket () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"新建券还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * invalid无效券
       * @returns {}
       */
      invalidTicket () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
      },

      changeActivityType (tab, event){
        this.activityType = tab.name;
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
      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {token: localStorage.getItem("token"), type: this.checkStatus}
        if (this.filterForm.ticketName) {
          param.activityName = this.filterForm.activityName
        }
        if (this.filterForm.activityStartDate) {
          param.activityStartDate = Util.toDateString(this.filterForm.activityStartDate.getTime());
        }
        if (this.filterForm.activityEndDate) {
          param.activityEndDate = Util.toDateString(this.filterForm.activityEndDate.getTime());
        }
        console.log("查询提交参数:",param);
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
        let param = {jsonData: JSON.stringify(p), pageNum: this.currentPage, pageRecorders: this.pageRecorders};
        this.resData=TestData.sedKill_ticket_list_data;
        this.totalRow = 300;
        return;
        Api.sk_activity_list(param)
          .then(res => {
            if (res.status == 1) {
              this.resData = res.result;
              this.totalRow = res.totalRow;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
      /**
       * 重置表单
       */
      resetForm() {
        this.$refs['filterForm'].resetFields();
        this.searchFn();
      }
    }
  }
</script>
<style>


  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
