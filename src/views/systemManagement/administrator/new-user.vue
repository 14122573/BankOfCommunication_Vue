<template>
	<div>
		<a-form :form="searchForm">
			<a-row type="flex" justify="space-between">
				<a-col span="6">
					<a-form-item label="姓名：" v-bind="colSpe">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="账号：" v-bind="colSpe">
						<a-input placeholder="请输入" v-model="searchForm.phone" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="角色名称" v-bind="colSpe">
						<a-select placeholder="请选择" :options="roleList" v-model="searchForm['ui.roleId_l']" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="组织机构：" v-bind="colSpe">
						<a-tree-select showSearch :treeData="treeData" v-model="searchForm['ui.groupId']" :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
						 placeholder='请选择' allowClear treeDefaultExpandAll @change="onChange">
						</a-tree-select>
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="行政区域：" v-bind="colSpe">
						<a-input placeholder="请输入" v-model="searchForm['ui.areaId']" />
					</a-form-item>
				</a-col>
				<a-col span="12">
					<a-form-item label="用户状态：" :label-col="{span:4}" :wrapper-col="{span:16}">
						<a-checkbox-group :options="plainOptions" v-model="searchForm['status']" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-row type="flex" justify="end">
						<a-col>
							<a-button type="primary" ghost @click="reset" html-type="submit">重置</a-button>
							<a-button type="primary" @click="search" html-type="submit">搜索</a-button>
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
		<a-table :columns="columns" :dataSource="dataTable" rowKey='id' :pagination='false'>
			<!-- 查看 v-if="$permission('P03301')" P03301  权限分配P03102  重置密码P03306  禁用P03305 注销P03307   新增P03303-->
			<span slot="action" slot-scope="text, record">
				<a href="javascript:;" @click="viewBtn(record)">查看</a>
				<a-divider type="vertical" />
				<a href="javascript:;" @click="$router.push({name: '/systemManagement/administrator/editNewUser'})">修改</a>
				<a-divider type="vertical" />
				<a-dropdown>
					<a class="ant-dropdown-link" href="#">
						更多
						<a-icon type="down" />
					</a>
					<a-menu slot="overlay" @click='showOpeations'>
						<a-menu-item key="2">
							禁用
						</a-menu-item>
						<a-menu-item key="1">
							启用
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
			<span slot="group" slot-scope="text, record">
				{{record.group.groupName}}
			</span>
			<span slot="area" slot-scope="text, record">
				{{record.area.areaName}}
			</span>
			<span slot="status" slot-scope="text, record">
				{{record.status}}
			</span>
		</a-table>
		<a-row type="flex" justify="end" class='opeationTable'>
			<a-col>
				<a-pagination showQuickJumper :current="params.pageNo" :total="total" @change="pageChange" />
			</a-col>
		</a-row>
		<a-modal :title="opeationTitle" :centered='true' :width="465" :bodyStyle="{'text-align':'center'}" :visible="visibleModal"
		 :closable='false' :maskClosable='false'>
			<template slot="footer">
				<a-button @click="handleCancle" ghost type="primary">取消</a-button>
				<a-button @click="handleOk" type="primary">确认</a-button>
			</template>
			<p v-html="tips"></p>
		</a-modal>
	</div>
</template>
<script>
	export default {
		name: 'new-user',
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
				dateFormat: 'YYYY-MM-DD',
				colSpe: {
					labelCol: {
						span: 8
					},
					wrapperCol: {
						span: 16
					},
				},
				params: {
					pageNo: 1,
					pageSize: 10,
					'ui.createTime_desc': 1,
					// status: 1
				},
				searchForm: {
					status: []
				},
				total: 0,
				dataTable: [],
				columns: [{
						title: '姓名',
						dataIndex: 'name',
						key: 'name'
					},
					{
						title: '账号',
						dataIndex: 'phone',
						key: 'phone',
					},
					{
						title: '角色名称',
						dataIndex: 'roleNames',
						key: 'roleNames'
					},
					{
						title: '所属组织机构',
						dataIndex: 'group',
						key: 'group',
						scopedSlots: {
							customRender: 'group'
						}
					},
					{
						title: '所属行政区域',
						dataIndex: 'area',
						key: 'area',
						scopedSlots: {
							customRender: 'area'
						}
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
						key: 'operation',
						fixed: 'right',
						width: 250,
						scopedSlots: {
							customRender: 'action'
						}
					}
				],
				plainOptions: ['正常', '禁用', '已冻结', '已注销'],
				opeationTitle: '',
				visibleModal: false,
				tips: '',
				opeationType: '',
				treeData: [{
					title: 'Node1',
					value: '0-0',
					key: '0-0',
					children: [{
						title: 'Child Node1',
						value: '0-0-0',
						key: '0-0-0',
					}],
				}, {
					title: 'Node2',
					value: '0-1',
					key: '0-1',
					children: [{
						title: 'Child Node3',
						value: '0-1-0',
						key: '0-1-0',
						disabled: true,
					}, {
						title: 'Child Node4',
						value: '0-1-1',
						key: '0-1-1',
					}, {
						title: 'Child Node5',
						value: '0-1-2',
						key: '0-1-2',
					}],
				}]
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			pageChange(current) {
				this.params.pageNo = current
				this.getList()
			},
			// 查询按钮
			search() {
				this.params.pageNo = 1
				this.getList()
			},
			// 重置按钮
			reset() {
				this.params.pageNo = 1
				this.getList()
			},
			// 查询列表
			getList() {
				const params = Object.assign(this.searchForm, this.params)
				this.$ajax.get({
					url: this.$api.USER_LIST_TYPE_GET.replace('{type}', 'new'),
					params: params
				}).then(res => {
					console.log(res, '-=-=')
					this.dataTable = res.data.content
					this.total = res.data.totalRows
				})
			},
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
						this.tips = '<p>启用后，该账号将被允许登录平台，</p><p>您确认要启用该账号吗?</p>'
						break
					case '2':
						this.opeationTitle = '禁用'
						this.tips = '<p>禁用后，该账号将不被允许登录平台直到再次启用，</p><p>您确定要禁用吗？</p>'
						break
					case '3':
						this.opeationTitle = '注销'
						this.tips = '<p>注销后，该账号将被使用，</p><p>您确认要注销该账号吗？</p>'
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
			},
			onChange() {

			}
		}
	}
</script>
<style scoped>
	.opeationTable {
		margin: 10px 0;
	}
</style>
