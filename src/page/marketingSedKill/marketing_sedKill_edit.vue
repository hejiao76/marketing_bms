<template>

    <div class="con_list">
      <v-treeview></v-treeview>
      <el-popover v-model="popover1" ref="check_fail_reason_popover_1" placement="left" width="400" trigger="click">
        <div class="popover-header">
          <span>请填写理由</span>
        </div>
        <div class="popover-content">
        <!--<div style="border:1px solid #d1dbe5;padding:10px;margin:5px;"></div>-->
          <el-checkbox-group v-model="reasonList1" >
            <ul class="dialogUl">
              <li><el-checkbox label="图片不清晰"></el-checkbox></li>
              <li><el-checkbox label="证件号码错误"></el-checkbox></li>
              <li><el-checkbox label="有效期错误"></el-checkbox></li>
              <li><el-checkbox label="证件过期"></el-checkbox></li>
              <li><el-checkbox label="名称不一致"></el-checkbox></li>
            </ul>
          </el-checkbox-group>
          <p class="reason-show-p" style="margin:0;">
              <span class="fl mr5" style="line-height:30px;font-size:14px;">其他原因</span><el-input class="fl" style="width:50%;" name="otherReason1" v-model="otherReason1" size="small" label="" placeholder="请输入原因"></el-input>
          </p>
          <p v-show="errorTipShow1" class="reason-show-p" style="margin:0;color:red">请填写不通过理由</p>
        </div>
        <div class="popover-footer">
          <el-button size="small" @click="saveReason(1)">提交</el-button>
        </div>
      </el-popover>

      <el-popover v-model="popover2" ref="check_fail_reason_popover_2" placement="left" width="400" trigger="click">
        <div class="popover-header">
          <span>请填写理由</span>
        </div>
        <div class="popover-content">
          <!--<div style="border:1px solid #d1dbe5;padding:10px;margin:5px;"></div>-->
          <el-checkbox-group v-model="reasonList2" >
            <ul class="dialogUl">
              <li><el-checkbox label="图片不清晰"></el-checkbox></li>
              <li><el-checkbox label="证件号码错误"></el-checkbox></li>
              <li><el-checkbox label="有效期错误"></el-checkbox></li>
              <li><el-checkbox label="证件过期"></el-checkbox></li>
              <li><el-checkbox label="名称不一致"></el-checkbox></li>
            </ul>
          </el-checkbox-group>
          <p class="reason-show-p" style="margin:0;">
            <span class="fl mr5" style="line-height:30px;font-size:14px;">其他原因</span><el-input class="fl" style="width:50%;" name="otherReason1" v-model="otherReason2" size="small" label="" placeholder="请输入原因"></el-input>
          </p>
          <p v-show="errorTipShow2" class="reason-show-p" style="margin:0;color:red">请填写不通过理由</p>
        </div>
        <div class="popover-footer">
          <el-button size="small" @click="saveReason(2)">提交</el-button>
        </div>
      </el-popover>


      <el-row class="s-f-back" style="line-height:36px;">
        <el-col :span="24" style="text-align:right;">
          <el-button v-if="showCheckLog==1" @click="requestCheckLog" type="info">查看审批轨迹</el-button>
          <el-button v-else @click="changeShowCheckLog" type="info">收起审批轨迹</el-button>
        </el-col>
      </el-row>
      <el-row v-bind:class="['s-f-back','mt10',showCheckLog == 1 ? 'show-check-log': 'hide-check-log']" style="line-height:36px;">
        <el-col :span="24" >
          <el-table class="selfTable" :data="checkLogs"  ref="singleTable" border highlight-current-row max-height="250">
            <el-table-column align="center" type="index" label="" width="60"></el-table-column>
            <el-table-column prop="createTime" label="审核时间" align="center" width="180" style="display:none;"></el-table-column>
            <el-table-column prop="auditUserName" label="审核人" align="center" width="180"></el-table-column>
            <el-table-column prop="auditStatus" align="center" label="审核结果" width="180"></el-table-column>
            <el-table-column prop="remark" align="center" label="备注"></el-table-column>
            <el-table-column  label="操作" align="center">
              <template scope="scope">
                <el-button @click="requestCheckLogDetail(scope.row.auditId)" size="small">查看记录</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="mt10" style="line-height:36px;">
        <el-col v-if="type1<=0" :span="24" style="text-align:right;">
          <div v-if="checkType==3">
            <el-popover v-model="popover3" ref="check_reason_popover" placement="left" width="400" trigger="click">
              <div class="popover-header">
                <span>查看理由</span>
              </div>
              <div class="popover-content">
                <p class="reason-show-p ml30" style="">{{checkReason.remark1}}</p>
                <p class="reason-show-p ml30">{{checkReason.remark2}}</p>
              </div>
            </el-popover>
            <el-button  @click="showReason()" v-popover:check_reason_popover type="info">查看理由</el-button>
          </div>
          <!--<el-button v-if="checkType==3" @click="showReason()" v-popover:check_reason_popover type="info" >查看理由</el-button>-->
          <el-button v-if="checkType!=3 && checkType!=2" @click="checkPass(1)" type="success">审核通过</el-button>
          <el-button v-if="checkType!=3 && checkType!=2" @click="refreshPopoverPosition(1)" v-popover:check_fail_reason_popover_1 type="danger" >审核不通过</el-button>
        </el-col>
        <el-col v-if="type1>0" :span="24" style="text-align:right;">
          <i v-if="type1==1" style="font-size:34px;color:#13ce66;" class="el-icon-check"></i>
          <i v-if="type1==2" style="font-size:34px;color:#ff4949;" class="el-icon-close"></i>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <div class="font16 mb15 mt10 bold">营业执照图片：</div>
            <div>
              <el-col :span="8">
                <img class="business_Images fl cur" v-on:click="showBigImg(Final.IMGURL+companyInfo.businessLicenceImg)" v-bind:src="Final.IMGURL+companyInfo.businessLicenceImg"/>
              </el-col>
              <el-col :span="12">
                <ul class=" font14 ml10 fl">
                  <li><span>公司名称：</span><span>{{companyInfo.companyName}}</span></li>
                  <li><span>营业执照编号：</span><span>{{companyInfo.businessLicence}}</span></li>
                  <li><span>有效期：</span><span>{{companyInfo.businessLicenceTermStr}}</span></li>
                </ul>
              </el-col>
            </div>
        </el-col>
        <template v-if="companyInfo.companyContent==3 || companyInfo.companyContent==4 || companyInfo.companyContent==5">
          <el-col :span="12">
            <div class="font16 mb15 mt10 bold">道路运输许可证：</div>
            <div>
              <el-col :span="8">
              <img class="business_Images fl cur" v-on:click="showBigImg(Final.IMGURL+companyInfo.roadPermitImg)" v-bind:src="Final.IMGURL+companyInfo.roadPermitImg"/>
              </el-col>
                <el-col :span="12">
              <ul class="font14 ml10 fl ">
                <li><span>许可证编号：</span><span>{{companyInfo.roadPermit|| "用户未提交"}}</span></li>
                <li><span>有效期：</span><span>{{companyInfo.roadPermitTermStr || "用户未提交"}}</span></li>
              </ul>
                </el-col>
            </div>
          </el-col>
        </template>
      </el-row>
      <div class="mt10" style="clear:both;color:red">营业执照：请确认营业执照号码，公司名称，有效期需与营业执照一致，否则不通过</div>
      <div v-if="companyInfo.companyContent==3 || companyInfo.companyContent==4 || companyInfo.companyContent==5" style="color:red;">道路运输许可证：请确认营业执照公司名称与道路运输许可证公司名称一致，且许可证编号，有效期与道路运输许可证图片一致</div>
      <div class="mt15" style="width:100%; border-bottom: 1px dashed #dcdcdc;"></div>
      <!--<div>身份证正反面：</div>-->
      <el-row class="mt15">
        <!--<el-col :span="24" style="text-align:right;">-->
          <!--<el-button v-if="checkType!=3 && checkType!=2" @click="checkPass(2)" type="success">审核通过</el-button>-->
          <!--<el-button v-if="checkType!=3 && checkType!=2"  @click="refreshPopoverPosition(2)" v-popover:check_fail_reason_popover_2 type="danger">审核不通过</el-button>-->
        <!--</el-col>-->
        <el-col v-if="type2<=0" :span="24" style="text-align:right;">
          <!--<el-button v-if="checkType==3" type="info" @click="showReason">查看理由</el-button>-->
          <el-button v-if="checkType!=3 && checkType!=2" @click="checkPass(2)" type="success">审核通过</el-button>
          <el-button v-if="checkType!=3 && checkType!=2" @click="refreshPopoverPosition(2)" v-popover:check_fail_reason_popover_2 type="danger" >审核不通过</el-button>
        </el-col>
        <el-col v-if="type2>0" :span="24" style="text-align:right;">
          <i v-if="type2==1" style="font-size:34px;color:#13ce66;" class="el-icon-check"></i>
          <i v-if="type2==2" style="font-size:34px;color:#ff4949;" class="el-icon-close"></i>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="font16 mb15 mt10 bold">身份证正反面：</div>
          <div>
            <el-col :span="5">
              <img class="person_Images cur" v-on:click="showBigImg(Final.IMGURL+companyInfo.idImgFront)" v-bind:src="Final.IMGURL+companyInfo.idImgFront"/>
            </el-col>
            <el-col :span="5" class="ml20">
              <img class="person_Images cur" v-on:click="showBigImg(Final.IMGURL+companyInfo.idImgBack)"  v-bind:src="Final.IMGURL+companyInfo.idImgBack"/>
            </el-col>
            <el-col :span="10">
              <ul class=" font14 ml10 fleft ">
                <li><span>法人姓名：</span><span>{{companyInfo.legalPerson}}</span></li>
                <li><span>身份证号：</span><span>{{companyInfo.legalPersonId }}</span></li>
              </ul>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <div class="mt10" style="clear:both;color:red">身份证：请确认营业执照法人姓名与填写的法人姓名一致，且法人姓名，身份证号码与身份证图片一致，否则不通过。</div>

      <el-dialog title="查看大图1" :visible.sync="dialogPicVisible">
        <div style="width:100%;height:400px; overflow:scroll;text-align:center;">
            <img id="showBigImg_img" v-on:click="remoteImg" v-bind:src="bigImgSrc" v-bind:style="{maxWidth:'600px',cursor:'pointer',transform:'rotate('+bigImgRemote+'deg)'}"/>
        </div>
      </el-dialog>

      <el-dialog title="审核记录" :visible.sync="dialogFormVisible">
        <el-row>
          <el-col :span="12">
            <div class="font16 mb15 mt10 bold">营业执照图片：</div>
            <div>
              <el-col :span="8">
                <img class="business_Images fl cur" v-on:click="showBigImg(Final.IMGURL+checkLogDetail.businessLicenceImg)" v-bind:src="Final.IMGURL+checkLogDetail.businessLicenceImg"/>
              </el-col>
              <el-col :span="12">
                <ul class=" font14 ml10 fl">
                  <li><span>公司名称：</span><span>{{checkLogDetail.companyName}}</span></li>
                  <li><span>营业执照编号：</span><span>{{checkLogDetail.businessLicence}}</span></li>
                  <li><span>有效期：</span><span>{{checkLogDetail.businessLicenceTermStr}}</span></li>
                </ul>
              </el-col>
            </div>
          </el-col>
          <template v-if="checkLogDetail.companyContent==3 || checkLogDetail.companyContent==4 || checkLogDetail.companyContent==5">
            <el-col :span="12">
              <div class="font16 mb15 mt10 bold">道路运输许可证：</div>
              <div>
                <el-col :span="8">
                  <img class="business_Images fl cur" v-on:click="showBigImg(Final.IMGURL+checkLogDetail.roadPermitImg)" v-bind:src="Final.IMGURL+checkLogDetail.roadPermitImg"/>
                </el-col>
                <el-col :span="12">
                  <ul class="font14 ml10 fl ">
                    <li><span>许可证编号：</span><span>{{checkLogDetail.roadPermit|| "用户未提交"}}</span></li>
                    <li><span>有效期：</span><span>{{checkLogDetail.roadPermitTermStr || "用户未提交"}}</span></li>
                  </ul>
                </el-col>
              </div>
            </el-col>
          </template>
        </el-row>
        <div class="mt10" style="clear:both;color:red">营业执照：请确认营业执照号码，公司名称，有效期需与营业执照一致，否则不通过</div>
        <div v-if="checkLogDetail.companyContent==3 || checkLogDetail.companyContent==4 || checkLogDetail.companyContent==5" style="color:red;">道路运输许可证：请确认营业执照公司名称与道路运输许可证公司名称一致，且许可证编号，有效期与道路运输许可证图片一致</div>
        <div class="mt15" style="width:100%; border-bottom: 1px dashed #dcdcdc;"></div>
        <!--<div>身份证正反面：</div>-->

        <el-row>
          <el-col :span="24">
            <div class="font16 mb15 mt10 bold">身份证正反面：</div>
            <div>
              <el-col :span="5">
                <img class="person_Images cur" v-on:click="showBigImg(Final.IMGURL+checkLogDetail.idImgFront)" v-bind:src="Final.IMGURL+checkLogDetail.idImgFront"/>
              </el-col>
              <el-col :span="5" class="ml20">
                <img class="person_Images cur" v-on:click="showBigImg(Final.IMGURL+checkLogDetail.idImgBack)"  v-bind:src="Final.IMGURL+checkLogDetail.idImgBack"/>
              </el-col>
              <el-col :span="10">
                <ul class=" font14 ml10 fleft ">
                  <li><span>法人姓名：</span><span>{{checkLogDetail.legalPerson}}</span></li>
                  <li><span>身份证号：</span><span>{{checkLogDetail.legalPersonId }}</span></li>
                </ul>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <div class="mt10" style="clear:both;color:red">身份证：请确认营业执照法人姓名与填写的法人姓名一致，且法人姓名，身份证号码与身份证图片一致，否则不通过。</div>
        <div class="dfooter">
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
  import VTreeview from "./../../components/treeview";

