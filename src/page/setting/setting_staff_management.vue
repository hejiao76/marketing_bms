<template>
  <div class="setting_st_ma">
    <div class="setting_stMa_header">
      <el-form :inline="true" :model="settingSm"  ref="settingSm" class="demo-form-inline">
        <el-form-item label="" prop="set_smPhone">
          <el-input v-model="settingSm.set_smPhone" placeholder="请输入员工编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setting_smCheckPos">员工信息加载</el-button>
        </el-form-item>
      </el-form>
      <!--<div>-->
        <!--<ul><li v-for="item in tableData"><span class="mr10">{{item.userName}}</span><span>{{item.roleName}}</span></li></ul>-->
      <!--</div>-->
      <hr class="hr_line">
      <div class="setting_stMa_content hidden" style="width:100%;border:1px solid #ccc;min-height:600px;">
      <div class="fl" style="width: 30%">
        <el-table :data="tableData" border highlight-current-row @row-click="userListRowClick" style="width: 100%; cursor: pointer;">
          <el-table-column align="center" type="index" label="" width="40"></el-table-column>
          <el-table-column prop="userName" label="员工" align="center" width=""></el-table-column>
          <el-table-column prop="roleName" :formatter="formaterRoleName" label="职务" align="center" width=""></el-table-column>
        </el-table>
        <!--<table border="0" cellspacing="0" cellpadding="0">-->
          <!--<tr v-for="item in tableData">-->
            <!--<td @click="queryUser(item.userNum)"><span class="mr10">{{item.userName}}</span><span>{{item.roleName}}</span></td>-->
          <!--</tr>-->
        <!--</table>-->
      </div>
      <div class="fl pl20" v-if="userData.userNum != ''&&userData.userNum != null" style="border: 1px solid #dfe6ec; width:70%; min-height: 600px" >
        <el-form :model="userData" labelWidth="100px" label-position="left" class="demo-ruleForm" style="min-height: 500px">
          <el-form-item label="姓名：">
            <span>{{userData.userName}}</span>
          </el-form-item>
          <el-form-item label="职务：">
            <span>{{userData.roleName == 'null' ? '无'  : userData.roleName}}</span>
          </el-form-item>
          <el-form-item label="职务权限：">
            <span v-for="menu in userData.menus" v-if="menu.parentMenuCode==0" class="fw">{{menu.menuName}}&nbsp&nbsp</span>
          </el-form-item>
          <el-form-item label="可选权限：">
            <div  v-for="item in userData.optionalMenusTree" class="mb15">
              <el-checkbox v-model="checkedMenuCodeArray" @change="handleCheckAllChange($event,item.menucode)" :label="item.menucode" :key="item.menucode" class="fw">{{item.menuName}}</el-checkbox>
              <el-checkbox-group v-model="checkedMenuCodeArray" @change="handleCheckedChildChange($event,item.menucode)" class="ml30">
                <el-checkbox  v-for="childItem in item.children" :label="childItem.menucode" :key="childItem.menucode">{{childItem.menuName}}</el-checkbox>
              </el-checkbox-group>
            </div>
              <!--<el-tree ref="roleTree"  node-key="id" :default-checked-keys="treeDefaultCheck"  :data="userData.optionalMenus" :props="defaultProps" show-checkbox></el-tree>-->

          <!--  <el-checkbox-group v-model="checkedMenus">
              <el-checkbox v-for="optionalMenu in userData.optionalMenus" :label="optionalMenu.menuName" :key="optionalMenu.menuName">{{optionalMenu.menuName}}</el-checkbox>
            </el-checkbox-group>-->
            <!--<select>-->
              <!--<option v-for="optionalMenu in userData.optionalMenus">{{optionalMenu.menuName}}</option>-->
            <!--</select>-->
            <!--<span>{{userData.optionalMenus}}</span>-->
          </el-form-item>
        </el-form>
        <div class="sure_button">
          <el-button v-if="userData.id"  type="primary" @click="updateUserMenus">保 存</el-button>
          <el-button v-else type="primary" @click="addUser">新 增</el-button>
          <el-button type="primary" style="background:#F7BA2A;border-color: #F7BA2A" @click="updateUser">更新基础信息</el-button>
        </div>
      </div>
      <!--<el-row style="text-align: center; border: 1px solid #dfe6ec; line-height: 40px" v-for="item in tableData">-->
        <!--<el-col :span="16"><span class="mr10">{{item.userName}}</span><span>{{item.roleName}}</span></el-col>-->
      <!--</el-row>-->
      <!--<el-table :data="tableData" border style="width: 100%">-->
        <!--&lt;!&ndash;<el-table-column type="index" width="60"></el-table-column>&ndash;&gt;-->
        <!--<el-table-column prop="userName"></el-table-column>-->
        <!--<el-table-column prop="roleName"></el-table-column>-->
        <!--&lt;!&ndash;<el-table-column prop="managerName" label="管理员"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column prop="companyContent" :formatter="companyContentFormatter" label="入驻模块">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column prop="storeCodes" :formatter="storeCodesFormatter" label="合作仓"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column label="操作">&ndash;&gt;-->
          <!--&lt;!&ndash;<template scope="scope">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="text" @click="getLineDetailDialog(scope.$index, scope.row)">{{scope.row.storeCodes==null? '设为合作商':'修改'}}</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
      <!--</el-table>-->
    </div>
      <div class="pagination-footer ds_oq_pageF" style="clear: both">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="tpageSize" layout="total, prev, pager, next" :total="totalRow"></el-pagination>
      </div>

    </div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" labelWidth="100px" class="demo-ruleForm">
        <el-form-item label="用户编号" prop="userNum">
          <el-input v-model="ruleForm.userNum"></el-input>
        </el-form-item>
        <el-form-item label="已选权限" prop="menus">
          <el-input v-model="ruleForm.menus"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import api from './../../fetch/api';
  import VTipMsg from "./../../components/tipMsg"
