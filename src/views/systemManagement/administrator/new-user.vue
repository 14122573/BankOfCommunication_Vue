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
				<a-col span="13" pull='3'>
					<a-form-item label="角色状态：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-checkbox-group :options="plainOptions" v-model="checkedList" />
					</a-form-item>
				</a-col>
				<a-col>
					<a-button type="primary" ghost>重置</a-button>
					<a-button type="primary">搜索</a-button>
				</a-col>
			</a-row>
		</a-form>
		<a-row type="flex" justify="start" class='opeationTable'>
			<a-col>
				<a-button type="primary" @click='handleAdd'>新增</a-button>
			</a-col>
		</a-row>
		<a-table :columns="columns" :dataSource="data" :pagination='false'>
			<span slot="action" slot-scope="text, record">
				<a href="javascript:;">查看</a>
				<a-divider type="vertical" />
				<a href="javascript:;">权限分配</a>
				<a-divider type="vertical" />
				<a-dropdown>
					<a class="ant-dropdown-link" href="#">
						更多
						<a-icon type="down" />
					</a>
					<a-menu slot="overlay">
						<a-menu-item>
							<a href="javascript:;">重置密码</a>
						</a-menu-item>
						<a-menu-item>
							<a href="javascript:;">禁用</a>
						</a-menu-item>
						<a-menu-item>
							<a href="javascript:;">注销</a>
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

	</div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
      dateFormat: 'YYYY-MM-DD',
      labelCol: {
        span: 9
      },
      wrapperCol: {
        span: 15
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

    }
  },
  methods: {
    onDateChange(date, dateString) {
      console.log(date, dateString, this.searchForm.time)
    },
    pageChange() {},
    handleAdd() {
      this.$router.push({
        name:'new-user-add'
      })
    }
  }
}
</script>
<style scoped>
	.opeationTable {
		margin: 10px 0;
	}
</style>
