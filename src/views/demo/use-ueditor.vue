<template>
  <div class="routerWapper" style="width:100%">
    <div class='layoutMargin contentPadding'>
      <VueUeditorWrap v-model="ueditor.formContent" :config='ueditorConfig'></VueUeditorWrap>
      <!-- <UeditorCompent @ready="editorReady" ref="ue" :value="ueditor.defaultMSG" :ueditorConfig='ueditorConfig'></UeditorCompent> -->
    </div>
  </div>
</template>

<script>
import UeditorCompent from '@/components/theThreeParty/ueditor.vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name      : 'UseUEDITOR',
  components: { UeditorCompent, VueUeditorWrap },
  data() {
    // 如果是本地开发的话会跨域，故设置了webpack代理，具体设置在/config/index.js的dev.proxyTable中
    const base = process.env.NODE_ENV === 'development' ? '/ueditorDevBase' : 'http://iftp.omniview.pro/api'
    return {
      ueditor: {
        defaultMSG : '',
        formContent: '213131'
      },
      ueditorConfig: {
        serverUrl       : base + '/service-release/release/public/ueditor/execute',
        UEDITOR_HOME_URL: '/static/ueditor/',
        toolbars        : [ [
          'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'attachment', 'insertvideo', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink',
        ] ],
        zIndex            : 1,
        autoHeightEnabled : false, // {Boolean} [默认值：true] 编辑器不自动被内容撑高
        elementPathEnabled: false, // {Boolean} [默认值：true] 是否启用元素路径，默认是显示
        wordCount         : false, // {Boolean} [默认值：true] 是否开启字数统计
        enableAutoSave    : false, // {Boolean} [默认值：true] 启用自动保存，这个配置忽好忽坏
        initialFrameWidth : '80%',
        saveInterval      : 100000000, // {Number} [默认值：500] 自动保存间隔时间，单位ms
        autoFloatEnabled  : false, // [默认值：true] // 是否保持toolbar的位置不动
        initialFrameHeight: 300
      }
    }
  },
  mounted() {
  },
  watch: {
    'ueditor.formContent': {
      handler: function(val) {
        // this.username = val
      },
      deep: true
    },
  },
  methods: {
    editorReady(instance) {
      instance.setContent(this.ueditor.formContent)
      instance.addListener('contentChange', () => {
        this.ueditor.formContent = instance.getContent()
      })
    },

  }
}
</script>
