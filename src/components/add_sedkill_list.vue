<template>
  <div>

    <el-dialog class="choose-hd" center title="选择秒杀券" :visible.sync="dialogTableVisible">
      <div class="choose-copntent">
        <div class="choose-copntent_body">
          <ul>
            <li v-for="item in listObj">
              <div class="newhd-header">
                <p class="newhd-tit">{{item.name}}</p>
                <div class="newhd-time">
                  <p>有效时间：{{item.starTime}}至{{item.endTime}}</p>
                  <p>创建时间：{{item.creatTime}}</p>
                </div>
              </div>
              <div class="newhd-content">
                <a v-if="!item.tmpChecked" @click="checkTicket(item.ticketId,true)" href="javascript:;">选择绑定</a>
                <a v-if="item.tmpChecked" @click="checkTicket(item.ticketId,false)" href="javascript:;">已选择</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureSelect" type="primary">确 定</el-button>
        <el-button @click="cancelSelect">取 消</el-button>
      </div>
    </el-dialog>
    <!--<div class="mask" style="z-index: 12000;"></div>-->
      <!--<div class="choose-hd">-->

          <!--<div class="choose-hd_close" @click="closeAddList">-->
            <!--<img src="./../assets/images/choose-hd-close.png" alt="">-->
          <!--</div>-->
          <!--<div class="choose-hd_header">选择秒杀券</div>-->
          <!--<div class="choose-copntent">-->
            <!--<div class="choose-copntent_body">-->
              <!--<ul>-->
                <!--<li v-for="item in listobj">-->
                  <!--<div class="newhd-header">-->
                    <!--<p class="newhd-tit">{{item.name}}</p>-->
                    <!--<div class="newhd-time">-->
                      <!--<p>有效时间：{{item.starTime}}至{{item.endTime}}</p>-->
                      <!--<p>创建时间：{{item.creatTime}}</p>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="newhd-content">-->
                    <!--<a href="javascript:;">选择绑定</a>-->
                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="choose-footer">-->
            <!--<div class="row">-->
              <!--<div class="col-md-12 text-center">-->
                <!--<el-button type="primary">确认取消</el-button>-->
                <!--<el-button>默认按钮</el-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
      <!--</div>-->
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
import Api from "./../fetch/api"
import Final from "./../util/Final"
import VTipMsg from "./tipMsg.vue";
import TestData from "./../util/TestData"
export default {
  data () {
    return {
        dialogTableVisible:false,
        exceptIdArray:[],
        listObj:[]
    }
  },
  components :{
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
        this.exceptIdArray=exceptIdArray;
        this.requestAddTicketList();
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
      console.log("save");
      let checkedTicketArray=this.getCheckedTicket();
      if(checkedTicketArray.length+this.exceptIdArray.length<=3){
            this.$emit("call",checkedTicketArray)
            this.dialogTableVisible=false;
            this.listObj=[];
      }else{
        this.$refs.tipMsgRef.showTipMsg({
          msg:"活动绑定的秒杀券数量已经超过101个",
          type:"error"
        });
      }
    },
    /**
     * 取消选择
     */
    cancelSelect(){
      this.dialogTableVisible=false;
      this.listObj=[];
    },
    clearTmpStatus(){

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 .choose-hd .el-dialog--center .el-dialog__header {
   padding-top:10px;
 }
</style>
