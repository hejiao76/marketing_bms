<template>
  <div class="con_list">
    <div class="filter_div mb20">
      <el-form :model="activityInfo"  size="small" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
        <el-row>
          <el-col :span="16">
            <el-form-item label="活动名称：">
              <div style="width: 70%;">{{activityInfo.name}}</div>
            </el-form-item>
            <el-form-item label="活动日期：">
              <div  style="width: 70%;">{{activityInfo.beginTime}}至{{activityInfo.endTime}}</div>
            </el-form-item>
            <el-form-item label="活动地区：">
              <div  style="width: 70%;"><span v-for="item in activityInfo.area.list">{{item.city}}&nbsp;&nbsp;,</span></div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分享图片：">
              <img :src="activityInfo.shareImg" alt="" style="width: 130px;height: 130px;">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="抵扣券：">
          </el-form-item>
          <div v-for="item in activityInfo.couponList" class="saleticket-list">
            <div class="saleticket-list_header">
              <p>{{item.name}}</p>
              <span>有效日期：{{item.createTime}}至{{item.validity}}</span>
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
                    <span>{{Final.COUPON_TYPE[item.serialType]}}</span>
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
                    <span v-if="item.serialType == 1">全车系</span>
                    <span v-if="item.serialType == 2">{{item.serialName}}</span>
                  </div>
                </li>
                <li>
                  <div class="sal-con-tit">
                    抵扣券数量：
                  </div>
                  <div class="sal-con_txt">
                    {{item.maxCount}}
                  </div>
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
            </div>
          </div>
        </el-row>
      </el-form>

    </div>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>

</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import * as util from "./../../util/util"
  import Api from "./../../fetch/api";
  import VTipMsg from "./../../components/tipMsg.vue";
  import TestData from "./../../util/TestData"
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data() {
      return {
        labelPosition:'left',
        activeId:'',
        Final:Final,
        activityInfo:{
          area:[]
        }
      }
    },
    components :{
      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      Final
    },
    mounted (){
       this.activeId = this.$route.params.couponId;
       this.requestData();
    },
    watch : {

    },
    methods : {
      /**
       * 数据初始化
       */
      requestData(){
        Api.cp_activity_detail({id:this.activeId})
          .then(res => {
            if (res.status) {
              this.activityInfo = res.result;
            }else {
              this.activityInfo = '';
            }
          }).catch(err => {
          this.$message({
            showClose: true,
            message: '数据请求失败！',
            type: 'error'
          });
        });
      },
    }
  }
</script>
<style>

</style>
