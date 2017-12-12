<template>
  <div class="con_list" style="display: flex;flex-flow:row;">
    <div style="width:306px;display: inline-block;padding-right:20px;position:relative">
      <img :src="previewProps.bgImg.includes('http://') ? previewProps.bgImg:Final.IMG_PATH+previewProps.bgImg" style="width: 300px;height:486px;position:absolute"/>
      <img src="../../assets/images/default/zhuanpan.png" style="width: 260px;position:absolute;left:20px;top:120px;"/>
      <img :src="previewProps.titleImg.includes('http://') ? previewProps.titleImg:Final.IMG_PATH+previewProps.titleImg" style="width: 260px;height:56px;position:absolute;left:20px;top:20px;"/>
      <!--<div v-if="this.previewProps.description">{{this.previewProps.description}}</div>-->
      <div class="raffle_number">您还有 <span>XXX</span> 次抽奖机会</div>
      <div v-if="previewProps.isShowJoinSize" class="all_number" >已有<span class="number">XXX</span>人参加</div>
      <div v-if="previewProps.isShowWinningRecord" class="news">
        <div class="t_news">
          <ul class="news_li">
            <li  style="color:#FFFFFF">XX刚刚抽中了<span>一等奖</span>，快来试试你的运气</li>
          </ul>
        </div>
      </div>

    </div>
    <div style="display: inline-block;flex:1">
      <el-row>
        <el-col>
          <!--<el-form :model="filterForm"  :rules="rules" ref="filterForm" label-width="120px" size="small" ></el-form>-->
          <el-tabs type="card"   v-model="prizeDrawSettingTab" >
            <el-tab-pane :disabled="this.disabledTab"  label="基础设置" name="base">
              <v-pz-base-setting ref="baseSetting" @editSaveCall="updatePrizeDrawInfo"  @call="syncPrizeDrawDetail" @previewCall="syncPreviewProps" :isEdit="isEdit" :prizeDrawDetail="prizeDrawDetail"></v-pz-base-setting>
            </el-tab-pane>
            <el-tab-pane :disabled="this.disabledTab"  label="抽奖设置" name="prize">
              <v-pz-prize-draw-setting ref="prizeDrawSetting" @editSaveCall="updatePrizeDrawInfo" @call="syncPrizeDrawDetail"  :isEdit="isEdit"  :prizeDrawDetail="prizeDrawDetail"></v-pz-prize-draw-setting>
            </el-tab-pane>
            <el-tab-pane :disabled="this.disabledTab"  label="奖品设置" name="gift">
              <v-pz-gift-setting ref="giftSetting" @editSaveCall="updatePrizeDrawInfo" @call="syncPrizeDrawDetail"  :isEdit="isEdit"  :prizeDrawDetail="prizeDrawDetail"></v-pz-gift-setting>
            </el-tab-pane>
            <el-tab-pane :disabled="this.disabledTab"  label="模板选择" name="template">
              <v-pz-template-setting ref="templateSetting" @editSaveCall="updatePrizeDrawInfo" @call="syncPrizeDrawDetail"  :isEdit="isEdit"  :prizeDrawDetail="prizeDrawDetail"></v-pz-template-setting>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
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
  import VTreeview from "./../../components/treeview.vue";
  import TestData from "./../../util/TestData"
  import VPzBaseSetting from "./../../components/prizeDraw/base_setting.vue";
  import VPzPrizeDrawSetting from "./../../components/prizeDraw/prize_draw_setting.vue";
  import VPzGiftSetting from "./../../components/prizeDraw/gift_setting.vue";
  import VPzTemplateSetting from "./../../components/prizeDraw/tmplate_setting.vue";
  export default {
    data() {
      return {
        Final:Final,
        disabledTab:false,
        isEdit:true,
        prizeDrawSettingTab:'base', //选项卡默认选中项1111111111111111111111111111
        prizeDrawDetail : {},
        prizeDrawCode:'',
        previewProps :{
            isShowJoinSize:true,
            isShowWinningRecord:true,
            bgImg:Final.DEFAULT_IMG.prizeDraw.default_bg,
            titleImg:Final.DEFAULT_IMG.prizeDraw.default_title,
            description:""
        },
      }
    },
    components :{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VTreeview,
      VPzBaseSetting,
      VPzPrizeDrawSetting,
      VPzGiftSetting,
      VPzTemplateSetting
    },
    created (){
      console.log(Final)
    },
    mounted (){
      this.initPage();
    },
    watch : {
      "$route": function (to, from) {
//        this.resetForm();
      }
    },
    methods : {
      initPage () {
          console.log("initPage----------------");
        this.prizeDrawCode = this.$route.params.prizeDrawCode;
        if(this.prizeDrawCode=='new'){
            this.isEdit=false;
            this.disabledTab=true;
          //新增相关操作
        }else if(this.prizeDrawCode){
          this.disabledTab=false;
          this.requestData()
        }
      },
      syncPrizeDrawDetail (data) {
        if(data.tag=="base"){
          this.prizeDrawDetail = Object.assign(this.prizeDrawDetail,data.callData);
          this.prizeDrawSettingTab ="prize";
        }else if(data.tag=="gift"){
          if(data.pre){
            this.prizeDrawSettingTab ="prize";
          }else {
            this.prizeDrawDetail = Object.assign(this.prizeDrawDetail, data.callData);
            this.prizeDrawSettingTab = "template";
          }
        }else if (data.tag=="prize"){
          if(data.pre){
            this.prizeDrawSettingTab ="base";
          }else{
            this.prizeDrawDetail = Object.assign(this.prizeDrawDetail,data.callData);
            this.prizeDrawSettingTab ="gift";
          }
        }else if(data.tag=="template"){
          if(data.pre){
            this.prizeDrawSettingTab ="gift";
          }else{
            this.prizeDrawDetail =Object.assign(this.prizeDrawDetail,data.callData);
            this.updatePrizeDrawInfo();
          }
        }

        console.log("updateObject-------------->",this.prizeDrawDetail);
      },
      updatePrizeDrawInfo(){
        if(this.$refs.baseSetting.validBaseItem() && this.$refs.prizeDrawSetting.validPrizeItem() && this.$refs.giftSetting.validGiftSetting() && this.$refs.templateSetting.validTemplateInfo()){
          let newPrizeDrawDetail = Object.assign({},this.prizeDrawDetail,this.$refs.baseSetting.getBaseItem(),this.$refs.prizeDrawSetting.getPrizeItem(),this.$refs.giftSetting.getGiftSetting(),this.$refs.templateSetting.getTemplateInfo())
          let param = {jsonData : JSON.stringify(newPrizeDrawDetail)}
          console.log(this.prizeDrawCode);
          if(this.prizeDrawCode=="new"){ //111111111111111111111111
            Api.pd_activity_add(param)
              .then(res => {
                if (res.status == true) {
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:"success",
                    scope:this,
                    callback:function (){
                      this.$router.push("/prizeDraw/list");
                    }
                  });

                }else {
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:"error"
                  });
                }
              }).catch(err => {

            });
          }else{
            Api.pd_activity_update(param)
              .then(res => {
                if (res.status == true) {
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:"success",
                    scope:this,
                    callback:function (){
                      this.$router.push("/prizeDraw/list");
                    }
                  });

                }else {
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:"error"
                  });
                }
              }).catch(err => {

            });
          }

        }
      },
      savePrizeDrawInfo(){
          let param = {jsonData : JSON.stringify(this.prizeDrawDetail)}
          Api.pd_activity_add(param)
            .then(res => {
              if (res.status == true) {
                console.log(JSON.stringify(res));
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"success",
                  scope:this,
                  callback:function (){
                    this.$router.push("/prizeDraw/list");
                  }
                });

              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error"
                });
              }
            }).catch(err => {

          });
      },
      syncPreviewProps(data){
//          isShowJoinSize:true,
//          isShowWinningRecord:true,
//          bgImg:"",
//          titleImg:"",
//          description:""
          if(data.isShowJoinSize>-1){
            this.previewProps.isShowJoinSize =  data.isShowJoinSize == 1? true : false;
          }
          if(data.isShowWinningRecord>-1){
            this.previewProps.isShowWinningRecord =  data.isShowWinningRecord == 1? true : false;
          }
          if(data.bgImg){
            this.previewProps.bgImg= data.bgImg;
          }
          if(data.titleImg){
            this.previewProps.titleImg= data.titleImg;
          }
          if(data.description){
             this.previewProps.description=data.description;
          }
          console.log("--------preview----data-----",JSON.stringify(this.previewProps));


      },
      /**
       * 请求抽奖活动详情
       */
      requestData () {
          console.log("request-----------------------------------");
        if(this.prizeDrawCode){
          let param = {activityCode:this.prizeDrawCode};
//          Object.assign(this.activityInfo,TestData.sedKill_checked_ticket_data.result);
//          console.log(this.activityInfo);
          Api.pd_activity_toedit(param)
            .then(res => {
              if (res.status == true) {
                console.log(JSON.stringify(res));
                this.prizeDrawDetail = res.result;
                this.syncPreviewProps(this.prizeDrawDetail);
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error"
                });
              }
            }).catch(err => {

          });
        }
      }
    }
  }
