<template>
  <div class="workpaceBg">
    <!-- <div class="loader" v-if="$store.state.isLoadingResource">
      <div>
        <a-spin tip="子系统资源载入中..." :spinning="$store.state.isLoadingResource" size="large"/>
      </div>
      <div style="width: 30%;">
        <a-progress :percent="$store.state.loadingProgress" status="active"/>
      </div>
    </div> -->
    <a-row type="flex" justify="space-between" align='top' :gutter="10">
      <a-col span='16'>
        <a-row type="flex" justify="start" align='top' :gutter="12" style="margin-bottom:10px">
          <a-col span='24' class="sectionBox">
            <div class="section">
              <PendingReview />
            </div>
          </a-col>
        </a-row>
        <a-row type="flex" justify="start" align='top' :gutter="12">
          <a-col span='24' class="sectionBox">
            <div class="section">
              <KnowledgePublish :showType="'less'" :pageSize='10'></KnowledgePublish>
            </div>
          </a-col>
        </a-row>
      </a-col>
          <DataService ref="dataService"></DataService>
      <a-col span='8'>
        <div class="sectionBox">
          <!-- 数据服务 -->
          <!-- <div class="section mb16 dataSer" @click="openDataService()">
            <img src="@/assets/images/Group 12@3x.png" >
            <div class="demo">
              <p>
                <a-icon type="rise" />
                数据服务
              </p>
            </div>
          </div> -->
          <!-- 管理员联系方式 -->
          <!-- <div class="section mb16">
            <div class="sectionBody">
              <a-row class="sectionTitle" type="flex" justify="space-between" align="middle">
                <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">管理员联系方式</span></a-col>
              </a-row>
              <div class="sectionContent">
                <p class="contact">xinnn / 123123123</p>
              </div>
            </div>
          </div> -->
          <!-- 天气日历 -->
          <div class="section mb16">
            <div class="sectionBody">
              <a-row class="sectionTitle" type="flex" justify="space-between" align="middle">
                <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">天气日历</span></a-col>
              </a-row>
              <div class="sectionContent" style="padding-bottom: 12px;">
                <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=tf&skin=grape" frameborder="0" width="100%" height="24" allowtransparency="true"></iframe>
                <a-calendar style="width:100%" :fullscreen="false" > </a-calendar>
                <img class="border-img" src="@/assets/images/border.png"/>
              </div>
            </div>
          </div>
          <!-- 操作手册 -->
          <div class="section mb16">
            <div class="sectionBody">
              <ManualPublish />
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
.workpaceBg {margin: 10px 10px 0 10px; position: relative;}
.sectionBox { padding: 4px;}
.section { position: relative; margin-left: 4px; background-color: #fff; border-radius: 2px; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1) }
.section.mb16{ margin-bottom: 16px;}
.section .border-img { position: absolute; bottom: 0; left: 0; width: 100%;}
.sectionBody{ margin: 0 16px; padding-top: 16px;}
.sectionContent .contact{ font-size: 16px; font-weight: bold; text-align: center; line-height: 30px ; padding-bottom: 10px;}

/* 首页中数据服务模块 */
.dataSer {position: relative; cursor:pointer}
.dataSer img { display: inline-block; width: 100% ; max-height: 150px;}
.dataSer .demo{ height: 60px; width: 100%; position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);color:#fff;font-size: 24px; text-align: center;line-height: 60px;}

.sectionTitle { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid  rgba(0,0,0,0.1)}
.sectionTitle .divider{ font-size: 16px; background-color:#1890ff; height: 16px; width: 5px; border-radius: 4px;}
.sectionTitle .title{ font-size: 16px;}
.sectionTitle .more{ cursor: pointer; color: #1890ff}
</style>

<script>
import { permission } from '@/util/mixins'
import KnowledgePublish from '@/views/cms/knowledgePublish/authInHome'
import ManualPublish from '@/views/cms/manual/manualInHome'
import PendingReview from '@/views/expertManagement/review/listNew'

// 引入数据服务的组件
import DataService from '@/views/cms/dataService/dataService'

export default {
  mixins    : [ permission ],
  components: {
    PendingReview,
    KnowledgePublish,
    ManualPublish,
    DataService
  },
  mounted() {
    const token = this.$cookie.get('token')
    if (token) {
      this.getInfo()
    }
  },
  methods: {
    openDataService(){
      this.$refs.dataService.showModal()
    }
  }
}
</script>

