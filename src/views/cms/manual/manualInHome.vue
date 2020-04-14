<template>
  <div>
    <a-row class="sectionTitle" type="flex" justify="space-between" align="middle">
      <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">操作手册</span></a-col>
      <a-col v-if="manualList.length > 0" :span="6" class="algin-right"><span @click="routerTo('/cms/manual/file-list')" class="more">查看全部</span></a-col>
    </a-row>
    <div class="sectionContent">
      <div v-if="manualList.length > 0" @click="handleView" class="manual-wrapper">
        <img src="@/assets/images/word.png" />
        {{manualList[0].name}}
      </div>
      <div v-else class="noDataBox">
        <p>暂无操作手册</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManualPublish',
  data() {
    return {
      manualList: [],
    }
  },
  mounted() {
    this.getManualList()
  },
  methods: {
    getManualList() {
      const params = {
        pageNo  : 1,
        pageSize: 1
      }
      this.$ajax.get({
        url: this.$api.GET_MANUAL_LIST,
        params,
      }).then(res => {
        this.manualList = this.$com.confirm(res, 'data.content', [])
      })
    },
    handleView() {
      window.open(this.manualList[0].path, '_blank')
    },
    routerTo(name) {
      this.$router.push({
        name,
      })
    },
  },
}
</script>

<style scoped>
.sectionBody{ margin: 0 16px; padding-top: 16px;}
.sectionTitle { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid  rgba(0,0,0,0.1)}
.sectionTitle .divider{ font-size: 16px; background-color:#1890ff; height: 16px; width: 5px; border-radius: 4px;}
.sectionTitle .title{ font-size: 16px;}
.sectionTitle .more{ cursor: pointer; color: #1890ff}
.manual-wrapper {text-align: center; padding-bottom: 16px; cursor: pointer;}
.manual-wrapper:hover {color: #1890ff}
.manual-wrapper > img {width: 50px;}
.noDataBox {height: 70px; color:rgba(0,0,0,0.6); font-size: 30px; display: flex;flex-direction: column; align-items: center;justify-content: center;}
</style>
