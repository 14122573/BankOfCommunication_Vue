<template>
	<div class="layoutMargin layoutPadding">
		<a-form :form="searchForm" class="protalForm">
			<a-row type="flex" justify="space-between" class="formItemLine">
				<a-col span="6">
					<a-form-item label="姓名：" class="formItem" v-bind="colSpe">
						<a-input v-decorator="['name']" placeholder="请输入"></a-input>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="账号：" class="formItem" v-bind="colSpe">
						<a-input v-decorator="['loginPhone']" placeholder="请输入"></a-input>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="职称：" class="formItem" v-bind="colSpe">
						<a-select v-decorator="['jobTitleName']" placeholder="请选择" :options="options.jobList" allowClear></a-select>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="用户状态：" class="formItem" v-bind="colSpe">
						<a-checkbox-group v-decorator="['userStatus']" :options="options.statusList"></a-checkbox-group>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="space-between" class="formItemLine">
				<a-col span="18">
					<a-form-item label="级别认定：" class="formItem" :label-col="{span:3}" :wrapper-col="{span:12}">
						<a-checkbox-group v-decorator="['userStatus']" :options="options.proList"></a-checkbox-group>
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
			<a-button type="primary" icon='plus' @click="add">新增</a-button>
			<a-button icon='download' @click="upload">导入</a-button>
		</a-row>
		<a-table class="portalTable" size="small" :dataSource="dataSource" rowKey="id" :pagination="pagination" :columns="columns">
			<span slot="status" slot-scope="text, record">
				<userStatus :status="record.status" />
			</span>
			<span slot="action" slot-scope="text, record">
				<a @click="$router.push({name:'/expertManagement/expertLibrary/view',query:{id:record.expertId}})">查看</a>
				<a-divider type="vertical" />
				<a @click="editBtn(record)">修改</a>
				<a-divider type="vertical" />
				<a-dropdown>
					<span class="actionBtn">
						更多
						<a-icon type="down" />
					</span>
					<a-menu slot="overlay" @click='(event)=>{showOpeations(event.key,record)}'>
						<a-menu-item key="1">
							重置密码
						</a-menu-item>
						<a-menu-item key="2">
							注销
						</a-menu-item>
					</a-menu>
				</a-dropdown>
			</span>
		</a-table>
		<ResetModal :resetPwdShow="resetPwdShow" @on-ok="handleSave" @on-cancel="handleCancel" ref="reset"></ResetModal>
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
      },
      colSpe: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        }
      },
      params: {},
      dataSource: [],
      columns: [{
        title: '姓名',
        dataIndex: 'name',
        key: 'id'
      },
      {
        title: '账号',
        dataIndex: 'loginPhone',
        key: 'id'
      },
      {
        title: '工作单位',
        dataIndex: 'workCompany',
        key: 'id'
      },
      {
        title: '职称',
        dataIndex: 'jobTitleName',
        key: 'id'
      },
      {
        title: '省级认定',
        dataIndex: 'provinceConfirm',
        key: 'id'
      },
      {
        title: '部级认定',
        dataIndex: 'unitConfirm',
        key: 'id'
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: {
          customRender: 'status'
        }
      },
      {
        title: '操作',
        width: 200,
        dataIndex: 'action',
        key: 'action',
        scopedSlots: {
          customRender: 'action'
        }
      }
      ],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        defaultCurrent: 1,
        showQuickJumper: true
      },
      resetPwdShow: false,
      opeationItem: {}
    }
  },
  mounted() {
    this.getLists()
  },
  methods: {
    getLists() {
      this.$ajax.get({
        url: this.$api.GET_EXPERT_LIST
      }).then(res => {
        this.dataSource = this.$com.confirm(res, 'data.content',[])
      })
    },
    // 查询
    search() {
				 console.log( this.formBind.getFieldsValue())
    },
    // 重置
    reset() {

    },
    // 新增
    add() {
      this.$router.push({
        name:'/expertManagement/expertLibrary/create'
      })
    },
    // 导入
    upload() {
      this.$router.push({
        name: '/expertManagement/talent/upload',
      })
    },
    viewBtn(item) {},
    editBtn(item) {
      this.$router.push({
        name:'/expertManagement/expertLibrary/edit',
        query:{
          id:item.expertId
        }
      })
    },
    showOpeations(key, item) {
      switch (key) {
      case '1':
        this.resetPwdShow = true
        this.opeationItem = item
        break
      case '2':
        let vm = this
        this.$model.confirm({
          title: '注销',
          content: '注销后，该账号将被使用，您确认要注销该账号吗？',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            vm.handleOk()
          }
        })
        break
      default:
        break
      }
    },
    handleSave(values) {
      this.$ajax.put({
        url: this.$api.USER_UPDATE_PWD,
        params: {
          id: this.opeationItem.id,
          type: 'old',
          newPwd: encryptDes(values.newPwd)
        }
      }).then(res => {
        if (res.code === '200') {
          this.$message.success('重置密码成功')
          this.resetPwdShow = false
          this.$refs.reset.resetForm()
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCancel() {
      this.resetPwdShow = false
      this.$refs.reset.resetForm()
    }
  }
}
</script>
<style scoped>

</style>
