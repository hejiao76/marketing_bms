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
      <v-gift-setting-item v-for="(prizeItem,index) in giftSetting.prizeList" ref='prizeItem' @callRemove="removeGiftItem" :itemIndex="index"  :key="prizeItem.prizeId" :prizeItem="prizeItem"></v-gift-setting-item>
          <!--<el-row v-for="(items,index) in  addPrizeList">-->
            <!--<el-col :span="24" class="newp-title">-->
              <!--<span>一等奖</span>-->
              <!--<img style="cursor: pointer;" src="../../assets/images/del.png"/>-->
            <!--</el-col>-->
            <!--<el-col style="border: 1px solid #ccc; padding:0 8px; margin-bottom:10px;">-->
              <!--<el-collapse-transition>-->
              <!--<div v-if="items.isshow">-->
                <!--<el-form-item label="礼包名称:">-->
                  <!--<el-select v-model="giftSetting.activityName" placeholder="请选择">-->
                    <!--<el-option-->
                      <!--v-for="item in giftSetting.activityArea"-->
                      <!--:key="item.value"-->
                      <!--:label="item.label"-->
                      <!--:value="item.value">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="礼包详情:">-->
                  <!--<p>1</p>-->
                  <!--<p>12</p>-->
                  <!--<p>13</p>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="奖品数量:" prop="activityName">-->
                  <!--&lt;!&ndash;<el-input style="width:20%"   v-model="giftSetting.activityName" placeholder="请输入奖品数量" ></el-input>个&ndash;&gt;-->
                  <!--<el-input-number style="width:20%" v-model="giftSetting.userLotteryLimit" :controls="false" :min="0"></el-input-number>个-->
                <!--</el-form-item>-->
                <!--<el-form-item label="中奖概率:" prop="activityName">-->
                  <!--<el-input style="width:20%"   v-model="giftSetting.activityName" placeholder="中奖概率" ></el-input>%-->
                <!--</el-form-item>-->
                <!--<el-form-item label="每天投放个数:" prop="activityName">-->
                  <!--&lt;!&ndash;<el-input  style="width:20%"  v-model="giftSetting.activityName" placeholder="请输入每天投放个数" ></el-input>个&ndash;&gt;-->
                  <!--<el-input-number style="width:20%" v-model="giftSetting.userLotteryLimit" :controls="false" :min="0"></el-input-number>个-->
                <!--</el-form-item>-->
                <!--<el-form-item label="每天投放时间:">-->
                  <!--<el-row>-->
                    <!--<el-col :span="4">-->
                      <!--<el-form-item prop="activityStartDate">-->
                        <!--<el-time-select :editable="false" :clearable="false"  style="width:100%"  placeholder="起始时间" v-model="startTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"></el-time-select>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col class="line" :span="1" style="text-align: center">-</el-col>-->
                    <!--<el-col :span="4">-->
                      <!--<el-form-item prop="activityEndDate">-->
                        <!--<el-time-select :editable="false" :clearable="false" style="width:100%" placeholder="结束时间" v-model="endTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30',minTime: startTime}"></el-time-select>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="7">-->
                      <!--<el-form-item prop="activityStartDate" label="投放个数:" label-width="80px">-->
                      <!--&lt;!&ndash;<el-input v-model="giftSetting.activityName" placeholder="" style="width:80%"></el-input>&ndash;&gt;-->
                        <!--<el-input-number style="width:80%" v-model="giftSetting.userLotteryLimit" :controls="false" :min="0"></el-input-number>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="7" style="text-align: right;">-->
                      <!--<el-button>删除</el-button>-->
                      <!--<el-button type="primary">增加</el-button>-->
                    <!--</el-col>-->
                  <!--</el-row>-->
                  <!--<el-row>-->
                    <!--<el-col :span="4">-->
                      <!--<el-form-item prop="activityStartDate">-->
                        <!--<el-time-select :editable="false" :clearable="false"  style="width:100%"  placeholder="起始时间" v-model="startTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"></el-time-select>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col class="line" :span="1" style="text-align: center">-</el-col>-->
                    <!--<el-col :span="4">-->
                      <!--<el-form-item prop="activityEndDate">-->
                        <!--<el-time-select :editable="false" :clearable="false" style="width:100%" placeholder="结束时间" v-model="endTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30',minTime: startTime}"></el-time-select>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="7">-->
                      <!--<el-form-item prop="activityStartDate" label="投放个数:" label-width="80px">-->
                        <!--&lt;!&ndash;<el-input v-model="giftSetting.activityName" placeholder="" style="width:80%"></el-input>&ndash;&gt;-->
                        <!--<el-input-number style="width:80%" v-model="giftSetting.userLotteryLimit" :controls="false" :min="0"></el-input-number>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="7" style="text-align: right;">-->
                      <!--<el-button>删除</el-button>-->
                      <!--<el-button type="primary">增加</el-button>-->
                    <!--</el-col>-->
                  <!--</el-row>-->
                <!--</el-form-item>-->
              <!--</div>-->
              <!--</el-collapse-transition>-->
              <!--<el-col :span="24" style="text-align: center">-->
                <!--<el-button v-if="items.isshow" @click="closePrizeBox(index)">收起</el-button>-->
                <!--<el-button v-if="!items.isshow"@click="closePrizeBox(index)">展开</el-button>-->
              <!--</el-col>-->
            <!--</el-col>-->
          <!--</el-row>-->

    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-button v-if="giftSetting.prizeList.length<5" @click="addGiftItem"  type="primary">增加奖项</el-button>
      </el-col>
    </el-row>
      <el-row>
        <el-col :span="24" style="text-align: center;">
          <el-button @click="preFn"  type="primary">上一步</el-button>
          <el-button @click="saveGiftSetting"  type="primary">下一步</el-button>
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
  props:['prizeDrawDetail'],
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
        console.log("gift_setting_watch");
      this.cloneGiftSettingInfo();
    }
  },
  created () {

  },
  mounted () {

  },
  methods:{
    cloneGiftSettingInfo() {
      if(this.prizeDrawDetail && this.prizeDrawDetail.name){
        this.giftSetting = Object.assign({},{
          redeemBeginTime:this.prizeDrawDetail.redeemBeginTime ? new Date(this.prizeDrawDetail.redeemBeginTime) : new Date(new Date().setHours(new Date().getHours()+2)),
          redeemEndTime:this.prizeDrawDetail.redeemEndTime ? new Date(this.prizeDrawDetail.redeemEndTime) : new Date(new Date().setDate(new Date().getDate()+7)),
          prizeList:this.prizeDrawDetail.prizeList
        })
        console.log(this.giftSetting.prizeList);
      }
    },
    addGiftItem () {
        this.giftSetting.prizeList.push({
          prizeId:'', //奖品ID
          giftGroupId:'', // 礼包ID
          giftGroupName:'', //礼包名称
          quantity:0, //数量
          level:'', //奖项等级
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
        console.log(callData);
      console.log("数据会不会还原 MLGB");
      this.giftSetting.prizeList.splice(callData.index,1)
//        console.log(this.giftSetting.prizeList.splice(index,1));
    },
    /**
     * 日期转1字符串1111111111111111111111111111111
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
    /**11111111111111111111111111111111111111111111111
     *  下一步 保存奖品设置
     * @param
     */
    saveGiftSetting(){
        if(this.giftSetting.prizeList.length>0){
          let validPass=true;
          for(let i =0 ; i< this.giftSetting.prizeList.length;i++){
            if(!this.$refs.prizeItem[i].validGiftItem()){
                validPass=false;
                break;
            }
          }
          if(validPass){
            for(let i =0 ; i< this.giftSetting.prizeList.length;i++){
              this.giftSetting.prizeList.splice(i,1,this.$refs.prizeItem[i].getGiftItem());
            }
          }
          let newGiftSetting = Object.assign({}, this.giftSetting);
          console.log("数据过来了------->",JSON.stringify(this.giftSetting));
          this.$emit("call", {op: "edit", tag: "gift", callData: newGiftSetting});
        }else {
            this.$refs.tipMsg.showTipMsg({
              msg:"请添加至少一个奖品",
              type:"error"
            });
        }
        return
      this.$refs['giftSetting'].validate((valid) => {
        if (valid) {
          let newGiftSetting = Object.assign({}, this.giftSetting);
          newGiftSetting.beginTime = this.formatDateToString(this.giftSetting.beginTime);
          newGiftSetting.endTime = this.formatDateToString(this.giftSetting.endTime);
          this.$emit("call", {op: "edit", tag: "base", callData: newGiftSetting});
          console.log("success");
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
