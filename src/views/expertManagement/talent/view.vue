<template>
	<div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">查看专家账号</span>
			<div class="detailOperations">
				<a-button @click="handleReturn"> 返回 </a-button>
				<a-button type="primary"  @click="handleEdit"> 修改 </a-button>
			</div>
		</div>
		<div class="portalDetailContentWapper" >
			<div class="portalDetailContentBody" ref='portalDetailContentBody'>
				<template v-if="detail.name">
					<div class="layoutMargin detailsPartSection">
						<p id="basic" class="detailsPartTitle">基本信息</p>
						<div style="margin:0 16px;">
							<a-row type="flex" justify="start">
								<a-col span="8">
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
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"主要社会兼职"' :text='detail.partTime'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
								<a-col span="8">
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
										<a-col span="8" class="algin-right">
											一寸照：
										</a-col>
										<a-col span="16">
											<img v-if="detail.portraitImg!='暂无'" style="width:165px;height:185px" :src="detail.portraitImg" alt="">
											<span v-else>暂无</span>
										</a-col>
									</a-row>
								</a-col>
							</a-row>
						</div>
					</div>
					<div class="layoutMargin detailsPartSection">
						<p id="experience" class="detailsPartTitle">工作学习经历</p>
						<div style="margin:0 16px;">
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
						</div>
					</div>
					<div class="layoutMargin detailsPartSection">
						<p id="contact" class="detailsPartTitle">联系信息</p>
						<div style="margin:0 16px;">
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
					<div class="layoutMargin detailsPartSection">
						<p id="workArea" class="detailsPartTitle">工作领域信息</p>
						<div style="margin:0 16px;">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='4' :textSpan="20" :label='"主要相关研究方向"' :text='detail.researchDirectionName'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='4' :textSpan="20" :label='"主要工作业绩"' :text='detail.performance'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='4' :textSpan="20" :label='"获奖成果"' :text='detail.achievements'></DetailsItem>
								</a-col>
							</a-row>
						</div>
					</div>
					<div class="layoutMargin detailsPartSection">
						<p id="relatedManagement" class="detailsPartTitle">相关管理信息</p>
						<div style="margin:0 16px;">
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
									<DetailsItem :labelSpan='4' :textSpan="20" :label='"入库以来参与工作"' :text='detail.historyWork'></DetailsItem>
								</a-col>
							</a-row>
						</div>
					</div>
				</template>
			</div>
      <a-anchor :offsetTop="260" class="target" :getContainer="()=> this.$refs['portalDetailContentBody']" >
        <a-anchor-link href="#basic" title="基本信息" />
        <a-anchor-link href="#experience" title="工作学习经历" />
        <a-anchor-link href="#contact" title="联系信息" />
        <a-anchor-link href="#workArea" title="工作领域信息" />
        <a-anchor-link href="#relatedManagement" title="相关管理信息" />
      </a-anchor>
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
        const data = this.$com.confirm(res, 'data.content', {})
        for (const i in data) {
          if (data[i] == null || data[i] == undefined) {
            data[i] = '暂无'
          }
        }
        this.detail = data
      })
    },
    handleReturn() {
      this.$router.push({
        name: '/expertManagement/talent'
      })
    },
    handleEdit(){
      this.$router.push({
        name : '/expertManagement/talent/edit',
        query: { id: this.$route.query.id }
      })
    }
  }
}
</script>

<style scoped>
	.target {  position: absolute; box-shadow: 2px 2px 5px #e0e0e0;  z-index: 10; right: 0px; top: 260px;  }
</style>
