<template>
<div class="routerWapper">
	<div v-if="$route.name == '/expertManagement/expertLibrary'" class="layoutMargin layoutPadding">
		<a-form :form="searchForm" class="protalForm">
			<a-row type="flex" justify="space-between" class="formItemLine">
				<a-col span="6">
					<a-form-item label="姓名：" class="formItem" v-bind="colSpe">
						<a-input v-decorator="['name_l']" placeholder="请输入"></a-input>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="联系电话：" class="formItem" v-bind="colSpe">
						<a-input v-decorator="['phone_l']" placeholder="请输入"></a-input>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="职称：" class="formItem" v-bind="colSpe">
						<a-select v-decorator="['jobTitle']" placeholder="请选择" allowClear>
							<a-select-option v-for="(item,index) in options.jobList" :key="index" :value="item.id">{{item.name}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="用户状态：" class="formItem" v-bind="colSpe">
						<a-checkbox-group v-decorator="['status']" :options="options.statusList"></a-checkbox-group>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="space-between" class="formItemLine">
				<a-col span="18">
					<a-form-item label="级别认定：" class="formItem" :label-col="{span:3}" :wrapper-col="{span:12}">
						<a-checkbox-group v-decorator="['proStatus']" :options="options.proList"></a-checkbox-group>
					</a-form-item>
				</a-col>
				<a-col span="6" class="algin-right">
					<a-button type="primary" @click="reset" ghost>重置</a-button>
					<a-button type="primary" @click="search">搜索</a-button>
				</a-col>
			</a-row>
		</a-form>
		<p class="gayLine"></p>
		<a-row class="portalTableOperates">
			<a-button type="primary" icon='plus' @click="addExpertUser=true">新增</a-button>
			<a-button icon='download' @click="$router.push({name: '/expertManagement/talent/upload'})">导入</a-button>
		</a-row>
		<a-table class="portalTable" size="small" :dataSource="dataSource" rowKey="id" :pagination="pagination" :columns="columns">
			<span slot="status" slot-scope="text, record">
				<userStatus :status="record.status" />
			</span>
			<span slot="action" slot-scope="text, record">
				<a @click="$router.push({name:'/expertManagement/expertLibrary/view',query:{id:record.expertId}})">查看</a>
				<a-divider type="vertical" />
				<a @click="editBtn(record)">修改</a>
			</span>
		</a-table>
		<a-modal :maskClosable="false"  okText="确认" @ok="handleJump" @cancel="addExpertUser=false" :width="480" title="新增专家用户"
		 :visible="addExpertUser">
			<a-row type="flex" justify="space-around">
				<a-col span="11">
					<div @click="chooseIndex=1" :class='{"active":chooseIndex==1}'>
						<a-row type="flex" align="middle" class='block'>
							<a-col span='8' class="algin-right"><img src="@/assets/images/head1.png" alt=""></a-col>
							<a-col span='16'>
								<div>将已有的账户中心用户<br />添加为专家用户</div>
							</a-col>
						</a-row>
					</div>
				</a-col>
				<a-col span="11">
					<div @click="chooseIndex=2" :class='{"active":chooseIndex==2}'>
						<a-row type="flex" align="middle" class='block' >
							<a-col span='8' class="algin-right"><img src="@/assets/images/head2.png" alt=""></a-col>
							<a-col span='16'>
								<div>直接新增专家用户</div>
							</a-col>
						</a-row>
					</div>
				</a-col>
			</a-row>
		</a-modal>
	</div>
  <RouterWapper v-else></RouterWapper>
</div>
</template>
<script>
import userStatus from '../../systemManagement/components/user-status'
import testStrong from '@/components/testPwd'
import ResetModal from '../components/resetPassword'
import {
  encryptDes
} from '@/util/des-cryptojs'
export default {
  name: 'Talent',
  components: {
    userStatus,
    testStrong,
    ResetModal
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
          value: '1'
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
        title: '账号',
        dataIndex: 'loginPhone'
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
      allTotal: 0,
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
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
    this.getLists()
    this.getJobLists()
  },
  methods: {
    getLists() {
      const options = this.$com.dealObjectValue(this.searchForm.getFieldsValue())
      if (options.status) options.status = options.status.join(',')
      if (options.proStatus && options.proStatus.length > 1) {
        options.provinceConfirm = '是'
        options.unitConfirm = '是'
      } else {
        if (options.proStatus) {
          if (options.proStatus[0] === '0') {
            options.unitConfirm = '是'
            options.provinceConfirm = '否'
          } else {
            options.unitConfirm = '否'
            options.provinceConfirm = '是'
          }
        } else {
          options.provinceConfirm = '否'
          options.unitConfirm = '否'
        }
      }
      delete options.proStatus
      const params = Object.assign(options, {
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.pageNo
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
      this.getLists()
    },
    // 重置
    reset() {
      this.searchForm.setFieldsValue({
        jobTitle: undefined,
        loginPhone_l: undefined,
        name_l: undefined,
        proStatus: [],
        status: []
      })
      this.getLists()
    },
    handleJump() {
      if(this.chooseIndex==1){
        //转换
        this.$router.push({
          name:'/expertManagement/expertLibrary/select'
        })
      }else{
        //直接新增
        this.$router.push({
          name:'/expertManagement/expertLibrary/create'
        })
      }
    },
    editBtn(item){
      this.$router.push({
        name:'/expertManagement/expertLibrary/edit',
        query:{
          id:item.expertId
        }
      })
    },
    handleCancel() {},
    getJobLists() {
      this.$ajax.get({
        url: this.$api.DICTIONARY_TYPE_GET.replace('{type}', '3')
      }).then(res => {
        this.options.jobList = this.$com.confirm(res, 'data.content', [])
      })
    },
    onChange(val) {
      this.pagination.pageNo = val
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
