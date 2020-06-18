<template>
  <div>
    <NotifyNIndustry />
    <DataSearch />
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