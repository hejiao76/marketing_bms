<template>
    <div class="con_list">
      <div class="filter_div mb20">
        <!--<div class="column is-12">-->
          <!--<label class="label" for="email">Email</label>-->
          <!--<p class="control">-->
            <!--<input name="email" type="text" placeholder="Email" v-validate data-rules="required|email" :class="{'input': true,'is-danger': errors.has('email')}">-->
            <!--<span class="help is-danger" v-show="errors.has('email')" >{{ errors.first('email') }}</span>-->
          <!--</p>-->
        <!--</div>-->
        <el-form :model="activityInfo" :rules="rules" size="small" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-row>
                <el-form-item label="活动名称：" prop="name">
                  <el-input v-model="activityInfo.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="活动时间：" required>
                  <el-col :span="11">
                      <el-date-picker  :editable="false" style="width: 100%;" v-model="activityInfo.beginTime" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                      <el-date-picker :editable="false"  style="width: 100%;" v-model="activityInfo.endTime" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-row>

            </el-col>

            <el-col :span="8">
              <el-form-item label="分享图片：" prop="shareImg" style="margin-bottom: 0px;">
                <el-upload class="avatar-uploader" :on-success="shareImgUploadSuccess" :before-upload="beforeUpload" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">
                  <img v-if="activityInfo.shareImg" :src="activityInfo.shareImg.includes('http://') ? activityInfo.shareImg : Final.IMG_PATH+activityInfo.shareImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item v-if="ownerType==1" label="活动地区:" required>
              <v-treeview @call="syncArea" :code="activityInfo.areaIds" :name="activityInfo.areaNames"></v-treeview>
            </el-form-item>
          </el-row>
          <!--<el-row>-->
            <!--<el-form-item label="秒杀1券绑定">-->

            <!--</el-form-item>-->
          <!--</el-row>-->

        </el-form>
        <el-row style="margin-bottom:15px;">
            <span style="content: '*';color: #fa5555;margin-right: 4px;">*</span><span>秒杀券绑定:</span>
        </el-row>
        <el-row>
          <div class="newhd">
            <div v-for="(checkedTicketItem,index) in activityInfo.itemList">
                <v-sedkill-select-ticket-item :key="checkedTicketItem.couponId" @call="syncTickItem" :activityStratTime="activityInfo.beginTime" :ticketItem="checkedTicketItem" :index="index"></v-sedkill-select-ticket-item>
            </div>
            <div class="newhds-list new-list cur" @click="openAddList">
              <div class="newhd-header" style="border-radius: 8px;">
                <div class="icon-left">
                  <img src="../../assets/images/zsks_o_l.png" alt="">
                </div>
                <div class="icon-right">
                  <img src="../../assets/images/zsks_o_r.png" alt="">
                </div>
              </div>
              <div class="newhd-content">
                <p><img src="../../assets/images/jia.png" alt="">添加秒杀券</p>
              </div>
              <div class="newhd-footer">
                <div class="newhd-btn">
                  <div class="icon-left">
                    <img src="../../assets/images/zsks_o_l.png" alt="">
                  </div>
                  <div class="icon-right">
                    <img src="../../assets/images/zsks_o_r.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: center">
            <el-button v-if="isEdit" type="primary" @click="submitActivityInfo('ruleForm')">保存</el-button>
            <el-button v-if="!isEdit" type="primary" @click="submitActivityInfo('ruleForm')">创建</el-button>
            <el-button @click="cancelSubmit('ruleForm')">取消</el-button>
          </el-col>
        </el-row>
      </div>

      <v-add-sedkill-list @call="addSedKillCallBack" ref="ticketDialog"></v-add-sedkill-list>
      <v-tip-msg ref="tipMsgRef"></v-tip-msg>
    </div>

