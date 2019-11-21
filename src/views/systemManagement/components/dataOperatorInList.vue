<template>
  <div>
    <p class="operatorInfo"><span class="label">创建人:&nbsp;</span>{{getCreator}}</p>
    <p class="operatorInfo"><span class="label">最后修改人:&nbsp;</span>{{getLastOperator}}</p>
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
      return this.creator || '初始化数据'
    },
    getLastOperator(){
      return this.lastOperator || '暂无'
    }
  }
}
</script>
<style scoped>
.operatorInfo {font-size:12px; margin:0; }
.operatorInfo .label{ color: rgba(0, 0, 0, 0.4)}
</style>



