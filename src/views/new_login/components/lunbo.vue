<template>
  <div class="lunbo">
    <a-carousel :after-change="onChange" effect="fade">
      <div><img src="@/assets/images/home/sy_banner.jpg" alt="" style="width: 100%; height: 400px"></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
    </a-carousel>
    <LoginPanel class="loginpanel" />
  </div>
</template>
<script>
import LoginPanel from '@/views/new_login/components/LoginPanel'
export default {
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c)
    },
  },
  components: {
    LoginPanel
  },
  data() {
    return {
      
    }
  },
}
</script>
<style scoped>
.lunbo {
  position: relative;
}

.lunbo .loginpanel {
  position: absolute;
  top: 9%;
  right: 11%;
}
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>