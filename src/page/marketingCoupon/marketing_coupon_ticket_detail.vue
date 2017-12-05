<template>
  <div class="con_list">
    <div class="filter_div mb20">
      <el-form :model="activityInfo"  size="small" ref="ruleForm" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-row>
          <el-col :span="6">
            <el-form-item label="抵扣券名称：">
              <div>{{activityInfo.activityName}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期：">
              <div> {{activityInfo.startTime}}-{{activityInfo.endTime}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="抵扣金额：">
              <div>1000</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="抵扣券类型：">
            <div>抵扣车款 其他权益</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="绑定车系：">
            <div>吉利博越</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="参与活动：">
            <div>金秋十月 豪礼</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="简介：">
            <div>抵扣券简介</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="抵扣券说明：">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分享图片：">
              <img src="../../assets/images/img01.jpg" alt="" style="width: 130px;height: 130px;">
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
      <div style="overflow: auto;">
        <div class="saleticket-list colorsaletickstyle ">
          <div class="saleticket-list_header">
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
        <div class="saleticket-list colorsaletickstyle ">
          <div class="saleticket-list_header">
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
        <div class="saleticket-list colorsaletickstyle ">
          <div class="saleticket-list_header">
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
        <div class="saleticket-list colorsaletickstyle ">
          <div class="saleticket-list_header">
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
        <div class="saleticket-list colorsaletickstyle ">
          <div class="saleticket-list_header">
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
        activityInfo:{
          activityName:'金秋十月',
          startTime:'2017-10-10',
          endTime:'2017-10-11',
          city:['北京','上海','沈阳'],
          ticketArr:[1,2,3,4,5]
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
    created (){

    },
    mounted (){

    },
    watch : {

    },
    methods : {

    }
  }
</script>
<style>

</style>
