<template>
    <a-card :style="{margin:'0 0 0 14px'}" :bordered="false" class="role-ope">
        <a-row type="flex" slot="title" justify="space-between" align="middle">
            <a-col>
                {{roleName}}
            </a-col>
            <a-col v-if="$route.query.type === 'view'">
                <a-button type="primary" @click="$router.back();" ghost>返回</a-button>
                <a-button type="primary" @click="edit" ghost>修改</a-button>
                <a-button type="primary" @click="deleteBtn" ghost>删除</a-button>
            </a-col>
            <a-col v-else>
                <a-button type="primary" @click="$router.back();" ghost>取消</a-button>
                <a-button type="primary" @click="save">保存</a-button>
            </a-col>
        </a-row>
        <a-form :form="formData" v-if="$route.query.type !== 'view'">
            <a-row>
                <a-col span="8">
                    <a-form-item
                        label="角色名称："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-decorator="[
                          'roleName',
                          {rules: [{ required: true, message: '请输入10字以内的角色名称！' ,whitespace:true,max:10 }],validateTrigger:'blur'}
                        ]"
                    />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <a-tree
          v-if="showTree"
          checkable
          :treeData="treeData"
          :defaultExpandedKeys='expandedKeys'
          v-model="checkedKeys"
          :disabled="$route.query.type === 'view'"
          showLine
        />
        
          <!-- 删除确认 -->
         <a-modal
            title="操作确认"
            v-model="deleteShow"
            @ok="handleOkDelete"
            cancelText="取消"
            okText="删除"
            :maskClosable="false"
            :width="465"
            >
        <p class="center-p">是否确认删除此角色？</p>
        <p class="center-p">此操作不可撤销</p>
        </a-modal>
        <!-- 删除确认-存在未分配人员 -->
         <a-modal
            title="操作确认"
            v-model="deleteRoleShow"
            @ok="handleOkDeleteRole"
            cancelText="取消"
            okText="删除"
            :maskClosable="false"
            :width="465"
            >
        <p class="center-p">此角色还有员工未被分配</p>
        <p class="center-p">请先处理该角色下所有员工的调岗操作</p>
        </a-modal>
    </a-card>
</template>
<script>
export default {
  data() {
    return {
      title:'新增角色',
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      checkedKeys: [],//选择的数组
      treeData:[],
      // 默认展开的数组
      expandedKeys:[],
      // 删除
      deleteShow:false,
      deleteRoleShow:false,
      deleteData:{},
      showTree:false,
      roleName:null
    }
  },
  methods: {
    // 查询权限树
    getTree(){
      this.$ajax.get({
        url:this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res=>{
        let data=res.data.content
        
        data.forEach((item,index)=>{
          this.treeData.push(this.getTreeNode(item,index))
        })
      })
    },
    // 整理权限树
    getTreeNode(item,index){
      let childrenNode={
        title:item.permName,
        key:item.id
      }
      if(item.childList && item.childList.length){
        childrenNode.children = []
        item.childList.forEach((subItem,subIndex) =>{
          let subkey = subItem.id
          childrenNode.children.push(this.getTreeNode(subItem,subkey))
        })
      }
      return childrenNode
    },
    // 查询角色详情
    getRoleInfo(id){
      this.$ajax.get({
        url:this.$api.PUT_CHARACTER.replace('{id}',id)
      })
        .then(res=>{
          if(res.code === '200'){
            let data=res.data.content
            this.roleName=data.roleName
            if(this.$route.query.type !== 'view'){
              this.formData.setFieldsValue({
                roleName:data.roleName
              })
            }
            this.checkedKeys=data.perm.map((item)=>{
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
      this.formData.validateFields((err)=>{
        if(!err){
          let msg
          let link
          let methods
          if(this.$route.query.id){
            link=this.$api.PUT_CHARACTER.replace('{id}',this.$route.query.id)
            methods='put'
            msg='修改成功'
          }else{
            link=this.$api.ADD_ROLE_POST
            methods='post'
            msg='新增成功'
          }
          this.$ajax[methods](
            {
              url:link,
              params:{
                roleName:this.formData.getFieldValue('roleName'),
                permIds:this.checkedKeys.join(',')
              }
            }
          )
            .then(res=>{
              if(res.code === '200'){
                this.$message.success(msg)
                this.$router.back()
              }else{
                this.$message.error(res.msg)
              }
            })
        }
      })
    },
    // 修改按钮
    edit(){
      this.$router.push({
        name:'/systemManagement/role/edit',
        query:{
          type:'edit',
          id:this.$route.query.id,
          roleName:this.$route.query.roleName
        }
      })
    },
    // 删除按钮
    deleteBtn(){
      this.deleteShow=true
    },
    handleOkDelete(){
      this.deleteShow=false
      this.$ajax.delete({
        url:this.$api.DELETE_CHARACTER.replace('{id}',this.$route.query.id),
      })
        .then(res=>{
          if(res.code === '200'){
            this.$message.success('删除成功')
            this.$router.push({
              name:'/systemManagement/role'
            })
          }else{
            this.$message.error(res.msg)
          }
        })
    },
    handleOkDeleteRole(){
      this.deleteShow=false
      this.$ajax.delete({
        url:this.$api.DELETE_CHARACTER.replace('{id}',this.$route.query.id),
      })
        .then(res=>{
          if(res.code === '200'){
            this.$message.success('删除成功')
            this.$router.push({
              name:'/systemManagement/role'
            })
          }else{
            this.$message.error(res.msg)
          }
        })
    },
  },
  mounted() {
    this.getTree()
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
  },
  beforeCreate() {
    this.formData = this.$form.createForm(this)
  },
}
</script>
<style>
  .role-ope li.ant-tree-treenode-disabled > span:not(.ant-tree-switcher), li.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper, li.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper span{
    color:rgba(0, 0, 0,1);
  }
  /* .role-ope .anticon-file{
    display: none;
  }
  .role-ope .ant-tree.ant-tree-show-line li:not(:last-child):before{
    display: none;
  } */
</style>


