<template>
  <div>
    <div class="loader" v-if="!ready">
      <div>
        <a-spin tip="资源载入中..." :spinning="finishLoad" size="large"/>
      </div>
      <div style="width: 30%;">
        <a-progress :percent="loadedRatio.toFixed(2)*100" status="active"/>
      </div>
    </div>
    <template>
      <pdf style="width:100%" v-show='!ready' :src="src" @progress="loadedRatio = $event" @num-pages="pageCount=$event"></pdf>
      <template v-if='ready'>
        <pdf style="width:100%" v-for="i in pageCount" :key='i' :page='i' :src="src" ></pdf>
      </template>
    </template>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'ViewPDF',
  components: {pdf},
  props: {
    src: {
      type:String,
      required:true
    },
  },
  data () {
    return {
      fileType: 'pdf', // 文件类型
      ready:false,
      pageCount: 0, // pdf文件总页数
      loadedRatio:0, // 加载进度,
    }
  },
  mounted(){
  },
  computed:{
    finishLoad(){
      let rato = this.loadedRatio.toFixed(2)*100
      if(rato>=100){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    loadedRatio(){
      let rato = this.loadedRatio.toFixed(2)*100
      if(rato>=100){
        this.ready = true
      }
    }
  },
  method:{

  }
}
</script>
<style scoped>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255,255,255,0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
</style>
