<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
        <el-form :model="filterForm" ref="filterForm"  size="small" label-width="80px" class="demo-ruleForm" :label-position="labelPosition">
            <el-row>
              <el-col :span="12">
                <el-form-item label="活动名称:">
                  <el-input v-model="filterForm.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="活动日期:">
                    <el-col :span="11">
                        <el-date-picker style="width: 100%;" v-model="filterForm.beginTime" :editable="false" :picker-options="optionsActivityStart" type="datetime" placeholder="选择开始日期"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                        <el-date-picker style="width: 100%;" v-model="filterForm.endTime" :editable="false" :picker-options="optionsActivityEnd" type="datetime" placeholder="请输入结束日期"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12" style="padding-left:20px;">
                  <el-form-item label="创建日期:">
                    <el-col :span="11">
                      <el-date-picker style="width: 100%;" v-model="filterForm.createTime" :editable="false" :picker-options="optionsCreateStart" type="datetime" placeholder="选择开始日期"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                      <el-date-picker style="width: 100%;" v-model="filterForm.createTime2" :editable="false" :picker-options="optionsCreateEnd" type="datetime" placeholder="请输入结束日期"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
          <el-row>
            <el-col :span="12">
                <el-form-item label="活动区域:">
                  <el-col :span="11">
                    <template>
                      <el-select style="width: 100%;" v-model="filterForm.provinceObj.provinceId" placeholder="请选择省份" @change="checkProvince(filterForm.provinceObj.provinceId)">
                        <el-option
                          key=""
                          label="全国"
                          value=""
                        ></el-option>
                        <el-option
                          v-for="item in cityArr"
                          :key="item.provinceId"
                          :label="item.provinceName"
                          :value="item.provinceId">
                        </el-option>
                      </el-select>
                    </template>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <template>
                      <el-select style="width: 100%;" v-model="filterForm.provinceObj.cityId" placeholder="请选择城市" @change="checkCity(filterForm.provinceObj.cityId)">
                        <el-option
                          v-for="item in cityVmList"
                          :key="item.cityId"
                          :label="item.cityName"
                          :value="item.cityId">
                        </el-option>
                      </el-select>
                    </template>
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
        <el-col :span="20" style="position: relative;">
          <el-tabs type="card" @tab-click="changeActivityType">
            <el-tab-pane name="0" label="全部活动"></el-tab-pane>
            <el-tab-pane name="1" label=" 待上线 "></el-tab-pane>
            <el-tab-pane name="2" label=" 进行中 "></el-tab-pane>
            <el-tab-pane name="3" label=" 已结束 "></el-tab-pane>
          </el-tabs>
          <div v-if="isCar" style="width: 280px;height: 38px;position: absolute; top: -1px;right: 0;">
              <div class="coupon-char-rder" @click="sortCar('pv')">活动pv <span class="caret-wrapper">
                <i :class="['sort-caret', 'ascending', 'el-icon-caret-top','sort-top-coupon',{'sort-coupon-cl':this.sortStatus==1&&this.sortType==4}]"></i>
                <i :class="['sort-caret', 'descending','el-icon-caret-bottom', 'sort-bottom-coupon',{'sort-coupon-cl':this.sortStatus==2&&this.sortType==4}]"></i>
              </span></div>
              <div class="coupon-char-rder" @click="sortCar('couponGet')">领取数量
                <span class="caret-wrapper">
                  <i :class="['sort-caret', 'ascending', 'el-icon-caret-top','sort-top-coupon',{'sort-coupon-cl':this.sortStatus==1&&this.sortType==3}]"></i>
                <i :class="['sort-caret', 'descending','el-icon-caret-bottom', 'sort-bottom-coupon',{'sort-coupon-cl':this.sortStatus==2&&this.sortType==3}]"></i>
              </span>
              </div>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addActivity()" class="fr mr20 ">新建抵扣券活动</el-button>
        </el-col>
      </el-row>
      <div style="margin-bottom:15px;"><span class="totalTip">共找到以下<span style="padding:0 10px;color: #409eff">{{totalRow}}</span>条数据</span>
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
        :data="resData"
        style="width: 100%;"
        @sort-change="sortTable"
        v-if="!isCar"
      >
        <el-table-column
          prop="name"
          label="活动名称"
           min-width="150px"
          >
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="活动开始日期"
          sortable="custom"
          width="150px"
           >
          <template slot-scope="scope">
            <span v-html="formatterBr(scope.row.beginTime)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="活动结束日期"
          sortable="custom"
          width="150px"
          >
          <template slot-scope="scope">
            <span v-html="formatterBr(scope.row.endTime)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="couponGet"
          label="领取数量"
          width="130px"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="pvCount"
          label="活动pv"
          sortable="custom" min-width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          v-if="activityType==0"
           min-width="100">
          <template slot-scope="scope">
            {{Final.COUPON_STATUS[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          prop="createTime"
          width="150px"
          sortable="custom">
          <template slot-scope="scope">
            <span v-html="formatterBr(scope.row.createTime)"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180px">
            <template slot-scope="scope">
              <el-button type="text" @click="openDetail(scope.row.id)">查看</el-button>
              <el-button v-if="scope.row.status!=3" type="text" @click="updatePrize(scope.row.id)">编辑</el-button>
              <el-button type="text" v-if="scope.row.status==1" @click="deletePrize(scope.row.id)">删除</el-button>
              <el-button type="text" v-if="scope.row.status==2" @click="activeCouEnd(scope.row.id)">结束活动</el-button>
              <el-button type="text" @click="couponLink(scope.row.shareUrl)">活动链接</el-button>
            </template>
        </el-table-column>
      </el-table >
      <!--------------卡片------------>
      <div v-if="isCar">
        <el-row :gutter="20" >
          <el-col :xs="11" :sm="6" v-for="item in resData" style="margin-bottom:20px;">
            <div class="active-box" style="border: 1px solid #EFF0F5;border-radius: 6px;box-shadow: rgb(183, 183, 183) 0px 3px 4px;">
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
                <p>活动PV:{{item.pvCount}}</p>
                <p class="ah-title">已发放/总数量：<span style="color: #527EFE">{{item.couponGet}}/{{item.couponTotal}}</span></p>
                <p class="ah-title">剩余数量：<span>{{item.couponTotal-item.couponGet}}</span></p>
                <p class="ah-title">创建日期：<span>{{item.createTime}}</span></p>
                <p class="ah-notes">（此活动包含{{item.couponCount}}个抵扣券）</p>
                <a  class="more-txt" @click="openDetail(item.id)" style="font-size: 12px;">查看详情&gt;</a>
              </div>
              <div class="active-footer">
                <table>
                  <tr>
                    <td v-if="item.status!=3"><a href="javascript:void(0)" @click="updatePrize(item.id)">编辑</a></td>
                    <td v-if="item.status==1"><a href="javascript:void(0)" @click="deletePrize(item.id)">删除</a></td>
                    <td v-if="item.status==2"><a href="javascript:void(0)" @click="activeCouEnd(item.id)">结束活动</a></td>
                    <td><a href="javascript:void(0)"  @click="couponLink(item.shareUrl)"> 活动链接</a></td>

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
      </div>
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
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
  import Final from "../../../static/baseSetting/Final";
  import Api from "./../../fetch/api";
  import * as Util from "./../../util/util";
  import VTipMsg from "./../../components/tipMsg.vue";
  import TestData from "./../../util/TestData"
  import $ from "jquery"

  import VTreeview from "./../../components/treeview.vue";
  import VCouponLink from "./../../components/coupon_link.vue";
  export default {
    data() {
      return {
        isCar:false,//滑块
        optionsActivityStart :{
          disabledDate:(time) => {
              if(this.filterForm.endTime){
                let d = new Date (this.filterForm.endTime)
                return time.getTime() >d.getTime();
              }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.filterForm.beginTime){
              let d = new Date (this.filterForm.beginTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        optionsCreateStart : {
          disabledDate:(time) => {
            if(this.filterForm.createTime2){
              let d = new Date (this.filterForm.createTime2)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsCreateEnd : {
          disabledDate:(time) => {
            if(this.filterForm.createTime){
              let d = new Date (this.filterForm.createTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        Final:Final,
        filterForm: {
          name:"",
          beginTime:"",
          endTime:"",
          createTime:"",
          createTime2:"",
          provinceObj:{
            provinceName:'',
            provinceId:'',
            cityId:'',
            cityName:'',
          }

        },
        dataNumber:0,
        labelPosition:'left',
        activityType : 0,
        resData : [],
        currentPage: 1,
        totalRow: 0,
        pageRecorders: 10,
        Final: Final,
        cityArr:[],
        cityVmList:[],
        sortStatus:2,// 排序方式 1：正序 2：倒序
        sortType:5,// 排序字段 1：活动开始日期 2：活动结束日期 3：领取数量 4：活动PV 5：创建日期
      }
    },
    components: {
//      ElButton,
//      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VTreeview,
      VCouponLink
    },

    mounted () {
//      this.requestData();
//      this.getCity();
    },
    watch: {
      "$route": function (to, from) {

      }
    },
    beforeRouteEnter (to,from,next){
     // 列表使用Keep-alive 保持状态... 通过next 来初始化请求数据
      next(vm => {
        vm.requestData();
        vm.getCity();
      })
    },
    methods: {
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
      //
      formatterBr(cellValue){
        let arr = cellValue.split(" ");
        return arr[0]+'<br/>'+arr[1];
      },
      /**
       * table排序
       * @returns {}
       */
      sortTable(obj){
       if(obj.prop == 'beginTime'){
         this.sortType = 1
       }else if(obj.prop == 'endTime'){
         this.sortType = 2
       }else if(obj.prop == 'couponGet'){
         this.sortType = 3
       }else if(obj.prop == 'pvCount'){
         this.sortType = 4
       }else if(obj.prop == 'createTime'){
         this.sortType = 5
       }
        if(obj.order == 'descending'){
         this.sortStatus = 2
       }else{
         this.sortStatus = 1
       }
       this.requestData();
      },
      /**
       * 卡片排序
       * @returns {}
       */
      sortCar(val){
        (this.sortStatus == 1) ? this.sortStatus = 2 : this.sortStatus = 1;
        if(val == 'couponGet'){
          this.sortType = 3;
        }else if(val == 'pv') {
          this.sortType = 4
        }
        this.requestData();
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
       * 省市联动
       * @returns {}
       */
      checkProvince(provinceId){
        this.filterForm.provinceObj.cityName = "";
        for(var i = 0 ; i < this.cityArr.length; i++){
          if(this.cityArr[i].provinceId == provinceId){
            this.filterForm.provinceObj.provinceId = provinceId;
            this.filterForm.provinceObj.provinceName = this.cityArr[i].provinceName;
            this.cityVmList = this.cityArr[i].cityVmList;
            break;
          }
        }

      },
      checkCity(cityId){
        for(var i = 0 ; i < this.cityVmList.length; i++){
          if(this.cityVmList[i].cityId == cityId){
            this.filterForm.provinceObj.cityId = cityId;
            this.filterForm.provinceObj.cityName = this.cityVmList[i].cityName;
            break;
          }
        }
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
        this.$router.push({name: 'marketing_coupon_edit', params: {couponId: 'new'}})
      },
      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {}
        if (this.filterForm.name) {
          param.name = this.filterForm.name
        }
        if (this.filterForm.beginTime) {
          param.beginTime = this.formatDateToString(this.filterForm.beginTime);
        }
        if (this.filterForm.endTime) {
          param.endTime = this.formatDateToString(this.filterForm.endTime);
        }
        if (this.filterForm.createTime) {
          param.createTime = this.formatDateToString(this.filterForm.createTime);
        }
        if (this.filterForm.createTime2) {
          param.createTime2 = this.formatDateToString(this.filterForm.createTime2);
        }
        if (this.filterForm.provinceObj.provinceName) {
          param.areaNames = this.filterForm.provinceObj.provinceName
        }
        if (this.filterForm.provinceObj.cityName) {
          param.areaNames = this.filterForm.provinceObj.cityName
        }
        param.status = this.activityType;
        param.pageNo = this.currentPage;
        param.pageSize = this.pageRecorders;
        param.sortStatus = this.sortStatus;
        param.sortType = this.sortType
        return param;
      },
      /**
       * 数据初始化
       */
      requestData(){
        var p = this.getFilterParam();
        Api.cp_activity_list(p)
          .then(res => {
            if (res.status) {
              this.resData = res.result;
              this.totalRow = res.dataNumber;
            }else {
              this.resData = [];
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
       * 搜索
       */
      searchFn () {
        this.currentPage = 1;
        this.requestData();
      },
      /**
       * 重置表单
       */
      resetForm() {
        this.filterForm = {
          name: "",
          beginTime: "",
          endTime: "",
          createTime: "",
          createTime2: "",
          provinceObj: {
            provinceName: '',
            provinceId: '',
            cityId: '',
            cityName: '',
          }
        }
        this.searchFn();
      },
      /**
       * 选项卡点击事件触发
       * @returns {}
       */
      changeActivityType (tab, event){
        this.activityType = tab.name;
        if(tab.name == 0){
          this.sortType = 5
          this.sortStatus = 1
        }
        if(tab.name == 1){
          this.sortType = 1
          this.sortStatus = 1
        }
        if(tab.name == 2){
          this.sortType = 1
          this.sortStatus = 2
        }
        if(tab.name == 3){
          this.sortType = 2
          this.sortStatus = 2
        }
        this.currentPage = 1;
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
      openDetail (id){
        this.$router.push({name: 'marketing_coupon_detail', params: {couponId: id}})
        //this.$router.push("/coupon/datail/"+id)
      },
      //结束活动
      activeCouEnd(id){
        this.$confirm('确认结束该活动吗？','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            Api.cp_activity_stop({id:id})
              .then(res => {
                if (res.status) {
                  this.$message({
                    showClose: true,
                    message: '结束成功！',
                    type: 'success'
                  });
                  this.requestData();
                  this.currentPage = 1;
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
      ///删除活动
      deletePrize(id){
        this.$confirm('确认删除该活动吗？','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            Api.cp_activity_car_series_del({id:id})
              .then(res => {
                if (res.status) {
                  this.$message({
                    showClose: true,
                    message: '结束成功！',
                    type: 'success'
                  });
                  this.requestData();
                  this.currentPage = 1;
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
      //活动链接
      couponLink(url){
        this.$refs.couponDialog.showDialog(url);
      },
      ///编辑活动
      updatePrize(id){
        this.$router.push({name: 'marketing_coupon_edit', params: {couponId: id}})
      }



}
}
</script>

<style scoped="scope">
  .list_div el-tabs--top {
    display : none;
  }
  .list_div .totalTip {
    font-size: 14px;
    color: #8C94AC;
    letter-spacing: 0;
  }
.coupon-char-rder{
  float: right;
  width: 110px;
  line-height:38px;
  text-align: center;
  color: #404c73;
  background: #EFF0F6;
  margin-left:10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.coupon-char-rder i{
  color: #b4bccc;
  font-size: 15px;
}
.caret-wrapper {
  position: absolute;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
}
.sort-caret {
  color: #b4bccc;
  width: 14px;
  overflow: hidden;
  font-size: 15px;
  position: absolute;
  left: 4px;
}
  .sort-top-coupon{
    top:9px;
  }
  .sort-bottom-coupon{
    bottom:8px;
  }
  .sort-coupon-cl{
    color: #409EFF !important;
  }

</style>
