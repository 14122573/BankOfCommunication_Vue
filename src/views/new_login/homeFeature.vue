<template>
  <div>
    <NotifyNIndustry />
    <DataSearch />
    <KnowledgeNTopic />
  </div>
</template>

<script>
import NotifyNIndustry from './components/InlineWrapper2'
import DataSearch from './components/dataSearch'
import KnowledgeNTopic from './components/InlineWrapper4'
export default {
  components: {
    NotifyNIndustry,
    DataSearch,
    KnowledgeNTopic
  }
}
</script>