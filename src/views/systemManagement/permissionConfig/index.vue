<style scoped>

</style>

<template>
	<div class="routerWapper">
    <div class="portalDetailWapper" v-if="$route.name == '/systemManagement/permissionConfig'">
      <div class="portalDetailTitle">
        <span class="title">维护权限基础划分</span>
        <div class="detailOperations">
          <a-button icon='plus' @click="goToPointMeg">功能点管理</a-button>
          <a-button icon='plus' type="primary" ghost @click="handleAddRoleNode(true)">添加一级权限</a-button>
          <a-button :disabled='disAddRoleNode' icon='plus' type="primary" ghost @click="handleAddRoleNode(false)">添加子集权限</a-button>
          <a-button :disabled='disEditRoleNode' icon='plus' type="primary" ghost @click="handleEditRoleNode">修改子集权限</a-button>
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
              <a-tree showLine class="portalRoleTree" :treeData="tree.roleTreeDataArranged" defaultExpandAll @select="onSelect" ></a-tree>
            </template>
          </div>
        </div>
      </div>
    </div>
		<RouterWapper v-else></RouterWapper>
    <CreatePermBranch @on-success='closeCreateModal' :parentId='createPerm.parentId' :parentName='createPerm.parentName' :timestamp='Date.now()' :resetShow='createPerm.showModal'></CreatePermBranch>
    <EditPermBranch @on-success='closeEditModal' :parentId='editPerm.parentId' :parentName='editPerm.parentName' :perm='!editPerm.permDetail?{}:editPerm.permDetail' :timestamp='Date.now()' :resetShow='editPerm.showModal'></EditPermBranch>
  </div>
</template>
<script>
import { OldSysCodes } from '@/config/outside-config'
import CreatePermBranch from './addPerm'
import EditPermBranch from './editPerm'
export default {
  components: {
    CreatePermBranch,EditPermBranch
  },
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
      },
      createPerm:{
        parentId:'0',
        parentName:'根节点',
        showModal:false
      },
      editPerm:{
        permDetail:null,
        parentId:'0',
        parentName:'根节点',
        showModal:false
      }
    }
  },
  mounted() {
    if(this.$route.name == '/systemManagement/permissionConfig'){
      this.getRoleTree()
    }
  },
  watch:{
    'tree.roleTreeData': {
      handler: function(val) {
        // 过滤获得老系统
        let oldSysPermissions = []
        this.tree.roleTreeDataArranged = []
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
      },
      deep: true
    },
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
    disEditRoleNode(){
      if(!!this.selectedNode.node){
        if(this.$com.oneOf(this.selectedNode.node.permKey,OldSysCodes)){
          return true
        }else{
          if(!this.selectedNode.parent){
            return true
          }else{
            return false
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
    closeEditModal(isReload){
      this.editPerm.showModal = false
      this.editPerm.permDetail = null
      this.editPerm.parentId='0'
      this.editPerm.parentName='根节点'
      if(isReload){
        this.getRoleTree()
      }},
    closeCreateModal(isReload){
      this.createPerm.showModal = false
      this.createPerm.parentId='0'
      this.createPerm.parentName='根节点'
      if(isReload){
        this.getRoleTree()
      }
    },
    goToPointMeg(){
      this.$router.push({name:'/systemManagement/permissionConfig/point'})
    },
    findRoleNode(){
      let roleNode = null
    },
    handleEditRoleNode(){
      this.editPerm.showModal = true
      this.editPerm.permDetail = this.selectedNode.node
      this.editPerm.parentId = this.selectedNode.parent.key
      this.editPerm.parentName = this.selectedNode.parent.title
      // console.log(this.selectedNode,this.editPerm)
    },
    handleAddRoleNode(isFirst){
      this.createPerm.showModal = true
      if(!isFirst){
        this.createPerm.parentId = this.selectedNode.key
        this.createPerm.parentName = this.selectedNode.node.title
      }
    },
    handleDelRoleNode(){
      let vm = this
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
      this.$ajax.delete({
        url: this.$api.DELETE_PREMSBRANCH.replace('{id}', this.selectedNode.key)
      }).then(res => {
        if (res.code === '200') {
          this.$message.success('删除成功')
          this.getRoleTree()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 查询权限树
     */
    getRoleTree(){
      this.$ajax.get({
        url:this.$api.GET_ALL_ROLE + '?isTree=true&isAll=true'
      }).then(res=>{
        if(!!res.data && !!res.data.content){
          let data=res.data.content
          this.tree.roleTreeData = []
          this.tree.roleTreeDataArranged = []
          data.forEach((item,index)=>{
            this.tree.roleTreeData.push(this.initRoleTreeNode(item))
          })
        }
      })
    },
    getPointsIds(pointSet){
      let ids = []
      for(let i=0;i<pointSet.length;i++){
        ids.push(pointSet[i].id)
      }
      return ids
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
        'pointSet':this.getPointsIds(item.pointSet),
        'isOldSys':isOldSys,
        'isHide':item.isHide
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
      // console.log('onSelect',selectedNodes)
      this.selectedNode.key = selectedKeys[0]
      this.selectedNode.node = {
        'title':selectedNodes[0].data.props.title,
        'isOldSys':selectedNodes[0].data.props.isOldSys,
        'permKey':selectedNodes[0].data.props.permKey,
        'pointSet':selectedNodes[0].data.props.pointSet,
        'key':selectedNodes[0].data.key,
        'isHide':selectedNodes[0].data.props.isHide
      }
      this.selectedNode.parent = !node.$parent.dataRef?null:Object.assign({},node.$parent.dataRef)
    },
    // onCheck (checkedKeys, info) {
    //   console.log('onCheck', checkedKeys, info)
    // },
  },
}
</script>


