
<template>
  <div class="ue_container">
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
  import '../../../static/ueditor-1.4.3.3/ueditor.config'
  import '../../../static/ueditor-1.4.3.3/ueditor.all'
  import '../../../static/ueditor-1.4.3.3/lang/zh-cn/zh-cn'
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
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
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
      this.editor.destroy();
    }
  }
</script>
<style>
  .ue_container{
      line-height:21px;
  }
</style>
