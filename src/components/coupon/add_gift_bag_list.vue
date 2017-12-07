<template>
  <div>

    <el-dialog class="choose-hd" center title="添加礼品包" :visible.sync="dialogTableVisible" >
      <el-form  size="small" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
      <el-form-item label="礼品包名称：">
        <el-input v-model="activityName" placeholder="请输商品名称"></el-input>
      </el-form-item>
      </el-form>
      <div class="choose-copntent">
        <div class="choose-copntent_body">
            <el-row class="this_box_wrop">
                <!--<el-col style=" width: 260px;" >-->
                  <div class="saleticket-list colorsaletickstyle" v-for="item in testData">
                    <div class="saleticket-list_header">
                      <p>抵扣券名称名称名称名</p>
                      <span>有效日期：2017-02-11  00：00：00至2018-09-11  00：00：00</span>
                      <div class="headericon">
                        <img src="./../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                        <img src="./../../assets/images/saleticketsright.png" class="iconright" alt="">
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
                        <img src="./../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                        <img src="./../../assets/images/saleticketsright.png" class="iconright" alt="">
                      </div>
                      <table>
                        <tr>
                          <td>345<em>(礼包金额)</em></td>
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
import Final from "./../../util/Final"
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData"
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";
export default {
  data () {
    return {
        dialogTableVisible:true,
        exceptIdArray:[],
        listObj:[],
        activityName:'',
        labelPosition:'left',
        testData:[1,2,3]
    }
  },
  components :{
    ElCol,
    ElRow,
    VTipMsg
  },
  created () {

  },
  methods:{
    /**
     * 显示新增秒杀券模态框
     * @param exceptIdArray
     */
    showDialog (exceptIdArray) {
//        this.exceptIdArray=exceptIdArray;
//        this.requestAddTicketList();
        this.dialogTableVisible=true;
    },
    /**
     * 选择秒杀券
     * @param ticketId
     */
    checkTicket (ticketId,checked){
        if(ticketId){
          for(let i=0;i<this.listObj.length;i++){
            if(this.listObj[i].ticketId==ticketId){
                this.listObj[i].tmpChecked = checked;
                this.listObj.splice(i,1,this.listObj[i]);
                console.log("find--->", this.listObj[i].tmpChecked)
                break;
            }
          }
        }
    },
    /**
     * 过滤已选择秒杀券1
     * @param listObj
     * @returns {Array}
     */
    filterExceptId (listObj) {
        let newListObjArray = [] ;
        for(let i=0;i<listObj.length;i++){
            if(!this.exceptIdArray.includes(listObj[i].ticketId)){
                newListObjArray.push(listObj[i]);
            }
        }
        return newListObjArray;
    },
    /**
     * 请求可选秒杀券列表
     */
    requestAddTicketList () {
//      let param = {activityId:this.activityId};
//      this.activityInfo=TestData.sedKill_checked_ticket_data.result;
        let resData = TestData.sedKill_newTicket_data;
        this.listObj = this.filterExceptId(resData);
      console.log(this.listObj);
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
    },
    /**
     * 获取已选择的秒杀券列表
     */
    getCheckedTicket(){
      let checkedTicketArray = [];
      for(let i=0;i<this.listObj.length;i++){
        if(this.listObj[i].tmpChecked){
          checkedTicketArray.push(this.listObj[i]);
        }
      }
      return checkedTicketArray;
    },
    /**
     * 确认选择
     */
    sureSelect () {
//      console.log("save");
//      let checkedTicketArray=this.getCheckedTicket();
//      if(checkedTicketArray.length+this.exceptIdArray.length<=3){
//            this.$emit("call",checkedTicketArray)
//            this.dialogTableVisible=false;
//            this.listObj=[];
//      }else{
//        this.$refs.tipMsgRef.showTipMsg({
//          msg:"活动绑定的秒杀券数量已经超过101个",
//          type:"error"
//        });
//      }
    },
    /**
     * 取消选择
     */
    cancelSelect(){
//      this.dialogTableVisible=false;
//      this.listObj=[];
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
 .saleticket-list:nth-child(3n+0)
 {
   margin-right:0;
 }
</style>
