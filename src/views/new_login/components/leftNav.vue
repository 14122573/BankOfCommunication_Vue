<template>
  <div>
    <a-list class="nav" bordered v-for="(item, index) in childroute" :key="index">
      <a-list-item class="nav_title">
        <img src="@/assets/images/home/arrow.png" width= "10px" height="10px" alt="" srcset="">
        <router-link :to="item.path">{{item.meta.title}}</router-link>
      </a-list-item>
    </a-list>
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
    console.log(this.childroute)
  },
  methods: {
    getChildRoutes() {
      let parentRoute = this.$route.matched[0].path
      let currentRoute = this.$route.path
      let routeSelection = this.$router.options.routes
      let route4nav = []
      for(let i = 0; i < routeSelection.length; i++) {
        if(routeSelection[i].path == parentRoute) {
          let routeSelectionInside = routeSelection[i].children
          for(let j = 0; j < routeSelectionInside.length; j++) {
            if(routeSelectionInside[j].path == currentRoute) {
              route4nav = routeSelectionInside[j].children
            }
          }
        }
      }
      this.childroute = route4nav
    }
  },
}
</script>

<style scoped>
  .nav {
    background-color: #FFFFFF;
    text-align: left;
  }

  .nav_title a {
    color: grey;
  }
</style>