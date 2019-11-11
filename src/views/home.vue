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
        <div class="sectionBox">
          <div class="section mb16">
            <div class="sectionBody">
              <a-row class="sectionTitle" type="flex" justify="space-between" align="middle">
                <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">管理员联系方式</span></a-col>
              </a-row>
              <div class="sectionContent">
                <p class="contact">xinnn / 123123123</p>
              </div>
            </div>
          </div>
          <div class="section mb16">
            <div class="sectionBody">
              <a-row class="sectionTitle" type="flex" justify="space-between" align="middle">
                <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">操作手册</span></a-col>
              </a-row>
              <div class="sectionContent">
                <p class="contact">xinnn / 123123123</p>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="sectionBody">
              <a-row class="sectionTitle" type="flex" justify="space-between" align="middle">
                <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">天气日历</span></a-col>
              </a-row>
              <div class="sectionContent">
                <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=tf&skin=grape" frameborder="0" width="100%" height="24" allowtransparency="true"></iframe>
                <a-calendar style="width:100%" :fullscreen="false" > </a-calendar>
              </div>
            </div>
          </div>
        </div>
        <div class="sectionBox">
          <div class="section"></div>
        </div>
        <div class="sectionBox">
          <div class="section"></div>
        </div>
      </a-col>
    </a-row>
</div>
</template>

<style scoped>
/* h1{ text-align: center; padding: 30px; } */
.loader { position: fixed; top: 0; left: 0; bottom: 0; right: 0; background-color: rgba(255,255,255,0.6); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 9999;}
.workpaceBg {margin: 16px 16px 0 16px; position: relative;}
.sectionBox { padding: 4px;}
.section { margin-left: 4px; background-color: #fff; border-radius: 6px; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3) }
.section.mb16{ margin-bottom: 16px;}
.sectionBody{ margin: 0 16px; padding-top: 16px;}
.sectionContent .contact{ font-size: 16px; font-weight: bold; text-align: center; line-height: 30px ; padding-bottom: 10px;}

.sectionTitle { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid  rgba(0,0,0,0.1)}
.sectionTitle .divider{ font-size: 16px; background-color:#1890ff; height: 16px; width: 5px; border-radius: 4px;}
.sectionTitle .title{ font-size: 16px;}
.sectionTitle .more{ cursor: pointer; color: #1890ff}
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

