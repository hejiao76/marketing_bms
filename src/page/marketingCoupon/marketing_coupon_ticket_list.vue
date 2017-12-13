<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"   size="small" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-row :gutter="20">
          <el-col :span="12">
          <el-form-item label="抵扣券名称：">
            <el-input v-model="filterForm.name"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="12">
          <el-form-item label="抵扣券类型：">
            <el-select v-model="filterForm.activeOption" placeholder="请选择">
              <el-option
                v-for="item in filterForm.ticketType"
                :key="item.label"
                :label="item.value"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="绑定车系：">
              <el-select v-model="filterForm.serialIds" placeholder="请选择" style="width: 100%;">
                <el-option
                  key=""
                  label="全部车系"
                  value=""
                ></el-option>
                <el-option
                  v-for="item in carArr"
                  :key="item.id"
                  :label="item.brandName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参与名称：">
              <el-input v-model="filterForm.activityName"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="活动日期:">
              <el-col :span="11">
                <el-form-item >
                  <el-date-picker style="width: 100%;" v-model="filterForm.validity" :editable="false" :picker-options="optionsActivityStart" type="datetime"  placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.validity2" :editable="false" :picker-options="optionsActivityEnd"  type="datetime" placeholder="选择结束日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期:">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.createTime" :editable="false" :picker-options="optionsCreateStart" type="datetime" placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.createTime2" :editable="false" :picker-options="optionsCreateEnd" type="datetime" placeholder="选择结束日期"></el-date-picker>
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
                  <el-input-number v-model="filterForm.amount" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-input-number v-model="filterForm.amount2" :controls="false"></el-input-number>
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
            <el-tab-pane name="0" val="1" label="有效"></el-tab-pane>
            <el-tab-pane name="1" val="0" label="失效"></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addActivity" class="fr mr20 ">添加抵扣券</el-button>
        </el-col>
      </el-row>
      <div style="margin-bottom:15px;"><span class="totalTip">共找到以下 <span style="padding:0 10px;color: #409eff">{{dataNumber}}</span>条数据</span>
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
        style="width: 100%"
        @sort-change="sortTable"
        v-if="!isCar"
      >
        <el-table-column
          prop="name"
          label="抵扣券名称"
          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="抵扣类型"
           width="100">
          <template slot-scope="scope">
            <span>{{Final.COUPON_TYPE[scope.row.serialType]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="抵扣金额"
          sortable="custom"
          >
        </el-table-column>
        <el-table-column
          prop="dealersName"
          label="绑定车系"
          >
        </el-table-column>
        <el-table-column
          label="有效期"
          prop="validity"
          sortable="custom">
          <template slot-scope="scope">
            <span v-html="formatterBr(scope.row.validity)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="activityList"
          label="参与活动"
           >
          <template slot-scope="scope">
            <span v-for="item in scope.row.activityList">{{item.name}},</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          prop="createTime"
          sortable="custom" >
          <template slot-scope="scope">
            <span v-html="formatterBr(scope.row.createTime)"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetail(scope.row.id)">查看</el-button>
            <el-button v-if="scope.row.status==1" type="text" @click="activeUpdate(scope.row.id)">编辑</el-button>
            <el-button v-if="scope.row.status==1" type="text" @click="checkTicketType(scope.row.id)">抵扣类型</el-button>
            <el-button v-if="scope.row.status==1" type="text" @click="checkCar(scope.row.id)">绑定车型</el-button>
            <el-button type="text" @click="activeCopy(scope.row.id)">复制</el-button>
            <el-button v-if="scope.row.status==1" type="text" @click="activeDisabled(scope.row.id)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table >
      <!--------------卡片------------>
      <div v-if="isCar">
        <el-row :gutter="10" >
          <el-col  :xs="12" :sm="12" :md="8" :lg="8" :xl="6" v-for="item in resData" style="margin-bottom:20px;">
            <div class="saleticket-list" v-bind:class="{ graysaletickstyle: item.status==0 }">
              <div class="saleticket-list_header" >
                <p>{{item.name}}</p>
                <span>有效日期：{{item.validity}}</span>
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
                      <span>{{item.serialType}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      抵扣金额(元)：
                    </div>
                    <div class="sal-con_txt">
                      <span>{{item.amount}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      绑定车系：
                    </div>
                    <div class="sal-con_txt">
                      <span>{{item.serialName}}</span>
                    </div>
                  </li>
                  <li>
                    <el-button type="text">此抵扣券参与{{item.activityCount}}个活动</el-button>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      创建日期：
                    </div>
                    <div class="sal-con_txt">
                      <span>{{item.createTime}}</span>
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
                    <td v-if="item.status==1"><a href="javascript:void(0);" @click="activeUpdate(item.id)">编辑</a></td>
                    <td><a href="javascript:void(0);" @click="activeCopy(item.id)">复制</a></td>
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
        tableData:TestData.prize_list,
        isCar:false,//滑块
        optionsActivityStart :{
          disabledDate:(time) => {
            if(this.filterForm.validity2){
              let d = new Date (this.filterForm.validity2)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.filterForm.validity){
              let d = new Date (this.filterForm.validity)
              return time.getTime() < d.getTime();
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
        filterForm: {
          name　:'',//抵扣券名称
          activityName:'',//活动名称
          activeBandCar:'',//绑定车系
          validity:"", //有效期
          validity2:"",
          createTime:"", //创建日期
          createTime2:"",
          ticketType:[{value:'全部',label:'0'},{value:'抵扣车款',label:'1'},{value:'其他权益',label:'2'},{value:'抵扣车款和其他权益',label:'3'}],//抵扣券类型
          activeOption :'',//选择完成抵扣券类型
          amount:'',//抵扣最大金额
          amount2:'',//抵扣最小金额
          serialIds:'',
        },
        labelPosition:'left',
        activityType : 1,
        resData : [],
        carArr:[],
        currentPage: 1,//当前页
        totalRow: 20,//总页数
        pageRecorders: 10,
        Final: Final,
        activeStatus:true,
        sortStatus:1,// 排序方式 1：正序 2：倒序
        sortType:2,// 排序字段 1：活动开始日期 2：活动结束日期 3：领取数量 4：活动PV 5：创建日期
        dataNumber:0,
        carArr:[],
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
       this.gatCars();
    },
    watch: {

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
      /**
       * 获取车系
       * @returns
       */
      gatCars(){
        Api.base_sys_car_serials({})
          .then(res => {
            this.carArr = res.result;
          }).catch(err => {
          this.$message({
            showClose: true,
            message: '数据请求失败！',
            type: 'error'
          });
        });
      },
      /**
       * 截取时间
       * @returns
       */
      formatterBr(cellValue){
        let arr = cellValue.split(" ");
        return arr[0]+'<br/>'+arr[1];
      },
      /**
       * table排序
       * @returns
       */
      sortTable(obj){
        if(obj.prop == 'amount'){
          this.sortType = 1
        }else if(obj.prop == 'validity'){
          this.sortType = 2
        }else if(obj.prop == 'createTime'){
          this.sortType = 3
        }
        if(obj.order == 'descending'){
          this.sortStatus = 2
        }else{
          this.sortStatus = 1
        }
        this.requestData();
      },
      /**
       * 数据初始化
       * @returns
       */
      requestData(){
        var p = this.getFilterParam();
        Api.cp_activity_coupon_list(p)
          .then(res => {
            if (res.status) {
              this.resData = res.result;
              this.totalRow = res.dataNumber;
              this.dataNumber = res.dataNumber;
            }else {
              this.resData = [];
              this.currentPage = 0;
              this.totalRow = 0;
              this.dataNumber = 0;
            }
          }).catch(err => {
            console.log(err);
          this.$message({
            showClose: true,
            message: '数据请求失败！',
            type: 'error'
          });
        });
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
        this.$router.push({name: 'marketing_coupon_ticket_edit', params: {ticketId:'new'}})
      },
      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {}
        if (this.filterForm.activityName) {
          param.activityName = this.filterForm.activityName
        }
        if (this.filterForm.name) {
          param.name = this.filterForm.name
        }
        if (this.filterForm.amount) {
          param.amount = this.filterForm.amount
        }
        if (this.filterForm.amount2) {
          param.amount2 = this.filterForm.amount2
        }
        if (this.filterForm.activeOption) {
          param.serialType = this.filterForm.activeOption
        }
        if (this.filterForm.serialIds) {
          param.serialIds = this.filterForm.serialIds
        }
        if (this.filterForm.validity) {
          param.validity = this.formatDateToString(this.filterForm.validity);
        }
        if (this.filterForm.validity2) {
          param.validity2 = this.formatDateToString(this.filterForm.validity2);
        }
        if (this.filterForm.createTime) {
          param.createTime = this.formatDateToString(this.filterForm.createTime);
        }
        if (this.filterForm.createTime2) {
          param.createTime2 = this.formatDateToString(this.filterForm.createTime2);
        }
        param.pageNo = this.currentPage;
        param.pageSize = this.pageRecorders;
        param.sortStatus = this.sortStatus;
        param.sortType = this.sortType;
        param.status = this.activityType;

        console.log("查询提交参数:",param);
        return param;
      },
      /**
       * 搜索
       */
      searchFn () {
          if(this.filterForm.amount > this.filterForm.amount2){
            this.$message({
              showClose: true,
              message: '抵扣金额输入错误！',
              type: 'error'
            });
            return false;
          } else{
          this.currentPage = 1;
          this.requestData();
        }

      },
      /**
       * 重置表单
       */
      resetForm() {
        this.filterForm= {
            name　:'',//抵扣券名称
            activityName:'',//活动名称
            activeBandCar:'',//绑定车系
            validity:"", //有效期
            validity2:"",
            createTime:"", //创建日期
            createTime2:"",
            ticketType:[{value:'全部',label:'0'},{value:'抵扣车款',label:'1'},{value:'其他权益',label:'2'},{value:'抵扣车款和其他权益',label:'3'}],//抵扣券类型
            activeOption :'',//选择完成抵扣券类型
            amount:'',//抵扣最大金额
            amount2:'',//抵扣最小金额
        }
        this.searchFn();
      },
      /**
       * 选项卡点击事件触发
       * @returns {}
       */
      changeActivityType (tab, event){
        this.activityType = tab.$attrs.val;
        this.sortType = 2
        if(tab.$attrs.val == 0){
          this.sortStatus = 2
        }
        if(tab.$attrs.val == 1){
          this.sortStatus = 1
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
      toDetail (companyInfoId){
          this.$router.push({name: 'marketing_coupon_ticket_detail', params: {ticketId: companyInfoId}})
      },
      //复制抵扣券
      activeCopy(companyInfoId){
        this.$router.push({name: 'marketing_coupon_ticket_copy', params: {type:'copy',ticketId: companyInfoId}})
      },
      //编辑抵扣券
      activeUpdate(companyInfoId){
        this.$router.push({name: 'marketing_coupon_ticket_edit', params: {ticketId: companyInfoId}})
      },
      //禁用抵扣券
      activeDisabled(id){
        Api.cp_activity_coupon_forbidden({id:id})
          .then(res => {
            if (res.status) {
              this.currentPage = 1;
              this.requestData();
            }else {
              this.resData = [];
              this.currentPage = 0;
              this.totalRow = 0;
              this.dataNumber = 0;
            }
          }).catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: '数据请求失败！',
            type: 'error'
          });
        });
      },
      //修改抵扣券类型
      checkTicketType(companyInfoId){
        this.$router.push({name: 'marketing_coupon_ticket_edit', params: {type:'type',ticketId: companyInfoId}})
      },
      //修改绑定车型
      checkCar(companyInfoId){
        this.$router.push({name: 'marketing_coupon_ticket_edit', params: {type:'series',ticketId: companyInfoId}})
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
