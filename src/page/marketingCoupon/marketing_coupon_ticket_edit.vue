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
  import Final from "./../../util/Final";
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
        couponCode:'',
//        optionsActivityStart :{
//          disabledDate:(time) => {
//            if(this.filterForm.activityEndDate){
//              let d = new Date (this.filterForm.activityEndDate)
//              return time.getTime() >d.getTime();
//            }
//          }
//        },
//        optionsActivityEnd :{
//          disabledDate:(time) => {
//            if(this.filterForm.activityStartDate){
//              let d = new Date (this.filterForm.activityStartDate)
//              return time.getTime() <d.getTime();
//            }
//          }
//        },
//        labelPosition:'left',
//        defaultMsg: '这里是UE测试',
//        config: {
//          initialFrameWidth: null,
//          initialFrameHeight: 350
//        },
//        ue1: "ue1", // 不同编辑器必须不同的id
//        ue2: "ue2",
//        filterForm: {
//          ticketName: '',
//          activityStartDate:'',//活动开始时间
//          activityEndDate:'', //活动结束时间
//          applyCar:'',
//          remarks:'',
//          radio:'1',
//          carList:['博越','远景','帝豪','博越','博越',],
//          dikouType:true,//抵扣车型
//          otherWay:false,// 其他权益
//
//        },
//        rules: {
//          ticketName: [
//            { required: true, message: '请输入活动名称', trigger: 'blur' },
//            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
//          ],
//          activityStartDate: [
//            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//          ],
//          activityEndDate: [
//            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//          ],
//          applyCar: [
//            { required: true, message: '秒杀券适用车系', trigger: 'blur' },
//            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
//          ],
//          remarks: [
//            { required: true, message: '秒杀券说明', trigger: 'blur' },
//            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
//          ],
//        }
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
        console.log("updateObject-------------->",this.couponDetail);
      },
      updateCouponInfo(){
        if(this.$refs.baseSetting.validBaseItem() && this.$refs.seriesSetting.validSeriesItem() && this.$refs.typeSetting.validTypeItem()){
          let newCouponDetail = Object.assign({},this.couponDetail,this.$refs.baseSetting.getBaseItem(),this.$refs.seriesSetting.getSeriesItem(),this.$refs.typeSetting.validTypeItem())
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
//        let param = {jsonData : JSON.stringify(this.couponDetail)}
//        Api.pd_activity_update(param)
//          .then(res => {
//            if (res.status == true) {
//              console.log(JSON.stringify(res));
//
//            }else {
//              this.$refs.tipMsgRef.showTipMsg({
//                msg:res.message,
//                type:"error"
//              });
//            }
//          }).catch(err => {
//
//        });
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
                console.log(JSON.stringify(res));
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
//          console.log("parent------>",this.tmpSeriesData);
          this.tmpSeriesData =  Object.assign({},data);
        console.log("parent------>",this.tmpSeriesData);
      },
      showChildTipMsg (data) {
        this.$refs.tipMsgRef.showTipMsg({
          msg:data.msg,
          type:"error"
        });
      },
//      getUEContent() {
//        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
//        this.$notify({
//          title: '获取成功，可在控制台查看！',
//          message: content,
//          type: 'success'
//        });
//        console.log(content)
//      },
//      submitForm(formName) {
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            alert('submit!');
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
//      },
//      resetForm(formName) {
//        this.$refs[formName].resetFields();
//      },
//      /**
//       * 选项卡点击事件触发
//       * @returns {}
//       */
//      changeActivityType (tab, event){
//        this.activityType = tab.name;
//      },
//      addCoupon(){
//        '1111'.log
//        this.$refs.ticketDialog.showDialog();
//      }

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
