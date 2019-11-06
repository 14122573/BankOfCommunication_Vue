<template>
  <div>
    <p class="operatorInfo"><span class="label">创建人:&nbsp;</span>{{getCreator || "暂无"}}</p>
    <p class="operatorInfo"><span class="label">最后修改人:&nbsp;</span>{{getLastOperator || "暂无"}}</p>
  </div>
</template>
<script>
export default {
  props:{
    creator:{
      type:String
    },
    lastOperator:{
      type:String
    }
  },
  computed:{
    getCreator(){
      return (!this.creator || this.creator == '')?'暂无':this.creator
    },
    getLastOperator(){
      return (!this.lastOperator || this.lastOperator == '')?'暂无':this.lastOperator
    }
  }
}
</script>
<style scoped>
.operatorInfo {font-size:12px; margin:0; }
.operatorInfo .label{ color: rgba(0, 0, 0, 0.4)}
</style>



