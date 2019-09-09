<template>
  <div class="routerWapper">
    <div v-if="$route.name == '/systemManagement/role'" class="layoutMargin layoutPadding">
      <a-form class="protalForm" :form="searchForm">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col span="8">
            <a-form-item class="formItem" label="角色名称" :label-col="labelCol" :wrapper-col="wrapperCol" >
              <a-input placeholder="请输入" v-model="searchForm.roleName_l" />
            </a-form-item>
          </a-col>
          <a-col span="6" class="algin-right" style="padding-right:8px">
            <a-button @click="reset">重置</a-button>
            <a-button type="primary" @click="search">搜索</a-button>
          </a-col>
        </a-row>
      </a-form>
      <p class="gayLine"></p>
        <div class="wrapper-roles">
            <div class="box">
              <div class="inner add-btn">
                <a-button icon="plus" v-if="$permission('P02001')" @click="addBtn" class="add-btn" type="default" >新增角色</a-button>
              </div>
            </div>
            <div class="box" v-for="(item,index) in roleList" :key="index">
              <div class="inner">
                <div class="content">
                  <p class="name">{{item.roleName}}</p>
                  <p> <img :src="groups" class="group-icon" alt="人数"><span class="name-num">{{item.userCount || '0'}}人</span> </p>
                </div>
                <div class="operate">
                  <template v-if="$permission('P02002')">
                    <span @click="view(item)">查看</span>
                    <a-divider type="vertical" />
                  </template>
                  <template v-if="$permission('P02003')">
                    <span @click="edit(item)">修改</span>
                    <a-divider type="vertical" />
                  </template>
                  <span v-if="$permission('P02004')"  @click="deleteBtn(item)">删除</span>
                </div>
              </div>
            </div>
        </div>
        <!-- 分页 -->
        <a-row type="flex" justify="end">
          <a-col>
              <a-pagination size="small"  :defaultPageSize="20" showQuickJumper @change="onChange" :current="params.pageNo" :total="total" >
              </a-pagination>
          </a-col>
        </a-row>
    </div>
    <RouterWapper v-else></RouterWapper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        roleName_l:''
      },
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      roleList:[],
      deleteData:{},
      params:{
        pageNo:1,
        pageSize:20,
        createTime_desc:'1'
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
      }).then(res=>{
        if(res.code === '200'){
          this.total=res.data.totalRows
          this.roleList= this.$com.confirm(res, 'data.content', [])
        }else{
          this.$message.error(res.msg)
        }

        //存储当前列表的展示条件，包括分页信息、搜索条件
        this.$com.storeSearchParams(
          this.$route.name,
          this.params,
          {
            'roleName_l':!this.searchForm.roleName_l ? '':this.searchForm.roleName_l
          }
        )

      })
    },
    addBtn(){
      this.$router.push({
        name:'/systemManagement/role/create',
      })
    },
    //   删除按钮
    deleteBtn(item){
      let vm = this
      if(item.userCount !== null && item.userCount !== '' && item.userCount != 0){
        this.$model.warning({
          title: '无法删除此角色',
          content: '此角色还有员工未被分配，请先处理该角色下所有员工的调岗操作'
        })
      }else{
        this.deleteData = item
        this.$model.confirm({
          title: '是否确认删除此角色？',
          content: '此操作不可撤销',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            vm.handleOkDelete()
          }
        })
      }
    },
    // 修改按钮
    edit(item){
      this.$router.push({
        name:'/systemManagement/role/edit',
        query:{
          type:'edit',
          id:item.id,
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
        }
      })
    },
    /**
     * 从vuex中或已存储的搜索条件，判断此条件是否为当前路由的 。如果是则使用
     */
    getSearchParams(){
      let searchParams = this.$store.state.listSearchParams[this.$route.name]
      if(!!searchParams && !!searchParams.routeName && (this.$route.name == searchParams.routeName)){
        if(!!searchParams.params){
          Object.keys(this.searchForm).forEach(elem=>{
            this.searchForm[elem] = searchParams.params[elem]
          })
        }
        if(!!searchParams.pagination){
          if(!!searchParams.pagination.pageNo && searchParams.pagination.pageNo!=1){
            this.params.pageNo = searchParams.pagination.pageNo
          }
        }
      }
      this.getList()
    },
    handleOkDelete(){
      this.$ajax.delete({
        url:this.$api.DELETE_CHARACTER.replace('{id}',this.deleteData.id),
      }).then(res=>{
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
    if(this.$route.name == '/systemManagement/role'){
      this.getSearchParams()
    }
  }
}
</script>
<style scoped>
.wrapper-roles { display: flex; flex-wrap: wrap;}
.box { width: 20%; padding: 0 8px 16px 8px;}
.inner {height: 140px; display: flex; flex-direction: column; border: 1px solid #e8eaec;}
.content { display: flex; flex: 1; flex-direction: column; justify-content: center; align-items: start; padding:0px 20px;}
.content .name{ font-size: 16px;font-weight: bold;}
.content .name-num{ margin-left: 5px;font-weight: bold;}
.operate { border-top: 1px solid #e8eaec; height: 40px; text-align: center; line-height: 40px; }
.operate span { cursor: pointer; color: #1890ff}
.inner.add-btn { background: #e8eaec; border: none; }
.inner.add-btn > button {  width: 100%; height: 100%; font-size: 16px; color: #1890ff;}
.center-p{ text-align: center;}
.group-icon{ width: 16px; position: relative; top: -2px;}
</style>


