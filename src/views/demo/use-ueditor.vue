<template>
  <div class="routerWapper" style="width:100%">
    <div class='layoutMargin contentPadding'>
      <UeditorCompent @ready="editorReady" ref="ue" :value="ueditor.defaultMSG" :ueditorConfig='ueditorConfig'></UeditorCompent>
    </div>
  </div>
</template>

<script>
import UeditorCompent from '@/components/theThreeParty/ueditor.vue'
export default {
  name: 'UseUEDITOR',
  components: { UeditorCompent },
  data() {
    return {
      ueditor:{
        defaultMSG:'',
        formContent:'213131'
      },
      ueditorConfig:{
        serverUrl:'http://iftp.omniview.pro/api/service-release/release/ueditor/execute',
        toolbars:[[
          'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'attachment', 'insertvideo','|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink',
        ]],
        zIndex:1,
        initialFrameHeight:300}
    }
  },
  mounted() {
  },
  methods: {
    editorReady(instance) {
      instance.setContent(this.ueditor.formContent)
      instance.addListener('contentChange', () => {
        this.ueditor.formContent = instance.getContent()
        console.log('editorReady',this.ueditor.formContent )
      })
    },

  }
}
</script>
