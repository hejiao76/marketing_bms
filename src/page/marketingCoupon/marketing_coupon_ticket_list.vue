<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"   size="small" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-row :gutter="20">
          <el-col :span="12">
          <el-form-item label="抵扣券名称：">
            <el-input v-model="filterForm.activityName"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="12">
          <el-form-item label="抵扣券类型：">
            <el-select v-model="filterForm.activeOption" placeholder="请选择">
              <el-option
                v-for="item in filterForm.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="绑定车系：">
              <el-input v-model="filterForm.activeBandCar"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参与名称：">
              <el-input v-model="filterForm.activeJoinName"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="活动日期:">
              <el-col :span="11">
                <el-form-item >
                  <el-date-picker style="width: 100%;" v-model="filterForm.activityStartDate" :editable="false" :picker-options="optionsActivityStart" type="date"  placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate" :editable="false" :picker-options="optionsActivityEnd"  type="date" placeholder="请输入结束日期"></el-date-picker>
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="抵扣金额：">
              <el-col :span="11">
                <el-form-item >
                  <el-input v-model="filterForm.deductionStarNum" ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-input v-model="filterForm.deductionEndNum"></el-input>
                </el-form-item>
              </el-col>

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
    <div class="list_div">
      <el-row>
        <el-col :span="20">
          <el-tabs type="card" @tab-click="changeActivityType">
            <el-tab-pane name="0" label="有效"></el-tab-pane>
            <el-tab-pane name="1" label="失效"></el-tab-pane>
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
          label="抵扣券名称"
          >
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="抵扣类型"
           width="100">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="抵扣金额"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="buyNum"
          label="绑定车系"
          >
        </el-table-column>
        <el-table-column
          prop="activity_pv"
          label="有效期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="activityStatus"
          label="参与活动"
           >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建日期"
          sortable >
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetail(scope.row)">查看</el-button>
            <el-button type="text" @click="activeUpdate()">编辑</el-button>
            <el-button type="text" @click="checkTicketType(3)">抵扣类型</el-button>
            <el-button type="text" @click="checkCar(2)">绑定车型</el-button>
            <el-button type="text" @click="activeCopy()">复制</el-button>
            <el-button type="text" @click="activeDisabled()">禁用</el-button>
          </template>
        </el-table-column>
      </el-table >
      <!--------------卡片------------>
      <div v-if="isCar">
        <el-row :gutter="20" >
          <el-col :xs="11" :sm="6" v-for="item in tableData" style="margin-bottom:20px;">
            <div class="saleticket-list" v-bind:class="{ graysaletickstyle: item.isStart==3 }">
              <div class="saleticket-list_header" >
                <p>抵扣券名称名称名称名</p>
                <span>有效日期：2017-02-11  00：00：00至2018-09-11  00：00：00</span>
                <div class="headericon">
                  <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                  <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
                </div>
              </div>
              <div class="saleticket-content">
                <ul>
                  <li>
                    <div class="sal-con-tit">
                      抵扣券类型：
                    </div>
                    <div class="sal-con_txt">
                      <span>抵扣车款  其他权益</span>
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      抵扣金额(元)：
                    </div>
                    <div class="sal-con_txt">
                      <span>1000</span>
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      绑定车系：
                    </div>
                    <div class="sal-con_txt">
                      <span>博越</span>
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      抵扣券数量：
                    </div>
                    <div class="sal-con_txt">
                      asdfasdfads
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      创建日期：
                    </div>
                    <div class="sal-con_txt">
                      <span>2017-11-11 10:15:20</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="saleticket-footer">
                <div class="headericon">
                  <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                  <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
                </div>
                <table>
                  <tr>
                    <td v-if="item.isStart==3"><a href="javascript:void(0);" @click="activeUpdate()">编辑</a></td>
                    <td><a href="javascript:void(0);" @click="activeCopy()">复制</a></td>
                    <td v-if="item.isStart==3"><a href="javascript:void(0);" @click="activeDisabled()">禁用</a>
                    <td><a href="javascript:void(0);" @click="toDetail()">查看</a>
                  </tr>
                </table>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>
    </div>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>





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
  export default {
    data() {
      return {
        tableData:TestData.prize_list,
        isCar:false,//滑块
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
          activeBandCar:'',//绑定车系
          activeJoinName:'',//参与名称
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          createStartDate:'',//活动创建开始时间
          createEndDate:'',//活动创建结束时间
          options:[{value:'抵扣券类型',label:'1'}],//抵扣券类型
          activeOption :'',//选择完成抵扣券类型
          deductionStarNum:'',//抵扣最大金额
          deductionEndNum:'',//抵扣最小金额
        },
        labelPosition:'left',
        activityType : 0,
        resData : [],
        currentPage: 1,//当前页
        totalRow: 20,//总页数
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
      VTipMsg
    },
    created (){
    },
    mounted () {
      //      this.requestData();
    },
    watch: {

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
        this.$router.push("/coupon/ticket_edit/1")
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
        //this.requestData();
      },
      /**
       * 重置表单
       */
      resetForm() {
        this.filterForm = {
          activityName:'',//活动名称
          activeBandCar:'',//绑定车系
          activeJoinName:'',//参与名称
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          createStartDate:'',//活动创建开始时间
          createEndDate:'',//活动创建结束时间
          options:[{value:'抵扣券类型',label:'1'}],//抵扣券类型
          activeOption :'',//选择完成抵扣券类型
          deductionStarNum:'',//抵扣最大金额
          deductionEndNum:'',//抵扣最小金额
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
        this.requestData();
      },
      toDetail (companyInfoId){
//        this.$router.push({name: '/coupon/ticket_datail', params: {companyInfoId: companyInfoId}})
        this.$router.push("/coupon/ticket_datail/1")
      },
      //复制抵扣券
      activeCopy(){
        this.$router.push("/coupon/ticket_edit/1")
      },
      //编辑抵扣券
      activeUpdate(){
        this.$router.push("/coupon/ticket_edit/1")
      },
      //禁用抵扣券
      activeDisabled(){
        this.$refs.tipMsgRef.showTipMsg({
          msg:"禁用抵扣券",
          type:"error"
        });
      },
      //修改抵扣券类型
      checkTicketType(){
        this.$router.push("/coupon/ticket_edit/1")
      },
      //修改绑定车型
      checkCar(){
        this.$router.push("/coupon/ticket_edit/1")
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
