<template>
	<div>
		<a-form :form="searchForm">
			<a-row type="flex" justify="space-between">
				<a-col span="6">
					<a-form-item label="姓名：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="账号：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="角色名称" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="组织机构：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="行政区域：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="12">
					<a-form-item label="角色状态：" :label-col="{span:5}" :wrapper-col="wrapperCol">
						<a-checkbox-group :options="plainOptions" v-model="checkedList" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-row type="flex" justify="end">
						<a-col>
							<a-button type="primary" ghost>重置</a-button>
							<a-button type="primary">搜索</a-button>
						</a-col>
					</a-row>
				</a-col>
			</a-row>
		</a-form>
		<a-row type="flex" justify="start" class='opeationTable'>
			<a-col>
				<a-button type="primary" @click='handleAdd'>新增</a-button>
			</a-col>
		</a-row>
		<a-table :columns="columns" :dataSource="data" rowKey='name' :pagination='false'>
			<!-- 查看 v-if="$permission('P03301')" P03301  权限分配P03102  重置密码P03306  禁用P03305 注销P03307   新增P03303-->
			<span slot="action" slot-scope="text, record">
				<a href="javascript:;" @click="viewBtn(record)">查看</a>
				<a-divider type="vertical" />
				<a href="javascript:;">权限分配</a>
				<a-divider type="vertical" />
				<a-dropdown>
					<a class="ant-dropdown-link" href="#">
						更多
						<a-icon type="down" />
					</a>
					<a-menu slot="overlay" @click='showOpeations'>
						<a-menu-item key="5">
							<a>修改</a>
						</a-menu-item>
						<a-menu-item key="2">
								<a>禁用</a>
						</a-menu-item>
						<a-menu-item key="1">
							<a>启用</a>
						</a-menu-item>
						<a-menu-item key="3">
							注销
						</a-menu-item>
						<a-menu-item key="4">
							解冻
						</a-menu-item>
					</a-menu>
				</a-dropdown>
			</span>
		</a-table>
		<a-row type="flex" justify="end" class='opeationTable'>
			<a-col>
				<a-pagination showQuickJumper :defaultCurrent="1" :total="total" @change="pageChange" />
			</a-col>
		</a-row>
		<a-modal :title="opeationTitle" :centered='true' :bodyStyle="{'text-align':'center'}" :visible="visibleModal" :closable='false'
		 :maskClosable='false'>
			<template slot="footer">
				<a-button @click="handleCancle" ghost type="primary">取消</a-button>
				<a-button @click="handleOk" type="primary">确认</a-button>
			</template>
			<p>{{tips}}</p>
		</a-modal>
	</div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
      dateFormat: 'YYYY-MM-DD',
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 14
      },
      data: [{
        name: 'qwqwq',
        name1: 'qwqwq',
        name2: 'qwqwq',
      }],
      columns: [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '账号',
        dataIndex: 'name1',
        key: 'name1'
      },
      {
        title: '角色管理',
        dataIndex: 'name2',
        key: 'name2'
      },
      {
        title: '所属组织机构',
        dataIndex: 'name3',
        key: 'name3'
      },
      {
        title: '所属行政区域',
        dataIndex: 'name4',
        key: 'name4'
      },
      {
        title: '用户状态',
        dataIndex: 'name5',
        key: 'name5'
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 250,
        scopedSlots: {
          customRender: 'action'
        }
      }
      ],
      plainOptions: ['正常', '禁用', '已冻结', '已注销'],
      checkedList: ['正常'],
      total: 0,
      opeationTitle: '',
      visibleModal: false,
      tips: '',
      opeationType: ''
    }
  },
  methods: {
    onDateChange(date, dateString) {
      console.log(date, dateString, this.searchForm.time)
    },
    pageChange() {},
    handleAdd() {
      this.$router.push({
        name: '/systemManagement/administrator/createNewUser'
      })
    },
    viewBtn() {
      this.$router.push({
        name: '/systemManagement/administrator/newUserView'
      })
    },
    handleCancle() {
      this.visibleModal = false
    },
    showOpeations({
      key
    }) {
      switch (key) {
      case '1':
        this.opeationTitle = '启用'
        this.tips = '启用后，该账号将被允许登录平台，您确认要启用该账号吗?'
        break
      case '2':
        this.opeationTitle = '禁用'
        this.tips = '禁用后，该账号将不被允许登录平台直到再次启用，您确定要禁用吗？'
        break
      case '3':
        this.opeationTitle = '注销'
        this.tips = '注销后，该账号将被使用，您确认要注销该账号吗?'
        break
      case '4':
        this.opeationTitle = '解冻'
        this.tips = '解冻后，该账号将可以重新登录，您确定要解冻该账号吗?'
        break
      case '5':
        this.$router.push({
          name: '/systemManagement/administrator/editNewUser'
        })
        return
        break
      default:
        break
      }
      this.opeationType = key
      this.visibleModal = true
    },
    handleOk() {
      switch (key) {
      case '1':
        //启用操作

        break
      case '2':
        //禁用操作

        break
      case '3':
        //注销操作

        break
      case '4':
        //解冻操作

        break
      default:
        break
      }
      this.visibleModal = false
    }
  }
}
</script>
<style scoped>
	.opeationTable {
		margin: 10px 0;
	}
</style>
