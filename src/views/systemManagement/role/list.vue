<template>
    <a-card :style="{margin:'0 0 0 14px'}" :bordered="false">
        <a-form :form="searchForm">
            <a-row type="flex" justify="space-between">
                <a-col span="6">
                    <a-form-item
                        label="角色名称："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="searchForm.roleName_l"
                    />
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-button type="primary" @click="reset" ghost>重置</a-button>
                    <a-button type="primary" @click="search">搜索</a-button>
                </a-col>
            </a-row>
        </a-form>
        <div class="wrapper-roles">
            <div class="box">
                <div class="inner add-btn">
                    <a-button icon="plus" @click="addBtn" class="add-btn" type="default" >新增角色</a-button>
                </div>
            </div>
            <div class="box" v-for="(item,index) in roleList" :key="index">
                <div class="inner">
                    <div class="content">
                        <p class="name">{{item.roleName}}</p>
                        <p>
                            <img :src="groups" class="group-icon" alt="人数"><span class="name-num">4人</span>
                        </p>
                    </div>
                    <div class="operate">
                        <a @click="view(item)">查看</a>
                        <a-divider type="vertical" />
                        <a @click="edit(item)">修改</a>
                        <a-divider type="vertical" />
                        <a @click="deleteBtn(item)">删除</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除确认 -->
         <a-modal
            title="操作确认"
            v-model="deleteShow"
            @ok="handleOkDelete"
            cancelText="取消"
            okText="删除"
            :maskClosable="false"
            :width="360"
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
            :width="360"
            >
        <p class="center-p">此角色还有员工未被分配</p>
        <p class="center-p">请先处理该角色下所有员工的调岗操作</p>
        </a-modal>
        <!-- 分页 -->
        <a-row type="flex" justify="end">
          <a-col>
            <a-pagination showQuickJumper @change="onChange" :current="params.pageNo" :total="total" />
          </a-col>
        </a-row>
    </a-card>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      roleList:[],
      deleteShow:false,
      deleteRoleShow:false,
      deleteData:{},
      params:{
        pageNo:1,
        pageSize:20,
      },
      total:0,
      groups:require('@/assets/images/group.png'),
    }
  },
  methods:{
    // 查询按钮
    search(){
      this.params.pageNo=1
      this.getList()
    },
    // 重置按钮
    reset(){
      this.searchForm={}
      this.params.pageNo=1
      this.getList()
    },
    onChange(current) {
      this.params.pageNo = current
      this.getList()
    },
    //   查询列表
    getList(){
      this.$ajax.get({
        url:this.$api.GET_ROLE_LIST,
        params:Object.assign(this.searchForm,this.params)
      })
        .then(res=>{
          if(res.code === '200'){
            this.roleList=res.data.content
          }else{
            this.$message.error(res.msg)
          }
        })
    },
    addBtn(){
      this.$router.push({
        name:'/systemManagement/role/create',
      })
    },
    //   删除按钮
    deleteBtn(item){
      this.deleteShow=true
      this.deleteData=item
    },
    // 修改按钮
    edit(item){
      this.$router.push({
        name:'/systemManagement/role/edit',
        query:{
          type:'edit',
          id:item.id,
          roleName:item.roleName
        }
      })
    },
    // 查看按钮
    view(item){
      this.$router.push({
        name:'/systemManagement/role/view',
        query:{
          type:'view',
          id:item.id,
          roleName:item.roleName
        }
      })
    },
    handleOkDelete(){
      this.deleteShow=false
      this.$ajax.delete({
        url:this.$api.DELETE_CHARACTER.replace('{id}',this.deleteData.id),
      })
        .then(res=>{
          if(res.code === '200'){
            this.$message.success('删除成功')
            this.getList()
          }else{
            this.$message.error(res.msg)
          }
        })
    },
    handleOkDeleteRole(){
      this.deleteShow=false
      this.$ajax.delete({
        url:this.$api.DELETE_CHARACTER.replace('{id}',this.deleteData.id),
      })
        .then(res=>{
          if(res.code === '200'){
            this.$message.success('删除成功')
            this.getList()
          }else{
            this.$message.error(res.msg)
          }
        })
    },
  },
  mounted(){
    this.getList()
  }
}
</script>
<style scoped>
.wrapper-roles {
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 20%;
  padding: 0 16px 16px 0;
}
.inner {
  height: 140px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8eaec;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding:0px 20px;
}
.content .name{
    font-size: 18px;font-weight: bold;
}
.content .name-num{
    margin-left: 5px;font-weight: bold;
}
.operate {
  border-top: 1px solid #e8eaec;
  height: 40px;
  text-align: right;
  line-height: 40px;
  padding:0px 20px;
}
.inner.add-btn {
  background: #e8eaec;
  border: none;
}
.inner.add-btn > button {
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #1890ff;
}
.center-p{
    text-align: center;
}
.group-icon{
  width: 16px;
  position: relative;
  top: -2px;
}
</style>


