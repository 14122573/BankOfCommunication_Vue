<template>
<div style="text-align:center">
  <div class="errTips">
    <img class="img" src="@/assets/images/noauth.png" alt="noauth">
    <p class="tips">无权访问</p>
    <p class="subtips">请联系管理员处理</p>
  </div>

    <a-button class="moreOperations" type="primary" @click="toHome">返回工作台</a-button>
</div>
</template>

<script>
export default {
  name: 'NoAuth',
  created() {
  },
  methods: {
    toHome(){
      this.$router.push({name:'home'})
    }
  }
}
</script>

<style scoped>
.errTips .tips {margin-bottom: 0 !important}
</style>
<style>
.errTips { width: 400px; margin: 150px auto 0 auto; text-align: center; line-height: 30px;}
.errTips .img {  margin:0 auto 30px auto; width: 140px; }
.errTips .tips { font-size: 20px; line-height: 30px}
.errTips .subtips {color:#999}
.moreOperations { margin:0 auto; width:100px; }
</style>
