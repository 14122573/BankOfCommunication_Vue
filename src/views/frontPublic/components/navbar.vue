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
              <router-link :to="item.path">{{ item.meta.sectionId?getTitle(item.meta.sectionId):item.meta.title }}</router-link>
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
    /**
     * 点击栏目名称去到对应的栏目
     * 
     * @param {String} id - 栏目id
     * @returns {String} 栏目名称
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
     * 二级面包屑功能实现
     */
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
