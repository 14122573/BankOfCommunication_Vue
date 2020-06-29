<template>
  <div>
    <p class="operatorInfo"><span class="label">级别:&nbsp;</span>{{getLv}}</p>
    <p class="operatorInfo"><span class="label">创建人:&nbsp;</span>{{getCreator}}</p>
    <p class="operatorInfo"><span class="label">最后修改人:&nbsp;</span>{{getLastOperator}}</p>
  </div>
</template>
<script>
import roleLevels from '@/config/roleLevels.json'

export default {
  props: {
    creator: {
      type: String
    },
    lastOperator: {
      type: String
    },
    level: {
      type: Number
    },
  },
  data(){
    return {
      roleLevels,
    }
  },
  computed: {
    getLv(){
      if(!this.level) return '暂无'
      for(let i=0;i<this.roleLevels.length;i++){
        if(this.level == this.roleLevels[i].level){
          return this.roleLevels[i].levelName
        }
      }
    },
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

