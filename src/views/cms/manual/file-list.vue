<template>
<div class="portalDetailContentWapper">
  <div class="layoutMargin detailsPartSection">
    <p class="detailsPartTitle">
      操作手册列表
      <span style="float: right;">
        <a-button @click="$router.back()">返回工作台</a-button>
      </span>
    </p>
    <div class="container">
      <div class="card" v-for="item in list" :key="item.id" @click="handleView(item.path)">
        <img src="@/assets/images/word.png" />
        <p>
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            {{item.name | formatter}}
          </a-tooltip>
        </p>
      </div>
    </div>
    <div style="text-align:right; padding: 16px 16px 0;">
      <a-pagination
        showQuickJumper
        v-model="pageNo"
        :total="total"
        :defaultPageSize="pageSize"
        @change="onChange"
        size="small"/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ManualFileList',
  data() {
    return {
      list: [],
      total: 0,
      pageNo: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      this.$ajax.get({
        url: this.$api.GET_MANUAL_LIST,
        params,
      }).then(res => {
        this.list = this.$com.confirm(res, 'data.content', [])
        this.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    onChange(page) {
      this.pageNo = page
      this.getList()
    },
    handleView(path) {
      window.open(path, '_blank')
    },
  },
  filters: {
    formatter(value) {
      if (!value) return ''
      if (value.length >= 15) {
        value = value.split('')
        return (value.splice(0, 15)).join('') + '...'
      }
      return value
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px;
}
.container > .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #eff7ff;
  width: 135px;
  height: 170px;
  text-align: center;
  margin: 8px;
  cursor: pointer;
  box-shadow: 0 0 3px 1px #eff7ff;
}
.container > .card:hover {
  box-shadow: 0 0 10px 6px #eff7ff;
}
.container > .card > img {
  width: 40px;
}
.container > .card > p {
  margin: 10px 0 0;
}
</style>
