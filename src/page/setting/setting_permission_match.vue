<template>
  <div class="setting_per_ma">
    <!--<div class="setting_perMa_header">-->
      <!--<el-form :inline="true" :model="settingPerM"  ref="settingPerM" class="demo-form-inline">-->
        <!--<el-form-item label="" prop="set_perMPhone">-->
          <!--<el-input v-model="settingPerM.set_perMPhone" placeholder="请输入新职位"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="setting_pmAddPos">添加</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
    <div class="setting_stMa_content" style="width:100%;border:1px solid #ccc;min-height:600px;">
      <div class="fl" style="width: 30%">
        <el-table :data="roles"  border highlight-current-row @row-click="rolesRowClick" style="width: 100%; cursor: pointer;">
          <el-table-column align="center" type="index" label="" width="40"></el-table-column>
          <el-table-column prop="roleName" :formatter="formaterRoleName" label="职务" align="center" width=""></el-table-column>
          <el-table-column prop="departmentCode" label="所属部门编码" align="center" width=""></el-table-column>
        </el-table>
      </div>
      <div v-if="currentClickRowData" class="fl pl20" style="border: 1px solid #dfe6ec; width:70%;min-height:485px;" >
        <el-form labelWidth="100px" label-position="left" class="demo-ruleForm">
          <el-form-item label="职务：">
            <span>{{currentClickRowData.roleName}}</span>
          </el-form-item>
          <el-form-item label="所属部门：">
            <span >{{currentClickRowData.departmentCode}}</span>
          </el-form-item>
          <el-form-item label="可选权限：">
            <div  v-for="item in menus" class="mb15">
              <el-checkbox v-model="checkedMenuCodeArray" @change="handleCheckAllChange($event,item.menuCode)" v-if="item.menuLevel==1" :label="item.menuCode" :key="item.menuCode" class="fw">{{item.menuName}}</el-checkbox>
              <!--<el-checkbox-group v-model="checkedMenuCodeArray" @change="handleCheckedChildChange($event,item.menuCode)" class="ml30">-->
                <!--<el-checkbox  v-for="childItem in item.children" :label="childItem.menuCode" :key="childItem.menuCode">{{childItem.menuName}}</el-checkbox>-->
              <!--</el-checkbox-group>-->
            </div>
          </el-form-item>
        </el-form>
        <div class="sure_button mb20" style="text-align: center;">
          <el-button  type="primary" @click="saveMenus">确 定</el-button>
        </div>
      </div>
    </div>
    <!--<div class="setting_perM_content" style="width:100%;border:1px solid #ccc;min-height:600px;">-->
      <!--<div style="position: absolute; top: 35%; left: 35%; line-height: 40px;">-->
        <!--<el-form labelWidth="100px" class="demo-ruleForm">-->
          <!--<el-form-item v-for="role in roles">-->
            <!--<span style="font-weight: bold">{{role.roleName}}：</span>-->
            <!--<label v-for="menu in menus" v-if="menu.menuLevel==1" @click="menusForm(role.roleCode)" :label="menu.menuName">{{menu.menuName}}  </label>-->
            <!--<div v-show="isShow" style="border: 1px solid #dfe6ec; padding: 20px">-->
              <!--<el-form :inline="true" class="demo-form-inline" :model="addMenus">-->
                <!--&lt;!&ndash;<el-form-item>&ndash;&gt;-->
                <!--&lt;!&ndash;<label v-model="addMenus.roleCode=role.roleCode">{{role.roleName}}：</label>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                <!--<el-form-item>-->
                  <!--<el-checkbox-group v-model="addMenus.menuCodes">-->
                    <!--<el-checkbox v-for="item in menu" v-if="item.menuLevel==1" :label="item.menuCode">{{item.menuName}}</el-checkbox>-->
                    <!--&lt;!&ndash;<el-checkbox v-for="menu in menus" v-if="menu.menuLevel==1" :label="menu.menuCode">{{menu.menuName}}</el-checkbox>&ndash;&gt;-->
                  <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                  <!--<el-button type="primary" @click="saveMenus">保存</el-button>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
            <!--</div>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
        <!--&lt;!&ndash;<el-popover ref="popover5" placement="bottom" width="160" trigger="hover">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-checkbox-group v-model="addMenus.menuCodes">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-checkbox v-for="item in menu" v-if="item.menuLevel==1" :label="item.menuCode">{{item.menuName}}</el-checkbox>&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<el-checkbox v-for="menu in menus" v-if="menu.menuLevel==1" :label="menu.menuCode">{{menu.menuName}}</el-checkbox>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;</el-checkbox-group>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form :inline="true" class="demo-form-inline" :model="addMenus">&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<el-form-item>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<label v-model="addMenus.roleCode=role.roleCode">{{role.roleName}}：</label>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;</el-form-item>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<el-form-item>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-checkbox-group v-model="addMenus.menuCodes">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-checkbox v-for="item in menu" v-if="item.menuLevel==1" :label="item.menuCode">{{item.menuName}}</el-checkbox>&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<el-checkbox v-for="menu in menus" v-if="menu.menuLevel==1" :label="menu.menuCode">{{menu.menuName}}</el-checkbox>&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;</el-checkbox-group>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-form-item>&ndash;&gt;-->
              <!--&lt;!&ndash;&lt;!&ndash;<el-button type="primary" @click="saveMenus">保存</el-button>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
          <!--&lt;!&ndash;<div style="text-align: right; margin: 0">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-popover>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button v-popover:popover5>&ndash;&gt;-->
          <!--&lt;!&ndash;<label v-for="menu in menus" v-if="menu.menuLevel==1" :label="menu.menuName">{{menu.menuName}}  </label>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;<div v-for="role in roles">&ndash;&gt;-->
        <!--&lt;!&ndash;<span>{{role.roleName}}：</span>&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash;<el-select v-model="checkedMenu" multiple placeholder="请选择">&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<el-option v-for="menu in menus" :key="menu.menuCode" :value="menu.menuCode" :label="menu.menuName" v-if="menu.menuLevel==1">&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;</el-option>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash;</el-select>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;<label v-for="menu in menus" v-if="menu.menuLevel==1" @click="menusForm(role.roleCode)" :label="menu.menuName">{{menu.menuName}}  </label>&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;<el-checkbox-group v-model="checkedMenu">&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;<el-checkbox v-for="menu in menus" v-if="menu.menuLevel==1" :label="menu.menuName">{{menu.menuName}}</el-checkbox>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;</el-checkbox-group>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;<el-button type="primary">保存</el-button>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-tree v-show="isShow" :data="menus" show-checkbox></el-tree>&ndash;&gt;-->

      <!--&lt;!&ndash;<el-form label-width="80px">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item v-for="role in roles" label="role.roleName">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-select v-model="role.roleName">&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
    <!--</div></div>-->
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>
<script>
  import Final from "./../../util/Final";
  import api from './../../fetch/api';
  import VTipMsg from "./../../components/tipMsg"
  export default{
    components :{
      VTipMsg
    },
    data(){
      return{
        checkedMenuCodeArray: [],
        currentClickRowData:'',
        roleCode: '',
        roles: [],
        menus: [],
        menu: [],
      }
    },
    created(){
      this.getAllRoles();
    },
    methods:{
      formaterRoleName (row, column, cellValue) {
        if(row.roleName=="null"){
          row.roleName="无"
        }
        return row.roleName;
      },
      getAllRoles(){
        api.set_get_roles()
          .then(res => {
            if(res.status==1){
              this.roles = res.result;
              this.roleCode = res.result[0].roleCode;
              this.currentClickRowData=res.result[0];
              this.menusForm(res.result[0].roleCode)
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          })
      },
      rolesRowClick(row,event,column){
        this.roleCode = row.roleCode;
        this.currentClickRowData=row;
        this.menusForm(row.roleCode);
      },
      handleCheckAllChange(event, menuCode){
        let checkedMenuCodeArraySet = new Set(this.checkedMenuCodeArray);
        let checked = event.target.checked
        checked == true ? checkedMenuCodeArraySet.add(menuCode) : checkedMenuCodeArraySet.delete(menuCode);
        for(let i in this.menus){
          if(this.menus[i].parentMenuCode == menuCode){
            if(checked){
                checkedMenuCodeArraySet.add(this.menus[i].menuCode);
            }else {
              checkedMenuCodeArraySet.delete(this.menus[i].menuCode);
            }
          }
        }
        this.checkedMenuCodeArray = Array.from(checkedMenuCodeArraySet);
      },
      menusForm(roleCode){
        api.set_menus_role({roleCode: roleCode})
          .then(data => {
            if(data.status == 1){
              let array = [];
              for (let i in data.result){
                if (data.result[i].selected == true){
                  array.push(data.result[i].menuCode);
                }
              }
              this.checkedMenuCodeArray = array;
              this.menus = data.result
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg: res.message,
                type: 'error'
              })
            }
          })
      },
      //职位添加菜单
      saveMenus(){
        let param = {};
        param.roleCode = this.roleCode;
        param.menuCodes = this.checkedMenuCodeArray.toString();
        api.set_add_menus(param)
          .then(res => {
              if(res.status == 1){
                this.$refs.tipMsgRef.showTipMsg({
                  msg: res.message,
                  type: 'success',
                  scope: this,
                  callback: function(){
                    this.menusForm(this.roleCode);
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
