<template>
  <div class="wrapper">
      <!-- <div class="institutionalTree">
        <a-tree showLine @select="onSelect" @expand="expand" :expandedKeys="expandedKeys" v-if="selectedKeys.length>0"
          :treeData="treeData" :selectedKeys="selectedKeys" :loadData="onLoadData">
        </a-tree>
      </div> -->
  </div>
</template>

<script>
export default {
  name:'Administrative',
  data(){
    return {
      expandedKeys: ['all'],
      selectedKeys: [],
      treeData: [],
    }
  },
  methods:{
    onSelect(selectedKeys, info) {
      this.pagination.pageNo = 1
      this.pagination.current = 1
      this.areaCode = selectedKeys[0]
      this.transData.area = info.node.dataRef
      if (!this.areaCode) {
        this.areaCode = 'all'
        // this.getLists()
      } else {
        // this.getLists()
      }
    },
    expand(expandedKeys) {
      console.log(expandedKeys)
      this.expandedKeys = expandedKeys
    },
    getArea() {
      this.$ajax.get({
        url: this.$api.GET_AREA_NEXT,
        params: {
          parentId: 999999
        }
      }).then(res => {
        let datas = this.$com.confirm(res, 'data.content', [])
        let trees = []
        datas.forEach((ele, index) => {
          trees.push(this.getTreeNode(ele, index))
        })
        this.treeData = [{
          title: '全部',
          key: 'all',
          children: trees
        }]
        console.log(this.treeData)
        this.areaCode = 'all'
        this.getLists()
      })
    },
  },
}
</script>

<style>

</style>