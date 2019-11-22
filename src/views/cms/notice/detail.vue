<template>
	<div class="portalDetailWapper">
		<div class="portalDetailTitle" v-if="noticeDetail.title">
			<span class="title">{{noticeDetail.title}}</span>
			<div class="detailOperations">
				<a-button @click="$router.back()"> 返回 </a-button>
				<a-button v-if="noticeDetail.status=='0' && $permission('P31001')" type="primary" @click="goToEdit"> 修改 </a-button>
				<a-button v-if="noticeDetail.status=='0' && $permission('P31004')" type="primary" @click="toChangeStatus('publish')"> 发布 </a-button>
				<a-button v-if="noticeDetail.status=='1' && $permission('P31004')" type="primary" @click="toChangeStatus('recall')"> 撤回 </a-button>
			</div>
		</div>
		<div class="portalDetailContentWapper">
			<div class="portalDetailContentBody">
				<template v-if="noticeDetail.title">
					<div class="layoutMargin detailsPartSection">
						<p class="detailsPartTitle">基本信息</p>
						<div style="margin:0 16px;">
							<a-row type="flex" justify="start">
								<a-col span="16" style="margin:8px 0;">
								  <DetailsItem :labelSpan='4' :textSpan="20" :label='"标题"' :text='noticeDetail.title'></DetailsItem>
								</a-col>
							</a-row>
							<a-row type="flex" justify="start">
								<a-col span="8" style="margin:8px 0;">
								  <DetailsItem :labelSpan='8' :textSpan="16" :label='"生效起始时间"' :text='$com.oneOf(noticeDetail.startTime,["",defaultEffectTime.startTime])?"发布即时生效":noticeDetail.startTime'></DetailsItem>
								</a-col>
                <a-col span="8" style="margin:8px 0;">
								  <DetailsItem :labelSpan='8' :textSpan="16" :label='"生效截止时间"' :text='$com.oneOf(noticeDetail.endTime,["",defaultEffectTime.endTime])?"∞":noticeDetail.endTime'></DetailsItem>
								</a-col>
                <a-col span="8" style="margin:8px 0;">
								  <DetailsItem :labelSpan='8' :textSpan="16" :label='"置顶否"'>
                    <div slot="detailContent">
                        <a-tag :color="getPlacementTag.color">{{getPlacementTag.name}}</a-tag>
                    </div>
                  </DetailsItem>
								</a-col>
							</a-row>
              <a-row type="flex" justify="start">
								<a-col span="8" style="margin:8px 0;">
								  <DetailsItem :labelSpan='8' :textSpan="16" :label='"状态"'>
                    <div slot="detailContent">
                        <a-tag :color="getStatusTag.color">{{getStatusTag.name}}</a-tag>
                    </div>
                  </DetailsItem>
								</a-col>
							</a-row>
              <a-row type="flex" justify="start">
                <a-col span="16" style="margin:8px 0;">
								  <DetailsFile :labelSpan='4' :textSpan="20" :label='"文件信息"' :files='makeFileList'></DetailsFile>
								</a-col>
							</a-row>
						</div>
					</div>
          <div class="layoutMargin detailsPartSection">
						<p class="detailsPartTitle">通知内容</p>
						<div style="margin:0 16px;">
							<a-row type="flex" justify="start">
                <a-col span="24" style="margin:8px 0;">
                  <div v-html="noticeDetail.content"></div>
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
      id:this.$route.params.id,
      ready:false,
      noticeDetail:{},
      defaultEffectTime:{
        startTime:'1900-01-01 00:00:00',
        endTime:'2099-01-01 00:00:00'
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  computed:{
    /**
     * 根据传入的状态key值，返回需要展示的状态文字和颜色
     * @returns {Object} name:状态名；color：状态文字颜色
     */
    getStatusTag(){
      let statusTag = {
        name:'',
        color:''
      }
      switch (this.noticeDetail.status) {
      case '0':
        statusTag.name = '草稿'
        statusTag.color = 'orange'
        break
      case '1':
        statusTag.name = '发布中'
        statusTag.color = 'blue'
        break
      case '2':
        statusTag.name = '已失效'
        statusTag.color = 'gray'
        break
      default:
        statusTag.name = '-'
        statusTag.color = 'red'
        break
      }
      return statusTag
    },
    /**
     * 根据传入的置顶状态key值，返回需要展示的状态文字和颜色
     * @returns {Object} name:文献内容类型名；color：状态文字颜色
     */
    getPlacementTag(){
      let statusTag = {
        name:'',
        color:''
      }
      switch (this.noticeDetail.isTop) {
      case '0':
        statusTag.name = '不置顶'
        statusTag.color = 'blue'
        break
      case '1':
        statusTag.name = '置顶'
        statusTag.color = 'blue'
        break
      default:
        statusTag.name = '-'
        statusTag.color = 'gray'
        break
      }
      return statusTag
    },
    /**
     * 组装需要展示的文件数组
     * @returns {Array}  [{name:带文件后缀的文件名称；url：已上传的文件地址},...]
     */
    makeFileList(){
      let fileList = []
      let attachments = !this.noticeDetail.attachments?[]:this.noticeDetail.attachments
      for(let i=0;i<attachments.length;i++){
        if(attachments[i].type=='1'){
          fileList.push({
            name:attachments[i].fileName,
            url:attachments[i].filePath
          })
        }
      }
      return fileList
    }
  },
  methods: {
    /**
     * 根据操作类型，弹窗用户确认后执行相应操作或请求
     * @param {String} eventKey 操作类型，发布：publish；撤回：recall
     */
    toChangeStatus(toStatusName){
      toStatusName = !toStatusName?'':toStatusName
      let toStatus = ''
      let opeation = {
        title:'',
        tips:''
      }
      switch (toStatusName) {
      case 'publish':
        opeation.title='您确认发布“'+this.noticeDetail.title+'”吗？'
        opeation.tips='发布后即可被本平台用户浏览。可使用【撤回】取消发布。'
        toStatus = '1'
        break
      case 'recall':
        opeation.title='您确认撤销“'+this.noticeDetail.title+'”的发布状态吗？'
        opeation.tips='撤回后将无法再次编辑、发布或删除！'
        toStatus = '2'
        break
      default:
        break
      }
      if(this.$com.oneOf(toStatusName,['publish','recall'])){
        let vm = this
        this.$modal.confirm({
          title: opeation.title,
          content: opeation.tips,
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            vm.doChangeStatus(toStatus)
          },
        })
      }
    },
    /**
     * 更改指定数据发布状态
     * @param {String} id 被操作数据key
     * @param {String} status 目标状态Key ，发布：1；失效：2
     */
    doChangeStatus(status){
      this.$ajax.put({
        url: this.$api.PUT_CMS_NOTICE_STATUS.replace('{id}', this.id).replace('{status}', status)
      }).then(res=>{
        if(res.code=='200'){
          let successMsg = status=='1'?'发布成功':'撤回成功'
          this.$message.success(successMsg)
          this.$router.push({name:'/cms/notice'})
        }
      })
    },
    /**
     * 进入修改页面
     */
    goToEdit(){
      this.$router.push({
        name:'/cms/notice/edit',
        params:{
          id: this.noticeDetail.id,
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail(){
      this.$ajax.get({
        url: this.$api.GET_CMS_NOTICE_DETAIL.replace('{id}', this.id)
      }).then(res => {
        if(res.code =='200'){
          this.noticeDetail = this.$com.confirm(res, 'data.content', {})
          this.ready = true
        }else{
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
