<template>
  <div>
    <div class="card-wrapper">
      <a-card
        class="card"
        :loading="loading"
        title="行业动态"
        :bordered="false"
        size="small"
      >
        <a slot="extra" href="#">更多 >></a>
        <div class="news_wrapper">
          <a-list item-layout="horizontal" :data-source="news">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <span slot="extra">1</span>
              <a-list-item-meta :description="item.content">
                <a slot="title" href="https://www.antdv.com/">{{
                  item.title
                }}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      news   : []
    }
  },
  mounted() {
    this.fetchNews()
  },
  methods: {
    handleClick() {
      this.loading = !this.loading
    },
    fetchNews() {
      this.news.push(
        {
          title:
            '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
          content:
            '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
          postDate  : '2020-02-20',
          source    : '新闻网',
          postAuthor: '小明'
        },
        {
          title:
            '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
          content:
            '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
          postDate  : '2020-02-17',
          source    : '新闻网',
          postAuthor: '小明'
        },
        {
          title:
            '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
          content:
            '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
          postDate  : '2020-02-16',
          source    : '新闻网',
          postAuthor: '小明'
        },
        {
          title:
            '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
          content:
            '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
          postDate  : '2020-02-15',
          source    : '新闻网',
          postAuthor: '小明'
        },
        {
          title:
            '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
          content:
            '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
          postDate  : '2020-02-14',
          source    : '新闻网',
          postAuthor: '小明'
        }
      )
    }
  }
}
</script>

<style scoped>
.card-wrapper {
  height: 400px;
  overflow: scroll;
  margin: 30px 50px 30px 50px;
}

.card-wrapper .card {
  text-align: left;
}
</style>
