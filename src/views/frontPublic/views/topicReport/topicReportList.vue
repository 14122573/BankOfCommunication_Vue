<template>
<div class="width_cut">
  <div class="pageWrapper">
    <Navbar class="navbar" />
    <div class="content" v-if="this.news.length !== 0">
      <a-table
          :columns="columns"
          :data-source="news"
          :showHeader="false"
          :customRow="customRow"
          :rowKey="news.id"
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
import Navbar from '@/views/frontPublic/components/navbar.vue'
export default {
  components: {
    Navbar
  },
  mounted() {
    this.fetchNews()
    this.$nextTick(() => {
      document.querySelector('#components-layout-demo-basic').scrollTop = 0
    })
  },
  data() {
    return {
      news   : [],
      columns: [
        {
          title    : '标题',
          key      : 'title',
          dataIndex: 'title'
        },
        {
          title    : '日期',
          key      : 'releaseDate',
          dataIndex: 'releaseDate',
          width    : 200
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
              name  : 'topicReportDetail',
              params: {
                id: record.id
              }
            })
          }
        }
      }
    },
    fetchNews() {
      this.$ajax
        .get({
          url   : this.$api.GET_PUB_ANNOUNCE_LIST,
          params: {
            titleManageId: this.$titleId.topicId,
            pageNo       : 1,
            pageSize     : 10,
            status_in    : '1',
            pageNo        : this.pagination.pageNo,
            pageSize      : this.pagination.pageSize,
          }
        })
        .then(res => {
          if(res.code === '200') {
            this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
            this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
            this.pagination.current = this.pagination.pageNo
            this.news = this.$com.confirm(res, 'data.content', [])
          }
        })
    }
  }
}
</script>

<style scoped>
.width_cut {
  background-color: #f1f5f8;
}

.pageWrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0px 0px 30px 0px;
}

.pageWrapper .navbar {
  text-align: left;
  padding: 30px 0px;
}

.pageWrapper .content {
  background-color: #ffffff;
  height: 700px;
  padding: 10px 30px;
  margin: 0 auto;
}
</style>

<style lang="stylus">
.content[data-v-2cdc8027] .ant-table-tbody > tr > td
  $titleFontSize()
</style>

<style lang="stylus" scoped>
.noneCeiling
  position relative
  width 100%
  height 700px
  background-color white
</style>
