<template>
  <div class="lgs_list">
    <ul class="t_form" style="margin-bottom: 20px;">
      <li>
        <!--<input type="text" placeholder="请输入流水号" class="common-input-style c-mr">-->
        <label for="lgs_orderNum">订单流水号</label>
        <!--获取文本框的值的方法两种一，v-model；二，ref-->
        <input type="text" placeholder="请输入流水号" class="" id="lgs_orderNum" style="width: 190px; padding-left:4px;border-radius: 4px;" v-model="orderNum" >
        <!--<input type="text" placeholder="请输入流水号" class="" id="lgs_orderNum" style="width: 190px;" ref="input1" >-->
      </li>
      <li>
        <button class="el-button el-button--primary" v-on:click="lgs_search_fun">查 询</button>
        <button class="el-button el-button--default" v-on:click="lgs_reset_fun">重 置</button>
      </li>
    </ul>
    <hr class="hr_line">
    <el-table class="table_min_height" v-bind:data="tableData" border style="width: 100%;margin-top: 20px;">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="globalOrderNum" label="订单流水号" width="310"  align="center"></el-table-column>
      <el-table-column prop="operationUser" label="操作人" width="180" align="center"></el-table-column>
      <el-table-column prop="operationType" label="操作动作" align="center" width="260"></el-table-column>
      <el-table-column prop="description" label="备注" align="center"  width="460"></el-table-column>
      <el-table-column prop="createTime" label="时间" v-bind:formatter="lgs_date" align="center" width="308"></el-table-column>
    </el-table>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>

<script>
  import VHeader from "./../../components/header";
  import VTipMsg from './../../components/tipMsg.vue';
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import api from './../../fetch/api';
  export default{
    name:"app",
    data(){
      return {
        orderNum:"",
        //timeChange:'',
        currentPage:1,
        pagesize:5,
        totalRow:0,
        pageSizes:[5,10,15,20],
        tableData:[],
        input1:""
        //loadData
      }
    },
    created (){
      this.lgs_search_fun();
      this.lgs_reset_fun();
    },
    components :{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    methods :{
      lgs_date (row, column, cellValue) {//时间转换
          return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");;
      },
      lgs_search_fun: function(){//与置空方法一样
        //this.tableData = res.data;
        let param ={globalOrderNum:this.orderNum,currrentPage:this.currentPage};
        //let param ={globalOrderNum:this.$refs.input1.value,currrentPage:this.currentPage};
          api.lgs_orderNum (param)
            .then(res =>{
                if(res.status==1){
                  this.tableData=res.result;
                  this.pagesize=10;
                  this.totalRow=res.totalRow;
                }
//                else{
//                  this.$refs.tipMsgRef.showTipMsg({
//                    msg:res.message,
//                    type:'error',
//                    param:{test:1}
//                  });
//                }
                //console.log(res.result[0].createTime);
            }).catch(err => {
                console.log(err);
          });
      },
//      置空的方法一，获取v-model this.orderNum="";，二，ref，this.$refs.input1.value="";
      lgs_reset_fun:function(){
          //console.log(this.$refs.input1.value);
        //this.$refs.input1.value="";
        this.orderNum="";
        this.lgs_search_fun();
        this.tableData=[];
      }
    }
  }
</script>
