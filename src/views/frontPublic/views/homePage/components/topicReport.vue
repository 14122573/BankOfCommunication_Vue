<template>
  <div>
    <div class="card-wrapper">
      <a-card
        class="card"
        :loading="loading"
        title="专题报告"
        :bordered="false"
        size="small"
        :headStyle="{padding: '0', border: '0'}"
        :bodyStyle="{ padding: '0' }"
      >
        <a-icon type="minus" class="title_icon"/>
        <a class="more" slot="extra" @click="jumpToPage">更多 >></a>
        <a-row>&nbsp;</a-row>
        <div class="noti-list" v-for="(item, index) in news" :key="index">
          <a class="mouse_trigger">
            <div class="noti_oneline">
              <a-row
                type="flex"
                justify="center"
                style="margin: 20px 0px"
              >
                <a-col class="news_title" :span="12">{{ item.title }}</a-col>
                <a-col class="news_date" :span="12">{{ item.postDate }}</a-col>
              </a-row>
            </div>
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
    jumpToPage() {
      this.$router.push({ name: 'topicReport' })
    },
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
          postAuthor: '小明',
          sort      : '01'
        },
        {
          title  : '「中国农业新闻网」严查！严打！严抓！这些农药千万不能乱用！',
          content:
            '中国农业新闻网:全国唯一一家具有中国农业新闻网合法名称的农业专业网站。粉丝突破百万，一片文章阅读量突破三百三十万的网站。每天为您推送国内外重大农业新闻。一站在手，农业我有。敬请关注！近日，农业农村部在全国部署2020年农产品质量安全专项整治“利剑”行动，严厉打击各类违法违规用药和非法添加行为，严格落实安全间隔期休药期制度，切实保障人民群众“舌尖上的安全”。“利剑”行动将持续至今年12月。',
          postDate  : '2020-02-17',
          source    : '新闻网',
          postAuthor: '小明',
          sort      : '02'
        },
        {
          title  : '扎根科技沃土助推农业发展 聚焦奋战在农业一线的垦区科技工作者',
          content:
            '北大荒，是安天下的中华大粮仓, 我国最大的商品粮生产基地，也是农业科技事业的一片沃土。北大荒的科技工作者，深感使命光荣、责任重大，他们弘扬优良传统，不忘科技报国、创新为民的初心，坚定创新自信，充分挖掘农业科技的潜力，围绕农业领域关键核心技术问题刻苦攻关，并加快成果转化。经过不懈努力、探索与实践，一项项科技成果得到了广泛应用，真正发挥出了科技对农业发展的支撑作用。一项项科技成果为北大荒农业发展插上了“科技的翅膀”。',
          postDate  : '2020-02-16',
          source    : '新闻网',
          postAuthor: '小明',
          sort      : '03'
        },
        {
          title  : '实现从传统农业向现代农业的跨越转变',
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
        },
        {
          title  : '“三生农业”耕育农法，促进中医药传承创新',
          content:
            '中医农业是现代农业与传统中医药的跨界融合，跨界创新，也是用中医的整体观、系统观、辩证观看待农业问题，用中药制品为种养产业服务，解决农业生产过程中的病害的预防和治疗问题。既能为中医药的传承和发展提供有效的保障，也能够为提高生态农业发展，促进人类以及动植物健康，保障农业产品的有效供给和质量安全，探索一条生态可持续发展的崭新路径。',
          postDate  : '2020-02-13',
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
.noti_detail .news_content {
  letter-spacing: 0.5px;
}

.card-wrapper .noti_detail {
  margin: 20px 0px;
}

.card-wrapper .news_title {
  color: #282828;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-wrapper .news_date {
  font-size: 12px;
  color: #282828;
  text-align: right;
}

.card-wrapper .news_content {
  color: #656667;
  font-size: 12px;
  height: 50px;
  margin: 10px 0px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.card-wrapper .more {
  font-size: 12px;
  color: #28292a;
}

.card-wrapper {
  height: 350px;
  /* overflow: scroll; */
  overflow: hidden;
  margin: 30px 50px 30px 50px;
}

.card-wrapper .card {
  text-align: left;
}

.notification_banner {
  margin: 5px 0px
}

.card-wrapper .title_icon {
  color: #2a93f5;
  font-size: 35px;
}
</style>

<style lang="stylus">
.content[data-v-3db1c562] .ant-table-tbody > tr > td
  $titleFontSize()
</style>