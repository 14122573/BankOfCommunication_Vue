<template>
  <div :id="'editor'+data" style="width:100%;height:200px"></div>
</template>

<script>
  import sqlFormatter from 'sql-formatter'
  export default {
    data() {
      return {
        arry: [],
        arryKeyWords: [],
      }
    },
    props: ['data'],
    mounted() {
      var editordata = 'editor' + String(this.data);
      let that = this;
      var editor = ace.edit(editordata)
      editor.session.setMode('ace/mode/sql') // 设置语言
      editor.setTheme('ace/theme/chrome') // 设置主题
      editor.setFontSize(18); //字体大小
      editor.setReadOnly(false); //设置只读（true时只读，用于展示代码）
      //自动换行,设置为off关闭
      editor.setOption("wrap", "free");
      //启用提示菜单
      ace.require("ace/ext/language_tools");
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editor.setHighlightActiveLine(true); //代码高亮
      editor.setShowPrintMargin(false);
      editor.getSession().setUseWorker(false);
      editor.getSession().setUseWrapMode(true); //支持代码折叠
      editor.selection.getCursor(); //获取光标所在行或列
      editor.session.getLength(); //获取总行数
      editor.getSession().setUseSoftTabs(true);
      var langTools = ace.require("ace/ext/language_tools");
      langTools.addCompleter({
        getCompletions: function (editor, session, pos, prefix, callback) {
          if (prefix.length === 0) {
            callback(null, []);
            return;
          }
          var value = editor.getValue() + "";
          if (value.toLowerCase().indexOf("from") >= 0 || value.toLowerCase().indexOf("into") >= 0 || value.toLowerCase().indexOf("set") >= 0) {
            callback(null, that.arry);
          }
        }
      });
    },
    methods: {
      sqlFormatter() { //格式化sql语句
        var editordata = 'editor' + String(this.data);
        var editors = ace.edit(editordata)
        var beautifys = ace.require("ace/ext/beautify");
        editors.session.setValue(sqlFormatter.format(editors.session.getValue()));
        beautifys.beautify(editors.session);
      },
      // 页面进入默认设置值
      setmVal(value) {
        var editordata = 'editor' + String(this.data);
        var editors = ace.edit(editordata)
        editors.session.setValue(sqlFormatter.format(value))
      },
      getmVal(){
        var editordata = 'editor' + String(this.data);
        var editor = ace.edit(editordata)
        var execute_sql = editor.session.getValue() + "";
        return execute_sql;
      },
    }

  }
</script>

<style>

</style>
