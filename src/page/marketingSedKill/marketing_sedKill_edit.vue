<template>
    <div class="con_list">
      <div class="filter_div mb20">
        <el-form :model="activityInfo" :rules="rules" size="small" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-row>
                <el-form-item label="活动名称：" prop="activityName">
                  <el-input v-model="activityInfo.activityName"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="创建时间：" required>
                  <el-col :span="11">
                    <el-form-item prop="activityStartDate">
                      <el-date-picker style="width: 100%;" v-model="activityInfo.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>

                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="activityEndDate">
                      <el-date-picker style="width: 100%;" v-model="activityInfo.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-row>

            </el-col>

            <el-col :span="8">
              <el-form-item label="分享图片：" prop="imageUrl">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="activityInfo.imageUrl" :src="activityInfo.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="秒杀券绑定">

            </el-form-item>
          </el-row>
          <el-row>
                <div class="newhd">
                    <div v-for="checkedTicketItem in activityInfo.checked_ticket">
                      <!--编辑模块--->
                      <div v-if="checkedTicketItem.editStatus==1" class="newhds-list">
                        <div class="newhd-header">
                          <p class="newhd-tit">500元迈腾购车秒杀券</p>
                          <div class="newhd-time">
                            <p>有效时间：2017-11至20128-09-20</p>
                            <p>创建时间：2017-11 10:52</p>
                          </div>
                        </div>
                        <div class="newhd-content">
                          <ul>
                            <li>
                              <span class="newhd-txt">秒杀券个数：</span>
                              <div class="edit-txt">
                                <input type="text" value="">
                                <em class="edit-unit">个</em>
                              </div>
                            </li>
                            <li>
                              <span class="newhd-txt">最大支付数：</span>
                              <div class="edit-txt">
                                <input type="text" value="">
                                <em class="edit-unit">个</em>
                              </div>
                            </li>
                            <li>
                              <span class="newhd-txt">秒杀支付金额：</span>
                              <div class="edit-txt mlq0">
                                <input type="text" value="">
                                <em class="edit-unit">元</em>
                              </div>
                            </li>
                            <li>
                              <span class="newhd-txt">报名开始时间：</span>
                              <div class="edit-txt">
                                <el-date-picker v-model="testData" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
                              </div>
                            </li>
                            <li>
                              <span class="newhd-txt">报名结束时间：</span>
                              <!-- <div class="newhd-inf">2017-11-15</div> -->
                              <div class="edit-txt">
                                <el-date-picker v-model="testData" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
                                <!--<em class="index-icon icon-hdtime"></em>-->
                              </div>
                              <!--<div class="error-txt">时间错误时间误时间错误时错误</div>-->
                            </li>
                            <li>
                              <span class="newhd-txt">秒杀开始时间：</span>
                              <!-- <div class="newhd-inf">2017-11-15</div> -->
                              <div class="edit-txt">
                                <el-date-picker v-model="testData" size="mini" type="datetime" placeholder="选择日期时间"></el-date-picker>
                                <!--<em class="index-icon icon-hdtime"></em>-->
                              </div>
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
                                <td><button @click="editTickItem(checkedTicketItem.ticketId,0)" type="button" class=" btn_bass btn_b">保存</button></td>
                                <td><button @click="editTickItem(checkedTicketItem.ticketId,0)"  type="button" class=" btn_b_line">取消编辑</button></td>
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
                          <p class="newhd-tit">{{checkedTicketItem.ticketName}}</p>
                          <div class="newhd-time">
                            <p>有效时间：{{checkedTicketItem.activityStartDate}}至{{checkedTicketItem.activityEndDate}}</p>
                            <p>创建时间：{{checkedTicketItem.createDate}}</p>
                          </div>
                        </div>
                        <div class="newhd-content">
                          <ul>
                            <li>
                              <span class="newhd-txt">秒杀券个数：</span>
                              <div class="newhd-inf">{{checkedTicketItem.ticketCount}}个</div>
                            </li>
                            <li>
                              <span class="newhd-txt">最大支付数：</span>
                              <div class="newhd-inf">{{checkedTicketItem.maxPayCount}}个</div>
                            </li>
                            <li>
                              <span class="newhd-txt">秒杀支付金额：</span>
                              <div class="newhd-inf">{{checkedTicketItem.sedkillMoney}}元</div>
                            </li>
                            <li>
                              <span class="newhd-txt">报名开始时间：</span>
                              <div class="newhd-inf">{{checkedTicketItem.signUpStartTime}}</div>
                            </li>
                            <li>
                              <span class="newhd-txt">报名结束时间：</span>
                              <div class="newhd-inf">{{checkedTicketItem.singUpStartTime}}</div>
                            </li>
                            <li>
                              <span class="newhd-txt">秒杀开始时间：</span>
                              <div class="newhd-inf">{{checkedTicketItem.sedKillStartDate}}</div>
                            </li>
                          </ul>
                        </div>
                        <div class="newhd-footer">
                          <div class="newhd-btn">
                            <table class="mt20">
                              <tbody>
                              <tr>
                                <td><button @click="editTickItem(checkedTicketItem.ticketId,1)" type="button" class=" btn_bass btn_b">编辑</button></td>
                                <td><button @click="removeTicketItem(checkedTicketItem.ticketId)" type="button" class=" btn_b_line">取消绑定</button></td>
                                <!--<td><button class="btn_b_line">取消绑定</button></td>-->
                                <!--<td style="text-align:right"><a href="javascript:;" class="btn-edit">编辑</a></td>-->
                                <!--<td id="cancleedit"><a href="javascript:;" class="btn-other">取消编辑</a></td>-->
                                <!--<td style="text-align:left;"><a href="javascript:;" class="btn-other">取消绑定</a></td>-->
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
                    </div>
                  <!--<div class="newhds-list">-->
                    <!--<div class="newhd-header">-->
                      <!--<p class="newhd-tit">500元迈腾购车秒杀券</p>-->
                      <!--<div class="newhd-time">-->
                        <!--<p>有效时间：2017-11至20128-09-20</p>-->
                        <!--<p>创建时间：2017-11 10:52</p>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="newhd-content">-->
                      <!--<ul>-->
                        <!--<li>-->
                          <!--<span class="newhd-txt">秒杀券个数：</span>-->
                          <!--<div class="newhd-inf">100个</div>-->
                        <!--</li>-->
                        <!--<li>-->
                          <!--<span class="newhd-txt">最大支付数：</span>-->
                          <!--<div class="newhd-inf">100个</div>-->
                        <!--</li>-->
                        <!--<li>-->
                          <!--<span class="newhd-txt">秒杀支付金额：</span>-->
                          <!--<div class="newhd-inf">1.00元</div>-->
                        <!--</li>-->
                        <!--<li>-->
                          <!--<span class="newhd-txt">报名开始时间：</span>-->
                          <!--<div class="newhd-inf">2017-11-15</div>-->
                        <!--</li>-->
                        <!--<li>-->
                          <!--<span class="newhd-txt">报名结束时间：</span>-->
                          <!--<div class="newhd-inf">2017-11-15</div>-->
                        <!--</li>-->
                        <!--<li>-->
                          <!--<span class="newhd-txt">秒杀开始时间：</span>-->
                          <!--<div class="newhd-inf">2017-11-15</div>-->
                        <!--</li>-->
                      <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="newhd-footer">-->
                      <!--<div class="newhd-btn">-->
                        <!--<table>-->
                          <!--<tbody>-->
                          <!--<tr>-->
                            <!--<td style="text-align:right"><a href="javascript:;" class="btn-edit">编辑</a></td>-->
                            <!--<td id="cancleedit"><a href="javascript:;" class="btn-other">取消编辑</a></td>-->
                            <!--<td style="text-align:left;"><a href="javascript:;" class="btn-other">取消绑定</a></td>-->
                          <!--</tr>-->
                          <!--</tbody>-->
                        <!--</table>-->
                        <!--<div class="icon-left">-->
                          <!--<img src="../../assets/images/zsks_o_l.png" alt="">-->
                        <!--</div>-->
                        <!--<div class="icon-right">-->
                          <!--<img src="../../assets/images/zsks_o_r.png" alt="">-->
                        <!--</div>-->
                        <!--<div class="icon-right">-->
                          <!--<img src="../../assets/images/zsks_o_r.png" alt="">-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->

                  <div class="newhds-list new-list" @click="openAddList">
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
        </el-form>
      </div>
      <V-Addedkilllist></V-Addedkilllist>
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
  import VAddedkilllist from "./../../components/add_sedkill_list.vue";
  import TestData from "./../../util/TestData"
  export default {
    data() {
      return {
        testData:'',
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
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          imageUrl: ''
        },
        tempBindTicketItemKey : ["ticketId", "ticketName", "isvalid", "activityStartDate", "activityEndDate", "createDate", "applyCar", "sedkillMoney", "sedKillStartDate", "ticketCount", "maxPayCount", "signUpStartTime", "singUpStartTime"],
        rules: {
          activityName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          activityStartDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          activityEndDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          imageUrl:[
            { required: true, message: '请上传图片', trigger: 'change' }
          ]
        },
        activityId:'', //秒杀活动ID
        activityInfo:{},
      }
    },
    components :{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VAddedkilllist
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

          if(this.activityId){
              this.requestData()
          }
      },
      /**
       * 请求秒杀活动详情
       */
      requestData () {
        if(this.activityId){
          let param = {activityId:this.activityId};
          this.activityInfo=TestData.sedKill_checked_ticket_data.result;
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
       * 编辑/取消编辑 秒杀券基本信息按钮事件触发
       * @param ticketId
       * @param status
       */
      editTickItem (ticketId,status) {
        if(ticketId){
          for(let i= 0 ; i <this.activityInfo.checked_ticket.length; i ++ ){
            if(ticketId == this.activityInfo.checked_ticket[i].ticketId){
              let item = this.activityInfo.checked_ticket[i];
              item.editStatus=status;
              this.activityInfo.checked_ticket.splice(i, 1, item); //使用splice
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
        if(ticketId){
          for(let i= 0 ; i <this.activityInfo.checked_ticket.length; i ++ ){
            if(ticketId == this.activityInfo.checked_ticket[i].ticketId){
              this.activityInfo.checked_ticket.splice(i, 1); //使用splice 触发数据更新
              break;
            }
          }
        }
      },
      openAddList() {
        $('.choose-hd,.mask').show();
//        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
//          dangerouslyUseHTMLString: true
//        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
      }
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
