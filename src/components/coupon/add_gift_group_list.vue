<template>
  <div>

    <el-dialog class="choose-hd" center title="添加礼品包" :visible.sync="dialogTableVisible" width="931px" >
      <el-form  size="small" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left">
      <el-form-item label="礼品包名称：">
        <!--<el-input v-model="activityName" placeholder="请输商品名称"></el-input>-->
        <el-input placeholder="请输入内容" v-model="giftGroupName">
          <el-button @click="searchGiftGroup" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-form-item>
      </el-form>
      <div class="choose-copntent" style="min-height:180px;padding-top: 20px;">
        <div class="choose-copntent_body" >
            <el-row class="this_box_wrop">
                <!--<el-col style=" width: 260px;" >-->
                  <div class="saleticket-list colorsaletickstyle" v-for="item in listObj">
                    <div class="isfill cur">
                      <img v-if="item.giftGroupId!=tmpGiftGroupId" @click="checkGiftGroup(item.giftGroupId)"   src="./../../assets/images/fillnone.png" alt="">
                      <img v-else  @click="cancelCheckGiftGroup" src="./../../assets/images/fillin.png" alt="">
                    </div>
                    <div class="saleticket-list_header">
                      <p>{{item.giftGroupName}}</p>
                      <span>有效日期: {{item.effectiveDate}}</span>
                      <div class="headericon">
                        <img src="./../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                        <img src="./../../assets/images/saleticketsright.png" class="iconright" alt="">
                      </div>
                    </div>
                    <div class="saleticket-content" style="height: 88px;overflow-y: auto;">
                      <ul>
                        <li v-for="giftItem in item.giftInfoList">
                          <div class="sal-con-tit">
                            {{giftItem.giftName}}：
                          </div>
                          <div class="sal-con_txt">
                            <span>¥{{giftItem.giftPrice || 0}}X{{giftItem.giftCount}}</span>
                          </div>
                        </li>
                        <!--<li>-->
                          <!--<div class="sal-con-tit">-->
                            <!--雨伞：-->
                          <!--</div>-->
                          <!--<div class="sal-con_txt">-->
                            <!--<span>¥100X2</span>-->
                          <!--</div>-->
                        <!--</li>-->
                      </ul>
                    </div>
                    <div class="saleticket-footer">
                      <div class="headericon">
                        <img src="./../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                        <img src="./../../assets/images/saleticketsright.png" class="iconright" alt="">
                      </div>
                      <table>
                        <tr>
                          <td>{{item.groupPrice}}<em>(礼包金额)</em></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                <!--</el-col>-->
            </el-row>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureSelect" type="primary">确 定</el-button>
        <el-button @click="cancelSelect">取 消</el-button>
      </div>
    </el-dialog>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "../../../static/baseSetting/Final"
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
export default {
  props:['giftGroupId','tmpSeriesData'],
  data () {
    return {
        dialogTableVisible:false, //dialog是否显示
        exceptIdArray:[],
        listObj:[],  //礼品包计划
        giftGroupName:'', //搜索礼品包名称
        tmpGiftGroupId:'', //选择礼品包ID
//        testData:[1,2,3]
    }
  },
  components :{
    VTipMsg
  },
  watch : {
    giftGroupId (val, oldval) {
      this.tmpGiftGroupId = this.giftGroupId;
    }
  },
  created () {
//      this.showDialog();
  },
  mounted (){

  },
  methods:{
    /**
     * 选择礼包，只能选择一个
     */
    checkGiftGroup (tmpId){
        this.tmpGiftGroupId=tmpId
    },
    /**
     * 取消选择礼包
     */
    cancelCheckGiftGroup (){
      this.tmpGiftGroupId=""
    },
    /**
     * 搜索可选礼包
     */
    searchGiftGroup () {
        this.requestGiftList();
    },
    /**
     * 显示选择礼品包模态框
     * @param exceptIdArray
     */
    showDialog (exceptIdArray) {
        this.dialogTableVisible=true;
    },
    /**
     * 请求可选礼包
     */
    requestGiftList (){
        let param = {
          giftGroupName:this.giftGroupName || '',
          type:this.tmpSeriesData.serialType,
          serialId: this.tmpSeriesData.serialIds,
          pageIndex:1,
          pageSize:10000
        }
      Api.base_sys_gift_list(param)
        .then(res => {
          if (res.status == true) {
              this.listObj=res.result;
          }else {
            this.$refs.tipMsgRef.showTipMsg({
              msg:res.message,
              type:"error"
            });
          }
        }).catch(err => {

      });
    },
    /**
     * 确认选择
     */
    sureSelect () {
        if(this.tmpGiftGroupId){
          this.dialogTableVisible=false;
          this.$emit("call",{giftGroupId:this.tmpGiftGroupId})
          this.tmpGiftGroupId='';
          this.listObj=[];
        }
    },
    /**
     * 取消选择
     */
    cancelSelect(){
      this.dialogTableVisible=false;
      this.tmpGiftGroupId='';
      this.listObj=[];
    },
    clearTmpStatus(){

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
 .choose-hd .el-dialog--center .el-dialog__header {
   padding-top:10px;
 }
 .el-dialog{
   width: 59%;
 }

</style>
