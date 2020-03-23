<template>
	<div class="portalDetailContentWapper">
		<div class="portalDetailContentBody" ref='portalDetailContentBody'>
			<template v-if="detail.name">
				<div class="layoutMargin layoutPadding detailsPartSection">
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
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"出生年月"' :text='detail.birthday.slice(0,7)'></DetailsItem>
									</a-col>
								</a-row>
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"电子邮箱"' :text='detail.email'></DetailsItem>
									</a-col>
								</a-row>
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"单位性质"' :text='detail.companyNatureName'></DetailsItem>
									</a-col>
								</a-row>
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"职务"' :text='detail.position'></DetailsItem>
									</a-col>
								</a-row>
								<!-- <a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"主要社会兼职"' :text='detail.partTime'></DetailsItem>
									</a-col>
								</a-row> -->
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
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"政治面貌"' :text='detail.politicName'></DetailsItem>
									</a-col>
								</a-row>
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"工作单位"' :text='detail.workCompany'></DetailsItem>
									</a-col>
								</a-row>
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"办公电话"' :text='detail.companyPhone'></DetailsItem>
									</a-col>
								</a-row>
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"职称"' :text='getJobTitleName(detail.jobTitleName)'></DetailsItem>
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
						<a-row type="flex" justify="start">
							<a-col span="16">
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='4' :textSpan="20" :label='"单位地址"' :text='detail.companyAddress'></DetailsItem>
									</a-col>
								</a-row>
							</a-col>
						</a-row>
					<!-- </div>
				</div>
				<div class="layoutMargin detailsPartSection">
					<p id="experience" class="detailsPartTitle">工作学习经历</p>
					<div style="margin:0 16px;"> -->
						<a-row type="flex" justify="start">
							<a-col span="8">
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"毕业院校"' :text='detail.graduatedSchool'></DetailsItem>
									</a-col>
								</a-row>
							</a-col>
							<a-col span="8">
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"学历"' :text='detail.educationName'></DetailsItem>
									</a-col>
								</a-row>
							</a-col>
							<a-col span="8">
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"学位"' :text='detail.bachelorName'></DetailsItem>
									</a-col>
								</a-row>
							</a-col>
						</a-row>
						<a-row type="flex" justify="start">
							<a-col span="8">
								<a-row type="flex" justify="start" class="detailsPartLine">
									<a-col span="24">
										<DetailsItem :labelSpan='8' :textSpan="16" :label='"所学专业"' :text='detail.profession'></DetailsItem>
									</a-col>
								</a-row>
							</a-col>
						</a-row>
					<!-- </div>
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
					<div style="margin:0 16px;"> -->
						<a-row type="flex" justify="start" class="detailsPartLine">
							<a-col span="24">
								<DetailsItem :labelSpan='4' :textSpan="20" :label='"主要相关研究方向"' :text='detail.researchDirection'></DetailsItem>
							</a-col>
						</a-row>
						<!-- <a-row type="flex" justify="start" class="detailsPartLine">
							<a-col span="24">
								<DetailsItem :labelSpan='4' :textSpan="20" :label='"主要工作业绩"' :text='detail.performance'></DetailsItem>
							</a-col>
						</a-row> -->
						<a-row type="flex" justify="start" class="detailsPartLine">
							<a-col span="24">
								<!-- <DetailsItem :labelSpan='4' :textSpan="20" :label='"获奖成果"' :text='detail.achievements'></DetailsItem> -->
								<a-row type="flex" justify="center" align="top" class="detailContent">
									<a-col :span="2" class="label">获奖成果：</a-col>
									<a-col :span="20" class="text">
										<!-- <template v-if="text.length>0">{{text}}</template>
										<slot name='detailContent'></slot> -->
										<a-table v-if="detail.achievements!='[{}]'" class="portalTable" :dataSource="JSON.parse(detail.achievements)" 
											:columns="achievementsColumns" size="small" rowKey="name" :pagination="false">
											<span  slot="date" slot-scope="text, record">
												{{record.date?record.date.slice(0,7):''}}
											</span>
										</a-table>
										<span v-else >暂无</span>
									</a-col>
								</a-row>
							</a-col>
						</a-row>

						<a-row type="flex" justify="start" class="detailsPartLine">
							<a-col span="24">
								<!-- <DetailsItem :labelSpan='8' :textSpan="16" :label='"工作经历"' :text='detail.workExperience'></DetailsItem> -->
								<a-row type="flex" justify="center" align="top" class="detailContent">
									<a-col :span="2" class="label">工作经历：</a-col>
									<a-col :span="20" class="text">
										<!-- <template v-if="text.length>0">{{text}}</template>
										<slot name='detailContent'></slot> -->
										<a-table v-if="detail.workExperience!='[{}]'" class="portalTable" :dataSource="JSON.parse(detail.workExperience)" 
											:columns="workExperienceColumns" size="small" rowKey="type" :pagination="false">
											<span  slot="date" slot-scope="text, record">
												{{(record.date && record.date.length)>1?record.date[0].slice(0,7)+' 至 '+record.date[1].slice(0,7):''}}
											</span>
										</a-table>
										<span v-else >暂无</span>
									</a-col>
								</a-row>
							</a-col>
						</a-row>
					</div>
				</div>
				<!-- <div class="layoutMargin detailsPartSection">
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
				</div> -->
			</template>
			<template v-else>
				<div class="layoutMargin layoutPadding detailsPartSection">
					<a-alert message="暂无数据" type="success">
						<p slot="description"> 该账户在暂无人员信息数据 </p>
					</a-alert>
				</div>
			</template>
		</div>
		<!-- <div class="target">
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
		</div> -->
	</div>
</template>
	
<script>
export default {
  props:{
    id:{
      type:String,
      required:true,
      default:''
    },
    loginPhone:{
      type:String,
      required:true,
      default:''
    },
  },
  data() {
    return {
      detail: {},
	  changeSmall:false,
	  achievementsColumns:[{
        title: '主要成果',
        dataIndex: 'typeName',
        key: 'typeName',
        width:'30%',
	  },{
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        width:'30%',
	  },{
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        width:'40%',
        scopedSlots: {
          customRender: 'date',
        },
	  }],
	  workExperienceColumns:[{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width:'30%',
	  },{
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        width:'30%',
	  },{
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        width:'40%',
        scopedSlots: {
          customRender: 'date',
        },
	  }],
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    //获取职称
    getJobTitleName(name){
	  return (name.split(','))[0]
    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_EXPERT_DETAIL.replace('{experId}', this.id)
      }).then(res => {
        let data = this.$com.confirm(res, 'data.content', {})
        for (let i in data) {
          if (data[i] == null || data[i] == undefined) {
            data[i] = '暂无'
          }
        }
        this.detail = data
      })
    },
    getTableData(data){
	  data=JSON.parse(data)
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
