<template>
  <div>
    <div class="nav">
      <a-menu class="menu" :default-selected-keys="fromWhichRoute">
        <a-menu-item v-for="(item, index) in childroute" :key="index">
          <router-link :to="item.path">
            <a-icon class="menu_icon" type="caret-right" />
            <span>{{ getTitle(item.meta.sectionId) }}</span>
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
      fromWhichRoute: [],
      childroute    : []
    }
  },
  mounted() {
    this.getChildRoutes()
  },
  methods: {
    /**
     * 显示当前路由的名称
     * @returns { String } - 当前路由的名称
     */
    getTitle(id){
      let homeSectionTitle = JSON.parse(localStorage.getItem('titleList'))
      for(let i = 0 ; i < homeSectionTitle.length; i++) {
        if(homeSectionTitle[i].id == id) {
          return homeSectionTitle[i].titleName
        }
      }
    },

    /**
     * 获取当前路由的 父路由名称 和 同级路由的名称
     */
    getChildRoutes() {
      let fromWhichRoute = this.fromWhichRoute
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
              for(let k = 0; k < route4nav.length; k++) {
                if(this.$route.path == route4nav[k].path) {
                  fromWhichRoute.push(k)
                }
              }
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

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #FFFFFF;
}
</style>
