<template>
  <div>
    <div class="pageWrapper">
      <Navbar class="navbar" />
      <div class="content">
        <a-descriptions :title="list.title">
          <a-descriptions-item label='发稿人'>{{list.postAuthor}}</a-descriptions-item>
          <a-descriptions-item label='发布日期'>{{list.postDate}}</a-descriptions-item>
          <a-descriptions-item label='来源'>{{list.source}}</a-descriptions-item>
        </a-descriptions>
        <a-card :bordered=false>
          {{list.content}}
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
      },
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
    background-color: #F1F5F8;
  }

  .pageWrapper .navbar {
    text-align: left;
    padding: 30px 0px;
  }

  .pageWrapper .content {
    background-color: #FFFFFF;
    line-height: 30px;
  }
</style>