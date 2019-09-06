<template>
<div style="text-align:center;padding-top:1px">
  <div class="errTips">
    <img class="img" src="@/assets/images/networkerr.png" alt="networkerr">
    <p class="tips">网络错误</p>
    <p class="subtips">程序员正在处理中</p>
  </div>
  <div>
    <a-button class="moreOperations" type="primary" @click="toHome">返回工作台</a-button>
    <a-button class="moreOperations" type="primary" @click="toLogin">重新登录</a-button>
  </div>

</div>
</template>

<script>
export default {
  name: 'NetworkError',
  created() {
  },
  methods: {
    toHome(){
      this.$router.push({name:'home'})
    },
    toLogin(){
      this.$com.handleLogOut()
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
