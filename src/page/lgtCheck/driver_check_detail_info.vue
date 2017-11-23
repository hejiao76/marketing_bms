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
            <span class="bold">姓名：</span><span>{{this.driverInfo.name}}</span>
          </td>
          <td>
            <span class="bold"> 手机号：</span><span>{{this.driverInfo.userPhone}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="bold">驾驶证号：</span><span>{{this.driverInfo.driverLicenseNum}}</span>
          </td>
          <td>
            <!--<span class="bold"> 手机号：</span><span>{{this.driverInfo.userPhone}}</span>-->
          </td>
        </tr>
        <tr>
          <td class="approve_sfz">
            <span class="bold">驾驶证主页照片：</span><span></span>
            <p class="tc s_sfz">
              <img  v-on:click="showBigImg(Final.IMGURL+driverInfo.driverLicenseImg1)" v-bind:src="Final.IMGURL+driverInfo.driverLicenseImg1" class=""/>
            </p>
          </td>
          <td class="approve_sfz">
            <span class="bold">驾驶证副页照片：</span><span></span>
            <p class="tc s_sfz">
              <img  v-on:click="showBigImg(Final.IMGURL+driverInfo.driverLicenseImg2)" v-bind:src="Final.IMGURL+driverInfo.driverLicenseImg2" class=""/>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <span  class="bold">车牌号码：</span><span>{{this.driverInfo.vehicleLicenseNum}}</span>
          </td>
          <td>
            <span class="bold fl">车辆外观：</span>
            <p class="yj_p">
              {{this.driverInfo.vehicleLength}}
            </p>
          </td>
        </tr>
        <tr>
          <td class="">
            <span  class="bold">车辆类型：</span>
            <span v-if="showUpdateVehicle == false">
              <span>
                {{this.vehicleTypeObj.vehicleType}}
              </span>
              <span>
                <el-button  type="primary" size="small" @click="updateVehicleTypeClick">修改</el-button>
              </span>
            </span>
            <span v-if="showUpdateVehicle == true">
               <span ><el-select @change="syncVehicleInfo"  v-model="vehicleTypeObj.vehicleType" placeholder="请选择">
                  <el-option
                    v-for="item in vehicleTypeList"
                    :key="item.vehicleType"
                    :label="item.vehicleType"
                    :value="item.vehicleType">
                  </el-option>
                </el-select>
              </span>
              <span>
                <el-button @click="saveUpdateVehicle"  type="primary" size="small">保存</el-button>
                <el-button @click="cancelUpdateVehicle" size="small">取消</el-button>
              </span>
            </span>
          </td>
          <td>
            <span class="bold fl">箱体长度(mm)：</span>
            <p class="yj_p">
              {{this.vehicleTypeObj.boxLength || "无"}}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <span class="bold fl">箱体宽度(mm)：</span>
            <p class="yj_p">
              {{this.vehicleTypeObj.boxWidth  || "无"}}
            </p>
          </td>
          <td>
            <span  class="bold">箱体高度(mm)：</span><span>{{this.vehicleTypeObj.boxHeight  || "无"}}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span  class="bold">核载(kg)：</span><span>{{this.vehicleTypeObj.maxWeight  || "无"}}</span>
          </td>
        </tr>
        <tr>
          <td class="approve_sfz">
            <span class="bold">行驶证主页照片：</span><span></span>
            <p class="tc s_sfz">
              <img  v-on:click="showBigImg(Final.IMGURL+driverInfo.vehicleLicenseImg1)" v-bind:src="Final.IMGURL+driverInfo.vehicleLicenseImg1" class=""/>
            </p>
          </td>
          <td class="approve_sfz">
            <span class="bold">行驶证副页照片：</span><span></span>
            <p class="tc s_sfz">
              <img  v-on:click="showBigImg(Final.IMGURL+driverInfo.vehicleLicenseImg2)" v-bind:src="Final.IMGURL+driverInfo.vehicleLicenseImg2" class=""/>
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="approve_sfz">
            <span class="bold">行驶证副页背面照片：</span><span></span>
            <p class="tc s_sfz" v-if="driverInfo.vehicleLicenseImg3">
              <img  v-on:click="showBigImg(Final.IMGURL+driverInfo.vehicleLicenseImg3)" v-bind:src="Final.IMGURL+driverInfo.vehicleLicenseImg3" class=""/>
            </p>
            <p class="tc s_sfz" v-else>
              <span class="no-submit">用户未提交</span>
            </p>
          </td>
        </tr>
      </table>
      <el-row class="mt20 mb20">
        <el-col :span="24" style="text-align:center;"><el-button v-if="this.driverInfo.status==2" @click = "reviewInfoEx" type="primary">信息异常</el-button></el-col>
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
        bigImgRemote:0,
        bigImgSrc:"",
        dialogPicVisible:false,
        fromURL:'',
        driverInfoId:'',
        driverInfo:'',
        Final:'',
        checkType:1,
        checkLogs:[], //审核记录集合,
        showCheckLog:1,
        dialogFormVisible:false,
        checkLogDetail:'',
        vehicleTypeList:[],
        vehicleTypeObj : {
            vehicleType:"",
            boxHeight:"",
            boxLength:"",
            boxWidth:"",
            maxWeight:""
        },
        showUpdateVehicle : false

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
      /**
       * 取消车型信息修改
       */
      cancelUpdateVehicle () {
          console.log("111111111");
        this.showUpdateVehicle =false;
//        this.vehicleTypeObj.vehicleType=this.driverInfo.newVehicleType || this.driverInfo.vehicleType;
//        this.vehicleTypeObj.vehicleLength=this.driverInfo.vehicleLength
        this.vehicleTypeObj.vehicleType=this.driverInfo.newVehicleType || this.driverInfo.vehicleType;
        this.vehicleTypeObj.boxLength=this.driverInfo.boxLength;
        this.vehicleTypeObj.boxHeight=this.driverInfo.boxHeight;
        this.vehicleTypeObj.boxWidth=this.driverInfo.boxWidth;
        this.vehicleTypeObj.maxWeight=this.driverInfo.maxWeight;
      },
      /**
       * 保存车型信息修改
       */
      saveUpdateVehicle () {
        if(this.driverInfoId){
          let param= {userPhone:this.driverInfoId,newVehicleType:this.vehicleTypeObj.vehicleType};
          Api.lc_driver_update_new_vehicle_type(param)
            .then(res => {
              if(res.status==1){
                this.$refs.tipMsgRef.showTipMsg({
                  msg:"修改成功",
                  type:"success",
                  scope:this,
                  callback:function (){
                      this.showUpdateVehicle =false;
                      this.requestPersonalInfo();
                  }
                });
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error"
                });
              }
            }).catch(err =>{

          });
        }
      },
      /**
       * 同步车型信息
       */
      syncVehicleInfo (selected) {
          if(this.vehicleTypeList && this.vehicleTypeList.length>0){
              for(let i = 0 ; i<this.vehicleTypeList.length;i++){
                  let item =this.vehicleTypeList[i];
                  if(item.vehicleType == selected) {
                      this.vehicleTypeObj.boxLength=item.length;
                      this.vehicleTypeObj.boxHeight=item.heigth;
                      this.vehicleTypeObj.boxWidth=item.width;
                      this.vehicleTypeObj.maxWeight=item.maxWeight;
                  }
              }
          }
      },
      /**
       * 获取车辆类型及长宽高荷载信息
       */
      requestVehicleTypeInfo () {
        if(this.driverInfoId){
          let param= {};
          Api.lc_driver_query_vehicle_info(param)
            .then(res => {
              if(res.status==1){
                  this.vehicleTypeList=res.result;
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error"
                });
              }
            }).catch(err =>{

          });
        }
      },
      /**
       * 车辆类型修改按钮点击
       */
      updateVehicleTypeClick () {
          this.showUpdateVehicle =true;
          this.requestVehicleTypeInfo();
      },
      reviewInfoEx () {
        if(this.driverInfoId){
          let param= {userPhone:this.driverInfoId,token:localStorage.getItem("token"),applicantUserType:"driver"};
          Api.lc_driver_review_info_ex(param)
            .then(res => {
              if(res.status==1){
                this.$refs.tipMsgRef.showTipMsg({
                  msg:'操作成功',
                  type:"success",
                  scope:this,
                  callback:function (){
                    this.$router.push(this.fromURL || ("/lgtcheck/drivercheck/"+this.checkType));
                  }
                });
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message || '审核异常，请重试',
                  type:"error"
                });
              }
            }).catch(err =>{

          });
        }
      },
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
      /**
       * 校验数据状态
       * */
