<template>
<div class="portalDetailContentWapper">
  <div class="layoutMargin detailsPartSection">
    <p class="detailsPartTitle">
      投票信息查看
      <span style="float: right;">
        <a-button @click="$router.back()">返回</a-button>
      </span>
    </p>
    <div class="container">
      <h2>{{content.name}}</h2>
      <p>投票日期：{{`${content.startTime.split(' ')[0]} ~ ${content.endTime.split(' ')[0]}`}}&nbsp;&nbsp;&nbsp;&nbsp;状态：{{transformStatus(content.status)}}</p>
      <p v-if="content.description">{{content.description}}</p>
      <div v-for="(item, index) in content.subjects" :key="item.key">
        <p class="title">
          {{`${index + 1}、${item.title}`}}
          <span class="red" v-show="item.isRequired == '0'">*</span>&nbsp;&nbsp;&nbsp;&nbsp;
          {{`(${item.type == '0' ? '单选题' : '多选题'})`}}
        </p>
        <p v-for="option in item.options" :key="option.id">
          {{`${option.value}、${option.label || ''}`}}
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CMSDataStatus from '@/views/cms/components/cmsStatus'
export default {
  name: 'VoteView',
  components: {
    CMSDataStatus,
  },
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
      this.getData()
    }
  },
  methods: {
    getData() {
      this.$ajax.get({
        url: this.$api.GET_VOTE_VIEW.replace('{id}', this.voteId),
      }).then(res => {
        this.content = res.data.content
      })
    },
    transformStatus(status) {
      switch (status) {
      case '0':
        return '草稿'
      case '1':
        return '发布中'
      case '2':
        return '结束'
      case '3':
        return '结果已公示'
      default:
        return '无'
      }
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
  .container > p {
    font-size: 12px;
    text-align: center;
  }
  .container > div {
    margin-top: 40px;
  }
  .container .title {
    font-weight: bold;
  }
  .red {
    color: red;
  }
</style>
