<template>
  <div class="con_list" style="display: flex;flex-flow:row;">
    <div style="width:306px;display: inline-block;padding-right:20px;">
      <!--<img src="../../assets/images/mod.png" style="width: 100%"/>-->
    </div>
    <div style="display: inline-block;flex:1">
      <el-row>
        <el-col>
          <!--<el-form :model="filterForm"  :rules="rules" ref="filterForm" label-width="120px" size="small" ></el-form>-->
          <el-tabs type="card"   v-model="prizeDrawSettingTab" >
            <el-tab-pane disabled  label="基础设置" name="base">
              <v-pz-base-setting  @call="syncPrizeDrawDetail" :prizeDrawDetail="prizeDrawDetail"></v-pz-base-setting>
            </el-tab-pane>
            <el-tab-pane disabled label="抽奖设置" name="prize">
              <v-pz-prize-draw-setting :prizeDrawDetail="prizeDrawDetail"></v-pz-prize-draw-setting>
            </el-tab-pane>
            <el-tab-pane disabled label="奖品设置" name="gift">
              <v-pz-gift-setting :prizeDrawDetail="prizeDrawDetail"></v-pz-gift-setting>
            </el-tab-pane>
            <el-tab-pane disabled label="模板选择" name="template">
              <v-pz-template-setting :prizeDrawDetail="prizeDrawDetail"></v-pz-template-setting>
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
  //  import ElCol from "element-ui/packages/col/src/col";
  //  import ElRow from "element-ui/packages/row/src/row";
  //  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  export default {
    data() {
      return {
        prizeDrawSettingTab:'prize', //选项卡默认选中项
        prizeDrawDetail : {},
        prizeDrawCode:'',
//        addPrizeList:[{isshow:true},{isshow:true}],
//        labelPosition:'left',
//        optionsActivityStart :{
//          disabledDate:(time) => {
//            if(this.activityInfo.activityEndDate){
//              let d = new Date (this.activityInfo.activityEndDate)
//              return time.getTime() >d.getTime();
//            }
//          }
//        },
//        optionsActivityEnd :{
//          disabledDate:(time) => {
//            if(this.activityInfo.activityStartDate){
//              let d = new Date (this.activityInfo.activityStartDate)
//              return time.getTime() <d.getTime();
//            }
//          }
//        },
//        labelPosition:'left',
//        filterForm: {
//          activityName: '',
//          activityStartDate:'',//活动开始时间
//          activityEndDate:'', //活动结束时间
//          imageUrl: '',
//          activityArea:'',
//          radio:1,
//        },
//        rules: {
//          activityName: [
//            { required: true, message: '请输入活动名称', trigger: 'blur' },
//            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
//          ],
//          activityStartDate: [
//            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//          ],
//          activityEndDate: [
//            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//          ],
//        },
//        activityId:'', //秒杀活动ID
//        activityInfo:{},
      }
    },
    components :{
//      ElButton,
//      ElRow,
//      ElCol,
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

    },
    mounted (){
      this.initPage();
    },
    watch : {
      "$route": function (to, from) {
        this.resetForm();
      }
    },
    methods : {
      initPage () {
        this.prizeDrawCode = this.$route.params.prizeDrawCode;
        if(this.prizeDrawCode=='new'){
          //新增相关操作
        }else if(this.prizeDrawCode){
          this.requestData()
        }
      },
      syncPrizeDrawDetail (data) {

        if(data.tag=="base"){
          this.prizeDrawDetail = Object.assign({},this.prizeDrawDetail,data.callData);
          this.prizeDrawSettingTab ="prize";
        }else if(data.tag=="gift"){

        }else if (data.tag=="prize"){

        }else if(data.tag=="tmplate"){

        }
        console.log("updateObject-------------->",this.prizeDrawDetail);
      },
      /**
       * 请求抽奖活动详情
       */
      requestData () {
        if(this.prizeDrawCode){
          let param = {activityCode:this.prizeDrawCode};
//          Object.assign(this.activityInfo,TestData.sedKill_checked_ticket_data.result);
//          console.log(this.activityInfo);
          Api.pd_activity_toedit(param)
            .then(res => {
              if (res.status == true) {
                console.log(JSON.stringify(res));
                this.prizeDrawDetail = res.result;
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
    width: 150px;
    height: 150px;
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
  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
