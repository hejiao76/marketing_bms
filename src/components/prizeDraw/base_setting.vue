//基础设置模块
<template>
  <div>
    <el-form :model="baseItem"  :rules="rules" ref="baseItem" label-width="120px" size="small" :label-position="labelPosition">
      <el-row>
        <el-col :span="24">
          <el-form-item label="活动名称:" prop="name">
            <el-input :maxlength="10"   v-model="baseItem.name" placeholder="请输入活动名称" ></el-input>
          </el-form-item>
          <el-form-item label="活动日期:" required>
            <el-col :span="11">
              <el-form-item prop="beginTime">
                <el-date-picker style="width: 100%;" :clearable="false" :editable="false" v-model="baseItem.beginTime" :picker-options="optionsActivityStart" type="datetime" placeholder="选择开始日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-form-item prop="endTime">
                <el-date-picker style="width: 100%;" :clearable="false" :editable="false" v-model="baseItem.endTime" :picker-options="optionsActivityEnd" type="datetime" placeholder="请输入结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item prop="isShowJoinSize" label="参与人数:">
            <el-col :span="24">
              <el-radio-group v-model="baseItem.isShowJoinSize">
              <el-radio  :label="1">显示</el-radio>
              <el-radio  :label="0">隐藏</el-radio>
              </el-radio-group>
              <span style="margin-left: 100px">在实际人数上增加&nbsp;&nbsp;
                <el-input-number v-model="baseItem.addJoinSize" :controls="false" :min="0"  style="width: 100px;display: inline-block"></el-input-number>&nbsp;&nbsp;人
                <!--<el-input v-model="baseItem.addJoinSize"  placeholder="请输入内容" style="width: 100px;display: inline-block"></el-input>&nbsp;&nbsp;人-->
              </span>
            </el-col>
          </el-form-item>
          <el-form-item prop="isShowWinningRecord" label="获奖信息:">
            <el-col :span="24">
              <el-radio-group v-model="baseItem.isShowWinningRecord">
              <el-radio  :label="1">显示</el-radio>
              <el-radio  :label="0">隐藏</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="14">
            <span >背景图片：</span>
            <!--<el-form-item prop="bgImg" label-width="0px;">-->
            <!--<el-upload-->
              <!--class="upload-demo"-->
              <!--action="https://jsonplaceholder.typicode.com/posts/"-->
              <!--:show-file-list="false"-->
              <!--:on-success="handleAvatarSuccess"-->
              <!--:before-upload="beforeAvatarUpload">-->
              <!--<img v-if="baseItem.bgImg" :src="baseItem.bgImg" class="avatar">-->
              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
            <!--</el-form-item>-->
            <el-form-item prop="bgImg" label-width="0px;">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <!--<i class="el-icon-upload" ></i>-->
              <img v-if="baseItem.bgImg" :src="baseItem.bgImg" class="avatar">
              <i v-else class="el-icon-upload" ></i>
              <div class="el-upload__text">拖动或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip"></div>
            </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="font-size: 12px;padding-top:40%;">大小200kb内<br/>
              尺寸：50px*50px</div>
            <a href="javascript:void(0)" style="color: #527EFE">恢复默认</a>
          </el-col>

        </el-col>
        <el-col :span="8">
          <el-col :span="14">
            <span >标题图片：</span>
            <el-form-item prop="titleImg" label-width="0px;">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <img v-if="baseItem.titleImg" :src="baseItem.titleImg" class="avatar">
              <i v-else class="el-icon-upload" ></i>
              <div class="el-upload__text">拖动或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip"></div>
            </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="font-size: 12px;padding-top:40%;">大小200kb内<br/>
              尺寸：50px*50px</div>
            <a href="javascript:void(0)" style="color: #527EFE">恢复默认</a>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="14">
            <span >活动图片：</span>
            <el-form-item prop="shareImg" label-width="0px;">
              <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <!--<i class="el-icon-upload" ></i>-->
                <img v-if="baseItem.shareImg" :src="baseItem.shareImg" class="avatar">
                <i v-else class="el-icon-upload" ></i>
                <div class="el-upload__text">拖动或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip"></div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="font-size: 12px;padding-top:40%">大小:<br/>200kb内<br/>
              尺寸：<br/>50px*50px</div>
            <a href="javascript:void(0)" style="color: #527EFE">恢复默认</a>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-20" style="margin-top:20px;">
        <el-form-item label="活动地区:" prop="description">
          <V-Treeview></V-Treeview>
        </el-form-item>
      </el-row>
      <el-row class="margin-bottom-20">
        <span class="span-120">车系／车型：</span><el-select  v-model="baseItem.carStyle" placeholder="全部"size="small">
          <el-option
            v-for="item in baseItem.activityArea"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="活动说明:" prop="description">
            <el-input type="textarea" placeholder="填写商家自定义的活动说明" v-model="baseItem.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: center;">
          <el-button @click="saveBaseItem" type="primary">下一步</el-button>
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
      baseItem:{
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
      labelPosition:'left',
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
