<template>
  	<div>
     <v-header></v-header>
      <div class="con_main">
        <v-left></v-left>
        <section class="con_main_r">
          <v-con-nav></v-con-nav>
          <section class="con_tab">
            <div class="con_list">
              <h5>待处理事项</h5>
              <ul class="t_form">
                <li>
                  <label>类型 </label>
                  <select class='aaa' value="请选择">
                    <option>nihao </option>
                    <option>nihao </option>
                    <option>nihao </option>
                  </select>
                </li>
                <li>
                  <label>公司名称 </label>
                  <input type="text" placeholder="关键字"/>
                </li>
                <li>
                  <label>提交时间 </label>
                  <input type="text" placeholder="提交时间"/>
                </li>
                <li>
                  <button class="btn_b btn_bass mr10">查 询</button>
                  <button class="btn_y btn_bass">重 置</button>
                </li>
              </ul>

              <table>

              </table>
            </div>


          </section>
        </section>
      </div>
    </div>
</template>
<script>
//  import api from "./../fetch/api"
  import VHeader from "../components/header";
  import VLeft from "../components/left";
  import VConNav from "../components/con_nav";
  import Final from "../util/Final";
  import API from "./../fetch/api";
  export default {
      data() {
          return {
              test:1,
              test2:"这是变量",
              testObj:{a:"这是a"}
          }
      },
      created (){
        //alert("create");
      },
      components :{
        VHeader,
        VLeft,
        VConNav
      },
      methods : {
          a : function (data){


              //alert(data);
          }
      }
  }

//  api.Login({a:1,b:2})
//    .then(res => {
//        alert("请求成功..");
//    }).catch(error => {
//      alert("fail");
//    })

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/style.css";
</style>
