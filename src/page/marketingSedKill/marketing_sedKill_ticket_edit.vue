<template>

  <div class="con_list">
    <div class="filter_div mb20">
      <el-form :model="filterForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="秒杀券名称" prop="name">
              <el-input v-model="filterForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="秒杀券有效期" required>
              <el-col :span="11">
                <el-form-item prop="beginTime">
                  <el-date-picker style="width: 100%;" v-model="filterForm.beginTime" :picker-options="optionsActivityStart" :editable="false" type="datetime" placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endTime">
                  <el-date-picker style="width: 100%;" v-model="filterForm.endTime" :picker-options="optionsActivityEnd" :editable="false" type="datetime" placeholder="请输入结束日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="适用车系" prop="carTypeCode">
              <!--<el-input v-model="filterForm.carTypeCode"></el-input>-->
              <el-select v-model="filterForm.carTypeCode" placeholder="请选择">
                <el-option
                  v-for="item in carSerialsList"
                  :key="item.id"
                  :label="item.brandName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="秒杀券金额" prop="amount">
              <el-input v-model="filterForm.amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="秒杀券说明：" prop="description">
              <el-input type="textarea" v-model="filterForm.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="秒杀券详情：" prop="description">
              <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
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


  //  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data() {
      return {
        isEdit:true,
        carSerialsList:[],
        optionsActivityStart :{
          disabledDate:(time) => {
            if(this.filterForm.endTime){
              let d = new Date (this.filterForm.endTime)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.filterForm.beginTime){
              let d = new Date (this.filterForm.beginTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        ue1: "ue1", // 不同编辑器必须不同的id
        ue2: "ue2",
        filterForm: {
          name: '', //秒杀券名称
          beginTime:'',//有效期开始时间
          endTime:'', //有效期结束时间
          carTypeCode:'',
          carTypeName:'',//车系名称
          amount:'',
          description:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入秒杀券名称', trigger: 'blur' },
            { min: 3, max: 20, message: '秒杀券名称不能超过20个字符', trigger: 'blur' }
          ],
          beginTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          carTypeCode: [
            { required: true,type:"number", message: '请选择秒杀券适用车系', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '单个秒杀券金额', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '秒杀券说明', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
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
          if(type=="copy" && code && code!="new"){
            this.isEdit=false
//            this.$refs.tipMsgRef.showTipMsg({
//              msg:"复制模式",
//              type:"error"
//            });
          }else if(code=="new"){
            this.isEdit=false
//            this.$refs.tipMsgRef.showTipMsg({
//              msg:"新增模式",
//              type:"error"
//            });
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
            Api.sk_activity_detail({id:id})
              .then(res => {
                if (res.status == true) {

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
      getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
      /**
       * 修改秒杀券信息
       */
      updateActivity (){
        let param = {jsonData:JSON.stringify(this.getParameter())}
        Api.sk_activity_update(param)
          .then(res => {
            if (res.status == 1) {

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
        let param = {jsonData:JSON.stringify(this.getParameter())}
        Api.sk_activity_add(param)
          .then(res => {
            if (res.status == 1) {

            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
      getParameter () {
          if(this.filterForm.carTypeCode){
              for(let i =0 ;i<this.carSerialsList.length;i++){
                  if(this.carSerialsList[i].id == this.filterForm.carTypeCode){
                      this.filterForm.carTypeName = this.carSerialsList[i].brandName;
                  }
              }
          }
          this.filterForm.details = this.$refs.ue.getUEContent();
          return this.filterForm;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isEdit){
                this.updateActivity();
            }else {
                this.addActivity();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      returnList(formName) {
//        this.$refs[formName].resetFields();
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
