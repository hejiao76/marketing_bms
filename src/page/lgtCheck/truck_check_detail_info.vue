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
          <el-table-column prop="auditTime" align="center" label="审核时间" width="180" v-bind:formatter="driver_check_diTime"></el-table-column>
          <el-table-column prop="status" align="center" label="状态" v-bind:formatter="driver_check_diStatus"></el-table-column>
          <el-table-column prop="advice"  label="审核意见" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <table class="approve_tab"  cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td>
          <span class="bold">车主姓名：</span><span>{{this.truckInfo.userName}}</span>
        </td>
        <td>
          <span class="bold">车主手机号：</span><span>{{this.truckInfo.userPhone}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <span class="bold">身份证号：</span><span>{{this.truckInfo.idCard}}</span>
        </td>
        <td>
          <span class="bold">车型信息：</span><span>{{this.truckInfo.vehicleType}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <span class="bold">车长信息：</span><span>{{this.truckInfo.vehicleLength}}</span>
        </td>
        <td>
          <span class="bold">营运证编号：</span><span>{{this.truckInfo.businesslicenseNo}}</span>
        </td>
      </tr>

      <tr>
        <td>
          <span class="bold">营运证有效期：</span><span>{{this.truckInfo.businesslicenseDate}}</span>
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="approve_sfz">
          <span class="bold">行驶证主页：</span><span></span>
          <!--<p class="tc s_sfz">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg1)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg1" class=""/>-->
          <!--</p>-->
          <div class="tc card_sfz s_sfz">
            <div v-if="truckInfo.vehicleLicenseImg1"><img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg1)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg1" class="" /></div>
            <div class="no-submit" v-else>用户未提交</div>
          </div>
        </td>
        <td class="approve_sfz">
          <span class="bold">行驶证副页：</span><span></span>
          <!--<p class="tc s_sfz">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg2)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg2" class=""/>-->
          <!--</p>-->
          <div class="tc card_sfz s_sfz">
            <div v-if="truckInfo.vehicleLicenseImg2"><img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg2)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg2" class="" /></div>
            <div class="no-submit" v-else>用户未提交</div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="approve_sfz">
          <span class="bold">行驶证副页背面：</span><span></span>
          <!--<p class="tc s_sfz">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg3)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg3" class=""/>-->
          <!--</p>-->
          <div class="tc card_sfz s_sfz">
            <div v-if="truckInfo.vehicleLicenseImg3"><img  v-on:click="showBigImg(Final.IMGURL+truckInfo.vehicleLicenseImg3)" v-bind:src="Final.IMGURL+truckInfo.vehicleLicenseImg3" class="" /></div>
            <div class="no-submit" v-else>用户未提交</div>
          </div>
        </td>
        <td  class="approve_sfz">
          <span class="bold">营运证照片：</span><span></span>
          <!--<p class="tc s_sfz">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckInfo.businesslicenseImg)" v-bind:src="Final.IMGURL+truckInfo.businesslicenseImg" class=""/>-->
          <!--</p>-->
          <div class="tc card_sfz s_sfz">
            <div v-if="truckInfo.businesslicenseImg"><img  v-on:click="showBigImg(Final.IMGURL+truckInfo.businesslicenseImg)" v-bind:src="Final.IMGURL+truckInfo.businesslicenseImg" class="" /></div>
            <div class="no-submit" v-else>用户未提交</div>
          </div>
        </td>
      </tr>
      <tr>

      </tr>
    </table>
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
  export default {
    data() {
      return {
        bigImgRemote:0,
        bigImgSrc:"",
        dialogPicVisible:false,
        fromURL:'',
        truckInfoId:'',
        truckInfo:'',
        Final:'',
        checkType:1,
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
      this.truckInfoId=this.$route.params.truckInfoId;
      this.requestPersonalInfo();
    },
    watch : {
      "$route": function(to,from) {
        this.fromURL=this.$store.state.tmpFromPath;
      }
    },
    methods : {
      //时间转换
      driver_check_diTime(row,column,cellValue){
        return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
      },
      driver_check_diStatus(row,column,cellValue){
        return Final.ZCQISHOU_STATUS[cellValue] || "";
      },
      changeShowCheckLog () {
        if(this.showCheckLog==1){
          this.showCheckLog=2
        }else{
          this.showCheckLog=1
        }
      },
      remoteImg () {
        this.bigImgRemote=(this.bigImgRemote+90)%360;
      },
      showBigImg (imgUrl){
        this.bigImgSrc=imgUrl;
        this.dialogPicVisible=true;
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
              }
            }).catch(err =>{

          });
        }
      }
    }
  }
</script>
<style scoped="scope">
  .col_div {
    background-color: #D3DCE6;
    border-radius:5px;
    padding-left:10px;
  }
  .business_Images {
    /*max-width: 100%;*/
    /*width:100%;*/
    /*height: 285px;*/
    /*max-width: 212px;*/
    max-height: 200px;
  }
  .person_Images {
    max-width:100%;
    width:100%;
    max-height: 400px;
    /*width: 320px;*/
    /*height: 201px;*/
    /*max-width: 320px;*/
    /*max-height: 201px;*/
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
  .show-check-log {
    display: block;
    transition:display 1s;
  }
  .show-check-log {
    display: none;
    transition:display 1s;
  }
  /*审核展示表格*/
  .approve_tab{
    width: 100%;
    text-align: left;
    margin-top:30px;
    border-right:1px solid #dcdcdc;
    border-bottom:1px solid #dcdcdc;
  }
  .approve_tab tr td{
    border-left:1px solid #dcdcdc;
    border-top:1px solid #dcdcdc;
    padding:20px;
  }
  .approve_sfz .s_sfz img{
    width: 270px;
    height: 170px;
    max-width: 270px;
    max-height: 170px;
    border: 1px solid #dcdcdc;
    border-radius:4px;
    padding: 5px;
    margin-top: 10px;
  }
  .yj_p{
    margin-left:70px;
  }
  .no-submit{
    display: block;
    width: 270px;
    height: 170px;
    max-width: 270px;
    max-height: 170px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 5px;
    margin-top: 10px;
    margin-top: 10px;
    margin-left:auto;
    margin-right:auto;
    color:red;
    text-align: center;
    line-height:156px;
  }
</style>
