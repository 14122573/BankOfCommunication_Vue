<template>
	<div>
		<a-form class="protalForm" :form="searchForm">
			<a-row class="formItemLine" type="flex" :justify="simpleSearchForm?'end':'space-between'" align='middle' :gutter="simpleSearchForm?16:0">
				<a-col span="6">
					<a-form-item class="formItem" :label="simpleSearchForm?'':'账号'" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
						<a-input placeholder="请输入登录手机号" v-model="searchForm['ui.phone_l']" />
					</a-form-item>
				</a-col>
				<a-col span="6" v-if="!simpleSearchForm">
					<a-form-item class="formItem" label="姓名" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name_l" />
					</a-form-item>
				</a-col>
				<a-col span="6" v-if="!simpleSearchForm">
					<a-form-item label="邮箱" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.mail_l" />
					</a-form-item>
				</a-col>
				<a-col span="6" v-if="!simpleSearchForm">
					<a-form-item label="单位" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.dept_l" />
					</a-form-item>
				</a-col>
				<a-col span="12" v-if="!simpleSearchForm">
					<a-form-item label="注册时间段" :label-col="{span:4}" :wrapper-col="{span:20}">
						<a-range-picker allowClear v-model="time" :format="dateFormat" style="width:100%" :placeholder="['请选择开始日期','请选择结束日期']"
						 @change="onDateChange" />
					</a-form-item>
				</a-col>
				<a-col span="6" class="algin-right">
					<a-button @click="reset">重置</a-button>
					<a-button type="primary" @click="search">搜索</a-button>
          <a-button type="primary" v-if='simpleSearchForm' @click="showMoreSearch">更多搜索</a-button>
          <a-button type="primary" v-if='!simpleSearchForm' @click="closeMoreSearch">简单搜索</a-button>
				</a-col>
			</a-row>
		</a-form>
		<p class="gayLine noline"></p>
		<a-table class="portalTable" size="small" row-key="id" :pagination="pagination" :columns="columns" :dataSource="data">
			<span slot="createTime" slot-scope="text, record">
				{{$com.strTime(record.createTime)}}
			</span>
		  <span slot="action" slot-scope="text, record">
        <span class="actionBtn" v-if="$permission('P03101')" @click="viewBtn(record)">查看<a-divider v-if="$permission('P03101')" type="vertical" /></span>
        <span v-if="$permission('P03102')" class="actionBtn" @click="distributionBtn(record)">权限分配</span>
      </span>
		</a-table>
	</div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
      simpleSearchForm:true, // 展示、收取简单搜索开关，true为简单搜索
      dateFormat: 'YYYY-MM-DD',
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onChange
      },
      params: {
        'ui.createTime_desc': '0',
        status: '0'
      },
      time: [],
      total: 0,
      data: [],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },{
          title: '账号',
          width: 240,
          dataIndex: 'phone',
          key: 'phone'
        },{
          title: '邮箱',
          dataIndex: 'mail',
          key: 'mail'
        },{
          title: '单位',
          dataIndex: 'dept',
          key: 'dept'
        },{
          title:'注册时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 240,
          scopedSlots: {
            customRender: 'createTime'
          }
        },{
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ]
    }
  },
  computed:{
    formItemLabelCol(){
      let labelCol = {}
      if(this.simpleSearchForm){
        labelCol = {span: 0}
      }else{
        labelCol = {span: 8}
      }
      return labelCol
    },
    formItemWrapperCol(){
      let wrapperCol = {}
      if(this.simpleSearchForm){
        wrapperCol = {span: 24}
      }else{
        wrapperCol = {span: 16}
      }
      return wrapperCol
    }
  },
  methods: {
    closeMoreSearch(){
      this.simpleSearchForm = true
    },
    showMoreSearch(){
      this.simpleSearchForm = false
    },
    // 查询按钮
    search() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.getList()
    },
    // 重置按钮
    reset() {
      this.searchForm = {}
      this.time = []
      this.pagination.pageNo = 1
      this.pagination.current = 1
      this.getList()
    },
    onChange(current) {
      this.pagination.pageNo = current
      this.pagination.current = current
      this.getList()
    },
    // 查询列表
    getList() {
      let searchParams = JSON.parse(JSON.stringify(this.searchForm))
      if (searchParams.createTime_desc) {
        searchParams['ui.createTime_btw'] = searchParams.createTime_desc.join(',')
        delete searchParams.createTime_desc
      }
      // if (params.createTime_desc) params.createTime_desc=params.createTime_desc.join(',');
      this.$ajax.get({
        url: this.$api.USER_LIST_TYPE_GET.replace('{type}', 'new'),
        params: Object.assign(searchParams, this.params, {
          pageSize: this.pagination.pageSize,
          pageNo: this.pagination.pageNo
        })
      }).then(res => {
        if (res.code === '200') {
          this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
          this.data = this.$com.confirm(res, 'data.content', [])
        } else {
          this.$message.error(res.msg)
        }
        // 存储当前页面列表的搜索添加和分页信息
        this.$com.storeSearchParams(
          this.$route.name+'/pending',
          this.params,
          this.searchForm
        )
      })
    },

    onDateChange(date, dateString) {
      this.searchForm.createTime_desc = dateString
    },
    // 查看按钮
    viewBtn(item) {
      this.$router.push({
        name: '/systemManagement/administrator/pendingView',
        query: {
          id: item.id
        }
      })
    },
    // 权限分配按钮
    distributionBtn(item) {
      this.$router.push({
        name: '/systemManagement/administrator/distribution',
        query: {
          id: item.id
        }
      })
    },
    /**
     * 从vuex中或已存储的搜索条件，判断此条件是否为当前路由的 。如果是则使用
     */
    getSearchParams(){
      let searchParams = !this.$store.state.listSearchParams?null:this.$store.state.listSearchParams[this.$route.name+'/pending']
      if(!!searchParams && !!searchParams.routeName && (this.$route.name+'/pending' == searchParams.routeName)){
        if(!!searchParams.params){
          Object.keys(searchParams.params).forEach(elem=>{
            this.searchForm[elem] = searchParams.params[elem]
          })
        }
        if(!!searchParams.pagination){
          if(!!searchParams.pagination.pageNo && searchParams.pagination.pageNo!=1){
            this.pagination.pageNo = searchParams.pagination.pageNo
          }
        }
      }
      this.getList()
    },
  },
  mounted() {
    if(this.$route.name == '/systemManagement/administrator'){
      this.getSearchParams()
    }
  }
}
</script>
<style scoped>
	.page-row {
		margin-top: 20px;
	}
</style>
