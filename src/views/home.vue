<template>
	<h1>Home Page</h1>
</template>

<script>
import {
  permission
} from '@/util/mixins'
export default {
  name: 'HomePage',
  mixins: [permission],
  data() {
    return {

    }
  },
  created() {
    let token = this.$cookie.get('token')
    if (token !=undefined && token !=null && this.$store.state.pUserName =='') {
      this.getInfo()
    }
  },
  mounted() {

  }
}
</script>

<style>

</style>
