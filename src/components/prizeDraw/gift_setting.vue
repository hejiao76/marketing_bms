//奖品设置模块
<template>
  <div class="giftSetting">
    <el-form :model="giftSetting"  :rules="rules" ref="giftSetting" label-width="120px" size="small" >
      <el-row>
        <el-col :span="24" class="">
          <el-form-item label="兑奖时间:" label-width="80px;" prop="activityName">
            <el-row>
            <el-col :span="10">
              <el-form-item prop="redeemBeginTime">
                <el-date-picker :clearable="false" :editable="false"  style="width: 100%;" type="datetime" v-model="giftSetting.redeemBeginTime"
                                :picker-options="optionsActivityStart"
                                placeholder="选择开始日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="10">
              <el-form-item prop="redeemEndTime">
                <el-date-picker :clearable="false" :editable="false"  style="width: 100%;" type="datetime" v-model="giftSetting.redeemEndTime"
                                :picker-options="optionsActivityEnd"
                                placeholder="请输入结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      <v-gift-setting-item v-for="(prizeItem,index) in giftSetting.prizeList" ref='prizeItem' @callRemove="removeGiftItem"  :prizeDrawDetail="prizeDrawDetail" :serialStr="serialStr" :isEdit="isEdit" :isHaveInHand="isHaveInHand" :itemIndex="index"  :key="prizeItem.prizeId" :prizeItem="prizeItem"></v-gift-setting-item>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-button v-if="giftSetting.prizeList.length<5" :disabled="isEdit" @click="addGiftItem"  type="primary">增加奖项</el-button>
      </el-col>
    </el-row>
      <el-row>
        <el-col :span="24" style="text-align: center;">
          <el-button @click="preFn"  type="primary">上一步</el-button>
          <el-button @click="saveGiftSetting"  type="primary">下一步</el-button>
          <el-button v-if="isEdit"  type="primary" @click="editSave">保存</el-button>
        </el-col>
      </el-row>

    <!--<el-form :model="checkedTicketItemForm" :rules="ticketRules" size="small" ref="checkedTicketItemForm" label-width="0px" class="demo-ruleForm">-->

    <!--</el-form>-->
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "./../../util/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
import VGiftSettingItem from "./gift_setting_giftItem.vue"
export default {
  props:['prizeDrawDetail',"isEdit","serialStr","isHaveInHand"],
  data () {
    return {
      startTime: '',
      endTime: '',
      optionsActivityStart :{
        disabledDate:(time) => {
          if(this.giftSetting.redeemEndTime){
            let d = new Date (this.giftSetting.redeemEndTime)
            return time.getTime() >d.getTime() ||  time.getTime() < new Date().getTime();
          }
        }
      },
      optionsActivityEnd :{
        disabledDate:(time) => {
          if(this.giftSetting.redeemBeginTime){
            let d = new Date (this.giftSetting.redeemBeginTime)
            return time.getTime() <d.getTime() ||  time.getTime() < new Date().getTime();
          }
        }
      },
      giftSetting:{
        redeemBeginTime:new Date(new Date().setHours(new Date().getHours()+2)),//对奖开始时间
        redeemEndTime:new Date(new Date().setDate(new Date().getDate()+7)),//兑奖结束时间
        prizeList:[],//礼包集合
      },
      rules: {
        redeemBeginTime: [
          { validator :this.userValidate().validate_redeemBeginTime, trigger: 'change' },
          { validator :this.userValidate().validate_redeemEndTime, trigger: 'change' },
        ],
      },
    }
  },
  components :{
    VTipMsg,
    VGiftSettingItem
  },
  watch : {
    prizeDrawDetail (val, oldval) {
      this.cloneGiftSettingInfo();
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
    cloneGiftSettingInfo() {
      if(this.prizeDrawDetail && this.prizeDrawDetail.name){
        this.giftSetting = Object.assign({},{
          redeemBeginTime:this.prizeDrawDetail.redeemBeginTime ? new Date(this.prizeDrawDetail.redeemBeginTime) : new Date(new Date().setHours(new Date().getHours()+2)),
          redeemEndTime:this.prizeDrawDetail.redeemEndTime ? new Date(this.prizeDrawDetail.redeemEndTime) : new Date(new Date().setDate(new Date().getDate()+7)),
          prizeList:this.prizeDrawDetail.prizeList
        })
      }
    },
    addGiftItem () {
        let level=this.giftSetting.prizeList.length+1;
        this.giftSetting.prizeList.push({
          prizeId:'', //奖品ID
          giftGroupId:'', // 礼包ID
          giftGroupName:'', //礼包名称
          quantity:0, //数量
          level:level, //奖项等级
          odds:0,  // 中奖概率
          dayQuantity:0, //每天投放数量
          ruleList:[{
            beginTime:'',
            endTime:'',
            quantity:0,
          }], //投放规则列表
        });
    },
    removeGiftItem (callData) {
      this.giftSetting.prizeList.splice(callData.index,1)
    },
    /**
     * 日期转字符串
     * @param date
     */
    formatDateToString (date){
      if(typeof date == 'object'){
        return util.toFullDateString(date.getTime());
      }else{
        return date;
      }
    },
    preFn () {
      this.$emit("call", {op: "edit", tag: "gift",pre:true});
    },
    validGiftSetting () {
      let validPass=true;
      if(this.giftSetting.prizeList.length>0){
        for(let i =0 ; i< this.giftSetting.prizeList.length;i++){
          if(!this.$refs.prizeItem[i].validGiftItem()){
            validPass=false;
//            this.$refs.tipMsgRef.showTipMsg({
//              msg:"奖品设置信息有误",
//              type:"error"
//            });
//            this.$message({
//              type:'error',
//              message:'奖品设置信息有误',
//              duration:'1500'
//            });
            break;
          }
        }
        if(validPass){
          for(let i =0 ; i< this.giftSetting.prizeList.length;i++){
            this.giftSetting.prizeList.splice(i,1,this.$refs.prizeItem[i].getGiftItem());
          }
        }
      }else {
        validPass=false
//        this.$refs.tipMsgRef.showTipMsg({
//          msg:"请添加至少一个奖品",
//          type:"error"
//        });
        this.$message({
          type:'error',
          message:'请至少添加一个奖品',
          duration:'1500'
        });
      }
      return validPass;
    },
    getGiftSetting () {
      let newGiftSetting = Object.assign({}, this.giftSetting);
      newGiftSetting.redeemBeginTime = this.formatDateToString(this.giftSetting.redeemBeginTime);
      newGiftSetting.redeemEndTime = this.formatDateToString(this.giftSetting.redeemEndTime);
      return newGiftSetting;
    },
    /**
     *  下一步 保存奖品设置
     * @param
     */
    saveGiftSetting(){
        if(this.validGiftSetting()){
          let newGiftSetting = this.getGiftSetting();
          this.$emit("call", {op: "edit", tag: "gift", callData: newGiftSetting});
        }
    },
    userValidate () {
        return {
          validate_redeemBeginTime : (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入兑奖开始日期'));
            }else {
              if(value.getTime()>(new Date(this.giftSetting.redeemEndTime).getTime())){
                callback(new Error('兑奖开始日期必须小于兑奖结束日期'));
              }else if (value.getTime() < (new Date().getTime())){
                callback(new Error('兑奖开始日期必须大于当前日期'));
              }else{
                callback();
              }
            }
          },
          validate_redeemEndTime : (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入兑奖开始日期'));
            }else {
              if(value.getTime()<(new Date(this.giftSetting.redeemStartTime).getTime())){
                callback(new Error('兑奖结束日期必须小于兑奖结束日期'));
              }else if (value.getTime() < (new Date().getTime())){
                callback(new Error('兑奖结束日期必须大于当前日期'));
              }else{
                callback();
              }
            }
          },
        }
    }
  }
}
</script>

<!-- Add1111 "scoped" attribute to limit CSS to this component only -->
<style>
  .giftSetting .el-form-item__label {
    text-align: left;
  }
 .giftSetting .el-input--small .el-input__inner{
       padding-left:10px;
     padding-right:10px;
   text-align: center;
   }
 .giftSetting .el-input__prefix{
   display: none;
 }
</style>
