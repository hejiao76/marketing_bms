<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="120px" >
        <el-row>
          <el-col :span="11">
          <el-form-item label="活动名称:" prop="activityName" >
            <el-input   v-model="filterForm.orderNum" placeholder="请输入订单编号"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="活动名称:" prop="activityName">
              <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">

          </el-col>
          <el-col :span="11">
              <el-row>
                <el-form-item label="创建时间:">
                  <el-col :span="11">
                    <el-date-picker v-model="filterForm.createStartDate" :picker-options="optionsCreateStart" type="date" placeholder="选择创建开始日期"></el-date-picker>
                  </el-col>
                  <el-col class="line ml5" :span="1" style="text-align: center;width:30px;">-</el-col>
                  <el-col :span="11">
                    <el-date-picker v-model="filterForm.createEndDate" :picker-options="optionsCreateEnd" type="date" placeholder="选择创建结束日期"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div>
              <el-form-item label="客户手机:" prop="activityName">
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
    <div class="list_div">
      <el-row>
        <el-col :span="30">
          <el-tabs type="card" @tab-click="changeActivityType">
            <el-tab-pane name="0" label="全部订单"></el-tab-pane>
            <el-tab-pane name="1" label="待支付"></el-tab-pane>
            <el-tab-pane name="2" label="支付完成"></el-tab-pane>
            <el-tab-pane name="3" label="已取消"></el-tab-pane>
            <el-tab-pane name="4" label="退款中"></el-tab-pane>
            <el-tab-pane name="5" label="退款完成"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <div><span class="totalTip">共找到以下10条数据</span></div>
       <div>
         <el-table
           ref="multipleTable"
           :data="tableData3"
           tooltip-effect="dark"
           style="width: 100%"
           @selection-change="handleSelectionChange">
           <el-table-column
             type="selection"
             width="55">
           </el-table-column>
           <el-table-column
             label="活动名称"
             width="350">
             <template slot-scope="scope">{{ scope.row.oderName }}</template>
           </el-table-column>
           <el-table-column
             label="订单状态"
             prop="oderStatus"
             width="150">
           </el-table-column>
           <el-table-column
             label="客户姓名"
             prop="userName"
             width="150">
           </el-table-column>
           <el-table-column
             label="客户手机号"
             prop="userPhone"
             width="150">
           </el-table-column>
           <el-table-column
             prop="payAmount"
             label="秒杀支付金额"
             width="150">
           </el-table-column>
           <el-table-column
             label="操作"
             show-overflow-tooltip>
             <template slot-scope="scope"><el-button
               size="mini"
               @click="chekcOder()">查看详情</el-button>
             </template>
           </el-table-column>
         </el-table>
       </div>
      <!--<span class="demonstration">完整功能</span>-->
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
  import ElRow from "element-ui/packages/row/src/row";
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
          activityArea:'',//活动区域
          createStartDate:'',//活动创建开始时间
          createEndDate:'',//活动创建结束时间
          orderNum:'',//订单编号
          userName:'',//客户姓名
          phoneNum:''//客户手机
        },
        activityType : 0,
        resData : [],
        currentPage: 1,
        totalRow: 0,
        pageRecorders: 10,
        Final: Final,
        /////列表测试数据
        tableData3: [{
            oderNum:'1234556',
            orderCreatTime:'2017-10-01',
            oderName:'500元购车优惠券500元购车优惠券',
            oderStatus:'已支付',
            userName:'阿娇',
            userPhone:'010101001',
            payAmount:'23123'
        }, ],
        multipleSelection: []
      }
    },
    components: {
      ElRow,
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
        if (this.filterForm.createStartDate) {
          param.createStartDate = Util.toDateString(this.filterForm.createStartDate.getTime());
        }
        if (this.filterForm.createEndDate) {
          param.createEndDate = Util.toDateString(this.filterForm.createEndDate.getTime());
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
      },
      /**
       * 列表
       */
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /**
       * 查看订单详情
       */
      chekcOder(){
        console.log('开发中！');
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
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: none;
    z-index: 9000;
    background-color: rgba(0,0,0,.6)
  }
  .prize-pop {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 13000;
    margin-top: -320px;
    margin-left: -490px;
    width: 980px;
    height: 640px;
    background: url(./../../assets/images/zjyh_bg.png) no-repeat
  }
  .prize-pop .pop-close {
    top: 130px;
    right: 95px;
    width: 23px;
    height: 24px;
    cursor: pointer
  }
  .prize-pop .prize-tit {
    width: 100%;
    height: auto;
    margin-top: 130px;
    font-size: 36px;
    color: #e63834;
    font-weight: 600;
    line-height: 40px;
    text-align: center
  }
  .prize-pop .pricontent {
    width: 100%;
    margin: 10px 0 0 30px;
    height: 310px;
    overflow-x: hidden;
    overflow-y: auto
  }
  .prize-pop .pricontent .pricontent-txt {
    width: 400px;
    border: 1px solid #f5efd7;
    background: #fffcee;
    margin: 0 20px 20px 0
  }
  .prize-pop .pricontent .pricontent-txt.fl {
    float: left;
    display: inline-block
  }
  .prize-pop .pricontent .pricontent-txt.fr {
    float: right;
    display: inline-block
  }
  .prize-pop .pricontent .pricontent-txt .pricontent-body {
    padding: 20px 20px 0
  }
  .prize-pop .pricontent .pricontent-txt .pricontent-body ul {
    width: 100%;
    overflow: hidden
  }
  .prize-pop .pricontent .pricontent-txt .pricontent-body ul.namepeople {
    border-bottom: 1px solid #f5efd7
  }
  .prize-pop .pricontent .pricontent-txt .pricontent-body ul.prizetxt {
    margin-top: 20px
  }
  .prize-pop .pricontent .pricontent-txt .pricontent-body ul li {
    font-size: 14px;
    color: #ba8305;
    margin-bottom: 10px
  }
  .prize-pop .pricontent .pricontent-txt .pricontent-body ul li p {
    width: 100%;
    overflow: hidden
  }
  .prize-pop .pricontent .pricontent-txt .pricontent-body ul li p em {
    width: 100px;
    float: left
  }
  .prize-pop .pricontent .pricontent-txt .pricontent-body ul li p span {
    float: right;
    margin-left: 10px
  }
</style>
