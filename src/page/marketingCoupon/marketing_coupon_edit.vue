<template>
  <div class="con_list">
    <div class="filter_div mb20">
      <el-form :model="activityInfo" :rules="rules" size="small" ref="activityInfo" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row>
              <el-form-item label="活动名称：" prop="name">
                <el-input v-model="activityInfo.name"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="活动时间：" required>
                <el-col :span="11">
                  <el-form-item prop="beginTime">
                    <el-date-picker style="width: 100%;" v-model="activityInfo.beginTime" :picker-options="optionsActivityStart" type="datetime" placeholder="选择开始时间"></el-date-picker>

                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="endTime">
                    <el-date-picker style="width: 100%;" v-model="activityInfo.endTime" :picker-options="optionsActivityEnd" type="datetime" placeholder="请输入结束时间"></el-date-picker>
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
              <!--<el-upload class="avatar-uploader" style="mIMG_PATHin-width:100px;max-width:60%" :on-success="shareImgUploadSuccess" :before-upload="shareImgUploadSuccess" :data="uploadParam" :action="Final.UPLOAD_PATH" :show-file-list="false">-->
                <!--<img v-if="baseItem.shareImg" :src="baseItem.shareImg.includes('http://') ? baseItem.shareImg : Final.IMG_PATH+baseItem.shareImg" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <!--</el-upload>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-form-item label="活动地区">
              <v-treeview @call="syncArea" :code="activityInfo.areaIds" :name="activityInfo.areaNames"></v-treeview>
            </el-form-item>
        </el-row>

        <!--<el-row>-->
          <!--<el-form-item label="抵扣券">-->

          <!--</el-form-item>-->
        <!--</el-row>-->
        <el-row>
          <div class="newhd">
            <el-form-item label="抵扣券" prop="coupons">
             <div class="saleticket-list" v-for="item in activityInfo.coupons">
              <div class="saleticket-list_header">
                <p>{{item.name}}</p>
                <span>有效日期：{{item.validity}}</span>
                <div class="headericon">
                  <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                  <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
                </div>
              </div>
              <div class="saleticket-content">
                <ul>
                  <li>
                    <div class="sal-con-tit">
                      抵扣券类型：
                    </div>
                    <div class="sal-con_txt">
                      <span>{{serialTypeMapping[item.serialType]}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      抵扣金额(元)：
                    </div>
                    <div class="sal-con_txt">
                      <span>{{item.amount}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      绑定车系：
                    </div>
                    <div class="sal-con_txt">
                      <span>{{item.serialName}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      抵扣券数量：
                    </div>
                    <div class="sal-con_txt">
                      {{item.tmpCount}}
                    </div>
                  </li>
                  <li>
                    <div class="sal-con-tit">
                      创建日期：
                    </div>
                    <div class="sal-con_txt">
                      <span>{{item.createTime}}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="saleticket-footer">
                <div class="headericon">
                  <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                  <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
                </div>
                <table>
                  <tr>
                    <td><a href="javascript:;">删除</a></td>
                  </tr>
                </table>
              </div>
            </div>

            <div class="saleticket-list newlist cur" @click="openAddList()">
              <div class="saleticket-list_header">
                <div class="headericon">
                  <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                  <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
                </div>
              </div>
              <div class="saleticket-content" style="height: 165px;">
                <p ><img src="../../assets/images/jia.png" alt="" >添加抵扣券</p>
              </div>
              <div class="saleticket-footer">
                <div class="headericon">
                  <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                  <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
                </div>
                <table>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </table>
              </div>
            </div>
            </el-form-item>
          </div>

        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('activityInfo')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </div>
    <V-AddcouponTlist @call="addCouponTCallBack" :activityInfo="activityInfo" ref="ticketDialog"></V-AddcouponTlist>
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
  import VAddcouponTlist from "./../../components/coupon/add_coupon_t_list.vue";
  import VTreeview from "./../../components/treeview.vue";
  import TestData from "./../../util/TestData"
  export default {
    data() {
      return {
        uploadParam:{module:"coupon"},
        serialTypeMapping:{1:"抵扣车款",2:"其他权益",3:"抵扣车款、其他权益"},
        testData:'',
        Final:Final,
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
          id:'',
          name:'',
          beginTime:'',
          endTime:'',
          coupons:[],
          shareImg:"",
          areaIds:"",
          areaNames:""
        },
        coupons:[],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {  max: 10, message: '活动名称需要小于10个字符', trigger: 'blur' }
          ],
          beginTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          shareImg:[
            { required: true, message: '请上传图片', trigger: 'change' }
          ],
          activityCity: [
            { type: 'array', required: true, message: '请至少选择一个地区', trigger: 'change' }
          ],
          coupons: [
            { type: 'array', required: true, message: '请至少选择一个抵扣券', trigger: 'change' }
          ],

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
      VAddcouponTlist,
      VTreeview
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
        this.activityId = this.$route.params.couponId;
        if(this.activityId!="new"){
          this.requestData()
        }
      },
      syncArea(data){
        this.activityInfo.areaIds=data.allCode;
        this.activityInfo.areaNames=data.allName;
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
          this.$message.error('上传头像图片只能是 JPG/PNG/BMP格式!');
        }
        if (!isMaxSize) {
          this.$message.error('上传头像图片大小不能超过 200KB!');
        }
        return isAllowType && isMaxSize;
      },
      shareImgBeforeUpload (file){
        return this.beforeUpload(file);
      },
      /**
       * 请求秒杀活动详情
       */
      requestData () {
        if(this.activityId){
          let param = {activityId:this.activityId};
//          this.activityInfo=TestData.sedKill_coupons_data.result;
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
      getTicketItemByTicketId (id) {

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
      createTmpTicketItem(item){
        let tmpTickItem = {};
        if(item){
          tmpTickItem.ticketCount=item.ticketCount || 1;
          tmpTickItem.maxPayCount=item.maxPayCount || '';
          tmpTickItem.sedkillMoney=item.sedkillMoney || 1;
          tmpTickItem.signUpStartTime=item.signUpStartTime ? new Date(item.signUpStartTime) : '';
          tmpTickItem.signUpEndTime=item.signUpEndTime ? new Date(item.signUpEndTime) : '';
          tmpTickItem.sedKillStartDate=item.sedKillStartDate ? new Date(item.sedKillStartDate) : '';
        }
        return tmpTickItem;
      },
      syncTicketItemByTmp (item){
        console.log("syncItem",item)
        if(item && item.tmp){
          if(item.tmp.ticketCount){
            item.ticketCount=item.tmp.ticketCount;
          }
          if(item.tmp.maxPayCount){
            item.maxPayCount=item.tmp.maxPayCount;
          }
          if(item.tmp.sedkillMoney){
            item.sedkillMoney=item.tmp.sedkillMoney;
          }
          if(item.tmp.signUpStartTime){
            item.signUpStartTime=util.toFullDateString(new Date(item.tmp.signUpStartTime).getTime())
          }
          if(item.tmp.signUpEndTime){
            item.signUpEndTime=util.toFullDateString(new Date(item.tmp.signUpEndTime).getTime())
          }
          if(item.tmp.sedKillStartDate){
            item.sedKillStartDate=util.toFullDateString(new Date(item.tmp.sedKillStartDate).getTime())
          }
        }
        return item;
      },
      /**
       * 编辑/取消编辑 秒杀券基本信息按钮事件触发
       * @param id
       * @param status
       */
      editTicketItem (id,status) {
        if(id){
          for(let i= 0 ; i <this.activityInfo.coupons.length; i ++ ){
            if(id == this.activityInfo.coupons[i].id){
              let item = this.activityInfo.coupons[i];
              item.tmp=this.createTmpTicketItem(item);
              console.log("editItem----------->",item);
//              if(item.signUpStartTime && typeof item.signUpStartTime !='object') {
//                  item.signUpStartTimeObj=new Date(item.siginUpStartTime);
//              }
//              if(item.signUpEndTime && typeof item.signUpEndTime !='object') {
//                item.signUpEndTimeObj=new Date(item.signUpEndTime);
//              }
//              if(item.sedKillStartDate && typeof item.sedKillStartDate !='object') {
//                item.sedKillStartDateObj=new Date(item.sedKillStartDate);
//              }
              item.editStatus=status;
              this.activityInfo.coupons.splice(i, 1, item); //使用splice
              break;
            }
          }
        }
      },
      /**
       *  保存 秒杀券基本信息按钮事件触发
       * @param id
       */
      saveTickItem(id){
        if(id){
          for(let i= 0 ; i <this.activityInfo.coupons.length; i ++ ){
            if(id == this.activityInfo.coupons[i].id){
              let item = this.activityInfo.coupons[i];
              this.syncTicketItemByTmp(item);
//              delete item.tmp;
//              if(item.tmp.signUpStartTime) {
//                item.signUpStartTime=util.toFullDateString(new Date(item.tmp.signUpStartTimeObj).getTime())
//              }
//              if(item.signUpEndTimeObj) {
//                item.signUpEndTime=util.toFullDateString(new Date(item.signUpEndTimeObj).getTime())
//              }
//              if(item.sedKillStartDateObj) {
//                item.sedKillStartDate=util.toFullDateString(new Date(item.sedKillStartDateObj).getTime())
//              }
              item.editStatus=0;
              this.activityInfo.coupons.splice(i, 1, item); //使用splice
              break;
            }
          }
        }
      },
      /**
       * 删除已选择秒杀券
       * @param id
       */
      removeTicketItem (id){
        if(id){
          for(let i= 0 ; i <this.activityInfo.coupons.length; i ++ ){
            if(id == this.activityInfo.coupons[i].id){
              this.activityInfo.coupons.splice(i, 1); //使用splice 触发数据更新
              break;
            }
          }
        }
      },
      /**
       * 获取已选择秒杀券ID
       */
      getExceptTicketId(){
        console.log("getExceptTicketId")
        let ticketIdArray = [];
        for(let i= 0 ; i <this.activityInfo.coupons.length; i ++ ){
          ticketIdArray.push(this.activityInfo.coupons[i].id);
        }
        return ticketIdArray;
      },
      /**
       * 打开新增秒杀券模态框
       * @param id
       */
      openAddList() {
          console.log("open")
        this.$refs.ticketDialog.showDialog(this.getExceptTicketId());
      },
      /**
       * 选择抵扣券回调
       * @param checkedNewTicketList
       */
      addCouponTCallBack(checkedNewTicketList){
        console.log("回来了---------->",checkedNewTicketList)
        for(let i = 0;i<checkedNewTicketList.length;i++){
          let item =checkedNewTicketList[i];
          let newTicketItem=Object.assign({},item)
//          newTicketItem.id = item.id;
//          newTicketItem.name = item.name;
//          newTicketItem.beginTime = item.startTime;
//          newTicketItem.endTime = item.endTime;
//          newTicketItem.createDate = item.creatTime;
//          newTicketItem.editStatus=1;
//          newTicketItem.tmp=this.createTmpTicketItem(newTicketItem);;
          this.activityInfo.coupons.push(newTicketItem);

        }
      },
      handleAvatarSuccess(res, file) {
        this.shareImg = URL.createObjectURL(file.raw);
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
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
<style>
  /*.filter_div .el-form-item .el-form-item ,.filter_div .el-form-item--small .el-form-item{*/
  /*line-height:0px;*/
  /*}*/
  .edit-txt .el-date-editor{
    width:170px;
  }
  .edit-txt .el-input__prefix {
    left:auto;
    right:30px;
  }
  .edit-txt .el-input__prefix i {
    color:#9384e3;
  }

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
