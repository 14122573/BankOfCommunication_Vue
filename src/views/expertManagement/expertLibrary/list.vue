<template>
	<div class="layoutMargin layoutPadding">
		<a-form :form="searchForm">
			<a-row type="flex" justify="space-between">
				<a-col span="6">
					<a-form-item label="姓名：" v-bind="colSpe">
						<a-input v-decorator="['name']" placeholder="请输入"></a-input>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="账号：" v-bind="colSpe">
						<a-input v-decorator="['phone']" placeholder="请输入"></a-input>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="所属系统：" v-bind="colSpe">
						<a-select v-decorator="['sysId']" placeholder="请选择" :options="options.sysList" allowClear></a-select>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="职称：" v-bind="colSpe">
						<a-select v-decorator="['jobId']" placeholder="请选择" :options="options.jobList" allowClear></a-select>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="用户状态：" v-bind="colSpe">
						<a-checkbox-group v-decorator="['userStatus']" :options="options.statusList"></a-checkbox-group>
					</a-form-item>
				</a-col>
				<a-col span="12">
					<a-form-item label="级别认定：" :label-col="{span:4}" :wrapper-col="{span:12}">
						<a-checkbox-group v-decorator="['userStatus']" :options="options.proList"></a-checkbox-group>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-row type="flex" justify="end">
						<a-col>
							<a-button type="primary" @click="reset" ghost>重置</a-button>
							<a-button type="primary" @click="search">搜索</a-button>
						</a-col>
					</a-row>
				</a-col>
			</a-row>
		</a-form>
		<a-row class="portalTableOperates">
			<a-button type="primary" @click="add">新增</a-button>
			<a-button type="primary" @click="upload">导入</a-button>
		</a-row>
		<a-table class="portalTable" size="small" :dataSource="dataSource" rowKey="name" :pagination="pagination" :columns="columns">
			<span slot="status" slot-scope="text, record">
				<userStatus :status="record.status" />
			</span>
			<span slot="action" slot-scope="text, record">
				<a @click="$router.push({name:'/expertManagement/expertLibrary/view',query:{id:record.id}})">查看</a>
				<a-divider type="vertical" />
				<a @click="editBtn(record)">修改</a>
				<a-divider type="vertical" />
				<a-dropdown>
					<span class="actionBtn">
						更多
						<a-icon type="down" />
					</span>
					<a-menu slot="overlay" @click='(event)=>{showOpeations(event.key,record)}'>
						<a-menu-item key="2">
							重置密码
						</a-menu-item>
						<a-menu-item key="1">
							启用
						</a-menu-item>
						<a-menu-item key="3">
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
      dataSource: [{
        name: '1111',
        phone: '222',
        dept: '212121',
        status: '1'
      }, {
        name: '222',
        phone: '222',
        dept: '212121',
        status: '1'
      }, {
        name: '333',
        phone: '222',
        dept: '212121',
        status: '1'
      }, {
        name: '444',
        phone: '222',
        dept: '212121',
        status: '1'
      }, {
        name: '5555',
        phone: '222',
        dept: '212121',
        status: '1'
      }],
      columns: [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '账号',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '工作单位',
        dataIndex: 'dept',
        key: 'dept'
      },
      {
        title: '所属系统',
        dataIndex: 'sysId',
        key: 'sysId'
      },
      {
        title: '职称',
        dataIndex: 'job',
        key: 'job'
      },
      {
        title: '省级认定',
        dataIndex: 'isPro',
        key: 'isPro'
      },
      {
        title: '部级认定',
        dataIndex: 'isLev',
        key: 'isLev'
      },
      {
        title: '用户状态',
        dataIndex: 'userStatus',
        key: 'userStatus',
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
  methods: {
    // 查询
    search() {

    },
    // 重置
    reset() {

    },
    // 新增
    add() {},
    // 导入
    upload() {
      this.$router.push({
        name: '/expertManagement/talent/upload',
      })
    },
    viewBtn(item) {},
    editBtn(item) {},
    showOpeations(key, item) {
      switch (key) {
      case '1':
        break
      case '2':
        this.resetPwdShow = true
        this.opeationItem = item
        break
      case '3':
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
