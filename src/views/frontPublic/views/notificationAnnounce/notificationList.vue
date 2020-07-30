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
    this.fetchNews(this.isLogin)
    this.$nextTick(() => {
      document.querySelector('#components-layout-demo-basic').scrollTop = 0
    })
  },
  computed: {
    listenIsLogin() {
      return this.$store.state.isLogin
    }
  },
  watch: {
    listenIsLogin(newV, oldV) {
      this.fetchNews(newV)
    }
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
          key      : 'createTime',
          dataIndex: 'createTime',
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
      },
      isLogin: this.$store.state.isLogin
    }
  },
  methods: {
    /**
     * @description 点击栏目list中的某一条跳转到对应的文章详情
     * @param {List, Int} 包含行内容的record, 索引
     * @returns {Array} 点击某一条后的回调函数
     */
    customRow(record, index) {
      return {
        on: {
          click: () => { 

            record.isVote === '0'
              ? this.$router.push({
                name  : 'notificationAnnounce',
                params: {
                  wrapper: record.voteId ? true : false, // 投票结果公示和通知公告文章显示方式， true投票结果公示，false通知公告文章
                  id     : record.id
                }
              })
              : this.$router.push({
                name  : 'votingRules',
                params: {
                  id: record.voteId ? record.voteId : record.id
                }
              })
          }
        }
      }
    },

    /**
     * @description 表格页面切换
     * @param {Int} current 传入当前页
     */
    onPageChange(current) {
      this.pagination.current = current
      this.pagination.pageNo = current
      this.fetchNews(this.isLogin)
    },

    /**
     * @description 获取栏目内容列表
     */
    fetchNews(isLogin) {
      let cookie = this.$cookie.get('token')
      this.$ajax
        .get({
          url: isLogin && !!cookie
            ? this.$api.GET_ANNOUNCE_LIST
            : this.$api.GET_PUB_ANNOUNCE_LIST,
          params: {
            titleManageId: this.$titleId.notificationId,
            pageNo       : 1,
            pageSize     : 10,
            status_in    : 1,
            voteType     : isLogin ? 1 : 0,
            pageNo       : this.pagination.pageNo,
            pageSize     : this.pagination.pageSize,
          }
        })
        .then(res => {
          if (res.code === '200') {
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
  padding: 10px 30px;
  margin: 0 auto;
  height: 700px
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
