<template>
<div class="portalDetailContentWapper">
  <div class="layoutMargin detailsPartSection">
    <p class="detailsPartTitle">
      投票二维码列表
      <span style="float: right;">
        <a-button @click="$router.back()">返回工作台</a-button>
      </span>
    </p>
    <div class="container">
      <VoteQrCard :list="list"/>
    </div>
    <div style="text-align:right; padding: 16px 16px 0;">
      <a-pagination
        showQuickJumper
        v-model="pageNo"
        :total="total"
        :defaultPageSize="pageSize"
        @change="onChange"
        size="small"/>
    </div>
  </div>
</div>
</template>

<script>
import VoteQrCard from '../components/voteQrCard'
export default {
  name      : 'VoteQrList',
  components: {
    VoteQrCard,
  },
  data() {
    return {
      list    : [],
      total   : 0,
      pageNo  : 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        status_in: '1',
        pageNo   : this.pageNo,
        pageSize : this.pageSize,
      }
      this.$ajax.get({
        url: this.$api.GET_NONPUBLIC_VOTE_LIST,
        params,
      }).then(res => {
        this.list = this.$com.confirm(res, 'data.content', [])
        this.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    onChange(page) {
      this.pageNo = page
      this.getList()
    },
  }
}
</script>

<style scoped>
.container {
  padding: 0 16px;
}
</style>
