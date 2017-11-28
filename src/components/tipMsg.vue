<template>
  <el-dialog title=" " width="30%" class="changeWidth" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" size="tiny">
    <div class="tc">

      <i v-if="this.iconType=='success'" class=" el-tipMsg-icon el-icon-circle-check el-tipMsg-icon-success"></i>
      <i v-if="this.iconType=='error'" class=" el-tipMsg-icon el-icon-warning el-tipMsg-icon-error"></i>
      <i v-if="this.iconType=='warn'" class=" el-tipMsg-icon el-icon-warning el-tipMsg-icon-warn"></i>
      <i v-if="this.iconType=='info'" class=" el-tipMsg-icon el-icon-information el-tipMsg-icon-info"></i>
      <p class="msg-span">{{tipMsg}}</p>
    </div>
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @propertyclick="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="test">确 定</el-button>-->
  <!--</span>-->
    <!--<span slot="footer" class="dialog-footer"></span>-->
  </el-dialog>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        dialogVisible:false,
        tipMsg:'',
        iconType:'',// 类型有 success error info warn
      }
    },
    watch:{
      "$route": function(to,from) {

      },
    },
    methods : {
        test () {
        },
        showTipMsg (data) {
            let tipInfo= data.msg;
            let callback=data.callback;
            let scope=data.scope;
            let param=data.param || {};
            let type=data.type; // 类型有 success error info warn
            let time=data.time || 1500;
            this.iconType=type || "";
            if(tipInfo){
              this.tipMsg= tipInfo;
              this.dialogVisible=true;
              let _self = this;
              window.setTimeout(function (){
                _self.dialogVisible=false;
                if(callback){
                  if(scope&&param){
                    callback.call(scope,param);
                  }else{
                    callback.call();
                  }
                }
              },time)
            }

        },
    }
  }
</script>
<style>
  .changeWidth .el-dialog {
    width: 30%;
    max-width:420px ;
    border-radius:8px;
  }
  .changeWidth .el-dialog__header {
    padding:0px;
  }
  .changeWidth .el-dialog__footer {
    padding:0px;
  }
</style>
<style scoped>
  .el-tipMsg-icon {
    /*width: 45px;*/
    /*height: 45px;*/
    font-size: 45px;
    position: relative;
    top: 3px;
  }
  .el-tipMsg-icon-success {
    color: #13ce66;
  }
  .el-tipMsg-icon-error {
    color: rgb(255, 73, 73);
  }
  .el-tipMsg-icon-info {
    color: rgb(80, 191, 255);
  }
  .el-tipMsg-icon-warn {
    color: rgb(247, 186, 42);
  }
  .msg-span {
    line-height:40px;
    margin-top:15px;
    font-size:16px;
  }
</style>

