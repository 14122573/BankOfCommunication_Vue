<template>
  <div class="ace-container">
    <!-- 官方文档中使用 id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
    <div :id="'editor'" class="ace-editor" ref="ace"></div>
  </div>
</template>
<script>
  import ace from 'ace-builds'
  import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入
  import 'ace-builds/src-noconflict/theme-monokai' // 默认设置的主题
  import 'ace-builds/src-noconflict/mode-javascript' // 默认设置的语言模式
  import sqlFormatter from 'sql-formatter'
  export default {
    mounted() {
      this.aceEditor = ace.edit(this.$refs.ace, {
        maxLines: 40, // 最大行数，超过会自动出现滚动条
        minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 20, // 编辑器内字体大小
        theme: this.themePath, // 默认设置的主题
        mode: this.modePath, // 默认设置的语言模式
        tabSize: 4 // 制表符设置为 4 个空格大小
      })
    },
    data() {
      return {
        aceEditor: null,
        themePath: 'ace/theme/monokai', // 不导入 webpack-resolver，该模块路径会报错
        modePath: 'ace/mode/sql' // 同上
      }
    },
    methods:{
      setmVal(value) {
        var editordata = 'editor' ;
        var editors = ace.edit(editordata)
        editors.session.setValue(sqlFormatter.format(value))
      },
      getmVal(){
        var editordata = 'editor'
        var editor = ace.edit(editordata)
        var execute_sql = editor.session.getValue() + "";
        return execute_sql;
      },
    }
  }
</script>
<style scoped>
  .ace_print-margin{
    visibility: hidden;
  }

</style>
