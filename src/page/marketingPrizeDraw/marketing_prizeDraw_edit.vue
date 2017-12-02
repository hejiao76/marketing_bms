<template>
    <div class="con_list">
      <el-row>
        <el-col :span="4">
          <img src="../../assets/images/mod.png" style="width: 100%"/>
        </el-col>
        <el-col :span="20">
          <el-form :model="filterForm"  :rules="rules" ref="filterForm" label-width="120px" size="small" :label-position="labelPosition">
              <el-tabs type="card"  v-model="thisName" @tab-click="changeActivityType">
                <el-tab-pane label="基础设置" name="first">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="活动名称:" prop="activityName">
                        <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称" ></el-input>
                      </el-form-item>
                      <el-form-item label="秒杀券有效期" required>
                        <el-col :span="11">
                          <el-form-item prop="activityStartDate">
                            <el-date-picker style="width: 100%;" v-model="filterForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center">-</el-col>
                        <el-col :span="11">
                          <el-form-item prop="activityEndDate">
                            <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="参与人数:">
                        <el-col :span="24">
                        <el-radio v-model="filterForm.radio" label="1">显示</el-radio>
                        <el-radio v-model="filterForm.radio" label="2">隐藏</el-radio>
                          <span style="margin-left: 100px">在实际人数上增加&nbsp;&nbsp;<el-input  placeholder="请输入内容" style="width: 100px;display: inline-block"></el-input>&nbsp;&nbsp;人</span>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="获奖信息:">
                        <el-col :span="24">
                          <el-radio v-model="filterForm.radio" label="1">显示</el-radio>
                          <el-radio v-model="filterForm.radio" label="2">隐藏</el-radio>
                        </el-col>
                      </el-form-item>

                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-col :span="14">
                         <span >背景图片：</span>
                        <el-upload
                          class="upload-demo"
                          drag
                          action="https://jsonplaceholder.typicode.com/posts/"
                          multiple
                        >
                          <i class="el-icon-upload" ></i>
                          <div class="el-upload__text">拖动或<em>点击上传</em></div>
                          <div class="el-upload__tip" slot="tip"></div>
                        </el-upload>
                      </el-col>
                      <el-col :span="8">
                        <div style="font-size: 12px;padding-top:125px;">大小200kb内<br/>
                          尺寸：50px*50px</div>
                        <a href="javascript:void(0)" style="color: #527EFE">恢复默认</a>
                      </el-col>

                    </el-col>
                    <el-col :span="8">
                      <el-col :span="14">
                        <span >标题图片：</span>
                        <el-upload
                          class="upload-demo"
                          drag
                          action="https://jsonplaceholder.typicode.com/posts/"
                          multiple
                        >
                          <i class="el-icon-upload" ></i>
                          <div class="el-upload__text">拖动或<em>点击上传</em></div>
                          <div class="el-upload__tip" slot="tip"></div>
                        </el-upload>
                      </el-col>
                      <el-col :span="8">
                        <div style="font-size: 12px;padding-top:125px;">大小200kb内<br/>
                          尺寸：50px*50px</div>
                        <a href="javascript:void(0)" style="color: #527EFE">恢复默认</a>
                      </el-col>
                    </el-col>
                    <el-col :span="8">
                      <el-col :span="14">
                        <span >活动图片：</span>
                        <el-upload
                          class="upload-demo"
                          drag
                          action="https://jsonplaceholder.typicode.com/posts/"
                          multiple
                        >
                          <i class="el-icon-upload" ></i>
                          <div class="el-upload__text">拖动或<em>点击上传</em></div>
                          <div class="el-upload__tip" slot="tip"></div>
                        </el-upload>
                      </el-col>
                      <el-col :span="8">
                        <div style="font-size: 12px;padding-top:125px;">大小200kb内<br/>
                          尺寸：50px*50px</div>
                        <a href="javascript:void(0)" style="color: #527EFE">恢复默认</a>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row class="margin-bottom-20" style="margin-top:20px;">
                    <el-col :span="4"  style="margin-top:10px;">
                      活动地区：
                    </el-col>
                    <el-col :span="20">
                      <V-Treeview></V-Treeview>
                    </el-col>
                  </el-row>
                  <el-row class="margin-bottom-20">
                    <span class="span-120">车系／车型：</span>
                    <el-select v-model="filterForm.activityName" placeholder="全部"size="small">
                    <el-option
                      v-for="item in filterForm.activityArea"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="活动说明:" prop="activityName">
                        <el-input type="textarea" placeholder="填写商家自定义的活动说明"
                                  v-model="filterForm.activityName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="抽奖设置" name="second">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="中奖次数:" prop="activityName">
                        每人总中奖次数：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次
                      </el-form-item>
                      <el-form-item label="免费抽奖次数上限设置:" labelWidth="200px" prop="activityName">
                        单人免费总抽奖次数：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次,
                        每日免费抽奖次数：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次
                      </el-form-item>
                      <el-form-item label="增加抽奖机会设置:" prop="activityName" labelWidth="180px">
                        每次分享增加：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次,
                        分享最多增加：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次
                      </el-form-item>
                      <el-form-item label="免费抽奖次数上限设置:" labelWidth="200px" prop="activityName">
                        单人免费总抽奖次数：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次,
                        每日免费抽奖次数：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次
                      </el-form-item>
                      <el-form-item label="防刷奖设置:" prop="activityName">
                        同一IP段参与活动抽奖次数：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次,
                        次动态IP允许参与活动人数上限：
                        <el-input style="width: 10%" v-model="filterForm.activityName" placeholder="1"></el-input>
                        次
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="奖品设置" name="third">
                  <el-row>
                    <el-col :span="24" class="">
                      <el-form-item label="兑奖时间:" prop="activityName">
                        <el-col :span="11">
                          <el-form-item prop="activityStartDate">
                            <el-date-picker style="width: 100%;" v-model="filterForm.activityStartDate"
                                            :picker-options="optionsActivityStart" type="date"
                                            placeholder="选择开始日期"></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center">-</el-col>
                        <el-col :span="11">
                          <el-form-item prop="activityEndDate">
                            <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate"
                                            :picker-options="optionsActivityEnd" type="date"
                                            placeholder="请输入结束日期"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                        <el-row v-for="(items,index) in  addPrizeList">
                            <el-col :span="24" class="newp-title">
                              <img style="cursor: pointer;" src="../../assets/images/del.png"/>
                            </el-col>
                            <el-col style="border: 1px solid #ccc; padding:0 8px;">
                              <div v-if="items.isshow">
                              <el-form-item label="礼包名称:">
                                <el-select v-model="filterForm.activityName" placeholder="请选择">
                                  <el-option
                                    v-for="item in filterForm.activityArea"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="礼包名称:">
                                    <p>1</p>
                                    <p>12</p>
                                    <p>13</p>
                              </el-form-item>
                              <el-form-item label="活动名称:" prop="activityName">
                                <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称" ></el-input>
                              </el-form-item>
                              <el-form-item label="活动名称:" prop="activityName">
                                <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称" ></el-input>
                              </el-form-item>
                              <el-form-item label="活动名称:" prop="activityName">
                                <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称" ></el-input>
                              </el-form-item>
                              <el-form-item label="活动名称:">
                                <el-col :span="6">
                                  <el-form-item prop="activityStartDate">
                                    <el-date-picker style="width: 100%;" v-model="filterForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
                                  </el-form-item>
                                </el-col>
                                <el-col class="line" :span="1" style="text-align: center">-</el-col>
                                <el-col :span="6">
                                  <el-form-item prop="activityEndDate">
                                    <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                  投放个数：<el-input   v-model="filterForm.activityName" placeholder="请输入活动名称" style="width: 50px;" ></el-input>个
                                </el-col>
                                <el-col :span="5">
                                      <el-button>删除</el-button>
                                      <el-button type="primary">增加</el-button>
                                </el-col>
                              </el-form-item>
                              </div>
                              <el-col :span="24" style="text-align: center">
                                <el-button v-if="items.isshow" @click="closePrizeBox(index)">收起</el-button>
                                <el-button v-if="!items.isshow"@click="closePrizeBox(index)">展开</el-button>
                              </el-col>
                            </el-col>
                        </el-row>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="模板选择" name="fourth">
                  <img src="../../assets/images/mod.png"/>
                </el-tab-pane>
              </el-tabs>
          </el-form>
        </el-col>
      </el-row>
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
  import VTreeview from "./../../components/treeview.vue";
  import TestData from "./../../util/TestData"
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  export default {
    data() {
      return {
        thisName:'first',
        addPrizeList:[{isshow:true},{isshow:true}],
        labelPosition:'left',
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
        filterForm: {
          activityName: '',
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          imageUrl: '',
          activityArea:'',
          radio:1,
        },

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
        },
        activityId:'', //秒杀活动ID
        activityInfo:{},
      }
    },
    components :{
      ElButton,
      ElRow,
      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      VTreeview,
    },
    created (){

    },
    mounted (){

    },
    watch : {
      "$route": function (to, from) {
        this.resetForm();
      }
    },
    methods : {
      changeActivityType(){

      },
      closePrizeBox(idx){
         if(this.addPrizeList[idx].isshow){
           this.addPrizeList[idx].isshow = false;
         }else{
           this.addPrizeList[idx].isshow = true;
         }
      }


    }
  }