//      getCheckTypeByStatus (data) {
//        if(Final.CHECK_TYPE_MAPPING[1].includes(data.status)){
//            this.checkType=1;
//        }else if(Final.CHECK_TYPE_MAPPING[2].includes(data.status)){
//          this.checkType=2;
//        }else if(Final.CHECK_TYPE_MAPPING[3].includes(data.status)){
//          this.checkType=3;
//        }else if(Final.CHECK_TYPE_MAPPING[4].includes(data.status)){
//          this.checkType=4;
//        }
//
//      },
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
        if(this.driverInfoId){
          let param= {userPhone:this.driverInfoId,token:localStorage.getItem("token")};
          Api.lc_driver_check_info(param)
            .then(res => {
              if(res.status==1){
                this.driverInfo=res.result;
                this.showUpdateVehicle =false;
                this.vehicleTypeObj.vehicleType=res.result.newVehicleType || res.result.vehicleType;
                this.vehicleTypeObj.boxLength=res.result.boxLength;
                this.vehicleTypeObj.boxHeight=res.result.boxHeight;
                this.vehicleTypeObj.boxWidth=res.result.boxWidth;
                this.vehicleTypeObj.maxWeight=res.result.maxWeight;
                this.checkLogs=res.result.auditLogList;
//                this.getCheckTypeByStatus(res.result);
//                if(this.checkType==3){
//                    this.requestCheckReason(res.result.auditId);
//
//                }
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
