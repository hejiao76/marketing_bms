<template>
  <div>
    <el-row>
      <el-col :span="12"><el-dropdown>
        <el-button type="primary" style="padding:10px 50px">
          省份选择<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" placement="bottom" style="width: 180px;height: 300px;overflow-y: auto">
          <el-dropdown-item><el-checkbox @change="allChecked($event)" class="fw">全选</el-checkbox></el-dropdown-item>
          <el-dropdown-item v-for="item in userData.optionalMenusTree">
            <el-checkbox v-model="checkedMenuCodeArray"  @change="handleCheckAllChange($event,item.menucode,item.children)" :label="item.menucode" :key="item.menucode" class="fw">{{item.menuName}}</el-checkbox>
            <span @click="linkchild(item.children,item.menucode)"><i class="el-icon-caret-right"></i></span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </el-col>
      <el-col :span="12">
        <ul style="width: 180px;height: 300px;overflow-y: auto;" v-if="childItems.length>0">
          <li><el-checkbox v-model="isAllChild" @change="allChildrenChecked($event)" class="fw">全选</el-checkbox></li>
          <li  v-for="childItem in childItems" >
            <el-checkbox  v-model="checkedMenuCodeArray" @change="handleCheckedChildChange($event,thismenucode)" :label="childItem.menucode" :key="childItem.menucode">{{childItem.menuName}}</el-checkbox>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return{
        tableData: [],
        currentPage: 1,
        tpageSize: 10,
        totalRow: 0,
        isAllChild:false,
        childItems　:[],
        showChild:false,
        thismenucode:'',
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
      this.initTreeData(res.result.optionalMenus);
      this.initCheckedMenuCodeArray(res.result.optionalMenus);
      this.initAllMenuCodeArray(res.result.optionalMenus);

    },
    methods:{
      allChecked(event){
        let checked=event.target.checked;
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
          this.isAllChild = true;
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
          this.isAllChild = false;
        }
        this.checkedMenuCodeArray=Array.from(checkedMenuCodeArraySet);
        console.log('3333',this.checkedMenuCodeArray)
      },
      handleCheckAllChange(event,menucode,item) {
        if(menucode){
          let checked=event.target.checked;
          let checkedMenuCodeArraySet = new Set (this.checkedMenuCodeArray);
          checked==true ? checkedMenuCodeArraySet.add(menucode) : checkedMenuCodeArraySet.delete(menucode);
          console.log('2222',this.userData)
          for(let i = 0 ; i<this.userData.optionalMenus.length;i++){
            let item=this.userData.optionalMenus[i];
            if(item.parentMenuCode==menucode){
              if(checked){
                checkedMenuCodeArraySet.add(item.menucode);
                this.isAllChild = true;
              }else {
                checkedMenuCodeArraySet.delete(item.menucode);
                this.isAllChild = false;
              }
            }
          }
          this.thismenucode = menucode
          this.checkedMenuCodeArray=Array.from(checkedMenuCodeArraySet);
          console.log('2222',this.checkedMenuCodeArray)
          this.childItems = item;

        }
      },
      linkchild(item,menucode){
        this.childItems = item;
        this.thismenucode = menucode;
      },
      allChildrenChecked(event){
        let checked=event.target.checked;
        for(let i = 0 ; i< this.userData.optionalMenus.length;i++){
          let item=this.userData.optionalMenus[i];
          if(checked){
            if(this.thismenucode == item.menucode){
              this.handleCheckAllChange(event,this.thismenucode,item.children)
            }

          }else{
            if(this.thismenucode == item.menucode){
              this.handleCheckAllChange(event,this.thismenucode,item.children)
            }
          }
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
          if(hasChildArraySet.size == menuCodeArray.length){
            this.isAllChild = true;
          }else{
            this.isAllChild = false;
          }
          this.checkedMenuCodeArray=Array.from(checkedMenuCodeArraySet);
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
          console.log("initAllMenuCodeArray",this.allMenuCodeArray.toString());
        }
      },
      initTreeData (optionalMenusArray) {
        let pnode = {id:0};
        this.buildRolesMenuTree(pnode,optionalMenusArray);
        this.userData.optionalMenusTree=pnode.children;
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

</style>
