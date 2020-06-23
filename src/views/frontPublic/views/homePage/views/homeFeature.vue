<template>
  <div class="wrapper">
    <NotifyNIndustry />
    <DataSearch style="background-color: #f0f5f8;" />
    <KnowledgeNTopic />
  </div>
</template>

<script>
import NotifyNIndustry from '@/views/frontPublic/views/homePage/views/inlineWrapper2.vue'
import DataSearch from '@/views/frontPublic/views/homePage/components/dataSearch.vue'
import KnowledgeNTopic from '@/views/frontPublic/views/homePage/views/inlineWrapper4.vue'
export default {
  components: {
    NotifyNIndustry,
    DataSearch,
    KnowledgeNTopic
  }
}
</script>

<style scoped>
  .wrapper {
    background-color: #ffffff
  }
</style>