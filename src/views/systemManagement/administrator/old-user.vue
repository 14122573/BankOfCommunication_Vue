<template>
	<div class="old-user">
		<a-form class="protalForm" :form="searchForm">
			<a-row class="formItemLine" :gutter="8" type="flex" justify="space-between">
				<a-col span="6">
					<a-form-item class="formItem" label="账号" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.username_l" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item class="formItem" label="所属老系统" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-select placeholder="请选择" v-model="searchForm.sysDicId" :options="systemList" allowClear />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item class="formItem" label="用户状态" :label-col="{span:6}" :wrapper-col="{span:18}">
						<a-checkbox-group v-model="searchForm.checkedList">
							<a-checkbox :value="item.value" v-for="(item,index) in plainOptions" :key="index">{{item.text}}</a-checkbox>
						</a-checkbox-group>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row class="formItemLine" type="flex" justify="end">
				<a-col class="algin-right">
					<a-button @click="reset">重置</a-button>
					<a-button type="primary" @click="search">搜索</a-button>
				</a-col>
			</a-row>
		</a-form>
		<p class="gayLine noline "></p>
		<a-table class="portalTable" size='small' :columns="columns" :pagination="pagination" rowKey="id" :dataSource="data">
			<span slot="sysDic" slot-scope="text,record">
				{{record.sysDic.sysName || '暂无'}}
			</span>
			<!-- phone -->
			<span slot="phone" slot-scope="text,record">
				{{record.phone || '暂无'}}
			</span>
			<span slot="status" slot-scope="text, record">
				<userStatus :status="record.status" />
			</span>
			<span slot="action" slot-scope="text, record">
				<span class="actionBtn" v-if="record.status != '8' && $permission('P03202')" @click="resetBtn(record)">重置密码<a-divider  type="vertical" /></span>
				<span class="actionBtn" v-if="record.status == '9'  && $permission('P03201')" @click="viewModal('0',record,'1')">启用<a-divider  type="vertical" /></span>
				<span class="actionBtn" v-if="record.status == '1'  && $permission('P03201')" @click="viewModal('1',record,'9')">禁用	<a-divider type="vertical" /></span>
				<span class="actionBtn" v-if="record.status != '8'  && $permission('P03203')" @click="viewModal('2',record,'8')">注销</span>
			</span>
		</a-table>
		<!-- 重置密码表单 -->
		<a-modal :maskClosable="false" cancelText="取消" okText="确认" @ok="handleResetOk" @cancel="hadnleCancel" :width="465"
		 title="重置密码" :visible="resetPwdShow">
			<a-form :form="resetData">
				<a-row>
					<a-col span="24">
						<a-form-item label="新密码" :label-col="{span:6}" :wrapper-col="{span:16}">
							<a-input :type="pswType" @focus='pasBlur' placeholder="新密码需大于6位且含字母和数字" autocomplete="off" v-decorator="['newPwd',
                    { validateTrigger:'blur',rules: [{ required: true, validator: validateToNextPassword }] }
                  ]">
							</a-input>
						</a-form-item>
					</a-col>
					<a-col offset='6' span="16">
						<testStrong id="strong" :width="90" :pwd='resetData.getFieldValue("newPwd")' v-show='passwordStrength'></testStrong>
					</a-col>
					<a-col span="24">
						<a-form-item label="重复密码" :label-col="{span:6}" :wrapper-col="{span:16}">
							<a-input :type="pswType" placeholder="再次输入新密码" @blur="handleConfirmBlur" autocomplete="off" @focus='pasBlur'
							 v-decorator="[ 'rePassword',
                          {validateTrigger:'blur', rules: [{ required: true,whitespace:true,  message: '请再次输入新密码!' }, { validator: compareToFirstPassword, }] }
                    ]">
							</a-input>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
	</div>
