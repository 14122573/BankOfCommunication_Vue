<template>
  <div class="routerWapper" style="width:100%">
    <div class='layoutMargin contentPadding'>
      <UeditorCompent @ready="editorReady" ref="ue" :value="ueditor.defaultMSG" ></UeditorCompent>
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
      }
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