//  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data() {
      return {
        bigImgRemote:0,
        bigImgSrc:"",
        dialogPicVisible:false,
        fromURL:'',
        companyInfoId:'',
        companyInfo:'',
        Final:'',
        popover1:false,
        reasonList1:[], //企业审核失败原因
        otherReason1:'',//企业审核失败其他原因
        errorTipShow1:false,
        remark1:'',
        popover2:false,
        reasonList2:[], //法人审核失败原因
        otherReason2:'', //法人审核失败其他原因
        errorTipShow2:false,
        remark2:'',
        type1:'',  //企业审核状态 1:通过 2:失败
        type2:'',  //法人审核状态 1:通过 2:失败
        checkType:1,

        popover3:false,
        checkReason:{ //查看理由
          remark1:"" ,
          remark2:""
        },

        checkLogs:[], //审核记录集合,
        showCheckLog:1,
        dialogFormVisible:false,
        checkLogDetail:'',

      }
    },
    components :{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){
      this.Final=Final;
      this.companyInfoId=this.$route.params.companyInfoId;
      this.requestCompanyInfo();
      this.fromURL=this.$store.state.tmpFromPath;
    },
    watch : {
      "$route": function(to,from) {
        document.body.scrollTop=0;
//        this.fromURL=from;
        this.fromURL=this.$store.state.tmpFromPath;
        this.resetParam();
        this.Final=Final;
        this.companyInfoId=this.$route.params.companyInfoId;
        this.requestCompanyInfo();
      }
    },
    methods : {
      resetParam () {
        this.companyInfoId='';
        this.companyInfo='';
        this.Final='';
        this.popover1=false;
        this.reasonList1=[]; //企业审核失败原因
        this.otherReason1='';//企业审核失败其他原因
        this.errorTipShow1=false;
        this.remark1='';
        this.popover2=false;
        this.reasonList2=[]; //法人审核失败原因
        this.otherReason2=''; //法人审核失败其他原因
        this.errorTipShow2=false;
        this.remark2='';
        this.type1='';  //企业审核状态 1:通过 2:失败
        this.type2='';  //法人审核状态 1:通过 2:失败
      },
      changeShowCheckLog () {
        if(this.showCheckLog==1){
            this.showCheckLog=2
        }else{
          this.showCheckLog=1
        }
      },
      startScramble () {
        let param = {}
        Api.ls_get_scramble_id(util.getPostParam(param))
          .then(res => {
            if (res.status == 1) {
              let id= res.result;
              if(id){
                this.toCompanyDetailScramble(id)
              }
            }else if (resposne.status==245){
//              this.$message({
//                message: '没有更多的审核单了',
//                type: 'warning',
//                duration: 1500,
//                onClose: function () {
//
//                }.bind(this)
//              });
              this.$refs.tipMsgRef.showTipMsg({
                msg:"没有更多的审核单了",
                type:"warn",
                scope:this,
                callback: function (){
                  this.$router.push(this.fromURL || ("/lgtcheck/companycheck/"+this.checkType));
                }
              });
            }else {
//              this.$message({
//                message: '请求异常，请重试',
//                type: 'error',
//                duration: 1500,
//                onClose: function () {
//                  this.$router.push("/lgtcheck/companycheck/"+this.checkType);
//                }.bind(this)
//              });
                this.$refs.tipMsgRef.showTipMsg({
                  msg:"没有更多的审核单了",
                  type:"error",
                  scope:this,
                  callback: function (){
                    this.$router.push(this.fromURL || ("/lgtcheck/companycheck/"+this.checkType));
                  }
                });
            }
          }).catch(err => {

        });
      },
      toCompanyDetailScramble (companyInfoId){
        this.$router.replace({name: 'companyDetailScramble', params: {companyInfoId: companyInfoId}})
      },
      /**
       *请求审核日志详情
       * */
      requestCheckLogDetail  (auditId) {
        if(auditId){
          let param=util.getPostParam({auditId:auditId});
          Api.lc_show_audit_log_detail(param)
            .then(res => {
              if(res.status==1){
                this.checkLogDetail=res.result;
                this.dialogFormVisible=true;
              }else{
//                this.$message({
//                  message: res.message,
//                  type: 'error'
//                });
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error"
                });
              }
            }).catch(error => {

          })
        }
      },
      /**
       *  请求审核日志
       * */
      requestCheckLog () {
          if(this.companyInfoId){
              let param=util.getPostParam({companyInfoId:this.companyInfoId});
              Api.lc_show_audit_log(param)
                .then(res => {
                    if(res.status==1){
                        this.checkLogs=res.result;
                        this.changeShowCheckLog();
                    }
                }).catch(error => {

              })
          }
      },
      /**
       * 校验数据状态
       * */
      getCheckTypeByStatus (data) {
        if(Final.CHECK_TYPE_MAPPING[1].includes(data.status)){
            this.checkType=1;
        }else if(Final.CHECK_TYPE_MAPPING[2].includes(data.status)){
          this.checkType=2;
        }else if(Final.CHECK_TYPE_MAPPING[3].includes(data.status)){
          this.checkType=3;
        }else if(Final.CHECK_TYPE_MAPPING[4].includes(data.status)){
          this.checkType=4;
        }

      },
      remoteImg () {
        this.bigImgRemote=(this.bigImgRemote+90)%360;
      },
      showBigImg (imgUrl){
          this.bigImgSrc=imgUrl;
          this.dialogPicVisible=true;
      },
      checkPass (p) {
          if(p==1){
              this.remark1="";
              this.type1=1
          }else if(p==2){
              this.remark2="";
              this.type2=1;
          }
          this.commitCheckData();
      },
      /**
       * 提交审核数据
       **/
      commitCheckData () {
          if(this.type1 && this.type2){
              let param = {
                type1:this.type1,
                type2:this.type2,
                remark1:this.remark2,
                remark2:this.remark2,
                companyInfoId:this.companyInfoId
              }
              param=util.getPostParam(param);
              Api.lc_company_check_info_commit(param)
              .then(res => {
                if(res.status==1){
//                  this.$message({
//                    message: '审核成功',
//                    type: 'success',
//                    duration:1500,
//                    onClose: function (){
//                      //此处回调
//                      if(this.$route.name=="companyDetailScramble"){
//                          this.startScramble()
//                      }else {
//                        this.$router.push("/lgtcheck/companycheck/"+this.checkType);
//                      }
//                    }.bind(this)
//                  });
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:"审核成功",
                    type:"success",
                    scope:this,
                    callback: function (){
                      if(this.$route.name=="companyDetailScramble"){
                        this.startScramble()
                      }else {
                        this.$router.push(this.fromURL || ("/lgtcheck/companycheck/"+this.checkType));
                      }
                    }
                  });
                }
              }).catch(err =>{

            });
          }
      },
      refreshPopoverPosition (position) {
          this.popoverPosition=position;
      },
      /**
       * popover 隐藏时触发
       */
      hide () {
        this.reasonList=[];
        this.otherReason="";
      },
      showReason (p) {
      },
      /**
       * 保存失败原因
       */
      saveReason (p) {
          if(p==1){
            if (this.reasonList1.length==0 && this.otherReason1==''){
                this.errorTipShow1=true;
                return;
            }else {
              this.popover1=false;
              this.type1=2;
              this.errorTipShow1=false;
              this.formatterRemark(1);
            }
          }else if(p==2){
            if (this.reasonList2.length==0 && this.otherReason2==''){
              this.errorTipShow2=true;
              return;
            }else {
              this.popover2=false;
              this.type2=2;
              this.errorTipShow2=false;
              this.formatterRemark(2);
            }
          }
          this.commitCheckData(p);
      },
      /**
       * 格式化Remark
       */
      formatterRemark (p) {
          if(p==1){
              var num=1;
              this.remark1="企业信息:"
              for(let i=0;i<this.reasonList1.length;i++){
                this.remark1+=num+"、"+this.reasonList1[i]+"  ";
                num++;
              }
              if(this.otherReason1){
                  this.remark1+=num+"、"+this.otherReason1;
              }
          }else if(p==2){
              var num=1;
              this.remark2="企业信息:"
              for(let i=0;i<this.reasonList2.length;i++){
                this.remark2+=num+"、"+this.reasonList2[i]+"  ";
                num++;
              }
              if(this.otherReason2){
                this.remark2+=num+"、"+this.otherReason2;
              }
          }
      },
      /**
       * 请求企业信息
       */
      requestCompanyInfo () {
        if(this.companyInfoId){
          let param= util.getPostParam({companyInfoId:this.companyInfoId,token:localStorage.getItem("token")});
          Api.lc_company_check_info(param)
            .then(res => {
              if(res.status==1){
                this.companyInfo=res.result;
                this.getCheckTypeByStatus(res.result);
                if(this.checkType==3){
                    this.requestCheckReason(res.result.auditId);
                }
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error",
                });
              }

            }).catch(err =>{

          });
        }
      },
      showCheckReason : function (){

      },
      requestCheckReason (auditId) {
        if(auditId){
          let param= util.getPostParam({auditId:auditId});
          Api.lc_get_audit_remark(param)
            .then(res => {
              if(res.status==1){
                this.checkReason.remark1=res.result.remark1;
                this.checkReason.remark2=res.result.remark2;
              }
            }).catch(err =>{

          });
        }
      }
    }
  }
