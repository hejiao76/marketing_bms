//基础设置模块
<template>
  <div>
    <el-form :model="baseSettingForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm" label-position="left">
      <div class="filter_div mb20">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="抵扣券名称" prop="ticketName">
              <el-input v-model="baseSettingForm.ticketName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抵扣券有效期" required>
              <el-date-picker style="width: 100%;" v-model="baseSettingForm.validity" :editable="false"  :picker-options="optionsValidity" type="datetime" placeholder="选择开始日期"></el-date-picker>
              <!--<el-col :span="11">-->
                <!--<el-form-item prop="activityStartDate">-->
                  <!--<el-date-picker style="width: 100%;" v-model="baseSettingForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col class="line" :span="2" style="text-align: center">-</el-col>-->
              <!--<el-col :span="11">-->
                <!--<el-form-item prop="activityEndDate">-->
                  <!--<el-date-picker style="width: 100%;" v-model="baseSettingForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="活动名称" prop="applyCar">
              <el-input v-model="baseSettingForm.applyCar"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="秒杀券说明：" prop="remarks">
              <el-input type="textarea" v-model="baseSettingForm.remarks"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="秒杀券详情：" prop="remarks">
              <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "./../../util/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
import VTreeview from "./../../components/treeview.vue";
import UE from './../../components/ue/ue.vue';
export default {
  props:['couponDetail',"isEdit"],
  data () {
    return {
      optionsValidity :{
        disabledDate:(time) => {
          if(this.baseItem.validity){
            return time.getTime() < new Date().getTime();
          }
        }
      },
//      optionsActivityStart :{
//        disabledDate:(time) => {
//          if(this.baseItem.beginTime){
//            let d = new Date (this.baseItem.endTime)
//            return time.getTime() >d.getTime() ||  time.getTime() < new Date().getTime();
//          }
//        }
//      },
//      optionsActivityEnd :{
//        disabledDate:(time) => {
//          if(this.baseItem.endTime){
//            let d = new Date (this.baseItem.beginTime)
//            return time.getTime() <d.getTime() ||  time.getTime() < new Date().getTime();
//          }
//        }
//      },
      baseSettingForm:{
        name:'', //活动名称
        validity:new Date(new Date().setHours(new Date().getHours()+1)), //有效期时间
//        endTime:new Date(new Date().setDate(new Date().getDate()+7)), //活动结束时间
        amount:1, //抵扣金额
        description:'', //简介
        details:'',//秒杀

      },
      rules: {
        name: [
          { required: true, message: '请填写活动名称', trigger: 'change' },
          { max:10,message:'活动名称最大长度为10', trigger: 'blur' }
        ],
//        isShowJoinSize: [
//          { required: true, message: '请选择是否显示参与人数', trigger: 'change' }
//        ],
//        isShowWinningRecord: [
//          { required: true, message: '请选择是否显示获奖信息', trigger: 'change' }
//        ],
        bgImg: [
          { required: true, message: '请上传背景图片', trigger: 'change' }
        ],
        titleImg: [
          { required: true, message: '请上传标题图片', trigger: 'change' }
        ],
        shareImg: [
          { required: true, message: '请上传分享图片', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入活动说明', trigger: 'blur' }
        ]
      },
    }
  },
  components :{
    VTreeview,
    UE,
    VTipMsg
  },
  watch : {
    couponDetail (val, oldval) {
      this.cloneTicketInfo();
      this.requsetLocation();
    }
  },
  created () {
  },
  mounted () {
  },
  methods:{
    editSave (){
      this.$emit("editSaveCall");
    },
      requsetLocation (){
        Api.base_sys_location({})
          .then(res => {
            if (res.status == true) {
              console.log(res);
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
    cloneTicketInfo() {
      if(this.couponDetail && this.couponDetail.name){
        this.baseItem = {
          name:this.couponDetail.name, //活动名称
          beginTime:new Date(this.couponDetail.beginTime), //活动开始时间
          endTime:new Date(this.couponDetail.endTime), //活动结束时间
          isShowJoinSize:this.couponDetail.isShowJoinSize || 1, //是否显示参与人数
          addJoinSize:this.couponDetail.addJoinSize || 0, //添加参与人数
          isShowWinningRecord:this.couponDetail.isShowWinningRecord || 1, //是否显示中奖记录
          bgImg:this.couponDetail.bgImg,//背景图片地址,
          titleImg:this.couponDetail.titleImg, //标题图片地址,
          shareImg:this.couponDetail.shareImg,//分享图片地址
          area:this.couponDetail.area,//活动地区JSON串
          carStyle:this.couponDetail.carStyle,// 车系车型JSON串
          description:this.couponDetail.description,//活动说明
        }
      }
    },
    /**
     * 上传图片成功回调
     * @param res
     * @param file
     */
    handleAvatarSuccess(res, file) {
      this.baseItem.bgImg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    /**
     * 日期转1字符串
     * @param date
     */
    formatDateToString (date){
      if(typeof date == 'object'){
        return util.toFullDateString(date.getTime());
      }else{
        return date;
      }
    },
    validBaseItem () {
      let validStatus=true;
      this.$refs['baseItem'].validate((valid) => {
        if (!valid) {
          this.$refs.tipMsgRef.showTipMsg({
            msg:"基础设置填写有误",
            type:"error"
          });
          validStatus=false;
          return false;
        }
      });
      return validStatus;
    },
    getBaseItem(){
        return this.baseItem;
    },
    /**
     *  下一步 基本信息设置
     * @param ticketId
     */
    saveBaseItem(){
        if(this.validBaseItem()){
              let newBaseItem = Object.assign({},this.baseItem);
              newBaseItem.beginTime = this.formatDateToString(this.baseItem.beginTime);
              newBaseItem.endTime = this.formatDateToString(this.baseItem.endTime);
              this.$emit("call",{op:"edit",tag:"base",callData:newBaseItem});
        }
    },
    /**
     * 自定义验证规则
     * @returns
     */
    userValidate (){
        return {
      }
    },
  }
}
</script>

<!-- Add1111 "scoped" attribute to limit CSS to this component only -->
<style >
  /*.avatar-uploader .el-upload {*/
    /*border: 1px dashed #d9d9d9;*/
    /*border-radius: 6px;*/
    /*cursor: pointer;*/
    /*position: relative;*/
    /*overflow: hidden;*/
  /*}*/
  /*.avatar-uploader .el-upload:hover {*/
    /*border-color: #409EFF;*/
  /*}*/
  /*.avatar-uploader-icon {*/
    /*font-size: 28px;*/
    /*color: #8c939d;*/
    /*width: 100px;*/
    /*height: 100px;*/
    /*line-height: 100px;*/
    /*text-align: center;*/
  /*}*/
  /*.avatar {*/
    /*width: 100px;*/
    /*height: 100px;*/
    /*display: block;*/
  /*}*/
</style>
