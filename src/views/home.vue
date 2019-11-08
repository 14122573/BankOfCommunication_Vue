<template>
  <div class="workpaceBg">
    <div class="loader" v-if="$store.state.isLoadingResource">
      <div>
        <a-spin tip="子项目资源载入中..." :spinning="$store.state.isLoadingResource" size="large"/>
      </div>
      <div style="width: 30%;">
        <a-progress :percent="$store.state.loadingProgress" status="active"/>
      </div>
    </div>
    <a-row type="flex" justify="space-between" align='top' :gutter="16">
      <a-col span='18'>
        <a-row type="flex" justify="start" align='top' :gutter="16" style="margin-bottom:16px">
          <a-col span='24' class="sectionBox">
            <div class="section">
              <VotePublish></VotePublish>
            </div>
          </a-col>
        </a-row>
        <a-row type="flex" justify="start" align='top' :gutter="16">
          <a-col span='12' class="sectionBox">
            <div class="section">
              <NoticePublish :showPosition="'home'" :pageSize='10'></NoticePublish>
            </div>
          </a-col>
          <a-col span='12' class="sectionBox">
            <div class="section">
              <KnowledgePublish :showType="'less'" :pageSize='10'></KnowledgePublish>
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col span='6'>

      </a-col>
    </a-row>
</div>
</template>

<style scoped>
h1{ text-align: center; padding: 30px; }
.loader { position: fixed; top: 0; left: 0; bottom: 0; right: 0; background-color: rgba(255,255,255,0.6); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 9999;}
.workpaceBg {margin: 16px 16px 0 16px; position: relative; width: calc(100% - 32px);  }
.sectionBox { padding: 4px;}
.section { margin-left: 4px; background-color: #fff; border-radius: 6px; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3) }
</style>

<script>
import { permission } from '@/util/mixins'

import NoticePublish from '@/views/cms/noticePublish/noticeInLogin'
import KnowledgePublish from '@/views/cms/knowledgePublish/authInHome'
import VotePublish from '@/views/cms/vote/voteInHome'

export default {
  mixins: [permission],
  components: {
    NoticePublish,KnowledgePublish,VotePublish
  },
  data() {
    return {
    }
  },
  mounted() {
    const token = this.$cookie.get('token')
    if (token) {
      this.getInfo()
    }
  },
  methods: {
  },
}
</script>

<style scoped>

</style>

