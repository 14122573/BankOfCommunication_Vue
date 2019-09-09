<template>
	<div class="routerWapper">
		<div v-if="$route.name =='/expertManagement/talent'" class="layoutMargin layoutPadding">
			<a-form :form="searchForm" class="protalForm">
				<a-row type="flex" justify="space-between" class="formItemLine">
					<a-col span="6">
						<a-form-item label="姓名" class="formItem" v-bind="colSpe">
							<a-input v-decorator="['name_l']" placeholder="请输入"></a-input>
						</a-form-item>
					</a-col>
					<a-col span="6">
						<a-form-item label="联系电话" class="formItem" v-bind="colSpe">
							<a-input v-decorator="['phone_l']" placeholder="请输入"></a-input>
						</a-form-item>
					</a-col>
					<a-col span="6">
						<a-form-item label="职称" class="formItem" v-bind="colSpe">
							<a-select v-decorator="['jobTitle']" placeholder="请选择" allowClear>
								<a-select-option v-for="(item,index) in options.jobList" :key="index" :value="item.id">{{item.name}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col span="6">
						<a-form-item label="用户状态" class="formItem" v-bind="colSpe">
							<a-checkbox-group v-decorator="['status_in',{initialValue: []}]" :options="options.statusList"></a-checkbox-group>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end" class="formItemLine">
					<a-col span="6" class="algin-right">
						<a-button @click="reset">重置</a-button>
						<a-button type="primary" @click="search">搜索</a-button>
					</a-col>
				</a-row>
			</a-form>
			<p class="gayLine"></p>
			<a-row class="portalTableOperates">
				<a-button type="primary" icon='plus' @click="$router.push({name: '/expertManagement/talent/create'})">新增人才</a-button>
				<a-button icon='download' @click="$router.push({name: '/expertManagement/talent/upload'})">导入人才</a-button>
			</a-row>
			<a-table class="portalTable" size="small" :dataSource="dataSource" rowKey="id" :pagination="pagination" :columns="columns">
				<span slot="status" slot-scope="text, record">
					<userStatus :status="record.status" />
				</span>
				<span slot="action" slot-scope="text, record">
					<span class="actionBtn" @click="$router.push({name:'/expertManagement/talent/view',query:{id:record.expertId}})">查看</span>
					<a-divider type="vertical" />
					<span class="actionBtn" @click="editBtn(record)">修改</span>
				</span>
			</a-table>
		</div>
		<RouterWapper v-else></RouterWapper>
	</div>
</template>
<script>
import userStatus from '../../systemManagement/components/user-status'
export default {
  name: 'Talent',
  components: {
    userStatus
  },
  data() {
    return {
      searchForm: this.$form.createForm(this),
      options: {
        proList: [{
          label: '省级认定',
          value: '1'
        },
        {
          label: '部级认定',
          value: '0'
        }
        ],
        levList: [{
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
        ],
        statusList: [{
          label: '正常',
          value: '0,1'
        },
        {
          label: '已注销',
          value: '8'
        }
        ],
        jobList: []
      },
      colSpe: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        }
      },
      dataSource: [],
      columns: [{
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '联系电话',
        dataIndex: 'phone'
      },
      {
        title: '工作单位',
        dataIndex: 'workCompany'
      },
      {
        title: '职称',
        dataIndex: 'jobTitleName'
      },
      {
        title: '省级认定',
        dataIndex: 'provinceConfirm'
      },
      {
        title: '部级认定',
        dataIndex: 'unitConfirm'
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        scopedSlots: {
          customRender: 'status'
        }
      },
      {
        title: '操作',
        width: 140,
        dataIndex: 'action',
        scopedSlots: {
          customRender: 'action'
        }
      }
      ],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onChange
      },
      opeationItem: {},
      addExpertUser: false,
      chooseIndex: 1
    }
  },
  mounted() {
    if(this.$route.name == '/expertManagement/talent'){
      this.getSearchParams()
      this.getJobLists()
    }
  },
  methods: {
    /**
     * 从vuex中或已存储的搜索条件，判断此条件是否为当前路由的 。如果是则使用
     */
    getSearchParams(){
      let searchParams = this.$store.state.listSearchParams[this.$route.name]
      if(!!searchParams && !!searchParams.routeName && (this.$route.name == searchParams.routeName)){
        if(!!searchParams.params){
          this.searchForm.setFieldsValue(searchParams.params)
          // Object.keys(searchParams.params).forEach(elem=>{
          //   this.searchForm[elem] = searchParams.params[elem]
          // })
        }
        if(!!searchParams.pagination){
          if(!!searchParams.pagination.pageNo && searchParams.pagination.pageNo!=1){
            this.pagination.pageNo = searchParams.pagination.pageNo
          }
        }
      }
      this.getLists()
    },
    getLists() {
      const options = this.$com.dealObjectValue(this.searchForm.getFieldsValue())
      if (options.status_in) options.status_in = options.status_in.join(',')
      const params = Object.assign(options, {
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.pageNo,
        type:'1'
      })
      this.$ajax.get({
        url: this.$api.GET_EXPERT_LIST,
        params: params
      }).then(res => {
        this.dataSource = this.$com.confirm(res, 'data.content', [])
        this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
        // 存储当前页面列表的搜索添加和分页信息
        this.$com.storeSearchParams(
          this.$route.name,
          this.pagination,
          this.searchForm.getFieldsValue()
        )
      })
    },
    // 查询
    search() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.getLists()
    },
    // 重置
    reset() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.searchForm.resetFields()
      this.getLists()
    },
    editBtn(item) {
      this.$router.push({
        name: '/expertManagement/talent/edit',
        query: {
          id: item.id
        }
      })
    },
    getJobLists() {
      this.$ajax.get({
        url: this.$api.DICTIONARY_TYPE_GET.replace('{type}', '3')
      }).then(res => {
        this.options.jobList = this.$com.confirm(res, 'data.content', [])
      })
    },
    onChange(val) {
      this.pagination.pageNo = val
      this.pagination.current = val
      this.getLists()
    }
  }
}
</script>
<style scoped>
	.block {
		height: 70px;
		outline: 1px solid #e8e8e8;
		font-size: 12px;
		color: black;
		cursor: pointer;
	}

	.block img {
		width: 45px;
		margin-right: 10px;
	}

	.active {
		outline: 1px solid #40a9ff;
	}
</style>