</script>
<style scoped="scope">
  .business_Images {
    max-width: 100%;
    width:100%;
    /*height: 285px;*/
    /*max-width: 212px;*/
    max-height: 400px;
  }
  .person_Images {
    max-width:100%;
    width:100%;
    max-height: 400px;
    /*width: 320px;*/
    /*height: 201px;*/
    /*max-width: 320px;*/
    /*max-height: 201px;*/
    margin-right: 10px;
  }
  .con_list ul li {
    line-height: 35px;
  }
  .dialogUl li {
    line-height: 35px;
    width: 33%;
    float: left;
  }
  .reason-show-p {
    clear: both;
    overflow:hidden;
    line-height: 30px;
    padding-top: 5px;
  }
  .popover-header {
    padding: 5px;
    font-size:14px;
    color:#1f2d3d;
    border-bottom: 1px solid #e5e5e5;
    min-height: 16px;
    margin-bottom:5px;
  }
  .popover-content {

  }
  .popover-footer {
    clear:both;
    margin-top:5px;
    padding:5px;
    border-top: 1px solid #e5e5e5;
    min-height: 16px;
    text-align:center;
  }
  .s-f-back {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    overflow: hidden;
    padding-bottom: 10px;
  }
  .show-check-log {
    display: block;
    transition:display 1s;
  }
  .show-check-log {
    display: none;
    transition:display 1s;
  }
  .dfooter {
    text-align:center;
    margin-top: 15px;
  }
  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
