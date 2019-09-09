<style scoped>

</style>

<template>
  <div class="layoutMargin layoutPadding">
    <a-tree class="portalRoleTree" :treeData="tree.roleTreeData" defaultExpandAll @select="onSelect" ></a-tree>
    <p class="gayLine"></p>
    <div class="portalTableOperates">
      <a-button :disabled='disAddRoleNode' icon='plus' type="primary" ghost @click="handleAddRoleNode">添加子集</a-button>
      <a-button :disabled='disDelRoleNode' icon='delete' type="danger" ghost @click="handleDelRoleNode">删除权限</a-button>
    </div>
  </div>
</template>
<script>
import { OldSysCodes } from '@/config/outside-config'
export default {
  data() {
    return {
      tree:{
        roleTreeData:[],

      },
      selectedNode:{
        key:'',
        node:null
      }
    }
  },
  computed:{
    disAddRoleNode(){
      if(!!this.selectedNode.node){
        if(this.$com.oneOf(this.selectedNode.node.permKey,OldSysCodes)){
          return true
        }else{
          return false
        }
      }else{
        return true
      }
    },
    disDelRoleNode(){
      if(!!this.selectedNode.node){
        return false
      }else{
        return true
      }
    }
  },
  methods: {
    handleAddRoleNode(){},
    handleDelRoleNode(){},
    /**
     * 查询权限树
     */
    getRoleTree(){
      this.$ajax.get({
        url:this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res=>{
        if(!!res.data && !!res.data.content){
          let data=res.data.content
          data.forEach((item,index)=>{
            this.tree.roleTreeData.push(this.initRoleTreeNode(item))
          })
        }
      })
    },
    /**
     * 根据tree渲染数据所需结构，重组数据
     * @param {Object} item 单个权限对象
     * @returns childrenNode 对传入参数，已重组的数据
     */
    initRoleTreeNode(item){
      let isOldSys = (!!item.permKey && this.$com.oneOf(item.permKey,OldSysCodes)) ? true:false
      let childrenNode={
        'title':item.permName,
        'key':item.id,
        'permKey':!item.permKey?'':item.permKey,
        'isOldSys':isOldSys
      }
      if(item.childList && item.childList.length){
        childrenNode.children = []
        item.childList.forEach((subItem) =>{
          let subkey = subItem.id
          childrenNode.children.push(this.initRoleTreeNode(subItem))
        })
      }
      return childrenNode
    },
    /**
     * 触发树节点选中事件，存储选中节点
     * @param {String} selectedKeys 选中节点的key
     * @param {Object} node 选中节点对象
     */
    onSelect (selectedKeys, {selected, selectedNodes, node, event}) {
      this.selectedNode.key = selectedKeys[0]
      this.selectedNode.node = {
        'title':selectedNodes[0].data.props.title,
        'isOldSys':selectedNodes[0].data.props.isOldSys,
        'permKey':selectedNodes[0].data.props.permKey,
        'key':selectedKeys[0]
      }
      console.log('selected', this.selectedNode)
    },
    onCheck (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    },
  },
  mounted() {
    this.getRoleTree()
  },
  beforeCreate() {
    // this.formData = this.$form.createForm(this)
  },
}
</script>