</template>
<script>
import {
  encryptDes
} from '@/util/des-cryptojs'
import userStatus from '@/views/systemManagement/components/user-status'
import testStrong from '@/components/testPwd'
export default {
  name: 'old-user',
  components: {
    userStatus,
    testStrong
  },
  props: {
    roleList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      searchForm: {
        checkedList: ['1']
      },
      dateFormat: 'YYYY-MM-DD',
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
      params: {
        'ui.createTime_desc': 1
      },
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current:1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onChange
      },
      data: [],
      columns: [{
        title: '账号',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '所属老系统',
        dataIndex: 'sysDic',
        key: 'sysDic',
        scopedSlots: {
          customRender: 'sysDic'
        }
      },
      {
        title: '关联手机号',
        dataIndex: 'phone',
        key: 'phone',
        scopedSlots: {
          customRender: 'phone'
        }
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        scopedSlots: {
          customRender: 'status'
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        scopedSlots: {
          customRender: 'action'
        }
      }
      ],
      plainOptions: [{
        text: '正常',
        value: '1'
      },
      {
        text: '禁用',
        value: '9'
      },
      {
        text: '已注销',
        value: '8'
      }
      ],
      modal: {
        show: false
      },
      modalData: {},
      modalStatus: '0', //1-正常  8-注销 9-禁用
      //   重置密码
      resetPwdShow: false,
      resetData: this.$form.createForm(this),
      pswType: 'text',
      passwordStrength: false,
      systemList: [],
      resetId: null,
      confirmDirty: false,
    }
  },
  methods: {
    //   查询系统列表
    getSystemList() {
      this.$ajax.get({
        url: this.$api.SYSTEM_LIST_ALL_GET
      }).then(res => {
        if (res.code === '200') {
          let data = this.$com.confirm(res, 'data.content', [])
          this.systemList = data.map((item) => {
            return {
              label: item.sysName,
              value: item.id
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    pasBlur() {
      this.pswType = 'password'
    },
    //密码重复密码校验
    validateToNextPassword(rule, value, callback) {
      const form = this.resetData
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入新密码！')
        this.passwordStrength = false
      } else {
        if (!this.$com.checkPassword(value)) {
          callback('请输入6位以上的数字字母组合！')
          this.passwordStrength = false
        } else {
          if (value && this.confirmDirty) {
            form.validateFields(['rePassword'], {
              force: true
            })
          }
          callback()
          this.passwordStrength = true
        }
      }
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.resetData
      if (value && value !== form.getFieldValue('newPwd')) {
        callback('密码输入不一致!')
      } else {
        callback()
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    // 查询按钮
    search() {
      this.pagination.pageNo = 1
      this.pagination.current = 1
      this.getList()
    },
    // 重置按钮
    reset() {
      delete this.searchForm.username_l
      delete this.searchForm.sysDicId
      this.searchForm.checkedList = ['1']
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
      if (searchParams.checkedList.length > 0) {
        searchParams['oa.status_in'] = searchParams.checkedList.join(',')
      } else {
        searchParams['oa.status_in'] = '1'
      }
      if (searchParams.checkedList) delete searchParams.checkedList
      this.$ajax.get({
        url: this.$api.USER_LIST_TYPE_GET.replace('{type}', 'old'),
        params: Object.assign(searchParams, this.params,{
          pageSize:this.pagination.pageSize,
          pageNo:this.pagination.pageNo
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
          this.$route.name+'/old',
          this.params,
          this.searchForm
        )
      })
    },
    // 重置密码按钮
    resetBtn(item) {
      this.resetId = item.id
      this.resetPwdShow = true
    },
    // 操作按钮
    viewModal(key, item, checkStatus) {
      switch (key) {
      case '0':
        this.modal.title = '启用'
        this.modal.content = '启用后，该账号将被允许登录平台'
        this.modal.tips = '您确认要启用该账号吗？'
        break
      case '1':
        this.modal.title = '禁用'
        this.modal.content = '禁用后，该账号将不被允许登录平台直到再次启用'
        this.modal.tips = '您确认要禁用该账号吗？'
        break
      case '2':
        this.modal.title = '注销'
        this.modal.content = '注销后，该账号将不被使用'
        this.modal.tips = '您确认要注销该账号吗？'
        break
      case '3':
        this.modal.title = '解冻'
        this.modal.content = '解冻后，该账号将可以重新登录'
        this.modal.tips = '您确认要解冻该账号吗？'
        break
      default:
        break
      }
      this.modal.key = key
      this.modalData = item
      this.checkStatus = checkStatus
      let vm = this
      this.$modal.confirm({
        title: this.modal.content,
        content: this.modal.tips,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          vm.handleOk()
        }
      })
      // this.modal.show = true
    },
    // 确定操作
    handleOk() {
      this.$ajax.put({
        url: this.$api.CHECK_USER_STATUS.replace('{id}', this.modalData.id).replace('{status}', this.checkStatus).replace(
          '{type}', 'old')
      }).then(res => {
        if (res.code === '200') {
          this.$message.success(this.modal.title + '成功！')
          this.getList()
        }
      })
    },
    // 确认重置
    handleResetOk() {
      this.resetData.validateFields(err => {
        if (!err) {
          this.$ajax.put({
            url: this.$api.USER_UPDATE_PWD,
            params: {
              id: this.resetId,
              type: 'old',
              newPwd: encryptDes(this.resetData.getFieldValue('newPwd'))
            }
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('重置密码成功')
              this.hadnleCancel()
              this.getList()
            }
          })
        }else{
          this.$com.getFormValidErrTips(this,err)
        }
      })
    },
    // 取消重置密码
    hadnleCancel() {
      this.resetPwdShow = false
      this.passwordStrength = false
      this.resetData.resetFields()
    },
    /**
     * 从vuex中或已存储的搜索条件，判断此条件是否为当前路由的 。如果是则使用
     */
    getSearchParams(){
      let searchParams = !this.$store.state.listSearchParams?null:this.$store.state.listSearchParams[this.$route.name+'/old']
      if(!!searchParams && !!searchParams.routeName && (this.$route.name+'/old' == searchParams.routeName)){
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
      this.getSystemList()
      this.getSearchParams()
    }
  }
}
</script>
<style scoped>
	.ant-badge-status-dot {
		width: 9px 9px;
	}

	.page-row {
		margin-top: 20px;
	}

	.center-p {
		text-align: center;
	}
</style>
