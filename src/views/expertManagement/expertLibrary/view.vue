<template>
	<div ref='InfoExpert' id="InfoExpert" class="portalDetailContentWapper">
		<div class="portalDetailTitle">
			<span class="title">查看专家账号</span>
			<div class="detailOperations">
				<a-button type="primary" ghost @click="handleReturn">
					返回
				</a-button>
			</div>
		</div>
		<a-anchor class="target" :getContainer="()=> this.$refs['InfoExpert']" :offsetTop="260">
			<a-anchor-link href="#basic" title="基本信息" />
			<a-anchor-link href="#experience" title="工作学习经历" />
			<a-anchor-link href="#contact" title="联系信息" />
			<a-anchor-link href="#workArea" title="工作领域信息" />
			<a-anchor-link href="#relatedManagement" title="相关管理信息" />
		</a-anchor>
		<div v-if="detail.identity">
			<div class="content">
				<div id="basic" class="portalDetailContentBody">
					<p class="detailsPartTitle">账户信息</p>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"登录手机账号"' :text='detail.loginPhone!=null?detail.loginPhone:"暂无"'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"姓名"' :text='detail.name'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"民族"' :text='detail.minorityName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"工作单位"' :text='detail.workCompany'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"单位性质"' :text='detail.companyNatureName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"职务"' :text='detail.positionName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"主要社会兼职"' :text='detail.partTime!=null?detail.partTime:"暂无"'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"登录密码"' :text='detail.loginPwd!=null?detail.loginPwd:"暂无"'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"性别"' :text='detail.sex'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"身份证号"' :text='detail.identity'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"单位所在地"' :text='detail.mailingAddress'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"职称"' :text='detail.jobTitleName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='8' :textSpan="16" :label='"所在部门"' :text='detail.belongDepartment'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="8" class="colLabel">
									一寸照：
								</a-col>
								<a-col span="16">
									<img style="width:165px;height:185px" :src="detail.portraitImg" alt="">
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</div>
			</div>
			<div class="content">
				<div class="portalDetailContentBody"  title="工作学习经历" id="experience">
					<p class="detailsPartTitle">工作学习经历</p>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"毕业院校"' :text='detail.graduatedSchool'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"学历"' :text='detail.educationName'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"学位"' :text='detail.bachelorName'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"所学专业"' :text='detail.profession'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"工作经历"' :text='detail.workExperience!=null?detail.workExperience:"暂无"'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</div>
			</div>
			<div class="content">
				<div class="portalDetailContentBody"  id="contact">
					<p class="detailsPartTitle">联系信息</p>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"通讯地址"' :text='detail.mailingAddress'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"联系电话"' :text='detail.phone'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"电子邮箱"' :text='detail.email'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</div>
			</div>
			<div class="content">
				<div class="portalDetailContentBody" title="工作领域信息" id="workArea">
					<p class="detailsPartTitle">工作领域信息</p>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='4' :textSpan="20" :label='"主要相关研究方向"' :text='detail.researchDirectionName!=null?detail.researchDirectionName:"暂无"'></DetailsItem>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='4' :textSpan="20" :label='"主要工作业绩"' :text='detail.performance!=null?detail.performance:"暂无"'></DetailsItem>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='4' :textSpan="20" :label='"获奖成果"' :text='detail.achievements!=null?detail.achievements:"暂无"'></DetailsItem>
						</a-col>
					</a-row>
				</div>
			</div>
			<div class="content">
				<div class="portalDetailContentBody"  id="relatedManagement">
					<p class="detailsPartTitle">相关管理信息</p>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='12' :textSpan="12" :label='"工作领域"' :text='detail.workAreaName'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='12' :textSpan="12" :label='"专业组别"' :text='detail.professionGroupName'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='12' :textSpan="12" :label='"省级认定"' :text='detail.provinceConfirm'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='4' :textSpan="20" :label='"部级认定"' :text='detail.unitConfirm'></DetailsItem>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='4' :textSpan="20" :label='"入库以来参与工作"' :text='detail.historyWork!=null?detail.historyWork:"暂无"'></DetailsItem>
						</a-col>
					</a-row>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_EXPERT_DETAIL.replace('{experId}', this.$route.query.id)
      }).then(res => {
        this.detail = this.$com.confirm(res, 'data.content', {})
      })
    },
    handleReturn() {
      this.$router.push({name:'/expertManagement/expertLibrary'})
    }
  }
}
</script>

<style scoped>
	.content {
		margin: 20px;
		background: white;
	}

	.colMargin {
		margin-bottom: 20px;
	}

	.colLabel {
		text-align: right;
	}

	.target {
		/* width: 300px; */
		/* height: 150px; */
		position: absolute;
		top: 260px;
		right: 21px;
		z-index: 1000;
		background: transparent;
	}

	#InfoExpert {
		position: relative;
		overflow: auto;
		height: 100%;
	}
</style>
