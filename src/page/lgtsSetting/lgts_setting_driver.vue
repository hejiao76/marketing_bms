<template>
  <div class="con_list">
    <!--<h5>司机账号绑定</h5>-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="仓库编码">
        <el-autocomplete v-model="storageNo" :fetch-suggestions="querySearchAsync" placeholder="指定合作仓库编码"></el-autocomplete>
      </el-form-item>
      <el-form-item label="司机账号">
        <el-input v-model="userPhone" placeholder="司机手机号"></el-input>
      </el-form-item>
      <el-form-item class="fr">
        <el-button type="primary" @click="bindDriver">绑 定</el-button>
      </el-form-item>
    </el-form>
    <hr class="hr_line">
    <el-table :data="tableData" border style="width: 100%; min-height: 440px;">
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column prop="storageNo" label="仓库编码" align="center"></el-table-column>
      <el-table-column prop="name" label="司机姓名" align="center"></el-table-column>
      <el-table-column prop="userPhone" label="司机账号" align="center"></el-table-column>
      <!--<el-table-column prop="companyContent" :formatter="companyContentFormatter" label="入驻模块">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="store" :formatter="storeFormatter" label="合作仓"></el-table-column>-->
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="delDriverDialog(scope.$index, scope.row)">删除</el-button>
          <el-button type="text" @click="editDriverDialog(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-footer ds_oq_pageF">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="totalRow"></el-pagination>
    </div>

    <el-dialog title="综合仓司机修改" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" labelWidth="100px" class="demo-ruleForm">
        <el-form-item label="新司机手机号" prop="userPhone">
          <el-input v-model="ruleForm.userPhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="saveDriver">确 定</el-button>
      </div>
    </el-dialog>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>
<script>
  import api_lgts_setting from "./../../fetch/api_lgts_setting"
    import Final from "./../../util/Final";
  import * as util from "./../../util/util"
  import VTipMsg from "./../../components/tipMsg"
  export default {
    name:"app",
    data() {
      return {
        tableData: [],
        currentPage: 1,
//        pageSize: 10,
        totalRow: 0,
        storageNo: '',
        userPhone: '',
        dialogFormVisible: false,
        ruleForm: {
        },
        rules: {
        },
      }
    },
    created (){
        this.companyList();
    },
    props: {
      rowClick:Function,
//      tableData:Array,    //表格数据s
      columns:Array,      //表格列配置数据,{vlaue:对应数据对象中的属性，label：对应的是标题文字，className：对应的是列的样式类名}
      totalCount:Number,  //表格数据总数
      pageSizes:Array,    //决定每页显示的条数[10,15,20,25]
      checkBox:Boolean,  //决定是否显示复选框
      tableHeight:Number,  //分页列表的高度
      pageSize:Number,
      fit: false,
      sortChange:Function //用户点击列表头进行排序 { column, prop, order }
    },
    components :{
      VTipMsg
    },
    watch:{
      pageSize:"changeSize"
    },
    methods : {
      //查找合作仓库编号
      querySearchAsync(queryString, cb){
        api_lgts_setting.base_store_code({store: queryString})
          .then(res => {
            if(res.status == 1){
              for(let i=0; i<res.result.length; i++){
                res.result[i]['value'] = res.result[i]['storageNo'];
              }
              let results = res.result;// queryString ? res.result.filter(this.createStateFilter(queryString)) : res.result;
              cb(results);
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          })
      },
      createStateFilter(queryString){
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        }
      },
        //获取综合仓绑定的司机列表
      companyList: function (params) {
        params = {currentPage: this.currentPage, pageSize: 10};
        api_lgts_setting.base_driver(params)
          .then(res => {
            if (res.status == 1){
              this.tableData = res.result;
              this.totalRow = res.totalRow;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          }).catch(error => {
        })
      },
      //综合仓司机绑定
      bindDriver(){
        let params = {};
        if (this.storageNo){
          params.storageNo = this.storageNo
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请选择合作仓库编码',
            type: 'error'
          })
          return false;
        }
        if (this.userPhone){
          params.userPhone = this.userPhone
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请输入司机手机号',
            type: 'error'
          })
          return false;
        }
        api_lgts_setting.base_driver_bind(params)
          .then(res=>{
            if(res.status == 1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
                scope: this,
                callback: function(){
                  this.storageNo = '';
                  this.userPhone = '';
                  this.companyList();
                }
              })
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          })
      },
      //综合仓司机删除
      delDriverDialog(row, column){
        api_lgts_setting.base_driver_del({storageNo: column.storageNo, userPhone: column.userPhone})
          .then(res=>{
            if(res.status == 1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
                scope: this,
                callback: this.companyList
              })
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          })
      },
      //综合仓司机信息查询
      editDriverDialog(row, column){
        this.ruleForm.storageNo = column.storageNo;
        this.ruleForm.oldUserPhone  = column.userPhone;
        this.dialogFormVisible = true;
      },
      //翻页
      handleCurrentChange(val){
        this.currentPage = val;
        this.companyList();
      },
      //综合仓司机修改
      saveDriver(){
        if (!this.ruleForm.userPhone){
          this.$refs.tipMsgRef.showTipMsg({
          msg: '司机手机号输入错误',
          type: 'error'
        })
          return false;
        }
        api_lgts_setting.base_driver_edit(this.ruleForm)
          .then(res => {
            if(res.status == 1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
                scope: this,
                callback: function(){
                  this.companyList();
                  this.$refs[formName].resetFields();
                  this.dialogFormVisible = false;
                }
              })
            }else{
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      }
    }
  }


</script>
<style>
  .el-table .cell {
    white-space: nowrap;
  }
</style>
