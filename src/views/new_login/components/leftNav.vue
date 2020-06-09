<template>
  <div>
    <!-- <a-list class="nav" bordered v-for="(item, index) in childroute" :key="index">
      <a-list-item class="nav_wrapper">
        <img src="@/assets/images/home/arrow.png" width= "10px" height="10px" alt="" srcset="">
        <router-link 
          class="nav_title"
          :to="item.path"
        >
          {{item.meta.title}}
        </router-link>
      </a-list-item>
    </a-list> -->
    <div class="nav">
      <a-menu
        class="menu"
        mode="vertical"
        v-for="(item, index) in childroute"
        :key="index"
        @click="handleClick"
      >
        <a-menu-item class="menu_title" :key="index">
          <router-link :to="item.path">
            <a-icon class="menu_icon" type="caret-right" />
            {{ item.meta.title }}
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
    };
  },
  mounted() {
    this.getChildRoutes();
  },
  methods: {
    handleClick(data) {
      console.log(data);
    },
    getChildRoutes() {
      let parentRoute = this.$route.matched[0].path;
      // let currentRoute = this.$route.path
      let currentRoute = "/homepage/knowledgeService";
      let routeSelection = this.$router.options.routes;
      let route4nav = [];
      for (let i = 0; i < routeSelection.length; i++) {
        if (routeSelection[i].path == parentRoute) {
          let routeSelectionInside = routeSelection[i].children;
          for (let j = 0; j < routeSelectionInside.length; j++) {
            if (routeSelectionInside[j].path == currentRoute) {
              route4nav = routeSelectionInside[j].children;
            }
          }
        }
      }
      this.childroute = route4nav;
    }
  }
};
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
