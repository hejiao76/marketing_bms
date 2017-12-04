<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
        <el-form :model="filterForm" ref="filterForm"  size="small" label-width="80px" class="demo-ruleForm" :label-position="labelPosition">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="活动名称">
                  <el-input v-model="filterForm.activityName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="活动日期:">
                    <el-col :span="11">
                      <el-form-item >
                        <el-date-picker style="width: 100%;" v-model="filterForm.activityStartDate" :editable="false" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                      <el-form-item>
                        <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate" :editable="false" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="创建日期:">
                    <el-col :span="11">
                      <el-form-item>
                        <el-date-picker style="width: 100%;" v-model="filterForm.createStartDate" :editable="false" :picker-options="optionsCreateStart" type="date" placeholder="选择开始日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                      <el-form-item>
                        <el-date-picker style="width: 100%;" v-model="filterForm.createEndDate" :editable="false" :picker-options="optionsCreateEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="活动地区:">
                <V-Treeview @call="addSedKillCallBack"></V-Treeview>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="fr">
                <el-button type="primary" @click="searchFn">查 询</el-button>
                <el-button @click="resetForm('filterForm')">重 置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </div>
    <!--------------搜索结果------------>
    <div class="list_div">
      <el-row>
        <el-col :span="20">
          <el-tabs type="card" @tab-click="changeActivityType">
            <el-tab-pane name="0" label="全部活动"></el-tab-pane>
            <el-tab-pane name="1" label=" 进行中 "></el-tab-pane>
            <el-tab-pane name="2" label=" 待上线 "></el-tab-pane>
            <el-tab-pane name="3" label=" 已结束 "></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addActivity" class="fr mr20 ">新建活动</el-button>
        </el-col>
      </el-row>
      <div style="margin-bottom:15px;"><span class="totalTip">共找到以下10条数据</span>
        <el-switch
        style="display:inline-block;float: right"
        v-model="isCar"
        active-color="#13ce66"
        inactive-color="#409EFF"
        active-text="卡片"
        inactive-text="列表"
        change="changeCar()"
        >
       </el-switch>
      </div>
      <!--------------列表------------>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        v-if="!isCar"
      >
        <el-table-column
          prop="activityName"
          label="活动名称"
          sortable width="150">
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="活动开始日期"
          sortable width="150">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="活动结束日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="buyNum"
          label="领取数量"
          sortable width="80">
        </el-table-column>
        <el-table-column
          prop="activity_pv"
          label="活动pv"
          sortable width="80">
        </el-table-column>
        <el-table-column
          prop="activityStatus"
          label="状态"
          sortable width="80">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建日期"
          sortable width="100">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text">查看</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">结束活动</el-button>
              <el-button type="text" @click="couponLink()">活动链接</el-button>
            </template>
        </el-table-column>
      </el-table >
      <!--------------卡片------------>
      <div v-if="isCar">
        <el-row :gutter="20" >
          <el-col :xs="11" :sm="6" v-for="item in tableData" style="margin-bottom:20px;">
            <div class="active-box">
              <div class="active-header">
                <p class="ah-title">{{item.activityName}}</p>
                <div class="ah-time">
                  <div class="ah-time-left">
                    活动日期：
                  </div>
                  <div class="ah-time-right">
                    <span>{{item.startDate}}</span>至<br />
                    <span>{{item.endDate}}</span>
                  </div>
                </div>
              </div>
              <div class="active-content">
                <p>活动PV:{{item.activity_pv}}</p>
                <p class="ah-title">已发放/剩余总数量：<span>{{item.buyNum}}/{{item.allBuyNum}}</span></p>
                <p class="ah-title">剩余数量：<span>{{item.allBuyNum}}</span></p>
                <p class="ah-title">创建日期：<span>{{item.createDate}}</span></p>
                <p class="ah-notes">（此活动包含3个抵扣券）</p>
                <a  class="more-txt">查看详情&gt;</a>
              </div>
              <div class="active-footer">
                <table>
                  <tr>
                    <td><a href="javascript:void(0)" @click="updatePrize()">编辑</a></td>
                    <td><a href="javascript:void(0)"  @click="couponLink()"> 活动链接</a></td>
                    <td><a href="javascript:void(0)" @click="deletePrize()" v-if="item.isStart==2">删除</a></td>
                  </tr>
                </table>
              </div>
              <div class="active-img">
                <img v-if="item.isStart==3" src="../../assets/images/end1.png"/>
                <img v-if="item.isStart==1" src="../../assets/images/start1.png"/>
                <img v-if="item.isStart==2" src="../../assets/images/nostart1.png"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="2" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>
    </div>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
    <V-CouponLink ref="couponDialog"></V-CouponLink>





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
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import VTreeview from "./../../components/treeview.vue";
  import VCouponLink from "./../../components/coupon_link.vue";
  export default {
    data() {
      return {
        tableData:TestData.prize_list,
        isCar:true,//滑块
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
          activityArea:'',//活动区域
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          createStartDate:'',//活动创建开始时间
          createEndDate:''//活动创建结束时间
        },
        labelPosition:'left',
        activityType : 0,
        resData : [],
        currentPage: 1,
        totalRow: 20,
        pageRecorders: 10,
        Final: Final,
      }
    },
    components: {
      ElButton,
      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VTreeview,
      VCouponLink
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
      ////table排序　
      formatter(row, column) {
        return row.address;
      },
      ////卡片切换
      changeCar(){
        if(this.isCar){
          this.isCar = false;
        }else{
          this.isCar = true;
        }
      },
      /**
       * 新建活动点击
       * @returns {}
       */
      addActivity () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {token: localStorage.getItem("token"), type: this.checkStatus}
        if (this.filterForm.activityName) {
          param.activityName = this.filterForm.activityName
        }
        if (this.filterForm.activityArea) {
          param.activityArea = this.filterForm.activityArea
        }
        if (this.filterForm.activityStartDate) {
          param.activityStartDate = Util.toDateString(this.filterForm.activityStartDate.getTime());
        }
        if (this.filterForm.activityEndDate) {
          param.activityEndDate = Util.toDateString(this.filterForm.activityEndDate.getTime());
        }
        if (this.filterForm.createStartDate) {
          param.createStartDate = Util.toDateString(this.filterForm.createStartDate.getTime());
        }
        if (this.filterForm.createEndDate) {
          param.createEndDate = Util.toDateString(this.filterForm.createEndDate.getTime());
        }
        console.log("查询提交参数:",param);
        return param;
      },
      /**
       * 搜索
       */
      searchFn () {
        this.currentPage = 1;
        this.totalRow = 20;
        //this.requestData();
      },
      /**
       * 重置表单
       */
      resetForm() {

        this.filterForm =  {
          activityName:'',//活动名称
            activityArea:'',//活动区域
            activityStartDate:'',//活动开始时间
            activityEndDate:'', //活动结束时间
            createStartDate:'',//活动创建开始时间
            createEndDate:''//活动创建结束时间
        }

        this.searchFn();
      },
      /**
       * 选项卡点击事件触发
       * @returns {}
       */
      changeActivityType (tab, event){
        this.activityType = tab.name;
      },
      /**
       * 翻页控件触发事件
       * @returns {}
       */
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
        //this.requestData();
      },
      toDetail (companyInfoId){
        this.$router.push({name: 'companyDetail', params: {companyInfoId: companyInfoId}})
      },
      // 返回城市列表
      addSedKillCallBack(cityArr){

      },
      //活动链接
      couponLink(){
        this.$refs.couponDialog.showDialog('这是需要复制的内容！');
      }



}
}
</script>
<style>
  .list_div {}
  .list_div el-tabs--top {
    display : none;
  }
  .list_div .totalTip {
    font-size: 14px;
    color: #8C94AC;
    letter-spacing: 0;
  }
</style>

<style scoped="scope">

</style>
