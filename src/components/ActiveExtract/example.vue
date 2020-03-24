<template>
  <ActiveExtract
    @search="handleSearch"
    @select="handleSelect"
    @confirm="handleConfirm"
    @check="handleCheck"
    @viewConfirmed="handleViewConfirmed"/>
</template>

<script>
import ActiveExtract from './ActiveExtract'
export default {
  name: 'Example',
  components: {ActiveExtract},
  methods: {
    handleSearch(params, callBack) {
      console.log(params)

      // 发请求筛选专家后执行回调
      this.$ajax.get({
        url: this.$api.GET_EXPERT_LIST,
        params: {
          pageNo: params.pageNo,
          pageSize: params.pageSize,
        },
      }).then(res => {
        callBack(res)
      })
    },
    handleViewConfirmed(params, callBack) {
      // 发请求查看被选中的专家列表后执行回调
      /**
       * 例如 this.$ajax.get({参数}).then(callback)
       */
    },
    handleCheck(params, callBack) {
      // 发请求查看被选中的专家列表后执行回调
      /**
       * 例如 this.$ajax.get({参数}).then(callback)
       */
    },
    handleSelect(list) {
      // 发请求选中专家
      console.log(list)

    },
    handleConfirm(list) {
      // 发请求确认专家
      console.log(list)
    },
  }
}
</script>
