<template>
	<a-card :bordered='false'>
		<a-row type="flex" justify="space-between" slot='title'>
			<a-col>
				查看新用户信息
			</a-col>
			<a-col>
				<a-button type="primary" ghost @click='handleReturn'>返回</a-button>
				<a-button type="primary" ghost @click='handleAdd'>修改</a-button>
			</a-col>
		</a-row>
		<a-row type="flex" justify="start">
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						姓名：
					</a-col>
					<a-col span="17">
						姓名
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						账户：
					</a-col>
					<a-col span="17">
						账户
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						邮箱：
					</a-col>
					<a-col span="17">
						邮箱
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						邮编：
					</a-col>
					<a-col span="17">
						邮编
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						单位名称：
					</a-col>
					<a-col span="17">
						单位名称
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						地址：
					</a-col>
					<a-col span="17">
						地址 <span class="position" @click="map=true">
							<a-icon type="environment" />&nbsp;查看地图定位</span>
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-divider dashed />
		<a-row>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						角色名称：
					</a-col>
					<a-col span="17">
						角色名称
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						组织机构名称：
					</a-col>
					<a-col span="17">
						组织机构名称
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						所属行政区域：
					</a-col>
					<a-col span="17">
						所属行政区域
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-tree class="tree" disabled checkable :defaultExpandedKeys="defaultExpandedKeys"
		 v-model="checkedKeys" :treeData="treeData" />
		<a-modal title="查看地图定位" :width='880' :bodyStyle="{'text-align':'center'}" :visible="map" :closable='false'>
			<template slot="footer">
				<a-button @click="map=false" ghost type="primary">取消</a-button>
				<a-button @click="map=false" type="primary">确认</a-button>
			</template>
			<BMapComponent :height="250" :width="830" :keyWords="keyWords" />
		</a-modal>
	</a-card>
</template>

<script>
	import BMapComponent from '@/components/BaiduMap/BMapComponent.vue'
	export default {
		components: {
			BMapComponent
		},
		data() {
			return {
				// defaultSelectedKeys: [],
				defaultExpandedKeys: [],
				checkedKeys: [],
				map: false,
				keyWords: '',
				treeData: [{
					title: '0-0',
					key: '0-0',
					children: [{
						title: '0-0-0',
						key: '0-0-0',
						children: [{
								title: '0-0-0-0',
								key: '0-0-0-0'
							},
							{
								title: '0-0-0-1',
								key: '0-0-0-1'
							},
							{
								title: '0-0-0-2',
								key: '0-0-0-2'
							},
						],
					}, {
						title: '0-0-1',
						key: '0-0-1',
						children: [{
								title: '0-0-1-0',
								key: '0-0-1-0'
							},
							{
								title: '0-0-1-1',
								key: '0-0-1-1'
							},
							{
								title: '0-0-1-2',
								key: '0-0-1-2'
							},
						],
					}, {
						title: '0-0-2',
						key: '0-0-2',
					}],
				}, {
					title: '0-1',
					key: '0-1',
					children: [{
							title: '0-1-0-0',
							key: '0-1-0-0'
						},
						{
							title: '0-1-0-1',
							key: '0-1-0-1'
						},
						{
							title: '0-1-0-2',
							key: '0-1-0-2'
						},
					],
				}, {
					title: '0-2',
					key: '0-2',
				}]
			}
		},
		methods: {
			handleReturn() {
				this.$router.push({
					name: '/systemManagement/administrator'
				})
			},
			handleAdd() {
				
				this.defaultExpandedKeys = ['0-0-0'];
				this.checkedKeys = ['0-0-0'];
			}
		}
	}
</script>
<style scoped>
	.colMargin {
		margin-bottom: 20px;
	}

	.colLabel {
		text-align: right;
	}

	.position {
		margin-left: 5px;
		color: #1890ff;
		cursor: pointer;
	}
</style>
<style>
	.tree>li {
		background: rgba(247, 247, 247);
	}

	.tree li ul {
		background: white;
	}
</style>
