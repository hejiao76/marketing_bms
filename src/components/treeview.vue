<template>
  <div>
    <div class="city-box-wrop" @click="boxIsShow()">
        <span>请选择活动区域</span>
    </div>
    <el-row v-if="ifShow" style="margin-top:-34px;">
      <el-col :span="24">

        <div class="form-group">
          <div class="">
            <div class="" style="position: relative;">
              <div class="select-box form-control">
                全部
              </div>
              <div class="city-box">
                <div class="city">
                  <div class="city-title">
                    城市列表
                  </div>
                  <div class="city-body">
                    <div class="city-body-right" v-for="item in userData.optionalMenusTree">
                      <div class="city-body-title" >
                        <el-checkbox v-model="checkedMenuCodeArray"  @change="handleCheckAllChange($event,item.menucode)" :label="item.menucode" :key="item.menucode" class="fw">{{item.menuName}}</el-checkbox>
                      </div>
                      <div class="city-body-content">
                        <el-col :span="6" v-for="childItem in item.children">
                            <el-checkbox  v-model="checkedMenuCodeArray" @change="handleCheckedChildChange($event,item.menucode)" :label="childItem.menucode" :key="childItem.menucode">{{childItem.menuName}}</el-checkbox>
                        </el-col>

                      </div>
                    </div>
                  </div>
                </div>
                <div class="city-sidebar">
                  <div class="col-md-12 city-title">
                    已选城市
                  </div>
                  <div class="city-body">
                    <div class="city-body-title" v-for="item in checkedMenuCodeArray">
                           {{item}}
                    </div>
                  </div>
                </div>
                <el-row style="width: 100%;" class="city-footer">
                    <el-col :span="12"> <el-checkbox @change="allChecked($event)" class="fw">全选</el-checkbox></el-col>
                  <el-col :span="12" class="col-md-8 text-right">
                    <el-button size="small" class="fr mr20 " style="margin-top:3px;" @click="cityBoxhide()">取消</el-button>
                    <el-button type="primary" size="small" class="fr mr20 " style="margin-right:20px;margin-top:3px;">确认</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

















      <!--<el-dropdown size="small">-->
        <!--<el-button type="primary" style="padding:10px 50px;background:none;">-->
          <!--省份选择<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--</el-button>-->
        <!--<el-dropdown-menu slot="dropdown" placement="bottom" style="width: 180px;height: 300px;overflow-y: auto">-->
          <!--<el-dropdown-item><el-checkbox @change="allChecked($event)" class="fw">全选</el-checkbox></el-dropdown-item>-->
          <!--<el-dropdown-item v-for="item in userData.optionalMenusTree">-->
            <!--<el-checkbox v-model="checkedMenuCodeArray"  @change="handleCheckAllChange($event,item.menucode,item.children)" :label="item.menucode" :key="item.menucode" class="fw">{{item.menuName}}</el-checkbox>-->
            <!--<span @click="linkchild(item.children,item.menucode)"><i class="el-icon-caret-right"></i></span>-->
          <!--</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
        <!--<ul style="width: 180px;height: 300px;overflow-y: auto;" v-if="childItems.length>0">-->
          <!--<li><el-checkbox v-model="isAllChild" @change="allChildrenChecked($event)" class="fw">全选</el-checkbox></li>-->
          <!--<li  v-for="childItem in childItems" >-->
            <!--<el-checkbox  v-model="checkedMenuCodeArray" @change="handleCheckedChildChange($event,thismenucode)" :label="childItem.menucode" :key="childItem.menucode">{{childItem.menuName}}</el-checkbox>-->
          <!--</li>-->
        <!--</ul>-->
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {
      ElCol,
      ElRow},
    data () {
      return{
        tableData: [],
        ifShow:false,
        currentPage: 1,
        tpageSize: 10,
        totalRow: 0,
        childItems　:[],
        showChild:false,
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
    created () {
      console.log('>>>>>>>>>>>>>>>树形模板')
       let res = {
         "message": "操作成功!",
         "result": {
           "id": 7,
           "userNum": "0008955",
           "userName": "刘军",
           "phone": "13110006295",
           "province": "天津市",
           "departmentCode": "kefu",
           "departmentName": "客服部",
           "isNew": 0,
           "roleName": "全资仓业务主管",
           "menus": [
             {
               "menucode": "101",
               "parentMenuCode": "0",
               "menuName": "物流审核"
             },
             {
               "menucode": "106",
               "parentMenuCode": "0",
               "menuName": "审批"
             },
             {
               "menucode": "106101",
               "parentMenuCode": "106",
               "menuName": "员工提现超上限"
             }
           ],
           "optionalMenus": [
             {
               "selected": "false",
               "menucode": "102",
               "parentMenuCode": "0",
               "menuName": "数据查询"
             },
             {
               "selected": "false",
               "menucode": "103",
               "parentMenuCode": "0",
               "menuName": "日志查询"
             },
             {
               "selected": "false",
               "menucode": "101101",
               "parentMenuCode": "101",
               "menuName": "企业审核"
             },
             {
               "selected": "false",
               "menucode": "101102",
               "parentMenuCode": "101",
               "menuName": "个人审核"
             },
             {
               "selected": "false",
               "menucode": "101103",
               "parentMenuCode": "101",
               "menuName": "司机审核"
             },
             {
               "selected": "false",
               "menucode": "102101",
               "parentMenuCode": "102",
               "menuName": "订单查询"
             },
             {
               "selected": "false",
               "menucode": "102102",
               "parentMenuCode": "102",
               "menuName": "业绩查询"
             },
             {
               "selected": "false",
               "menucode": "102103",
               "parentMenuCode": "102",
               "menuName": "提成查询"
             },
             {
               "selected": "false",
               "menucode": "102104",
               "parentMenuCode": "102",
               "menuName": "用户查询"
             },
             {
               "selected": "false",
               "menucode": "103101",
               "parentMenuCode": "103",
               "menuName": "订单日志"
             },
             {
               "selected": "false",
               "menucode": "103102",
               "parentMenuCode": "103",
               "menuName": "骑手日志"
             },
             {
               "selected": "false",
               "menucode": "103103",
               "parentMenuCode": "103",
               "menuName": "物流信息预警"
             },
             {
               "selected": "false",
               "menucode": "103104",
               "parentMenuCode": "103",
               "menuName": "骑手设备"
             },
             {
               "selected": "false",
               "menucode": "103105",
               "parentMenuCode": "103",
               "menuName": "骑手操作"
             },
             {
               "selected": "false",
               "menucode": "101104",
               "parentMenuCode": "101",
               "menuName": "共享平台司机审核"
             },
             {
               "selected": "false",
               "menucode": "101105",
               "parentMenuCode": "101",
               "menuName": "共享平台车辆审核"
             }
           ]
         },
         "status": 1
       }
      this.userData = res.result;
      this.initTreeData(res.result.optionalMenus);
      this.initCheckedMenuCodeArray(res.result.optionalMenus);
      this.initAllMenuCodeArray(res.result.optionalMenus);

    },
    methods:{
      boxIsShow(){
        this.ifShow = true;
      },
      cityBoxhide(){
        this.ifShow = false;
      },
      allChecked(event){
        let checked=event;
        let checkedMenuCodeArraySet = new Set (this.checkedMenuCodeArray);
        if(checked){
          for(let i = 0 ; i< this.userData.optionalMenusTree.length;i++){
            let item=this.userData.optionalMenusTree[i];
            checkedMenuCodeArraySet.add(item.menucode);
            for(let x = 0 ; x<this.userData.optionalMenus.length;x++){
              let val=this.userData.optionalMenus[x];
              if(val.parentMenuCode==item.menucode){
                checkedMenuCodeArraySet.add(val.menucode);
              }
            }
          }
        }else{
          for(let i = 0 ; i< this.userData.optionalMenusTree.length;i++){
            let item=this.userData.optionalMenusTree[i];
            checkedMenuCodeArraySet.delete(item.menucode)
            for(let x = 0 ; x<this.userData.optionalMenus.length;x++){
              let val=this.userData.optionalMenus[x];
              if(val.parentMenuCode==item.menucode){
                checkedMenuCodeArraySet.delete(val.menucode);
              }
            }
          }
        }
        this.checkedMenuCodeArray=Array.from(checkedMenuCodeArraySet);
      },
      handleCheckAllChange(event,menucode) {
        if(menucode){
          let checked=event;
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
          console.log('1111111',this.checkedMenuCodeArray);

        }
      },
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
          console.log('22222222',this.checkedMenuCodeArray);

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
        }
      },
      initTreeData (optionalMenusArray) {
        let pnode = {id:0};
        this.buildRolesMenuTree(pnode,optionalMenusArray);
        this.userData.optionalMenusTree=pnode.children;
        console.log('mmpmmp',this.userData.optionalMenusTree);
      },
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.city-box-wrop{
  width: 40%;
  height: 34px;
  line-height: 34px;
  position: relative;
  border:1px solid #d8dce5;
  text-align: center;
  color: #d8dce5;
  border-radius: 4px;
}
</style>
