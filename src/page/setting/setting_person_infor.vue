<template>
    <div class="setting_per_content" style="width:100%;border:1px solid #ccc;min-height:700px;">
      <el-form labelWidth="100px" class="demo-ruleForm" style="width: 98%">
        <el-form-item label="姓名：">
          <span>{{userName}}</span>
        </el-form-item>
        <el-form-item label="职务：">
          <span>{{roleName}}</span>
        </el-form-item>
        <el-form-item label="权限：">
          <div v-for="dataa in dataas.roleMenus">
            <span style="font-weight: bold">{{dataa.menuName}}</span>
            <div class="ml30"><span v-for="item in dataa.children">{{item.menuName}}&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="UpdateInfo" v-if="roleCode!='systemAdmin'&&roleCode!='generalAdmin'" >更新账户</el-button>
          <el-button type="warning" @click="UpdatePassword">修改密码</el-button>
        </el-form-item>
      </el-form>
      <!--<ul class="setting_per_ul" >-->
        <!--<li><span>姓名：</span><span>{{userName}}</span></li>-->
        <!--<li><span>职务：</span><span>{{roleName}}</span></li>-->
        <!--&lt;!&ndash;<li>&ndash;&gt;-->
          <!--&lt;!&ndash;<span>权限：</span>&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<el-tree :data="dataas.roleMenus" :props="defaultProps" :default-expand-all="true"></el-tree>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;<ul  style="display: inline-block">&ndash;&gt;-->
            <!--&lt;!&ndash;<li v-for="dataa in dataas.roleMenus" style="display: inline-block">&ndash;&gt;-->
                <!--&lt;!&ndash;<span>{{dataa.menuName}}</span><span></span>&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<span v-for="item in dataa.children">{{item.menuName}}</span><span></span>&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;<ul><li class="fl" v-for="item in dataa.children">{{item.menuName}}    、</li></ul>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--&lt;!&ndash;</ul>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->

        <!--<el-row v-for="dataa in dataas.roleMenus">-->
          <!--<el-col :span="24">-->
            <!--<span style="font-weight: bold">{{dataa.menuName}}</span><span></span></el-col>-->
          <!--<div><span v-for="item in dataa.children">{{item.menuName}}&nbsp;&nbsp;&nbsp;&nbsp;</span></div>-->
          <!--&lt;!&ndash;<el-row>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-col :span="8" v-for="item in dataa.children">{{item.menuName}}&nbsp;</el-col></el-row>&ndash;&gt;-->
        <!--</el-row>-->
      <!--</ul>-->

      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" labelWidth="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="ruleForm.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="ruleForm.newPwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePwd('ruleForm')">确 定</el-button>
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
  import VTipMsg from "./../../components/tipMsg";
//  import * as util from "./../../util/util";
  import md5 from "js-md5";
  export default{
    components :{
      VTipMsg
    },
    data(){
      return{
        userName:'',
        roleName:'',
        roleCode:'',
        phone:'',
        password:'',
        dataas:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        userNum:'',
        dialogFormVisible: false,
        ruleForm: {
          oldPwd: '',
          newPwd: ''
        },
        rules: {
        },
      }
    },
    created(){
      this.set_perInfo();
    },
    methods:{
      UpdateInfo(){
        let param={userNum:this.userNum}
        api.set_update_user(param)
          .then(res=>{
            if(res.status==1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
                scope: this,
                callback: this.set_perInfo
              })
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          }).catch(err=>{
        })
      },
      UpdatePassword(){
        this.dialogFormVisible = true;
      },
      savePwd(formName){
        let params = {};
        if (this.ruleForm.oldPwd){
          params.oldPwd = md5(this.ruleForm.oldPwd)
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请输入原密码',
            type: 'error'
          })
          return false;
        }
        if (this.ruleForm.newPwd){
          params.newPwd = md5(this.ruleForm.newPwd)
        }else {
          this.$refs.tipMsgRef.showTipMsg({
            msg: '请输入新密码',
            type: 'error'
          })
          return false;
        }
//        this.ruleForm.newPwd = md5(this.ruleForm.newPwd)
//        this.ruleForm.oldPwd = md5(this.ruleForm.oldPwd)
        api.set_update_pwd(params)
          .then(res => {
            if(res.status == 1){
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'success',
                scope: this,
                callback: function(){
                  this.dialogFormVisible = false;
                  this.$refs[formName].resetFields();
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
      set_perInfo:function(){
        let param={token:localStorage.getItem("token")}
        api.set_person_infor(param)
          .then(res=>{
            if(res.status==1){
              for(let i in res.result.roleMenus){
                res.result.roleMenus[i]['label'] = res.result.roleMenus[i]['menuName']
              }
              this.userName=res.result.userName;
              this.roleName= res.result.roleName == "null" ?  "无" : res.result.roleName;
//              this.dataas=res.result.roleMenus;
              this.userNum=res.result.userNum;
              this.roleCode = res.result.roleCode;
              this.initTreeData(Array.concat(res.result.roleMenus,res.result.userMenus));
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          }).catch(err=>{
        })
      },
      initTreeData (optionalMenusArray) {
        let pnode = {id:0};
        this.buildRolesMenuTree(pnode,optionalMenusArray);
        this.dataas.roleMenus=pnode.children;
      },
      buildRolesMenuTree  (pnode,roleMenus) {
        if(pnode && roleMenus.length>0){
          for(let i=0;i<roleMenus.length;i++){
            roleMenus[i]["id"]=roleMenus[i].menucode;
            roleMenus[i]["label"]=roleMenus[i].menuName;
            if(roleMenus[i].parentMenuCode==pnode.id){
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
    }
  }
</script>
<style scoped>
   .setting_per_ul{
     width:300px;
     height:350px;
     position: absolute;
     left:50%;
     top:35%;
   }
  .setting_per_ul li{
    line-height: 40px;
  }
  .setting_per_ul li span:first-child{
    font-weight: 600;
  }
</style>
