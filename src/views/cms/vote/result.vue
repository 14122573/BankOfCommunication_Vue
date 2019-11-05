<template>
<div class="portalDetailContentWapper">
  <div class="layoutMargin detailsPartSection">
    <p class="detailsPartTitle">
      投票结果预览
      <span style="float: right;">
        <a-button @click="$router.back()">返回</a-button>
				<a-button @click="handleSubmit" type="primary">确认公示</a-button>
      </span>
    </p>
    <div class="container">
      <h2>{{content.name}}</h2>
      <div v-for="(item, index) in content.subjects" :key="item.key">
        <p class="title">{{`${index + 1}、${item.title}`}}&nbsp;&nbsp;&nbsp;&nbsp;{{`参与投票人数：${item.count || 0}人`}}</p>
        <p v-for="(option, i) in item.options" :key="option.id" class="option">
          <span>{{`${$com.numToLetter(i)}、${option.value || ''}`}}</span>
          <a-progress :percent="calcPercent(item.count, option.count)" status="normal" style="width: 30%;" :strokeWidth="14" :showInfo="false" />
          <span>{{`${option.count || 0}人 / ${calcPercent(item.count, option.count)}%`}}</span>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'VoteResult',
  data() {
    return {
      voteId: null,
      content: {},
    }
  },
  mounted() {
    const {query} = this.$route
    if (query && query.id) {
      this.voteId = query.id
      this.getResult()
    }
  },
  methods: {
    getResult() {
      this.$ajax.get({
        url: this.$api.GET_VOTE_RESULT.replace('{id}', this.voteId),
      }).then(res => {
        this.content = res.data.content
      })
    },
    handleSubmit() {
      const config = {
        title: '公布投票结果',
        content: '是否确认公布投票结果？',
        msg: '公布成功',
      }
      this.$model.confirm({
        title: config.title,
        content: config.content,
        onOk: () => {
          this.$ajax.post({
            url: this.$api.POST_CMS_NOTICE,
            params: {
              voteId: this.voteId,
            }
          }).then(() => {
            this.$message.success(config.msg)
            this.$nextTick(() => this.$router.back())
          })
        },
      })
    },
    calcPercent(total, option) {
      if (!option) {
        return 0
      }
      return Math.floor((option / total) * 100)
    },
  }
}
</script>

<style scoped>
  .container {
    width: 60%;
    margin: 0 auto;
  }
  .container > h2 {
    text-align: center;
  }
  .container > div {
    margin-top: 40px;
  }
  .container .title {
    font-weight: bold;
  }
  .container .option span:first-child {
    display: inline-block;
    min-width: 30%;
    margin-right: 50px;
  }
  .container .option span:last-child {
    color: #1890ff;
    margin-left: 10px;
  }
</style>
