<template>
  <div class="ue_container">
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
  import './../../../static/ueditor-1.4.3.3/ueditor.config'
  import './../../../static/ueditor-1.4.3.3/ueditor.all'
  import './../../../static/ueditor-1.4.3.3/lang/zh-cn/zh-cn'
  import Final from "./../../../static/baseSetting/Final"
  export default {
    name: 'UE',
    data () {
//      props:["defaultMsg","config","id"]
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },

    watch  :{
      defaultMsg (val, oldval) {
       if(this.editor){
         this.editor.setContent(this.defaultMsg);
       }
      },
      "$route": function (to, from) {
            console.log("ue watch");
      }
    },
    mounted() {
      const _this = this;
        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        UE.Editor.prototype.getActionUrl = function (action) {
          if(action=='config'){
              return Final.PROXY+"/ueditor/upload?action=config&noCache="+new Date().getTime();
          }else if (action == 'uploadimage') {
            return Final.UPLOAD_PATH;
          } else if (action == 'listimage' || action == 'listfile') {
            //return serverpath+"car/admin/v1/brand/upload";
          } else {
            return this._bkGetActionUrl.call(this, action);
          }
        }

      this.editor = UE.getEditor(this.id, Object.assign({scaleEnabled:true},this.config)); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    beforeRouteLeave (to, from, next) {
      this.destroyed();
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      console.log('11111 destoryed-----------');
      this.editor.destroy();
    }
  }
</script>
<style>
  .ue_container{
      line-height:21px;
  }
</style>
