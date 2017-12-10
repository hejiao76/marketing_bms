<template>
  <div class="con_list">
    <div class="filter_div mb20">
      <el-form :model="activityInfo"  size="small" ref="ruleForm" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-row>
          <el-col :span="6">
            <el-form-item label="抵扣券名称：">
              <div>{{activityInfo.name}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期：">
              <div> {{activityInfo.validity}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="抵扣金额：">
              <div>{{activityInfo.amount}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="抵扣券类型：">
            <div>{{Final.COUPON_TYPE[activityInfo.serialType]}}</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="绑定车系：">
            <div><span>{{activityInfo.serialName}}</span></div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="参与活动：">
            <div><div><span v-for="item in activityInfo.activityList">{{item.name}},</span></div></div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="简介：">
            <div>{{activityInfo.description}}</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="抵扣券说明：">
              <div v-html="activityInfo.details"></div>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">-->
            <!--<el-form-item label="分享图片：">-->
              <!--<img src="../../assets/images/img01.jpg" alt="" style="width: 130px;height: 130px;">-->
            <!--</el-form-item>-->
          <!--</el-col>-->

        </el-row>
      <div style="overflow: auto;">
        <div class="saleticket-list colorsaletickstyle " v-if="activityInfo.serialType!=1">
          <div class="saleticket-list_header">
            <p>抵扣券名称：{{activityInfo.gift.giftGroupName}}</p>
            <span>有效期：{{activityInfo.gift.effectiveDate}}</span>
            <div class="headericon">
              <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
              <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
            </div>
          </div>
          <div class="saleticket-content">
            <ul>
              <li v-for="item in activityInfo.gift.giftInfoList">
                <div class="sal-con-tit">
                  {{item.giftName}}:
                </div>
                <div class="sal-con_txt">
                  <span>¥1{{item.giftPrice}}X{{item.giftCount}}</span>
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
                <td>345<em>(礼包金额)</em></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="saleticket-list colorsaletickstyle ">
          <div class="saleticket-list_header">
            <p>名称</p>
            <span>失效时间</span>
            <div class="headericon">
              <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
              <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
            </div>
          </div>
          <div class="saleticket-content">
            <ul>
              <li>
                <div class="sal-con-tit">
                  加油卡：
                </div>
                <div class="sal-con_txt">
                  <span>¥100X2</span>
                </div>
              </li>
              <li>
                <div class="sal-con-tit">
                  雨伞：
                </div>
                <div class="sal-con_txt">
                  <span>¥100X2</span>
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
                <td>345<em>(礼包金额)</em></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
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
        Final:Final,
        activityInfo:{
          area:[],
          gift:{},
        }
      }
    },
    components :{
      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
    },
    mounted (){
      this.activeId = this.$route.params.ticketId;
      this.requestData();
    },
    watch : {

    },
    methods : {
      /**
       * 数据初始化
       */
      requestData(){
        Api.cp_activity_coupon_info({id:this.activeId})
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
