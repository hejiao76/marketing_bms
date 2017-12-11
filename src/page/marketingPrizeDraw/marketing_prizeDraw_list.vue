<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="100px" size="small">
        <el-row>
          <el-col :span="10">
          <el-form-item label="活动名称:" >
            <el-input   v-model="filterForm.activityName" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
              <el-form-item label="用户姓名:">
                <el-input   v-model="filterForm.userName" placeholder="请输入用户姓名"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="fr">
              <el-button type="primary" @click="searchFn">查 询</el-button>
              <el-button @click="resetForm('filterForm')">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--------------搜索结果------------>
    <div class="text-right margin-bottom-15">
      <el-button type="primary" @click="uploadEx()">导出</el-button>
    </div>
    <el-table
      :data="dataDetail"
      style="width: 100%; "
      @sort-change="sortTable"
    >
      <el-table-column
        prop="username"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        prop="userLoginName"
        label="用户姓名"
        >
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="用户手机号"
      >
      </el-table-column>
      <el-table-column
        prop="buyNum"
        label="奖品"
      >
        <template slot-scope="scope">
          {{scope.row.level}}:{{scope.row.giftGroupName}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="中奖日期"
        sortable="custom"
        >
      </el-table-column>
      <el-table-column
        prop="acitvityName"
        label="活动名称"
      >
      </el-table-column>
    </el-table >

    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
    <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                   :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                   :total="totalRow"></el-pagination>

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
  import TestData from "./../../util/TestData"
  import $ from "jquery"
  export default {
    data() {
      return {
        filterForm: {
          activityName:'',//活动名称
          userName:'',//用户姓名,
          descType:'',// 日期排序
        },
        currentPage: 1,
        totalRow: 0,
        pageRecorders: 10,
        dataDetail:[],

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
        this.resetForm();
      }
    },
    methods: {
      /**
       * table排序
       * @returns
       */
      sortTable(obj){
        if(obj.order == 'descending'){
          this.filterForm.descType = 'desc'
        }else{
          this.filterForm.descType = 'asc'
        }
        this.requestData();
      },
      getFilterParam () {
        var param = {}
        if (this.filterForm.activityName) {
          param.acitvityName = this.filterForm.activityName
        }
        if (this.filterForm.userName) {
          param.userName = this.filterForm.userName
        }
        if (this.filterForm.descType) {
          param.descType = this.filterForm.descType
        }
        param.pageIndex = this.currentPage;
        param.pageSize = this.pageRecorders;
        return param;
      },
      requestData(){
        var p = this.getFilterParam();
        Api.pd_activity_winning_list(p)
          .then(res => {
            if (res.status) {
              this.dataDetail = res.result;
              this.totalRow = res.dataNumber;
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
      // 搜索
      searchFn(){
        this.currentPage = 1;
        this.requestData();
      },
      //重置
      resetForm(){
        this.filterForm={
          activityName:'',//活动名称
          userName:'',//用户姓名
        }
      },
      // 翻页
      handleCurrentChange(cpage){
        this.currentPage = cpage;
        this.requestData();
      },
      // 导出excelbiao
      uploadEx(){
        let param="?1=1"
        if (this.filterForm.activityName) {
          p.acitvityName = this.filterForm.activityName
           param+="activityName="+this.filterForm.activityName
          }
        if (this.filterForm.userName) {
          param+="userName="+this.filterForm.userName
        }
        window.open(window.location.href.split("#")[0]+'action/lottery/winning/exp'+param);

      }
    }
  }
</script>
<style>
  .margin-bottom-15 {
    margin-bottom: 15px !important;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
</style>
