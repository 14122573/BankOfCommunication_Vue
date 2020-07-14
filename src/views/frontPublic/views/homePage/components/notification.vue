<template>
  <div>
    <div class="card-wrapper">
      <a-card
        class="card"
        :loading="loading"
        :title="title"
        :bordered="false"
        size="small"
        :headStyle="{ padding: '0', border: '0' }"
        :bodyStyle="{ padding: '0' }"
      >
        <img src="@/assets/images/home/section_line.png" height="4px" width="8%">
        <a class="more" slot="extra" @click="jumpToPage">更多 >></a>
        <div class="content_wrapper">
          <div class="notification_banner">
            <img
              src="@/assets/images/home/sygg_tp.jpg"
              alt=""
              srcset=""
              height="80px"
              width="100%"
            />
          </div>
          <div class="noti-list" v-for="(item, index) in news" :key="index">
            <a class="mouse_trigger" @click="articleDetails(item)">
              <!-- 设置第一个通知为详情显示 -->
              <div class="noti_detail" v-if="index == 0">
                <a-row type="flex" justify="center">
                  <a-col class="news_title" :span="16">{{ item.title }}</a-col>
                  <a-col class="news_date" :span="8" v-if="!!item.releaseDate">{{
                    $moment(item.releaseDate).format("YYYY-MM-DD")
                  }}</a-col>
                  <a-col class="news_date" :span="8" v-else>{{
                    $moment(item.createTime).format("YYYY-MM-DD")
                  }}</a-col>
                </a-row>
                <a-row>
                  <a-col class="news_content" :span="24" :title="item.introduction" v-html="item.introduction"> 
                  </a-col>
                </a-row>
              </div>
              <!-- 设置除第一行外的通知为单行缩略显示 -->
              <div class="noti_oneline" v-else>
                <a-row type="flex" justify="center" style="margin: 10px 0px">
                  <a-col :span="2">
                    <span v-if="item.isVote == '1'">
                      <img
                        src="@/assets/images/home/tp_icon.png"
                        alt=""
                        srcset=""
                        width="50%"
                      />
                    </span>
                    <span v-else>
                      <img
                        src="@/assets/images/home/bt_icon.png"
                        alt=""
                        srcset=""
                        width="50%"
                      />
                    </span>
                  </a-col>
                  <a-col class="news_title" :span="16">{{ item.title }}</a-col>
                  <a-col class="news_date" :span="6" v-if="!!item.releaseDate">{{
                    $moment(item.releaseDate).format("YYYY-MM-DD")
                  }}</a-col>
                  <a-col class="news_date" :span="6" v-else>{{
                    $moment(item.createTime).format("YYYY-MM-DD")
                  }}</a-col>
                </a-row>
              </div>
            </a>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      news   : [],
      isLogin: this.$store.state.isLogin,
      title  : '',
      titleId: '420294829105045504'
    }
  },
  updated() {
    this.getTitleList()
  },
  mounted() {
    this.getToken()
    this.fetchNews(this.isLogin)
    this.getTitleList()
  },
  computed: {
    /**
     * @description 获取isLogin的状态
     */
    listenIsLogin() {
      return this.$store.state.isLogin
    },
  },
  watch: {
    /**
     * @description 监听isLogin的状态是否发生改变
     * @param {Bool} newV isLogin状态
     */
    listenIsLogin(newV, oldV) {
      this.fetchNews(newV)
      this.getToken()
      this.getTitleList()
    },
  },
  methods: {
    /**
     * @description 获取栏目卡片的名称
     */
    getTitleList() {
      let homeSectionTitle = JSON.parse(localStorage.getItem('titleList'))
      if(!!homeSectionTitle && homeSectionTitle.length !== 0) {
        for(let i = 0 ; i < homeSectionTitle.length; i++) {
          if(homeSectionTitle[i].id == this.titleId) {
            this.title = homeSectionTitle[i].titleName
          }
        }
      }
    },

    /**
     * @description 如果账户已经登录，则修改登录状态为true
     */
    getToken() {
      let cookie = this.$cookie.get('token')
      if (!!cookie) {
        this.$store.commit('SET_ISLOGIN', true)
      }
    },
    jumpToPage() {
      this.$router.push({
        name: 'notificationList'
      })
    },
    handleClick() {
      this.loading = !this.loading
    },

    /**
     * @description 展示文章内容详情
     * @param {Array} item 点击的文章内容
     */
    articleDetails(item) {
      // 0: 不可投票 1: 可投票
      if(item.isVote === '0') {
        this.$router.push({
          name  : 'notificationAnnounce',
          params: {
            wrapper: item.voteId ? true : false, // 投票结果公示和通知公告文章显示方式， true投票结果公示，false通知公告文章
            id     : item.id
          }
        })
      } else {
        this.$router.push({
          name  : 'votingRules',
          params: {
            id: item.voteId ? item.voteId: item.id
          }
        })
      }
    },

    /**
     * @description 获取栏目内容列表, 登录和不登录情况下调用不一样的接口
     * @param {Bool} isLogin 是否登录
     */
    fetchNews(isLogin) {
      this.news = []
      this.$ajax
        .get({
          url   : isLogin ? this.$api.GET_ANNOUNCE_LIST : this.$api.GET_PUB_ANNOUNCE_LIST,
          params: {
            titleManageId: this.$titleId.notificationId,
            pageNo       : 1,
            pageSize     : 6,
            status_in    : 1,
            voteType     : isLogin ? 1:0
          } // 用通知公告的titleManageId代替
        })
        .then(res => {
          if (res.code === '200') {
            let content = res.data.content
            if (isLogin == false) {
              for (let i = 0; i < content.length; i++) {
                if (content[i].isVote == '0') { // 只输出不可投票数据
                  this.news.push(content[i])
                }
              }
            } else {
              this.news = this.$com.confirm(res, 'data.content', {})
            }
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

.card-wrapper .card {
  border: 0px;
}

.card-wrapper .noti_detail {
  height: 100px;
  margin: 20px 0px;
}

.card-wrapper .news_title {
  color: #282828;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 20px;
}

.card-wrapper .news_date {
  font-size: 12px;
  height: 20px;
  text-align: right;
  color: #515151;
}

.card-wrapper .news_content {
  color: #666666;
  height: 60px;
  line-height: 20px;
  margin: 10px 0px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.card-wrapper .more {
  font-size: 12px;
  color: #28292a;
}

.card-wrapper .title_icon {
  color: #2a93f5;
  font-size: 35px;
}

.card-wrapper {
  height: 500px;
  /* overflow: scroll; */
  overflow: hidden;
  margin: 30px 30px 30px 36px;
}

.card-wrapper .card {
  text-align: left;
}

.notification_banner {
  margin: 5px 0px;
}

.content_wrapper {
  height: 400px;
}

.noti_oneline {
  height: 28px;
}
</style>
