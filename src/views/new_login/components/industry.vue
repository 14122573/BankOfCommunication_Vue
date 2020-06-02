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
        <a class='more' slot="extra" href="#">更多 >></a>
        <div class="news_wrapper" v-for="(item, index) in news" :key="index">
          <a class="mouse_trigger">
            <a-card class="news_wrapper_inside" :bordered=false :bodyStyle="{padding: '0'}">
            <a-row type="flex" align="center" justify="center" style="margin: 20px 0px">
              <a-col class="news_sort" :span="2">{{item.sort}}</a-col>
              <a-col :span="1">
                <a-divider style="height: 5em" type="vertical"></a-divider>
              </a-col>
              <a-col :span="21">
                <a-row type="flex" align="center" justify="space-around">
                  <a-col class="news_title" :span='16'>{{item.title}}</a-col>
                  <a-col class="news_date" :span='8'>{{item.postDate}}</a-col>
                </a-row>
                <a-row>
                  <a-col class="news_content" :span="24">{{item.content}}</a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
          </a>
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
    fetchNews() {
      this.news.push(
        {
          title:
            '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
          content:
            '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
          postDate  : '2020-02-20',
          source    : '新闻网',
          postAuthor: '小明',
          sort      : '01'
        },
        {
          title:
            '「中国农业新闻网」严查！严打！严抓！这些农药千万不能乱用！',
          content:
            '中国农业新闻网:全国唯一一家具有中国农业新闻网合法名称的农业专业网站。粉丝突破百万，一片文章阅读量突破三百三十万的网站。每天为您推送国内外重大农业新闻。一站在手，农业我有。敬请关注！近日，农业农村部在全国部署2020年农产品质量安全专项整治“利剑”行动，严厉打击各类违法违规用药和非法添加行为，严格落实安全间隔期休药期制度，切实保障人民群众“舌尖上的安全”。“利剑”行动将持续至今年12月。',
          postDate  : '2020-02-17',
          source    : '新闻网',
          postAuthor: '小明',
          sort      : '02'
        },
        {
          title:
            '扎根科技沃土助推农业发展 聚焦奋战在农业一线的垦区科技工作者',
          content:
            '北大荒，是安天下的中华大粮仓, 我国最大的商品粮生产基地，也是农业科技事业的一片沃土。北大荒的科技工作者，深感使命光荣、责任重大，他们弘扬优良传统，不忘科技报国、创新为民的初心，坚定创新自信，充分挖掘农业科技的潜力，围绕农业领域关键核心技术问题刻苦攻关，并加快成果转化。经过不懈努力、探索与实践，一项项科技成果得到了广泛应用，真正发挥出了科技对农业发展的支撑作用。一项项科技成果为北大荒农业发展插上了“科技的翅膀”。',
          postDate  : '2020-02-16',
          source    : '新闻网',
          postAuthor: '小明',
          sort      : '03'
        },
        {
          title:
            '实现从传统农业向现代农业的跨越转变',
          content:
            '棠张农民素来会种菜，2017年底，铜山区现代农业示范园启动建设，棠张农民的种菜水平更是突飞猛进，再次解锁了新层次、新技能。',
          postDate  : '2020-02-15',
          source    : '新闻网',
          postAuthor: '小明',
          sort      : '04'
        },
        {
          title:
            '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
          content:
            '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
          postDate  : '2020-02-14',
          source    : '新闻网',
          postAuthor: '小明',
          sort      : '05'
        }
      )
    }
  }
}
</script>

<style scoped>
.news_wrapper {
}

.card-wrapper .more {
  font-size: 12px;
  color: #28292A
}

a :hover {
  background-color: #2993F6;
}

.card-wrapper .news_sort {
  font-size: 30px;
  margin: auto auto
}

.card-wrapper .news_title {
  font-size: 12px;
  font-weight: bold;
  overflow:hidden;
  white-space:nowrap; 
  text-overflow:ellipsis
}

.card-wrapper .news_date {
  font-size: 12px;
  text-align: right;
}

.card-wrapper .news_content {
  font-size: 12px;
  overflow:hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 10px
}
.card-wrapper {
  height: 500px;
  /* overflow: scroll; */
  overflow: hidden;
  margin: 30px 50px 30px 50px;
}

.card-wrapper .card {
  text-align: left;
}
</style>
