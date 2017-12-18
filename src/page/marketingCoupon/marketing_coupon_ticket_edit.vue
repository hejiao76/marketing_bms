<template>

  <div class="con_list">
      <el-row>
        <el-col :span="24">
          <el-tabs type="card" v-model="couponSettingTab">
            <el-tab-pane name="base" :disabled="this.disabledTab"  label="基本信息">
              <v-coupon-base-info ref="baseSetting" @errorTipMsg="showChildTipMsg" @editSaveCall="updateCouponInfo"  @call="syncCouponDetail" :isEdit="isEdit" :couponDetail="couponDetail"></v-coupon-base-info>
            </el-tab-pane>
            <el-tab-pane :disabled="this.disabledTab" name="series" label="抵扣车系">
              <v-coupon-bind-car-series ref="seriesSetting" @getTmpSeriesData="getTmpSeriesData" @errorTipMsg="showChildTipMsg" @editSaveCall="updateCouponInfo" @call="syncCouponDetail"   :isEdit="isEdit"  :couponDetail="couponDetail"></v-coupon-bind-car-series>
            </el-tab-pane>
            <el-tab-pane :disabled="this.disabledTab"  name="type" label=" 抵扣类型 ">
              <v-coupon-type ref="typeSetting" @errorTipMsg="showChildTipMsg" @editSaveCall="updateCouponInfo" @call="syncCouponDetail"  :isEdit="isEdit" :tmpSeriesData="tmpSeriesData"  :couponDetail="couponDetail"></v-coupon-type>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "../../../static/baseSetting/Final";
  import * as util from "./../../util/util"
  import Api from "./../../fetch/api";
  import VTipMsg from "./../../components/tipMsg.vue";
  import UE from './../../components/ue/ue.vue';
  import VCouponBaseInfo from "./../../components/coupon/coupon_base_info.vue"
  import VCouponBindCarSeries from "./../../components/coupon/coupon_bind_car_series.vue"
  import VCouponType from "./../../components/coupon/coupon_type.vue"
  export default {
    data() {
      return {
        tmpSeriesData:{}, //车系缓存数据----查询礼包时使用
        disabledTab:false,
        isEdit:true,
        isCopy:false,
        couponSettingTab:'base', //选项卡默认选中项
        couponDetail : {},
        couponCode:''
      };
    },
    components :{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VCouponBaseInfo,
      VCouponBindCarSeries,
      VCouponType

    },
    created (){

    },
    mounted (){
      this.initPage();
    },
    methods : {
      initPage () {
        this.couponCode = this.$route.params.ticketId;
        let type= this.$route.params.type;
        this.isCopy = type =="copy" ? true : false;
        if(this.couponCode=='new'){
          //新增相关操作
          this.isEdit=false;
          this.disabledTab=true;
        }else if(this.couponCode){
          //编辑相关操作
          if(type=="series"){
              this.couponSettingTab="series"
          } else if(type=="type"){
            this.couponSettingTab="type"
          }
          this.disabledTab=false;
          this.requestData()
        }
      },
      syncCouponDetail (data) {
        if(data.tag=="base"){
          this.couponDetail = Object.assign(this.couponDetail,data.callData);
          this.couponSettingTab ="series";
        }else if(data.tag=="series"){
          if(data.pre){
            this.couponSettingTab ="base";
          }else {
            this.couponDetail = Object.assign(this.couponDetail, data.callData);
            this.couponSettingTab = "type";
            this.disabledTab=false;
          }
        }else if (data.tag=="type"){
          if(data.pre){
            this.couponSettingTab ="series";
          }else{
            this.couponDetail = Object.assign(this.couponDetail,data.callData);
            this.saveCouponInfo();
          }
        }
      },
      updateCouponInfo(){
        if(this.$refs.baseSetting.validBaseItem() && this.$refs.seriesSetting.validSeriesItem() && this.$refs.typeSetting.validTypeItem()){
          let newCouponDetail = Object.assign({},this.couponDetail,this.$refs.baseSetting.getBaseItem(),this.$refs.seriesSetting.getSeriesItem(),this.$refs.typeSetting.getTypeItem())
          let param = newCouponDetail
          Api.cp_activity_coupon_save(param)
            .then(res => {
              if (res.status == true) {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:"操作成功",
                  type:"success",
                  scope:this,
                  callback:function (){
                    this.$router.push("/coupon/ticket_list");
                  }
                });
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error"
                });
              }
            }).catch(err => {
              console.log("err----------",err);
          });
        }
      },
      saveCouponInfo(){
          this.updateCouponInfo();
      },
      /**
       * 请求抵扣券详情
       */
      requestData () {
        if(this.couponCode){
          let param = {id:this.couponCode};
          Api.cp_activity_coupon_info(param)
            .then(res => {
              if (res.status == true) {
                this.couponDetail = res.result;
                if(this.isCopy ){
                  delete this.couponDetail.id;
                }
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error",
                  scope:this,
                  callback:function (){
                    this.$router.push("/coupon/ticket_list");
                  }
                });
              }
            }).catch(err => {
            console.log("err----------",err);
          });
        }
      },
      getTmpSeriesData(data){
          this.tmpSeriesData =  Object.assign({},data);
      },
      showChildTipMsg (data) {
        this.$refs.tipMsgRef.showTipMsg({
          msg:data.msg,
          type:"error"
        });
      }

    }
  }
</script>
<style scoped="scope">
  .el-form-item{
    margin-bottom: 20px;
  }

  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
