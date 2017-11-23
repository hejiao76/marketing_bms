<template>
  <div class="con_list">
    <!--<h5>专线公司</h5>-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="状态">
        <el-select v-model="store" placeholder="请选择">
          <el-option :value="1" label="未选仓"></el-option>
          <el-option :value="2" label="已选仓"></el-option>
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
    <hr class="hr_line">
    <el-table :data="tableData" border style="width: 100%; min-height: 440px">
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
      <el-table-column prop="managerName" label="管理员" align="center"></el-table-column>
      <el-table-column prop="companyContent" :formatter="companyContentFormatter" label="入驻模块" align="center">
      </el-table-column>
      <el-table-column prop="storeCodes" :formatter="storeCodesFormatter" label="合作仓" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="getLineDetailDialog(scope.$index, scope.row)">{{scope.row.storeCodes==null? '设为合作商':'修改'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-footer ds_oq_pageF">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="tpageSize" layout="total, prev, pager, next, jumper" :total="totalRow"></el-pagination>
    </div>

    <el-dialog title="专线公司" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" labelWidth="100px" class="demo-ruleForm">
        <el-form-item label="仓库编码" prop="stores">
          <el-tag :key="tag" v-for="tag in ruleForm.storeCodes" :closable="true" :close-transition="false" @close="handleClose(tag)">{{tag}}</el-tag>
          <el-input class="input-new-tag" v-model="inputValue" ref="saveTagInput"></el-input>
          <el-button class="button-new-tag" size="small" @click="handleInputConfirm">+添加</el-button>
            <!--<span v-for="store in ruleForm.stores">{{store}}&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
        </el-form-item>
        <el-form-item label="合同期限" prop="agreementTerm">
          <el-date-picker type="date" v-model="ruleForm.agreementTerm" format="yyyy-MM-dd" :disabled="readonly"></el-date-picker>
          <el-button @click="readonly=false">续期</el-button>
          <el-button v-model="ruleForm.agreementStatus" @click="ruleForm.agreementStatus==1?ruleForm.agreementStatus=0:ruleForm.agreementStatus=1">{{ruleForm.agreementStatus==1?'关闭合作':'开启合作'}}</el-button>
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
        <el-form-item label="保险费率" prop="premiumRatez">
          <el-input type="number" v-model="ruleForm.premiumRatez"></el-input>%(必填且文本框内只能输入阿拉伯数字)
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCompayConfigureInfo('ruleForm')">确 定</el-button>
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
        store: '',
        storeCodesJson: '',
        dialogFormVisible: false,
        ruleForm: {
          store: '',
          storeCodes: [],
          expressName: '',
          agreementTermStr: '',
          isInvoice: 1,
          taxForCompany: 1,
          taxPoint: '',
          premiumRatez: '',
          agreementStatus: 1
        },
        inputValue: '',
        inputVisible: false,
        expressNames: [],
        provinceDefault: '',
        cityDefault: '',
        areaDefault: '',
        rules: {
//          storeCodes: [
//            { required: true, message: '请输入仓库编号', trigger: 'blur' }
//          ],
//          agreementTerm: [
//            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
//          ],
////          isInvoice: [
////            { type: 'array', required: true, message: '请选择是否开发票', trigger: 'change' }
////          ],
////          resource: [
////            { required: true, message: '请选择活动资源', trigger: 'change' }
////          ],
//          taxPoint: [
//            { required: true, message: '请输入税点', trigger: 'blur' }
//          ],
//          premiumRate: [
//            { required: true, message: '请输入保险费率', trigger: 'blur' }
//          ]
        },
        readonly: true,
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
        //专线公司
      companyList: function (params) {
        params = {currentPage: this.currentPage, paramName: this.companyName, includeStore: this.store};
        api_lgts_setting.base_line(params)
          .then(res => {
            if (res.status == 1){
              this.tableData = res.result;
              this.storeCodesJson = res.result.storeCodes;
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
      storeCodesFormatter(row, column){
          let storeCode = '';
          if(row.storeCodes == null){
            return '未选仓';
          }else {
            for(let i=0;i<row.storeCodes.length; i++){
              if(i==row.storeCodes.length-1){
                storeCode += row.storeCodes[i];
              }else {
                storeCode += row.storeCodes[i]+', ';
              }
            }
            return storeCode;
          }
      },
      //添加或删除仓库编号
      handleClose(tag){
        this.ruleForm.storeCodes.splice(this.ruleForm.storeCodes.indexOf(tag), 1);
      },
      showInput(){
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        })
      },
      handleInputConfirm(){
        let inputValue = this.inputValue;
        if(this.ruleForm.storeCodes == null){
            this.ruleForm.storeCodes= new Array(0);
        }
        if(inputValue){
            this.ruleForm.storeCodes.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      //获取专线公司配置信息
      getLineDetailDialog(row, column){
        api_lgts_setting.base_line_getInfo({compInfoId: column.compInfoId})
          .then(res => {
            if (res.status == 1){
              this.ruleForm = res.result;
              if(res.result.isInvoice == null){
                this.ruleForm.isInvoice = 1
              }
              if(res.result.taxForCompany == null){
                this.ruleForm.taxForCompany = 1
              }
              if(res.result.agreementStatus == null){
                this.ruleForm.agreementStatus = 1
              }
              if (res.result.agreementTerm == null){
                this.readonly = false;
              }else {
                this.readonly = true;
              }
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          }).catch(error => {
        })
        this.dialogFormVisible = true;
      },
      //翻页
      handleCurrentChange(val){
        this.currentPage = val;
        this.companyList();
      },
      //搜索
      search: function(params){
        params = {pageNum: this.currentPage, name: this.companyName, type: this.store};
        this.companyList(params);
      },
      //重置
      searchReset: function(){
        this.companyName = '';
        this.store = '';
        this.companyList();
      },
      //保存专线配置信息
      saveCompayConfigureInfo(formName){
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
        let params = {
          compInfoId: this.ruleForm.compInfoId,
//          storeCodes: this.ruleForm.storeCodes,
//          agreementTerm: util.toDateString(this.ruleForm.agreementTerm),
          agreementStatus: this.ruleForm.agreementStatus,
          isInvoice: this.ruleForm.isInvoice,
          taxForCompany: this.ruleForm.taxForCompany,
//          taxPoint: this.ruleForm.taxPoint*100,
//          premiumRate: this.ruleForm.premiumRatez*1000,
        }
        if (this.ruleForm.storeCodes && this.ruleForm.storeCodes.length > 0){
          params.storeCodes = this.ruleForm.storeCodes
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请输入仓库编码',
            type: 'error'
          })
          return false;
        }
        if (this.ruleForm.agreementTerm){
          params.agreementTerm = util.toDateString(this.ruleForm.agreementTerm)
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请选择合同期限',
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
          params.taxPoint = this.ruleForm.taxPoint*100
        }
        if (!this.ruleForm.premiumRatez){
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请输入保险费率',
            type: 'error'
          })
          return false;
        }else if(!(/^[1-9][0-9]{0,1}$/.test(this.ruleForm.premiumRatez))){
          this.$refs.tipMsgRef.showTipMsg({
            msg: '保险费率只能输入1-99之间的整数',
            type: 'error'
          })
          return false;
        }else{
          params.premiumRate = this.ruleForm.premiumRatez*1000
        }
          api_lgts_setting.base_line_saveInfo(util.getPostParam(params))
            .then(res => {
              if(res.status == 1){
                this.$refs.tipMsgRef.showTipMsg({
                  msg: res.message,
                  type: 'success',
                  scope: this,
                  callback: function(){
                    this.dialogFormVisible = false;
                    this.companyList();
                  }
                })
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg: res.message,
                  type: 'error',
                })
              }
//              })
//          }
        })
//        this.ruleForm.premiumRate = this.ruleForm.premiumRatez*1000;
//        this.ruleForm.taxPoint = this.ruleForm.taxPoint*100;
//        this.ruleForm.agreementTerm = util.toDateString(this.ruleForm.agreementTerm);
//        delete this.ruleForm.agreementTermStr;
//        this.ruleForm.agreementStatus = 1;
      }
    }
  }


</script>
<style>
  .el-table .cell {
    white-space: nowrap;
  }
</style>
