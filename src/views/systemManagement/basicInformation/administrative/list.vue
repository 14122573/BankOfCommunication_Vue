<template>
  <div class="wrapper">
    <a-row>
      <a-col span="18">
        <div class="institutionalTree">
          <a-tree showLine @select="onSelect" @expand="expand" :expandedKeys="expandedKeys" :autoExpandParent="true"
            :treeData="treeData" :selectedKeys="selectedKeys" :loadData="onLoadData">
          </a-tree>
        </div>
      </a-col>
      <a-col span="6">
        <a-button type="primary" html-type="submit">添加</a-button>
        <a-button type="primary" html-type="submit">修改</a-button>
        <a-button type="primary" html-type="submit">删除</a-button>
      </a-col>
    </a-row>
      
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
  mounted(){
    // this.expand(['all'])
    this.getArea()
  },
  methods:{
    onSelect(selectedKeys, info) {
      console.log(selectedKeys, info)
      this.selectedKeys = [String(selectedKeys[0])]
      // this.transData.area = info.node.dataRef
    },
    expand(expandedKeys) {
      console.log(expandedKeys)
      console.log(this.expandedKeys)
      // this.expandedKeys = expandedKeys
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
        this.expandedKeys=['all']
      })
    },
    getTreeNode(item, index) {
      let childrenNode = {
        title: item.areaName,
        id: item.id,
        key: item.id,
        parentId: item.parentId
      }
      if (item.id.length == '9') {
        childrenNode.isLeaf = true
      }
      return childrenNode
    },
    /**
     * 异步加载数据，获取子节点
     *  treeNade {object} 当前点击的节点
     */
    onLoadData(treeNode) {
      console.log(treeNode)
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        this.$ajax.get({
          url: this.$api.GET_AREA_NEXT,
          params: {
            parentId: treeNode.dataRef.id
          }
        }).then(res => {
          let datas = this.$com.confirm(res, 'data.content', [])
          let array = []
          datas.forEach((ele, index) => {
            array.push(this.getTreeNode(ele, index))
          })
          treeNode.dataRef.children = array
          this.treeData = [...this.treeData]
          resolve()
        })
      })
    },
  },
}
</script>

<style>

</style>