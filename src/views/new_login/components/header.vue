<template>
  <div class="loginFrameBody">
    <a-row
      class="loginFrameTitle"
      type="flex"
      justify="start"
      align="middle"
      :gutter="10"
    >
      <!-- <a-col :span="12" style="background-color: red"> -->
      <a-col :span="12">
        <a-row>
          <a-col :span="4"
            ><img src="@/assets/images/logo.png" alt="" class="logo"
          /></a-col>
          <a-col class="" :span="20" :offset="0" style="text-align: left">
            “智能渔技”综合信息服务平台
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <div class="loginFrameMenu">
          <!-- <a-menu v-model="current" mode="horizontal"> -->
          <a-menu mode="horizontal">
            <a-menu-item key="1">
              <router-link :to="{name: 'homepage'}">首页</router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link :to="{name: 'notificationAnnounce'}">通知公告</router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link :to="{name: 'industryNews'}">行业动态</router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link :to="{name: 'knowledgeService'}"
                >知识服务</router-link
              >
            </a-menu-item>
            <a-menu-item key="5">
              <router-link :to="{name: 'topicReport'}">专题报告</router-link>
            </a-menu-item>
            <a-menu-item key="6">
              <router-link :to="{name: 'dataSearch'}">数据查询</router-link>
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import routes from '../../../router/index'
export default {}
</script>

<style scoped>
.loginFrameBody {
  margin: 0px 100px 0px 100px;
}
.loginFrameTitle {
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
}
.loginFrameTitle .logo {
  height: 60px;
}
</style>

<style lang="stylus">
  .loginFrameTitle
    $titleFontSize()

  .loginFrameMenu
    $titleFontSize()
</style>
