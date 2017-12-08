//基础设置模块
<template>
  <div>
    <el-form :model="seriesItemForm" :rules="rules" ref="seriesItemForm" size="small" label-width="120px" class="demo-ruleForm" label-position="left">
      <el-row>
        <el-col :span="24">
          <el-form-item label="抵扣车系" prop="car_type">
            <el-radio-group v-model="seriesItemForm.car_type">
              <el-radio :label="1">全车系</el-radio>
              <el-radio @change="requestSeries" :label="2">指定车系</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="绑定车系" prop="car_ids" v-if="seriesItemForm.car_type==2">
            <el-checkbox-group v-model="seriesItemForm.car_ids">
              <el-checkbox v-for="item in seriesList" :label="item.id">{{item.serialName}}</el-checkbox>
            </el-checkbox-group>
            <!--<el-checkbox v-for="items in seriesItemForm.car_ids">{{items}}</el-checkbox>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="saveSeriesItem">下一步</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "./../../util/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
export default {
  props:['couponDetail',"isEdit"],
  data () {
    return {
      seriesItemForm:{
        car_type:1,
        car_ids:[]
      },
      seriesList:[],
      rules: {
        car_type: [
          { required: true, type:'number', message: '请选择抵扣车系', trigger: 'change' }
        ],
        car_ids:[
          { required: true, type: 'array', message: '请选择绑定车系', trigger: 'change' }
        ]
      },
    }
  },
  components :{
    VTipMsg
  },
  watch : {
    couponDetail (val, oldval) {
      this.cloneTicketInfo();
//      this.requsetLocation();
    }
  },
  created () {
  },
  mounted () {
  },
  methods:{
    editSave (){
      this.$emit("editSaveCall");
    },
    requestSeries (){
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
//    submitForm(formName) {
//      this.$refs[formName].validate((valid) => {
//        if (valid) {
//          alert('submit!');
//        } else {
//          console.log('error submit!!');
//          return false;
//        }
//      });
//    },
//    resetForm(formName) {
//      this.$refs[formName].resetFields();
//    },
    cloneTicketInfo() {
      if(this.couponDetail){
        this.seriesItemForm = {
          car_type:this.couponDetail.car_type || 1,
          car_ids : this.getCarIdsArray()
        }
      }
    },
    getCarIdsArray () {
        let idsArray=[];
        if(this.couponDetail.car_ids && this.couponDetail.car_ids.length>0){
            idsArray.push(this.couponDetail.car_ids[i].id);
        }
        return idsArray;
    },
    carIdsArrayToObject () {
        if(this.seriesItemForm.car_ids && this.seriesItemForm.car_ids.length>0 && this.seriesList.length>0){
            let objArray = [];
            for(let i = 0 ;i < this.seriesItemForm.car_ids.length ;i++){
                let id = this.seriesItemForm.car_ids[i];
                let eqItem=this.seriesList.filter((item) =>{
                    return item.id==id;
                });
                if(eqItem.length>0){
                  objArray.push({id:eqItem[0].id,cx:eqItem[0].serialName});
                }
            }
            return objArray;
        }
    },
    validSeriesItem () {
      let validStatus=true;
      this.$refs['seriesItemForm'].validate((valid) => {
        if (!valid) {
          this.$refs.tipMsgRef.showTipMsg({
            msg:"抵扣车系信息填写有误",
            type:"error"
          });
          validStatus=false;
          return false;
        }
      });
      return validStatus;
    },
    getSeriesItem(){
        let newSeriesItem = Object.assign({},this.seriesItemForm);
        if(this.seriesItemForm.car_type==2){
          newSeriesItem.car_ids=this.carIdsArrayToObject();
        }
        return newSeriesItem;
    },
    /**
     *  下一步
     */
    saveSeriesItem(){
        if(this.validSeriesItem()){
//              let newSeriesItem = Object.assign({},this.seriesItemForm);
//              if(this.seriesItemForm.car_type==2){
//                newSeriesItem.car_ids=this.carIdsArrayToObject();
//              }
              this.$emit("call",{op:"edit",tag:"series",callData:this.getSeriesItem()});
        }
    },
    /**
     * 自定义验证规则
     * @returns
     */
    userValidate (){
        return {
      }
    },
  }
}
</script>

<!-- Add1111 "scoped" attribute to limit CSS to this component only -->
<style >
</style>
