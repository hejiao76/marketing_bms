<template>
  <div class="con_list">
    <el-row class="s-f-back" style="line-height:36px;">
      <el-col :span="24" style="text-align: right">
        <el-button v-if="showCheckLog==1" @click="changeShowCheckLog" type="info">查看审批轨迹</el-button>
        <el-button v-else @click="changeShowCheckLog" type="info">收起审批轨迹</el-button>
      </el-col>
    </el-row>
    <el-row  v-bind:class="['s-f-back','mt10',showCheckLog == 1 ? 'show-check-log': 'hide-check-log']" style="line-height:36px;">
      <el-col :span="24" >
        <el-table class="selfTable"  :data="checkLogs"  ref="singleTable" border highlight-current-row max-height="250">
          <el-table-column align="center" type="index" label="" width="60"></el-table-column>
          <el-table-column prop="auditUserName" label="审核人姓名" align="center"  width="180"></el-table-column>
          <el-table-column prop="auditLoginName" label="审核人登录名" align="center" width="180"></el-table-column>
          <el-table-column prop="auditTime" align="center" label="审核时间" width="180" v-bind:formatter="truck_check_allTime"></el-table-column>
          <el-table-column prop="status" align="center" label="状态" v-bind:formatter="truck_check_allStatus"></el-table-column>
          <el-table-column prop="advice"  label="审核意见" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <table class="page_m" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td class="page_m_a">
          <span class="bold">车主姓名：</span><span>{{this.truckInfo.userName}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.userNameErrorMsg" @click="objectDataTest('userNameErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.userNameErrorMsg"  @click="tipMsgRemove('userNameErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.userNameErrorMsg" ref="userNameErrorMsg" v-model="dataObj.userNameErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('userNameErrorMsg')" @blur="handleInputConfirm('userNameErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.userNameErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('userNameErrorMsg')">{{this.dataObj.userNameErrorMsg}}</span>
            </span>
            <span v-if="btnObj.userNameErrorMsg && !dataObj.userNameErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">车主手机号：</span><span>{{this.truckInfo.userPhone}}</span>
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
          <span class="fl bold">身份证号：</span><span>{{this.truckInfo.idCard}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.idCardErrorMsg" @click="objectDataTest('idCardErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.idCardErrorMsg"  @click="tipMsgRemove('idCardErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.idCardErrorMsg" ref="idCardErrorMsg" v-model="dataObj.idCardErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('idCardErrorMsg')" @blur="handleInputConfirm('idCardErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.idCardErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('idCardErrorMsg')">{{this.dataObj.idCardErrorMsg}}</span>
            </span>
            <span v-if="btnObj.idCardErrorMsg && !dataObj.idCardErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">车牌号：</span><span>{{this.truckInfo.vehicleLicenseNo}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.vehicleLicenseNoErrorMsg" @click="objectDataTest('vehicleLicenseNoErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.vehicleLicenseNoErrorMsg"  @click="tipMsgRemove('vehicleLicenseNoErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.vehicleLicenseNoErrorMsg" ref="vehicleLicenseNoErrorMsg" v-model="dataObj.vehicleLicenseNoErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('vehicleLicenseNoErrorMsg')" @blur="handleInputConfirm('vehicleLicenseNoErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.vehicleLicenseNoErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('vehicleLicenseNoErrorMsg')">{{this.dataObj.vehicleLicenseNoErrorMsg}}</span>
            </span>
            <span v-if="btnObj.vehicleLicenseNoErrorMsg && !dataObj.vehicleLicenseNoErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">行驶证主页：</span><span></span>
          <!--<p class="tc card_sfz">-->
            <!--<img v-if="truckInfo.vehicleLicenseImg1!=null" v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg1)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg1" class=""/>-->
          <!--</p>-->
          <div class="tc card_sfz">
            <div v-if="truckInfo.vehicleLicenseImg1"><img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg1)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg1" class="" /></div>
            <div class="no-submit" v-else>用户未提交</div>
          </div>
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
          <span class="bold">行驶证副页：</span><span></span>
          <!--<p class="tc card_sfz">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg2)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg2" class=""/>-->
          <!--</p>-->
          <div class="tc card_sfz">
            <div v-if="truckInfo.vehicleLicenseImg2"><img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg2)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg2" class="" /></div>
            <div class="no-submit" v-else>用户未提交</div>
          </div>
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
              <span class="ml10">无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">行驶证副页背面：</span><span></span>
          <!--<p class="tc card_sfz">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg3)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg3" class=""/>-->
          <!--</p>-->
          <div class="tc card_sfz">
            <div v-if="truckInfo.vehicleLicenseImg3"><img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg3)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg3" class="" /></div>
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
              <span class="ml10">无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">车型信息：</span><span>{{this.truckInfo.vehicleType}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.vehicleTypeErrorMsg" @click="objectDataTest('vehicleTypeErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.vehicleTypeErrorMsg"  @click="tipMsgRemove('vehicleTypeErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
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
          <span class="fl bold">车长信息：</span><span>{{this.truckInfo.vehicleLength}}</span>
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
      <tr>
        <td class="page_m_a">
          <span class="bold">营运证编号：</span><span>{{this.truckInfo.businesslicenseNo}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.businesslicenseNoErrorMsg" @click="objectDataTest('businesslicenseNoErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.businesslicenseNoErrorMsg"  @click="tipMsgRemove('businesslicenseNoErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.businesslicenseNoErrorMsg" ref="businesslicenseNoErrorMsg" v-model="dataObj.businesslicenseNoErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('businesslicenseNoErrorMsg')" @blur="handleInputConfirm('businesslicenseNoErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.businesslicenseNoErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('businesslicenseNoErrorMsg')">{{this.dataObj.businesslicenseNoErrorMsg}}</span>
            </span>
            <span v-if="btnObj.businesslicenseNoErrorMsg && !dataObj.businesslicenseNoErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">营运证有效期：</span><span>{{this.truckInfo.businesslicenseDate}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.businesslicenseDateErrorMsg" @click="objectDataTest('businesslicenseDateErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.businesslicenseDateErrorMsg"  @click="tipMsgRemove('businesslicenseDateErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.businesslicenseDateErrorMsg" ref="businesslicenseDateErrorMsg" v-model="dataObj.businesslicenseDateErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('businesslicenseDateErrorMsg')" @blur="handleInputConfirm('businesslicenseDateErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.businesslicenseDateErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('businesslicenseDateErrorMsg')">{{this.dataObj.businesslicenseDateErrorMsg}}</span>
            </span>
            <span v-if="btnObj.businesslicenseDateErrorMsg && !dataObj.businesslicenseDateErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10">无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">营运证照片：</span><span></span>
          <!--<p class="tc card_sfz">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckInfo.businesslicenseImg)" v-bind:src="Final.IMGURL+truckInfo.businesslicenseImg" class=""/>-->
          <!--</p>-->
          <div class="tc card_sfz">
            <div v-if="truckInfo.businesslicenseImg"><img  v-on:click="showBigImg(Final.IMGURL+truckInfo.businesslicenseImg)" v-bind:src="Final.IMGURL+truckInfo.businesslicenseImg" class="" /></div>
            <div class="no-submit" v-else>用户未提交</div>
          </div>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.businesslicenseImgErrorMsg" @click="objectDataTest('businesslicenseImgErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.businesslicenseImgErrorMsg"  @click="tipMsgRemove('businesslicenseImgErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.businesslicenseImgErrorMsg" ref="businesslicenseImgErrorMsg" v-model="dataObj.businesslicenseImgErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('businesslicenseImgErrorMsg')" @blur="handleInputConfirm('businesslicenseImgErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.businesslicenseImgErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('businesslicenseImgErrorMsg')">{{this.dataObj.businesslicenseImgErrorMsg}}</span>
            </span>
            <span v-if="btnObj.businesslicenseImgErrorMsg && !dataObj.businesslicenseImgErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10">无</span>
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
  export default{
    data(){
      return{
        dataObj:{
          userNameErrorMsg:'',
          userPhoneErrorMsg:'',
          idCardErrorMsg:'',
          vehicleLicenseNoErrorMsg:'',
          vehicleLicenseImg1:'',
          vehicleLicenseImg1ErrorMsg:'',
          vehicleLicenseImg2ErrorMsg:'',
          vehicleLicenseImg3ErrorMsg:'',
          vehicleTypeErrorMsg:'',
          vehicleLengthErrorMsg:'',
          businesslicenseNoErrorMsg:'',
          businesslicenseDateErrorMsg:'',
          businesslicenseImgErrorMsg:'',
          advice:'',
        },
        btnObj:{
          userNameErrorMsg:true,
          userPhoneErrorMsg:true,
          idCardErrorMsg:true,
          vehicleLicenseNoErrorMsg:true,
          vehicleLicenseImg1:true,
          vehicleLicenseImg1ErrorMsg:true,
          vehicleLicenseImg2ErrorMsg:true,
          vehicleLicenseImg3ErrorMsg:true,
          vehicleTypeErrorMsg:true,
          vehicleLengthErrorMsg:true,
          businesslicenseNoErrorMsg:true,
          businesslicenseDateErrorMsg:true,
          businesslicenseImgErrorMsg:true,
        },
        inputObj:{
          userNameErrorMsg:false,
          userPhoneErrorMsg:false,
          idCardErrorMsg:false,
          vehicleLicenseNoErrorMsg:false,
          vehicleLicenseImg1:false,
          vehicleLicenseImg1ErrorMsg:false,
          vehicleLicenseImg2ErrorMsg:false,
          vehicleLicenseImg3ErrorMsg:false,
          vehicleTypeErrorMsg:false,
          vehicleLengthErrorMsg:false,
          businesslicenseNoErrorMsg:false,
          businesslicenseDateErrorMsg:false,
          businesslicenseImgErrorMsg:false,
        },
        tipObj:{
          userNameErrorMsg:false,
          userPhoneErrorMsg:false,
          idCardErrorMsg:false,
          vehicleLicenseNoErrorMsg:false,
          vehicleLicenseImg1:false,
          vehicleLicenseImg1ErrorMsg:false,
          vehicleLicenseImg2ErrorMsg:false,
          vehicleLicenseImg3ErrorMsg:false,
          vehicleTypeErrorMsg:false,
          vehicleLengthErrorMsg:false,
          businesslicenseNoErrorMsg:false,
          businesslicenseDateErrorMsg:false,
          businesslicenseImgErrorMsg:false,
        },
        showCheckLog:1,
        checkLogs:[],
        dialogFormVisible:false,
        truckInfo:'',
        bigImgRemote:0,
        bigImgSrc:"",
        dialogPicVisible:false,
        fromURL:'',
        truckInfoId:'',
        Final:'',
        checkType:0,
        dialogFormVisible:false,
        checkLogDetail:'',
      }
    },
    components:{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){
      this.Final=Final;
      this.fromURL=this.$store.state.tmpFromPath;
      this.truckInfoId=this.$route.params.truckInfoId;
      this.requestPersonalInfo();
    },
    watch : {
      "$route": function(to,from) {
        this.fromURL=this.$store.state.tmpFromPath;
      }
    },
    methods:{
      //时间转换
      truck_check_allTime(row,column,cellValue){
        return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
      },
      //状态
      truck_check_allStatus(row,column,cellValue){
        return Final.ZCQISHOU_STATUS[cellValue] || "";
      },
      //查看审批轨迹切换
      changeShowCheckLog () {
        if(this.showCheckLog==1){
          this.showCheckLog=2
        }else{
          this.showCheckLog=1
        }
      },
      //审批意见
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
        let id = this.truckInfo.id;
        //let advice = this.dataObj.advice;
        let errorMsgTxt='';
        if(!id){
          errorMsgTxt='车辆信息异常，请刷新后重试';
        }
        if(errorMsgTxt){
          this.$refs.tipMsgRef.showTipMsg({
            msg:errorMsgTxt,
            type:"error",
            scope:this
          });
          return false;
        }
        let param={id:id};
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
          Api.truck_check_info_commit(param)
            .then(res => {
              if(res.status==1){
                this.$refs.tipMsgRef.showTipMsg({
                  msg:'审核成功',
                  type:"success",
                  scope:this,
                  callback: function(){
                    this.$router.push(this.fromURL || ("/lgtcheck/truckcheck/"+this.checkType));//回调调回列表页
                  }
                });
              }else if(res.status==2){
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
      formatCheckFailParam(){
        let id=this.truckInfo.id;
        let advice=this.dataObj.advice;
        let userNameErrorMsg=this.dataObj.userNameErrorMsg;
        let userPhoneErrorMsg = this.dataObj.userPhoneErrorMsg;
        let idCardErrorMsg=this.dataObj.idCardErrorMsg;
        let vehicleTypeErrorMsg=this.dataObj.vehicleTypeErrorMsg;
        let vehicleLengthErrorMsg=this.dataObj.vehicleLengthErrorMsg;
        let vehicleLicenseNoErrorMsg=this.dataObj.vehicleLicenseNoErrorMsg;
        let vehicleLicenseImg1ErrorMsg=this.dataObj.vehicleLicenseImg1ErrorMsg;
        let vehicleLicenseImg2ErrorMsg=this.dataObj.vehicleLicenseImg2ErrorMsg;
        let vehicleLicenseImg3ErrorMsg=this.dataObj.vehicleLicenseImg3ErrorMsg;
        let businesslicenseNoErrorMsg=this.dataObj.businesslicenseNoErrorMsg;
        let businesslicenseDateErrorMsg=this.dataObj.businesslicenseDateErrorMsg;
        let businesslicenseImgErrorMsg=this.dataObj.businesslicenseImgErrorMsg;
        let errorMsgTxt='';
        if(!id){
          errorMsgTxt='车辆信息异常，请刷新后重试';
        }else if(!userNameErrorMsg && !userPhoneErrorMsg && !idCardErrorMsg && !vehicleTypeErrorMsg && !vehicleLengthErrorMsg && !vehicleLicenseNoErrorMsg && !vehicleLicenseImg1ErrorMsg && !vehicleLicenseImg2ErrorMsg && !vehicleLicenseImg3ErrorMsg && !businesslicenseNoErrorMsg && !businesslicenseDateErrorMsg && !businesslicenseImgErrorMsg){
          errorMsgTxt='请审批不通过项并填写原因';
        }
        if(errorMsgTxt){
          this.$refs.tipMsgRef.showTipMsg({
            msg:errorMsgTxt,
            type:"error"
          });
          return false;
        }
        let param={
          id:id,
          advice:advice,
          userNameErrorMsg:userNameErrorMsg,
          userPhoneErrorMsg:userPhoneErrorMsg,
          idCardErrorMsg:idCardErrorMsg,
          vehicleTypeErrorMsg:vehicleTypeErrorMsg,
          vehicleLicenseNoErrorMsg:vehicleLicenseNoErrorMsg,
          vehicleLengthErrorMsg:vehicleLengthErrorMsg,
          vehicleLicenseImg1ErrorMsg:vehicleLicenseImg1ErrorMsg,
          vehicleLicenseImg2ErrorMsg:vehicleLicenseImg2ErrorMsg,
          vehicleLicenseImg3ErrorMsg:vehicleLicenseImg3ErrorMsg,
          businesslicenseNoErrorMsg:businesslicenseNoErrorMsg,
          businesslicenseDateErrorMsg:businesslicenseDateErrorMsg,
          businesslicenseImgErrorMsg:businesslicenseImgErrorMsg,
        };
        return param;
      },
      /**
       * 提交审核不通过数据
       **/
      requestCheckFail (param) {
        if(param){
          Api.truck_check_fail_info_commit(util.getPostParam(param))
            .then(res => {
              if(res.status==1){
                this.$refs.tipMsgRef.showTipMsg({
                  msg:'操作成功',
                  type:"success",
                  scope:this,
                  callback:function (){
                    this.$router.push(this.fromURL || ("/lgtcheck/truckcheck/"+this.checkType));
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
        if(this.truckInfoId){
          let param= {id:this.truckInfoId,token:localStorage.getItem("token")};
          Api.truck_check_info(param)
            .then(res => {
              if(res.status==1){
                this.truckInfo=res.result;
                this.checkLogs=res.result.auditLogList;
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
