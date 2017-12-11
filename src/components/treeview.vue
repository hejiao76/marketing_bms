<template>
  <div  id="box">
    <el-input v-model="showTxt" :readonly="true" @click.native="boxIsShow" placeholder="请选择活动区域"></el-input>
    <!--<div class="city-box-wrop" @click="boxIsShow()">-->
      <!--<span v-if="!newCityArr">请选择活动区域</span>-->
      <!--<span v-if="newCityArr" v-for="item in newCityArr">{{item}},</span>-->
    <!--</div>-->
    <el-row v-if="ifShow" >
      <el-col :span="24">

        <div class="form-group">
          <div class="">
            <div class="" style="position: relative;">
              <!--<div class="select-box form-control cur">-->
                <!--&lt;!&ndash;全部&ndash;&gt;-->
              <!--</div>-->
              <div class="city-box">
                <div class="city">
                  <div class="city-title">
                    城市列表
                  </div>
                  <div class="city-body">
                    <div class="city-body-right" v-for="item in cityTree">
                      <div class="city-body-title" >
                        <el-checkbox v-model="parentCheckedMenuCode"   @change="handleCheckAllChange($event,item)" :label="item.provinceId" :key="item.provinceId" class="fw">{{item.provinceName}}</el-checkbox>
                      </div>
                        <div class="city-body-content">
                          <el-col :span="6" v-for="childItem in item.cityVmList">
                            <el-checkbox v-model="childCheckedMenuCode"  @change="handleCheckedChildChange($event,childItem)" :label="childItem.cityId" :key="childItem.cityId">{{childItem.cityName}}</el-checkbox>
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
                    <div class="city-body-title" v-for="item in childCheckedMenuName">
                      {{item}}
                    </div>
                  </div>
                </div>
                <el-row style="width: 100%;" class="city-footer">
                  <el-col :span="12"> <el-checkbox @change="allChecked($event)" class="fw">全选</el-checkbox></el-col>
                  <el-col :span="12" class="col-md-8 text-right">
                    <el-button size="small" class="fr mr20 " style="margin-top:3px;" @click="cityBoxhide()">取消</el-button>
                    <el-button type="primary" size="small" @click="checkedCity()" class="fr mr20 " style="margin-right:20px;margin-top:3px;">确认</el-button>
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
  import Api from "./../fetch/api";

  export default {
    components: {
    },
    props:["data"],
    data () {
      return{
        showContent:"",
        ifShow:false,
//        currentPage: 1,
//        tpageSize: 10,
//        totalRow: 0,
//        childItems　:[],
//        showChild:false,
//        settingSm:{
//          set_smPhone:''
//        },
//        userData: {
//          userNum: '',
//          userName: '',
//          roleName: '',
//          menus: [],
//          optionalMenus: []
//        },
//        defaultProps: {
//          children: 'children',
//          label: 'label'
//        },
//        treeDefaultCheck:[],
//        checkedMenus: [],
        dialogFormVisible: false,
//        ruleForm: {
//          userNum: '',
//          menus: ''
//        },
//        rules: {
//        },
        allMenuCodeArray:[], //所有可选权限数组
        checkedMenuCodeArray:[], //已选择权限数组
        newCityArr :[],
        cityTree:[],
        parentCheckedMenuCode:[],
        childCheckedMenuCode:[],
        parentCheckedMenuName:[],
        childCheckedMenuName:[],
        showTxt:'',
        allCountry:false,
      }
    },
    watch : {
      data (val, oldval) {
          if(val!="全国"){
              let valArray = val.split(",");
              console.log(valArray);
            for(let i =0 ;i <valArray.length;i++){
                if(valArray[i]<100){
                    this.parentCheckedMenuCode.push(Number(valArray[i]));
                }else{
                    this.childCheckedMenuCode.push(Number(valArray[i]));
                }
            }
            console.log("child---->",this.childCheckedMenuCode);
          }


      }
    },
    created () {
      console.log('>>>>>>>>>>>>>>>树形模板')

//      this.cityTree=res.result;

//      this.parentCheckedMenuCode[]
//   this.userData = res.result;
//      this.initTreeData(res.result.optionalMenus);
//      this.initCheckedMenuCodeArray(res.result.optionalMenus);
//      this.initAllMenuCodeArray(res.result.optionalMenus);

    },
    mounted(){
      this.initPage();

//      let _self=this;
//      document.getElementById('box').onblur = function(){
//        if(document.getElementById('box').contains(window.event.srcElement)){
//            console.log(window.event.srcElement)
//        }else{
//          _self.ifShow=false;
//        }
//
//      };
    },
    methods:{
        initPage () {
          this.requestLocationList();
//            this.requestLocationList();
//          this.initCityTree(res.result);
        },
      initCityTree (cityTree){
//        for(let i = 0 ;i <cityTree.length;i++){
//          let item = cityTree[i];
//            for(let j = 0 ; j < item.cityVmList.length; j ++ ){
//              let childItem = item.cityVmList[j];
//
//            }
//        }
//        this.cityTree= cityTree;
      },
      requestLocationList(){
        Api.base_sys_location({})
          .then(res => {
            if (res.status == true) {
                this.cityTree=res.result;
//              this.userData.optionalMenus=res.result;
            }else {}
          }).catch(err => {

        });
      },
      boxIsShow1(){
        this.ifShow = true;
      },
      boxIsShow(){
        this.ifShow = true;
        document.getElementById('box').focus();
      },
      cityBoxhide(){
        this.ifShow = false;
      },
      showTxtFn(){
          if(this.childCheckedMenuName.length<=3 && this.childCheckedMenuName.length>0){
              this.showTxt=this.childCheckedMenuName.join(",");
          }else if(this.childCheckedMenuName.length>3){
              console.log(this.childCheckedMenuName.slice(0,3).join(","));
            this.showTxt=this.childCheckedMenuName.slice(0,3).join(",")+"(+"+(this.childCheckedMenuName.length-3)+")";
          }else {
              this.showTxt="";
          }
      },
      handleCheckAllChange(event,parentNode) {
        let provinceId= parentNode.provinceId;
        let provinceName=parentNode.provinceName;
        if(provinceId){
          console.log("parent-----start--------->");
          let checked=event;
          let parentCheckedMenuCodeSet = new Set (this.parentCheckedMenuCode);
          let childCheckedMenuCodeSet = new Set (this.childCheckedMenuCode);
          let parentCheckedMenuNameSet = new Set (this.parentCheckedMenuName);
          let childCheckedMenuNameSet = new Set (this.childCheckedMenuName);
          checked==true ? parentCheckedMenuCodeSet.add(provinceId) : parentCheckedMenuCodeSet.delete(provinceId);
          checked==true ? parentCheckedMenuNameSet.add(provinceName) : parentCheckedMenuNameSet.delete(provinceName);
          console.log("parent-----start-----checked---->",checked);
          for(let i = 0 ; i<this.cityTree.length;i++){
            let item=this.cityTree[i];
            if(item.provinceId==provinceId){
                for(let j = 0; j<item.cityVmList.length;j++){
                    let childItem = item.cityVmList[j];
                  console.log("parent-----start-----childItem---->",childItem);
                  if(checked){
                    childCheckedMenuCodeSet.add(childItem.cityId);
                    childCheckedMenuNameSet.add(childItem.cityName);
                    childItem.selected=true;
                  }else {
                    childCheckedMenuCodeSet.delete(childItem.cityId);
                    childCheckedMenuNameSet.delete(childItem.cityName);
                    childItem.selected=false;
                  }
                }
                item.selected = true;

            }
          }
//          let parentCheckedMenuCodeSet = new Set (this.parentCheckedMenuCode);

          this.childCheckedMenuCode=Array.from(childCheckedMenuCodeSet);
          this.parentCheckedMenuCode=Array.from(parentCheckedMenuCodeSet);

          this.childCheckedMenuName=Array.from(childCheckedMenuNameSet);
          this.parentCheckedMenuName=Array.from(parentCheckedMenuNameSet);
          this.parentCheckedMenuName=Array.from(parentCheckedMenuNameSet);
          this.childCheckedMenuName=Array.from(childCheckedMenuNameSet);
          this.showTxtFn();
//          console.log('1111111',this.checkedMenuCodeArray);
          console.log("checkParent---parentCode--11111111111--",JSON.stringify(this.parentCheckedMenuCode));
          console.log("checkParent---childCode----",JSON.stringify(this.childCheckedMenuCode));
          console.log("checkParent---parentName----",JSON.stringify(this.parentCheckedMenuName));
          console.log("checkParent---childName----",JSON.stringify(this.childCheckedMenuName))
//          console.log("checkParent---treeObj----",this.cityTree)
        }
      },
      getParentByChildId (cityId){
        let parentItem;
        for(let i = 0 ; i<this.cityTree.length;i++){
          let item=this.cityTree[i];
          for(let j = 0; j<item.cityVmList.length;j++){
            let childItem = item.cityVmList[j];
            if(childItem.cityId==cityId){
              parentItem = item;
              break;
            }
          }
        }
        return parentItem;
      },
      handleCheckedChildChange(event,childNode) {
        let cityId =childNode.cityId
        console.log("checkChild---treeObj-----start-",this.childCheckedMenuCode);
        if(cityId){
          let checked = event;
          let menuCodeArray=[];
          let menuCodeNameArray = [];
          let parentItem= this.getParentByChildId(cityId);
          let childCheckedMenuCodeSet = new Set (this.childCheckedMenuCode);
          let parentCheckedMenuCodeSet = new Set (this.parentCheckedMenuCode);

          let parentCheckedMenuNameSet = new Set (this.parentCheckedMenuName);
          let childCheckedMenuNameSet = new Set (this.childCheckedMenuName);

          checked==true ? childCheckedMenuCodeSet.add(childNode.cityId) : childCheckedMenuCodeSet.delete(childNode.cityId);
          checked==true ? childCheckedMenuNameSet.add(childNode.cityName) : childCheckedMenuNameSet.delete(childNode.cityName);

          if(parentItem) {
              for(let i = 0 ; i<parentItem.cityVmList.length;i++){
                  if(parentItem.cityVmList[i].cityId == cityId){
                    parentItem.cityVmList[i].selected=event;
                    console.log("checkChild---treeObj----child---item",parentItem.cityVmList[i]);
                  }
                  menuCodeArray.push(parentItem.cityVmList[i].cityId);
                  menuCodeNameArray.push(parentItem.cityVmList[i].cityName);
              }
             console.log("checkChild---treeObj-----parentItem-",parentItem);
            let menuCodeArraySet = new Set (menuCodeArray);

            console.log("checkChild---treeObj-----menuCodeArray-",menuCodeArray);

            let hasChildArraySet = new Set([...menuCodeArraySet].filter(x => childCheckedMenuCodeSet.has(x))); //获取当前一级权限下所有子权限 和 已选择权限 交集
            console.log("checkChild---treeObj---hasChild---Size-",hasChildArraySet.size);
            if(hasChildArraySet.size>0){
              console.log("checkChild---treeObj---hasChild-",hasChildArraySet);
              parentCheckedMenuCodeSet.add(parentItem.provinceId);
              parentCheckedMenuNameSet.add(parentItem.provinceName);
              parentItem.selected=true;
            }else {
              parentCheckedMenuCodeSet.delete(parentItem.provinceId);
              parentCheckedMenuNameSet.delete(parentItem.provinceName);
              parentItem.selected=false;
            }
            this.parentCheckedMenuCode=Array.from(parentCheckedMenuCodeSet);
            this.childCheckedMenuCode=Array.from(childCheckedMenuCodeSet);
            this.parentCheckedMenuName=Array.from(parentCheckedMenuNameSet);
            this.childCheckedMenuName=Array.from(childCheckedMenuNameSet);
            this.showTxtFn();
            console.log("checkChild---treeObj----",this.cityTree);
            console.log("checkChild---parentCode----",JSON.stringify(this.parentCheckedMenuCode));
            console.log("checkChild---childCode----",JSON.stringify(this.childCheckedMenuCode))
            console.log("checkChild---parentName----",JSON.stringify(this.parentCheckedMenuName));
            console.log("checkChild---childName----",JSON.stringify(this.childCheckedMenuName))
//            console.log('22222222',this.checkedMenuCodeArray);

          }

        }
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
      checkedCity(){
        let allCodeArray = this.parentCheckedMenuCode.concat(this.childCheckedMenuCode);
        let allNameArray = this.parentCheckedMenuName.concat(this.childCheckedMenuName);
        let allCodeStr=allCodeArray.join(",");
        let allNameStr=allNameArray.join(",");
        console.log(JSON.stringify(allCodeArray));
        console.log(JSON.stringify(allNameArray));
        this.$emit("call",{allCode:allCodeStr,allName:allNameStr});
//        this.newCityArr = this.childCheckedMenuName;
        this.ifShow = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">
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
  .city-box {
    /*position: absolute;*/
    z-index: 999;
    overflow: hidden;
    /*padding-right: 15px;*/
    background: #fff
  }

  .city {
    width: 80%;
    float: left;
    line-height: 34px;
    color: #404C73;
    font-size: 14px;
    background: #fff
  }

  .city input {
    vertical-align: -2px;
    margin-right: 9px
  }
  .select-box{
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.428571429;
    color: #404C73;
    vertical-align: middle;
    background-color: #ffffff;
    border: 1px solid #E3E5E8;
  }

  .city .city-title {
    height: 34px;
    border-left: 1px solid #E3E5E8
  }

  .city-body {
    border: 1px solid #E3E5E8;
    border-bottom: none;
    height: 200px;
    overflow: scroll;
    background: #fff;
    padding-top: 18px;
    padding-left:20px;
  }

  .city-body .city-body-left {
    width: 5%;
    float: left;
    color: #404C73
  }

  .city-body .city-body-right {
    width: 95%;
    float: left;
    color: #ABB3C8
  }

  .city-body .city-body-right .city-body-title {
    color: #404C73;
    font-weight: 900
  }

  .city-body .city-body-right .city-body-content label {
    margin: 0 0 10px;
    line-height: 20px;
    padding-left: 0
  }

  .city-sidebar {
    width: 20%;
    float: left;
    line-height: 34px;
    color: #404C73;
    font-size: 14px;
    border-right: 1px solid #E3E5E8;
    background: #fff
  }

  .city-sidebar input {
    vertical-align: -2px;
    margin-right: 9px
  }

  .city-sidebar .city-body {
    border: none;
    border-top: 1px solid #E3E5E8
  }

  .city-sidebar label {
    margin: 0;
    line-height: 20px;
    color: #ABB3C8
  }

  .city-footer {
    height: 40px;
    padding-left:20px;
    padding-right:20px;
    line-height: 40px;
    background: #fff;
    float: left;
    border: 1px solid #E3E5E8;
  }
</style>
