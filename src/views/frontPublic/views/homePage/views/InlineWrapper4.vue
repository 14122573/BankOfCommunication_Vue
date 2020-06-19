<template>
  <div class="InlineWrapper">
    <a-row>
      <!-- <a-col :span="12" style="background-color: red"> -->
      <a-col :span="12">
        <KnowledgeService />
      </a-col>
      <a-col :span="12">
        <TopicReport />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import KnowledgeService from '../components/knowledgeService'
import TopicReport from '../components/topicReport'
export default {
  components: {
    KnowledgeService,
    TopicReport
  }
}
</script>

<style scoped>
.InlineWrapper {
  height: 500px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>