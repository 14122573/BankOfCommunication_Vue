<template>
  <div>
    <div class="navigation">
      <a-row type='flex' align='middle' justify='start'>
        <a-col :span="1">
          <div class="nav-icon">
            <img src="@/assets/images/home/navhead.png" height="20px" width="8px" alt="" srcset="">
          </div>
        </a-col>
        <a-col :span="2">
          <a-breadcrumb>
          <a-breadcrumb-item>当前位置：</a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
        <a-col :span="21">
          <a-breadcrumb separator=">">
            <a-breadcrumb-item
              href=""
              v-for="(item, index) in list"
              :key="index"
            >
              <router-link :to="item.path">{{ item.meta.title }}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      list: []
    }
  },
  watch: {
    $route(to, from) {
      this.getRoutes()
    }
  },
  mounted() {
    this.getRoutes()
  },
  methods: {
    getRoutes() {
      let currentRoute = this.$route
      let parentRoute = this.$route.matched[0]
      this.list = []
      this.list.push(parentRoute, currentRoute)
    }
  }
}
</script>

<style scoped>
  .navigation {
    line-height: 30px;
  }
</style>
