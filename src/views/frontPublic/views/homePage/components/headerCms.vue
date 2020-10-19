<template>
  <div class="loginFrameBody">
    <a-row
      class="loginFrameTitle"
      type="flex"
      justify="start"
      align="middle"
      :gutter="10"
    >
      <a-col :span="12">
        <!-- <a-row style="margin-left: 180px"> -->
        <a-row style="margin-left: 230px">
          <a-col :span="4"
            ><img src="@/assets/images/logo.png" alt="" class="logo"
          /></a-col>
          <a-col class="" :span="19" :offset="1" style="text-align: left;">
            <span class="logo_title">“智能渔技”综合信息服务平台</span>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <div class="loginFrameMenu">
          <!-- <a-menu
            class="menuStyle"
            mode="horizontal"
            :default-selected-keys="currentRoute"
            :selected-keys="currentRoute"
          > -->
          <a-menu
            class="menuStyle"
            mode="horizontal"
          >
            <a-menu-item v-for="item in menuList" :key="item.key">
              <router-link :to="{ name: item.name }">{{
                item.title
              }}</router-link>
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import routes from '@/router/index.js'
export default {
  data() {
    return {
      currentRoute: [ '0' ], // 默认当前菜单为第一个菜单
      menuList    : [ // 菜单列表(将需要关联的路由的path填入到path里)
        {
          id   : '',
          key  : '0',
          title: '首页',
          name : 'homepage',
          path : [ '/homepage/index' ]
        },
        {
          id   : '420294829105045504',
          key  : '1',
          // title: '通知公告',
          title: '',
          name : 'notificationList',
          path : [ '/homepage/notificationNews', 'homepage/notificationAnnounce', '/homepage/votingRules' ]
        },
        {
          id   : '420295370510000128',
          key  : '2',
          // title: '行业动态',
          title: '',
          name : 'industryList',
          path : [ '/homepage/industryList', '/homepage/industryDetails' ]
        },
        {
          id   : '',
          key  : '3',
          title: '知识服务',
          name : 'farmingTechList',
          path : [
            '/homepage/knowledgeService/farmingTechList',
            '/homepage/knowledgePromotionList',
            '/homepage/cloudLessonList',
            '/homepage/knowledgeService/farmingTechDetail',
            '/knowledgeService/knowledgeServiceDetail',
            '/knowledgeService/cloudLessonDetail'
          ]
        },
        {
          id   : '420295378927969647',
          key  : '4',
          // title: '专题报告',
          title: '',
          name : 'topicReportList',
          path : [ '/homepage/topicReportList' ]
        },
        { 
          id   : '',
          key  : '5',
          title: '数据查询',
          name : 'dataSearch',
          path : [ '/homepage/dataSearch' ]
        }
      ]
    }
  },
  mounted() {
    this.getRoute(),
    this.getHeaderTitle()
  },
  watch: {
    /**
     * @description 监听路由属性，根据前往的路由，对菜单栏的选中做出改变
     * @param {List} to 
     */
    $route(to, from) {
      for (let i = 0; i < this.menuList.length; i++) {
        let pathList = this.menuList[i].path

        for (let j = 0; j < pathList.length; j++) {
          if (to.path.indexOf(pathList[j]) != -1) {
            this.currentRoute = [ this.menuList[i].key ]
          }
        }
      }
    }
  },
  methods: {
    /**
     * @description 获取并显示header里的栏目标题
     */
    getHeaderTitle() {
      this.$ajax
        .get({
          url: this.$api.GET_PUB_TITLE_MANAGE
        })
        .then(res => {
          if(res.code === '200') { 
            let content = res.data.content
            for(let i = 0 ; i < content.length; i++) {
              for(let j = 0 ; j < this.menuList.length; j++) {
                if(this.menuList[j].id == content[i].id) {
                  this.menuList[j].title = content[i].titleName
                  break
                }
              }
            }
          }
        
        })
    },
    
    /**
     * @description 页面第一次加载让当前路由对应的菜单高亮
     */
    getRoute() {
      let path = this.$route.path
      for (let i = 0; i < this.menuList.length; i++) {
        let pathList = this.menuList[i].path

        for (let j = 0; j < pathList.length; j++) {
          if (path.indexOf(pathList[j]) != -1) {
            this.currentRoute = [ this.menuList[i].key ]
          }
        }
      }
    },

  }
}
</script>

<style scoped>
.loginFrameBody {
  margin: 0 auto;
  width: 100%;
  height: 66px;
  background-color: white;
}
.loginFrameTitle {
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 60px;
}
.loginFrameTitle .logo {
  height: 60px;
}

.ant-menu-horizontal {
  border-bottom: 0px;
  height: 64px;
  line-height: 62px;
}

.ant-menu-item, .ant-menu-submenu-title {
  padding: 0px 10px
}
</style>

<style lang="stylus" scoped>
.ant-col .ant-col-19[data-v-8fc72786]
  $megaFontSize()

.loginFrameMenu
  margin-right 0px 30px;

.loginFrameMenu > ul
  $titleFontSize()

.logo_title
  $logoFontSize()
</style>
