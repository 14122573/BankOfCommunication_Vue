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
        rowKey="title"
      ></a-table>
    </div>
    <div class="noneCeiling" v-else>
          <img src="@/assets/images/empty_placeholder.jpg" alt=""><span>暂无数据</span>
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
      ]
    }
  },
  methods: {
    customRow(record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name  : 'industryDetails',
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
            titleManageId: this.$titleId.industryId,
            pageNo       : 1,
            pageSize     : 10,
            status_in    : 1
          }
        })
        .then(res => {
          if(res.code === '200') {
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
  height: 700px;
}

.pageWrapper .navbar {
  text-align: left;
  padding: 30px 0px;
}

.pageWrapper .content {
  background-color: #ffffff;
  height: 500px;
  padding: 10px 30px;
  margin: 0 auto;
}
</style>

<style lang="stylus">
.content[data-v-2cdc8027] .ant-table-tbody > tr > td
  $titleFontSize()

.noneCeiling
  height 200px
  display flex
  align-items center
  justify-content center
  font-size 18px
  color #999 
</style>