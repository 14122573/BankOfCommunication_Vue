<template>
  <a-row type="flex" justify="center" align="top" class="detailContent">
    <a-col :span="labelSpan" class="label">{{label}}：</a-col>
    <a-col :span="textSpan" class="text">
      <template v-if="newText.length>0">{{newText}}</template>
      <slot name='detailContent'></slot>
    </a-col>
  </a-row>
</template>

<script>

export default {
  name : 'DetailItem',
  props: {
    labelSpan: {
      type   : Number,
      default: 10
    },
    textSpan: {
      type   : Number,
      default: 14
    },
    label: {
      type    : String,
      required: true
    },
    text: {
      type: String,
      default() {
        return '暂无'
      }
    }
  },
  data() {
    return {
      pointColor: '',
      newText   : ''
    }
  },
  computed: {
  },
  watch: {
    text(){
      if(this.text==null ||this.text==undefined ||this.text==''){
        this.newText='暂无'
      }else{
        this.newText=this.text
      }
    },
  },
  created(){
  },
  mounted(){
    if(this.text==null ||this.text==undefined ||this.text==''){
      this.newText='暂无'
    }else{
      this.newText=this.text
    }
  },
  methods: {
  }
}
</script>
<style>
.detailContent { font-size: 14px; line-height: 20px;}
.detailContent  .label { text-align: right; color:rgba(0, 0, 0, 0.45)}
.detailContent  .text { text-align: left; word-break:break-all;}

</style>
