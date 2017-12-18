//基础设置模块
<template>
  <div>
    <el-form :model="baseSettingForm" :rules="rules" ref="baseSettingForm" size="small" label-width="120px" class="demo-ruleForm" label-position="left">
      <div class="filter_div mb20">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="抵扣券名称:" prop="name">
              <el-input v-model="baseSettingForm.name" placeholder="请输入抵扣券名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抵扣券有效期:"  prop="validity">
              <el-date-picker style="width: 100%;" v-model="baseSettingForm.validity" :editable="false" :clearable="false"  :picker-options="optionsValidity" type="datetime" placeholder="选择有效期日期"></el-date-picker>
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
            <el-form-item label="抵扣券金额:" prop="amount">
              <!--<el-input v-model="baseSettingForm.amount"></el-input>-->
              <el-input-number style="width: 100%;" v-model="baseSettingForm.amount" :max="99999999" :controls="false" placeholder="请输入抵扣券金额"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="简介:" prop="description">
              <el-input type="textarea" v-model="baseSettingForm.description" placeholder="请输入简介"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span style="color: #fa5555;margin-right: 4px;margin-top:10px;float:left;">*</span>
            <el-form-item label="抵扣券说明:" prop="remarks">
              <UE ref="ueRef" :defaultMsg=baseSettingForm.details :config=config :id=ue1 ></UE>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="text-align: center">
              <el-button v-if="isEdit" type="primary" @click="editSave">保存</el-button>
              <el-button v-if="!isEdit" type="primary" @click="saveBaseItem">下一步</el-button>
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
import Final from "../../../static/baseSetting/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
import UE from './../../components/ue/ue.vue';
export default {
  props:['couponDetail',"isEdit"],
  data () {
    return {
          ue1: "ue1", // 不同编辑器必须不同的id
        ue2: "ue2",
              config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
      optionsValidity :{
        disabledDate:(time) => {
            return time.getTime() < new Date().getTime();
        }
      },
//      optionsActivityStart :{
//        disabledDate:(time) => {
//          if(this.baseSettingForm.beginTime){
//            let d = new Date (this.baseSettingForm.endTime)
//            return time.getTime() >d.getTime() ||  time.getTime() < new Date().getTime();
//          }
//        }
//      },
//      optionsActivityEnd :{
//        disabledDate:(time) => {
//          if(this.baseSettingForm.endTime){
//            let d = new Date (this.baseSettingForm.beginTime)
//            return time.getTime() <d.getTime() ||  time.getTime() < new Date().getTime();
//          }
//        }
//      },
      baseSettingForm:{
        name:'', //活动名称
        validity:'', //有效期时间
//        endTime:new Date(new Date().setDate(new Date().getDate()+7)), //活动结束时间
        amount:0, //抵扣金额
        description:'', //简介
        details:'',//秒杀

      },
      rules: {
        name: [
          { required: true, message: '请填写活动名称', trigger: 'blur' },
          { max:10,message:'活动名称最大长度为10', trigger: 'blur' }
        ],
//        isShowJoinSize: [
//          { required: true, message: '请选择是否显示参与人数', trigger: 'change' }
//        ],
//        isShowWinningRecord: [
//          { required: true, message: '请选择是否显示获奖信息', trigger: 'change' }
//        ],
        validity :[
          { required: true, type:"date", message: '请填写有效期时间', trigger: 'change' }
        ],
        amount: [
          { required: true, type:"number", message: '请输入抵扣金额', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { max:200,message:'简介最大长度为200', trigger: 'blur' }
        ]
      },
    }
  },
  components :{
    UE,
    VTipMsg
  },
  watch : {
    couponDetail (val, oldval) {
      this.cloneBaseInfo();
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
    cloneBaseInfo() {
      if(this.couponDetail){
        this.baseSettingForm = {
          name:this.couponDetail.name, //活动名称
          validity:this.couponDetail.validity ? new Date(this.couponDetail.validity) : '', //抵扣券有效期
          amount:this.couponDetail.amount || '', //抵扣金额
          description:this.couponDetail.description || '',//抵扣券简介
          details:this.couponDetail.details || '', //抵扣券详情
        }
      }
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
      this.$refs['baseSettingForm'].validate((valid) => {
        if (!valid) {
          this.$message({
            type:'error',
            message:'基本信息填写有误',
            duration:'1500'
          });
          validStatus=false;
          return false;
        }else {
            if(!this.validUEContent()){
              validStatus=false;
            }
        }
      });
      return validStatus;
    },
    getBaseItem(){
        let newBaseItem = Object.assign({},this.baseSettingForm);
        newBaseItem.validity = this.formatDateToString(this.baseSettingForm.validity);
        return newBaseItem;
    },
    /**
     *  下一步 基本信息设置
     * @param ticketId
     */
    saveBaseItem(){
        if(this.validBaseItem()){
              this.$emit("call",{tag:"base",callData:this.getBaseItem()});
        }
    },
    validUEContent (){
        let details=this.$refs.ueRef.getUEContent();
       if(this.$refs.ueRef.getUEContent()){
           this.baseSettingForm.details=details;
           return true;
       }else{
         this.$emit("errorTipMsg",{msg:"请填写抵扣券说明"});
           return false;
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
