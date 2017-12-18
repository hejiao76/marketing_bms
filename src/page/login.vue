<template>
  <section class="login_bg">
    <div class="pos_center">
      <h1>营销活动管理系统</h1>
      <div class="login_con">
        <h3>欢迎登录营销活动管理系统</h3>
        <hr   noshade="noshade">
        <!--<form>  </form>-->
          <p class="form_warning">{{errorMsg}} </p>
          <div class="form_list">
            <span class="img_person"></span>
            <input @keyup.enter="keyLogin" v-model="userName" type="text" id="UserName"  placeholder="请输入用户名"  required autocomplete="off">
          </div>
          <div class="form_list">
            <span class="img_loack"></span>
            <input @keyup.enter="keyLogin" v-model="password" type="password" id="PassWord"   placeholder="请输入密码"  errormsg="密码长度为6-16位" autocomplete="off" required/>
          </div>
          <!--<div>-->
            <!--<input type="checkbox"  class="" checked="checked"/>-->
            <!--<label>保持我的登录状态</label>-->
          <!--</div>-->

          <div>
            <button v-on:click="login">登  录</button>
          </div>


      </div>
    </div>
  </section>
</template>
<script>
  import * as util from "./../util/util"
  import Final from "../../static/baseSetting/Final"
  import api from "./../fetch/api"
  import md5 from "js-md5"
  export default {
      data() {
          return {
              errorMsg:"",
              userName:"",
              password:"",
              i:100
          }
      },
      created (){
//        alert("create");
      },
      mounted () {
        this.bodyListener = (e) => {
          if (e.keyCode === 13 && e.target === document.body){
            this.login();
          }
        }
        document.body.addEventListener('keydown', this.bodyListener, false)
      },
      beforeDestroy() {
        document.body.removeEventListener('keydown', this.bodyListener)
      },
      components :{
      },
      methods : {
        keyLogin (){
            console.log("13key down");
            this.login();
//              console.log(key.code);
//              if(key.code==13){
//                  this.login();
//              }
          },
          login (){
              var param= {};
              if(this.userName){
                  param.phone=this.userName;
//                  console.log(param.loginName)
              }else {
                  this.errorMsg="请输入登录名";
                  return;
              }
              if(this.password){
                  param.password=md5(this.password);
              }else {
                  this.errorMsg="请输入密码";
                  return;
              }
              this.errorMsg="";
              api.base_login(param)
              .then(res => {
                  if(res.status==1){
                      localStorage.setItem("token",res.result.token);
                      localStorage.setItem("userName",res.result.userName);
                      var roleMenus=this.getRolesMenuArray(res.result.roleMenus,res.result.userMenus);
                      this.registerRouterPath(roleMenus);
                      console.log("roleMenus",roleMenus)
                      var pnode= {menucode:0,parentMenuCode:-1}
//                    this.test1();
//                      return;
                      this.buildRolesMenuTree(pnode,roleMenus);

                      localStorage.setItem("roleMenus",JSON.stringify(pnode));
                      localStorage.removeItem("mainMenuCode");
                      console.log(localStorage.getItem("roleMenus"));
                      this.$router.replace(pnode.children[0].path);
                  }else {
                      this.errorMsg=res.message;
                  }
              }).catch(error => {
                    console.log(error);
//                  this.errorMsg=error.data.message;
              })
          },
          getRolesMenuArray (roleMenus,userMenus) {
              var res = [];
              var json = {};
              var thridRoleMenus=Final.THIRD_ROUTE_NODE;
              if(roleMenus && roleMenus.length>0){
                for(var i = 0; i < roleMenus.length; i++){
                  if(!json[roleMenus[i].menucode]){
                    res.push(roleMenus[i]);
                    json[roleMenus[i].menucode] = 1;
                  }
                }
              }
              if(userMenus && userMenus.length>0){
                for(var i = 0; i < userMenus.length; i++){
                  if(!json[userMenus[i].menucode]){
//                    userMenus[i].parentMenuCode = userMenus[i].parentmenucode;
                    res.push(userMenus[i]);
                    json[userMenus[i].menucode] = 1;
                  }
                }
              }
              if(thridRoleMenus && thridRoleMenus.length>0){
                for(var i = 0; i < thridRoleMenus.length; i++){
                  if(!json[thridRoleMenus[i].menucode]){
                    res.push(thridRoleMenus[i]);
                    json[thridRoleMenus[i].menucode] = 1;
                  }
                }
              }

              return res;
          },
          registerRouterPath (roleMenus) {
              let menu_router_mapping = Final.MENU_ROUTER_MAPPING;
              if (menu_router_mapping && roleMenus && roleMenus.length>0){
                    for(let j = 0 ; j < roleMenus.length ; j++){
                        let roleMenusItem= roleMenus[j];
                        let menu_router_mapping_item = menu_router_mapping[roleMenusItem.menucode];
                        if(menu_router_mapping_item){
                            Object.assign(roleMenusItem,menu_router_mapping_item);
                        }
                    }
              }

          },
          buildRolesMenuTree  (pnode,roleMenus) {
          if(pnode && roleMenus.length>0) {
            for (let i = 0; i < roleMenus.length; i++) {
              if (roleMenus[i].parentMenuCode == pnode.menucode) {
                  if(roleMenus[i].path){
                    if (pnode.children) {
                      pnode.children.push(roleMenus[i]);

                    } else {
                      pnode.children = [];
                      pnode.children.push(roleMenus[i]);
                      if (roleMenus[i].path) {
                        pnode.path = roleMenus[i].path;  //为父级节点 重新配置path
                        console.log(pnode.path);
                      }
                    }
                    this.buildRolesMenuTree(roleMenus[i], roleMenus, this);
                  }
              }
            }
            if (pnode.children) {
              pnode.children.sort(function (a, b) {
                return a["sort"] - b["sort"];
              });
            }
          }
        }
      }
  }



</script>
<style>
@import "./../assets/css/common.css";
@import "./../assets/css/style.css";
</style>
