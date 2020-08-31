<style scoped>
  .roleTitleSeation { border-bottom: 1px solid #e0e0e0; padding:10px}
  .roleTitleSeation .roleName { font-size: 20px; line-height: 40px; color:#232323; font-weight: bold}
  .roleTree { margin-top: 10px;}
</style>

<template>
    <div class="portalDetailWapper">
      <div class="portalDetailTitle">
        <span class="title">{{roleName || '创建新角色'}}</span>
        <div class="detailOperations" v-if="$route.query.type === 'view'">
          <a-button @click="$router.back();" >返回</a-button>
          <a-button @click="edit" >修改</a-button>
          <a-button type="danger" @click="deleteBtn" ghost>删除</a-button>
        </div>
        <div class="detailOperations" v-else>
          <a-button @click="$router.back();">取消</a-button>
          <a-button type="primary" @click="save">保存</a-button>
        </div>
      </div>
      <div class="portalDetailContentWapper">
        <a-form class="portalDetailContentBody" :form="formData">
          <div class="layoutMargin detailsPartSection contentPadding">
            <a-row class="formItemLine" v-if="$route.query.type !== 'view'">
                <a-col span="8">
                  <a-form-item label="角色名称" class="formItem" :label-col="labelCol" :wrapper-col="wrapperCol" >
                    <a-input placeholder="请输入"
                        v-decorator="[
                          'roleName',
                          {rules: [{ required: true, message: '请输入10字以内的角色名称！' ,whitespace:true,max:10 }],validateTrigger:'blur'}
                        ]" />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="级别" class="formItem" :label-col="labelCol" :wrapper-col="wrapperCol" >
                    <!-- <a-input placeholder="请输入"
                        v-decorator="[
                          'roleName',
                          {rules: [{ required: true, message: '请输入10字以内的角色名称！' ,whitespace:true,max:10 }],validateTrigger:'blur'}
                        ]" /> -->
                    <a-select placeholder="请选择" v-decorator="['sort',{rules: [{ required: true, message: '请选择级别!' }],validateTrigger:'change'}]" >
                      <a-select-option v-for="v in roleLevels" :key="v.key" :value="v.level">{{v.levelName}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
            </a-row>
            <a-tree class="portalRoleTree" v-if="showTree" checkable :treeData="treeData" :defaultExpandedKeys='expandedKeys' v-model="checkedKeys" :disabled="$route.query.type === 'view'" />
          </div>
        </a-form>

      </div>
    </div>
</template>
<script>
import roleLevels from '@/config/roleLevels.json'

export default {
  data() {
    return {
      title       : '新增角色',
      labelCol    : { span: 8 },
      wrapperCol  : { span: 16 },
      //选择的数组
      checkedKeys : [],
      treeData    : [],
      // 默认展开的数组
      expandedKeys: [],
      deleteData  : {},
      showTree    : false,
      roleName    : null,
      userCount   : null,
      roleIds     : [], // 功能点的id数组
      roleLevels,
    }
  },
  mounted() {
    this.getRoleIds()
  },
  beforeCreate() {
    this.formData = this.$form.createForm(this)
  },
  methods: {
    /**
     * 获取当前用户权限
     */
    getRoleIds(){
      this.$ajax.get({
        url: this.$api.GET_USER_PERMS
      }).then(res => {
        if(res.code == '200'){
          let arr =res.data.content
          for(let i=0;i<arr.length;i++){
            this.roleIds.push(arr[i].id)
            this.roleIds.push(arr[i].parentId)
          }
          this.getTree()
        }
      })
    },
    // 查询权限树
    getTree(){
      this.$ajax.get({
        url: this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res => {
        const data=res.data.content
        data.forEach((item, index) => {
          this.treeData.push(this.getTreeNode(item, index))
        })
        if(this.$route.query.type === 'edit'){
          this.title='修改角色'
          this.getRoleInfo(this.$route.query.id)
        }else if(this.$route.query.type === 'view'){
          this.title=this.$route.query.roleName
          this.getRoleInfo(this.$route.query.id)
        }else{
          this.title='新增角色'
          this.showTree=true
        }
      })
    },

    /**
     * 整理权限树
     */
    getTreeNode(item, index){
      if(this.roleIds.length>0 && this.roleIds.indexOf(item.id)<0){
        var childrenNode={
          title   : item.permName,
          key     : item.id,
          disabled: true,
        }
      }else{
        var childrenNode={
          title: item.permName,
          key  : item.id
        }
      }
      if(item.childList && item.childList.length){
        childrenNode.children = []
        item.childList.forEach((subItem, subIndex) => {
          const subkey = subItem.id
          childrenNode.children.push(this.getTreeNode(subItem, subkey))
        })
      }
      return childrenNode
    },
    // 查询角色详情
    getRoleInfo(id){
      this.$ajax.get({
        url: this.$api.GET_CHARACTER.replace('{id}', id)
      }).then(res => {
        if(res.code === '200'){
          const data=res.data.content
          this.roleName=data.roleName
          this.userCount=data.userCount
          if(this.$route.query.type !== 'view'){
            this.formData.setFieldsValue({
              roleName: data.roleName,
              sort    : data.sort
            })
          }
          this.checkedKeys=data.perm.map((item) => {
            return item.id
          })
          this.expandedKeys=JSON.parse(JSON.stringify(this.checkedKeys))
          this.showTree=true
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    // 保存按钮
    save(){
      this.formData.validateFields((err) => {
        if(!err){
          let msg, link, methods
          if(this.$route.query.id){
            link=this.$api.PUT_CHARACTER.replace('{id}', this.$route.query.id)
            methods='post'
            msg='修改成功'
          }else{
            link=this.$api.ADD_ROLE_POST
            methods='post'
            msg='新增成功'
          }
          this.$ajax[methods]({
            url   : link,
            params: {
              roleName: this.formData.getFieldValue('roleName'),
              sort    : this.formData.getFieldValue('sort'),
              permIds : this.checkedKeys.join(',')
            }
          }).then(res => {
            if(res.code === '200'){
              this.$message.success(msg)
              this.$router.back()
            }
          })
        }else{
          this.$com.getFormValidErrTips(this, err)
        }
      })
    },
    // 修改按钮
    edit(){
      this.$router.push({
        name : '/systemManagement/role/edit',
        query: {
          type    : 'edit',
          id      : this.$route.query.id,
          roleName: this.$route.query.roleName
        }
      })
    },
    // 删除按钮
    deleteBtn(){
      const vm = this
      if(this.userCount !== null && this.userCount !== '' && this.userCount != 0){
        this.$modal.warning({
          title  : '无法删除此角色',
          content: '此角色还有员工未被分配，请先处理该角色下所有员工的调岗操作',
          okText : '确认',
        })
      }else{
        this.$modal.confirm({
          title     : '是否确认删除此角色？',
          content   : '此操作不可撤销',
          okText    : '确认',
          okType    : 'danger',
          cancelText: '取消',
          onOk() {
            vm.handleOkDelete()
          }
        })
      }
    },
    handleOkDelete(){
      this.$ajax.post({
        url: this.$api.DELETE_CHARACTER.replace('{id}', this.$route.query.id),
      }).then(res => {
        if(res.code === '200'){
          this.$message.success('删除成功')
          this.$router.push({
            name: '/systemManagement/role'
          })
        }
      })
    },
  },
}
</script>

