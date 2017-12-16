<template>
  <div>

    <el-dialog class="choose-hd" center title="添加活动抵扣券" :visible.sync="dialogTableVisible" width="931px" >
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
            <el-row class="this_box_wrop" style="padding-top: 20px;">
                <!--<el-col style=" width: 260px;" >-->
                    <div class="saleticket-list"v-for="(item,index) in listObj">
                      <div v-if="validSeriesInclude(item)" class="isfill">
                      <!--<div  class="isfill">-->
                        <img class="cur" v-if="!item.tmpChecked" @click="checkTicket(item,true)"  src="./../../assets/images/fillnone.png" alt="">
                        <img class="cur" v-if="item.tmpChecked" @click="checkTicket(item,false)" src="./../../assets/images/fillin.png" alt="">
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
                            <div v-if="item.type!=1" class="sal-con_txt" style="white-space: nowrap;width:160px;overflow: hidden;text-overflow: ellipsis;" >
                              <span >{{item.serialName}}</span>
                              <span></span>
                            </div>
                            <div v-else class="sal-con_txt">
                              <span>全系</span>
                            </div>
                          </li>
                          <li>
                            <div class="sal-con-tit">
                              抵扣券数量：
                            </div>
                            <div class="sal-con_txt">
                              <!--<el-input v-model="item.num" ></el-input>-->
                              <el-input-number :controls="false" v-model="item.num" label="请输入抵扣券数量"></el-input-number>
                            </div>
                          </li>
                          <li>
                            <div class="sal-con-tit">
                              创建日期：
                            </div>
                            <div class="sal-con_txt">
                              <span>{{item.createTime}}</span>
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
import VTipMsg from "./../tipMsg.vue";
import * as util from "./../../util/util"
import TestData from "./../../util/TestData"
export default {
  props:["activityInfo"],
  data () {
    return {
        dialogTableVisible:false,
        exceptIdArray:[],
        listObj:[],
        ticketName:'',
        labelPosition:'left',
        testData:[{ischecked:false,id:12},{ischecked:false,id:23},{ischecked:false,id:34}],
        tmpSeriesIds:{}, //已选择车系ID
        maxTicketCount:10 //最大可选抵扣券数量
    }
  },
  components :{
    VTipMsg
  },
  created () {

  },
  mounted (){
  },
  methods:{
    /**
     * 选择可选抵扣券
     */
    validSeriesInclude (item){
        let serialIdsArray=item.serialIds.split(",");
        let validStatus=true;
        for(let i=0;i<serialIdsArray.length;i++){
            if(!item.tmpChecked && this.tmpSeriesIds["series_"+item[i]]){
                validStatus=false;
                break;
            }
        }
        return validStatus;

    },
    /**
     * 移除已选择抵扣券包含车系
     */
    removeSeriesTmp (item){
      let itemArray=item.serialIds.split(",");
      if(item.serialType == 2){
        for(let i = 0 ; i< itemArray.length ; i ++){
          delete this.tmpSeriesIds["series_"+item[i]];
        }
      }
    },
    /**
     * 添加已选择抵扣券包含车系
     */
    addSeriesTmp (item){
      let itemArray=item.serialIds.split(",");
      if(item.serialType == 2){
        for(let i = 0 ; i< itemArray.length ; i ++){
          this.tmpSeriesIds["series_"+item[i]] = item[i]
        }
      }
    },
    /**
     * 请求可选抵扣券
     */
    searchTickets(){
      this.requestAddTicketList();
    },
    /**
     * 显示新增抵扣券模态框
     * @param exceptIdArray
     */
    showDialog (exceptIdArray) {
        this.exceptIdArray=exceptIdArray;
//        this.requestAddTicketList();
        this.dialogTableVisible=true;
    },
    /**
     * 选择抵扣券
     * @param id
     */
    checkTicket (item,checked){
        if(item.id){
          let id =item.id;
          if(!checked){
             this.removeSeriesTmp(item);
          }
          for(let i=0;i<this.listObj.length;i++){
            if(this.listObj[i].id==id){
               // this.tmpSeriesIds
              if(checked) {
                this.addSeriesTmp(this.listObj[i]);
              }
                this.listObj[i].tmpChecked = checked;
                this.listObj.splice(i,1,this.listObj[i]);
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
     * 日期转1字符串
     * @param date
     */
    formatDateToString (date){
      if(typeof date == 'object'){
        return util.toFullDateString(date.getTime());
      }else{
        return date;
      }
    },
    /**
     * 请求可选抵扣券列表
     */
    requestAddTicketList () {
      let param  = {couponName:this.ticketName,pageSize:1000,activityEndtime:this.formatDateToString(this.activityInfo.endTime)}
      Api.cp_activity_filter_coupon(param)
        .then(res => {
          if (res.status == true) {
//            this.listObj = res.result;
            this.listObj = this.filterExceptId(res.result);
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
            this.listObj[i].num=0;
        }
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
    validTickRule (checkedTicketArray){
        let msg=""
        if(checkedTicketArray.length<=0){
            msg = "请选择抵扣券"
        }else if(checkedTicketArray.length+this.exceptIdArray.length>this.maxTicketCount){
            msg="活动绑定的抵扣券数量已经超过10个"
        }else{
          for(let i = 0 ; i<checkedTicketArray.length;i++){
              if(checkedTicketArray[i].num<=0){
                msg="已选择抵扣券未填写抵扣券数量"; //111111111111
                break;
              }
            }
        }
        if(msg){
          this.$message({
            type:'error',
            message:msg,
            duration:'1500'
          });
          return false;
        }else {
            return true;
        }
    },
    /**
     * 确认选择
     */
    sureSelect () {
      let checkedTicketArray=this.getCheckedTicket();
        if(this.validTickRule(checkedTicketArray)){
          this.$emit("call",checkedTicketArray);
          this.dialogTableVisible=false;
          this.listObj=[];
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
<style scope>
 .choose-hd .el-dialog--center .el-dialog__header {
   padding-top:10px;
 }
 /*.el-dialog{*/
   /*width: 59%;*/
 /*}*/

 /*.saleticket-list:nth-child(3n+0)*/
 /*{*/
   /*margin-right:0;*/
 /*}*/
  .saleticket-content .el-input-number .el-input{
      width:110px;
    line-height:20px;
  }
 .saleticket-content .el-input-number .el-input input{
   border-radius:0px;
 }
</style>
<style>

</style>
