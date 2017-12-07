//基础设置模块
<template>
  <div>
    <el-form :model="filterForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm" label-position="left">
      <el-row>
        <el-col :span="24">
          <el-form-item label="活动名称" prop="ticketName">
            <el-radio v-model="filterForm.radio" label="1">全车系</el-radio>
            <el-radio v-model="filterForm.radio" label="2">指定车系</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="活动名称" prop="ticketName" v-if="filterForm.radio==2">
            <el-checkbox v-for="items in filterForm.carList">{{items}}</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
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
import VTreeview from "./../../components/treeview.vue";
export default {
  props:['prizeDrawDetail',"isEdit"],
  data () {
    return {
      optionsActivityStart :{
        disabledDate:(time) => {
          if(this.baseItem.beginTime){
            let d = new Date (this.baseItem.endTime)
            return time.getTime() >d.getTime() ||  time.getTime() < new Date().getTime();
          }
        }
      },
      optionsActivityEnd :{
        disabledDate:(time) => {
          if(this.baseItem.endTime){
            let d = new Date (this.baseItem.beginTime)
            return time.getTime() <d.getTime() ||  time.getTime() < new Date().getTime();
          }
        }
      },
      filterForm:{
        name:'', //活动名称
        beginTime:new Date(new Date().setHours(new Date().getHours()+1)), //活动开始时间
        endTime:new Date(new Date().setDate(new Date().getDate()+7)), //活动结束时间
        isShowJoinSize:1, //是否显示参与人数
        addJoinSize:0, //添加参与人数
        isShowWinningRecord:1, //是否显示中奖记录
        bgImg:'',//背景图片地址,
        titleImg:'', //标题图片地址,
        shareImg:'',//分享图片地址
        area:'',//活动地区JSON串
        carStyle:'',// 车系车型JSON串
        description:'',//活动说明
      },
      rules: {
        name: [
          { required: true, message: '请填写活动名称', trigger: 'change' },
          { max:10,message:'活动名称最大长度为10', trigger: 'blur' }
        ],
//        isShowJoinSize: [
//          { required: true, message: '请选择是否显示参与人数', trigger: 'change' }
//        ],
//        isShowWinningRecord: [
//          { required: true, message: '请选择是否显示获奖信息', trigger: 'change' }
//        ],
        bgImg: [
          { required: true, message: '请上传背景图片', trigger: 'change' }
        ],
        titleImg: [
          { required: true, message: '请上传标题图片', trigger: 'change' }
        ],
        shareImg: [
          { required: true, message: '请上传分享图片', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入活动说明', trigger: 'blur' }
        ]
      },
    }
  },
  components :{
    VTreeview,
    VTipMsg
  },
  watch : {
    prizeDrawDetail (val, oldval) {
      this.cloneTicketInfo();
      this.requsetLocation();
    }
  },
  created () {
  },
  mounted () {
//    this.cloneTicketInfo();
  },
  methods:{
    editSave (){
      this.$emit("editSaveCall");
    },
      requsetLocation (){
        Api.base_sys_location({})
          .then(res => {
            if (res.status == true) {
              console.log(res);
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
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
      if(this.prizeDrawDetail && this.prizeDrawDetail.name){
        this.baseItem = {
          name:this.prizeDrawDetail.name, //活动名称
          beginTime:new Date(this.prizeDrawDetail.beginTime), //活动开始时间
          endTime:new Date(this.prizeDrawDetail.endTime), //活动结束时间
          isShowJoinSize:this.prizeDrawDetail.isShowJoinSize || 1, //是否显示参与人数
          addJoinSize:this.prizeDrawDetail.addJoinSize || 0, //添加参与人数
          isShowWinningRecord:this.prizeDrawDetail.isShowWinningRecord || 1, //是否显示中奖记录
          bgImg:this.prizeDrawDetail.bgImg,//背景图片地址,
          titleImg:this.prizeDrawDetail.titleImg, //标题图片地址,
          shareImg:this.prizeDrawDetail.shareImg,//分享图片地址
          area:this.prizeDrawDetail.area,//活动地区JSON串
          carStyle:this.prizeDrawDetail.carStyle,// 车系车型JSON串
          description:this.prizeDrawDetail.description,//活动说明
        }
      }
    },
    /**
     * 上传图片成功回调
     * @param res
     * @param file
     */
    handleAvatarSuccess(res, file) {
      this.baseItem.bgImg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
      this.$refs['baseItem'].validate((valid) => {
        if (!valid) {
          this.$refs.tipMsgRef.showTipMsg({
            msg:"基础设置填写有误",
            type:"error"
          });
          validStatus=false;
          return false;
        }
      });
      return validStatus;
    },
    getBaseItem(){
        return this.baseItem;
    },
    /**
     *  下一步 基本信息设置
     * @param ticketId
     */
    saveBaseItem(){
        if(this.validBaseItem()){
              let newBaseItem = Object.assign({},this.baseItem);
              newBaseItem.beginTime = this.formatDateToString(this.baseItem.beginTime);
              newBaseItem.endTime = this.formatDateToString(this.baseItem.endTime);
              this.$emit("call",{op:"edit",tag:"base",callData:newBaseItem});
        }
//      this.$refs['baseItem'].validate((valid) => {
//          if (valid) {
//              let newBaseItem = Object.assign({},this.baseItem);
//              newBaseItem.beginTime = this.formatDateToString(this.baseItem.beginTime);
//              newBaseItem.endTime = this.formatDateToString(this.baseItem.endTime);
//              this.$emit("call",{op:"edit",tag:"base",callData:newBaseItem});
//              console.log("success");
//          }else{
//            console.log('error submit!!');
//            return false;
//          }
//      });


//      if(ticketId){
//        this.$refs['checkedTicketItemForm'].validate((valid) => {
//          if (valid) {
//            let newItem ={};
//            this.checkedTicketItemForm.editStatus=0;
//            Object.assign(newItem,this.checkedTicketItemForm);
//            console.log("~~~~",JSON.stringify(newItem));
//            if(this.checkedTicketItemForm.signUpStartTime){
//              newItem.signUpStartTime = this.formatDateToString(this.checkedTicketItemForm.signUpStartTime)
//            }
//            if(this.checkedTicketItemForm.signUpEndTime){
//              newItem.signUpEndTime = this.formatDateToString(this.checkedTicketItemForm.signUpEndTime)
//            }
//            if(this.checkedTicketItemForm.sedKillStartDate){
//              newItem.sedKillStartDate = this.formatDateToString(this.checkedTicketItemForm.sedKillStartDate)
//            }
//            delete newItem.editStatus;
//            this.$emit("call",{op:"edit",callData:newItem});
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
//      }
    },
    /**
     * 自定义验证规则
     * @returns
     */
    userValidate (){
        return {
//          validate_name : (rule, value, callback) => {
//            if (!value) {
//              return callback(new Error('请输入活动名称'));
//            } else {
//              if (value > 9999) {
//                callback(new Error('秒杀券个数最多9999个'));
//              } else if(value<1) {
//                callback(new Error('秒杀券个数至少1个'));
//              }
//              callback();
//            }
//          },
//
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
