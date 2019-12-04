<template>
	<div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">查看专家账号</span>
			<div class="detailOperations">
				<a-button @click="handleReturn"> 返回 </a-button>
				<a-button type="primary" @click="handleEdit"> 修改 </a-button>
			</div>
		</div>
		<div class="portalDetailContentWapper">
			<div class="portalDetailContentBody" ref='portalDetailContentBody'>
				<template >
					<div class="layoutMargin detailsPartSection">
						<p id="basic" class="detailsPartTitle">渔业乡村兽医信息</p>
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
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"性别"' :text='detail.gender'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"主键id"' :text='detail.veterinarianId || detail.officialId || detail.practisingId'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"职业类别"' :text='detail.profession'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"最高学历"' :text='detail.education'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"毕业院校"' :text='detail.graduationSchool'></DetailsItem>
										</a-col>
									</a-row>
								</a-col>
								<a-col span="8">
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"创建时间"' :text='detail.createTime'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"修改人id"' :text='detail.updateId'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"修改时间"' :text='detail.updateTime'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"操作人"' :text='detail.operateName'></DetailsItem>
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
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"毕业年月"' :text='detail.graduationDate'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"所学专业"' :text='detail.speciality'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"工作单位"' :text='detail.unit'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"资格证号"' :text='detail.qualificationNumber'></DetailsItem>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" class="detailsPartLine">
										<a-col span="24">
											<DetailsItem :labelSpan='8' :textSpan="16" :label='"创建人id"' :text='detail.createId'></DetailsItem>
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
			<div class="target">
				<div class="icon" v-show="changeSmall">
					<a-icon type="environment" @click="changeSmall=false"/>
				</div>
				<div class="icon" v-show="!changeSmall">
					<a-icon type="double-right" @click="changeSmall=true"/>
				</div>
				<a-anchor v-show="!changeSmall"  :offsetTop="260" :getContainer="()=> this.$refs['portalDetailContentBody']">
					<a-anchor-link href="#basic" title="基本信息" />
					<a-anchor-link href="#experience" title="工作学习经历" />
					<a-anchor-link href="#contact" title="联系信息" />
					<a-anchor-link href="#workArea" title="工作领域信息" />
					<a-anchor-link href="#relatedManagement" title="相关管理信息" />
				</a-anchor>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      changeSmall:false
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      // this.$ajax.get({
      //   url: this.$api.GET_EXPERT_DETAIL.replace('{experId}', this.$route.query.id)
      // }).then(res => {
      //   let data = this.$com.confirm(res, 'data.content', {})
      //   for (let i in data) {
      //     if (data[i] == null || data[i] == undefined) {
      //       data[i] = '暂无'
      //     }
      //   }
      this.detail = {
        'officialId': '1',//主键id
        'practisingId':'ggggg',
        'name': '家和',//姓名,
        'gender': '0',//性别,
        'profession': '兽医/水产工作机构',//职业类别,
        'education': '5',//最高学历：0、小学 1、初中 2、中专/高中 3、专科 4、本科 5、硕士研究生 6、博士研究生 7、博士后
        'graduationSchool': '上海水产大学',//毕业院校
        'graduationDate': '2019-08-26 14:43:38',//毕业年月
        'speciality': '水产养殖',//所学专业
        'unit': '全国水产技术推广总站',///工作单位
        'qualificationNumber': 'c012011110011',//证书编号
        'createId': '323241341351596032',//创建人id
        'createTime': '2019-11-26 14:43:54',//创建时间
        'updateId': '323241341351596032',//修改人ID
        'updateTime': '2019-11-28 10:37:41',//修改时间
        'operateName': '总站疫病防控处',//操作人
        'fileUrlList': [],
        'info': null,
        'birthDate': '2019-04-26 14:43:21',//出生年月
        'confirmationTime': '2019-11-06 14:44:05',//确认时间
        'trainStartTime': '2019-11-20 14:43:44',//培训开始时间
        'trainEndTime': '2019-11-22 14:43:45',//培训结束时间
        'address': '安徽省铜陵市铜陵县东联乡',//居住地
        'schoolType': '胜多负少的',//学校类别
        'duty': '鼎折覆餗',//技术职称或职务
        'trainingVenue': '胜多负少',//培训地点
        'trainingContents': '梵蒂冈地方 ',//培训内容
        'provinceId': '340000',//省id
        'provinceName': '安徽省',//省名称
        'cityId': '340700',//市id
        'cityName': '铜陵市',//市名称
        'countyId': '340721',//区县ID
        'countyName': '铜陵县',//区县名称
        'townId': '340721201',//乡镇id
        'townName': '东联乡' //乡镇名称
      }
      // })
    },
    handleReturn() {
      // this.$router.push({
      //   name: '/expertManagement/expertLibrary'
      // })
    },
    handleEdit() {
      // this.$router.push({
      //   name: '/expertManagement/expertLibrary/edit',
      //   query: {
      //     id: this.$route.query.id
      //   }
      // })
    }
  }
}
</script>

<style scoped>
	.target {
		position: absolute;
		z-index: 10;
		right: 33px;
		top: 260px;
		padding: 10px 8px;
		border-radius: 2px;
		background: white;
		-moz-box-shadow: -1px 0px 5px #878787;
		-webkit-box-shadow: -1px 0px 5px #878787;
		box-shadow: -1px 0px 5px #878787;
	}

	.target .icon {
		text-align: right;
		cursor: pointer;
		color: #1890ff;
	}
</style>
