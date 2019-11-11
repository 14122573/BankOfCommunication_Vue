<template>
  <div class="knowledgeSection" v-if="isReady">
    <a-row class="knowledgeInHomeTitle" type="flex" justify="space-between" align="middle" :gutter='16' >
      <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">投票</span></a-col>
      <a-col :span="6" class="algin-right"><span v-if='qrList.length>0' @click="toVoteList" class="more">查看全部</span></a-col>
    </a-row>

    <div class="list">
      <template v-if='qrList.length>0'>
        <a-carousel style="margin:0 30px;padding-bottom: 16px;" arrows :dots="false">
          <div slot="prevArrow" class="custom-slick-arrow" >
            <a-icon type="left" />
          </div>
          <div slot="nextArrow" class="custom-slick-arrow" >
            <a-icon type="right" />
          </div>
          <div v-for="(list, index) in qrList" :key="index" style="width: 80%; margin: 0 atuo;">
            <VoteQrCard :list="list" />
          </div>
        </a-carousel>
      </template>
      <template v-else>
        <div class="noDataBox">
          <p class="tips">暂无知识文献</p>
        </div>
      </template>
    </div>
  </div>

</template>
<style scoped>
.knowledgeSection {margin: 0 16px; padding-top: 16px;}
.knowledgeInHomeTitle { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid  rgba(0,0,0,0.1)}
.knowledgeInHomeTitle .divider{ font-size: 16px; background-color:#1890ff; height: 16px; width: 5px; border-radius: 4px;}
.knowledgeInHomeTitle .title{ font-size: 16px;}
.knowledgeInHomeTitle .more{ cursor: pointer; color: #1890ff}

.custom-slick-arrow { width: 20px; height: 40px; line-height: 40px; text-align: center;  font-size: 16px; background: #94bfef; color: #fff; z-index: 11; opacity: 0.3; top: 40%;}
.custom-slick-arrow:hover { background: #94bfef; color: #fff; opacity: 0.5;}
.custom-slick-arrow:before { display: none; }
</style>
<script>

import VoteQrCard from '@/views/cms/components/voteQrCard.vue'
export default {
  name:'voteInHomeList',
  components: {
    VoteQrCard
  },
  data() {
    return {
      isReady:false,
      qrList:[],
    }
  },
  mounted() {
    this.getQrList()
  },
  methods:{
    getQrList() {
      const params = {
        status_in: '1',
        pageNo: 1,
        pageSize: 10000,
      }
      this.$ajax.get({
        url: this.$api.GET_VOTE_LIST,
        params,
      }).then(res => {
        const data = this.$com.confirm(res, 'data.content', [])
        const result = []
        while (data.length > 0) {
          result.push(data.splice(0, 4))
        }
        this.qrList = result
        this.isReady = true
      })
    },
    toVoteList() {
      this.$router.push({
        name: '/cms/vote/qr-list',
      })
    },
  }
}
</script>

