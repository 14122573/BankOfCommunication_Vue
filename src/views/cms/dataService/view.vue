<template>
	<div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">兽医详情</span>
			<div class="detailOperations">
				<a-button @click="handleReturn"> 返回 </a-button>
			</div>
		</div>
		<div class="portalDetailContentWapper">
			<div class="portalDetailContentBody" ref='portalDetailContentBody'>
				<template >
<!-- 个人 -->
					<div class="layoutMargin detailsPartSection">
						<p id="basic" v-if="detail.veterinarianId" class="detailsPartTitle">乡村兽医信息</p>
						<p id="basic" v-else-if="detail.practisingId" class="detailsPartTitle">执业兽医信息</p>
						<p id="basic" v-else-if="detail.officialId" class="detailsPartTitle">官方兽医信息</p>
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
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"居住地"' :text='detail.address'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine" v-if="detail.veterinarianId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"从业区域"' :text='detail.employmentArea'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"执业类别"' :text='detail.profession'></DetailsItem>
										</a-col>
									</a-row>

								</a-col>

								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"性别"' :text='detail.gender== 0 ? "男":"女"'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine" v-if="detail.veterinarianId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"登记时间"' :text='detail.redistration'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine" v-if="detail.veterinarianId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"从业地点"' :text='detail.workplace'></DetailsItem>
										</a-col>
									</a-row>
                  <a-row type="flex" justify="start" class="detailsPartLine" v-if="!detail.veterinarianId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"工作单位"' :text='detail.unit'></DetailsItem>
										</a-col>
									</a-row>
                  <a-row type="flex" justify="start" class="detailsPartLine" v-if="detail.practisingId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"获取途径"' :text='detail.channel==0?"考试":"认定"'></DetailsItem>
										</a-col>
									</a-row>
                  <a-row type="flex" justify="start" class="detailsPartLine" v-if="detail.officialId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"技术职称或职务"' :text='detail.duty'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
                <a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"出生年月"' :text='detail.birthDate'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine" >
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"证书编号"' :text='detail.qualificationNumber'></DetailsItem>
										</a-col>
									</a-row>
                  <a-row type="flex" justify="start" class="detailsPartLine" v-if="detail.practisingId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"取得年份"' :text='detail.particularYear'></DetailsItem>
										</a-col>
									</a-row>
                  <a-row type="flex" justify="start" class="detailsPartLine" v-if="detail.officialId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"确认时间"' :text='detail.confirmationTime'></DetailsItem>
										</a-col>
									</a-row>
                  <a-row type="flex" justify="start" class="detailsPartLine" v-if="detail.veterinarianId">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"工作单位"' :text='detail.unit'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
							</a-row>
						</div>
					</div>
<!-- 教育 -->
					<div class="layoutMargin detailsPartSection" >
						<p id="experience" class="detailsPartTitle">教育情况</p>
						<div style="margin:0 16px;">
							<a-row type="flex" justify="start">
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"毕业院校"' :text='detail.graduationSchool'></DetailsItem>
										</a-col>
									</a-row>
                  <a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem v-if="detail.education==0" :labelSpan='7' :textSpan="17" :label='"最高学历"' :text='"小学"'></DetailsItem>
											<DetailsItem v-else-if="detail.education==1" :labelSpan='7' :textSpan="17" :label='"最高学历"' :text='"初中"'></DetailsItem>
											<DetailsItem v-else-if="detail.education==2" :labelSpan='7' :textSpan="17" :label='"最高学历"' :text='"中专/高中"'></DetailsItem>
											<DetailsItem v-else-if="detail.education==3" :labelSpan='7' :textSpan="17" :label='"最高学历"' :text='"专科"'></DetailsItem>
											<DetailsItem v-else-if="detail.education==4" :labelSpan='7' :textSpan="17" :label='"最高学历"' :text='"本科"'></DetailsItem>
											<DetailsItem v-else-if="detail.education==5" :labelSpan='7' :textSpan="17" :label='"最高学历"' :text='"硕士研究生"'></DetailsItem>
											<DetailsItem v-else-if="detail.education==6" :labelSpan='7' :textSpan="17" :label='"最高学历"' :text='"博士研究生"'></DetailsItem>
											<DetailsItem v-else-if="detail.education==7" :labelSpan='7' :textSpan="17" :label='"最高学历"' :text='"博士后"'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"毕业年月"' :text='detail.graduationDate'></DetailsItem>
										</a-col>
									</a-row>
                  <a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"学校类别"' :text='detail.schoolType'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"所学专业"' :text='detail.speciality'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
							</a-row>
						</div>
					</div>
<!-- 培训 -->
					<div class="layoutMargin detailsPartSection" v-if="!detail.practisingId">
						<p id="contact" class="detailsPartTitle">培训情况</p>
						<div style="margin:0 16px;">
							<a-row type="flex" justify="start">
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"培训开始时间"' :text='detail.trainStartTime || " "'></DetailsItem>
										</a-col>
                    <a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"培训内容"' :text='detail.trainingContents || " " '></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"培训结束时间"' :text='detail.trainEndTime || " "'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"培训地点"' :text='detail.trainingVenue || " "'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
							</a-row>
						</div>
					</div>
<!-- 注册情况 -->
					<div class="layoutMargin detailsPartSection" v-if="detail.practisingId">
						<p id="workArea" class="detailsPartTitle">注册情况</p>
						<div style="margin:0 16px;">
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='4' :textSpan="20" :label='"是否注册"' :text='detail.regsiter ? "是":"否"'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start" class="detailsPartLine">
								<a-col span="24">
									<DetailsItem :labelSpan='4' :textSpan="20" :label='"注册号"' :text='detail.regsitrationNumber ? detail.regsitrationNumber :" "'></DetailsItem>
								</a-col>
							</a-row>
						</div>
					</div>
<!-- 技术职称 -->
					<div class="layoutMargin detailsPartSection" v-if="detail.veterinarianId">
						<p id="relatedManagement" class="detailsPartTitle">技术职称或职业技能鉴定情况</p>
						<div style="margin:0 16px;">
							<a-row type="flex" justify="start">
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"发证时间"' :text='detail.lssuingTime'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"证书类别"' :text='detail.certificateType'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='7' :textSpan="17" :label='"发证单位"' :text='detail.certificationUnit'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
							</a-row>

						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
    }
  },
  mounted() {
  },
  methods: {
    handleReturn() {
      this.$router.back()
    },
  },
  created () {
    this.$ajax.get({
      url: this.$api.GET_VETERINARY.replace('{id}', this.$route.query.id).replace('{type}', this.$route.query.type)
    }).then(res => {
      this.detail = this.$com.confirm(res, 'data.content', [])
    })
  }
}
</script>

<style scoped>
.portalDetailWapper{
  margin:10px;
  margin-bottom: 0;
}
.portalDetailTitle{
  margin: 10px 10px 0px 12px
}
.portalDetailContentBody{
  overflow:visible;
}
</style>
