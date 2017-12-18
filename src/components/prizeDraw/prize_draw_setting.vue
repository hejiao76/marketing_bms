//抽奖设置模块
<template>
  <div>
    <el-form :model="prizeItem"   :rules="rules" ref="prizeItem"  size="small" >
      <!--<el-row>-->
        <!--<el-col :span="24">-->
          <!--<div style="float:left;line-height:32px;">中奖次数:</div>-->
          <!--<div style="">-->
            <!--<el-form-item style="float:left"  label-width="0px;" prop="userWinningLimit">-->
              <!--<span>每人总中奖次数：</span>-->
              <!--<el-input style="width: 10%;clear:both;" v-model="prizeItem.userWinningLimit" placeholder="1"></el-input>-->
              <!--<span>次</span>-->
            <!--</el-form-item>-->
          <!--</div>-->
          <!--</el-col>-->
      <!--</el-row>-->
      <el-row>
        <el-col :span="24">
          <div>
          <el-form-item label="中奖次数:" prop="userWinningLimit">
            <span>每人总中奖次数：</span>
            <!--<el-input style="width: 10%" v-model="prizeItem.userLotteryLimit" placeholder="1"></el-input>-->
            <el-input-number style="width:10%" v-model="prizeItem.userWinningLimit" :controls="false" :min="0"></el-input-number>
            <span>次</span>
          </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>

      </el-row>
          <el-form-item label="免费抽奖次数上限设置:"  prop="activityName">
            单人免费总抽奖次数：
            <!--<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>-->
            <el-input-number style="width:10%" v-model="prizeItem.userLotteryLimit" :controls="false" :min="0"></el-input-number>
            次,
            每日免费抽奖次数：
            <!--<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>-->
            <el-input-number style="width:10%" v-model="prizeItem.userDayLotteryLimit" :controls="false" :min="0"></el-input-number>
            次
          </el-form-item>
          <el-form-item label="增加抽奖机会设置:" prop="activityName">
            每次分享增加：
            <!--<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>-->
            <el-input-number style="width:10%" v-model="prizeItem.onceShareLimit" :controls="false" :min="0"></el-input-number>
            次,
            分享最多增加：
            <!--<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>-->
            <el-input-number style="width:10%" v-model="prizeItem.shareMaxLimit" :controls="false" :min="0"></el-input-number>
            次
          </el-form-item>
          <!--<el-form-item label="免费抽奖次数上限设置:" labelWidth="200px" prop="activityName">-->
            <!--单人免费总抽奖次数：-->
            <!--&lt;!&ndash;<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>&ndash;&gt;-->
            <!--<el-input-number style="width:10%" v-model="prizeItem.userLotteryLimit" :controls="false" :min="0"></el-input-number>-->
            <!--次,-->
            <!--每日免费抽奖次数：-->
            <!--&lt;!&ndash;<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>&ndash;&gt;-->
            <!--<el-input-number style="width:10%" v-model="prizeItem.userLotteryLimit" :controls="false" :min="0"></el-input-number>-->
            <!--次-->
          <!--</el-form-item>-->
          <el-form-item label="防刷奖设置:" prop="activityName">
            同一IP段参与活动抽奖次数：
            <!--<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>-->
            <el-input-number style="width:10%" v-model="prizeItem.ipGroupLotteryLimit" :controls="false" :min="0"></el-input-number>
            次,
            动态IP允许参与活动人数上限：
            <!--<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>-->
            <el-input-number style="width:10%" v-model="prizeItem.ipDynamicLotteryLimit" :controls="false" :min="0"></el-input-number>
            次,
            单个IP总抽奖次数:
            <!--<el-input style="width: 10%" v-model="prizeItem.activityName" placeholder="1"></el-input>-->
            <el-input-number style="width:10%" v-model="prizeItem.ipLotteryLimit" :controls="false" :min="0"></el-input-number>
            次
          </el-form-item>

      <el-row>
        <el-col :span="24" style="text-align: center;">
          <el-button @click="preFn"  type="primary">上一步</el-button>
          <el-button  type="primary" @click="savePrizeItem">下一步</el-button>
          <el-button v-if="isEdit"  type="primary" @click="editSave">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!--<el-form :model="checkedTicketItemForm" :rules="ticketRules" size="small" ref="checkedTicketItemForm" label-width="0px" class="demo-ruleForm">-->

    <!--</el-form>-->
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "../../../static/baseSetting/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
export default {
  props:['prizeDrawDetail',"isEdit","isHaveInHand"],
  data () {
    return {
      prizeItem:{
        userWinningLimit:0, //单人总中奖次数
        userLotteryLimit:0,//单人免费总抽奖次数
        userDayLotteryLimit:0,//单人单日总抽奖次数
        onceShareLimit:0,//每次分享增加抽奖次数
        shareMaxLimit:0,//分享最多增加抽奖次数
        ipLotteryLimit:0,//单个IP总抽奖次数
        ipGroupLotteryLimit:0, //IP段总抽奖次数
        ipDynamicLotteryLimit:0, //动态IP总抽奖次数
      },
      rules: {

      },
    }
  },
  watch : {
    prizeDrawDetail (val, oldval) {
      this.clonPrizeDraw();
    }
  },
  components :{
//    ElRow,
//    ElInput,
    VTipMsg
  },
  created () {

  },
  mounted () {
  },
  methods:{
    clonPrizeDraw() {
      if(this.prizeDrawDetail && this.prizeDrawDetail.name){
        this.prizeItem = {
          userWinningLimit:this.prizeDrawDetail.userWinningLimit || 0,
          userLotteryLimit:this.prizeDrawDetail.userLotteryLimit || 0,
          userDayLotteryLimit:this.prizeDrawDetail.userDayLotteryLimit || 0,
          onceShareLimit:this.prizeDrawDetail.onceShareLimit || 0,
          shareMaxLimit:this.prizeDrawDetail.shareMaxLimit || 0,
          ipLotteryLimit:this.prizeDrawDetail.ipLotteryLimit || 0,
          ipGroupLotteryLimit:this.prizeDrawDetail.ipGroupLotteryLimit || 0,
          ipDynamicLotteryLimit:this.prizeDrawDetail.ipDynamicLotteryLimit || 0,
        }
      }
    },
    editSave (){
      this.$emit("editSaveCall");
    },
    /**
     *  验证抽奖设置
     * @param
     */
    validPrizeItem ()  {
      let validStatus=true;
      this.$refs['prizeItem'].validate((valid) => {
        if(!valid){
          this.$refs.tipMsgRef.showTipMsg({
            msg:"抽奖设置信息有误",
            type:"error"
          });
          validStatus=false;
        }
      });
      return validStatus;
    },
    /**
     *  获取抽奖设置信息
     * @param
     */
    getPrizeItem(){
      let newPrizeItem = Object.assign({}, this.prizeItem);
      return newPrizeItem;
    },
    /**
     *  上一步
     * @param ticketId
     */
    preFn () {
      this.$emit("call", {op: "edit", tag: "prize",pre:true});
    },
    /**
     *  下一步 抽奖信息设置
     * @param
     */
    savePrizeItem(){
        if(this.validPrizeItem()){
          let newPrizeItem = this.getPrizeItem();
          this.$emit("call", {op: "new", tag: "prize", callData: newPrizeItem});
        }
    }
  }
}
</script>

<!-- Add1111 "scoped" attribute to limit CSS to this component only -->
<style >
</style>
