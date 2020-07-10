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
          <div style="height: 45px"></div>
          <div class="noti-list" v-for="(item, index) in news" :key="index">
            <a class="mouse_trigger" @click="articleDetails(item)">
              <div class="noti_oneline">
                <a-row type="flex" justify="center" style="margin: 20px 0px">
                  <a-col :span='1'><i style="width:8px;height:8px;border-radius:50%;background-color:black;display: inline-block; "></i></a-col>
                  <a-col class="news_title" :span="15"> {{ item.title }}</a-col>
                  <a-col class="news_date" :span="8">{{
                    $moment(item.releaseDate).format("YYYY-MM-DD")
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
      title  : '',
      titleId: '420295378927969647'
    }
  },
  updated() {
    this.getTitleList()
  },
  mounted() {
    this.fetchNews(),
    this.getTitleList()
  },
  methods: {
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
    articleDetails(item) {
      this.$router.push({
        name  : 'topicReportDetail',
        params: {
          id: item.id
        }
      })
    },
    jumpToPage() {
      this.$router.push({ name: 'topicReportList' })
    },
    handleClick() {
      this.loading = !this.loading
    },
    fetchNews() {
      this.$ajax
        .get({
          url   : this.$api.GET_PUB_ANNOUNCE_LIST,
          params: {
            titleManageId: this.$titleId.topicId,
            pageNo       : 1,
            pageSize     : 6,
            status_in    : '1'
          }
        })
        .then(res => {
          if(res.code == '200') {
            this.news = this.$com.confirm(res, 'data.content', [])
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

.card-wrapper .noti_detail {
  margin: 20px 0px;
}

.card-wrapper .news_title {
  color: #282828;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-wrapper .news_date {
  font-size: 12px;
  color: #282828;
  text-align: right;
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
  height: 20px;
}
</style>

<style lang="stylus">
.content[data-v-3db1c562] .ant-table-tbody > tr > td
  $titleFontSize()
</style>
