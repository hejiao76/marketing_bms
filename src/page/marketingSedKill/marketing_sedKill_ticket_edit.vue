<template>

    <div class="con_list">
      <div class="filter_div mb20">
        <el-form :model="filterForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
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
                    <el-date-picker type="activityStartDate" placeholder="选择日期" v-model="filterForm.activityStartDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="activityEndDate">
                    <el-date-picker type="activityEndDate" placeholder="选择日期" v-model="filterForm.activityEndDate" style="width: 100%;"></el-date-picker>
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
              <el-form-item label="活动名称" prop="sedkillMoney">
                <el-input v-model="filterForm.sedkillMoney"></el-input>
              </el-form-item>
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



        </el-form>
      </div>
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



  //  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data() {
      return {
        labelPosition:'left',
        filterForm: {
          ticketName: '',
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          applyCar:'',
          sedkillMoney:'',
          remarks:'',
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
          sedkillMoney: [
            { required: true, message: '单个秒杀券金额', trigger: 'blur' },
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
      VHeader,
      VLeft,
      VConNav,
      VTipMsg,


    },
    created (){

    },

    methods : {
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
