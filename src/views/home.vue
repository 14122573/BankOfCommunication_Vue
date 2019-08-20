<template>
  <div>
   <FastEntrance></FastEntrance>
  </div>
</template>

<script>
import { permission } from '@/util/mixins'
import FastEntrance from '@/views/home/fastEntrance.vue'

export default {
  name: 'HomePage',
  mixins: [permission],
  components: {
    FastEntrance
  },
  data() {
    return {

    }
  },
  created() {
    let token = this.$cookie.get('token')
    if (token !=undefined && token !=null && this.$store.state.userName =='') {
      this.getInfo()
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
	h1{
		text-align: center;
		padding: 30px;
	}

</style>
