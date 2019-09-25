<template>
<div v-if="tree.roleTreeDataArranged.length>0">
  <a-form class="protalForm" :form="pointPermsForm">
    <a-form-item class='formItem' label="">
      <a-select @change="handlePermsChange" class="cellInput" v-decorator="['permIds']" mode="multiple">
        <a-select-opt-group v-for="(permGroup,groupIndex) in tree.roleTreeDataArranged" :key='groupIndex'>
          <span slot="label">{{permGroup.title}}</span>
          <a-select-option v-for="(perm) in permGroup.children" :value="perm.key" :key="perm.key">{{perm.title}}</a-select-option>
        </a-select-opt-group>
      </a-select>
    </a-form-item>
  </a-form>
</div>
</template>
<style scoped>
.cellInput,.cellText { width: 90%}
.cellText { display: inline-block; margin: 0}
.cellBtn { cursor: pointer; color: #1890ff}
</style>

<script>
export default {
  props: {
    permIds: {
      type:Array,
      required:true
    }
  },
  data () {
    return {
      tree:{
        roleTreeData:[],
        roleTreeDataArranged:[]
      },
      permIDArr:this.permIds,
    }
  },
  beforeCreate() {
    this.pointPermsForm = this.$form.createForm(this)
  },
  created(){
    this.getRoleTree()
    this.$nextTick(()=>{
      this.pointPermsForm.getFieldDecorator('permIds',{initialValue:this.permIDArr})
    })
  },
  watch:{
    permIds(){
      this.permIDArr = this.permIds
      this.pointPermsForm.setFieldsValue({permIds:this.permIDArr})
    }
  },
  methods: {
    /**
     * 监听所属权限选择，获取已选权限id数组
     * @param {Array} select 当前已选权限id数组
     */
    handlePermsChange(select){
      this.permIDArr = select
      this.$emit('change', this.permIDArr)
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
          data.forEach((item,index)=>{
            this.tree.roleTreeData.push(this.initRoleTreeNode(item))
          })

          // 重组需要展示的权限树
          this.tree.roleTreeData.forEach((item,index)=>{
            let node = Object.assign({}, item)
            this.tree.roleTreeDataArranged.push(node)
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
      // let isOldSys = (!!item.permKey && this.$com.oneOf(item.permKey,OldSysCodes)) ? true:false
      let childrenNode={
        'title':item.permName,
        'key':item.id,
        'permKey':!item.permKey?'':item.permKey,
        // 'isOldSys':isOldSys
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
  },
}
</script>
