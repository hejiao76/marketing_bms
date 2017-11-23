<template>
  <div class="con_list">
    <!--<h5>快递合作商</h5>-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="状态">
        <el-select v-model="storeCodes" placeholder="请选择">
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
    <el-table :data="tableData" border style="width: 100%; min-height: 440px;">
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
      <el-table-column prop="userName" label="管理员" align="center"></el-table-column>
      <el-table-column prop="companyContent" :formatter="companyContentFormatter" label="入驻模块" align="center">
      </el-table-column>
      <el-table-column prop="storeCodes" :formatter="storeCodesFormatter" label="合作仓" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="getCompanyConfigureInfoDialog(scope.$index, scope.row)">{{scope.row.storeCodes==null? '设为合作商':'修改'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-footer ds_oq_pageF">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="tpageSize" layout="total, prev, pager, next, jumper" :total="totalRow"></el-pagination>
    </div>

    <el-dialog title="快递合作商配置" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" labelWidth="100px" class="demo-ruleForm">
        <el-form-item label="仓库编码" prop="stores">
          <el-tag :key="tag" v-for="tag in ruleForm.stores" :closable="true" :close-transition="false" @close="handleClose(tag)">{{tag}}</el-tag>
          <el-input class="input-new-tag" v-model="inputValue" ref="saveTagInput"></el-input>
          <el-button class="button-new-tag" size="small" @click="handleInputConfirm">+添加</el-button>
            <!--<span v-for="store in ruleForm.stores">{{store}}&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-col :span="12">-->
            <!--<el-input v-model="ruleForm.store"></el-input>-->
          <!--</el-col>-->
          <!--<el-col :span="3">-->
            <!--<el-button type="primary" @click="addStore">增加</el-button>-->
          <!--</el-col>-->
          <!--<el-col :span="3">-->
            <!--<el-button type="primary">删除</el-button>-->
          <!--</el-col>-->
        <!--</el-form-item>-->
        <el-form-item label="所属企业" prop="expressName">
          <el-col :span="12">
            <el-autocomplete v-model="ruleForm.expressName" @select="handleSelect" :fetch-suggestions="querySearchAsync" :disabled="changeDisabled"></el-autocomplete>
            <!--<el-input v-model="ruleForm.expressName"></el-input>-->
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="changeDisabled=false">修 改</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="取件范围" prop="province">
          <el-select placeholder="省" v-model="ruleForm.province" @change="provinceChange">
            <el-option v-for="item in provinces" :value="item.name"></el-option>
          </el-select>
          <el-select placeholder="市" v-model="ruleForm.city" @change="cityChange">
            <el-option v-for="item in citys" :value="item.name"></el-option>
          </el-select>
          <el-select placeholder="区" v-model="ruleForm.area">
            <el-option v-for="item in areas" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
          <!--<el-form-item prop="city">-->
          <!--<el-select placeholder="市" v-model="ruleForm.city" @change="cityChange">-->
            <!--<el-option v-for="item in citys" :value="item.name"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
            <!--<el-form-item prop="area">-->
          <!--<el-select placeholder="区" v-model="ruleForm.area">-->
            <!--<el-option v-for="item in areas" :value="item.name"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="价格合算">
          <el-upload class="upload-demo fl" :data="token" ref="upload" :file-list="fileList" :on-success="handleAvatarSuccess" :multiple='false' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" action="action/wuliu-web-user/wuliu/company/upload.action">
            <el-button>上传价格表</el-button>
          </el-upload>
          <el-button @click="download" class="ml25">下载标准格式</el-button>
        </el-form-item>
        <el-form-item label="合同期限" prop="agreementTerm">
          <el-date-picker type="date" v-model="ruleForm.agreementTerm" :disabled="readonly"></el-date-picker>
          <el-button @click="readonly=false">续 期</el-button>
          <el-button v-model="ruleForm.status" @click="ruleForm.status==1?ruleForm.status=0:ruleForm.status=1">{{ruleForm.status==1?'关闭合作':'开启合作'}}</el-button>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCompayConfigureInfo">确 定</el-button>
      </div>
    </el-dialog>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>
<script>
//  import * as util from "./../../fetch/fetch"
  import api_lgts_setting from "./../../fetch/api_lgts_setting"
  //  import VHeader from "./../../components/header";
  //  import VLeft from "./../../components/left";
  //  import VConNav from "./../../components/con_nav";
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
        storeCodes: '',
        storeCodesJson: '',
        dialogFormVisible: false,
        ruleForm: {
          store: '',
          stores: {},
          expressName: '',
          expressCode: '',
          province:'',
          city: '',
          area: '',
          offerCode: '',
          agreementTermStr: '',
          isInvoice: '',
          taxForCompany: '',
          taxPoint: ''
        },
        inputValue: '',
        inputVisible: false,
        expressNames: [],
        provinceDefault: '',
        cityDefault: '',
        areaDefault: '',
        rules: {
        },
        token: {token: localStorage.getItem("token")},
        pCode: 0,
        provinces: [],
        citys: [],
        areas: {},
        changeDisabled:true,
        readonly:true,
//        obj: {}
        fileList : []
      }
    },
    created (){
        this.companyInfoList();
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
        //获取快递合作商
      companyInfoList: function (params) {
        params = {pageNum: this.currentPage, param: this.companyName, status: this.storeCodes};
        api_lgts_setting.base_express(params)
          .then(res => {
            this.tableData = res.result;
            this.storeCodesJson = res.result.storeCodes;
            this.totalRow = res.totalRow;
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
            }else{
              storeCode += row.storeCodes[i]+', ';
            }
          }
        }
          return storeCode;
      },
