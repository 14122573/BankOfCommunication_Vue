<template>
<div style="text-align:center;padding-top:1px">
  <div class="errTips">
    <img class="img" src="@/assets/images/upperlimit.png" alt="upperlimit">
    <p class="tips">您访问过于太频繁了</p>
    <p class="subtips"><span class="waitText">{{this.waitText}}</span>请稍后再试</p>
  </div>
  <div>
    <a-button :disabled='!allowUse' class="moreOperations" type="primary" @click="toHome">返回工作台</a-button>
    <a-button :disabled='!allowUse' class="moreOperations" type="primary" @click="toLogin">重新登录</a-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'UpperLimitErr',
  data() {
    return {
      waitSeconds  : 30,
      allowUse     : false,
      allowUseTimer: null,
      waitText     : ''
    }
  },
  created() {
    const interval = () => {
      this.allowUse = false
      this.allowUseTimer = setInterval(() => {
        if (this.waitSeconds <= 0) {
          this.clearTimer()
          return
        }
        this.waitText = (this.waitSeconds -= 1) + 's'
      }, 1000)
    }
    interval()
  },
  methods: {
    clearTimer() {
      clearInterval(this.allowUseTimer)
      this.waitText = ''
      this.allowUse = true
    },
    toHome(){
      this.$router.push({ name: 'home' })
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
