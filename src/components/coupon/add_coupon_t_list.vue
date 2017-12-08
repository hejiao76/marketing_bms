<template>
  <div>

    <el-dialog class="choose-hd" center title="添加活动抵扣券" :visible.sync="dialogTableVisible" >
      <el-form  size="small" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
      <el-form-item label="抵扣券名称：">
        <!--<el-input v-model="activityName" placeholder="请输商品名称"></el-input>-->
        <el-input placeholder="请输入内容" v-model="ticketName">
          <el-button @click="searchTickets" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-form-item>
      </el-form>
      <div class="choose-copntent">
        <div class="choose-copntent_body" style="height:350px;overflow-y: scroll">
            <el-row class="this_box_wrop">
                <!--<el-col style=" width: 260px;" >-->
                    <div class="saleticket-list"v-for="(item,index) in listObj">
                      <div class="isfill">
                        <img class="cur" v-if="!item.tmpChecked" @click="checkTicket(item.id,true)"  src="./../../assets/images/fillnone.png" alt="">
                        <img class="cur" v-if="item.tmpChecked" @click="checkTicket(item.id,false)" src="./../../assets/images/fillin.png" alt="">
                      </div>
                      <div class="saleticket-list_header">
                        <p>{{item.name}}</p>
                        <span>有效日期：{{item.validity}}</span>
                        <div class="headericon">
                          <img src="./../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                          <img src="./../../assets/images/saleticketsright.png" class="iconright" alt="">
                        </div>
                      </div>
                      <div class="saleticket-content">
                        <ul>
                          <li>
                            <div class="sal-con-tit">
                              抵扣券类型：
                            </div>
                            <div class="sal-con_txt">
                              <span>抵扣车款  其他权益</span>
                            </div>
                          </li>
                          <li>
                            <div class="sal-con-tit">
                              抵扣金额(元)：
                            </div>
                            <div class="sal-con_txt">
                              <span>{{item.amount}}</span>
                            </div>
                          </li>
                          <li>
                            <div class="sal-con-tit">
                              绑定车系：
                            </div>
                            <div v-if="item.type!=1" class="sal-con_txt" >
                              <span  v-for="(seriesItem,itemIndex) in item.car_ids">{{item.car_ids.length==itemIndex+1 ?seriesItem.cx:seriesItem.cx+"、"}}</span>
                              <span></span>
                            </div>
                            <div v-else class="sal-con_txt">
                              <span>全系</span>
                            </div>
                          </li>
                          <li  style="clear:both;">
                            <div class="sal-con-tit">
                              抵扣券数量：
                            </div>
                            <div class="sal-con_txt">
                              <el-input v-model="item.tmpCount" ></el-input>
                            </div>
                          </li>
                          <li>
                            <div class="sal-con-tit">
                              创建日期：
                            </div>
                            <div class="sal-con_txt">
                              <span>{{item.create_time}}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="saleticket-footer">
                        <div class="headericon">
                          <img src="./../../assets/images/saleticketsleft.png" class="iconleft" alt="">
                          <img src="./../../assets/images/saleticketsright.png" class="iconright" alt="">
                        </div>
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
import VTipMsg from "./..//tipMsg.vue";
import TestData from "./../../util/TestData"
import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
//import ElRow from "element-ui/packages/row/src/row";
//import ElCol from "element-ui/packages/col/src/col";
export default {
  data () {
    return {
        dialogTableVisible:false,
        exceptIdArray:[],
        listObj:[],
        ticketName:'',
        labelPosition:'left',
        testData:[{ischecked:false,id:12},{ischecked:false,id:23},{ischecked:false,id:34}]
    }
  },
  components :{
//    ElCol,
//    ElRow,
    ElInput,
    VTipMsg
  },
  created () {

  },
  mounted (){
  },
  methods:{
    searchTickets(){
      this.requestAddTicketList();
    },
    checkCP(idx,id){
      if(this.testData[idx].ischecked){
        this.testData[idx].ischecked = false;
        for(var i = 0; i< this.exceptIdArray.length;i++){
          if(this.exceptIdArray[i] == id){
            this.exceptIdArray.splice(i,1);
            break;
          }
        }
      }else{
        this.testData[idx].ischecked = true;
        this.exceptIdArray.push(id);
      }
    },
    /**
     * 显示新增抵扣券模态框
     * @param exceptIdArray
     */
    showDialog (exceptIdArray) {
//        this.exceptIdArray=exceptIdArray;
//        this.requestAddTicketList();
        this.dialogTableVisible=true;
    },
    /**
     * 选择抵扣券
     * @param id
     */
    checkTicket (id,checked){
        if(id){
          for(let i=0;i<this.listObj.length;i++){
            if(this.listObj[i].id==id){
                this.listObj[i].tmpChecked = checked;
                this.listObj.splice(i,1,this.listObj[i]);
                console.log("find--->", this.listObj[i].tmpChecked)
                break;
            }
          }
        }
    },
    /**
     * 过滤已选择抵扣券1
     * @param listObj
     * @returns {Array}
     */
    filterExceptId (listObj) {
        let newListObjArray = [] ;
        for(let i=0;i<listObj.length;i++){
            if(!this.exceptIdArray.includes(listObj[i].id)){
                newListObjArray.push(listObj[i]);
            }
        }
        return newListObjArray;
    },
    /**
     * 请求可选抵扣券列表
     */
    requestAddTicketList () {
//      let param = {activityId:this.activityId};
//      this.activityInfo=TestData.sedKill_checked_ticket_data.result;
//        let resData = TestData.sedKill_newTicket_data;
//        this.listObj = this.filterExceptId(resData);
//      console.log(this.listObj);
//      return;
      let param  = {coupon_name:this.ticketName,pageSize:1000}
      Api.cp_activity_filter_coupon(param)
        .then(res => {
          if (res.status == true) {
            this.listObj = res.result;
            this.addTmpCountForTicketList();
          }else {
            this.$refs.tipMsgRef.showTipMsg({
              msg:res.message,
              type:"error"
            });
          }
        }).catch(err => {

      });
    },
    addTmpCountForTicketList (){
        for(let i = 0 ;i<this.listObj.length;i++){
            this.listObj[i].tmpCount=0;
        }
        console.log(this.listObj);
    },
    /**
     * 获取已选择的抵扣券列表
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
      console.log("save");
      let checkedTicketArray=this.getCheckedTicket();
      console.log(checkedTicketArray);
      if(checkedTicketArray.length+this.exceptIdArray.length<=3){
            this.$emit("call",checkedTicketArray)
            this.dialogTableVisible=false;
            this.listObj=[];
      }else{
        this.$refs.tipMsgRef.showTipMsg({
          msg:"活动绑定的抵扣券数量已经超过101",
          type:"error"
        });
      }
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
