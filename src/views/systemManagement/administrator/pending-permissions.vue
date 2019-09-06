<template>
	<div>
		<a-form class="protalForm" :form="searchForm">
			<a-row class="formItemLine" type="flex" justify="space-between" align='middle'>
				<a-col span="6">
					<a-form-item class="formItem" label="姓名" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name_l" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item class="formItem" label="账号" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm['ui.phone_l']" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="邮箱" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.mail_l" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="单位" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.dept_l" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row class="formItemLine" type="flex" justify="space-between" align='middle'>
				<a-col span="12">
					<a-form-item label="注册时间段" :label-col="{span:4}" :wrapper-col="{span:20}">
						<a-range-picker allowClear v-model="time" :format="dateFormat" style="width:100%" :placeholder="['请选择开始日期','请选择结束日期']"
						 @change="onDateChange" />
					</a-form-item>
				</a-col>
				<a-col>
					<a-button @click="reset">重置</a-button>
					<a-button type="primary" @click="search">搜索</a-button>
				</a-col>
			</a-row>
		</a-form>
		<p class="gayLine noline"></p>
		<a-table class="portalTable" size="small" row-key="id" :pagination="pagination" :columns="columns" :dataSource="data">
			<span slot="createTimeTitle">
				<span>注册时间</span>
				<!-- <a-icon type="align-left" /><a-icon type="arrow-up" /> -->
			</span>
			<!-- createTime -->
			<span slot="createTime" slot-scope="text, record">
				{{$com.strTime(record.createTime)}}
			</span>
		  <span slot="action" slot-scope="text, record">
        <span class="actionBtn" v-if="permission('P03101')" @click="viewBtn(record)">查看</span>
        <a-divider v-if="permission('P03101')" type="vertical" />
        <span v-if="permission('P03102')" class="actionBtn" @click="distributionBtn(record)">权限分配</span>
      </span>
		</a-table>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				searchForm: {},
				dateFormat: 'YYYY-MM-DD',
				labelCol: {
					span: 8
				},
				wrapperCol: {
					span: 16
				},
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
				columns: [{
						title: '姓名',
						dataIndex: 'name',
						key: 'name'
					},
					{
						title: '账号',
						width: 240,
						dataIndex: 'phone',
						key: 'phone'
					},
					{
						title: '邮箱',
						dataIndex: 'mail',
						key: 'mail'
					},
					{
						title: '单位',
						dataIndex: 'dept',
						key: 'dept'
					},
					{
						//   title:'注册时间',
						dataIndex: 'createTime',
						key: 'createTime',
						width: 240,
						slots: {
							title: 'createTimeTitle'
						},
						scopedSlots: {
							customRender: 'createTime'
						}
					},
					{
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
		methods: {
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
				this.pagination.pageNo = current;
				this.pagination.current = current;
				this.getList()
			},
			// 查询列表
			getList() {
				let searchParams = JSON.parse(JSON.stringify(this.searchForm))
				if (searchParams.createTime_desc) {
					searchParams['ui.createTime_lt'] = searchParams.createTime_desc[0]
					searchParams['ui.createTime_gt'] = searchParams.createTime_desc[1]
					delete searchParams.createTime_desc
				}
				// if (params.createTime_desc) params.createTime_desc=params.createTime_desc.join(',');
				this.$ajax
					.get({
						url: this.$api.USER_LIST_TYPE_GET.replace('{type}', 'new'),
						params: Object.assign(searchParams, this.params, {
							pageSize: this.pagination.pageSize,
							pageNo: this.pagination.pageNo
						})
					})
					.then(res => {
						if (res.code === '200') {
							this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0);
							this.data = this.$com.confirm(res, 'data.content', [])
						} else {
							this.$message.error(res.msg)
						}
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
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>
<style scoped>
	.page-row {
		margin-top: 20px;
	}
</style>
