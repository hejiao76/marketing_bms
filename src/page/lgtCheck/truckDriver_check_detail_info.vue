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
        <td class="" colspan="3"><span class="bold fl">姓名：</span>
          <p class="yj_p">
            {{this.truckDriverInfo.userName}}
            </p>
        </td>
      </tr>
      <tr>
        <td class="" colspan="3"><span class="bold fl">手机号：</span>
          <p class="yj_p">
            {{this.truckDriverInfo.userPhone}}
            </p>
        </td>
      </tr>
      <tr>
        <td class="" colspan="3"><span class="bold fl">驾驶证号：</span>
          <p class="yj_p">
            {{this.truckDriverInfo.driverLicenseNo}}
            </p>
        </td>
      </tr>
      <!--<tr>-->
        <!--<td>-->
          <!--<span class="bold">姓名：</span><span>{{this.truckDriverInfo.userName}}</span>-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>-->
          <!--<span class="bold"> 手机号：</span><span>{{this.truckDriverInfo.userPhone}}</span>-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>-->
          <!--<span class="bold">驾驶证号：</span><span>{{this.truckDriverInfo.driverLicenseNo}}</span>-->
        <!--</td>-->

      <!--</tr>-->
      <tr>
        <td class="approve_sfz">
          <span class="bold">驾驶证正面：</span><span></span>
          <p class="tc s_sfz">
            <img  v-on:click="showBigImg(Final.IMGURL+truckDriverInfo.driverLicenseImg1)" v-bind:src="Final.IMGURL+truckDriverInfo.driverLicenseImg1" class=""/>
          </p>
        </td>
        <td class="approve_sfz">
          <span class="bold">驾驶证背面：</span><span></span>
          <p class="tc s_sfz">
            <img  v-on:click="showBigImg(Final.IMGURL+truckDriverInfo.driverLicenseImg2)" v-bind:src="Final.IMGURL+truckDriverInfo.driverLicenseImg2" class=""/>
          </p>
        </td>
        </tr>
      <!--<tr>-->

        <!--<td></td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td colspan="3" class="approve_sfz">-->
          <!--<span class="bold">驾驶证正面：</span><span></span>-->
          <!--<p class="tc s_sfz" v-if="truckDriverInfo.driverLicenseImg1">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckDriverInfo.driverLicenseImg1)" v-bind:src="Final.IMGURL+truckDriverInfo.driverLicenseImg1" class=""/>-->
          <!--</p>-->
          <!--<p class="tc s_sfz" v-else>-->
            <!--<span class="no-submit">用户未提交</span>-->
          <!--</p>-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td colspan="3" class="approve_sfz">-->
          <!--<span class="bold">驾驶证背面：</span><span></span>-->
          <!--<p class="tc s_sfz" v-if="truckDriverInfo.driverLicenseImg2">-->
            <!--<img  v-on:click="showBigImg(Final.IMGURL+truckDriverInfo.driverLicenseImg2)" v-bind:src="Final.IMGURL+truckDriverInfo.driverLicenseImg2" class=""/>-->
          <!--</p>-->
          <!--<p class="tc s_sfz" v-else>-->
            <!--<span class="no-submit">用户未提交</span>-->
          <!--</p>-->
        <!--</td>-->
      <!--</tr>-->
    </table>
    <!--<el-row class="mt20 mb20">-->
      <!--<el-col :span="24" style="text-align:center;"><el-button v-if="this.truckDriverInfo.status==2" @click = "reviewInfoEx" type="primary">信息异常</el-button></el-col>-->
    <!--</el-row>-->
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
        truckDriverInfoId:'',
        truckDriverInfo:'',
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
      this.truckDriverInfoId=this.$route.params.truckDriverInfoId;
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
        if(this.truckDriverInfoId){
          let param= {userPhone:this.truckDriverInfoId,token:localStorage.getItem("token")};
          Api.truckDriver_check_info(param)
            .then(res => {
              if(res.status==1){
                this.truckDriverInfo=res.result;
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
