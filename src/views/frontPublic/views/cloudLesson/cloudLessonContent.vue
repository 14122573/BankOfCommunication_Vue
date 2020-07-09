<template>
  <div>
    <div class="pageWrapper" style="background-color: white; margin: 0px 0px 30px 0px">
      <div class="content" v-if="this.news.length !== 0">
        <a-table :columns="columns"
          :data-source="news" 
          :showHeader=false
          :customRow="customRow"
          :pagination="pagination"
        ></a-table>
      </div>
      <div class="noneCeiling" v-else>
          <div class="" style="position: absolute; left: 50%; top: 50%; width: 200px; height: 200px; margin-left: -100px; margin-top: -100px;">
            <a-row>
              <img src="@/assets/images/empty_placeholder.jpg" alt="">
            </a-row>
            <a-row>
              <span style="color: #999">暂无数据</span>
            </a-row>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  mounted() {
    this.fetchNews()
  },
  data() {
    return {
      news   : [],
      columns: [
        {
          title    : '标题',
          dataIndex: 'title'
        },
        {
          title    : '日期',
          dataIndex: 'releaseDate',
          width    : 180
        }
      ],
      pagination: {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        current        : 1,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.onPageChange
      }
    }
  },
  methods: {
    customRow(record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name  : '/knowledgeService/cloudLessonDetail',
              params: {
                id: record.id
              }
            })
          }
        }
      }
    },
    onPageChange(current) {
      this.pagination.current = current
      this.pagination.pageNo = current
      this.fetchNews()
    },
    fetchNews() {
      this.$ajax
        .get({
          url   : this.$api.GET_PUB_ANNOUNCE_LIST,
          params: {
            status_in    : '1',
            pageNo       : 1,
            pageSize     : 10,
            titleManageId: this.$titleId.cloudId,
            pageNo       : this.pagination.pageNo,
            pageSize     : this.pagination.pageSize,
          }
        })
        .then(res => {
          this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
          this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
          this.pagination.current = this.pagination.pageNo
          this.news = this.$com.confirm(res, 'data.content')
        })
    }
  },
}
</script>

<style scoped>
.pageWrapper .content {
    background-color: #FFFFFF;
    height: 700px;
    padding: 10px 30px;
  }
</style>

<style lang="stylus" scoped>
.noneCeiling
  position relative
  width 100%
  height 700px
  background-color white
</style>