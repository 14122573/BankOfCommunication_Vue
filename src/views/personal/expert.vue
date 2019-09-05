<template>
  <div class="portalDetailContentWapper">
    专家个人信息维护

  </div>
</template>
<style scoped>
</style>
<script>
import { permission, } from '@/util/mixins'
export default {
  mixins: [permission],
  data() {
    return {
      expertId:''
    }
  },
  created() {
    if(!this.$store.state.userInfos){
      this.getInfo()
    }
    this.expertId = this.$store.state.userInfos.id
    this.getExpertInfo()
  },
  computed:{

  },
  methods: {
    getExpertInfo(){
      console.log(this.expertId)
    }
  }
}
</script>

<style>

</style>
