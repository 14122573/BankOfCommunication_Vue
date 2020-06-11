<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <PHeader />
      </a-layout-header>
      <a-layout-content>
        <Lunbo />
        <!-- <InlineWrapper /> -->
        <router-view />
        <Footer />
      </a-layout-content>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
import PHeader from '../components/header.vue'
import Lunbo from '../components/lunbo'
import Footer from '../components/footer'
export default {
  components: {
    PHeader,
    Lunbo,
    Footer
  },
}
</script>

<style>
#components-layout-demo-basic {
  height: 100%;
  overflow: scroll;
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header {
  background: #fff;
  color: #000;
}
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background-color: #fff;
  color: #000;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}

.InlineWrapper {
  background-color: #fff;
  margin: 0px 150px 0px 150px;
}
</style>

<style lang="stylus">
.ant-card-head-title
  $megaFontSize()

// 卡片标题
.card-wrapper[data-v-e901bcca] .ant-card-head-title, 
.card-wrapper[data-v-aff295e4] .ant-card-head-title,
.ant-col[data-v-46edc5bc],
.card-wrapper[data-v-32f8f9f2] .ant-card-head-title,
.card-wrapper[data-v-6daf61c3] .ant-card-head-title
  $megaFontSize()

// 文章标题
.news_title[data-v-e901bcca],
.news_title[data-v-aff295e4],
.news_title[data-v-32f8f9f2],
.news_title[data-v-6daf61c3]
  $titleFontSize()

// 文章内容
.card-wrapper[data-v-e901bcca] .news_content,
.card-wrapper[data-v-aff295e4] .news_content,
.card-wrapper[data-v-32f8f9f2] .news_content,
.card-wrapper[data-v-6daf61c3] .news_content,
.ant-list[data-v-46edc5bc],
.card-wrapper[data-v-32f8f9f2] .news_content,
.card-wrapper[data-v-6daf61c3] .news_content
  $simpleFontSize()
</style>