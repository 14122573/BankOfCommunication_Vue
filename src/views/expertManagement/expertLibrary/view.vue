<template>
	<div>
		<a-card :bordered='false'>
			<a-row type="flex" justify="space-between" align="middle" slot="title">
				<a-col>查看专家账号
				</a-col>
				<a-col>
					<a-button type="primary" ghost @click="handleReturn">
						取消
					</a-button>
					<a-button type="primary" @click="handleSave" html-type="submit">
						保存
					</a-button>
				</a-col>
			</a-row>
		</a-card>
		<a-anchor class="target" showInkInFixed :getContainer="getContainer()">
			<a-anchor-link href="#basic" title="基本信息" />
			<a-anchor-link href="#experience" title="工作学习经历" />
			<a-anchor-link href="#contact" title="联系信息" />
			<a-anchor-link href="#workArea" title="工作领域信息" />
			<a-anchor-link href="#relatedManagement" title="相关管理信息" />
		</a-anchor>
		<div id='InfoExpert' style="{height:'100px',overflow:'auto'}">
			<div class="content" id="basic">
				<a-card :bordered='false' title="基本信息">
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									登录手机账号：
								</a-col>
								<a-col span="17">
									登录手机账号
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									姓名：
								</a-col>
								<a-col span="17">
									姓名
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									民族：
								</a-col>
								<a-col span="17">
									民族
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									工作单位：
								</a-col>
								<a-col span="17">
									工作单位
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									单位性质：
								</a-col>
								<a-col span="17">
									单位性质
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									职位：
								</a-col>
								<a-col span="17">
									职位
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									主要社会兼职：
								</a-col>
								<a-col span="17">
									主要社会兼职
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									登录密码：
								</a-col>
								<a-col span="17">
									*************
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									性别：
								</a-col>
								<a-col span="17">
									性别
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									身份证号：
								</a-col>
								<a-col span="17">
									身份证号
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									单位所在地：
								</a-col>
								<a-col span="17">
									单位所在地
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									所属系统：
								</a-col>
								<a-col span="17">
									所属系统
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									职称：
								</a-col>
								<a-col span="17">
									职称
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									一寸照：
								</a-col>
								<a-col span="17">
									<img style="width:165px;height:185px" src="../../../assets/images/pic.jpg" alt="">
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									所在部门：
								</a-col>
								<a-col span="17">
									所在部门
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</a-card>
			</div>
			<div class="content" id="experience">
				<a-card :bordered='false' title="工作学习经历">
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									毕业院校：
								</a-col>
								<a-col span="17">
									毕业院校
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									学历：
								</a-col>
								<a-col span="17">
									学历
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									学位：
								</a-col>
								<a-col span="17">
									学位
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									所学专业：
								</a-col>
								<a-col span="17">
									所学专业
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									工作经历：
								</a-col>
								<a-col span="17">
									工作经历
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</a-card>
			</div>
			<div class="content" id="contact">
				<a-card :bordered='false' title="联系信息">
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									通讯地址：
								</a-col>
								<a-col span="17">
									通讯地址
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									联系电话：
								</a-col>
								<a-col span="17">
									联系电话
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="7" class="colLabel">
									电子邮箱：
								</a-col>
								<a-col span="17">
									电子邮箱
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</a-card>
			</div>
			<div class="content" id="workArea">
				<a-card :bordered='false' title="工作领域信息">
					<a-row type="flex" justify="start" class="colMargin">
						<a-col span="3" class="colLabel">
							主要相关研究方向：
						</a-col>
						<a-col span="21">
							主要相关研究方向
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="colMargin">
						<a-col span="3" class="colLabel">
							主要工作业绩：
						</a-col>
						<a-col span="21">
							主要工作业绩
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="colMargin">
						<a-col span="3" class="colLabel">
							获奖成果：
						</a-col>
						<a-col span="21">
							获奖成果
						</a-col>
					</a-row>
				</a-card>
			</div>
			<div class="content" id="relatedManagement">
				<a-card :bordered='false' title="相关管理信息">
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="9" class="colLabel">
									工作领域：
								</a-col>
								<a-col span="15">
									工作领域
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="9" class="colLabel">
									专业组别：
								</a-col>
								<a-col span="15">
									专业组别
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="colMargin">
								<a-col span="9" class="colLabel">
									省级认定：
								</a-col>
								<a-col span="15">
									省级认定
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="colMargin">
						<a-col span="3" class="colLabel">
							部级认定：
						</a-col>
						<a-col span="21">
							部级认定
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="colMargin">
						<a-col span="3" class="colLabel">
							入库以来参与工作：
						</a-col>
						<a-col span="21">
							部级认定
						</a-col>
					</a-row>
				</a-card>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dom: ''
			}
		},
		mounted(){
			this.dom=document.getElementById('InfoExpert');
		},
		methods: {
			handleReturn() {

			},
			handleSave() {

			},
			getContainer(){
				this.dom
			}
		}
	}
</script>

<style scoped>
	.content {
		margin: 20px;
	}

	.colMargin {
		margin-bottom: 20px;
	}

	.colLabel {
		text-align: right;
	}

	.target {
		width: 300px;
		height: 150px;
		position: fixed;
		top: 100px;
		right: 0px;
		z-index: 1000;
		background: transparent;
		
	}
</style>
