//奖品设置模块
<template>
  <div class="giftSetting">
    <el-form :model="prizeItemForm"  :rules="rules" ref="prizeItemForm" label-width="120px" size="small" >
          <el-row>
            <el-col :span="24" class="newp-title">
              <span>{{wordMapping[itemIndex+1]}}等奖</span>
              <img @click="removePrizeItem" style="cursor: pointer;" src="../../assets/images/del.png"/>
            </el-col>
            <el-col style="border: 1px solid #ccc; padding:0 8px; margin-bottom:10px;">
              <el-collapse-transition>
              <div v-if="isshow">
                <el-form-item label="礼包名称:" prop="giftGroupId">
                  <el-select :disabled="isHaveInHand" v-model="prizeItemForm.giftGroupId" @change="selectGiftGroup" placeholder="请选择">
                    <el-option
                      v-for="item in giftList"
                      :key="item.giftGroupId"
                      :label="item.giftGroupName"
                      :value="item.giftGroupId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="礼包详情:">
                  <p v-if="prizeItemForm.details.length>0" v-for="(detailItem,index) in prizeItemForm.details">{{detailItem}}</p>
                  <!--<p v-if="prizeItemForm.details_update.length>0" v-for="(detailItem,index) in prizeItemForm.details_update">{{detailItem}}</p>-->
                  <!--<p>12</p>-->
                  <!--<p>13</p>-->
                </el-form-item>
                <el-form-item label="奖品数量:" prop="quantity">
                  <!--<el-input style="width:20%"   v-model="prizeItemForm.activityName" placeholder="请输入奖品数量" ></el-input>个-->
                  <el-input-number style="width:20%" v-model="prizeItemForm.quantity" :controls="false" :min="0"></el-input-number>个
                </el-form-item>
                <el-form-item label="中奖概率:" prop="odds">
                  <el-input style="width:20%"  v-model="prizeItemForm.odds" placeholder="中奖概率" ></el-input>%
                </el-form-item>
                <el-form-item label="每天投放个数:" prop="dayQuantity">
                  <!--<el-input  style="width:20%"  v-model="prizeItemForm.activityName" placeholder="请输入每天投放个数" ></el-input>个-->
                  <el-input-number style="width:20%" v-model="prizeItemForm.dayQuantity" :controls="false" :min="0"></el-input-number>个
                </el-form-item>
                <el-form-item label="每天投放时间:">
                  <el-row v-for="(ruleItem,index) in prizeItemForm.ruleList">
                    <el-col :span="4">
                      <el-form-item :key="ruleItem.id"  :prop="'ruleList.' + index + '.beginTime'">
                        <el-time-select :editable="false" :clearable="false"  style="width:100%"  placeholder="起始时间" v-model="ruleItem.beginTime" :picker-options="{start: '00:00',step: '00:15',end: '23:45'}"></el-time-select>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center">-</el-col>
                    <el-col :span="4">
                      <el-form-item :key="ruleItem.id"  :prop="'ruleList.' + index + '.endTime'">
                        <el-time-select :editable="false" :clearable="false" style="width:100%" placeholder="结束时间" v-model="ruleItem.endTime" :picker-options="{start: '00:00',step: '00:15',end: '23:45',minTime: ruleItem.beginTime}"></el-time-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item prop="activityStartDate" label="投放个数:" label-width="80px">
                      <!--<el-input v-model="prizeItemForm.activityName" placeholder="" style="width:80%"></el-input>-->
                        <el-input-number style="width:80%" v-model="ruleItem.quantity" :controls="false" :min="0"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" style="text-align: right;">
                      <el-button @click="addRuleItem" v-if="index==prizeItemForm.ruleList.length-1 && prizeItemForm.ruleList.length<5" type="primary">增加</el-button>
                      <el-button @click="removeRuleItem(index)" v-if=" prizeItemForm.ruleList.length>1" >删除</el-button>
                    </el-col>
                  </el-row>
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
                        <!--&lt;!&ndash;<el-input v-model="prizeItemForm.activityName" placeholder="" style="width:80%"></el-input>&ndash;&gt;-->
                        <!--<el-input-number style="width:80%" v-model="prizeItemForm.userLotteryLimit" :controls="false" :min="0"></el-input-number>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="7" style="text-align: right;">-->
                      <!--<el-button>删除</el-button>-->
                      <!--<el-button type="primary">增加</el-button>-->
                    <!--</el-col>-->
                  <!--</el-row>-->
                </el-form-item>
              </div>
              </el-collapse-transition>
              <el-col :span="24" style="text-align: center">
                <el-button size="mini" @click="isshow=!isshow">{{isshow ? "收起" : "展开"}}</el-button>
                <!--<el-button @click="saveGiftItem">验证</el-button>-->
              </el-col>
            </el-col>
          </el-row>
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
import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
export default {
  props:['prizeDrawDetail','prizeItem','itemIndex','isEdit','serialStr',"isHaveInHand"],
  data () {
    return {
      wordMapping:{
        1:"一",
        2:"二",
        3:"三",
        4:"四",
        5:"五",
      },
      isshow:true,
      giftList:[],
      prizeItemForm:{
        prizeId:'', //奖品ID
        giftGroupId:'', // 礼包ID
        giftGroupName:'', //礼包名称
        details:[],//礼包详情
        quantity:0, //数量
        level:'', //奖项等级
        odds:0,  // 中奖概率
        dayQuantity:0, //每天投放数量
        ruleList:[], //投放规则列表,
        giftGroupPrice:100
      },
//      prizeRulsItem:{  //投放规则项
//        prizeRulsId:'',
//        beginTime:'', //投放结束时间
//        endTime:'', //投放开始时间
//        quantity:'' //投放数量
//      },
      rules: {
        giftGroupId: [
          { required: true, type:"number", message: '请选择礼包', trigger: 'change' },
//          { validator :this.userValidate().validate_odds, trigger: 'change' },
//          { validator :this.userValidate().validate_redeemEndTime, trigger: 'change' },
        ],
        quantity: [
          { required: true,min:"0", type:"number", message: '请输入奖品数量', trigger: 'blur' },
        ],
        odds: [
//          { required: true, type:"number", message: '请输入中奖概率', trigger: 'change' },
          { required: true,validator :this.userValidate().validate_odds, trigger: 'blur' },
        ],
        dayQuantity: [
//          { required: true, type:"number", message: '请输入每天投放数量', trigger: 'change' },
          { required: true,validator :this.userValidate().validate_dayQuantity, trigger: 'blur' },
        ],
      },
    }
  },
  components :{
    ElInput,
    VTipMsg
  },
  watch : {
    prizeItem (val, oldval) {
      this.cloneGiftSettingInfo();
    }
  },
  created () {
  },
  mounted () {
    this.cloneGiftSettingInfo();
    this.requestGiftList();
  },
  methods:{
      selectGiftGroup (){
          for(let i = 0 ;i<this.giftList.length;i++){
              if(this.giftList[i].giftGroupId == this.prizeItemForm.giftGroupId){
                this.prizeItemForm.giftGroupName = this.giftList[i].giftGroupName;
                this.prizeItemForm.giftGroupPrice = this.giftList[i].groupPrice || 0;
                this.prizeItemForm.details=this.formatDetails(this.giftList[i].giftInfoList);
              }
          }
      },

      requestGiftList (){
        let param={type:2,pageIndex:1,pageSize:1000,serialId:this.serialStr || this.prizeDrawDetail.serialIds}
        Api.base_sys_gift_list_select(param)
          .then(res => {
            if (res.status == true) {
                this.giftList=res.result;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
    /**
     * 克隆礼品项信息
     */
    cloneGiftSettingInfo() {
      if(this.prizeItem){
        this.prizeItemForm = Object.assign({},{
          prizeId:this.prizeItem.prizeId, //奖品ID
          giftGroupId:this.prizeItem.giftGroupId, // 礼包ID
          giftGroupName:this.prizeItem.giftGroupName, //礼包名称
          quantity:this.prizeItem.quantity, //数量
          giftGroupPrice:this.prizeItem.giftGroupPrice,//礼包价格
          details:this.prizeItem.details ? this.prizeItem.details.split("||") : [], //礼品项明细
          level:this.prizeItem.level, //奖项等级
          odds:this.prizeItem.odds,  // 中奖概率
          dayQuantity:this.prizeItem.dayQuantity, //每天投放数量
          ruleList:this.prizeItem.ruleList
        })
        if(this.prizeItemForm.ruleList.length<=0){
            this.addRuleItem();
        }
      }
    },
    validGiftItem (){
      let validpass=true;
      this.$refs['prizeItemForm'].validate((valid) => {
        if (valid) {
            if(this.validRuleItemCount() && this.validRuleItemTimeRange()){

            }else{
              validpass = false;
            }
        }else {
            validpass=false;
        }
      });
      if(!validpass){
//        this.$refs.tipMsgRef.showTipMsg({
//          msg:"礼品信息填写有误",
//          type:"error"
//        })
        this.$message({
          type:'error',
          message:'礼品信息填写有误',
          duration:'1500'
        });

      }
      return validpass;
    },
    saveGiftItem () {
       if(this.validGiftItem()){

       }
    },
    getGiftItem () {
      if(this.validGiftItem()){
          let newItem=Object.assign({},this.prizeItemForm);
//          debugger;
          newItem.details =  this.formatDetailToSubmit();
          return Object.assign({},newItem)
      }
    },
    formatDetails (giftInfoList){
      let strArray=[]
      for(let i =0;i<giftInfoList.length;i++){
        let detailItem=giftInfoList[i];
        let str=(i+1)+"、"+detailItem.giftName + "x"+detailItem.giftCount;
        strArray.push(str);
      }
      return strArray;
    },
    formatDetailToSubmit(){
        let strArray=[];
        let str="";
       for(let i = 0 ; i< this.prizeItemForm.details.length;i++){
           let detailItem = this.prizeItemForm.details[i];
           strArray.push(detailItem);
       }
       str=strArray.join("||");

      return str;
    },
    /**
     * 添加投放时间段Item子项
     */
    addRuleItem () {
        this.prizeItemForm.ruleList.push({
          beginTime:'',
          endTime:'',
          quantity:0,
        })
    },
    /**
     * 删除投放时间段Item子项
     */
    removeRuleItem (index){
      this.prizeItemForm.ruleList.splice(index,1);
    },
    /**
     * 删除礼品项
     */
    removePrizeItem (){
      this.$emit("callRemove",{index:this.itemIndex});
    },
    /**
     * 验证投放时段数量和每天投放数量是否冲突
     */
    validRuleItemCount () {
         let count = 0;
         for(let i = 0 ; i<this.prizeItemForm.ruleList.length;i++){
             count+=this.prizeItemForm.ruleList[i].quantity;
         }
         if(count> this.prizeItemForm.dayQuantity){
//           this.$refs.tipMsgRef.showTipMsg({
//             msg:this.wordMapping[this.prizeItemForm.level]+"等奖中时段投放数量总和大于每天投放数量",
//             type:"error"
//           });
           this.$message({
             type:'error',
             message:this.wordMapping[this.prizeItemForm.level]+"等奖中时段投放数量总和大于每天投放数量",
             duration:'1500'
           });
           return false;
         }
         return true;
    },
    /**
     * 验证投放时段是否有交叉
     */
    validRuleItemTimeRange () {
        let startTimeArray = [];
        let endTimeArray = [];
        let errorMsg = "";
        for(let i = 0 ; i<this.prizeItemForm.ruleList.length;i++){
            let item = this.prizeItemForm.ruleList[i];
            if(item.beginTime){
              let beginTimeStr= item.beginTime.toString().split(":");
              if(beginTimeStr.length==2){
                let bdate = new Date();
                bdate.setHours(beginTimeStr[0]);
                bdate.setMinutes(beginTimeStr[1]);
                startTimeArray.push(bdate.getTime());
              }else {
                startTimeArray.push(item.beginTime);
              }
            }
            if(item.endTime){
              let endTimeStr= item.endTime.toString().split(":");
              if(endTimeStr.length==2){
                let edate = new Date();
                edate.setHours(endTimeStr[0]);
                edate.setMinutes(endTimeStr[1]);
                endTimeArray.push(edate.getTime());
              }else{
                endTimeArray.push(item.endTime);
              }
            }
        }
        if(startTimeArray.length!=endTimeArray.length){
            errorMsg = "请填写完整的时间段"
        }else if(this.prizeItemForm.ruleList.length>1 && this.prizeItemForm.ruleList.length!=startTimeArray.length){
            errorMsg = "请填写完整的时间段"
        }else if(this.prizeItemForm.ruleList.length>1 && this.prizeItemForm.ruleList.length!=endTimeArray.length){
            errorMsg = "请填写完整的时间段"
        }else {
          startTimeArray = startTimeArray.sort((a, b) => a - b);
          endTimeArray = endTimeArray.sort((a, b) => a - b);
          for(let i =1 ; i < startTimeArray.length;i++){
              if(startTimeArray[i]-endTimeArray[i-1]<0){
                  errorMsg="时间段范围有重复";
                  break;
              }
          }
        }
        if(errorMsg){
          this.$message({
            type:'error',
            message:this.wordMapping[this.prizeItemForm.level]+"等奖中"+errorMsg,
            duration:'1500'
          });
          return false;
        }else {
            return true;
        }
    },
    userValidate(){
      return {
        validate_odds : (rule, value, callback) => {
          if (Number.isNaN(value) ||  value<0) {
            return callback(new Error('请输入中奖概率'));
          }else{
            if(value>100){
              callback(new Error('中奖概率超过100%'));
            }else{
              callback();
            }
          }
        },
        validate_dayQuantity: (rule, value, callback) => {
          if (Number.isNaN(value) ||  value<0) {
            return callback(new Error('请输入每天投放个数'));
          }else{
            if(value>this.prizeItemForm.quantity){
              callback(new Error('每天投放数量不能超过奖品数量'));
            }else{
              callback();
            }
          }
        }
      }
    },
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
