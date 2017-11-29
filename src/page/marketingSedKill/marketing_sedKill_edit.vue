<template>
    <div class="con_list">
      <div class="filter_div mb20">
        <el-form :model="filterForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-row>
                <el-form-item label="活动名称：" prop="sedkillName">
                  <el-input v-model="filterForm.sedkillName"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="创建时间：" required>
                  <el-col :span="11">
                    <el-form-item prop="activityStartDate">
                      <el-date-picker type="activityStartDate" placeholder="请输入开始日期" v-model="filterForm.activityStartDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="activityEndDate">
                      <el-date-picker type="activityEndDate" placeholder="请输入借宿日期" v-model="filterForm.activityEndDate" style="width: 100%;"></el-date-picker>
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
                <img v-if="filterForm.imageUrl" :src="filterForm.imageUrl" class="avatar">
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
                  <div class="newhds-list">
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
                          <div class="newhd-inf">100个</div>
                        </li>
                        <li>
                          <span class="newhd-txt">最大支付数：</span>
                          <div class="newhd-inf">100个</div>
                        </li>
                        <li>
                          <span class="newhd-txt">秒杀支付金额：</span>
                          <div class="newhd-inf">1.00元</div>
                        </li>
                        <li>
                          <span class="newhd-txt">报名开始时间：</span>
                          <div class="newhd-inf">2017-11-15</div>
                        </li>
                        <li>
                          <span class="newhd-txt">报名结束时间：</span>
                          <div class="newhd-inf">2017-11-15</div>
                        </li>
                        <li>
                          <span class="newhd-txt">秒杀开始时间：</span>
                          <div class="newhd-inf">2017-11-15</div>
                        </li>
                      </ul>
                    </div>
                    <div class="newhd-footer">
                      <div class="newhd-btn">
                        <table>
                          <tbody>
                          <tr>
                            <td style="text-align:right"><a href="javascript:;" class="btn-edit">编辑</a></td>
                            <td id="cancleedit"><a href="javascript:;" class="btn-other">取消编辑</a></td>
                            <td style="text-align:left;"><a href="javascript:;" class="btn-other">取消绑定</a></td>
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
                  <div class="newhds-list">
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
                          <div class="edit-txt">
                            <input type="text" value="">
                            <em class="edit-unit">元</em>
                          </div>
                        </li>
                        <li>
                          <span class="newhd-txt">报名开始时间：</span>
                          <div class="edit-txt">
                            <em class="index-icon icon-hdtime"></em>
                          </div>
                        </li>
                        <li>
                          <span class="newhd-txt">报名结束时间：</span>
                          <!-- <div class="newhd-inf">2017-11-15</div> -->
                          <div class="edit-txt">

                            <em class="index-icon icon-hdtime"></em>
                          </div>
                          <div class="error-txt">时间错误时间错误时间错误时错误</div>
                        </li>
                        <li>
                          <span class="newhd-txt">秒杀开始时间：</span>
                          <!-- <div class="newhd-inf">2017-11-15</div> -->
                          <div class="edit-txt">

                            <em class="index-icon icon-hdtime"></em>
                          </div>

                        </li>
                      </ul>
                    </div>
                    <div class="newhd-footer">
                      <div class="newhd-btn">
                        <table>
                          <tbody>
                          <tr>
                            <td style="text-align:right"><a href="javascript:;" class="btn-edit">编辑</a></td>
                            <td id="cancleedit" style="display: block;"><a href="javascript:;" class="btn-other">取消编辑</a></td>
                            <td style="text-align:left;"><a href="javascript:;" class="btn-other">取消绑定</a></td>
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
  export default {
    data() {
      return {
        labelPosition:'left',
        filterForm: {
          sedkillName: '',
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          imageUrl: ''
        },
        rules: {
          sedkillName: [
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

        }
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
    watch : {

    },
    methods : {
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