//  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default{
    components :{
      VTipMsg
    },
    data(){
      return{
        tableData: [],
        currentPage: 1,
        tpageSize: 10,
        totalRow: 0,
        settingSm:{
          set_smPhone:''
        },
        userData: {
          userNum: '',
          userName: '',
          roleName: '',
          menus: [],
          optionalMenus: []
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
//        treeDefaultCheck:[],
//        checkedMenus: [],
        dialogFormVisible: false,
        ruleForm: {
          userNum: '',
          menus: ''
        },
        rules: {
        },
        allMenuCodeArray:[], //所有可选权限数组
        checkedMenuCodeArray:[], //已选择权限数组
      }
    },
    created(){
      this.userList()
    },
    methods:{
      formaterRoleName (row, column, cellValue) {
          if(row.roleName=="null"){
              row.roleName="无"
          }
          return row.roleName;
      },
      /**
       * 1级权限change事件
       * @param event parentMenuCode
       */
      handleCheckAllChange(event,menucode) {
        if(menucode){
          let checked=event.target.checked;
          let checkedMenuCodeArraySet = new Set (this.checkedMenuCodeArray);
          checked==true ? checkedMenuCodeArraySet.add(menucode) : checkedMenuCodeArraySet.delete(menucode);
          for(let i = 0 ; i<this.userData.optionalMenus.length;i++){
            let item=this.userData.optionalMenus[i];
            if(item.parentMenuCode==menucode){
               if(checked){
                 checkedMenuCodeArraySet.add(item.menucode);
               }else {
                 checkedMenuCodeArraySet.delete(item.menucode);
               }
            }
          }
          this.checkedMenuCodeArray=Array.from(checkedMenuCodeArraySet);
        }
      },
      /**
       * 2级权限change事件
       * @param event parentMenuCode
       */
      handleCheckedChildChange(event,parentMenuCode) {
        if(parentMenuCode){
          let menuCodeArray=[];
          for(let i = 0 ; i<this.userData.optionalMenus.length;i++){
            let item=this.userData.optionalMenus[i];
            if(item.parentMenuCode==parentMenuCode){
              menuCodeArray.push(item.menucode);
            }
          }
          let menuCodeArraySet = new Set (menuCodeArray);
          let checkedMenuCodeArraySet = new Set (this.checkedMenuCodeArray);
          let hasChildArraySet = new Set([...menuCodeArraySet].filter(x => checkedMenuCodeArraySet.has(x))); //获取当前一级权限下所有子权限 和 已选择权限 交集
          if(hasChildArraySet.size>0){
            checkedMenuCodeArraySet.add(parentMenuCode);
          }else {
            checkedMenuCodeArraySet.delete(parentMenuCode);
          }
          this.checkedMenuCodeArray=Array.from(checkedMenuCodeArraySet);
        }
      },
      /**
       * 构建可选权限menucode 数组
       * @param menuArray
       */
      initAllMenuCodeArray (menuArray) {
        this.allMenuCodeArray=[];
        if(menuArray && menuArray.length>0){
          for( let i = 0 ;i < menuArray.length; i++){
            this.allMenuCodeArray.push(menuArray[i].menucode) ;
          }
          console.log("initAllMenuCodeArray",this.allMenuCodeArray.toString());
        }
      },
      /**
       * 初始化已选择可选权限
       * @param menuArray
       */
      initCheckedMenuCodeArray (menuArray) {
        if(menuArray && menuArray.length>0){
          let array= [];
          for( let i = 0 ;i < menuArray.length; i++){
            if(menuArray[i].selected == "true"){
              array.push(menuArray[i].menucode);
            }
          }
          this.checkedMenuCodeArray = array ;
        }
      },
      userList(params){
        params = {currentPage: this.currentPage};
        api.set_user_list(params)
          .then(res => {
            if (res.status == 1){
              this.tableData = res.result;
              this.totalRow = res.totalRow;
//              this.queryUser(res.result[0].userNum)
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          }).catch(error => {
        })
      },
      //翻页
      handleCurrentChange(val){
        this.currentPage = val;
        this.userList();
      },
      userListRowClick (row, event, column) {
        let userNum=row.userNum;
        this.queryUser(userNum);
      },
      //查看用户信息
      queryUser(userNum){
        api.set_query_user({userNum: userNum})
          .then(res => {
            if (res.status == 1){
              this.userData = res.result;
              this.initTreeData(res.result.optionalMenus);
              this.initCheckedMenuCodeArray(res.result.optionalMenus);
              this.initAllMenuCodeArray(res.result.optionalMenus);
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error',
                scope: this,
                callback: function () {
                  this.userData.userNum = '';
                }
              })
            }

//            for (let i in res.result.optionalMenus){
//              if(res.result.optionalMenus[i].selected == 'true'){
//                this.checkedMenus.push(res.result.optionalMenus[i].menuName)
//              }
//              if(res.result.optionalMenus[i].parentMenuCode == 0){
//                res.result.optionalMenus[i]['label'] = res.result.optionalMenus[i]['menuName'];
//                res.result.optionalMenus[i].children = []
//              }else {
//                res.result.optionalMenus[i].children.push(res.result.optionalMenus[i])
////                res.result.optionalMenus[i].children = [{label: res.result.optionalMenus[i].menuName}];
////                res.result.optionalMenus[i].children.push(res.result.optionalMenus[i].menuName);
////                res.result.optionalMenus[i].children['label'] = res.result.optionalMenus[i].children['menuName']
//              }
//              if(res.result.optionalMenus[i].children){
//                res.result.optionalMenus[i].children.push(res.result.optionalMenus[i])
//              }
//              if(res.result.optionalMenus[i].menucode == res.result.optionalMenus[i].parentMenuCode){
//                res.result.optionalMenus[i].children = [];
//                res.result.optionalMenus[i].children = res.result.optionalMenus[i].menunName
//                res.result.optionalMenus[i].children['label'] = res.result.optionalMenus[i].menunName
//              }
//            }
          }).catch(error => {
        })
      },
      initTreeData (optionalMenusArray) {
          let pnode = {id:0};
          this.buildRolesMenuTree(pnode,optionalMenusArray);
          this.userData.optionalMenusTree=pnode.children;
      },
//      getDefaultCheckMenuCode () {
//         let menuCodesArray=this.userData.optionalMenus;
//         let selectedMenuCodeArray=[];
//         for(let i=0 ;i<menuCodesArray.length;i++){
//             if(menuCodesArray[i].selected=="true"){
//               selectedMenuCodeArray.push(parseInt(menuCodesArray[i].menucode));
//             }
//         }
//         this.treeDefaultCheck=selectedMenuCodeArray;
//        console.log(this.treeDefaultCheck)
//      },
      buildRolesMenuTree  (pnode,roleMenus) {
        if(pnode && roleMenus.length>0){
          for(let i=0;i<roleMenus.length;i++){
           roleMenus[i]["id"]=roleMenus[i].menucode;
            roleMenus[i]["label"]=roleMenus[i].menuName;
            if(roleMenus[i].parentMenuCode==pnode.id){
              if(roleMenus[i].parentMenuCode!=0){
                roleMenus[i]["show-checkbox"]=false;
              }
              if(pnode.children){
                pnode.children.push(roleMenus[i]);
              }else{
                pnode.children=[];
                pnode.children.push(roleMenus[i]);
              }
              this.buildRolesMenuTree(roleMenus[i],roleMenus);
            }
          }
        }
      },
      //查询
      setting_smCheckPos(params){
        this.queryUser(this.settingSm.set_smPhone);
      },
      setting_smAddPos(){//添加新职位
        this.dialogFormVisible = true;
      },
      saveUser(){
        api.set_add_user(this.ruleForm)
          .then(res => {
            if(res.status == 1){
              this.userList();
              this.dialogFormVisible = false;
            }
          })
      },
      //更新用户可选权限
      updateUserMenus(){
        let params = {};
        params.userNum = this.userData.userNum;
        params.menus = [];
        let checkCode=this.checkedMenuCodeArray;
        params.menus=checkCode;
        params.menus = params.menus.toString();
        api.set_update_menus(params)
          .then(res => {
            if (res.status == 1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
//                scope: this,
//                callback: function(){
//                  params = {currentPage: this.currentPage, userNum: this.userNum};
//                  this.userList(params);
//                }
              })
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          })
      },
      /**
       * 新增同步用户
       */
      addUser () {
        let params = {};
        params.userNum = this.userData.userNum;
        params.menus = [];
        let checkCode=this.checkedMenuCodeArray;
        params.menus=checkCode;
        params.menus = params.menus.toString();
        api.set_add_user(params)
          .then(res => {
            if (res.status == 1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
                scope: this,
                callback:function (){
                  this.userList();
                  this.userData={};
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
      //更新基础信息
      updateUser(){
        let param={userNum:this.userData.userNum}
        api.set_update_user(param)
          .then(res=>{
            if(res.status==1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
                scope: this,
                callback:this.queryUser(this.userData.userNum)
              })
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          }).catch(err=>{
        })
      }
    }

  }
</script>
<style>
  .fw {
    font-weight: bold;
  }
  .sure_button {
    text-align: center;
    margin-bottom:20px;
  }
</style>

