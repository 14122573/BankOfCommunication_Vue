<template>
<div class="portalDetailContentWapper">
  <div class="layoutMargin detailsPartSection">
    <p class="detailsPartTitle">
      投票二维码列表
      <span style="float: right;">
        <a-button @click="$router.back()">返回</a-button>
      </span>
    </p>
    <div class="container">
      <VoteQrCard :list="list"/>
    </div>
  </div>
</div>
</template>

<script>
import VoteQrCard from '../components/voteQrCard'
export default {
  name: 'VoteQrList',
  components: {
    VoteQrCard,
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        status_in: '1',
        pageNo: 1,
        pageSize: 10000,
      }
      this.$ajax.get({
        url: this.$api.GET_VOTE_LIST,
        params,
      }).then(res => {
        this.list = this.$com.confirm(res, 'data.content', [])
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0 16px;
}
</style>
