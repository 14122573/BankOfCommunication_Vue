<template>
  <div id="components-layout-demo-basic">
    <a-layout class="layout_style">
      <a-layout-header>
        <PHeader />
      </a-layout-header>
      <a-layout-content>
        <Lunbo v-if="getBannerDisplay(display)" />
        <a-carousel v-else-if="!getBannerDisplay(display)">
          <div class="fixedImgWrapper" v-if="routeTo == 'dataSearch' || routeTo == 'searchResult'">
            <img class="fixedImg" src="@/assets/images/home/sj_banner.jpg" height="400px" width='100%' alt="图片加载失败">
          </div>
          <div class="fixedImgWrapper" v-else>
            <img class="fixedImg" src="@/assets/images/home/zs_banner.jpg" height="400px" width='100%' alt="图片加载失败">
          </div>
        </a-carousel>
        <router-view style="background-color: #f1f5f8 " />
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
  data() {
    return {
      display: true,
      routeTo: '',
      img    : ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector('#components-layout-demo-basic').scrollTop = 0
    })
    if(this.$route.name == 'index') {
      this.display = true
    } else {
      this.display = false
    }
  },
  watch: {
    $route(to, from) {
      if(to.name == 'index') {
        this.routeTo = to.name
        this.display = true
        this.getBannerDisplay(true)
      } else {
        this.routeTo = to.name
        this.display = false
        this.getBannerDisplay(false)
      }
    }
  },
  created() {
    this.$ajax
      .get({
        url: this.$api.GET_PUB_TITLE_MANAGE
      })
      .then(res => {
        if (res.code == '200') { 
          let content = this.$com.confirm(res, 'data.content', {})
          localStorage.setItem('titleList', JSON.stringify(content))
        }
      })
  },
  methods: {
    /**
     * @description 是否展示轮播图
     * @param {Bool} display 是否展示
     * @returns {Bool} 是否展示
     */
    getBannerDisplay(display) {
      
      let result = false
      if(display == true) {
        result = true
      }
      return result
    }
  }
}
</script>

<style scoped>
.layout_style {
  width: 100%;
}

.fixedImg {
  margin: 0 auto;
}

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
#components-layout-demo-basic > .ant-layout {
  height: 100%;
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
.news_title[data-v-6daf61c3],
.card-wrapper[data-v-32f8f9f2] .ant-tabs-nav,

// 日期
.card-wrapper .news_date[data-v-e901bcca],
.card-wrapper .news_date[data-v-aff295e4],
.card-wrapper .news_date[data-v-32f8f9f2],
.card-wrapper .news_date[data-v-6daf61c3]
  $titleFontSize()

// 文章内容
.card-wrapper[data-v-e901bcca] .news_content,
.card-wrapper[data-v-aff295e4] .news_content,
.card-wrapper[data-v-32f8f9f2] .news_content,
.card-wrapper[data-v-6daf61c3] .news_content,
.ant-list[data-v-46edc5bc],
.card-wrapper[data-v-32f8f9f2] .news_content,
.card-wrapper[data-v-6daf61c3] .news_content

// 卡片 更多
.card-wrapper .more[data-v-e901bcca],
.card-wrapper .more[data-v-aff295e4],
.card-wrapper .more[data-v-32f8f9f2],
.card-wrapper .more[data-v-6daf61c3]
  $simpleFontSize()
</style>
