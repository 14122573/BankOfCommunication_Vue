<template>
  <div class="loginFrame" :style="'background-image: url(' + require('@/assets/images/bg-cmsview.jpg') + ')'"  v-if="noticeDetail.title">
    <div class="cmsPublishFrame">
      <div class="cmsPublishFrameTitle">
        <a-row type="flex" justify="space-between" align="top" :gutter='16'>
          <a-col :span="18">
            <p class="titleName">{{noticeDetail.title}}</p>
            <p class="titleSub">
              <a-tag style="margin-right:10px;" v-if="noticeDetail.isTop=='1'" color="blue">置顶</a-tag>
              <a-tag v-if="noticeDetail.isVote=='1'" color="orange">投票结果公示</a-tag>
            </p>
          </a-col>
          <a-col :span="6" >
             <a-button type="primary" @click="$router.push({name:'/cms/noticePublish'})" ghost>返回通知公告列表</a-button>
             <!-- 直接返回登录页 -->
             <a-button class="close" type="primary" @click="$router.replace({name:'login'})" ghost>关闭</a-button>
          </a-col>
        </a-row>
      </div>
      <div class="layoutMargin" style="padding-bottom:16px" >
        <div style="padding:16px">
          <div v-html="noticeDetail.content"></div>
          <template v-if="noticeDetail.attachments">
              <a-row type="flex" justify="start">
                <a-col span="16" style="margin:8px 0;">
								  <DetailsFile :labelSpan='4' :textSpan="20" :label='"文件信息"' :files='makeFileList'></DetailsFile>
								</a-col>
							</a-row>
          </template>
        </div>
      </div>
    </div>
		<div class="footer">
			<p>主办单位：全国水产技术推广总站、中国水产学会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
			<p>COPYRIGHT&copy;-{{$com.getCurrentYear()}} ALL RIGHTS RESERVED</p>
		</div>
	</div>
</template>

<style scoped>
.loginFrame { position: relative; width: 100%; min-width: 1000px; margin: 0px; padding: 0px; padding: 80px 0; background-size: 100%;  background-repeat:repeat-y }
.cmsPublishFrame{ position: relative; min-height: 800px;  width: 1000px; background-color: #fff; margin: 0 auto;}
.cmsPublishFrameTitle { padding-top: 16px; margin:0 16px 16px;  border-bottom: 1px solid #E0E0E0; padding-bottom: 10px;}
.cmsPublishFrameTitle p{ margin: 0;color: rgba(0, 0, 0, 0.7); line-height: 1.5em}
.cmsPublishFrameTitle .titleName{ font-size: 18px;  font-weight: bold;}
.cmsPublishFrameTitle .titleSub{ font-size: 14px;}
.cmsPublishFrameTitle .close{ margin-left: 5px;}
.footer { height: 50px; width: 100%; text-align: center; position: absolute; bottom: 10px; left: 0px; color: #cfd7f3; font-size: 14px;}
.footer p {	margin: 0; }
.footer p:last-of-type { 	color: #829bdc; }
</style>
<script>

export default {
  data() {
    return {
      id:this.$route.params.id,
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
    },
  },
  methods: {

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
          console.log(this.noticeDetail)

        }else{
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
