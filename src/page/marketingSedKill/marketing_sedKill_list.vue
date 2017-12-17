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
              <el-form-item label="活动区域:" class="ml10"  label-width="80px">
                <el-col :span="12">
                  <template>
                    <el-select v-model="filterForm.provinceObj.provinceId" placeholder="请选择省份" @change="checkProvince(filterForm.provinceObj.provinceId)">
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
                <el-col :span="12">
                  <template>
                    <el-select v-model="filterForm.provinceObj.cityId" placeholder="请选择城市" @change="checkCity(filterForm.provinceObj.cityId)">
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
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动时间:">
              <el-col :span="11">
                <el-date-picker style="width: 100%;" v-model="filterForm.activityStartDate" :editable="false" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate" :editable="false" :picker-options="optionsActivityEnd" type="date" placeholder="选择结束日期"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
              <el-form-item label="创建时间:">
                <el-col :span="11">
                  <el-date-picker style="width: 100%;" v-model="filterForm.createStartDate" :editable="false" :picker-options="optionsCreateStart" type="date" placeholder="选择开始日期"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center">-</el-col>
                <el-col :span="11">
                  <el-date-picker style="width: 100%;" v-model="filterForm.createEndDate" :editable="false" :picker-options="optionsCreateEnd" type="date" placeholder="选择结束日期"></el-date-picker>
                </el-col>
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
            <el-tab-pane name="1" label=" 已上架 "></el-tab-pane>
            <el-tab-pane name="2" label=" 已下架 "></el-tab-pane>
            <el-tab-pane name="3" label=" 已结束 "></el-tab-pane>
            <el-tab-pane name="4" label=" 已删除 "></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addActivity()" class="fr mr20 ">新建活动</el-button>
        </el-col>
      </el-row>
      <div style="margin-bottom:15px;"><span class="totalTip">共找到以下 <span style="padding:0 10px;color: #409eff">{{totalRow}}</span>条数据</span></div>
      <el-table class="table_min_height mt10" :data="resData" ref="singleTable">
        <el-table-column prop="name" label="活动名称" align="center" min-width="90" ></el-table-column>
        <el-table-column  label="活动时间" align="center" min-width="80"> <template scope="scope">{{getMoment(scope.row.beginTime)}}至<br/>{{getMoment(scope.row.endTime)}}</template></el-table-column>
        <el-table-column  align="center" label="创建时间"  min-width="100"><template scope="scope">{{getMoment(scope.row.createTime)}}</template></el-table-column>
        <el-table-column prop="enrollCount" align="center" label="领取数量"></el-table-column>
        <el-table-column prop="pvCount" align="center" label="活动pv"></el-table-column>
        <el-table-column prop="shareUrl" align="center" min-width="140" label="活动链接"></el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template scope="scope">
            <div>
              <el-button v-if="scope.row.status !=3 && scope.row.status !=4" @click="updateActivity(scope.row.id)" type="text" style="padding-top:0px;padding-bottom:0px;">编辑</el-button>
              <el-button v-if="scope.row.status ==2" @click="upActivity(scope.row.id)" type="text" style="padding-top:0px;padding-bottom:0px;">上架</el-button>
              <el-button v-if="scope.row.status ==1" @click="downActivity(scope.row.id)" type="text" style="padding-top:0px;padding-bottom:0px;">下架</el-button>
              <el-button v-if="scope.row.status ==2" @click="deleteActivity(scope.row.id)" type="text" style="padding-top:0px;padding-bottom:0px;">删除</el-button>
              <el-button v-if="scope.row.status ==3" @click="showPrizeUser(scope.row.id)" type="text" style="padding-top:0px;padding-bottom:0px;">中奖用户</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>

      <!-- 中奖用户弹出层 -->
      <div class="mask" style="z-index: 99;"></div>
      <div class="prize-pop" style="z-index: 100;">
        <!-- 关闭按钮 -->
        <div class="pop-close" @click="hidePrizeUser">
          <img src="./../../assets/images/pop-close.png" alt="">
        </div>
        <!-- 具体内容 -->
        <div class="prize-tit">中奖用户</div>
        <div class="pricontent">
          <div class="pricontent-txt fl" v-for="winArr in winningArr">
            <div class="pricontent-body">
              <ul class="namepeople">
                <li>
                  <p><em>用户姓名:</em><span>{{winArr.userName}}</span></p>
                </li>
                <li><p><em>手机号:</em><span>{{winArr.userPhone}}</span></p></li>
              </ul>
              <ul class="prizetxt">
                <li>
                  <p><em>秒杀券名称:</em><span>{{winArr.couponName}}</span></p>
                </li>
                <li><p><em>秒杀成功时间:</em><span>{{getMoment(winArr.seckillTime)}}</span></p></li>
                <li><p><em>有效时间:</em><span>{{getMoment(winArr.beginTime)}}至{{getMoment(winArr.beginTime)}}</span></p></li>
                <li><p><em>订单编号:</em><span>{{winArr.orderNum}}</span></p></li>
                <li><p><em>适用于:</em><span>{{winArr.carTypeName}}</span></p></li>
                <li v-if="!dealerListIsShow"><p><em>经销商名称:</em><span>{{winArr.ownerName}}</span><i @click="selectOwnerName(winArr.id)" class="el-icon-edit" style="margin-left:10px;cursor: pointer;"></i></p></li>
                <li v-if="dealerListIsShow"><em>修改经销商名称:</em>
                  <template>
                  <el-select v-model="winArr.activeDealerId" placeholder="请选择经销商" size="small" style="width: 175px;">
                    <el-option
                      v-for="dealer in dealerList"
                      :key="dealer.dealerId"
                      :label="dealer.dealerFullName"
                      :value="dealer.dealerId">
                    </el-option>
                  </el-select>
                </template>
                  <el-button size="mini" @click="updateDealer(winArr.id,winArr.activeDealerId)">保存</el-button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
          createEndDate:'',//活动创建结束时间
          activeStatus:0,//活动状态
          provinceObj:{
            provinceName:'',
            provinceId:'',
            cityId:'',
            cityName:'',


          }
        },
        activityType : 0,
        resData : [],
        currentPage: 1,
        totalRow: 0,
        pageRecorders: 10,
        Final: Final,
        cityArr:[],
        cityVmList:[],
        winningArr:[],
        dealerList:[],
        dealerListIsShow:false,
      }
    },
    components: {
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
    },
    mounted () {
      this.requestData();
      this.getCity();
    },
    watch: {
    },
    methods: {
      /**
       * 修改经销商
       * @param params
       * @returns {*}
       */
      updateDealer(activeOwnerId,activeDealerId){
        Api.sk_activity_update_dealer({id:activeOwnerId,dealerId:activeDealerId})
          .then(res => {
            if (res.status) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: 'success'
              });
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
       * 获取经销商列表
       * @returns {}
       */
      selectOwnerName(id){
        this.dealerListIsShow = true;
        Api.sk_activity_dealer_list({id:id})
          .then(res => {
            if (res.status) {
              this.dealerList = res.result;
            }else {
              this.dealerList = [];
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
       * 格式化时间
       * @returns {}
       */
      getMoment(val){
        return this.$moment(val).format('YYYY-MM-DD');
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
      /**
       * 上架，下架，删除公用方法
       * @returns {}
       */
      publicFun(dataId,statusId,msg){
        this.$confirm(msg,'提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            Api.sk_activity_update_status({id:dataId,status:statusId}).then(res => {
              if (res.status) {
                this.currentPage = 1;
                this.requestData();
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
      /**
       *编辑活动点击
       * @returns {}
       */
      updateActivity(id){
        this.$router.push({name: 'marketing_sedKill_edit', params: {sedKillId:id}})
      },
      /**
       * 新建活动点击
       * @returns {}
       */
      addActivity () {
        this.$router.push({name: 'marketing_sedKill_edit', params: {sedKillId:'new'}})
      },
      /**
       * 已上架
       * @returns {}
       */
      upActivity (id) {
        this.publicFun(id,1,'确定要上架吗？')
      },
      /**
       * 已下架
       * @returns {}
       */
      downActivity (id) {
        this.publicFun(id,2,'确定要下架吗？')
      },
      /**
       * 显示中奖纪录
       * @returns {}
       */
      showPrizeUser (id) {

        Api.sk_activity_winning_list({id:id}).then(res => {
          if (res.status) {
            this.winningArr = res.result;
            for(var i = 0 ;i < this.winningArr.length; i++){
              this.winningArr[i].activeDealerId = '';
            }
            $('.prize-pop,.mask').show();
          }else {
            this.winningArr= []
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
       * 关闭中奖纪录
       * @returns {}
       */
      hidePrizeUser () {
        this.dealerListIsShow = false;
        $('.prize-pop,.mask').hide();
        return;
      },
      /**
       * 删除点击
       * @returns {}
       */
      deleteActivity (id) {
        this.publicFun(id,4,'确定要删除吗？')
      },

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
        if (this.filterForm.activityName) {
          param.name = this.filterForm.activityName
        }
        if (this.filterForm.provinceObj.provinceName) {
          param.areaNames = this.filterForm.provinceObj.provinceName
        }
        if (this.filterForm.provinceObj.cityName) {
          param.areaNames = this.filterForm.provinceObj.cityName
        }
        if (this.filterForm.activityStartDate) {
          param.beginTime = Util.toDateString(this.filterForm.activityStartDate.getTime());
        }
        if (this.filterForm.activityEndDate) {
          param.endTime = Util.toDateString(this.filterForm.activityEndDate.getTime());
        }
        if (this.filterForm.createStartDate) {
          param.createBeginTime = Util.toDateString(this.filterForm.createStartDate.getTime());
        }
        if (this.filterForm.createEndDate) {
          param.createEndTime = Util.toDateString(this.filterForm.createEndDate.getTime());
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
        Api.sk_activity_list(p)
          .then(res => {
            if (res.status) {
              this.resData = res.result;
              this.totalRow = res.dataNumber;
            }else {
              this.resData =[];
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
        this.filterForm={
          activityName:'',//活动名称
            activityArea:'',//活动区域
            activityStartDate:'',//活动开始时间
            activityEndDate:'', //活动结束时间
            createStartDate:'',//活动创建开始时间
            createEndDate:'',//活动创建结束时间
            provinceObj:{
              provinceName:'',
              provinceId:'',
              cityId:'',
              cityName:'',


            }
        }
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
</style>

<style scoped="scope">

</style>