</script>
<style>
  .el-upload-dragger{
    width: 100%;
    height:100%;
  }
  .upload-demo{
    margin-top:10px;
  }
  .span-120{
    width: 120px;
    display: inline-block;
  }
  .margin-bottom-20{
    margin-bottom:20px;
  }


  .news {
    width: 200px;
    text-align: center;
    height: 20px;
    font-size:10px;
    overflow: hidden;
    line-height: 20px;
    background: rgba(0,0,0,.8);
    margin: 0 auto;
    border-radius: 10px;
    color: #ffffff;
    position:absolute;
    top:420px;
    left:50px;
  }
  .news .t_news {
    height:20px;
    color:#2a2a2a;
    overflow:hidden;
    position:relative;
    width:100%;
  }
  .news .news_li {
    line-height:20px;
    display:inline-block;
    position:absolute;
    top:0;
    width:100%;
    left:0;
    text-align:center;
    color:#ffffff;
  }
  .raffle_number {
    position:absolute;
    color: #ffffff;
    left:75px;
    top:90px;
  }
  .raffle_number>span { font-size: 14px; color: #FAF169; font-weight: bold;}
  .all_number {
    position:absolute;
    color: #ffffff;
    left:100px;
    top:393px;
  }
  .all_number>span  {font-size: 14px; color: #FAF169; font-weight: bold;}
  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
