<template>
  <a-card style="width: 300px; max-width: 300px; text-align: center" class="resetSuccess" title="密码重置成功">
    <div class="successInfo">
      <a-result
        status="success"
        title="重置成功"
        :sub-title="count.num + count.des"
      >
        <template #extra>
        </template>
      </a-result>
    </div>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      show : true,
      count: {
        num: '',
        des: '秒后将自动跳转到登录页'
      }
    }
  },
  created() {
    this.threeGo()
  },
  methods: {
    threeGo(){
      const TIME_COUNT = 3
      if(!this.timer){
        this.count.num = TIME_COUNT
        this.show = false
        this.timer = setInterval(()=>{
          if(this.count.num > 1 && this.count.num <= TIME_COUNT){
            this.count.num--
          }else{
            this.show = true
            clearInterval(this.timer)
            this.timer = null
            //跳转的页面写在此处
            this.$emit('on-change', 'login')
          }
		  },1000)
      }
    }
  },
}
</script>