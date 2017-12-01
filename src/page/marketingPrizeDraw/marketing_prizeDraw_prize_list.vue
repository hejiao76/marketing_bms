<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="80px" size="small">
        <el-row>
          <el-col :span="14">
          <el-form-item label="活动名称:" prop="activityName">
            <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="活动区域:" class="ml10" prop="activityArea" label-width="80px">
              <el-select v-model="filterForm.activityArea" placeholder="请选择">
                <!--<el-option v-for="item in companyContents" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="width:550px;">
          <el-form-item label="活动时间:">
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择活动开始日期"></el-date-picker>
            </el-col>
            <el-col class="line ml5" :span="1" style="text-align: center;width:30px;">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="选择活动结束日期"></el-date-picker>
            </el-col>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--------------搜索结果------------>
    <div class="list_div">
      <el-tabs type="card"  v-model="activeName" @tab-click="changeActivityType">
        <div class="control-label col-md-12 row margin-bottom-10">
          共找到以下
          <span>10</span>条消息
        </div>
        <el-tab-pane label="全部活动" name="first" style="width: 100%;">
          <el-row :gutter="20" >
            <el-col :xs="11" :sm="6" v-for="item in prizeList" style="margin-bottom:20px;">
              <div class="active-box">
                <div class="active-header">
                  <p class="ah-title">幸运大转盘大转盘</p>
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
                  <p class="ah-title">已发放/剩余总数量：<span>{{item.buyNum}}/{{item.allBuyNum}}</span></p>
                  <p class="ah-title">剩余数量：<span>{{item.allBuyNum}}</span></p>
                  <p class="ah-title">创建日期：<span>{{item.createDate}}</span></p>
                  <a  class="more-txt">查看详情&gt;</a>
                </div>
                <div class="active-footer">
                  <table>
                    <tr>
                      <td><a href="javascript:void(0)" @click="updatePrize()">编辑</a></td>
                      <td><a href="javascript:void(0)">活动链接</a></td>
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
        </el-tab-pane>
        <el-tab-pane label="未开启" name="second">
          <el-row :gutter="20">
            <el-col :xs="11" :sm="6" v-for="item in prizeList" v-if="item.isStart==1" style="margin-bottom:20px;">
              <div class="active-box" >
                <div class="active-header">
                  <p class="ah-title">幸运大转盘大转盘</p>
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
                  <p class="ah-title">已发放/剩余总数量：<span>{{item.buyNum}}/{{item.allBuyNum}}</span></p>
                  <p class="ah-title">剩余数量：<span>{{item.allBuyNum}}</span></p>
                  <p class="ah-title">创建日期：<span>{{item.createDate}}</span></p>
                  <a  class="more-txt">查看详情&gt;</a>
                </div>
                <div class="active-footer">
                  <table>
                    <tr>
                      <td><a href="javascript:void(0)" @click="updatePrize()">编辑</a></td>
                      <td><a href="javascript:void(0)">活动链接</a></td>
                      <td><a href="javascript:void(0)" @click="deletePrize()" v-if="item.isStart==2">删除</a></td>
                    </tr>
                  </table>
                </div>
                <div class="active-img">
                  <img v-if="item.isStart==3" src="../../assets/images/end1.png"/>
                  <img v-if="item.isStart==2" src="../../assets/images/start1.png"/>
                  <img v-if="item.isStart==1" src="../../assets/images/nostart1.png"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="进行中" name="third">
          <el-row :gutter="20">
            <el-col :xs="11" :sm="6" v-for="item in prizeList"  v-if="item.isStart==2" style="margin-bottom:20px;">
              <div class="active-box">
                <div class="active-header">
                  <p class="ah-title">幸运大转盘大转盘</p>
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
                  <p class="ah-title">已发放/剩余总数量：<span>{{item.buyNum}}/{{item.allBuyNum}}</span></p>
                  <p class="ah-title">剩余数量：<span>{{item.allBuyNum}}</span></p>
                  <p class="ah-title">创建日期：<span>{{item.createDate}}</span></p>
                  <a  class="more-txt">查看详情&gt;</a>
                </div>
                <div class="active-footer">
                  <table>
                    <tr>
                      <td><a href="javascript:void(0)" @click="updatePrize()">编辑</a></td>
                      <td><a href="javascript:void(0)">活动链接</a></td>
                      <td><a href="javascript:void(0)" @click="deletePrize()" v-if="item.isStart==2">删除</a></td>
                    </tr>
                  </table>
                </div>
                <div class="active-img">
                  <img v-if="item.isStart==3" src="../../assets/images/end1.png"/>
                  <img v-if="item.isStart==2" src="../../assets/images/start1.png"/>
                  <img v-if="item.isStart==1" src="../../assets/images/nostart1.png"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="已结束" name="four">
          <el-row :gutter="20">
            <el-col :xs="11" :sm="6" v-for="item in prizeList" v-if="item.isStart==3" style="margin-bottom:20px;">
              <div class="active-box">
                <div class="active-header">
                  <p class="ah-title">幸运大转盘大转盘</p>
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
                  <p class="ah-title">已发放/剩余总数量：<span>{{item.buyNum}}/{{item.allBuyNum}}</span></p>
                  <p class="ah-title">剩余数量：<span>{{item.allBuyNum}}</span></p>
                  <p class="ah-title">创建日期：<span>{{item.createDate}}</span></p>
                  <a  class="more-txt">查看详情&gt;</a>
                </div>
                <div class="active-footer">
                  <table>
                    <tr>
                      <td><a href="javascript:void(0)" @click="updatePrize()">编辑</a></td>
                      <td><a href="javascript:void(0)">活动链接</a></td>
                      <td><a href="javascript:void(0)" @click="deletePrize()" v-if="item.isStart==2">删除</a></td>
                    </tr>
                  </table>
                </div>
                <div class="active-img">
                  <img v-if="item.isStart==3" src="../../assets/images/end1.png"/>
                  <img v-if="item.isStart==2" src="../../assets/images/start1.png"/>
                  <img v-if="item.isStart==1" src="../../assets/images/nostart1.png"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>

      <!-- 中奖用户弹出层 -->
      <div class="mask" style="z-index: 12000;"></div>

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
  export default {
    data() {
      return {
        activeName:'first',
        prizeList:TestData.prize_list,
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
          activityName:'',//活动名称
          activityArea:'',//活动区域
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
       * 删除
       * @returns {}
       */
      deletePrize(){
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 修改
       * @returns {}
       */
      updatePrize(){
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
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
       * 新建活动点击
       * @returns {}
       */
      deleteActivity () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
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
        this.$router.push({name: 'companyDetail', params: {companyInfoId: companyInfoId}})
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
        this.resData=TestData.sedKill_list_data;
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
  .list_div {}
  .list_div .el-tabs__content {
      display :none
  }
  .list_div el-tabs--top {
    display : none;
  }
  .list_div .totalTip {
    font-size: 14px;
    color: #8C94AC;
    letter-spacing: 0;
  }
  .list_div .el-tabs__content{
    display: block;
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
  .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border:none;
  }
</style>

<style scoped="scope">

</style>
