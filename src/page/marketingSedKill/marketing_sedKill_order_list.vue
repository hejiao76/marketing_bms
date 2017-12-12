<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="80px" size="small" >
        <el-row>
          <el-col :span=11>
          <el-form-item label="订单编号:">
            <el-input   v-model="filterForm.orderNum" placeholder="请输入订单编号" ></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="活动名称:">
              <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="客户姓名:">
              <el-input   v-model="filterForm.userName" placeholder="请输入客户姓名" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">

                <el-form-item label="创建时间:">
                    <div style="width: 45%; float:left;">
                      <el-date-picker v-model="filterForm.createStartDate" :editable="false" :picker-options="optionsCreateStart" type="date" style="width: 100%;" placeholder="请输入开始时间"></el-date-picker>
                    </div>


                  <div style="text-align: center;width:10%; float:left;">-</div>
                  <div style="width: 45%; float:left;">
                    <el-date-picker v-model="filterForm.createEndDate" :editable="false" :picker-options="optionsCreateEnd" type="date" style="width: 100%;" placeholder="请输入结束日期" ></el-date-picker>
                  </div>
                </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div>
              <el-form-item label="客户手机:">
                <el-input   v-model="filterForm.phoneNum" placeholder="请输入活动名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="11">
            <el-form-item class="fr">
              <el-button type="primary" @click="searchFn">查 询</el-button>
              <el-button @click="resetForm('filterForm')">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--------------搜索结果------------>
    <div>
      <el-tabs type="card"  v-model="activityType" @tab-click="changeActivityType">
        <el-tab-pane label="全部订单" name="0"></el-tab-pane>
        <el-tab-pane label="待支付" name="1"></el-tab-pane>
        <el-tab-pane label="支付完成" name="2"></el-tab-pane>
        <el-tab-pane label="已取消" name="3"></el-tab-pane>
        <el-tab-pane label="退款中" name="4"></el-tab-pane>
        <el-tab-pane label="退款完成" name="5"></el-tab-pane>
      </el-tabs>
      <el-table
        :data="resData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="orderNum"
          label="订单编号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="活动名称"
          >
        </el-table-column>
        <el-table-column
          label="订单状态"
        >
          <template slot-scope="scope">{{Final.seckill_order[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="客户姓名"
          width="100"
          >
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="客户手机"
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          label="秒杀支付金额"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="chekcOderDetail(scope.row.orderNum)" >订单详情</el-button>
          </template>
        </el-table-column>

      </el-table >


    </div>
    <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                   :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                   :total="totalRow"></el-pagination>
    <!--<div class="mask" style="z-index: 12000;"></div>-->
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
    <V-OrderDetail  ref="oderDetailDialog"></V-OrderDetail>
  </div>

</template>
<script>
  //  import api from "./../fetch/api"
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import Api from "./../../fetch/api";
  import * as Util from "./../../util/util";
  import VTipMsg from "./../../components/tipMsg.vue";
  import VOrderDetail from "./../../components/order_detail.vue";
  import VOrderList from "./../../components/order_list.vue";
  import TestData from "./../../util/TestData"
  import $ from "jquery"
  export default {
    data() {
      return {
        optionsCreateStart : {
          disabledDate:(time) => {
            if(this.filterForm.createEndDate){
              let d = new Date (this.filterForm.createEndDate)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsCreateEnd : {
          disabledDate:(time) => {
            if(this.filterForm.createStartDate){
              let d = new Date (this.filterForm.createStartDate)
              return time.getTime() <d.getTime();
            }
          }
        },
        filterForm: {
          activityName:'',//活动名称
          createStartDate:'',//活动创建开始时间
          createEndDate:'',//活动创建结束时间
          orderNum:'',//订单编号
          userName:'',//客户姓名
          phoneNum:''//客户手机
        },
        resData : [],
        pageRecorders: 10,
        Final: Final,
        currentPage: 1,
        totalRow: 10,
        activityType:0,
      }
    },
    components: {
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VOrderDetail,
      VOrderList
    },
    mounted () {
      this.requestData();
    },
    watch: {
      "$route": function (to, from) {
        this.resetForm();
      }
    },
    methods: {


      /**
       * 选项卡点击事件触发
       * @returns {}
       */
      changeActivityType (tab, event){
        this.activityType = tab.name;
        this.currentPage = 1;
        this.requestData();
      },

      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {}
        if (this.filterForm.activityName) {
          param.itemName  = this.filterForm.activityName
        }
        if (this.filterForm.orderNum) {
          param.orderNum = this.filterForm.orderNum
        }
        if (this.filterForm.userName) {
          param.userName = this.filterForm.userName
        }
        if (this.filterForm.phoneNum) {
          param.userPhone = this.filterForm.phoneNum
        }
        if (this.filterForm.createStartDate) {
          param.beginTime = Util.toDateString(this.filterForm.createStartDate.getTime());
        }
        if (this.filterForm.createEndDate) {
          param.endTime = Util.toDateString(this.filterForm.createEndDate.getTime());
        }
        param.status = this.activityType;
        param.pageIndex = this.currentPage;
        param.pageSize = this.pageRecorders;
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
        Api.sk_activity_order_list(p)
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
       // this.$refs['filterForm'].resetFields();
        this.filterForm = {
          activityName:'',//活动名称
            activityArea:'',//活动区域
            createStartDate:'',//活动创建开始时间
            createEndDate:'',//活动创建结束时间
            orderNum:'',//订单编号
            userName:'',//客户姓名
            phoneNum:''//客户手机
        }
        this.searchFn();
      },
      /**
       * 列表
       */

      /// 查看详情
      chekcOderDetail(orderNum){
        this.$refs.oderDetailDialog.showDialog(orderNum);
      },
      // 翻页
      handleCurrentChange(cpage){
        this.currentPage = cpage;
        this.requestData();
      }

    }
  }
</script>

<style scoped="scope">

</style>
