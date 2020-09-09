<template>
	<div class="routerWapper">
    <div class="portalDetailWapper" v-if="$route.name == '/systemManagement/permissionConfig'">
      <div class="portalDetailTitle">
        <span class="title">维护权限基础划分</span>
        <div class="detailOperations">
          <a-button type="primary" @click="goToPointMeg">功能点管理</a-button>
          <a-button icon='plus' type="primary" ghost @click="handleAddRoleNode(true)">添加一级权限</a-button>
          <a-button :disabled='disAddRoleNode' icon='plus' type="primary" ghost @click="handleAddRoleNode(false)">添加子集权限</a-button>
          <a-button :disabled='disEditRoleNode' icon='plus' type="primary" ghost @click="handleEditRoleNode">修改权限信息</a-button>
          <a-button :disabled='disDelRoleNode' icon='delete' type="danger" ghost @click="handleDelRoleNode">删除权限</a-button>
        </div>
      </div>
      <div class="portalDetailContentWapper">
        <div class="portalDetailContentBody">
          <div class="layoutMargin">
            <a-alert message="标签说明" type="info">
              <div slot="description">
                <p><a-icon type="share-alt" style="color:rgba(0,0,255,0.6);" /> : 此类权限可用于角色创建和分配</p>
                <p><a-icon type="stop" style="color:rgba(255,0,0,0.6);" /> : 此类权限不可用于角色创建和赋权</p>
              </div>
            </a-alert>
          </div>
          <div class="layoutMargin detailsPartSection contentPadding">
            <template v-if="tree.roleTreeDataArranged.length==0">
              <a-skeleton active />
            </template>
            <template v-else>
              <a-tree  class="portalRoleConfigTree" :treeData="tree.roleTreeDataArranged" defaultExpandAll @select="onSelect" >
                <template slot='treeTitle' slot-scope="treeNode">
                  <span class="prohibitRoleNode">
                    <span class="title">{{treeNode.title }}</span>
                    <a-icon v-if="treeNode.isHide" class="icon prohibit" type="stop" />
                    <a-icon v-else class="icon" type="share-alt" />
                  </span>
                </template>
              </a-tree>
            </template>
          </div>
        </div>
      </div>
    </div>
		<RouterWapper v-else></RouterWapper>
    <CreatePermBranch @on-success='closeCreateModal' :parentNode='createPerm.parentDetail' :timestamp='Date.now()' :resetShow='createPerm.showModal'></CreatePermBranch>
    <EditPermBranch @on-success='closeEditModal' :parentNode='editPerm.parentDetail' :perm='!editPerm.permDetail?{}:editPerm.permDetail' :timestamp='Date.now()' :resetShow='editPerm.showModal'></EditPermBranch>
  </div>
</template>
<style scoped>
.prohibitRoleNode .title{ padding-right:2px;}
.prohibitRoleNode .icon { color:rgba(0,0,255,0.6);font-size:12px; }
.prohibitRoleNode .prohibit { color:rgba(255,0,0,0.6); }
</style>

