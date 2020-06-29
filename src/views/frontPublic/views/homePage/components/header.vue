<template>
  <div class="loginFrameBody">
    <a-row
      class="loginFrameTitle"
      type="flex"
      justify="start"
      align="middle"
      :gutter="10"
    >
      <a-col :span="9">
        <a-row>
          <a-col :span="4"
            ><img src="@/assets/images/logo.png" alt="" class="logo"
          /></a-col>
          <a-col class="" :span="19" :offset="1" style="text-align: left;">
            <span class="logo_title">“智能渔技”综合信息服务平台</span>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="15">
        <div class="loginFrameMenu">
          <a-menu mode="horizontal">
            <a-menu-item v-for="(item) in menuList" :key="item.key">
              <router-link :to="{ name: item.name }">{{item.title}}</router-link>
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import routes from '@/router/index.js'
export default {
  data() {
    return {
      menuList: [
        {
          key  : '0',
          title: '首页',
          name : 'homepage'
        },
        {
          key  : '1',
          title: '通知公告',
          name : 'notificationList'
        },
        {
          key  : '2',
          title: '行业动态',
          name : 'industryList'
        },
        {
          key  : '3',
          title: '知识服务',
          name : 'knowledgeService'
        },
        {
          key  : '4',
          title: '专题报告',
          name : 'topicReportList'
        },
        {
          key  : '5',
          title: '数据查询',
          name : 'dataSearch'
        }
      ],
    }
  },
  methods: {
    // retrieveSelected() {
    //   // 1. 获取当前路由
    //   return []
    // }
  },
}
</script>

<style scoped>
.loginFrameBody {
  margin: 0 auto;
  max-width: 1000px;
}
.loginFrameTitle {
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
}
.loginFrameTitle .logo {
  height: 60px;
}

.ant-menu-horizontal {
  border-bottom: 0px;
  height: 64px;
  line-height: 62px;
}
</style>

<style lang="stylus" scoped>
.ant-col .ant-col-19[data-v-8fc72786]
  $megaFontSize()

.loginFrameMenu > ul
  $titleFontSize()
  
</style>
