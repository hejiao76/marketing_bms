<template>
  <div class="con_list">
    <!--<h5>同城众包</h5>-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="状态">
        <el-select v-model="type" placeholder="请选择">
          <el-option :value="2" label="未选仓"></el-option>
          <el-option :value="1" label="已选仓"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="companyName" placeholder="公司名称 管理员检索"></el-input>
      </el-form-item>
      <el-form-item class="fr">
        <el-button type="primary" @click="search">查 询</el-button>
        <el-button @click="searchReset">重 置</el-button>
      </el-form-item>
    </el-form>
    <!--<ul class="t_form">-->
      <!--<li>-->
        <!--<button class="btn_b btn_bass mr10" @click="search">查 询</button>-->
      <!--</li>-->
    <!--</ul>-->
    <hr class="hr_line">
    <el-table :data="tableData" border style="width: 100%; min-height: 440px;">
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
      <el-table-column prop="admin" label="管理员" align="center"></el-table-column>
      <el-table-column prop="companyContent" :formatter="companyContentFormatter" label="入驻模块" align="center">
      </el-table-column>
      <el-table-column prop="store" :formatter="storeFormatter" label="合作仓" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="getCompanyStoreByIdDialog(scope.$index, scope.row)">{{scope.row.store==null? '设为合作商':'修改'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-footer ds_oq_pageF">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="tpageSize" layout="total, prev, pager, next, jumper" :total="totalRow"></el-pagination>
    </div>

    <el-dialog title="快递合作商配置" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" labelWidth="100px" class="demo-ruleForm">
        <el-form-item label="仓库编码">
          <el-autocomplete v-model="autoStorageNo" :fetch-suggestions="querySearchAsync" placeholder="指定合作仓库编码"></el-autocomplete>
          <!--<el-input v-model="ruleForm.store"></el-input>-->
          <!--<el-input v-if="ruleForm.store!=''" class="input-new-tag" v-model="ruleForm.store"></el-input>-->
        </el-form-item>
        <el-form-item label="开发票" prop="isInvoice">
          <el-radio-group v-model="ruleForm.isInvoice">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="承税方" prop="taxForCompany">
          <el-radio-group v-model="ruleForm.taxForCompany">
            <el-radio :label="1">我方</el-radio>
            <el-radio :label="2">对方</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="税点" prop="taxPoint">
          <el-input type="number" v-model="ruleForm.taxPoint"></el-input>%(必填且文本框内只能输入阿拉伯数字)
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="saveCompayStore">确 定</el-button>
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
        tpageSize: 10,
        totalRow: 0,
        companyName: '',
        type: '',
        storeJson: '',
        dialogFormVisible: false,
        ruleForm: {
          compInfoId: 0,
//          list:{},
          storageNo:'',
          storeCode:'',
          isInvoice: 0,
          taxForCompany: 1,
          taxPoint: ''
        },
        autoStorageNo: '',
        inputValue: '',
        inputVisible: false,
        expressNames: [],
        provinceDefault: '',
        cityDefault: '',
        areaDefault: '',
        rules: {
//          store: [
//            { required: true, message: '请选择仓库', trigger: 'blur' }
//          ],
//          isInvoice: [
//            { required: true, message: '请选择是否开发票', trigger: 'change' }
//          ],
//          taxForCompany: [
//            { required: true, message: '请选择承税方', trigger: 'change' }
//          ],
//          taxPoint: [
//            { required: true, message: '请输入税点', trigger: 'blur' }
//          ]
        },
        token: {token: localStorage.getItem("token")},
        pCode: 0,
        provinces: [],
        citys: {},
        areas: {},
        obj: {}
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
      //获取同城众包
      companyList: function (params) {
        params = {currentPage: this.currentPage, name: this.companyName, type: this.type};
        api_lgts_setting.base_city(params)
          .then(res => {
            if (res.status == 1){
              this.tableData = res.result;
              this.storeJson = res.result.store;
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
      companyContentFormatter(row, column) {
        return Final.CHECK_TYPES[row.companyContent-1].label;
      },
      storeFormatter(row, column){
        let storeCode = '';
        if(row.store == null){
          return '未选仓';
        }else {
          return row.store;
        }
      },
      //获取同城众包与合作商配置信息
      getCompanyStoreByIdDialog(row, column){
        if(column.store != null){
          api_lgts_setting.base_city_getInfo({compInfoId: column.id})
            .then(res => {
              if (res.status == 1){
                this.ruleForm = res.result;
                for(let i=0;i<res.result.list.length;i++){
//                  this.ruleForm.storeCode = res.result.list[i].storeCode;
                  this.autoStorageNo = res.result.list[i].storeCode;
                }
                this.ruleForm.compInfoId = column.id
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg: res.message,
                  type: 'error'
                })
              }
            }).catch(error => {
          })
        }else{
          if(this.$refs['ruleForm']){
            this.$refs['ruleForm'].resetFields();
            this.autoStorageNo = '';
          }
        }
        this.ruleForm.compInfoId = column.id
        this.dialogFormVisible = true;
      },
      //翻页
      handleCurrentChange(val){
        this.currentPage = val;
        this.companyList();
      },
      //搜索
      search: function(params){
        params = {pageNum: this.currentPage, name: this.companyName, type: this.type};
        this.companyList(params);
      },
      //重置
      searchReset: function(){
        this.companyName = '';
        this.type = ''
        this.companyList();
      },
      //查找合作仓库编码
      querySearchAsync(queryString, cb){
        api_lgts_setting.base_store_code({store: queryString})
          .then(res => {
            if(res.status == 1){
              for(let i=0; i<res.result.length; i++){
                res.result[i]['value'] = res.result[i]['storageNo'];
              }
//              let results = queryString ? res.result.filter(this.createStateFilter(queryString)) : res.result;
              cb(res.result);
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
          return (state.value.indexOf(queryString.toUpperCase()) === 0);
        }
      },
//      handleSelect(item) {
//        this.ruleForm.storageNo = item.storageNo;
//      },
      //保存合作商配置信息
      saveCompayStore(){
        if(this.ruleForm.list){
          for(let i=0;i<this.ruleForm.list.length;i++){
            this.ruleForm.store = this.ruleForm.list[i].storeCode;
          }
        }
        let params = {
          compInfoId: this.ruleForm.compInfoId,
//          store: this.ruleForm.store,
          isInvoice: this.ruleForm.isInvoice,
          taxForCompany: this.ruleForm.taxForCompany,
//          taxPoint: this.ruleForm.taxPoint*100
        };
        if (this.autoStorageNo){
          params.store = this.autoStorageNo
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请选择仓库编码',
            type: 'error'
          })
          return false;
        }
        if (!this.ruleForm.taxPoint){
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请输入税点',
            type: 'error'
          })
          return false;
        }else if(!(/^[1-9][0-9]{0,1}$/.test(this.ruleForm.taxPoint))){
          this.$refs.tipMsgRef.showTipMsg({
            msg: '税点只能输入1-99之间的整数',
            type: 'error'
          })
          return false;
        }else{
          params.taxPoint = this.ruleForm.taxPoint*100;
        }
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
            api_lgts_setting.base_city_saveInfo(util.getPostParam(params))
              .then(res => {
                if(res.status == 1){
                  this.$refs.tipMsgRef.showTipMsg({
                    msg: res.message,
                    type: 'success',
                    scope: this,
                    callback: function () {
                      this.companyList();
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
//          } else {
//            return false;
//          }
//        });
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
