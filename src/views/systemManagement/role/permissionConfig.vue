<style scoped>

</style>

<template>
<div class="portalDetailWapper">
  <div class="portalDetailTitle">
    <span class="title">维护权限基础划分</span>
    <div class="detailOperations">
      <a-button :disabled='disAddfistRoleNode' icon='plus' type="primary" ghost @click="handleAddFirstRoleNode">添加一级权限</a-button>
      <a-button :disabled='disAddRoleNode' icon='plus' type="primary" ghost @click="handleAddRoleNode">添加子集权限</a-button>
      <a-button :disabled='disDelRoleNode' icon='delete' type="danger" ghost @click="handleDelRoleNode">删除权限</a-button>
    </div>
  </div>
  <div class="portalDetailContentWapper">
    <div class="portalDetailContentBody">
      <div class="layoutMargin detailsPartSection contentPadding">
        <template v-if="tree.roleTreeDataArranged.length==0">
          <a-skeleton active />
        </template>
        <template v-else>
          <a-tree class="portalRoleTree" :treeData="tree.roleTreeDataArranged" defaultExpandAll @select="onSelect" ></a-tree>
        </template>
      </div>
    </div>
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
        roleTreeDataArranged:[]
      },
      selectedNode:{
        key:'',
        node:null,
        parent:null
      }
    }
  },
  computed:{
    disAddRoleNode(){
      if(!!this.selectedNode.node){
        if(this.$com.oneOf(this.selectedNode.node.permKey,OldSysCodes)){
          return true
        }else{
          if(!this.selectedNode.parent){
            return false
          }else{
            return true
          }
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
    },
    disAddfistRoleNode(){
      if(!!this.selectedNode.node){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    findRoleNode(){
      let roleNode = null

    },
    handleDelRoleNode(){
      this.$model.confirm({
        title: '是否确认删除’'+this.selectedNode.node.title+'‘？',
        content: '此操作不可撤销',
        okText: '确认删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          vm.confirmDelRoleNode()
        }
      })
    },
    confirmDelRoleNode(){

    },
    handleAddFirstRoleNode(){},
    handleAddRoleNode(){},
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

          // 过滤获得老系统
          let oldSysPermissions = [],vm = this
          this.tree.roleTreeData.forEach((item,index)=>{
            if(this.$com.oneOf(item.permKey,OldSysCodes)){
              oldSysPermissions.push(item)
            }else{
              let node = Object.assign({}, item)
              this.tree.roleTreeDataArranged.push(node)
            }
          })
          this.tree.roleTreeDataArranged.push({
            'title':'老系统权限',
            'key':'0',
            'permKey':'',
            'isOldSys':true,
            'children':[].concat(oldSysPermissions)
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
      this.selectedNode.parent = !node.$parent.dataRef?null:Object.assign({},node.$parent.dataRef)
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


