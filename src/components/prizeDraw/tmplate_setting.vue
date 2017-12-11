//模板设置模块
<template>
  <div>
    <el-row :gutter="20">
    <el-col v-for="(tmpItem,index) in templateTmp" :lg="8" :xl="6" :span="8" class="mb20 ">
      <div style="width:100%;position: relative;">
      <div @click="chooseTmp(tmpItem.id)" v-if="tmpItem.id!=templateIdTmpObj.templateId" class="fade_div cur"></div>
      <img @click="cancelTmp()" style="width:100%" class="cur" :src="tmpItem.src"/>
      </div>
    </el-col>
    <!--<el-col :lg="8" :xl="6" :span="8" class="mb20"><img  style="width:100%;z-index: 1" src="../../assets/images/mod.png"/></el-col>-->
    <!--<el-col :lg="8" :xl="6" :span="8" class="mb20"><img  style="width:100%" src="../../assets/images/mod.png"/></el-col>-->
    <!--<el-col :lg="8" :xl="6" :span="8" class="mb20"><img  style="width:100%" src="../../assets/images/mod.png"/></el-col>-->
    <!--<el-col :lg="8" :xl="6" :span="8" class="mb20"><img  style="width:100%" src="../../assets/images/mod.png"/></el-col>-->
    <!--<el-col :lg="8" :xl="6" :span="8" class="mb20"><img  style="width:100%" src="../../assets/images/mod.png"/></el-col>-->
    <!--<el-col :lg="8" :xl="6" :span="8" class="mb20"><img  style="width:100%" src="../../assets/images/mod.png"/></el-col>-->
    <!--<el-col :lg="8" :xl="6" :span="8" class="mb20"><img  style="width:100%" src="../../assets/images/mod.png"/></el-col>-->
    </el-row>
    <el-row>
      <el-col :span="24" style="text-align: center;">
        <el-button @click="preFn"  type="primary">上一步</el-button>
        <el-button v-if="isEdit"  type="primary" @click="editSave">保存</el-button>
        <el-button v-else  @click="saveTemplateId" type="primary">保存</el-button>
      </el-col>
    </el-row>
    <!--<el-form :model="checkedTicketItemForm" :rules="ticketRules" size="small" ref="checkedTicketItemForm" label-width="0px" class="demo-ruleForm">-->

    <!--</el-form>-->
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "./../../util/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
export default {
  props:["prizeDrawDetail","isEdit"],
  data () {
    return {
      templateIdTmp:1,
      templateIdTmpObj:{
        templateId:''
      },
      templateTmp:[{
          id:1,
          src:"../../../static/images/default/prizeTmplate1.jpg",
      }],
    }
  },
  components :{
//    ElInput,
    VTipMsg
  },
  watch : {
    prizeDrawDetail (val, oldval) {
      this.templateIdTmpObj = Object.assign({},this.templateIdTmpObj,{
        templateId : this.prizeDrawDetail.templateId || ""
      })

    }
  },
  created () {

  },
  mounted () {
    this.templateIdTmpObj = Object.assign({},this.templateIdTmpObj,{
      templateId : this.prizeDrawDetail.templateId || ""
    })
  },
  methods:{
    editSave (){
      this.$emit("editSaveCall");
    },
    /**
     * 选择模板
     */
    chooseTmp (tmpId) {
        this.templateIdTmpObj.templateId=tmpId;
    },
    /**
     * 取消选择模板
     */
    cancelTmp (){
      this.templateIdTmpObj.templateId="";
    },
    /**
     * 上一步按钮操作
     */
    preFn () {
      this.$emit("call", {op: "edit", tag: "template",pre:true});
    },
    /**
     * 验证模板信息是否正确
     */
    validTemplateInfo(){
      if(!this.templateIdTmpObj.templateId){
        this.$refs.tipMsgRef.showTipMsg({
          msg:"请选择模板",
          type:"error"
        });
        return false;
      }
      return true;
    },
    /**
     * 获取模板信息对象
     */
    getTemplateInfo () {
      return this.templateIdTmpObj
    },
    /**
     * 新增同步模板信息
     */
    saveTemplateId () {
      if(this.templateIdTmpObj.templateId){
        this.$emit("call", {op: "edit", tag: "template", callData: {templateId:this.templateIdTmpObj.templateId}});
      } else{
        this.$refs.tipMsgRef.showTipMsg({
          msg:"请选择模板",
          type:"error"
        });
      }
    }
  }
}
</script>

<style scoped="scope">
  .fade_div{
    width:100%;
    height: 100%;
    background: #333;
    opacity: .75;
    position: absolute;
    left: 0px;
    bottom: 0px;
    /*right:10px;*/
    /*margin-left:10px;*/
    z-index: 2;
  }
  .fade_div1{
    /*width:100%;*/
    /*height: 100%;*/
    /*background: #333;*/
    opacity: .75;
    /*position: absolute;*/
    /*left: 0px;*/
    bottom: 0px;
    right:10px;
    z-index: 2;
  }

</style>
