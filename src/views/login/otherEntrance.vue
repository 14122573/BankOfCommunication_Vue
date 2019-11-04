<template>
  <div class="otherEntrance">
    <a-row type="flex" justify="space-between" align="top" :gutter='16' >
      <a-col :span="6"><span class="title">开发功能</span></a-col>
      <a-col :span="18">
        <a-row type="flex" justify="start" align="top" :gutter='16' >
          <a-col :span="7">
            <p class="entrance">
              <img src="@/assets/images/icon-login-entrance-1.png" alt="" class="icon1">
              <span class="title">数据服务</span>
            </p>
          </a-col>
          <a-col :span="7">
            <p class="entrance" @click="$router.push({name:'/cms/knowledgeAnonymous'})">
              <img src="@/assets/images/icon-login-entrance-2.png" alt="" class="icon1">
              <span class="title">知识服务</span>
            </p>
          </a-col>
          <a-col :span="7">
            <p class="entrance">
              <img src="@/assets/images/icon-login-entrance-3.png" alt="" class="icon1">
              <span class="title">系统服务</span>
            </p>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<style scoped>
.otherEntrance{ color:white; margin: 0 16px; padding-top: 16px; }
.otherEntrance .title { font-size: 20px;}
.entrance{  text-align: center; cursor: pointer;}
.entrance img { height: 80px;}
.entrance .title{ padding-top: 8px; display: block; clear: both; font-size: 16px; font-weight: bold;}
</style>
<script>
export default {
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
  }
}
</script>

