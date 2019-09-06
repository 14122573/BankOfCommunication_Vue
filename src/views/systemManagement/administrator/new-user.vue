<template>
	<div>
		<a-form class="protalForm" :form="searchForm">
			<a-row type="flex" justify="space-between" class="formItemLine">
				<a-col span="6">
					<a-form-item class='formItem' label="姓名" v-bind="colSpe">
						<a-input placeholder="请输入" v-model="searchForm.name_l" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="账号" v-bind="colSpe">
						<a-input placeholder="请输入" v-model="searchForm['ui.phone_l']" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="角色名称" v-bind="colSpe">
						<a-select placeholder="请选择" :options="roleList" allowClear v-model="searchForm['ui.roleIds']" />
					</a-form-item>
				</a-col>
				<a-col span="6">
					<a-form-item label="行政区域" v-bind="colSpe">
						<a-select v-model="searchForm['ui.areaId']" v-if="isAdminator !== true" placeholder="请选择" @change="onChangeTree"
						 showSearch allowClear>
							<a-select-option v-for="(item,index) in treeData" :key="index" :value="item.id">{{item.title}}</a-select-option>
						</a-select>
						<a-tree-select v-else :treeData="treeData" :loadData="onLoadData" show-line v-model="searchForm['ui.areaId']"
						 :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }" placeholder='请选择' allowClear @change="onChangeTree">
						</a-tree-select>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="space-between" align='middle' class="formItemLine">
				<a-col span="6">
					<a-form-item label="组织机构" v-bind="colSpe">
						<a-select v-model="searchForm['ui.groupId']" placeholder='请选择'>
							<a-select-option v-for="(item,index) in groupLists" allowClear :key="index" :value="item.id">{{item.groupName}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col span="12">
					<a-form-item label="用户状态" :label-col="{span:4}" :wrapper-col="{span:16}">
						<a-checkbox-group v-model="searchForm['checkedList']">
							<a-checkbox :value="item.value" v-for="(item,index) in plainOptions" :key="index">{{item.text}}</a-checkbox>
						</a-checkbox-group>
					</a-form-item>
				</a-col>
				<a-col span="6" class="algin-right">
					<a-button @click="reset" html-type="submit">重置</a-button>
					<a-button type="primary" @click="search" html-type="submit">搜索</a-button>
				</a-col>
			</a-row>
		</a-form>
		<p class="gayLine noline"></p>
		<div class='portalTableOperates'>
			<a-button icon='plus' type="primary" @click='handleAdd'>添加账户</a-button>
		</div>
		<a-table size='small' class="portalTable" :columns="columns" :dataSource="dataTable" rowKey='id' :pagination='pagination'>
			<!-- 查看 v-if="$permission('P03301')" P03301  权限分配P03102  重置密码P03306  禁用P03305 注销P03307   新增P03303-->
			<span slot="action" slot-scope="text, record">
				<span class="actionBtn" @click="viewBtn(record)">查看</span>
				<a-divider type="vertical" v-if="record.status!=8" />
				<span class="actionBtn" v-if="record.status!=8" @click="$router.push({name: '/systemManagement/administrator/editNewUser',query:{id:record.id}})">修改</span>
				<a-divider type="vertical" />
				<a-dropdown>
					<span class="actionBtn"> 更多
						<a-icon type="down" /> </span>
					<a-menu slot="overlay" @click='(event)=>{showOpeations(event.key,record)}'>
						<a-menu-item class="actionBtn" key="2" v-if="record.status==1"> 禁用 </a-menu-item>
						<a-menu-item class="actionBtn" key="1" v-if="record.status==9"> 启用 </a-menu-item>
						<a-menu-item class="actionBtn" key="3" v-if="record.status==1||record.status==9"> 注销 </a-menu-item>
					</a-menu>
				</a-dropdown>
			</span>
			<span slot="group" slot-scope="text, record">
				{{record.group!=null?record.group.groupName: "暂无"}}
			</span>
			<span slot="area" slot-scope="text, record">
				{{record.area!=null?record.area.areaName: "暂无"}}
			</span>
			<span slot="roleNames" slot-scope="text, record">
				{{record.roleNames!=null?record.roleNames: "暂无"}}
			</span>
			<span slot="status" slot-scope="text, record">
				<userStatus :status="record.status" />
			</span>
		</a-table>
		<!-- <a-row type="flex" justify="end" class='opeationTable'>
			<a-col>
				<a-pagination showQuickJumper :current="params.pageNo" :total="total" @change="pageChange" />
			</a-col>
		</a-row> -->
	</div>
</template>
<script>
	import userStatus from '@/views/systemManagement/components/user-status'
	export default {
		name: 'new-user',
		components: {
			userStatus
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
					'ui.createTime_desc': 1,
				},
				pagination: {
					pageNo: 1,
					pageSize: 10,
					total: 0,
					current: 1,
					defaultCurrent: 1,
					showQuickJumper: true,
					onChange: this.pageChange
				},
				searchForm: {
					checkedList: ['1']
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
						key: 'phone'
					},
					{
						title: '角色名称',
						dataIndex: 'roleNames',
						key: 'roleNames',
						scopedSlots: {
							customRender: 'roleNames'
						}
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
						width: 80,
						scopedSlots: {
							customRender: 'status'
						}
					},
					{
						title: '操作',
						key: 'operation',
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
				opeation: {
					title: '',
					tips: '',
					type: '',
					item: null
				},
				treeData: [],
				isAdminator: '',
				areaCode: '',
				groupLists: []
			}
		},
		mounted() {
			this.getList()
			this.isAdminator = this.$store.state.userInfos.isAllPerm
			this.getArea()
		},
		methods: {
			pageChange(current) {
				this.pagination.current = current
				this.pagination.pageNo = current
				this.getList()
			},
			// 查询按钮
			search() {
				this.pagination.current = 1
				this.pagination.pageNo = 1
				this.getList()
			},
			// 重置按钮
			reset() {
				this.pagination.current = 1
				this.pagination.pageNo = 1
				delete this.searchForm.name_l
				delete this.searchForm['ui.phone_l']
				delete this.searchForm['ui.roleIds']
				delete this.searchForm['ui.areaId']
				delete this.searchForm['ui.groupId']
				this.searchForm.checkedList = ['1']
				this.getList()
			},
			// 查询列表
			getList() {
				let options = JSON.parse(JSON.stringify(this.searchForm))
				options['oa.status_in'] = options.checkedList && options.checkedList.length > 0 ? options.checkedList.join(',') :
					'1'
				if (options.checkedList) delete options.checkedList
				const params = Object.assign(options, this.params, {
					pageNo: this.pagination.pageNo,
					pageSize: this.pagination.pageSize
				})
				this.$ajax.get({
					url: this.$api.USER_LIST_TYPE_GET.replace('{type}', 'new'),
					params: params
				}).then(res => {
					this.dataTable = this.$com.confirm(res,"data.content",[]);
					this.pagination.total =this.$com.confirm(res,"data.totalRows",0);
				})
			},
			handleAdd() {
				this.$router.push({
					name: '/systemManagement/administrator/createNewUser'
				})
			},
			viewBtn(record) {
				this.$router.push({
					name: '/systemManagement/administrator/newUserView',
					query: {
						id: record.id
					}
				})
			},
			showOpeations(key, item) {
				this.opeation.type = key
				this.opeation.item = item
				let vm = this
				switch (key) {
					case '1':
						this.opeation.title = '您确认要启用该账号吗?'
						this.opeation.tips = '启用后，该账号将被允许登录平台'
						break
					case '2':
						this.opeation.title = '您确定要禁用吗？'
						this.opeation.tips = '禁用后，该账号将不被允许登录平台直到再次启用'
						break
					case '3':
						this.opeation.title = '您确认要注销该账号吗？'
						this.opeation.tips = '注销后，该账号将被使用'
						break
					default:
						break
				}
				this.$model.confirm({
					title: this.opeation.title,
					content: this.opeation.tips,
					okText: '确认',
					okType: 'danger',
					cancelText: '取消',
					onOk() {
						vm.handleOk()
					},
				})
			},
			handleOk() {
				let key = this.opeation.type
				let apiUrl = ''
				switch (key) {
					case '1': //启用操作
						apiUrl = this.$api.CHECK_USER_STATUS.replace('{type}', 'new').replace('{id}', this.opeation.item.id).replace(
							'{status}', '1')
						break
					case '2': //禁用操作
						apiUrl = this.$api.CHECK_USER_STATUS.replace('{type}', 'new').replace('{id}', this.opeation.item.id).replace(
							'{status}', '9')
						break
					case '3': //注销操作
						apiUrl = this.$api.CHECK_USER_STATUS.replace('{type}', 'new').replace('{id}', this.opeation.item.id).replace(
							'{status}', '8')
						break
				}
				this.$ajax.put({
					url: apiUrl
				}).then(res => {
					if (res.code == '200') {
						this.$message.success('注销成功！')
						this.getList()
					} else {
						this.$message.error('注销失败！')
					}
				})
			},
			getArea() {
				this.$ajax.get({
					url: this.$api.GET_AREA_NEXT,
					params: {
						parentId: this.isAdminator ? '999999' : this.$store.state.userInfos.area.id
					}
				}).then(res => {
					let datas = this.$com.confirm(res, 'data.content', [])
					datas.forEach((ele, index) => {
						this.treeData.push(this.getTreeNode(ele, index))
					})
				})
			},
			getTreeNode(item, index) {
				let childrenNode = {
					title: item.areaName,
					value: item.id,
					id: item.id,
					key: item.id,
					parentId: item.parentId,
					children: item.childList
				}
				return childrenNode
			},
			onLoadData(treeNode) {
				return new Promise((resolve) => {
					if (treeNode.dataRef.children) {
						resolve()
						return
					}
					this.$ajax.get({
						url: this.$api.GET_AREA_NEXT,
						params: {
							parentId: treeNode.dataRef.id
						}
					}).then(res => {
						let datas = this.$com.confirm(res, 'data.content', [])
						let array = []
						datas.forEach((ele, index) => {
							array.push(this.getTreeNode(ele, index))
						})
						treeNode.dataRef.children = array
						this.treeData = [...this.treeData]
						resolve()
					})
				})
			},
			onChangeTree(value, label, extra) {
				this.areaCode = value
				delete this.searchForm['ui.groupId']
				this.getListGroup()
			},
			getListGroup() {
				const params = {
					pageSize: 10000,
					pageNo: 1,
					areaCode: this.areaCode
				}
				if (!this.isAdminator) {
					params.parentId = this.$store.state.userInfos.group.id
				}
				this.$ajax.get({
					url: this.$api.GET_ORGANIZATION_LIST,
					params: params
				}).then(res => {
					this.groupLists = this.$com.confirm(res, 'data.content', [])
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
