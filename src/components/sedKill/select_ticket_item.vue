<template>
  <div>
    <el-form :model="checkedTicketItemForm" :rules="ticketRules" size="small" ref="checkedTicketItemForm" label-width="0px" class="demo-ruleForm">
      <!--编辑模块--->
      <div v-if="checkedTicketItemForm.editStatus==1" class="newhds-list">
        <div class="newhd-header">
          <p class="newhd-tit">{{checkedTicketItemForm.ticketName}}</p>
          <div class="newhd-time">
            <p>有效时间：{{checkedTicketItemForm.validityStartDate}}至{{checkedTicketItemForm.validityEndDate}}</p>
            <p>创建时间：{{checkedTicketItemForm.createDate}}</p>
          </div>
        </div>
        <div class="newhd-content">
          <ul>
            <li>
              <span class="newhd-txt">秒杀券个数：</span>
              <div class="edit-txt">
                <el-form-item prop="ticketCount">
                  <el-input v-model="checkedTicketItemForm.ticketCount"></el-input>
                </el-form-item>
                <!--<input  v-model="checkedTicketItemForm.ticketCount" type="text">-->
                <em class="edit-unit">个</em>
              </div>
            </li>
            <li>
              <span class="newhd-txt">最大支付数：</span>
              <div class="edit-txt">
                <el-form-item prop="maxPayCount">
                  <!--<input v-model="checkedTicketItemForm.maxPayCount" type="text">-->
                  <el-input  v-model="checkedTicketItemForm.maxPayCount"></el-input>
                </el-form-item>
                <em class="edit-unit">个</em>
              </div>
            </li>
            <li>
              <span class="newhd-txt">秒杀支付金额：</span>
              <div class="edit-txt mlq0">
                <el-form-item prop="sedkillMoney">
                  <!--<input v-model="checkedTicketItemForm.sedkillMoney" type="text">-->
                  <el-input v-model="checkedTicketItemForm.sedkillMoney"></el-input>
                </el-form-item>

                <em class="edit-unit">元</em>
              </div>
            </li>
            <li>
              <span class="newhd-txt">秒杀开始时间：</span>
              <!-- <div class="newhd-inf">2017-11-15</div> -->
              <div class="edit-txt">
                <el-form-item prop="sedKillStartDate">
                <el-date-picker v-model="checkedTicketItemForm.sedKillStartDate" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                  <!--<em class="index-icon icon-hdtime"></em>-->
              </div>
            </li>
            <li>
              <span class="newhd-txt">报名开始时间：</span>
              <div class="edit-txt">
                <el-form-item prop="signUpStartTime">
                <el-date-picker v-model="checkedTicketItemForm.signUpStartTime" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </div>
            </li>
            <li>
              <span class="newhd-txt">报名结束时间：</span>
              <!-- <div class="newhd-inf">2017-11-15</div> -->
              <div class="edit-txt">
                <el-form-item prop="signUpEndTime">
                  <el-date-picker v-model="checkedTicketItemForm.signUpEndTime" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                  <!--<em class="index-icon icon-hdtime"></em>-->
              </div>
              <!--<div class="error-txt">时间错误时间误时间错误时错误</div>-->
            </li>

          </ul>
        </div>
        <div class="newhd-footer">
          <div class="newhd-btn">
            <table class="mt20">
              <tbody>
              <tr>
                <!--<td style="text-align:right"><a href="javascript:;" class="btn-edit">编辑</a></td>-->
                <!--<td id="cancleedit" style="display: block;"><a href="javascript:;" class="btn-other">取消编辑</a></td>-->
                <!--<td style="text-align:left;"><a href="javascript:;" class="btn-other">取消绑定</a></td>-->
                <td><button @click="saveTicketItem(checkedTicketItemForm.ticketId)" type="button" class=" btn_bass btn_b">保存</button></td>
                <!--<td><button @click="editTicketItem(checkedTicketItemForm.ticketId,0)"  type="button" class=" btn_b_line">取消编辑</button></td>-->
                <td><button @click="removeTicketItem" type="button" class=" btn_b_line">取消绑定</button></td>
              </tr>
              </tbody>
            </table>
            <div class="icon-left">
              <img src="../../assets/images/zsks_o_l.png" alt="">
            </div>
            <div class="icon-right">
              <img src="../../assets/images/zsks_o_r.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <!---列表状态--->
      <div v-else class="newhds-list">
        <div class="newhd-header">
          <p class="newhd-tit">{{checkedTicketItemForm.ticketName}}</p>
          <div class="newhd-time">
            <p>有效时间：{{checkedTicketItemForm.validityStartDate}}至{{checkedTicketItemForm.validityEndDate}}</p>
            <p>创建时间：{{checkedTicketItemForm.createDate}}</p>
          </div>
        </div>
        <div class="newhd-content">
          <ul>
            <li>
              <span class="newhd-txt">秒杀券个数：</span>
              <div class="newhd-inf">{{checkedTicketItemForm.ticketCount}}个</div>
            </li>
            <li>
              <span class="newhd-txt">最大支付数：</span>
              <div class="newhd-inf">{{checkedTicketItemForm.maxPayCount}}个</div>
            </li>
            <li>
              <span class="newhd-txt">秒杀支付金额：</span>
              <div class="newhd-inf">{{checkedTicketItemForm.sedkillMoney}}元</div>
            </li>
            <li>
              <span class="newhd-txt">秒杀开始时间：</span>
              <div class="newhd-inf">{{formatDateToString(checkedTicketItemForm.sedKillStartDate)}}</div>
            </li>
            <li>
              <span class="newhd-txt">报名开始时间：</span>
              <div class="newhd-inf">{{formatDateToString(checkedTicketItemForm.signUpStartTime)}}</div>
            </li>
            <li>
              <span class="newhd-txt">报名结束时间：</span>
              <div class="newhd-inf">{{formatDateToString(checkedTicketItemForm.signUpEndTime)}}</div>
            </li>

          </ul>
        </div>
        <div class="newhd-footer">
          <div class="newhd-btn">
            <table class="mt20">
              <tbody>
              <tr>
                <td><button @click="editTicketItem(checkedTicketItemForm.ticketId,1)" type="button" class=" btn_bass btn_b">编辑</button></td>
                <td><button @click="removeTicketItem" type="button" class=" btn_b_line">取消绑定</button></td>
              </tr>
              </tbody>
            </table>
            <div class="icon-left">
              <img src="../../assets/images/zsks_o_l.png" alt="">
            </div>
            <div class="icon-right">
              <img src="../../assets/images/zsks_o_r.png" alt="">
            </div>
            <div class="icon-right">
              <img src="../../assets/images/zsks_o_r.png" alt="">
            </div>
          </div>
        </div>
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
import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
export default {
  props:['ticketItem','ticketIndex','activityStartDate'],
  data () {
//    var validate_ticketCount = (rule, value, callback) => {
//      value=parseInt(value);
//      if (!value) {
//        return callback(new Error('请输入秒杀券个数'));
//      }else if (!Number.isInteger(value)) {
//        callback(new Error('秒杀券个数须是数字'));
//      } else {
//        if (value > 9999) {
//          callback(new Error('秒杀券个数最多9999个'));
//        } else if(value<1) {
//          callback(new Error('秒杀券个数至少1个'));
//        }
//        callback();
//      }
//    };
//    var validate_maxPayCount =(rule, value, callback) => {
//      value=parseInt(value);
//      if (!value) {
//        return callback(new Error('请输入最大支付数'));
//      }else if (!Number.isInteger(value)) {
//          callback(new Error('最大支付数须是数字'));
//      } else {
//        if(!this.checkedTicketItemForm.ticketCount){
//          callback(new Error('请先输入秒杀券个数'));
//        }
//        if (value > this.checkedTicketItemForm.ticketCount*5) {
//          callback(new Error('最大支付数不能超过5倍秒杀券个数'));
//        } else if(value<this.checkedTicketItemForm.ticketCount) {
//          callback(new Error('最大支付数不能小于秒杀券个数'));
//        }
//        callback();
//      }
//    };
//    var validate_sedkillMoney =(rule, value, callback) => {
//      value=parseInt(value);
//      if (!value) {
//        return callback(new Error('请输入秒杀金额'));
//      }else if (!/^[1-9]\d*$/.test(value)) {
//        callback(new Error('秒杀金额须是数字且大于0'));
//      } else{
//        callback();
//      }
//    };
//    var validate_sedKillStartDate = (rule, value, callback) => {
//      if (!value) {
//        return callback(new Error('请输入秒杀开始时间'));
//      }else if (!this.checkedTicketItemForm.validityStartDate || isNaN(new Date(this.checkedTicketItemForm.validityStartDate).getTime())) {
//        callback(new Error('有效期时间无效'));
//      } else {
//        if(value.getTime()>(new Date(this.checkedTicketItemForm.validityEndDate).getTime()+3600*24*1000-1)){
//          callback(new Error('秒杀开始时间须小于有效期开始日期'));
//        }else if (value.getTime() < (new Date(this.checkedTicketItemForm.validityStartDate).getTime())){
//          callback(new Error('秒杀开始时间须大于有效期开始日期'));
//        }else{
//          callback();
//        }
//      }
//    }
//    var validate_signUpStartTime = (rule, value, callback) => {
//      if (!value) {
//        return callback(new Error('请输入报名开始时间'));
//      }else if (!this.checkedTicketItemForm.sedKillStartDate || isNaN(new Date(this.checkedTicketItemForm.sedKillStartDate).getTime())) {
//        callback(new Error('请先填写秒杀开始时间'));
//      } else {
//        if(value.getTime()>(new Date(this.checkedTicketItemForm.sedKillStartDate).getTime()-(3600*1000))){
//          callback(new Error('报名开始时间须小于秒杀开始1小时'));
//        }else{
//          callback();
//        }
//      }
//    }
//    var validate_signUpEndTime = (rule, value, callback) => {
//      if (!value) {
//        return callback(new Error('请输入报名结束时间'));
//      }else if (!this.checkedTicketItemForm.signUpEndTime || isNaN(new Date(this.checkedTicketItemForm.signUpEndTime).getTime())) {
//        callback(new Error('请先填写秒杀开始时间'));
//      } else {
//        if(value.getTime()>(new Date(this.checkedTicketItemForm.sedKillStartDate).getTime()-(60*5*1000))){
//          callback(new Error('报名结束时间须小于秒杀开始5分钟'));
//        }else if (value.getTime()<(new Date(this.checkedTicketItemForm.signUpEndTime).getTime()+(60*30*1000))){
//          callback(new Error('报名结束时间须大于报名开始时间30分钟'));
//        }else{
//          callback();
//        }
//      }
//    }
    return {
      checkedTicketItemForm:{
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
      ticketRules: {
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
.newhd-content {

}
.edit-txt .el-form-item {
  display: inline-block;
  width:110px;
}
.edit-txt .el-form-item__content{
  line-height: 21px;
}
.edit-txt .el-input {
  /*width:110px;*/
}
.edit-txt .el-input .el-input__inner {
  widht:100%;
  height:20px;
}
  .edit-txt .el-form-item__error {
    width:220px;
    left:-80px;
  }
.edit-txt .el-date-editor{
  width:120px;
}
.edit-txt .el-input__prefix {
  left:auto;
  right:-27px;
}
.edit-txt .el-input__prefix i {
  color:#9384e3;
}
.edit-txt .el-icon-time {
  line-height:22px;
}
.edit-txt .el-input__suffix {
  right:9px;
}
.edit-txt .el-input__suffix .el-input__icon {
  line-height:22px;
}
</style>
