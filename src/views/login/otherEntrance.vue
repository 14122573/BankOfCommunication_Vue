<template>
  <div class="otherEntrance">
    <dataService ref="dataService"></dataService>
    <a-row type="flex" justify="space-between" align="top">
      <a-col :span="8" style="text-align:center">
        <p class="entrance" @click="openDataService()">
          <img src="@/assets/images/icon-login-entrance-1.png" alt="" class="icon1">
          <span class="title">数据服务</span>
        </p>
      </a-col>
      <a-col :span="8" style="text-align:center">
        <p class="entrance" @click="$router.push({name:'/cms/knowledgeAnonymous'})">
          <img src="@/assets/images/icon-login-entrance-2.png" alt="" class="icon1">
          <span class="title">知识服务</span>
        </p>
      </a-col>
      <a-col :span="8" style="text-align:center">
        <p class="entrance" @click="$router.push({name: '/cms/manualPublish'})">
          <img src="@/assets/images/icon-login-entrance-3.png" alt="" class="icon1">
          <span class="title">系统服务</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>
<style scoped>
.otherEntrance{ color:white; margin: 0 24px; padding: 16px 0 4px 0; background-color: rgba(255, 255, 255, 0.5); border-radius: 10px }
.entrance{  text-align: center; cursor: pointer;}
.entrance img { height: 70px;}
.entrance:hover img{
  -webkit-transform:rotate(360deg); transform:rotate(360deg); -webkit-transition:-webkit-transform 1s linear; transition:transform 1s linear;
}
.entrance .title{ padding-top: 8px; display: block; clear: both; font-size: 16px; font-weight: bold;}
</style>
<script>
// 引入模态框 通过ref调用子组件的方法弹出
import DataService from '@/views/cms/dataService/dataService'

export default {
  components:{
    DataService
  },
  beforeCreate() {
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  computed: {
  },
  watch: {
  },
  methods:{
    openDataService(){
      this.$refs.dataService.showModal()
    }
  }
}
</script>

