<template>

  <div class="con_list">
    <el-row class="s-f-back" style="line-height:36px;">
      <el-col :span="24" style="text-align:right;">
        <el-button v-if="showCheckLog==1" @click="changeShowCheckLog" type="info">查看审批轨迹</el-button>
        <el-button v-else @click="changeShowCheckLog" type="info">收起审批轨迹</el-button>
      </el-col>
    </el-row>
    <el-row  v-bind:class="['s-f-back','mt10',showCheckLog == 1 ? 'show-check-log': 'hide-check-log']" style="line-height:36px;">
      <el-col :span="24" >
        <el-table class="selfTable"  :data="checkLogs"  ref="singleTable" border highlight-current-row max-height="250">
          <el-table-column align="center" type="index" label="" width="60"></el-table-column>
          <el-table-column prop="auditUserName" label="审核人姓名" align="center" width="180"></el-table-column>
          <el-table-column prop="auditLoginName" label="审核人登录名" align="center" width="180"></el-table-column>
          <el-table-column prop="auditTime" align="center" label="审核时间" width="180" v-bind:formatter="driver_check_allTime"></el-table-column>
          <el-table-column prop="status" align="center" label="状态" v-bind:formatter="driver_check_allStatus"></el-table-column>
          <el-table-column prop="advice"  label="审核意见" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <table class="page_m" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td class="page_m_a">
          <span class="bold">姓名：</span><span>{{this.driverInfo.name}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.nameErrorMsg" @click="objectDataTest('nameErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.nameErrorMsg"  @click="tipMsgRemove('nameErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.nameErrorMsg" ref="nameErrorMsg" v-model="dataObj.nameErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('nameErrorMsg')" @blur="handleInputConfirm('nameErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.nameErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('nameErrorMsg')">{{this.dataObj.nameErrorMsg}}</span>
            </span>
            <span v-if="btnObj.nameErrorMsg && !dataObj.nameErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">司机手机号：</span><span>{{this.driverInfo.userPhone}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.userPhoneErrorMsg" @click="objectDataTest('userPhoneErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.userPhoneErrorMsg"  @click="tipMsgRemove('userPhoneErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.userPhoneErrorMsg" ref="userPhoneErrorMsg" v-model="dataObj.userPhoneErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('userPhoneErrorMsg')" @blur="handleInputConfirm('userPhoneErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.userPhoneErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('userPhoneErrorMsg')">{{this.dataObj.userPhoneErrorMsg}}</span>
            </span>
            <span v-if="btnObj.userPhoneErrorMsg && !dataObj.userPhoneErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">驾驶证号：</span><span>{{this.driverInfo.driverLicenseNum}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.driverLicenseNumErrorMsg" @click="objectDataTest('driverLicenseNumErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.driverLicenseNumErrorMsg"  @click="tipMsgRemove('driverLicenseNumErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.driverLicenseNumErrorMsg" ref="driverLicenseNumErrorMsg" v-model="dataObj.driverLicenseNumErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('driverLicenseNumErrorMsg')" @blur="handleInputConfirm('driverLicenseNumErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.driverLicenseNumErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('driverLicenseNumErrorMsg')">{{this.dataObj.driverLicenseNumErrorMsg}}</span>
            </span>
            <span v-if="btnObj.driverLicenseNumErrorMsg && !dataObj.driverLicenseNumErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">驾驶证主页照片：</span><span></span>
          <p class="tc card_sfz">
            <img  v-on:click="showBigImg(Final.IMGURL+driverInfo.driverLicenseImg1)" v-bind:src="Final.IMGURL+driverInfo.driverLicenseImg1" class=""/>
          </p>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.driverLicenseImg1ErrorMsg" @click="objectDataTest('driverLicenseImg1ErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.driverLicenseImg1ErrorMsg"  @click="tipMsgRemove('driverLicenseImg1ErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.driverLicenseImg1ErrorMsg" ref="driverLicenseImg1ErrorMsg" v-model="dataObj.driverLicenseImg1ErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('driverLicenseImg1ErrorMsg')" @blur="handleInputConfirm('driverLicenseImg1ErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.driverLicenseImg1ErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('driverLicenseImg1ErrorMsg')">{{this.dataObj.driverLicenseImg1ErrorMsg}}</span>
            </span>
            <span v-if="btnObj.driverLicenseImg1ErrorMsg && !dataObj.driverLicenseImg1ErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">驾驶证副页照片：</span><span></span>
          <p class="tc card_sfz">
            <img  v-on:click="showBigImg(Final.IMGURL+driverInfo.driverLicenseImg2)" v-bind:src="Final.IMGURL+driverInfo.driverLicenseImg2" class=""/>
          </p>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.driverLicenseImg2ErrorMsg" @click="objectDataTest('driverLicenseImg2ErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.driverLicenseImg2ErrorMsg"  @click="tipMsgRemove('driverLicenseImg2ErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.driverLicenseImg2ErrorMsg" ref="driverLicenseImg2ErrorMsg" v-model="dataObj.driverLicenseImg2ErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('driverLicenseImg2ErrorMsg')" @blur="handleInputConfirm('driverLicenseImg2ErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.driverLicenseImg2ErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('driverLicenseImg2ErrorMsg')">{{this.dataObj.driverLicenseImg2ErrorMsg}}</span>
            </span>
            <span v-if="btnObj.driverLicenseImg2ErrorMsg && !dataObj.driverLicenseImg2ErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>


      <tr>
        <td class="page_m_a">
          <span class="bold">车牌号：</span><span>{{this.driverInfo.vehicleLicenseNum}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.vehicleLicenseNumErrorMsg" @click="objectDataTest('vehicleLicenseNumErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.vehicleLicenseNumErrorMsg"  @click="tipMsgRemove('vehicleLicenseNumErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.vehicleLicenseNumErrorMsg" ref="vehicleLicenseNumErrorMsg" v-model="dataObj.vehicleLicenseNumErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('vehicleLicenseNumErrorMsg')" @blur="handleInputConfirm('vehicleLicenseNumErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.vehicleLicenseNumErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('vehicleLicenseNumErrorMsg')">{{this.dataObj.vehicleLicenseNumErrorMsg}}</span>
            </span>
            <span v-if="btnObj.vehicleLicenseNumErrorMsg && !dataObj.vehicleLicenseNumErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">车辆外观：</span><span>{{this.driverInfo.vehicleLength}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.vehicleLengthErrorMsg" @click="objectDataTest('vehicleLengthErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.vehicleLengthErrorMsg"  @click="tipMsgRemove('vehicleLengthErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.vehicleLengthErrorMsg" ref="vehicleLengthErrorMsg" v-model="dataObj.vehicleLengthErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('vehicleLengthErrorMsg')" @blur="handleInputConfirm('vehicleLengthErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.vehicleLengthErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('vehicleLengthErrorMsg')">{{this.dataObj.vehicleLengthErrorMsg}}</span>
            </span>
            <span v-if="btnObj.vehicleLengthErrorMsg && !dataObj.vehicleLengthErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <!--<tr>-->
        <!--<td class="page_m_a">-->
          <!--<span class="fl bold">车辆类型：</span><span>{{this.driverInfo.vehicleType}}</span>-->
        <!--</td>-->
        <!--<td class="page_btn">-->
          <!--<el-button v-if="btnObj.vehicleTypeErrorMsg" @click="objectDataTest('vehicleTypeErrorMsg')" type="primary" size="small">审批</el-button>-->
          <!--<el-button v-if="tipObj.vehicleTypeErrorMsg"  @click="tipMsgRemove('vehicleTypeErrorMsg')" size="small" type="danger">删除</el-button>-->
        <!--</td>-->
        <!--<td class="page_m_b">-->
          <!--<span class="fl">审批意见：</span>-->
          <!--<p class="yj_p">-->
            <!--<el-input v-if="inputObj.vehicleTypeErrorMsg" ref="vehicleTypeErrorMsg" v-model="dataObj.vehicleTypeErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('vehicleTypeErrorMsg')" @blur="handleInputConfirm('vehicleTypeErrorMsg')" v-bind:maxlength="50"></el-input>-->
            <!--<span v-if="tipObj.vehicleTypeErrorMsg" class=" mr15 errTipMsg">-->
              <!--<span class="ml10"  @click="tipMsgClick('vehicleTypeErrorMsg')">{{this.dataObj.vehicleTypeErrorMsg}}</span>-->
            <!--</span>-->
            <!--<span v-if="btnObj.vehicleTypeErrorMsg && !dataObj.vehicleTypeErrorMsg"  class=" mr15 errTipMsg">-->
              <!--<span class="ml10"  >无</span>-->
            <!--</span>-->
          <!--</p>-->
        <!--</td>-->
      <!--</tr>-->
      <tr>
        <td class="page_m_a">
          <span class="fl bold">车辆类型：</span><span>{{this.driverInfo.newVehicleType  || this.driverInfo.vehicleType}}</span>
        </td>
        <td rowspan="5" class="page_btn">
          <el-button v-if="btnObj.vehicleTypeErrorMsg" @click="objectDataTest('vehicleTypeErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.vehicleTypeErrorMsg"  @click="tipMsgRemove('vehicleTypeErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td rowspan="5" class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.vehicleTypeErrorMsg" ref="vehicleTypeErrorMsg" v-model="dataObj.vehicleTypeErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('vehicleTypeErrorMsg')" @blur="handleInputConfirm('vehicleTypeErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.vehicleTypeErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('vehicleTypeErrorMsg')">{{this.dataObj.vehicleTypeErrorMsg}}</span>
            </span>
            <span v-if="btnObj.vehicleTypeErrorMsg && !dataObj.vehicleTypeErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">箱体长度(mm)：</span><span>{{this.driverInfo.boxLength  || "无"}}</span>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">箱体宽度(mm)：</span><span>{{this.driverInfo.boxWidth  || "无"}}</span>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">箱体高度(mm)：</span><span>{{this.driverInfo.boxHeight  || "无"}}</span>
        </td>
      </tr>

      <tr>
        <td class="page_m_a">
          <span class="fl bold">核载(kg)：</span><span>{{this.driverInfo.maxWeight  || "无"}}</span>
        </td>
      </tr>

      <tr>
        <td class="page_m_a">
          <span class="bold">行驶证主页照片：</span><span></span>
          <p class="tc card_sfz">
            <img  v-on:click="showBigImg(Final.IMGURL+driverInfo.vehicleLicenseImg1)" v-bind:src="Final.IMGURL+driverInfo.vehicleLicenseImg1" class=""/>
          </p>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.vehicleLicenseImg1ErrorMsg" @click="objectDataTest('vehicleLicenseImg1ErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.vehicleLicenseImg1ErrorMsg"  @click="tipMsgRemove('vehicleLicenseImg1ErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.vehicleLicenseImg1ErrorMsg" ref="vehicleLicenseImg1ErrorMsg" v-model="dataObj.vehicleLicenseImg1ErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('vehicleLicenseImg1ErrorMsg')" @blur="handleInputConfirm('vehicleLicenseImg1ErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.vehicleLicenseImg1ErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('vehicleLicenseImg1ErrorMsg')">{{this.dataObj.vehicleLicenseImg1ErrorMsg}}</span>
            </span>
            <span v-if="btnObj.vehicleLicenseImg1ErrorMsg && !dataObj.vehicleLicenseImg1ErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">行驶证副页照片：</span><span></span>
          <p class="tc card_sfz">
            <img  v-if="driverInfo.vehicleLicenseImg2!=null" v-on:click="showBigImg(Final.IMGURL+driverInfo.vehicleLicenseImg2)" v-bind:src="Final.IMGURL+driverInfo.vehicleLicenseImg2" class=""/>
            <img  v-else="driverInfo.vehicleLicenseImg2==null" v-on:click="showBigImg(Final.IMGURL+driverInfo.vehicleLicenseImg2)" v-bind:src="Final.IMGURL+driverInfo.vehicleLicenseImg2" class=""/>
          </p>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.vehicleLicenseImg2ErrorMsg" @click="objectDataTest('vehicleLicenseImg2ErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.vehicleLicenseImg2ErrorMsg"  @click="tipMsgRemove('vehicleLicenseImg2ErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.vehicleLicenseImg2ErrorMsg" ref="vehicleLicenseImg2ErrorMsg" v-model="dataObj.vehicleLicenseImg2ErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('vehicleLicenseImg2ErrorMsg')" @blur="handleInputConfirm('vehicleLicenseImg2ErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.vehicleLicenseImg2ErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('vehicleLicenseImg2ErrorMsg')">{{this.dataObj.vehicleLicenseImg2ErrorMsg}}</span>
            </span>
            <span v-if="btnObj.vehicleLicenseImg2ErrorMsg && !dataObj.vehicleLicenseImg2ErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">行驶证副页背面照片：</span><span></span>
          <div class="tc card_sfz">
            <div v-if="driverInfo.vehicleLicenseImg3"><img  v-on:click="showBigImg(Final.IMGURL+driverInfo.vehicleLicenseImg3)" v-bind:src="Final.IMGURL+driverInfo.vehicleLicenseImg3" class="" /></div>
            <div class="no-submit" v-else>用户未提交</div>
          </div>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.vehicleLicenseImg3ErrorMsg" @click="objectDataTest('vehicleLicenseImg3ErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.vehicleLicenseImg3ErrorMsg"  @click="tipMsgRemove('vehicleLicenseImg3ErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.vehicleLicenseImg3ErrorMsg" ref="vehicleLicenseImg3ErrorMsg" v-model="dataObj.vehicleLicenseImg3ErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('vehicleLicenseImg3ErrorMsg')" @blur="handleInputConfirm('vehicleLicenseImg3ErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.vehicleLicenseImg3ErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('vehicleLicenseImg3ErrorMsg')">{{this.dataObj.vehicleLicenseImg3ErrorMsg}}</span>
            </span>
            <span v-if="btnObj.vehicleLicenseImg3ErrorMsg && !dataObj.vehicleLicenseImg3ErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a tab_qx_bg" colspan="3">
          <span class="bold">综合评价：</span>
          <el-input class="mt10"  type="textarea" :rows="4" placeholder="请输入内容" v-model="dataObj.advice" v-bind:maxlength="50"></el-input>
        </td>
      </tr>
    </table>
    <el-row class="mt20 mb20" style="line-height:36px;">
      <el-col :span="24" style="text-align:center;">
        <el-button @click="checkPass" type="primary" >审核通过</el-button>
        <el-button @click="checkFail" type="primary" >不通过</el-button>
      </el-col>
    </el-row>

    <el-dialog title="查看大图1" :visible.sync="dialogPicVisible">
      <div style="width:100%;height:400px; overflow:scroll;text-align:center;">
        <img id="showBigImg_img" v-on:click="remoteImg" v-bind:src="bigImgSrc" v-bind:style="{maxWidth:'600px',cursor:'pointer',transform:'rotate('+bigImgRemote+'deg)'}"/>
      </div>
    </el-dialog>
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
//  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data() {
      return {
        dataObj:{
          nameErrorMsg:'',
          userPhoneErrorMsg:'',
          driverLicenseNumErrorMsg:'',
          driverLicenseImg1ErrorMsg:'',
          driverLicenseImg2ErrorMsg:'',
          vehicleLicenseNumErrorMsg:'',
          vehicleTypeErrorMsg:'',
          vehicleLengthErrorMsg:'',
          vehicleLicenseImg1ErrorMsg:'',
          vehicleLicenseImg2ErrorMsg:'',
          vehicleLicenseImg3ErrorMsg:'',
          advice:'',
        },
        btnObj:{
          nameErrorMsg:true,
          userPhoneErrorMsg:true,
          driverLicenseNumErrorMsg:true,
          driverLicenseImg1ErrorMsg:true,
          driverLicenseImg2ErrorMsg:true,
          vehicleLicenseNumErrorMsg:true,
          vehicleTypeErrorMsg:true,
          vehicleLengthErrorMsg:true,
          vehicleLicenseImg1ErrorMsg:true,
          vehicleLicenseImg2ErrorMsg:true,
          vehicleLicenseImg3ErrorMsg:true,
        },
        inputObj:{
          nameErrorMsg:false,
          userPhoneErrorMsg:false,
          driverLicenseNumErrorMsg:false,
          driverLicenseImg1ErrorMsg:false,
          driverLicenseImg2ErrorMsg:false,
          vehicleLicenseNumErrorMsg:false,
          vehicleTypeErrorMsg:false,
          vehicleLengthErrorMsg:false,
          vehicleLicenseImg1ErrorMsg:false,
          vehicleLicenseImg2ErrorMsg:false,
          vehicleLicenseImg3ErrorMsg:false,
        },
        tipObj:{
          nameErrorMsg:false,
          userPhoneErrorMsg:false,
          driverLicenseNumErrorMsg:false,
          driverLicenseImg1ErrorMsg:false,
          driverLicenseImg2ErrorMsg:false,
          vehicleLicenseNumErrorMsg:false,
          vehicleTypeErrorMsg:false,
          vehicleLengthErrorMsg:false,
          vehicleLicenseImg1ErrorMsg:false,
          vehicleLicenseImg2ErrorMsg:false,
          vehicleLicenseImg3ErrorMsg:false,
        },
        bigImgRemote:0,
        bigImgSrc:"",
        dialogPicVisible:false,
        fromURL:'',
        driverInfoId:'',
        driverInfo:'',
        Final:'',
        checkType:0,
        checkLogs:[], //审核记录集合,
        showCheckLog:1,
        dialogFormVisible:false,
        checkLogDetail:'',

      }
    },
    components :{
//      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){
      this.Final=Final;
      this.fromURL=this.$store.state.tmpFromPath;
      this.driverInfoId=this.$route.params.driverInfoId;
      this.requestPersonalInfo();
    },
    watch : {
      "$route": function(to,from) {
        this.fromURL=this.$store.state.tmpFromPath;
      }
    },
    methods : {
        //时间转换
      driver_check_allTime(row,column,cellValue){
        return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
      },
      driver_check_allStatus(row,column,cellValue){
        return Final.ZCQISHOU_STATUS[cellValue] || "";
      },
      changeShowCheckLog () {
        if(this.showCheckLog==1){
          this.showCheckLog=2
        }else{
          this.showCheckLog=1
        }
      },
      objectDataTest (key) {
          this.btnObj[key]=false;
          this.inputObj[key]=true;
          this.tipObj[key]=false;
        this.$nextTick(_ => {
          this.$refs[key].$refs.textarea.focus();
        });
      },
      handleInputConfirm (key){
        if(this.dataObj[key]){
          this.btnObj[key]=false;
          this.inputObj[key]=false;
          this.tipObj[key]=true;
        }else {
          this.btnObj[key]=true;
          this.inputObj[key]=false;
          this.tipObj[key]=false;
        }
      },
      tipMsgClick (key){
        this.btnObj[key]=false;
        this.inputObj[key]=true;
        this.tipObj[key]=false;
        this.$nextTick(_ => {
          this.$refs[key].$refs.textarea.focus();
        });
      },
      tipMsgRemove (key){
        this.btnObj[key]=true;
        this.inputObj[key]=false;
        this.tipObj[key]=false;
        this.dataObj[key]="";
      },
      /**
       * 校验数据状态
       * */
//      getCheckTypeByStatus (data) {
//        if(Final.CHECK_TYPE_MAPPING[1].includes(data.status)){
//          this.checkType=1;
//        }else if(Final.CHECK_TYPE_MAPPING[2].includes(data.status)){
//          this.checkType=2;
//        }else if(Final.CHECK_TYPE_MAPPING[3].includes(data.status)){
//          this.checkType=3;
//        }else if(Final.CHECK_TYPE_MAPPING[4].includes(data.status)){
//          this.checkType=4;
//        }
//
//      },
      /**
       * 旋转图片
       * */
      remoteImg () {
        this.bigImgRemote=(this.bigImgRemote+90)%360;
      },
      /**
       * 显示大图
       * */
      showBigImg (imgUrl){
        this.bigImgSrc=imgUrl;
        this.dialogPicVisible=true;
      },
      formatCheckPassParam () {
          let userPhone = this.driverInfo.userPhone;
          //let advice = this.dataObj.advice;
          let errorMsgTxt='';
          if(!userPhone){
              errorMsgTxt='司机手机号异常，请刷新后重试';
          }
//          else if(!advice){
//              errorMsgTxt='请填写综合评价';
//          }
          if(errorMsgTxt){
//            this.$message({
//              message: errorMsgTxt,
//              type: 'error'
//            });
            this.$refs.tipMsgRef.showTipMsg({
              msg:errorMsgTxt,
              type:"error",
              scope:this
            });
            return false;
          }
          let param={userPhone:userPhone};
          return param;
      },
      /**
       * 审核通过
       * */
      checkPass (p) {
        let param=this.formatCheckPassParam();
        if(param){
          this.requestCheckPass(param);
        }

      },
      /**
       * 提交审核通过数据
       **/
      requestCheckPass (param) {
        if(param){
          Api.lc_driver_check_info_commit(param)
            .then(res => {
              if(res.status==1){
//                this.$message({
//                  message: '审核成功',
//                  type: 'success',
//                  duration:1500,
//                  onClose: function (){
//                    //此处回调
//                    this.$router.push("/lgtcheck/drivercheck/"+this.checkType);
//                  }.bind(this)
//                });
                this.$refs.tipMsgRef.showTipMsg({
                  msg:'审核成功',
                  type:"success",
                  scope:this,
                  callback: function(){
                    this.$router.push(this.fromURL || ("/lgtcheck/drivercheck/"+this.checkType));
                  }
                });
              }else if(res.status==2){
//                this.$message({
//                  message: res.message,
//                  type: 'error',
//                  duration:1500,
//                });
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error",
                  scope:this
                });
              }
            }).catch(err =>{
          });
        }
      },
      /**
       * 审核失败
       * */
      checkFail(){
        let param=this.formatCheckFailParam();
        if(param){
          this.requestCheckFail(param);
        }
      },
      formatCheckFailParam () {
        let userPhone = this.driverInfo.userPhone;
        let advice = this.dataObj.advice;
        let nameErrorMsg = this.dataObj.nameErrorMsg;
        let userPhoneErrorMsg = this.dataObj.userPhoneErrorMsg;
        let driverLicenseNumErrorMsg = this.dataObj.driverLicenseNumErrorMsg;
        let driverLicenseImg1ErrorMsg = this.dataObj.driverLicenseImg1ErrorMsg;
        let driverLicenseImg2ErrorMsg = this.dataObj.driverLicenseImg2ErrorMsg;
        let vehicleLicenseNumErrorMsg = this.dataObj.vehicleLicenseNumErrorMsg;
        let vehicleTypeErrorMsg = this.dataObj.vehicleTypeErrorMsg;
        let vehicleLengthErrorMsg = this.dataObj.vehicleLengthErrorMsg;
        let vehicleLicenseImg1ErrorMsg = this.dataObj.vehicleLicenseImg1ErrorMsg;
        let vehicleLicenseImg2ErrorMsg = this.dataObj.vehicleLicenseImg2ErrorMsg;
        let vehicleLicenseImg3ErrorMsg = this.dataObj.vehicleLicenseImg3ErrorMsg;
        let errorMsgTxt='';
        if(!userPhone){
          errorMsgTxt='骑士手机号异常，请刷新后重试';
        }else if(!nameErrorMsg && !userPhoneErrorMsg && !driverLicenseNumErrorMsg && !driverLicenseImg1ErrorMsg && !driverLicenseImg2ErrorMsg && !vehicleLicenseNumErrorMsg && !vehicleTypeErrorMsg
          &&!vehicleLengthErrorMsg && !vehicleLicenseImg1ErrorMsg && !vehicleLicenseImg2ErrorMsg && !vehicleLicenseImg3ErrorMsg ){
          errorMsgTxt='请审批不通过项并填写原因';
        }
        if(errorMsgTxt){
//          this.$message({
//            message: errorMsgTxt,
//            type: 'error'
//          });
          this.$refs.tipMsgRef.showTipMsg({
            msg:errorMsgTxt,
            type:"error"
          });
          return false;
        }
        let param={
          userPhone:userPhone,
          advice:advice,
          nameErrorMsg:nameErrorMsg,
          userPhoneErrorMsg:userPhoneErrorMsg,
          driverLicenseNumErrorMsg:driverLicenseNumErrorMsg,
          driverLicenseImg1ErrorMsg:driverLicenseImg1ErrorMsg,
          driverLicenseImg2ErrorMsg:driverLicenseImg2ErrorMsg,
          vehicleLicenseNumErrorMsg:vehicleLicenseNumErrorMsg,
          vehicleTypeErrorMsg:vehicleTypeErrorMsg,
          vehicleLengthErrorMsg:vehicleLengthErrorMsg,
          vehicleLicenseImg1ErrorMsg:vehicleLicenseImg1ErrorMsg,
          vehicleLicenseImg1ErrorMsg:vehicleLicenseImg1ErrorMsg,
          vehicleLicenseImg2ErrorMsg:vehicleLicenseImg2ErrorMsg,
          vehicleLicenseImg3ErrorMsg:vehicleLicenseImg3ErrorMsg
        };
//        for(let item in param) {
//            if(param[item]==''){
//                delete param[item];
//            }
//        }
        return param;
      },
      /**
       * 提交审核不通过数据
       **/
      requestCheckFail (param) {
        if(param){
          Api.lc_driver_check_fail_info_commit(util.getPostParam(param))
            .then(res => {
              if(res.status==1){
//                this.$message({
//                  message: '操作成功',
//                  type: 'success',
//                  duration:1500,
//                  onClose: function (){
//                    //此处回调
//                    this.$router.push("/lgtcheck/drivercheck/"+this.checkType);
//                  }.bind(this)
//                });
                this.$refs.tipMsgRef.showTipMsg({
                  msg:'操作成功',
                  type:"success",
                  scope:this,
                  callback:function (){
                    this.$router.push(this.fromURL || ("/lgtcheck/drivercheck/"+this.checkType));
                  }
                });
              }
            }).catch(err =>{
          });
        }
      },
      /**
       * 请求个人信息
       */
      requestPersonalInfo () {
        if(this.driverInfoId){
          let param= {userPhone:this.driverInfoId,token:localStorage.getItem("token")};
          Api.lc_driver_check_info(param)
            .then(res => {
              if(res.status==1){
                this.driverInfo=res.result;
                this.checkLogs=res.result.auditLogList;
//                this.getCheckTypeByStatus(res.result);
//                if(this.checkType==3){
//                    this.requestCheckReason(res.result.auditId);
//
//                }
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error",
                  scope:this
                });
              }
            }).catch(err =>{
          });
        }
      },
//      requestCheckReason (auditId) {
//        if(auditId){
//          let param= util.getPostParam({auditId:auditId});
//          Api.lc_get_audit_remark(param)
//            .then(res => {
//              if(res.status==1){
//                this.checkReason.remark1=res.result.remark1;
//                this.checkReason.remark2=res.result.remark2;
//              }
//            }).catch(err =>{
//
//          });
//        }
//      }
    }
  }
</script>
<style scoped="scope">

  .business_Images {
    max-height: 200px;
  }
  .person_Images {
    max-width:100%;
    width:100%;
    max-height: 400px;
    margin-right: 10px;
  }
  .con_list ul li {
    line-height: 35px;
  }
  .dialogUl li {
    line-height: 35px;
    width: 33%;
    float: left;
  }
  .s-f-back {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    overflow: hidden;
    padding-bottom: 10px;
  }
  /*.show-check-log {*/
    /*display: block;*/
    /*transition:display 1s;*/
  /*}*/
  .show-check-log {
    display: none;
    transition:display 1s;
  }
  .col_div {
    background-color: #E5E9F2;
    border:1px solid #99A9BF;
    border-radius:4px;
    padding-left:10px;
    display:flex;/*设为伸缩容器*/
    flex-flow:row;/*伸缩项目单行排列*/
    align-items: center;
    justify-content: center;

  }
  .col_child_div {
    flex:1;
    height:100%;
  }
  .errTipMsg {
    display:inline-block;
    height:100%;
    color:#333;
    width:100%;
    line-height:20px;
    word-break: break-all;
    /*border: solid 1px #D3DCE6;*/
    border-radius: 5px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    vertical-align: middle;
    display: block;
    min-height: 20px;
    /*background-color:#D3DCE6;*/
    /*display:flex;!*设为伸缩容器*!*/
    /*flex-flow:row;!*伸缩项目单行排列*!*/
    /*align-items: center;*/
  }
  /*.errTipMsg span:first-child  {*/
    /*flex:8*/
  /*}*/
  /*.errTipMsg span:last-child {*/
    /*flex:2;*/
    /*text-align: center;*/

  /*}*/

  .errInput {
    display: inline-block;
    width:100%;
  }

.page_m{
  width: 100%;
  text-align: left;
  margin-top:30px;
  border-right:1px solid #dcdcdc;
  border-bottom:1px solid #dcdcdc;
}
  .page_m tr td{
    border-left:1px solid #dcdcdc;
    border-top:1px solid #dcdcdc;
    padding:10px;
  }
  .page_m tr td:first-child{
    width:45%;
    background: #fff8ef;
  }
  .page_m tr td:nth-child(2){
    width:10%;
    min-width: 110px;
    text-align: center;
  }
  .page_m tr .tab_qx_bg{
    background: #fff!important;
  }
  .page_m_b .yj_p{
    margin-left:70px;
  }
  .page_m_a .card_sfz img{
    width: 270px;
    height: 170px;
    max-width: 270px;
    max-height: 170px;
    border: 1px solid #dcdcdc;
    border-radius:4px;
    padding: 5px;
    margin-top: 10px;
  }
  .el-textarea__inner{
    border:1px solid red!important;
  }
  .color_delate{
    background: #FF4949;
    border-color:#FF4949;
    /*outline: #FF4949;*/
  }
  .color_delate:hover{
    background: rgba(255, 73, 73, 0.76);
    border-color:rgba(255, 73, 73, 0.76);
  }
  .no-submit{
    width: 270px;
    height: 170px;
    max-width: 270px;
    max-height: 170px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 5px;
    margin-top: 10px;
    margin-left:auto;
    margin-right:auto;
    color:red;
    text-align: center;
    line-height:156px;
  }

</style>
<style>

</style>
