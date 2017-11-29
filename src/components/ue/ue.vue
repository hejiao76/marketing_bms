
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
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
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
  .ue_container .el-form-item__content {
      line-height:10px !important;
  }
</style>