//      addStore(){
//        this.ruleForm.stores.push(this.ruleForm.store);
//        this.ruleForm.store = '';
//      },
      //添加或删除仓库编码
      handleClose(tag){
        this.ruleForm.stores.splice(this.ruleForm.stores.indexOf(tag), 1);
      },
      showInput(){
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        })
      },
      handleInputConfirm(){
        let inputValue = this.inputValue;
        if(inputValue){
          if (this.ruleForm.stores == null){
            this.ruleForm.stores = [];
          }
          this.ruleForm.stores.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleSelect(item) {
        this.ruleForm.expressCode = item.code;
      },
      //修改所属企业
      querySearchAsync(queryString, cb){
        api_lgts_setting.base_express_findExpressList({name: queryString})
          .then(res => {
            if(res.status == 1){
              for(let i=0; i<res.result.length; i++){
                res.result[i]['value'] = res.result[i]['name'];
              }
              let results = queryString ? res.result.filter(this.createStateFilter(queryString)) : res.result;
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
//      handleSelect(item) {
//        console.log(item);
//      },
      //获取合作商配置信息
      getCompanyConfigureInfoDialog(row, column){
        api_lgts_setting.base_express_getInfo({compInfoId: column.id})
          .then(res => {
            if(res.status == 1){
              this.ruleForm = res.result;
              this.ruleForm.taxPoint = res.result.taxPoint*100;
              this.provinceDefault = res.result.province;
              this.cityDefault = res.result.city;
              this.areaDefault = res.result.area;
              if(res.result.isInvoice == null){
                this.ruleForm.isInvoice = 1
              }
              if(res.result.taxForCompany == null){
                this.ruleForm.taxForCompany = 1
              }
              if(res.result.status == null){
                this.ruleForm.status = 1
              }
              if (res.result.agreementTerm == null){
                this.readonly = false;
              }else {
                this.readonly = true;
              }
              if (res.result.expressName == null){
                this.changeDisabled = false;
              }else {
                this.changeDisabled = true;
              }
              if(res.result.offerCode){
                  this.fileList =  [{name: res.result.offerCode}]	;
              }else {
                  this.fileList=[];
              }
              api_lgts_setting.base_express_province({type: 1, pCode: 0})
                .then(res =>{
                  if (res.status == 1){
                    this.provinces = res.result;
                    let code = 0;
                    if (this.provinceDefault){
                      this.provinceChange(this.provinceDefault);
                    }
                  }else {
                    this.$refs.tipMsgRef.showTipMsg({
                      msg: res.message,
                      type: 'error'
                    })
                  }
                })
            }else {
              this.dialogFormVisible = false;
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          }).catch(error => {
        })
        this.dialogFormVisible = true;
      },
      //联动省市区
      provinceChange(ele){
        if (ele){
          let obj = {}
          obj = (this.provinces).find((item) => {
            return item.name === ele;
          })
          if(obj){
            api_lgts_setting.base_express_province({type: 2, pCode: obj.code})
              .then(res => {
                if(res.status == 1){
                  this.citys = res.result;
                  let obj2 = {}
                  obj2 = (res.result).find((item) => {
                    return item.name === this.cityDefault;
                  })
                  if(obj2 == undefined){
                    this.ruleForm.area = '请选择';
                    this.areas = {};
                  }else {
                    this.cityChange(obj2.code);
                  }
                  if(this.provinceDefault != this.ruleForm.province){
                    this.ruleForm.city = '请选择';
                  }
                }else {
                  this.$refs.tipMsgRef.showTipMsg({
                    msg: res.message,
                    type: 'error'
                  })
                }
              })
          }
        }else {
          this.ruleForm.city = '';
        }
      },
      cityChange(ele){
        if(ele){
          let obj = {}
          obj = (this.citys).find((item) => {
            return item.name === ele;
          })
          if(obj != undefined){
            ele = obj.code;
          }
          api_lgts_setting.base_express_province({type: 3, pCode: ele})
            .then(res => {
              if (res.status == 1){
                this.areas = res.result;
                if (this.cityDefault != this.ruleForm.city) {
                  this.ruleForm.area = '请选择';
                }
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg: res.message,
                  type: 'error'
                })
              }
            })
        }else {
          this.ruleForm.area = '请选择';
        }
      },
      //上传价格表成功回调
      handleAvatarSuccess(res, file, fileList){
          console.log("upload",res);
          if(res.status == 1){
            this.ruleForm.offerCode = res.result;
            //this.fileList=[{name:this.ruleForm.offerCode}];
          }
          this.fileList=[{name:this.ruleForm.offerCode}];

      },
      //下载价格表
      download(){
        api_lgts_setting.base_express_download()
      },
      //翻页
      handleCurrentChange(val){
        this.currentPage = val;
        this.companyInfoList();
      },
      //搜索
      search: function(params){
        params = {pageNum: this.currentPage, param: this.companyName, status: this.storeCodes};
        this.companyInfoList(params);
      },
      //重置
      searchReset: function(){
        this.companyName = '';
        this.storeCodes = ''
        this.companyInfoList();
      },
      //保存合作商配置信息
      saveCompayConfigureInfo(){
        let params = {
//          stores: this.ruleForm.stores,
//          expressCode: this.ruleForm.expressCode,
//          province: this.ruleForm.province,
//          city: this.ruleForm.city,
//          area: this.ruleForm.area,
          compInfoId: this.ruleForm.compInfoId,
//          offerCode: this.ruleForm.offerCode,
//          agreementTerm: util.toDateString(this.ruleForm.agreementTerm),
          isInvoice: this.ruleForm.isInvoice,
//          taxForCompany: this.ruleForm.taxForCompany,
//          taxPoint: this.ruleForm.taxPoint,
          status: this.ruleForm.status,
          taxForCompany: this.ruleForm.taxForCompany,
          gtCode: this.ruleForm.gtCode,
          gtName: this.ruleForm.gtName,
          cusName: this.ruleForm.cusName,
          cusPwd: this.ruleForm.cusPwd,
        }
        if (this.ruleForm.stores && this.ruleForm.stores.length>0){
          params.stores = this.ruleForm.stores
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请输入仓库编码',
            type: 'error'
          })
          return false;
        }
        if (this.ruleForm.expressName){
          params.expressCode = this.ruleForm.expressCode
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请选择所属企业',
            type: 'error'
          })
          return false;
        }
        if (this.ruleForm.province){
          params.province = this.ruleForm.province
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请选择省',
            type: 'error'
          })
          return false;
        }
        if (this.ruleForm.city){
          params.city = this.ruleForm.city
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请选择市',
            type: 'error'
          })
          return false;
        }
        if (this.ruleForm.area){
          params.area = this.ruleForm.area
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请选择区',
            type: 'error'
          })
          return false;
        }
        if (this.ruleForm.offerCode){
          params.offerCode = this.ruleForm.offerCode
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请上传价格表',
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
          params.taxPoint = this.ruleForm.taxPoint;
        }
//        this.ruleForm.agreementTerm = util.toDateString(this.ruleForm.agreementTerm);
//        delete this.ruleForm.agreementTermStr;
        api_lgts_setting.base_express_saveInfo(util.getPostParam(params))
          .then(res => {
            if(res.status == 1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
                scope: this,
                callback: function(){
                  this.dialogFormVisible = false;
                  let params = {pageNum: this.currentPage, param: this.companyName, status: this.storeCodes};
                  this.companyInfoList(params);
                }
              })
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          })
      }
    }
  }


</script>
<style>
  .el-table .cell {
    white-space: nowrap;
  }
</style>
