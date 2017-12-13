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
        <el-form :model="activityInfo" :rules="rules" size="small" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-row>
                <el-form-item label="活动名称：" prop="activityName">
                  <el-input v-model="activityInfo.activityName"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="活动时间：" required>
                  <el-col :span="11">
                    <el-form-item prop="activityStartDate">
                      <el-date-picker value-format="yyyy-MM-dd" :editable="false" style="width: 100%;" v-model="activityInfo.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>

                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="activityEndDate">
                      <el-date-picker value-format="yyyy-MM-dd" :editable="false"  style="width: 100%;" v-model="activityInfo.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-row>

            </el-col>

            <el-col :span="8">
              <el-form-item label="分享图片：" prop="shareImg">
                <el-upload class="avatar-uploader" :on-success="shareImgUploadSuccess" :before-upload="beforeUpload" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">
                  <img v-if="activityInfo.shareImg" :src="activityInfo.shareImg.includes('http://') ? activityInfo.shareImg : Final.IMG_PATH+activityInfo.shareImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-row>-->
            <!--<el-form-item label="秒杀1券绑定">-->

            <!--</el-form-item>-->
          <!--</el-row>-->

        </el-form>
        <el-row>
          <div class="newhd">
            <div v-for="(checkedTicketItem,index) in activityInfo.checked_ticket">
                <v-sedkill-select-ticket-item :key="checkedTicketItem.ticketId" @call="syncTickItem" :activityStratTime="activityInfo.activityStartDate" :ticketItem="checkedTicketItem" :index="index"></v-sedkill-select-ticket-item>
            </div>
            <div class="newhds-list new-list cur" @click="openAddList">
              <div class="newhd-header">
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
      </div>
      <el-row>
        <el-col :span="24" style="text-align: center">
          <el-button type="primary" @click="submitActivityInfo('ruleForm')">创建</el-button>
          <el-button @click="cancelSubmit('ruleForm')">取消</el-button>
        </el-col>
      </el-row>
      <v-add-sedkill-list @call="addSedKillCallBack" ref="ticketDialog"></v-add-sedkill-list>
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
  import VAddSedkillList from "./../../components/add_sedkill_list.vue";
  import VSedkillSelectTicketItem from "./../../components/sedKill/select_ticket_item.vue"
  import TestData from "./../../util/TestData"
  export default {
    data() {
      return {
        isEdit:true,
        testData:'',
        uploadParam:{module:"sedKill"},
        Final:Final,
        optionsActivityStart :{
          disabledDate:(time) => {
            if(this.activityInfo.activityEndDate){
              let d = new Date (this.activityInfo.activityEndDate)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.activityInfo.activityStartDate){
              let d = new Date (this.activityInfo.activityStartDate)
              return time.getTime() <d.getTime();
            }
          }
        },
        labelPosition:'left',
        activityInfo: {
          activityName: '',
          activityStartDate:'',//活动1开始时间
          activityEndDate:'', //活动结束时间
          shareImg: ''
        },
        rules: {
          activityName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {max: 20, message: '活动名称必须小于20个字', trigger: 'blur' }
          ],
          activityStartDate: [
            { type: 'string', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          activityEndDate: [
            { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
          ],
          shareImg:[
            { required: true, message: '请上传图片', trigger: 'blur' }
          ]
        },
        activityId:'', //秒杀活动ID
//        activityInfo:{},
      }
    },
    components :{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VAddSedkillList,
      VSedkillSelectTicketItem
    },
    created (){

    },
    mounted (){
      this.initPage();
    },
    watch : {
      "$route": function (to, from) {
        this.resetForm();
      }
    },
    methods : {
      initPage () {
          this.activityId = this.$route.params.sedKillId;
          if(this.activityId=="new"){
              this.isEdit=false;
//              this.requestData()
          }else if(this.activityId){
            this.isEdit=true;
            this.requestData()
          }

      },
      validPostCheckedTicketParam (){
        let valid=true;
        if(!this.activityInfo.checked_ticket|| this.activityInfo.checked_ticket.length<=0){
          valid =false;
        }
        for(let i =0; i<this.activityInfo.checked_ticket.length;i++){
            let item = this.activityInfo.checked_ticket[i];
            if(item.editStatus>0){
                valid = false;
            }
        }
        return valid
      },
      submitActivityInfo(ruleForm) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {

          } else {
            console.log('error submit!!');
            return false;
          }
        });
          console.log("111111111111111----------------->");
          if(!this.validPostCheckedTicketParam()){
            this.$refs.tipMsgRef.showTipMsg({
              msg:"请添加或者完善抵扣券信息",
              type:"error"
            });
          }else  {
            this.$refs.tipMsgRef.showTipMsg({
              msg:"保存成功",
              type:"success"
            });
          }
        console.log("提交参数------->",JSON.stringify(this.activityInfo))
        return;
        Api.sk_activity_list(param)
          .then(res => {
            if (res.status == 1) {
              this.activityInfo = res.result;
              this.totalRow = res.totalRow;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
          return;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancelSubmit (){
        this.$refs.tipMsgRef.showTipMsg({
          msg:"取消操作",
          type:"error"
        });
      },
      /**
       * 请求秒杀活动详情
       */
      requestData () {
        if(this.activityId){
          let param = {activityId:this.activityId};
          Object.assign(this.activityInfo,TestData.sedKill_checked_ticket_data.result);
          console.log(this.activityInfo);
          return;
          Api.sk_activity_list(param)
            .then(res => {
              if (res.status == 1) {
                this.activityInfo = res.result;
                this.totalRow = res.totalRow;
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
      getTicketItemByTicketId (ticketId) {

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
//      createTmpTicketItem(item){
//        let tmpTickItem = {};
//        if(item){
//          tmpTickItem.ticketCount=item.ticketCount || 1;
//          tmpTickItem.maxPayCount=item.maxPayCount || '';
//          tmpTickItem.sedkillMoney=item.sedkillMoney || 1;
//          tmpTickItem.signUpStartTime=item.signUpStartTime ? new Date(item.signUpStartTime) : '';
//          tmpTickItem.signUpEndTime=item.signUpEndTime ? new Date(item.signUpEndTime) : '';
//          tmpTickItem.sedKillStartDate=item.sedKillStartDate ? new Date(item.sedKillStartDate) : '';
//        }
//        return tmpTickItem;
//      },
      /**
       *  同步秒杀券信息1111111111s
       * @param object
       */
      syncTickItem(param){
          console.log(param.op);
        if(param.op=="edit"){
          let ticketItem = param.callData
          this.editTicketItem(ticketItem);
        }else if (param.op=="delete"){
          this.removeTicketItem(param.callData);
        }
      },
      editTicketItem(ticketItem){
        if(ticketItem && ticketItem.ticketId){
          for(let i= 0 ; i <this.activityInfo.checked_ticket.length; i ++ ){
            if(ticketItem.ticketId == this.activityInfo.checked_ticket[i].ticketId){
//              let item = this.activityInfo.checked_ticket[i];
              this.activityInfo.checked_ticket.splice(i, 1, ticketItem); //使用splice 触发数据更新
              this.activityInfo = Object.assign({},this.activityInfo);
              break;
            }
          }
        }
      },
      /**
       * 删除已选择秒杀券
       * @param ticketId
       */
      removeTicketItem (ticketId){
          console.log("delete----------method---------------",ticketId);
        if(ticketId){
          for(let i= 0 ; i <this.activityInfo.checked_ticket.length; i ++ ){
            if(ticketId == this.activityInfo.checked_ticket[i].ticketId){
              console.log("eq---------------",ticketId);
              this.activityInfo.checked_ticket.splice(i, 1); //使用splice 触发数据更新
              this.activityInfo = Object.assign({},this.activityInfo);
              console.log("MLGB--->",JSON.stringify(this.activityInfo))
              break;
            }
          }
        }
      },
      /**
       * 获取已选择秒杀券ID
       */
      getExceptTicketId(){
        let ticketIdArray = [];
        for(let i= 0 ; i <this.activityInfo.checked_ticket.length; i ++ ){
          ticketIdArray.push(this.activityInfo.checked_ticket[i].ticketId);
        }
        return ticketIdArray;
      },
      /**
       * 打开新增秒杀券模态框
       * @param ticketId
       */
      openAddList() {
        if(this.activityInfo.activityStartDate && this.activityInfo.activityEndDate){
          this.$refs.ticketDialog.showDialog(this.getExceptTicketId());
        }else{
          this.$refs.tipMsgRef.showTipMsg({
            msg:"请先填写活动时间",
            type:"error"
          });
        }
      },
      addSedKillCallBack(checkedNewTicketList){
          console.log("回来了---------->",checkedNewTicketList)
          for(let i = 0;i<checkedNewTicketList.length;i++){
            let item =checkedNewTicketList[i];
            let newTicketItem ={};
            newTicketItem.ticketId = item.ticketId;
            newTicketItem.ticketName = item.name;
            newTicketItem.activityStartDate = item.startTime;
            newTicketItem.activityEndDate = item.endTime;
            newTicketItem.createDate = item.creatTime;
            newTicketItem.editStatus=1;
//            newTicketItem.tmp=this.createTmpTicketItem(newTicketItem);;
            this.activityInfo.checked_ticket.push(newTicketItem);
            this.activityInfo = Object.assign({},this.activityInfo);

          }
      },
      shareImgUploadSuccess (res, file, fileList) {
        if(res.status==true){
          let img = new Image();
          let _self=this;
          img.src=Final.IMG_PATH+res.result.path;
          img.onload=function(){
          _self.activityInfo.shareImg=res.result.path;
            console.log(_self.activityInfo.shareImg)
//            var imgwidth=img.offsetWidth;
//            var imgheight=img.offsetHeight;
//            if(imgwidth!=50 || imgheight!=50){
//              _self.$message.error('分享图片尺寸必须是50px*50px');
//            }else{
//              _self.baseItem.shareImg=res.result.path;
//              console.log(_self.baseItem.shareImg);
//            }
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
