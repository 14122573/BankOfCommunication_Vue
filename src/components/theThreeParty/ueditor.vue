<template> 
  <VueUeditorWrap v-model="value2" :config='ueditorConfig'></VueUeditorWrap>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import api from '@/server/api'

export default {
  name : 'UE',
  props: {
    value: {
      default: function() {
        return ''
      }
    },
    //配置可以传递进来
    ueditorConfig: {
      type   : Object,
      default: () => {
        return {
          serverUrl       : api.GET_UEDITOR_SERVICE_URL,
          UEDITOR_HOME_URL: '/static/ueditor/',
          // toolbars        : [ [
          //   'undo', 'redo', '|',
          //   'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          //   'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          //   'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          //   'directionalityltr', 'directionalityrtl', 'indent', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          //   'simpleupload', 'insertimage', 'edittable', 'edittd', 'insertvideo', 'map', 'inserttable', '|',
          //   'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          //   'link', 'unlink',
          // ] ],
          toolbars        : [ [
            'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'insertimage', 'edittable', 'edittd', 'insertvideo', 'map', 'inserttable', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink',
          ] ],
          zIndex            : 1,
          autoHeightEnabled : false, // {Boolean} [默认值：true] 编辑器不自动被内容撑高
          elementPathEnabled: false, // {Boolean} [默认值：true] 是否启用元素路径，默认是显示
          wordCount         : false, // {Boolean} [默认值：true] 是否开启字数统计
          enableAutoSave    : false, // {Boolean} [默认值：true] 启用自动保存，这个配置忽好忽坏
          initialFrameWidth : '95%',
          saveInterval      : 100000000, // {Number} [默认值：500] 自动保存间隔时间，单位ms
          autoFloatEnabled  : false, // [默认值：true] // 是否保持toolbar的位置不动
          initialFrameHeight: 300,
        }
      }
    }
  },
  components: {
    VueUeditorWrap,
  },
  data() {
    return {
      //每个编辑器生成不同的id,以防止冲突
      randomId: 'editor_' + (Math.random() * 100000000000000000),
      //编辑器实例
      instance: null,
      ready   : false,
      value2  : '',
    }
  },
  watch: {
    value: function(val, oldVal) {
      if (val != null && this.ready) { 
        this.value2 = val
      }
    },
    ready(){
      if (this.value != null && this.ready) { 
        this.value2 = this.value
      }
    }
  },
  created(){
    
  },
  //此时--el挂载到实例上去了,可以初始化对应的编辑器了
  mounted() { 
    this.ready = true 
  },

  beforeDestroy() {
    // 组件销毁的时候，要销毁 UEditor 实例
    if(this.instance !== null && this.instance.destroy) {
      this.instance.destroy()
    }
  }, 
}

</script>

<style>
</style>
