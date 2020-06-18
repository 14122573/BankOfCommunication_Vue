<template>
  <div>
    <div class="pageWrapper">
      <Navbar class="navbar" />
      <div class="main">
        <!-- <a-descriptions class="title" :title="list.title">
          <a-descriptions-item label='发稿人'>{{list.postAuthor}}</a-descriptions-item>
          <a-descriptions-item label='发布日期'>{{list.postDate}}</a-descriptions-item>
          <a-descriptions-item label='来源'>{{list.source}}</a-descriptions-item>
        </a-descriptions> -->
        <a-row>
          <a-col :span="5">&nbsp;</a-col>
          <a-col :span="14">
            <a-descriptions class="title" :title="list.title">
              <a-descriptions-item label="发稿人">{{
                list.postAuthor
              }}</a-descriptions-item>
              <a-descriptions-item label="发布日期">{{
                list.postDate
              }}</a-descriptions-item>
              <a-descriptions-item label="来源">{{
                list.source
              }}</a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :span="5">&nbsp;</a-col>
        </a-row>
        <a-divider type="horizontal"></a-divider>
        <a-card class="content" :bordered="false">
          {{ list.content }}
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/frontPublic/components/navbar.vue'
export default {
  data() {
    return {
      list: {
        title:
          '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
        content:
          '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
        postDate  : '2020-02-20',
        source    : '新闻网',
        postAuthor: '小明',
        sort      : '01'
      }
    }
  },
  components: {
    Navbar
  }
}
</script>

<style scoped>
.pageWrapper {
  padding: 0px 180px 30px 180px;
  background-color: #f1f5f8;
}

.pageWrapper .navbar {
  text-align: left;
  padding: 30px 0px;
}

.pageWrapper .title {
  line-height: 30px;
}

.pageWrapper .main {
  background-color: #ffffff;
  padding: 50px 20px;
}

.pageWrapper .content {
  text-align: left;
  line-height: 30px;
}
</style>

<style lang="stylus">
// 主标题
.main[data-v-3d830607] .ant-descriptions-title {
  $megaFontSize()
}

// 标题下来源信息
.ant-row[data-v-3d830607] .ant-descriptions-item > span {
  $titleFontSize()
}

// 正文
.main[data-v-3d830607] .ant-card-body {
  $titleFontSize()
}
</style>
