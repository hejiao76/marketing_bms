<template>
  <div>
    <el-form :model="checkedTicketItemForm" :rules="ticketRules" size="small" ref="checkedTicketItemForm" label-width="0px" class="demo-ruleForm">
      <!--编辑模块--->
      <div v-if="checkedTicketItemForm.editStatus==1" class="newhds-list">
        <div class="newhd-header">
          <p class="newhd-tit">{{checkedTicketItemForm.name}}</p>
          <div class="newhd-time">
            <p>有效时间：{{checkedTicketItemForm.beginTime}}至{{checkedTicketItemForm.endTime}}</p>
            <p>创建时间：{{checkedTicketItemForm.createTime}}</p>
          </div>
        </div>
        <div class="newhd-content">
          <ul>
            <li>
              <span class="newhd-txt">秒杀券个数：</span>
              <div class="edit-txt">
                <el-form-item prop="maxCount">
                  <el-input v-model="checkedTicketItemForm.maxCount"></el-input>
                </el-form-item>
                <!--<input  v-model="checkedTicketItemForm.maxCount" type="text">-->
                <em class="edit-unit">个</em>
              </div>
            </li>
            <li>
              <span class="newhd-txt">最大支付数：</span>
              <div class="edit-txt">
                <el-form-item prop="payCount">
                  <!--<input v-model="checkedTicketItemForm.payCount" type="text">-->
                  <el-input  v-model="checkedTicketItemForm.payCount"></el-input>
                </el-form-item>
                <em class="edit-unit">个</em>
              </div>
            </li>
            <li>
              <span class="newhd-txt">秒杀支付金额：</span>
              <div class="edit-txt mlq0">
                <el-form-item prop="amount">
                  <!--<input v-model="checkedTicketItemForm.amount" type="text">-->
                  <el-input v-model="checkedTicketItemForm.amount"></el-input>
                </el-form-item>

                <em class="edit-unit">元</em>
              </div>
            </li>
            <li>
              <span class="newhd-txt">秒杀开始时间：</span>
              <!-- <div class="newhd-inf">2017-11-15</div> -->
              <div class="edit-txt">
                <el-form-item prop="seckillTime">
                  <el-date-picker v-model="checkedTicketItemForm.seckillTime" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <!--<em class="index-icon icon-hdtime"></em>-->
              </div>
            </li>
            <li>
              <span class="newhd-txt">报名开始时间：</span>
              <div class="edit-txt">
                <el-form-item prop="enrollStartTime">
                  <el-date-picker v-model="checkedTicketItemForm.enrollStartTime" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </div>
            </li>
            <li>
              <span class="newhd-txt">报名结束时间：</span>
              <!-- <div class="newhd-inf">2017-11-15</div> -->
              <div class="edit-txt">
                <el-form-item prop="enrollEndTime">
                  <el-date-picker v-model="checkedTicketItemForm.enrollEndTime" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
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
                <td><button @click="saveTicketItem(checkedTicketItemForm.couponId)" type="button" class=" btn_bass btn_b">保存</button></td>
                <!--<td><button @click="editTicketItem(checkedTicketItemForm.couponId,0)"  type="button" class=" btn_b_line">取消编辑</button></td>-->
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
          <p class="newhd-tit">{{checkedTicketItemForm.name}}</p>
          <div class="newhd-time">
            <p>有效时间：{{checkedTicketItemForm.beginTime}}至{{checkedTicketItemForm.endTime}}</p>
            <p>创建时间：{{checkedTicketItemForm.createTime}}</p>
          </div>
        </div>
        <div class="newhd-content">
          <ul>
            <li>
              <span class="newhd-txt">秒杀券个数：</span>
              <div class="newhd-inf">{{checkedTicketItemForm.maxCount}}个</div>
            </li>
            <li>
              <span class="newhd-txt">最大支付数：</span>
              <div class="newhd-inf">{{checkedTicketItemForm.payCount}}个</div>
            </li>
            <li>
              <span class="newhd-txt">秒杀支付金额：</span>
              <div class="newhd-inf">{{checkedTicketItemForm.amount}}元</div>
            </li>
            <li>
              <span class="newhd-txt">秒杀开始时间：</span>
              <div class="newhd-inf">{{formatDateToString(checkedTicketItemForm.seckillTime)}}</div>
            </li>
            <li>
              <span class="newhd-txt">报名开始时间：</span>
              <div class="newhd-inf">{{formatDateToString(checkedTicketItemForm.enrollStartTime)}}</div>
            </li>
            <li>
              <span class="newhd-txt">报名结束时间：</span>
              <div class="newhd-inf">{{formatDateToString(checkedTicketItemForm.enrollEndTime)}}</div>
            </li>

          </ul>
        </div>
        <div class="newhd-footer">
          <div class="newhd-btn">
            <table class="mt20">
              <tbody>
              <tr>
                <td><button @click="editTicketItem(checkedTicketItemForm.couponId,1)" type="button" class=" btn_bass btn_b">编辑</button></td>
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
      return {
        checkedTicketItemForm:{
          couponId:'', //秒杀券ID
          name:'',//秒杀券名称
          enrollStartTime:'',//报名开始日期
          enrollEndTime:'',//报名截止日期
          beginTime:'',//有效期开始时间
          endTime:'',//有效期结束日期
          createTime:'', //创建日期
          applyCar:'',
          amount:1,//秒杀金额
          seckillTime:'',//秒杀开始日期
          maxCount:'', //秒杀券数量
          payCount:'', //最大支付数
          editStatus:0, //当前是否处于1编辑状态
        },
        ticketRules: {
          maxCount: [
            { validator :this.userValidate().validate_maxCount, trigger: 'blur' }
          ],
          payCount: [
            { validator :this.userValidate().validate_payCount, trigger: 'blur' }
          ],
          amount: [
            { validator :this.userValidate().validate_amount, trigger: 'blur' }
          ],
          seckillTime: [
            { validator :this.userValidate().validate_seckillTime, trigger: 'blur' }
          ],
          enrollStartTime:[
            { validator :this.userValidate().validate_enrollStartTime, trigger: 'blur' }
          ],
          enrollEndTime:[
            { validator :this.userValidate().validate_enrollEndTime, trigger: 'blur' }
          ]
        },
      }
    },
    components :{
      ElInput,
      VTipMsg
    },
    created () {
      this.cloneTicketInfo();
    },
    mounted () {

    },
    watch : {
      ticketItem (val, oldval) {
        this.cloneTicketInfo();
      }
    },
    methods:{
      cloneTicketInfo() {
        this.checkedTicketItemForm = Object.assign({},this.checkedTicketItemForm,this.ticketItem);
        this.checkedTicketItemForm.beginTime=util.dateObjToString(new Date(this.checkedTicketItemForm.beginTime));
        this.checkedTicketItemForm.endTime=util.dateObjToString(new Date(this.checkedTicketItemForm.endTime))
        this.checkedTicketItemForm.createTime=util.dateObjToString(new Date(this.checkedTicketItemForm.createTime));

        if(this.checkedTicketItemForm.enrollStartTime){
          this.checkedTicketItemForm.enrollStartTime = new Date(this.checkedTicketItemForm.enrollStartTime)
        }
        if(this.checkedTicketItemForm.enrollEndTime){
          this.checkedTicketItemForm.enrollEndTime = new Date(this.checkedTicketItemForm.enrollEndTime)
        }
        if(this.checkedTicketItemForm.seckillTime){
          this.checkedTicketItemForm.seckillTime = new Date(this.checkedTicketItemForm.seckillTime)
        }
      },
      test () {},
      /**
       * 日期转1字符串
       * @param date
       */
      formatDateToString (date){
        if(typeof date == 'object'){
          return util.toFullDateString(date.getTime());
        }
        else{
          return date;
        }
      },
      /**
       * 编辑/取消编辑 秒杀券基本信息按钮事件触发
       * @param couponId
       * @param status
       */
      editTicketItem (couponId,status) {
        if(couponId){
          this.checkedTicketItemForm.editStatus=status;
          console.log("edit~~~~",JSON.stringify(this.checkedTicketItemForm))
        }
      },
      removeTicketItem () {
        console.log("到哪儿去了------------11111",this.checkedTicketItemForm.couponId);
        if(this.checkedTicketItemForm.couponId){
          console.log(this.couponId);
          this.$emit("call",{op:"delete",callData:this.checkedTicketItemForm.couponId});
        }
      },
      /**
       *  保存 秒杀券基本信息按钮事件触发
       * @param couponId
       */
      saveTicketItem(couponId){
        if(couponId){
          this.$refs['checkedTicketItemForm'].validate((valid) => {
            if (valid) {
              let newItem ={};
              this.checkedTicketItemForm.editStatus=0;
              Object.assign(newItem,this.checkedTicketItemForm);
              console.log("~~~~",JSON.stringify(newItem));
              if(this.checkedTicketItemForm.enrollStartTime){
                newItem.enrollStartTime = this.formatDateToString(this.checkedTicketItemForm.enrollStartTime)
              }
              if(this.checkedTicketItemForm.enrollEndTime){
                newItem.enrollEndTime = this.formatDateToString(this.checkedTicketItemForm.enrollEndTime)
              }
              if(this.checkedTicketItemForm.seckillTime){
                newItem.seckillTime = this.formatDateToString(this.checkedTicketItemForm.seckillTime)
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
       * @returns {{validate_maxCount: (function(*, *=, *)), validate_payCount: (function(*, *=, *)), validate_amount: (function(*, *=, *)), validate_seckillTime: (function(*, *=, *)), validate_enrollStartTime: (function(*, *=, *)), validate_enrollEndTime: (function(*, *=, *))}}
       */
      userValidate (){
        return {
          validate_maxCount : (rule, value, callback) => {
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
          validate_payCount : (rule, value, callback) => {
            value=parseInt(value);
            if (!value) {
              return callback(new Error('请输入最大支付数'));
            }else if (!Number.isInteger(value)) {
              callback(new Error('最大支付数须是数字'));
            } else {
              if(!this.checkedTicketItemForm.maxCount){
                callback(new Error('请先输入秒杀券个数'));
              }
              if (value > this.checkedTicketItemForm.maxCount*5) {
                callback(new Error('最大支付数不能超过5倍秒杀券个数'));
              } else if(value<this.checkedTicketItemForm.maxCount) {
                callback(new Error('最大支付数不能小于秒杀券个数'));
              }
              callback();
            }
          },
          validate_amount :(rule, value, callback) => {
            value=parseInt(value);
            if (!value) {
              return callback(new Error('请输入秒杀金额'));
            }else if (!/^[1-9]\d*$/.test(value)) {
              callback(new Error('秒杀金额须是数字且大于0'));
            } else{
              callback();
            }
          },
          validate_seckillTime : (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入秒杀开始时间'));
            }else if (!this.checkedTicketItemForm.beginTime || isNaN(new Date(this.checkedTicketItemForm.beginTime).getTime())) {
              callback(new Error('有效期时间无效'));
            } else {
              if(value.getTime()>(new Date(this.checkedTicketItemForm.endTime).getTime()+3600*24*1000-1)){
                callback(new Error('秒杀开始时间须小于有效期开始日期'));
              }else if (value.getTime() < (new Date(this.checkedTicketItemForm.beginTime).getTime())){
                callback(new Error('秒杀开始时间须大于有效期开始日期'));
              }else{
                callback();
              }
            }
          },
          validate_enrollStartTime : (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入报名开始时间'));
            }else if (!this.checkedTicketItemForm.seckillTime || isNaN(new Date(this.checkedTicketItemForm.seckillTime).getTime())) {
              callback(new Error('请先填写秒杀开始时间'));
            } else {
              if(value.getTime()>(new Date(this.checkedTicketItemForm.seckillTime).getTime()-(3600*1000))){
                callback(new Error('报名开始时间须小于秒杀开始1小时'));
              }else{
                callback();
              }
            }
          },
          validate_enrollEndTime :(rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入报名结束时间'));
            }else if (!this.checkedTicketItemForm.enrollEndTime || isNaN(new Date(this.checkedTicketItemForm.enrollEndTime).getTime())) {
              callback(new Error('请先填写秒杀开始时间'));
            } else {
              if(value.getTime()>(new Date(this.checkedTicketItemForm.seckillTime).getTime()-(60*5*1000))){
                callback(new Error('报名结束时间须小于秒杀开始5分钟'));
              }else if (value.getTime()<(new Date(this.checkedTicketItemForm.enrollStartTime).getTime()+(60*30*1000))){
                callback(new Error('报名结束时间须大于报名开始时间30分钟'));
              }else{
                callback();
              }
            }
          }
        }
      }

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
