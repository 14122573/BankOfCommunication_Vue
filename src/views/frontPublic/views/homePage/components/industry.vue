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
          <div class="news_wrapper" v-for="(item, index) in news" :key="index">
            <a class="mouse_trigger" @click="articleDetails(item)">
              <a-card
                class="news_wrapper_inside"
                :bordered="false"
                :bodyStyle="{ padding: '0' }"
              >
                <a-row type="flex" justify="center" style="margin: 20px 10px">
                  <a-col class="news_sort" :span="2">{{ 10 > index ? "0" + (index+1) : index + 1 }}</a-col>
                  <a-col :span="1">
                    <a-divider style="height: 5em" type="vertical"></a-divider>
                  </a-col>
                  <a-col :span="21">
                    <a-row type="flex" justify="space-around">
                      <a-col class="news_title" :span="16">{{
                        item.title
                      }}</a-col>
                      <a-col class="news_date" :span="8">{{
                        $moment(item.releaseDate).format("YYYY-MM-DD")
                      }}</a-col>
                    </a-row>
                    <a-row>
                      <a-col class="news_content" :span="24">
                        <span v-html="item.content"></span>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-card>
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
      titleId: '420295370510000128'
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
      for(let i = 0 ; i < homeSectionTitle.length; i++) {
        if(homeSectionTitle[i].id == this.titleId) {
          this.title = homeSectionTitle[i].titleName
        }
      }
    },
    jumpToPage() {
      this.$router.push({
        name: 'industryList'
      })
    },
    articleDetails(item) {
      this.$router.push({
        name  : 'industryDetails',
        params: {
          id: item.id
        }
      })
    },
    fetchNews() {
      this.$ajax
        .get({
          url   : this.$api.GET_PUB_ANNOUNCE_LIST,
          params: {
            titleManageId: this.$titleId.industryId,
            pageNo       : 1,
            pageSize     : 10,
            status_in    : '1'
          }
        })
        .then(res => {
          if (res.code === '200') {
            this.news = this.$com.confirm(res, 'data.content', [])
          }
        })
    }
  }
}
</script>

<style scoped>
.card-wrapper .more {
  font-size: 12px;
  color: #28292a;
}

.mouse_trigger :hover {
  background-color: #2993f6;
}

.mouse_trigger :hover .news_title {
  color: white;
}

.mouse_trigger :hover .news_date {
  color: white;
}

.mouse_trigger :hover .news_content {
  color: white;
}

.mouse_trigger :hover .news_sort {
  color: white;
}

.card-wrapper .news_sort {
  font-size: 30px;
  color: #515151;
  margin: auto auto;
}

.card-wrapper .news_title {
  font-size: 12px;
  color: #282828;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-wrapper .news_date {
  font-size: 12px;
  color: #515151;
  text-align: right;
}

.card-wrapper .news_content {
  font-size: 12px;
  color: #666666;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 10px;
}
.card-wrapper {
  height: 500px;
  /* overflow: scroll; */
  overflow: hidden;
  margin: 30px 50px 30px 50px;
}

.card-wrapper .card {
  text-align: left;
}

.card-wrapper .title_icon {
  color: #2a93f5;
  font-size: 35px;
}

.content_wrapper {
  height: 400px;
}

.content_wrapper .news_wrapper_inside {
  height: 105px;
}
</style>
