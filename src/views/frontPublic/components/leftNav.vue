<template>
  <div>
    <div class="nav">
      <a-menu class="menu">
        <a-menu-item v-for="(item, index) in childroute" :key="index">
          <router-link :to="item.path">
            <a-icon class="menu_icon" type="caret-right" />
            <span>{{ item.meta.title }}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childroute: []
    }
  },
  mounted() {
    this.getChildRoutes()
  },
  methods: {
    handleClick(data) {
      console.log(data)
    },
    getChildRoutes() {
      let parentRoute = this.$route.matched[0].path
      // let currentRoute = this.$route.path
      let currentRoute = '/homepage/knowledgeService'
      let routeSelection = this.$router.options.routes
      let route4nav = []
      for (let i = 0; i < routeSelection.length; i++) {
        if (routeSelection[i].path == parentRoute) {
          let routeSelectionInside = routeSelection[i].children
          for (let j = 0; j < routeSelectionInside.length; j++) {
            if (routeSelectionInside[j].path == currentRoute) {
              route4nav = routeSelectionInside[j].children
            }
          }
        }
      }
      this.childroute = route4nav
    }
  }
}
</script>

<style scoped>
.nav .menu {
  width: 256px;
  text-align: left;
}

.nav .menu_icon {
  color: #2a93f5;
}
</style>
