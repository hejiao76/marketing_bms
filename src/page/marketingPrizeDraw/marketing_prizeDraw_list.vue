<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="80px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称:" prop="activityName">
              <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20">
              <!--<el-form-item label="活动区域:" class="ml10" prop="activityArea" label-width="80px">-->
              <!--<el-col :span="12">-->
              <!--<template>-->
              <!--<el-select v-model="provinceObj.provinceId" placeholder="请选择" @change="checkCity(provinceObj.provinceId)">-->
              <!--<el-option-->
              <!--v-for="item in cityArr"-->
              <!--:key="item.provinceId"-->
              <!--:label="item.provinceName"-->
              <!--:value="item.provinceId">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</template>-->
              <!--</el-col>-->
              <!--<el-col :span="12">-->
              <!--<template>-->
              <!--<el-select v-model="cityName" placeholder="请选择">-->
              <!--<el-option-->
              <!--v-for="item in cityVmList"-->
              <!--:key="item.cityId"-->
              <!--:label="item.cityName"-->
              <!--:value="item.cityId">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</template>-->
              <!--</el-col>-->
              <!--</el-form-item>-->
            </el-row>
          </el-col>
        </el-row>
        <el-row>
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
                  <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate" :editable="false" :picker-options="optionsActivityEnd"  type="date" placeholder="选择结束日期"></el-date-picker>
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
            <el-tab-pane name="0" label="全部"></el-tab-pane>
            <el-tab-pane name="1" label="未开启"></el-tab-pane>
            <el-tab-pane name="2" label="进行中"></el-tab-pane>
            <el-tab-pane name="3" label="已结束"></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addActivity()" class="fr mr20 ">新建活动</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :xs="11" :sm="6" v-for="item in resData" style="margin-bottom:20px;">
          <div class="active-box">
            <div class="active-header">
              <p class="ah-title">{{item.name}}</p>
              <div class="ah-time">
                <div class="ah-time-left">
                  活动日期：
                </div>
                <div class="ah-time-right">
                  <span>{{item.beginTime}}</span>至<br />
                  <span>{{item.endTime}}</span>
                </div>
              </div>
            </div>
            <div class="active-content">
              <p class="ah-title">已发放/剩余总数量：<span>{{item.winningQuantity}}/{{item.surplusQuantity}}</span></p>
              <p class="ah-title">剩余数量：<span>{{item.surplusQuantity}}</span></p>
              <p class="ah-title">创建日期：<span>{{item.beginTime}}</span></p>
              <a  class="more-txt"  style="cursor: pointer;" @click="openDetail(item.code)">查看详情&gt;</a>
            </div>
            <div class="active-footer">
              <table>
                <tr>
                  <td><a href="javascript:void(0)" @click="updatePrize(item.code)" v-if="item.status!=3">编辑</a></td>
                  <td><a href="javascript:void(0)" @click="couponLink(item.shareUrl)">活动链接</a></td>
                  <td><a href="javascript:void(0)" @click="deletePrize(item.code)" v-if="item.status==1">删除</a></td>
                  <td><a href="javascript:void(0)" @click="endPrize(item.code)"  v-if="item.status==2">结束活动</a></td>
                </tr>
              </table>
            </div>
            <div class="active-img">
              <img v-if="item.status==3" src="../../assets/images/end1.png"/>
              <img v-if="item.status==2" src="../../assets/images/start1.png"/>
              <img v-if="item.status==1" src="../../assets/images/nostart1.png"/>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>


    </div>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
    <V-CouponLink ref="prizeDialog"></V-CouponLink>
    <V-Pldetail ref="prizeDetailDialog"></V-Pldetail>
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
  import TestData from "./../../util/TestData";
  import ElCol from "element-ui/packages/col/src/col";
  import $ from "jquery"
  import VCouponLink from "./../../components/coupon_link.vue";
  import VPldetail from "./../../components/prize_list_detail.vue";
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
        cityArr:[],
        provinceObj:{
          provinceName:'',
          provinceId:'',
          cityId:'',
          cityName:'',


        },

        cityName:'',
        cityVmList:[],
      }
    },
    components: {
      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VCouponLink,
      VPldetail,
    },
    mounted () {
      this.requestData();
    },
    watch: {
    },
    methods: {
      checkCity(provinceId){
        for(var i = 0 ; i < this.cityArr.length; i++){
          if(this.cityArr[i].provinceId == provinceId){
            this.provinceObj.provinceId = provinceId;
            this.provinceObj.provinceName = this.cityArr[i].provinceName;
            this.cityVmList = this.cityArr[i].cityVmList;
            break;
          }
        }

      },
      /**
       * 日期转1字符串
       * @param date
       */
      formatDateToString (date){
        if(typeof date == 'object'){
          return Util.toFullDateString(date.getTime());
        }else{
          return date;
        }
      },
      /**
       * 获取省市
       * @returns {}
       */
      getCity(){
        Api.base_sys_location({})
          .then(res => {
            if (res.status) {
              this.cityArr = res.result;
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

      /**
       * 公用弹窗
       * @returns {}
       */
      openConfirm(obj,fun) {
        this.$confirm(obj.confirmCon, obj.confirmTitle, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            fun.call()
          })
      },
      /**
       * 删除
       * @returns {}
       */
      deletePrize(code){
        let _this= this;
        var fun = function(){
          Api.pd_activity_delete({activityCode:code})
            .then(res => {
              if (res.status) {
                _this.requestData();
              }else {

              }
            }).catch(err => {
            _this.$message({
              showClose: true,
              message: '数据请求失败！',
              type: 'error'
            });
          });
        }
        this.openConfirm({ confirmCon:'确认删除活动吗？', confirmTitle:'提示',successMsg:"删除成功"},fun);

      },
      /**
       * 修改
       * @returns {}
       */
      updatePrize(id){
        this.$router.push({name: 'marketing_prizeDraw_edit', params: {prizeDrawCode:id}})
      },

      /**
       * 新建活动点击
       * @returns {}
       */
      addActivity () {
        this.$router.push({name: 'marketing_prizeDraw_edit', params: {prizeDrawCode:'new'}})
      },


      /**
       * 选项卡点击事件触发
       * @returns {}
       */
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
        var reg = new RegExp("\\+","");
        var param = {}
        if (this.filterForm.activityName) {
          param.name = this.filterForm.activityName
        }
        if (this.filterForm.activityArea) {
          param.activityArea = this.filterForm.activityArea
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
        Api.pd_activity_list(p)
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
//        this.$refs['filterForm'].resetFields();
        this.filterForm = {
          activityName:'',//活动名称
          activityArea:'',//活动区域
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
        };
        this.searchFn();
      },
      ///查看链接
      couponLink(url){
        this.$refs.prizeDialog.showDialog(url);
      },
      ///结束活动
      endPrize(code){
        let _self=this;
        var fun = function(){
          Api.pd_activity_over({activityCode:code})
            .then(res => {
              if (res.status) {
                _self.requestData();
              }else {
                _self.$message({
                  showClose: true,
                  message: '只能结束进行中的活动!',
                  type: 'error'
                });
              }
            }).catch(err => {
            _self.$message({
              showClose: true,
              message: '数据请求失败！',
              type: 'error'
            });
          });
        }
        this.openConfirm({ confirmCon:'确认结束活动吗？', confirmTitle:'提示',successMsg:"结束活动成功"},fun)
      },
      //查看详情
      openDetail(code){
        this.$refs.prizeDetailDialog.showDialog(code);
      }

    }
  }
</script>
<style>

</style>

<style scoped="scope">

</style>
