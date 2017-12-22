//基础设置模块
<template>
  <div>
    <el-form :model="baseItem"  :rules="rules" ref="baseItem" label-width="120px" size="small" :label-position="labelPosition">
      <el-row>
        <el-col :span="24">
          <el-col :span="24">
            <el-form-item label="活动名称:" prop="name" style="width: 56%;">
              <el-input :maxlength="10"   v-model="baseItem.name" placeholder="请输入活动名称" ></el-input>
            </el-form-item>
          </el-col>
         <el-col :span="24">
           <el-form-item label="活动日期:" required>
             <el-col :span="11">
               <el-form-item prop="beginTime">
                 <el-date-picker :disabled="isHaveInHand" style="width: 100%;" :clearable="false" :editable="false" v-model="baseItem.beginTime" :picker-options="optionsActivityStart" type="datetime" placeholder="选择开始日期"></el-date-picker>
               </el-form-item>
             </el-col>
             <el-col class="line" :span="2" style="text-align: center">-</el-col>
             <el-col :span="11">
               <el-form-item prop="endTime">
                 <el-date-picker style="width: 100%;" :clearable="false" :editable="false" v-model="baseItem.endTime" :picker-options="optionsActivityEnd" type="datetime" placeholder="请输入结束日期"></el-date-picker>
               </el-form-item>
             </el-col>
           </el-form-item>
         </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="isShowJoinSize" label="参与人数:">
            <el-col :span="24">
              <el-radio-group @change="previewCall($event,'isShowJoinSize')" v-model="baseItem.isShowJoinSize">
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
              <el-radio-group @change="previewCall($event,'isShowWinningRecord')" v-model="baseItem.isShowWinningRecord">
              <el-radio  :label="1">显示</el-radio>
              <el-radio  :label="0">隐藏</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
            <span >背景图片：</span>
            <el-form-item prop="bgImg" label-width="0px;"  class="prizeDrawUpload">
              <el-upload class="avatar-uploader" style="min-width:100px;max-width:60%" :on-success="bgImgUploadSuccess" :before-upload="bgImgBeforeUpload" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">
                <img v-if="baseItem.bgImg" :src="baseItem.bgImg.includes('http://') ? baseItem.bgImg : Final.IMG_PATH+baseItem.bgImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="rightTip" style="">
                <div style="">大小200kb内</div>
                <a href="javascript:void(0)" style="color: #527EFE" @click="setDefaultImg('bg')">恢复默认</a>
              </div>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <span >标题图片：</span>
          <el-form-item prop="titleImg" label-width="0px;"  class="prizeDrawUpload">
            <el-upload class="avatar-uploader" style="min-width:100px;max-width:60%" :on-success="titleImgUploadSuccess" :before-upload="titleImgBeforeUpload" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">
              <img v-if="baseItem.titleImg" :src="baseItem.titleImg.includes('http://') ? baseItem.titleImg : Final.IMG_PATH+baseItem.titleImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="rightTip" style="">
              <div style="">大小200kb内</div>
              <a href="javascript:void(0)" style="color: #527EFE" @click="setDefaultImg('title')">恢复默认</a>
            </div>
          </el-form-item>
        </el-col>
        <!--<el-col :span="8">-->
          <!--<el-col :span="14">-->
            <!--<span >标题图片：</span>-->
            <!--<el-form-item prop="titleImg" label-width="0px;">-->
            <!--&lt;!&ndash;<el-upload class="upload-demo" :on-success="titleImgUploadSuccess" :before-upload="titleImgBeforeUpload" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">&ndash;&gt;-->
              <!--&lt;!&ndash;<img v-if="baseItem.titleImg" :src="Final.IMG_PATH+baseItem.titleImg" class="avatar">&ndash;&gt;-->
              <!--&lt;!&ndash;<i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-upload>&ndash;&gt;-->
              <!--<el-upload class="avatar-uploader" :on-success="titleImgUploadSuccess" :before-upload="titleImgBeforeUpload" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">-->
                <!--<img v-if="baseItem.titleImg" :src="Final.IMG_PATH+baseItem.titleImg" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <!--</el-upload>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<div style="font-size: 12px;padding-top:40%;">大小200kb内</div>-->
            <!--<a href="javascript:void(0)" style="color: #527EFE">恢复默认</a>-->
          <!--</el-col>-->
        <!--</el-col>-->
        <el-col :span="8">
          <span >活动图片：</span>
          <el-form-item prop="shareImg" label-width="0px;"  class="prizeDrawUpload">
            <el-upload class="avatar-uploader" style="min-width:100px;max-width:60%" :on-success="shareImgUploadSuccess" :before-upload="shareImgUploadSuccess" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">
              <img v-if="baseItem.shareImg" :src="baseItem.shareImg.includes('http://') ? baseItem.shareImg : Final.IMG_PATH+baseItem.shareImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="rightTip" style="">
              <div style="">大小200kb内<br/>50px*50px</div>
              <a href="javascript:void(0)" style="color: #527EFE" @click="setDefaultImg('share')">恢复默认</a>
            </div>
          </el-form-item>
        </el-col>
        <!--<el-col :span="8">-->
          <!--<el-col :span="14">-->
            <!--<span >活动图片：</span>-->
            <!--<el-form-item prop="shareImg" label-width="0px;">-->
              <!--&lt;!&ndash;<el-upload class="upload-demo" :on-success="shareImgUploadSuccess" :before-upload="shareImgBeforeUpload" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<i class="el-icon-upload" ></i>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<img style="width:100%;" v-if="baseItem.shareImg" :src="Final.IMG_PATH+baseItem.shareImg" class="avatar">&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<i v-else class="el-icon-upload" ></i>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="el-upload__text"><em>点击上传</em></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="el-upload__tip" slot="tip"></div>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-upload>&ndash;&gt;-->
              <!--<el-upload class="avatar-uploader" :on-success="shareImgUploadSuccess" :before-upload="shareImgUploadSuccess" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">-->
                <!--<img v-if="baseItem.shareImg" :src="Final.IMG_PATH+baseItem.shareImg" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <!--</el-upload>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<div style="font-size: 12px;padding-top:40%">大小:<br/>200kb内<br/>-->
              <!--尺寸：<br/>50px*50px</div>-->
            <!--<a href="javascript:void(0)" style="color: #527EFE">恢复默认</a>-->
          <!--</el-col>-->
        <!--</el-col>-->
      </el-row>
      <el-row v-if="ownerType==1" class="margin-bottom-20" style="margin-top:20px;">
        <el-form-item label="活动地区:" required >
          <V-Treeview  @call="syncArea" :code="baseItem.areaIds" :name="baseItem.areaNames"></V-Treeview>
        </el-form-item>
      </el-row>
      <el-row class="margin-bottom-20">
        <el-col :span="24">
          <el-form-item label="车系／车型：" prop="serialIds" >
          <!--<span class="span-120"></span>-->
          <el-select :disabled="isHaveInHand" style="width:100%;" @change="serialChange"  v-model="baseItem.serialIds" placeholder="请选择车系" size="small" multiple >
            <el-option
              v-for="item in seriesList"
              :key="item.id"
              :label="item.serialName"
              :value="String(item.id)">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="活动说明:" prop="description">
            <el-input  :maxlength="1000" @change="previewCall($event,'description')" type="textarea" placeholder="填写商家自定义的活动说明" v-model="baseItem.description"></el-input>
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
import Final from "../../../static/baseSetting/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
import VTreeview from "./../../components/treeview.vue";
import ElCol from "element-ui/packages/col/src/col";
export default {
  props:['prizeDrawDetail',"isEdit","isHaveInHand"],
  data () {
    return {
      Final:Final,
      uploadParam:{module:"lottery"},
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
        areaIds:'',//活动地区ID字符串
        areaNames:'',//活动地区名称字符串
        carStyle:'',// 车系车型JSON串
        description:'',//活动说明,
        serialIds:[] //车系ID
      },
      rules: {
        name: [
          { required: true, message: '请填写活动名称', trigger: 'blur' },
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
        serialIds:[
          { required: true, type:"array", message: '请选择车系', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入活动说明', trigger: 'blur' }
        ]
      },
      seriesList:[],
      labelPosition:'left',
      ownerType:2
    }
  },
  components :{
    ElCol,
    VTreeview,
    VTipMsg
  },
  watch : {
    prizeDrawDetail (val, oldval) {
      /*-----------适配编辑跳转新增 初始化数据----开始-----*/
      this.name='' //活动名称
      this.beginTime=new Date(new Date().setHours(new Date().getHours()+1))//活动开始时间
      this.endTime=new Date(new Date().setDate(new Date().getDate()+7))//活动结束时间
      this.isShowJoinSize=1 //是否显示参与人数
      this.addJoinSize=0//添加参与人数
      this.isShowWinningRecord=1 //是否显示中奖记录
      this.bgImg=''//背景图片地址,
      this.titleImg=''//标题图片地址,
      this.shareImg=''//分享图片地址
      this.areaIds=''//活动地区ID字符串
      this.areaNames=''//活动地区名称字符串
      this.carStyle=''// 车系车型JSON串
      this.description=''//活动说明,
      this.serialIds=[] //车系ID
      /*-----------适配编辑跳转新增 初始化数据----结束-----*/
      this.ownerType=localStorage.getItem("ownerType") || 2;
      this.cloneTicketInfo();

    }
  },
  created () {
  },
  mounted () {
      this.requsetSeriesList();
      this.requsetLocation();
//    this.cloneTicketInfo();
  },
  methods:{
    editSave (){
      this.$emit("editSaveCall");
    },
    serialChange (){
      this.$emit("serialChange",{serialStr : this.baseItem.serialIds.join(",")});
    },
    previewCall($event,key) {
        let data={};
        data[key]=this.baseItem[key];
        this.$emit("previewCall",data)
    },
      requsetLocation (){
        Api.base_sys_location({})
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
      },
      requsetSeriesList (){
        Api.base_sys_car_serials({})
          .then(res => {
            if (res.status == true) {
                this.seriesList=res.result;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
    cloneTicketInfo() {
      if(this.prizeDrawDetail && this.prizeDrawDetail.name){
        this.baseItem = {
          name:this.prizeDrawDetail.name, //活动名称
          beginTime:new Date(this.prizeDrawDetail.beginTime), //活动开始时间
          endTime:new Date(this.prizeDrawDetail.endTime), //活动结束时间
          isShowJoinSize:this.prizeDrawDetail.isShowJoinSize, //是否显示参与人数
          addJoinSize:this.prizeDrawDetail.addJoinSize || 0, //添加参与人数
          isShowWinningRecord:this.prizeDrawDetail.isShowWinningRecord, //是否显示中奖记录
          bgImg:this.prizeDrawDetail.bgImg,//背景图片地址,
          titleImg:this.prizeDrawDetail.titleImg, //标题图片地址,
          shareImg:this.prizeDrawDetail.shareImg,//分享图片地址
          areaIds:this.prizeDrawDetail.areaIds,//活动地区ID字符串
          areaNames:this.prizeDrawDetail.areaNames,//活动地区名称字符串
          serialIds:this.prizeDrawDetail.serialIds.split(","),// 车系车型JSON串
          description:this.prizeDrawDetail.description,//活动说明
        }
      }
    },
    syncArea(data){
      this.baseItem.areaIds=data.allCode;
      this.baseItem.areaNames=data.allName;
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
            this.$message({
              type:'error',
              message:'基础信息填写有误',
              duration:'1500'
            });
//          this.$refs.tipMsgRef.showTipMsg({
//            msg:"基础设置填写有误",
//            type:"error"
//          });
          validStatus=false;
          return false;
        }
      });
      return validStatus;
    },
    getBaseItem(){
        let newBaseItem = Object.assign({},this.baseItem);
        newBaseItem.beginTime = this.formatDateToString(this.baseItem.beginTime);
        newBaseItem.endTime = this.formatDateToString(this.baseItem.endTime);
        newBaseItem.serialIds = this.baseItem.serialIds.join(",");
        return newBaseItem;
    },
    /**
     *  下一步 基本信息设置
     * @param ticketId
     */
    saveBaseItem(){
        if(this.validBaseItem()){
              let newBaseItem = this.getBaseItem();
              this.$emit("call",{op:"edit",tag:"base",callData:newBaseItem});
        }
    },
    beforeUpload (file){
      const isAllowType = ['image/jpeg', 'image/png','image/bmp'].includes(file.type);
      const isMaxSize = file.size / 1024 < 200; //小于200Kb

      if (!isAllowType) {
        this.$message.error('上传头像图片只能是 JPG/PNG/BMP格式!');
      }
      if (!isMaxSize) {
        this.$message.error('上传头像图片大小不能超过 200KB!');
      }
      return isAllowType && isMaxSize;
    },
    bgImgBeforeUpload (file){
        return this.beforeUpload(file);
    },
    titleImgBeforeUpload(file){
      return this.beforeUpload(file);
    },
    shareImgBeforeUpload(file){
      return this.beforeUpload(file);
    },
    bgImgUploadSuccess (res, file, fileList) {
        if(res.status==true){
          this.baseItem.bgImg=res.result.path;
          this.previewCall("bgImgUpload","bgImg")
        }
    },
    titleImgUploadSuccess (res, file, fileList) {
      if(res.status==true){
        this.baseItem.titleImg=res.result.path;
        this.previewCall("titleUpload","titleImg")
      }
    },
    shareImgUploadSuccess (res, file, fileList) {
      if(res.status==true){
        let img = new Image();
        let _self=this;
        img.src=Final.IMG_PATH+res.result.path;
        img.onload=function(){
          var imgwidth=img.offsetWidth;
          var imgheight=img.offsetHeight;
          if(imgwidth!=50 || imgheight!=50){
            _self.$message.error('分享图片尺寸必须是50px*50px');
          }else{
            _self.baseItem.shareImg=res.result.path;
          }

        };

      }
    },
    setDefaultImg (type){
      if(type=='share'){
          this.baseItem.shareImg=Final.DEFAULT_IMG.prizeDraw.default_share;
      }else if(type == "title"){
        this.baseItem.titleImg=Final.DEFAULT_IMG.prizeDraw.default_title;
        this.previewCall("titleDefault","titleImg")
      }else if(type == "bg"){
        this.baseItem.bgImg=Final.DEFAULT_IMG.prizeDraw.default_bg;
        this.previewCall("bgDefault","bgImg")
      }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    min-width: 100px;
    min-height: 100px;
    max-width:100%;
    max-height:200px;
    display: block;
  }
  .prizeDrawUpload {
      margin-top:5px;
  }
  .prizeDrawUpload .rightTip{
    font-size: 10px;display: flex;
    flex-direction: column;
    font-size: 12px;
    justify-content: flex-end;
    padding-bottom: 5px;
    margin-left:5px;
    line-height: 20px;
  }
  .prizeDrawUpload .el-form-item__content{
    display: flex;
  }
</style>
