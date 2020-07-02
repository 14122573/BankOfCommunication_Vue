<template>
  <div>
    <div class="pageWrapper" style="background-color: white; margin: 0px 0px 30px 0px">
      <div class="content" v-if="this.news.length !== 0">
        <a-table :columns="columns"
          :data-source="news" 
          :showHeader=false
          :customRow="customRow"
        ></a-table>
      </div>
      <div class="noneCeiling" v-else>
          <img src="@/assets/images/empty_placeholder.jpg" alt=""><span>暂无数据</span>
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
      ]
    }
  },
  methods: {
    customRow(record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name  : '/knowledgeService/knowledgeServiceDetail',
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
          url   : this.$api.GET_ANNOUNCE_LIST,
          params: {
            status_in    : '1',
            pageNo       : 1,
            pageSize     : 10,
            titleManageId: this.$titleId.knowledgeId
          }
        })
        .then(res => {
          this.news = this.$com.confirm(res, 'data.content')
        })
    }
  },
}
</script>

<style scoped>
.pageWrapper .content {
    background-color: #FFFFFF;
    height: 500px;
    padding: 10px 30px;
  }
</style>

<style lang="stylus" scoped>
.noneCeiling
  height 200px
  display flex
  align-items center
  justify-content center
  font-size 18px
  color #999 
</style>