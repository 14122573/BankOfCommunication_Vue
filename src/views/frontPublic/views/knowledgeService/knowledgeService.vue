<template>
  <div>
    <div class="background">
      <div class="pageWrapper">
      <Navbar class="navbar" />
      <a-row>
        <a-col :span="6">
          <LeftNav />
        </a-col>
        <a-col :span="17" :offset="1">
          <router-view />
        </a-col>
      </a-row>
    </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/frontPublic/components/navbar.vue'
import LeftNav from '@/views/frontPublic/components/leftNav.vue'
export default {
  components: {
    Navbar,
    LeftNav,
  },
}
</script>

<style scoped>
.background {
  width: 100%;
  background-color: #F1F5F8;
}

.pageWrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.pageWrapper .navbar {
  text-align: left;
  padding: 30px 0px;
}

.pageWrapper .content {
  background-color: #ffffff;
  height: 500px;
  padding: 10px 30px;
}
</style>
