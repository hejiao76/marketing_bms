<template>

  <div class="con_list">
    <el-form :model="filterForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
      <el-row>
        <el-col :span="20">
          <el-tabs type="card" @tab-click="changeActivityType">

            <el-tab-pane name="0" label="基本信息">
              <div class="filter_div mb20">

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="活动名称" prop="ticketName">
                      <el-input v-model="filterForm.ticketName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
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
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="活动名称" prop="applyCar">
                      <el-input v-model="filterForm.applyCar"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="秒杀券说明：" prop="remarks">
                      <el-input type="textarea" v-model="filterForm.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">

                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="秒杀券详情：" prop="remarks">
                      <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
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




              </div>
            </el-tab-pane>
            <el-tab-pane name="1" label="抵扣车系">
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
            </el-tab-pane>
            <el-tab-pane name="2" label=" 抵扣类型 ">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="抵扣类型" prop="ticketName">
                    <el-checkbox v-model="filterForm.dikouType">抵扣车款</el-checkbox>
                    <el-checkbox v-model="filterForm.otherWay">其他权益</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <div class="saleticket-list colorsaletickstyle">
                  <div class="saleticket-list_header">
                    <p>抵扣券名称名称名称名</p>
                    <span>有效日期：2017-02-11  00：00：00至2018-09-11  00：00：00</span>
                    <div class="headericon">
                      <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                      <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
                    </div>
                  </div>
                  <div class="saleticket-content">
                    <ul>
                      <li>
                        <div class="sal-con-tit">
                          加油卡：
                        </div>
                        <div class="sal-con_txt">
                          <span>¥100X2</span>
                        </div>
                      </li>
                      <li>
                        <div class="sal-con-tit">
                          雨伞：
                        </div>
                        <div class="sal-con_txt">
                          <span>¥100X2</span>
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
                        <td>345<em>(礼包金额)</em></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="saleticket-list newlist">
                  <div class="saleticket-list_header">
                    <div class="headericon">
                      <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                      <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
                    </div>
                  </div>
                  <div class="saleticket-content" @click="addCoupon()">
                    <p data-toggle="modal" data-target="#aaa"><img src="../../assets/images/jia.png" alt="">添加抵扣券</p>
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
              </el-row>

            </el-tab-pane>

          </el-tabs>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>
    </el-form>
    <V-Addcouponlist  ref="ticketDialog"></V-Addcouponlist>
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
  import UE from './../../components/ue/ue.vue';
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import VAddcouponlist from "./../../components/add_coupon_list.vue";


  //  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data() {
      return {
        optionsActivityStart :{
          disabledDate:(time) => {
            if(this.filterForm.activityEndDate){
              let d = new Date (this.filterForm.activityEndDate)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.filterForm.activityStartDate){
              let d = new Date (this.filterForm.activityStartDate)
              return time.getTime() <d.getTime();
            }
          }
        },
        labelPosition:'left',
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        ue1: "ue1", // 不同编辑器必须不同的id
        ue2: "ue2",
        filterForm: {
          ticketName: '',
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          applyCar:'',
          remarks:'',
          radio:'1',
          carList:['博越','远景','帝豪','博越','博越',],
          dikouType:true,//抵扣车型
          otherWay:false,// 其他权益

        },
        rules: {
          ticketName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          activityStartDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          activityEndDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          applyCar: [
            { required: true, message: '秒杀券适用车系', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '秒杀券说明', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    components :{
      ElCol,
      ElRow,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,
      UE,
      VAddcouponlist,

    },
    created (){

    },

    methods : {
      getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /**
       * 选项卡点击事件触发
       * @returns {}
       */
      changeActivityType (tab, event){
        this.activityType = tab.name;
      },
      addCoupon(){
        '1111'.log
        this.$refs.ticketDialog.showDialog();
      }

    }
  }
</script>
<style scoped="scope">
  .el-form-item{
    margin-bottom: 20px;
  }

  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
