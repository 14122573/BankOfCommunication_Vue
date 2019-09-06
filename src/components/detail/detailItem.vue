<template>
  <a-row type="flex" justify="center" align="top" class="detailContent">
    <a-col :span="labelSpan" class="label">{{label}}：</a-col>
    <a-col :span="textSpan" class="text">{{text}}</a-col>
  </a-row>
</template>

<script>

export default {
  name: 'DetailItem',
  props: {
    labelSpan:{
      type: Number,
      default:10
    },
    textSpan:{
      type: Number,
      default:14
    },
    label:{
      type: String,
      required: true
    },
    text:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      pointColor:''
    }
  },
  computed: {
  },
  created(){
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