<script>
import CreatePermBranch from './addPerm'
import EditPermBranch from './editPerm'
export default {
  components: {
    CreatePermBranch, EditPermBranch
  },
  data() {
    return {
      tree: {
        roleTreeData        : [],
        roleTreeDataArranged: []
      },
      selectedNode: {
        key   : '',
        node  : null,
        parent: null
      },
      createPerm: {
        parentDetail: {
          key   : '0',
          name  : '根节点',
          //默认可分配
          isHide: false
        },
        showModal: false
      },
      editPerm: {
        parentDetail: {
          key   : '0',
          name  : '根节点',
          //默认可分配
          isHide: false
        },
        permDetail: null,
        parentId  : '0',
        parentName: '根节点',
        showModal : false
      }
    }
  },
  mounted() {
    if(this.$route.name == '/systemManagement/permissionConfig'){
      this.getRoleTree()
    }
  },
  watch: {
    'tree.roleTreeData': {
      handler: function(val) {
        const initializedRoleTree = []
        // 重组需要展示的权限树
        this.tree.roleTreeDataArranged = []
        this.tree.roleTreeData.forEach((item, index) => {
          if(!item.canDelete && !!item.permKey){
            initializedRoleTree.push(item)
          }else{
            const node = Object.assign({}, item)
            this.tree.roleTreeDataArranged.push(node)
          }
        })
        this.tree.roleTreeDataArranged.push({
          'titleName'  : '初始化权限',
          'title'      : '初始化权限',
          'key'        : '-1',
          'permKey'    : '',
          'pointSet'   : [],
          'canDelete'  : false,
          'isHide'     : true,
          'scopedSlots': { title: 'treeTitle' },
          'children'   : [].concat(initializedRoleTree)
        })
      },
      deep: true
    },
  },
  computed: {
    disAddRoleNode(){
      if(!!this.selectedNode.node){
        if(!this.selectedNode.parent){
          return false
        }else{
          return true
        }
      }else{
        return true
      }
    },
    disEditRoleNode(){
      if(!!this.selectedNode.node){
        if('-1'==this.selectedNode.node.key){
          // 当为重组权限树时手动添加的树节点时，不可编辑
          return true
        }else{
          // 否则可修改
          return false
        }
      }else{
        return true
      }
    },
    disDelRoleNode(){
      if(!!this.selectedNode.node){
        if(!this.selectedNode.node.canDelete){
          return true
        }else{
          return false
        }
      }else{
        return true
      }
    }

  },
  methods: {
    closeEditModal(isReload){
      this.editPerm.showModal = false
      // if(isReload){
      this.editPerm.permDetail = null
      this.editPerm.parentDetail.key='0'
      this.editPerm.parentDetail.name='根节点'
      this.editPerm.parentDetail.isHide = false
      this.selectedNode = {
        key   : '',
        node  : null,
        parent: null
      }
      this.getRoleTree()
      // }
    },
    closeCreateModal(isReload){
      this.createPerm.showModal = false
      // if(isReload){
      this.createPerm.parentDetail.key='0'
      this.createPerm.parentDetail.name ='根节点'
      this.createPerm.parentDetail.isHide = false
      this.selectedNode = {
        key   : '',
        node  : null,
        parent: null
      }
      this.getRoleTree()
      // }
    },
    goToPointMeg(){
      this.$router.push({ name: '/systemManagement/permissionConfig/point' })
    },
    findRoleNode(){
      const roleNode = null
    },
    handleEditRoleNode(){
      this.editPerm.permDetail = this.selectedNode.node
      this.editPerm.parentDetail = {
        key   : !this.selectedNode.parent?'0':this.selectedNode.parent.key,
        name  : !this.selectedNode.parent?'根节点':this.selectedNode.parent.title,
        isHide: !this.selectedNode.parent?false:this.selectedNode.parent.isHide
      }
      this.editPerm.showModal = true
    },
    handleAddRoleNode(isFirst){
      if(!isFirst){
        this.createPerm.parentDetail.key = this.selectedNode.key
        this.createPerm.parentDetail.name = this.selectedNode.node.title
        this.createPerm.parentDetail.isHide = this.selectedNode.node.isHide
      }
      this.createPerm.showModal = true
    },
    handleDelRoleNode(){
      const vm = this
      this.$modal.confirm({
        title     : '是否确认删除’'+this.selectedNode.node.title+'‘？',
        content   : '此操作不可撤销',
        okText    : '确认删除',
        okType    : 'danger',
        cancelText: '取消',
        onOk() {
          vm.confirmDelRoleNode()
        }
      })
    },
    confirmDelRoleNode(){
      this.$ajax.post({
        url: this.$api.DELETE_PREMSBRANCH.replace('{id}', this.selectedNode.key)
      }).then(res => {
        if (res.code === '200') {
          this.$message.success('删除成功')
          this.getRoleTree()
        }
      })
    },

    /**
     * 查询权限树
     */
    getRoleTree(){
      this.$ajax.get({
        url: this.$api.GET_ALL_ROLE + '?isTree=true&isAll=true'
      }).then(res => {
        if(!!res.data && !!res.data.content){
          const data=res.data.content
          this.tree.roleTreeData = []
          this.tree.roleTreeDataArranged = []
          data.forEach((item, index) => {
            this.tree.roleTreeData.push(this.initRoleTreeNode(item))
          })
        }
      })
    },
    getPointsIds(points){
      let ids = []
      ids = points.map(point => {
        return point.id
      })
      return ids
    },

    /**
     * 根据tree渲染数据所需结构，重组数据
     * @param {Object} item 单个权限对象
     * @returns childrenNode 对传入参数，已重组的数据
     */
    initRoleTreeNode(item){
      const childrenNode={
        'titleName'  : item.permName,
        'title'      : item.permName,
        'key'        : item.id,
        'permKey'    : !item.permKey?'':item.permKey,
        'pointSet'   : this.getPointsIds(!item.points?[]:item.points),
        'canDelete'  : item.canDelete===false?false:true,
        'isHide'     : item.isHide,
        'scopedSlots': { title: 'treeTitle' }
      }
      if(item.childList && item.childList.length){
        childrenNode.children = []
        item.childList.forEach((subItem) => {
          const subkey = subItem.id
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
    onSelect (selectedKeys, { selected, selectedNodes, node, event }) {
      if(selectedKeys.length>0){
        this.selectedNode.key = selectedKeys[0]
        this.selectedNode.node = {
          'title'    : selectedNodes[0].data.props.titleName,
          'canDelete': selectedNodes[0].data.props.canDelete,
          'permKey'  : selectedNodes[0].data.props.permKey,
          'pointSet' : selectedNodes[0].data.props.pointSet,
          'key'      : selectedNodes[0].data.key,
          'isHide'   : selectedNodes[0].data.props.isHide
        }
        this.selectedNode.parent = !node.$parent.dataRef?null:Object.assign({}, node.$parent.dataRef)
      }else{
        this.selectedNode = {
          key   : '',
          node  : null,
          parent: null
        }
      }
    }
  },
}
</script>