</template>
<script>
//  import VHeader from "./../../components/header";
//  import VLeft from "./../../components/left";
//  import VConNav from "./../../components/con_nav";
  import Final from "../../../static/baseSetting/Final";
  import * as util from "./../../util/util"
  import Api from "./../../fetch/api";
  import VTipMsg from "./../../components/tipMsg.vue";
  import VAddSedkillList from "../../components/sedKill/add_sedkill_list.vue";
  import VSedkillSelectTicketItem from "./../../components/sedKill/select_ticket_item.vue"
  import TestData from "./../../util/TestData"
  import VTreeview from "./../../components/treeview.vue";
  export default {
    data() {
      return {
        Final:Final,
        isEdit:false,
        testData:'',
        uploadParam:{module:"sedKill"},
        Final:Final,
        util:util,
        optionsActivityStart :{
          disabledDate:(time) => {
            if(this.activityInfo.endTime){
              let d = new Date (this.activityInfo.endTime)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.activityInfo.beginTime){
              let d = new Date (this.activityInfo.beginTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        activityInfo: {
          name: '',
          beginTime:'',//活动1开始时间
          endTime:'', //活动结束时间
          shareImg: '',
          areaIds:'',
          areaNames:'',
          itemList:[],

        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {max: 20, message: '活动名称必须小于20个字', trigger: 'blur' }
          ],
          beginTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          shareImg:[
            { required: true, message: '请上传图片', trigger: 'blur' }
          ]
        },
        activityId:'', //秒杀活动ID
        ownerType:2, //默认系统类型 经销商系统---2  厂商系统------1
//        activityInfo:{},
      }
    },
    components :{
//      VHeader,
//      VLeft,
//      VConNav,
      VTipMsg,
      VAddSedkillList,
      VSedkillSelectTicketItem,
      VTreeview
    },
    created (){

    },
    mounted (){
      this.initPage();
      this.ownerType=localStorage.getItem("ownerType") || 2;
    },
    watch : {
      "$route": function (to, from) {
        /*-----------适配编辑跳转新增 初始化数据----开始-----*/
          this.activityInfo=Object.assign({},{
            name: '',
            beginTime:'',//活动1开始时间
            endTime:'', //活动结束时间
            shareImg: '',
            areaIds:'',
            areaNames:'',
            itemList:[],
          });
          this.activityId='';
        /*-----------适配编辑跳转新增 初始化数据----结束-----*/
        this.initPage();
      }
    },
    methods : {
      initPage () {
          this.activityId = this.$route.params.sedKillId;
          if(this.activityId=="new"){
            this.isEdit=false;
          }else if(this.activityId){
            this.isEdit=true;
            this.requestData()
          }

      },
      syncArea(data){
        this.activityInfo.areaIds=data.allCode;
        this.activityInfo.areaNames=data.allName;
      },
      validPostCheckedTicketParam (){
        let valid=true;
        if(!this.activityInfo.itemList|| this.activityInfo.itemList.length<=0){
          valid =false;
        }
        for(let i =0; i<this.activityInfo.itemList.length;i++){
            let item = this.activityInfo.itemList[i];
            if(item.editStatus>0){
                valid = false;
            }
        }
        return valid
      },
      validBeforeSubmit(){
        let msg = "";
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if(!this.validPostCheckedTicketParam()){
                msg="请添加或完善秒杀券信息"
            }
          } else {
            msg="活动基本信息填写有误";
            return false;
          }
        });
        if(msg){
          this.$message({
            type:'error',
            message:msg,
            duration:'1500'
          });
        }else{
            return true;
        }
      },
      submitActivityInfo(ruleForm) {
          if(this.validBeforeSubmit()){
            let param = Object.assign({},this.activityInfo,{
                beginTime:this.formatDateToString(this.activityInfo.beginTime),
                endTime:this.formatDateToString(this.activityInfo.endTime),
            });
            if(this.isEdit){
              Api.sk_activity_update(param)
                .then(res => {
                  if (res.status == true) {
                    this.$refs.tipMsgRef.showTipMsg({
                      msg:"操作成功",
                      type:"success",
                      scope:this,
                      callback:function(){
                          this.$router.push("/sedKill/list");
                      },
                    });
                  }else {
                    this.$refs.tipMsgRef.showTipMsg({
                      msg:res.message,
                      type:"error"
                    });
                  }
                }).catch(err => {

              });
            }else {

              Api.sk_activity_add(param)
                .then(res => {
                  if (res.status == true) {
                    this.$refs.tipMsgRef.showTipMsg({
                      msg:"操作成功",
                      type:"success",
                      scope:this,
                      callback:function(){
                        this.$router.push("/sedKill/list");
                      },
                    });
                  }else {
                    this.$refs.tipMsgRef.showTipMsg({
                      msg:res.message,
                      type:"error"
                    });
                  }
                }).catch(err => {

              });
            }

          }
        return;
      },
      cancelSubmit (){
          this.$router.push("/sedkill/list")
      },
      /**
       * 请求秒杀活动详情
       */
      requestData () {
        if(this.activityId){
          let param = {id:this.activityId};
          Api.sk_activity_detail(param)
            .then(res => {
              if (res.status == true) {
                this.activityInfo = Object.assign({},{
                  id:res.result.id,
                  name:res.result.name,
                  beginTime:new Date(res.result.beginTime),
                  endTime:new Date(res.result.endTime),
                  itemList: this.formartInitCoupons(res.result.itemList) || [],
                  shareImg:res.result.shareImg,
                  areaIds:res.result.areaIds,
                  areaNames:res.result.areaNames
                })

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
      formartInitCoupons (coupons){
        let newCoupons=[]
        if(coupons){
          for(let i = 0;i<coupons.length;i++){
            newCoupons.push(Object.assign({},coupons[i],{
              seckillTime:util.dateObjToFullString(new Date(coupons[i].beginTime)),  //秒杀时间
              beginTime:util.dateObjToString(new Date(coupons[i].couponBeginTime)), //有效期开始时间
              endTime:util.dateObjToString(new Date(coupons[i].couponEndTime)), //有效期结束时间
              enrollStartTime:util.dateObjToFullString(new Date(coupons[i].enrollStartTime)),//报名开始时间
              enrollEndTime:util.dateObjToFullString(new Date(coupons[i].enrollEndTime)), //报名结束数据
              createTime:util.dateObjToString(new Date(coupons[i].couponCreateTime))
            }))
          }
        }
        return newCoupons
      },
      getTicketItemByTicketId (couponId) {

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
       *  同步秒杀券信息
       * @param object
       */
      syncTickItem(param){
        if(param.op=="edit"){
          let ticketItem = param.callData
          this.editTicketItem(ticketItem);
        }else if (param.op=="delete"){
          this.removeTicketItem(param.callData);
        }
      },
      editTicketItem(ticketItem){
        if(ticketItem && ticketItem.couponId){
          for(let i= 0 ; i <this.activityInfo.itemList.length; i ++ ){
            if(ticketItem.couponId == this.activityInfo.itemList[i].couponId){
              this.activityInfo.itemList.splice(i, 1, ticketItem); //使用splice 触发数据更新
              this.activityInfo = Object.assign({},this.activityInfo);
              break;
            }
          }
        }
      },
      /**
       * 删除已选择秒杀券
       * @param couponId
       */
      removeTicketItem (couponId){
        if(couponId){
          for(let i= 0 ; i <this.activityInfo.itemList.length; i ++ ){
            if(couponId == this.activityInfo.itemList[i].couponId){
              this.activityInfo.itemList.splice(i, 1); //使用splice 触发数据更新
              this.activityInfo = Object.assign({},this.activityInfo);
              break;
            }
          }
        }
      },
      /**
       * 获取已选择秒杀券ID
       */
      getExceptTicketId(){
        let couponIdArray = [];
        for(let i= 0 ; i <this.activityInfo.itemList.length; i ++ ){
          couponIdArray.push(this.activityInfo.itemList[i].couponId);
        }
        return couponIdArray;
      },
      /**
       * 打开新增秒杀券模态框
       * @param couponId
       */
      openAddList() {
        if(this.activityInfo.beginTime && this.activityInfo.endTime){
          this.$refs.ticketDialog.showDialog(this.getExceptTicketId(),this.formatDateToString(this.activityInfo.beginTime),this.formatDateToString(this.activityInfo.endTime),);
        }else{
          this.$refs.tipMsgRef.showTipMsg({
            msg:"请先填写活动时间",
            type:"error"
          });
        }
      },
      addSedKillCallBack(checkedNewTicketList){
          for(let i = 0;i<checkedNewTicketList.length;i++){
            let item =checkedNewTicketList[i];
            let newTicketItem ={};
            newTicketItem.couponId = item.id;
            newTicketItem.name = item.name;
            newTicketItem.beginTime = item.beginTime;
            newTicketItem.endTime = item.endTime;
            newTicketItem.createTime = item.createTime;
            newTicketItem.editStatus=1;
            this.activityInfo.itemList.push(newTicketItem);
            this.activityInfo = Object.assign({},this.activityInfo);

          }
      },
      shareImgUploadSuccess (res, file, fileList) {
        if(res.status==true){
          let img = new Image();
          let _self=this;
          img.src=Final.IMG_PATH+res.result.path;
          this.activityInfo.shareImg=res.result.path;
          img.onload=function(){
            _self.activityInfo.shareImg=res.result.path;
          };

        }
      },
      beforeUpload (file){
        console.log(file);
        const isAllowType = ['image/jpeg', 'image/png','image/bmp'].includes(file.type);
        const isMaxSize = file.size / 1024 < 200; //小于200Kb

        if (!isAllowType) {
          this.$message.error('上传分享图片只能是 JPG/PNG/BMP格式!');
        }
        if (!isMaxSize) {
          this.$message.error('上传分享图片大小不能超过 200KB!');
        }
        return isAllowType && isMaxSize;
      },
    },
  }
</script>
<style>
  /*.filter_div .el-form-item .el-form-item ,.filter_div .el-form-item--small .el-form-item{*/
    /*line-height:0px;*/
  /*}*/


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
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }

  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
