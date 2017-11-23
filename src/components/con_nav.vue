<template>
  <nav>
    <div style="display:inline-block;float:left;" >
    <img  src="./../assets/img/house.png" class="vm">
    <!--<span class="vm">您的当前位置 : <span class="f_blue">开始-&#45;&#45;工作</span></span>-->
    <span class="vm">您的当前位置 :
      <span v-for="(menuObj,index) in navList"  disabled="true">{{menuObj.name}}<span v-if="index!=(navList.length-1)"> / </span>

      <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
        <!--<el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>-->
        <!--<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>-->
        <!--<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
        <!--<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
      <!--</el-tabs>-->
       </span>
    </span>
    </div>
    <!--<el-breadcrumb class="ml5" style="float:left;line-height: 36px;" separator="/">-->
      <!--<el-breadcrumb-item v-for="menuObj in navList" :to="{ path: menuObj.path }" disabled="true">{{menuObj.name}}</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->

  </nav>
</template>

<script>
export default {
  data () {
    return {
      mainMenuCode:'',
      childNodes:[],
      currentNode:'',
      mainNode:'',
      navList:[],
      navCodeList:[],
      roleMenusTreeObj:""
    }
  },
  watch:{
    "$route": function(to,from) {
      this.navList=[];
      this.initNav(to.path);
    }
  },
  created () {
    let currentPath=this.$route.path;
    this.navList=[];
    this.initNav(currentPath)

  },
  methods: {
      initNav (currentPath) {
        let roleMenusTree = JSON.parse(localStorage.getItem("roleMenus"));
        this.getCurrentMenuNode(currentPath,roleMenusTree);
        this.mainNode=this.getMainNode(this.currentNode,roleMenusTree);
        this.roleMenusTreeObj = roleMenusTree;
        this.navList.push(this.currentNode);
        this.getParentNode(this.currentNode,this.roleMenusTreeObj);
        this.navList.reverse();
      },
    getParentNode (node,pnode) {
        if( pnode.children){
          for(let i = 0 ; i < pnode.children.length;i++){
              let item =  pnode.children[i];
              if(node.parentMenuCode== item.menucode){
                  this.navList.push(item);
                  this.navCodeList.push(item.menucode);
                  this.getParentNode(item,this.roleMenusTreeObj);
                  break;
              }else if(item.children){
                    this.getParentNode(node,item);
              }
          }
        }

    },
    getCurrentMenuNode (path,node) {
      if(node.path==path){
        this.currentNode= node;
      }
      if(node.children){
        for(let i=0;i<node.children.length;i++){
          this.getCurrentMenuNode(path,node.children[i]);
        }
      }
    },
    getMainNode (childNode,roleMenusTree) {
      let mainMenuArray=roleMenusTree.children;
      let childPath=childNode.path;
      if(childPath){
        let childPathArray=childPath.split("/");
        let mainPath="/"+childPathArray[1];
        let mainNode=""
        for(let i=0;i<mainMenuArray.length;i++){
          let item = mainMenuArray[i];
          if(item.path==mainPath){
            mainNode=item;
            if(item.children){
              this.childNodes=item.children;
            }
          }
        }
        return mainNode;
      }

    }
  }
}
</script>

<style scoped>

</style>