</script>
<style>
  .el-upload-dragger{
    width: 150px;
    height: 150px;
  }
  .upload-demo{
    margin-top:10px;
  }
  .span-120{
    width: 120px;
    display: inline-block;
  }
  .margin-bottom-20{
    margin-bottom:20px;
  }
  .luckdraw-right .redstar {
    color: #F16767;
    font-size: 12px;
    margin-right: 8px
  }

  .luckdraw-right .bg-img-box {
    padding-right: 0
  }

  .luckdraw-right .img-detail {
    float: left;
    padding-top: 70px
  }

  .luckdraw-right .img-detail p {
    color: #527EFE;
    font-size: 14px;
    line-height: 20px;
    padding-left: 8px
  }

  .luckdraw-right .img-detail .img-detail-size {
    color: #ABB3C8;
    font-size: 10px
  }

  .luckdraw-right .tab-pane-two .input-text {
    float: left
  }

  .luckdraw-right .tab-pane-two input {
    margin: 0 5px
  }

  .luckdraw-right .tab-pane-two label {
    margin-right: 20px
  }

  .luckdraw-right .tab-pane-three {
    position: relative
  }

  .luckdraw-right .tab-pane-three .gift-box {
    border: 1px solid #EFF0F5
  }

  .luckdraw-right .tab-pane-three .form-title {
    height: 40px;
    line-height: 40px;
    background: #F6F7FB;
    color: #404C73;
    position: relative
  }

  .luckdraw-right .tab-pane-three .title-right {
    position: absolute;
    right: 20px;
    top: 0
  }

  .luckdraw-right .tab-pane-three .title-right i {
    padding: 0 5px;
    color: #8C94AC;
    font-size: 14px
  }

  .luckdraw-right .tab-pane-three .title-right i img {
    width: 16px;
    height: 16px
  }

  .luckdraw-right .tab-pane-three .gift-p label {
    padding-top: 15px
  }

  .luckdraw-right .tab-pane-three .gift-p p {
    font-size: 12px;
    line-height: 17px;
    color: #404C73
  }

  .luckdraw-right .tab-pane-three .gift-p p span {
    color: #ABB3C8
  }

  .luckdraw-right .tab-pane-three .time-box {
    border: 1px solid #E3E5E8
  }

  .luckdraw-right .tab-pane-three .time-box input {
    border: none
  }

  .luckdraw-right .tab-pane-three .shou {
    position: absolute;
    bottom: -30px;
    left: 50%;
    margin-left: -85px;
    width: 169px;
    height: 30px;
    background: #fff;
    color: #404C73;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #EFF0F5
  }

  .luckdraw-right .tab-pane-four .muban-box {
    margin-bottom: 20px
  }

  .luckdraw-right .tab-pane-four img {
    width: 100%
  }
  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
