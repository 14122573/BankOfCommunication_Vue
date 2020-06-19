<template>
  <div>
    <NotifyNIndustry />
    <DataSearch style="background-color: #f0f5f8;" />
    <KnowledgeNTopic />
  </div>
</template>

<script>
import NotifyNIndustry from './InlineWrapper2'
import DataSearch from '../components/dataSearch'
import KnowledgeNTopic from './InlineWrapper4'
export default {
  components: {
    NotifyNIndustry,
    DataSearch,
    KnowledgeNTopic
  }
}
</script>