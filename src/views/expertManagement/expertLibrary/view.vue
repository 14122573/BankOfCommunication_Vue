<template>
	<div ref='InfoExpert' id="InfoExpert" class="portalDetailContentWapper">
		<div class="portalDetailTitle">
			<span class="title">查看专家账号</span>
			<div class="detailOperations">
				<a-button type="primary" ghost @click="handleReturn">
					取消
				</a-button>
				<a-button type="primary" @click="handleSave" html-type="submit">
					保存
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
		<div>
			<div class="content">
				<div id="basic" class="portalDetailContentBody">
					<p class="detailsPartTitle">账户信息</p>
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="12" :label='"登录手机账号"' :text='detail.loginPhone'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"姓名"' :text='detail.name'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"民族"' :text='detail.minorityName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"工作单位"' :text='detail.workCompany'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"单位性质"' :text='detail.companyNatureName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"职务"' :text='detail.positionName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"主要社会兼职"' :text='detail.partTime'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"登录密码"' :text='"***********"'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"性别"' :text='detail.sex'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"身份证号"' :text='detail.identity'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"单位所在地"' :text='detail.mailingAddress'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"职称"' :text='detail.jobTitleName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"所在部门"' :text='detail.belongDepartment'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="7" class="colLabel">
									一寸照：
								</a-col>
								<a-col span="17">
									<img style="width:165px;height:185px" src="../../../assets/images/pic.jpg" alt="">
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</div>
			</div>
			<div class="content">
				<a-card :bordered='false' title="工作学习经历" id="experience">
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
									<DetailsItem :labelSpan='7' :textSpan="17" :label='"工作经历"' :text='detail.workExperience'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</a-card>
			</div>
			<div class="content">
				<a-card :bordered='false' title="联系信息" id="contact">
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
				</a-card>
			</div>
			<div class="content">
				<a-card :bordered='false' title="工作领域信息" id="workArea">
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='3' :textSpan="21" :label='"主要相关研究方向"' :text='detail.researchDirectionName'></DetailsItem>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='3' :textSpan="21" :label='"主要工作业绩"' :text='detail.performance'></DetailsItem>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='3' :textSpan="21" :label='"获奖成果"' :text='detail.achievements'></DetailsItem>
						</a-col>
					</a-row>
				</a-card>
			</div>
			<div class="content">
				<a-card :bordered='false' title="相关管理信息" id="relatedManagement">
					<a-row type="flex" justify="start">
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='9' :textSpan="15" :label='"工作领域"' :text='detail.workAreaName'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='9' :textSpan="15" :label='"专业组别"' :text='detail.professionGroupName'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
						<a-col span="8">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='9' :textSpan="15" :label='"省级认定"' :text='detail.provinceConfirm'></DetailsItem>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='3' :textSpan="21" :label='"部级认定"' :text='detail.unitConfirm'></DetailsItem>
						</a-col>
					</a-row>
					<a-row type="flex" justify="start" class="detailsPartLine">
						<a-col span="24">
							<DetailsItem :labelSpan='3' :textSpan="21" :label='"入库以来参与工作"' :text='detail.historyWork'></DetailsItem>
						</a-col>
					</a-row>
				</a-card>
			</div>
		</div>
	</div>
</template>

<script>
import DetailsItem from '@/components/detail/detailItem'
export default {
  components: {
    DetailsItem
  },
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

    },
    handleSave() {

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
