//模板设置模块
<template>
  <div>
    <el-form :model="filterForm"  :rules="rules" ref="filterForm" label-width="120px" size="small" >
      <img src="../../assets/images/mod.png"/>
      <el-row>
        <el-col :span="24" style="text-align: center;">
          <el-button  type="primary">上一步</el-button>
          <el-button  type="primary">保存</el-button>
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
import Final from "./../../util/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
export default {
  props:['ticketItem','ticketIndex','activityStartDate'],
  data () {
    return {
      filterForm:{
        ticketId:'', //秒杀券ID
        ticketName:'',//秒杀券名称
        signUpStartTime:'',//报名开始日期
        signUpEndTime:'',//报名截止日期
        validityStartDate:'',//有效期开始时间
        validityEndDate:'',//有效期结束日期
        createDate:'', //创建日期
        applyCar:'',
        sedkillMoney:'',//秒杀金额
        sedKillStartDate:'',//秒杀开始日期
        ticketCount:'', //秒杀券数量
        maxPayCount:'', //最大支付数
        editStatus:0, //当前是否处于1编辑状态
      },
      rules: {
        ticketCount: [
          { validator :this.userValidate().validate_ticketCount, trigger: 'blur' }
        ],
        maxPayCount: [
          { validator :this.userValidate().validate_maxPayCount, trigger: 'blur' }
        ],
        sedkillMoney: [
          { validator :this.userValidate().validate_sedkillMoney, trigger: 'blur' }
        ],
        sedKillStartDate: [
          { validator :this.userValidate().validate_sedKillStartDate, trigger: 'blur' }
        ],
        signUpStartTime:[
          { validator :this.userValidate().validate_signUpStartTime, trigger: 'blur' }
        ],
        signUpEndTime:[
          { validator :this.userValidate().validate_signUpEndTime, trigger: 'blur' }
        ]
      },
    }
  },
  components :{
    ElInput,
    VTipMsg
  },
  created () {
    console.log("11111111111------",this.ticketItem)
    this.cloneTicketInfo();
  },
  mounted () {

  },
  methods:{
//    submitForm(formName) {
//      this.$refs[formName].validate((valid) => {
//        if (valid) {
//          alert('submit!');
//        } else {
//          console.log('error submit!!');
//          return false;
//        }
//      });
//    },
//    resetForm(formName) {
//      this.$refs[formName].resetFields();
//    },
    cloneTicketInfo() {
      this.checkedTicketItemForm = Object.assign({},this.checkedTicketItemForm,this.ticketItem);
      if(this.checkedTicketItemForm.signUpStartTime){
          this.checkedTicketItemForm.signUpStartTime = new Date(this.checkedTicketItemForm.signUpStartTime)
      }
      if(this.checkedTicketItemForm.signUpEndTime){
        this.checkedTicketItemForm.signUpEndTime = new Date(this.checkedTicketItemForm.signUpEndTime)
      }
      if(this.checkedTicketItemForm.sedKillStartDate){
        this.checkedTicketItemForm.sedKillStartDate = new Date(this.checkedTicketItemForm.sedKillStartDate)
      }
    },
    test () {
        console.log("blur------>",this.checkedTicketItemForm.maxPayCount);
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
    /**
     * 编辑/取消编辑 秒杀券基本信息按钮事件触发
     * @param ticketId
     * @param status
     */
    editTicketItem (ticketId,status) {
      if(ticketId){
          this.checkedTicketItemForm.editStatus=status;
          console.log("edit~~~~",JSON.stringify(this.checkedTicketItemForm))
      }
    },
    removeTicketItem () {
        console.log("到哪儿去了------------11111",this.checkedTicketItemForm.ticketId);
      if(this.checkedTicketItemForm.ticketId){
          console.log(this.ticketId);
        this.$emit("call",{op:"delete",callData:this.checkedTicketItemForm.ticketId});
      }
    },
    /**
     *  保存 秒杀券基本信息按钮事件触发
     * @param ticketId
     */
    saveTicketItem(ticketId){
      if(ticketId){
        this.$refs['checkedTicketItemForm'].validate((valid) => {
          if (valid) {
            let newItem ={};
            this.checkedTicketItemForm.editStatus=0;
            Object.assign(newItem,this.checkedTicketItemForm);
            console.log("~~~~",JSON.stringify(newItem));
            if(this.checkedTicketItemForm.signUpStartTime){
              newItem.signUpStartTime = this.formatDateToString(this.checkedTicketItemForm.signUpStartTime)
            }
            if(this.checkedTicketItemForm.signUpEndTime){
              newItem.signUpEndTime = this.formatDateToString(this.checkedTicketItemForm.signUpEndTime)
            }
            if(this.checkedTicketItemForm.sedKillStartDate){
              newItem.sedKillStartDate = this.formatDateToString(this.checkedTicketItemForm.sedKillStartDate)
            }
            delete newItem.editStatus;
            this.$emit("call",{op:"edit",callData:newItem});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    /**
     * 自定义验证规则
     * @returns {{validate_ticketCount: (function(*, *=, *)), validate_maxPayCount: (function(*, *=, *)), validate_sedkillMoney: (function(*, *=, *)), validate_sedKillStartDate: (function(*, *=, *)), validate_signUpStartTime: (function(*, *=, *)), validate_signUpEndTime: (function(*, *=, *))}}
     */
    userValidate (){
        return {
          validate_ticketCount : (rule, value, callback) => {
            value=parseInt(value);
            if (!value) {
              return callback(new Error('请输入秒杀券个数'));
            }else if (!Number.isInteger(value)) {
              callback(new Error('秒杀券个数须是数字'));
            } else {
              if (value > 9999) {
                callback(new Error('秒杀券个数最多9999个'));
              } else if(value<1) {
                callback(new Error('秒杀券个数至少1个'));
              }
              callback();
            }
          },
            validate_maxPayCount : (rule, value, callback) => {
              value=parseInt(value);
              if (!value) {
                return callback(new Error('请输入最大支付数'));
              }else if (!Number.isInteger(value)) {
                callback(new Error('最大支付数须是数字'));
              } else {
                if(!this.checkedTicketItemForm.ticketCount){
                  callback(new Error('请先输入秒杀券个数'));
                }
                if (value > this.checkedTicketItemForm.ticketCount*5) {
                  callback(new Error('最大支付数不能超过5倍秒杀券个数'));
                } else if(value<this.checkedTicketItemForm.ticketCount) {
                  callback(new Error('最大支付数不能小于秒杀券个数'));
                }
                callback();
              }
          },
          validate_sedkillMoney :(rule, value, callback) => {
            value=parseInt(value);
            if (!value) {
              return callback(new Error('请输入秒杀金额'));
            }else if (!/^[1-9]\d*$/.test(value)) {
              callback(new Error('秒杀金额须是数字且大于0'));
            } else{
              callback();
            }
          },
          validate_sedKillStartDate : (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入秒杀开始时间'));
            }else if (!this.checkedTicketItemForm.validityStartDate || isNaN(new Date(this.checkedTicketItemForm.validityStartDate).getTime())) {
              callback(new Error('有效期时间无效'));
            } else {
              if(value.getTime()>(new Date(this.checkedTicketItemForm.validityEndDate).getTime()+3600*24*1000-1)){
                callback(new Error('秒杀开始时间须小于有效期开始日期'));
              }else if (value.getTime() < (new Date(this.checkedTicketItemForm.validityStartDate).getTime())){
                callback(new Error('秒杀开始时间须大于有效期开始日期'));
              }else{
                callback();
              }
            }
          },
          validate_signUpStartTime : (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入报名开始时间'));
            }else if (!this.checkedTicketItemForm.sedKillStartDate || isNaN(new Date(this.checkedTicketItemForm.sedKillStartDate).getTime())) {
              callback(new Error('请先填写秒杀开始时间'));
            } else {
              if(value.getTime()>(new Date(this.checkedTicketItemForm.sedKillStartDate).getTime()-(3600*1000))){
                callback(new Error('报名开始时间须小于秒杀开始1小时'));
              }else{
                callback();
              }
            }
          },
          validate_signUpEndTime :(rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入报名结束时间'));
            }else if (!this.checkedTicketItemForm.signUpEndTime || isNaN(new Date(this.checkedTicketItemForm.signUpEndTime).getTime())) {
              callback(new Error('请先填写秒杀开始时间'));
            } else {
              if(value.getTime()>(new Date(this.checkedTicketItemForm.sedKillStartDate).getTime()-(60*5*1000))){
                callback(new Error('报名结束时间须小于秒杀开始5分钟'));
              }else if (value.getTime()<(new Date(this.checkedTicketItemForm.signUpStartTime).getTime()+(60*30*1000))){
                callback(new Error('报名结束时间须大于报名开始时间30分钟'));
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
<style >
</style>
