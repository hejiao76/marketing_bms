<template>
    <div>
      <el-dialog class="choose-hd" center title="活动链接" :visible.sync="dialogTableVisible" :show-close="false">
        <div  style="text-align: center">链接：<span id="foo">{{activeUrl}}</span></div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary"  class="btn" data-clipboard-target="#foo" @click="copyLink()">复制链接</el-button>
           <el-button @click="closeLink()" style="background: #e0e0e0;">关 闭</el-button>
  </span>
      </el-dialog>

    </div>
</template>

<script>
  import Final from "../../static/baseSetting/Final"
  import Clipboard from 'clipboard';
  export default {
    name:'app',
    data () {

      return {
        dialogTableVisible:false,
        activeUrl:'',
      }
    },
    watch:{

    },
    mounted() {
      const clipboard = new Clipboard('.btn');
    },
    methods : {
      // 复制链接
      showDialog (url) {
        this.dialogTableVisible=true;
        this.activeUrl = url
      },
      // 复制链接
      copyLink(){
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        this.dialogTableVisible=false;
      },
      //关闭
      closeLink(){
        this.dialogTableVisible=false;
      },

    }
  }
</script>

<style scoped>

</style>
