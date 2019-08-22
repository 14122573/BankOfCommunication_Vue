<template>
  <div>

  </div>
</template>

<script>
import {  permission } from '@/util/mixins'
export default {
  name: 'VerifyLogin',
  components: {
  },
  mixins: [permission],

  data() {
    return {

    }
  },
  mounted() {
    let token = this.$cookie.get('token')
    if(!token){
      this.$com.handleLogOut()
    }else{
      this.$ajax.get({
        url: this.$api.GET_USER_INFO,
        params: {}
      }).then(res => {
        // 本地存储用户基本信息
        // if(res.)
      })
    }

  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>

