<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="100px" size="small">
        <el-row>
          <el-col :span="10">
          <el-form-item label="活动名称:" >
            <el-select v-model="filterForm.activityArea" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in areaArr"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
              <el-form-item label="用户姓名:">
                <el-input   v-model="filterForm.activityName" placeholder="请输入用户姓名"></el-input>
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
    <table class="text-center table table-striped table-bordered table-hover">
      <thead>
      <tr>
        <th>用户名</th>
        <th>用户姓名</th>
        <th>用户手机号</th>
        <th>将品</th>
        <th>活动名称</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>发撒发达</td>
        <td>周韵幂</td>
        <td>13899002233</td>
        <td>一等奖 特惠大礼包</td>
        <td><a href="#no">幸运大转盘</a></td>
      </tr>
      <tr>
        <td>发撒发达</td>
        <td>周韵幂</td>
        <td>13899002233</td>
        <td>一等奖 特惠大礼包</td>
        <td><a href="#no">幸运大转盘</a></td>
      </tr>
      <tr>
        <td>发撒发达</td>
        <td>周韵幂</td>
        <td>13899002233</td>
        <td>一等奖 特惠大礼包</td>
        <td><a href="#no">幸运大转盘</a></td>
      </tr>
      </tbody>
    </table>

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
          activityArea:'全国',//活动区域
        },
        currentPage:1,
        totalRow:100,
        areaArr:[
          '全国','在售','停售'
        ]

      }
    },
    components: {
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){

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
      // 搜索
      searchFn(){

      },
      //重置
      resetForm(){

      },
      // 翻页
      handleCurrentChange(){

      },
      // 导出excelbiao
      uploadEx(){
        this.$refs.tipMsgRef.showTipMsg({
          msg:"复制券还在开发! 急什么! 急什么!",
          type:"error"
        });
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
  .table-bordered {
    border: 1px solid #F3F4F7;
  }
  .table {
    width: 100%;
    margin-bottom: 20px;
    background-color: #fff;
  }
  .text-center {
    text-align: center;
  }
  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }
  .table.table-bordered thead > tr > th {
    border-bottom: 0;
    background-color: #F6F7FB;
    color: #333;
    font-style: normal;
  }
  .table-striped > thead > tr > th:first-child {
    padding-left: 15px;
  }
  .table thead tr th {
    font-size: 14px;
  }
  .table thead > tr > th, .table tbody > tr > th, .table tfoot > tr > th, .table thead > tr > td, .table tbody > tr > td, .table tfoot > tr > td{
    padding: 20px 9px;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  .table-striped > tbody > tr > td:first-child {
    padding-left: 15px;
  }
  .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
    border: 1px solid #F3F4F7;
  }
  .table-hover > tbody > tr:hover, .table-hover > tbody > tr:hover > td {
    background: #f3f4f6 !important;
  }
</style>
