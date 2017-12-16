<template>

  <div class="con_list">
    <div class="filter_div mb20">
      <el-form :model="sedKillFormItem" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="秒杀券名称" prop="name">
              <el-input v-model="sedKillFormItem.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="秒杀券有效期" required>
              <el-col :span="11">
                <el-form-item prop="beginTime">
                  <el-date-picker style="width: 100%;" v-model="sedKillFormItem.beginTime" :picker-options="optionsActivityStart" :clearable="false" :editable="false" type="datetime" placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endTime">
                  <el-date-picker style="width: 100%;" v-model="sedKillFormItem.endTime" :picker-options="optionsActivityEnd" :clearable="false" :editable="false" type="datetime" placeholder="请输入结束日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="适用车系" prop="carTypeId">
              <!--<el-input v-model="sedKillFormItem.carTypeId"></el-input>-->
              <el-select v-model="sedKillFormItem.carTypeId" placeholder="请选择">
                <el-option
                  v-for="item in carSerialsList"
                  :key="item.id"
                  :label="item.serialName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="秒杀券金额" prop="amount">
              <!--<el-input v-model="sedKillFormItem.amount"></el-input>-->
              <el-input-number v-model="sedKillFormItem.amount" :max="99999999" :controls="false"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="秒杀券说明：" prop="description">
              <el-input type="textarea" v-model="sedKillFormItem.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="秒杀券详情：" prop="description">
              <UE :defaultMsg=sedKillFormItem.details :config=config :id=ue1 ref="ue"></UE>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button v-if="isEdit" type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button v-else="isEdit" type="primary" @click="submitForm('ruleForm')">创建</el-button>
              <el-button @click="returnList('ruleForm')">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>



      </el-form>
    </div>
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


  export default {
    data() {
      return {
        isEdit:true,
        isCopy:false,
        carSerialsList:[],
        optionsActivityStart :{
          disabledDate:(time) => {
            if(this.sedKillFormItem.endTime){
              let d = new Date (this.sedKillFormItem.endTime)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.sedKillFormItem.beginTime){
              let d = new Date (this.sedKillFormItem.beginTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        ue1: "ue1", // 不同编辑器必须不同的id
        ue2: "ue2",
        sedKillFormItem: {
          name: '', //秒杀券名称
          beginTime:'',//有效期开始时间
          endTime:'', //有效期结束时间
          carTypeId:'',
          carTypeName:'',//车系名称
          amount:'',
          description:'',
          details:""
        },
        rules: {
          name: [
            { required: true, message: '请输入秒杀券名称', trigger: 'blur' },
            { min: 1, max: 10, message: '秒杀券名称不能超过10个字符', trigger: 'blur' }
          ],
          beginTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          carTypeId: [
            { required: true,type:"number", message: '请选择秒杀券适用车系', trigger: 'blur' }
          ],
          amount: [
            { required: true, type:"number", message: '单个秒杀券金额', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '秒杀券说明', trigger: 'blur' },
            { min:1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    components :{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      UE,

    },
    created (){

    },
    mounted () {
        this.initPage();
    },
    methods : {
      initPage() {
          let type  = this.$route.params.type;
          let code = this.$route.params.ticketId;
          this.isCopy = type =="copy" ? true : false;
          if(code=="new"){
              //新增相关操作
            this.isEdit=false
          }else if(code){
            //编辑相关操作
            this.isEdit=true;
            this.requestCouponInfo(code)
          }
          this.requestCarTypeList();
      },
      /**
       * 请求车系列表
       * @param id
       */
      requestCarTypeList () {
        Api.base_sys_car_serials({})
          .then(res => {
            if (res.status == 1) {
              this.carSerialsList = res.result
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
       * 请求秒杀券详情
       * @param id
       */
      requestCouponInfo (id) {
          if(id){
            Api.sk_activity_ticket_detail({id:id})
              .then(res => {
                if (res.status == true) {
                    this.sedKillFormItem=Object.assign({},res.result,{
                      beginTime:new Date(res.result.beginTime),
                      endTime:new Date(res.result.endTime)
                    });
                    if(this.isCopy){
                        delete this.sedKillFormItem.id;
                    }
                }else {
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:"error"
                  });
                }
              }).catch(err => {

            });
          }
      },
      /**
       * 修改秒杀券信息
       */
      updateActivity (){
        let param =this.getParameter();
        Api.sk_activity_update(param)
          .then(res => {
            if (res.status == 1) {
              this.$refs.tipMsgRef.showTipMsg({
                msg:"操作成功",
                type:"success",
                scope:this,
                callback:function (){
                  this.$router.push("/sedkill/ticket_list");
                }
              });
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
       * 新增秒杀券信息
       */
      addActivity () {
        let param = this.getParameter();
        Api.sk_activity_ticket_add(param)
          .then(res => {
            if (res.status == 1) {
              this.$refs.tipMsgRef.showTipMsg({
                msg:"操作成功",
                type:"success",
                scope:this,
                callback:function (){
                  this.$router.push("/sedkill/ticket_list");
                }
              });
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
       * 日期转1字符串111111111111111111111111
       * @param date
       */
      formatDateToString (date){
        if(typeof date == 'object'){
          return util.toFullDateString(date.getTime());
        }else{
          return date;
        }
      },
      getParameter () {
          if(this.sedKillFormItem.carTypeId){
              for(let i =0 ;i<this.carSerialsList.length;i++){
                  if(this.carSerialsList[i].id == this.sedKillFormItem.carTypeId){
                      this.sedKillFormItem.carTypeName = this.carSerialsList[i].serialName;
                  }
              }
          }
          this.sedKillFormItem.details = this.$refs.ue.getUEContent();
          let param = Object.assign({},this.sedKillFormItem);
          param.beginTime=this.formatDateToString(this.sedKillFormItem.beginTime);
          param.endTime=this.formatDateToString(this.sedKillFormItem.endTime);
          return param;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isEdit && !this.isCopy){
                this.updateActivity();
            }else {
                this.addActivity();
            }
          } else {
            this.$message({
              type:'error',
              message:'秒杀券信息填写有误',
              duration:'1500'
            });
            return false;
          }
        });
      },
      returnList(formName) {
        this.$router.push("/sedkill/ticket_list");
      }

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
