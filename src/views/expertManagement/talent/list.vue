<template>
	<div class="routerWapper">
		<div v-if="$route.name =='/expertManagement/talent'" class="layoutMargin layoutPadding">
			<a-form :form="searchForm" class="protalForm">
				<a-row type="flex" class="formItemLine" :justify="simpleSearchForm?'end':'space-between'" align='middle' :gutter="simpleSearchForm?16:0">
					<a-col span="6">
						<a-form-item :label="simpleSearchForm?'':'姓名'" class="formItem" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
							<a-input v-decorator="['name_l']" placeholder="请输入姓名"></a-input>
						</a-form-item>
					</a-col>
					<a-col span="6" v-if="!simpleSearchForm">
						<a-form-item label="联系电话" class="formItem" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
							<a-input v-decorator="['phone_l']" placeholder="请输入"></a-input>
						</a-form-item>
					</a-col>
					<a-col span="6" v-if="!simpleSearchForm">
						<a-form-item label="职称" class="formItem" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
							<a-select v-decorator="['jobTitle']" placeholder="请选择" allowClear>
								<a-select-option v-for="(item,index) in options.jobList" :key="index" :value="item.id">{{item.name}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				<!-- </a-row>
				<a-row type="flex" justify="space-between" class="formItemLine"> -->
					<a-col span="8" v-if="!simpleSearchForm">
						<a-form-item label="用户状态" class="formItem" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
							<a-checkbox-group v-decorator="['status_in',{initialValue: []}]" :options="options.statusList"></a-checkbox-group>
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
          <template v-if="$com.oneOf(record.status,['0','1'])">
					  <span class="actionBtn" @click="editBtn(record)"><a-divider type="vertical" />修改</span>
          </template>
				</span>
			</a-table>
		</div>
		<RouterWapper v-else></RouterWapper>
	</div>
</template>
<script>
import userStatus from '@/views/systemManagement/components/user-status'
export default {
  name: 'Talent',
  components: {
    userStatus
  },
  data() {
    return {
      searchForm: this.$form.createForm(this),
      simpleSearchForm:true, // 展示、收取简单搜索开关，true为简单搜索
      options: {
        proList: [
          {
            label: '省级认定',
            value: '1'
          },{
            label: '部级认定',
            value: '0'
          }
        ],
        levList: [
          {
            label: '是',
            value: '1'
          },{
            label: '否',
            value: '0'
          }
        ],
        statusList: [
          {
            label: '正常',
            value: '1'
          },{
            label: '禁用',
            value: '9'
          },{
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
      columns: [
        {
          title: '姓名',
          dataIndex: 'name'
        },{
          title: '联系电话',
          dataIndex: 'phone'
        },{
          title: '工作单位',
          dataIndex: 'workCompany'
        },{
          title: '职称',
          dataIndex: 'jobTitleName'
        },{
          title: '省级认定',
          dataIndex: 'provinceConfirm'
        },{
          title: '部级认定',
          dataIndex: 'unitConfirm'
        },{
          title: '用户状态',
          dataIndex: 'status',
          scopedSlots: {
            customRender: 'status'
          }
        },{
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
      this.getLists()
      this.getJobLists()
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
