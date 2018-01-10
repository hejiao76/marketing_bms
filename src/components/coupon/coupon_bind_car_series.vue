//基础设置模块
<template>
  <div>
    <el-form :model="seriesItemForm" :rules="rules" ref="seriesItemForm" size="small" label-width="120px" class="demo-ruleForm" label-position="left">
      <el-row>
        <el-col :span="24">
          <el-form-item label="抵扣车系" prop="serialType">
            <el-radio-group v-model="seriesItemForm.serialType">
              <el-radio :label="1">全车系</el-radio>
              <el-radio @change="requestSeries" :label="2">指定车系</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="绑定车系" prop="serialIds" v-if="seriesItemForm.serialType==2">
            <el-checkbox-group v-model="seriesItemForm.serialIds">
              <el-checkbox v-for="item in seriesList" :label="String(item.id)">{{item.serialName}}</el-checkbox>
            </el-checkbox-group>
            <!--<el-checkbox v-for="items in seriesItemForm.serialIds">{{items}}</el-checkbox>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div style="text-align: center">
            <el-button v-if="isEdit" type="primary" @click="editSave">保存</el-button>
            <el-button v-if="!isEdit" type="primary" @click="preFn">上一步</el-button>
            <el-button v-if="!isEdit" type="primary" @click="saveSeriesItem">下一步</el-button>
            <el-button @click="cancelFn('ruleForm')">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "../../../static/baseSetting/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
export default {
  props:['couponDetail',"isEdit"],
  data () {
    return {
      seriesItemForm:{
        serialType:1,
        serialIds:[]
      },
      seriesList:[],
      rules: {
        serialType: [
          { required: true, type:'number', message: '请选择抵扣车系', trigger: 'change' }
        ],
        serialIds:[
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
      this.cloneSeriesInfo();
//      this.requsetLocation();
    },
    seriesItemForm :{
        handler(val,oldval){
          this.$emit("getTmpSeriesData",Object.assign({},this.getSeriesItem()));
        },
        deep:true
    }
  },
  created () {
  },
  mounted () {
  },
  methods:{
    cancelFn (){
      this.$confirm('确认要取消吗？','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(()=> {
        this.$router.push("/coupon/ticket_list");
      }).catch(()=>{

      })
    },
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
    cloneSeriesInfo() {
      if(this.couponDetail){
        this.seriesItemForm = {
          serialType:this.couponDetail.serialType || 1,
          serialIds : this.couponDetail.serialIds?this.couponDetail.serialIds.split(",") : []
        }
        if(this.seriesItemForm.serialIds){
            this.requestSeries();
        }
      }
    },
    /**
     * 获取车系ID集合
     */
    getCarIdsArray () {
        let idsArray=[];
        if(this.couponDetail.carIds && this.couponDetail.carIds.length>0){
            for(let i = 0 ; i < this.couponDetail.carIds.length; i++){
              idsArray.push(this.couponDetail.carIds[i].id);
            }

        }
        return idsArray;
    },
    /**
     * 车系ID转成车系Object集合
     */
    carIdsArrayToObject () {
        if(this.seriesItemForm.serialIds && this.seriesItemForm.serialIds.length>0 && this.seriesList.length>0){
            let objArray = [];
            for(let i = 0 ;i < this.seriesItemForm.serialIds.length ;i++){
                let id = this.seriesItemForm.serialIds[i];
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
//          this.$refs.tipMsgRef.showTipMsg({
//            msg:"抵扣车系信息填写有误",
//            type:"error"
//          });
//          this.$emit("errorTipMsg",{msg:"抵扣车系信息填写有误"});
          this.$message({
            type:'error',
            message:'抵扣车系信息填写有误',
            duration:'1500'
          });
          validStatus=false;
          return false;
        }
      });
      return validStatus;
    },
    getSeriesItem(){
        let newSeriesItem = Object.assign({},this.seriesItemForm);
        if(this.seriesItemForm.serialType==2){
          newSeriesItem.serialIds=this.seriesItemForm.serialIds.join(","); //this.carIdsArrayToObject();
        }

        return newSeriesItem;
    },
    preFn () {
      this.$emit("call", {op: "edit", tag: "series",pre:true});
    },
    /**
     *  下一步
     */
    saveSeriesItem(){
        if(this.validSeriesItem()){
//              let newSeriesItem = Object.assign({},this.seriesItemForm);
//              if(this.seriesItemForm.serialType==2){
//                newSeriesItem.serialIds=this.carIdsArrayToObject();
//              }
              this.$emit("call",{op:"edit",tag:"series",callData:this.getSeriesItem()});
              this.$emit("getTmpSeriesData",Object.assign({},this.getSeriesItem()));
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
