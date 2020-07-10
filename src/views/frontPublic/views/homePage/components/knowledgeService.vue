<template>
  <div>
    <div class="card-wrapper">
      <a-card
        class="card"
        :loading="loading"
        title="知识服务"
        :bordered="false"
        size="small"
        :headStyle="{ padding: '0', border: '0' }"
        :bodyStyle="{ padding: '0' }"
      >
        <img src="@/assets/images/home/section_line.png" height="4px" width="8%">
        <a class="more" slot="extra" @click="jumpToPage(currentIndex)"
          >更多 >></a
        >
        <a-tabs
          type="card"
          @change="callback"
          tabPosition="top"
          animated
          :default-active-key="currentIndex"
        >
          <a-tab-pane
            key="0"
            :tab="title1"
          >
            <div class="content_wrapper">
              <div class="noti-list" v-for="(item, index) in farmingTechList" :key="index">
                <a class="mouse_trigger" @click="articleDetail(item.id)">
                  <div class="noti_oneline">
                    <a-row
                      type="flex"
                      justify="center"
                      style="margin: 10px 0px"
                    >
                      <a-col :span="2">
                        <img
                          src="@/assets/images/home/bt_icon.png"
                          alt=""
                          srcset=""
                          width="50%"
                        />
                      </a-col>
                      <a-col class="news_title" :span="16">{{
                        item.title
                      }}</a-col>
                      <a-col class="news_date" :span="6">{{
                        $moment(item.releaseDate).format("YYYY-MM-DD")
                      }}</a-col>
                    </a-row>
                  </div>
                </a>
              </div>
            </div>
          </a-tab-pane>

          <a-tab-pane
            key="1"
            :tab="title2"
          >
            <div class="content_wrapper">
              <div class="noti-list" v-for="(item, index) in knowledgeServiceList" :key="index">
                <a class="mouse_trigger" @click="articleDetail(item.id)">
                  <div class="noti_oneline">
                    <a-row
                      type="flex"
                      justify="center"
                      style="margin: 10px 0px"
                    >
                      <a-col :span="2">
                        <img
                          src="@/assets/images/home/bt_icon.png"
                          alt=""
                          srcset=""
                          width="50%"
                        />
                      </a-col>
                      <a-col class="news_title" :span="16">{{
                        item.title
                      }}</a-col>
                      <a-col class="news_date" :span="6">{{
                        $moment(item.releaseDate).format("YYYY-MM-DD")
                      }}</a-col>
                    </a-row>
                  </div>
                </a>
              </div>
            </div>
          </a-tab-pane>

          <a-tab-pane
            key="2"
            :tab="title3"
          >
            <div class="content_wrapper">
              <div class="noti-list" v-for="(item, index) in cloudLessonList" :key="index">
                <a class="mouse_trigger" @click="articleDetail(item.id)">
                  <div class="noti_oneline">
                    <a-row
                      type="flex"
                      justify="center"
                      style="margin: 10px 0px"
                    >
                      <a-col :span="2">
                        <img
                          src="@/assets/images/home/bt_icon.png"
                          alt=""
                          srcset=""
                          width="50%"
                        />
                      </a-col>
                      <a-col class="news_title" :span="16">{{
                        item.title
                      }}</a-col>
                      <a-col class="news_date" :span="6">{{
                        $moment(item.releaseDate).format("YYYY-MM-DD")
                      }}</a-col>
                    </a-row>
                  </div>
                </a>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      news   : [ {
        farmingTechList     : [],
        knowledgeServiceList: [],
        cloudLessonList     : []
      } ],
      title1              : '',
      title2              : '',
      title3              : '',
      farmingTechList     : [],
      knowledgeServiceList: [],
      cloudLessonList     : [],
      currentIndex        : '0',
      childroute          : [],
    }
  },
  updated() {
    this.getTitle()
  },
  mounted() {
    this.getChildRoute()
    this.fetchNews()
    this.getTitle()
  },
  methods: {
    getTitle(){
      let homeSectionTitle = JSON.parse(localStorage.getItem('titleList'))
      if(!!homeSectionTitle && homeSectionTitle.length !== 0) {
        for(let i = 0 ; i < homeSectionTitle.length; i++) {

          if(homeSectionTitle[i].id == '420295374075158528') {
            this.title1 = homeSectionTitle[i].titleName
          }
          if(homeSectionTitle[i].id == '420295378927968256') {
            this.title2 = homeSectionTitle[i].titleName
          }
          if(homeSectionTitle[i].id == '420295382191136768') {
            this.title3 = homeSectionTitle[i].titleName
          }
        }
      }
    },

    /**
     * TAB页的回调
     */
    callback(key) {
      this.currentIndex = key
    },
    getChildRoute() {
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
    },
    handleClick() {
      this.loading = !this.loading
    },
    jumpToPage(index) {
      let routeTo = this.childroute
      this.$router.push({
        name: routeTo[index].name
      })
    },
    articleDetail(id) {
      
      switch (this.currentIndex) {
      case '0':
        this.$router.push({
          name  : '/knowledgeService/farmingTechDetail',
          params: {
            id: id
          }
        })
        break
        
      case '1':
        this.$router.push({
          name  : '/knowledgeService/knowledgeServiceDetail',
          params: {
            id: id
          }
        })
        break

      case '2':
        this.$router.push({
          name  : '/knowledgeService/cloudLessonDetail',
          params: {
            id: id
          }
        })
        break
      default:
        break
      }
    },
    fetchNews() {
      // 养殖技术
      this.$ajax.get({
        url   : this.$api.GET_PUB_ANNOUNCE_LIST,
        params: {
          titleManageId: this.$titleId.farmingId,
          pageNo       : 1,
          pageSize     : 6,
          status_in    : '1'
        }
      }).then(res => {
        if(res.code == '200') {
          this.farmingTechList = this.$com.confirm(res, 'data.content', [])
        }
      })
      // 科普知识
      this.$ajax
        .get({
          url   : this.$api.GET_PUB_ANNOUNCE_LIST,
          params: {
            titleManageId: this.$titleId.knowledgeId,
            pageNo       : 1,
            pageSize     : 6,
            status_in    : '1'
          }
        })
        .then(res => {
          if(res.code == '200') {
            this.knowledgeServiceList = this.$com.confirm(res, 'data.content', [])
          }
        })

      // 云课堂
      this.$ajax
        .get({
          url   : this.$api.GET_PUB_ANNOUNCE_LIST,
          params: {
            titleManageId: this.$titleId.cloudId,
            pageNo       : 1,
            pageSize     : 6,
            status_in    : '1'
          }
        })
        .then(res => {
          if(res.code == '200') {
            this.cloudLessonList = this.$com.confirm(res, 'data.content', [])
          }
        })
    }
  }
}
</script>

<style scoped>
.noti_detail .news_content {
  letter-spacing: 0.5px;
}

.card-wrapper .button_style {
  font-size: 12px;
}

.card-wrapper .noti_detail {
  margin: 20px 0px;
}

.card-wrapper .news_title {
  color: #28292a;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-wrapper .news_date {
  font-size: 12px;
  text-align: right;
  color: #282828;
}

.card-wrapper .news_content {
  color: #656667;
  font-size: 12px;
  height: 50px;
  margin: 10px 0px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.card-wrapper .more {
  font-size: 12px;
  color: #28292a;
}

.card-wrapper {
  height: 400px;
  /* overflow: scroll; */
  overflow: hidden;
  margin: 30px 50px 30px 50px;
}

.card-wrapper .card {
  text-align: left;
}

.notification_banner {
  margin: 5px 0px;
}

.card-wrapper .title_icon {
  color: #2a93f5;
  font-size: 35px;
}

.content_wrapper {
  height: 300px;
}

.noti_oneline {
  height: 30px;
}
</style>
