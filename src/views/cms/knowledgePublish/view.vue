<template>
  <div :class="{'loginFrame':true,'minHeight':knowledgeDetails.type=='0'}" :style="'background-image: url(' + require('@/assets/images/bg-cmsview.jpg') + ')'"  v-if="knowledgeDetails.title">
    <div class="cmsPublishFrame">
      <div class="cmsPublishFrameTitle">
        <a-row type="flex" justify="space-between" align="middle" :gutter='16'>
          <a-col :span="20">
            <p class="titleName">{{knowledgeDetails.title}}</p>
            <p class="titleSub"><span class="subcell"><span class="label">作者：</span>{{knowledgeDetails.author}}</span> <span class="subcell"><span class="label">年代：</span>{{knowledgeDetails.years}}</span></p>
          </a-col>
          <a-col :span="4"> <a-button type="primary" @click="goBackList" ghost>返回知识文献列表 </a-button> </a-col>
        </a-row>
      </div>
      <div class="layoutMargin cmsContentBody" v-if='ready'>
        <div class="cmsContentHtml" v-html="knowledgeDetails.content"></div>
        <div class="cmsContentAttachments">
          <a-row class="attachmentsPart">
            <a-col span="4">相关线上视频地址：</a-col>
            <a-col span="20">
              <a class="item" v-for="(item,index) in videoUrlList" :key="index" :href="videoUrlList[index]" target="_blank"><a-icon type="link" />{{videoUrlList[index]}}</a>
            </a-col>
          </a-row>
          <a-row class="attachmentsPart">
            <a-col span="4">相关附件文档：</a-col>
            <a-col span="20">
              <a class="item" v-for="(item,index) in fileList" :key="index" :href="item.path" target="_blank"><a-icon type="link" />{{item.name}}</a>
            </a-col>
          </a-row>
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
.cmsPublishFrame{ position: relative; min-height: 700px; width: 1000px; background-color: #fff; margin: 0 auto;}
.cmsPublishFrameTitle { padding-top: 16px; margin:0 16px 16px; padding-bottom: 10px;}
.cmsPublishFrameTitle p{ line-height: 1.5em}
.cmsPublishFrameTitle .titleName{ font-size: 20px; font-weight: bold; }
.cmsPublishFrameTitle .titleSub{ color:#1890ff; margin: 0;}
.cmsPublishFrameTitle .subcell { padding-right: 32px;}
.cmsPublishFrameTitle .subcell .label {color: rgba(0, 0, 0, 0.4);  }
.cmsContentBody { position: relative; margin-top: 16px; padding: 16px 8px ; }
.cmsContentAttachments { margin-top: 30px; padding-top: 24px; border-top:2px solid rgba(0, 0, 0, 0.1)}
.attachmentsPart { margin-bottom: 16px;}
.attachmentsPart .item{ padding-right: 16px; cursor: pointer;}
.footer { height: 50px; width: 100%; text-align: center; position: absolute; bottom: 10px; left: 0px; color: #cfd7f3; font-size: 14px;}
.footer p {	margin: 0; }
.footer p:last-of-type { 	color: #829bdc; }
</style>
<script>

import cpdf from '@/components/theThreeParty/pdf.vue'
export default {
  components: { cpdf },
  data() {
    return {
      id              : this.$route.params.id,
      knowledgeDetails: {},
      videoUrlList    : [],
      fileList        : [],
      ready           : false
    }
  },
  mounted() {
    this.getDetail()
  },
  computed: {
  },
  methods: {
    goBackList(){
      const token = this.$cookie.get('token')
      if (token !=undefined && token !=null && 'string'==typeof token) {
        this.$router.push({ name: '/cms/knowledgePublish' })
      }else{
        this.$router.push({ name: '/cms/knowledgeAnonymous' })
      }
    },

    /**
     * 获取详情
     */
    getDetail(){
      this.$ajax.get({
        url: this.$api.GET_CMS_KNOWLEDGE_DETAIL.replace('{id}', this.id)
      }).then(res => {
        if(res.code =='200'){
          this.knowledgeDetails = this.$com.confirm(res, 'data.content', {})
          // 根据是否为匿名浏览属性，判断是否需要用户已登录
          if(this.knowledgeDetails.anonymous=='1'){
            //为非匿名浏览，就需要token
            const token = this.$cookie.get('token')
            if (!token) { // 不满足非匿名浏览条件，先去登录
              this.$router.push({ name: 'login' })
            }else{ // 满足条件，做数据整理展示
              this.getAttachments()
            }
          }else{
            this.getAttachments()
          }

          this.ready=true

        }else{
          this.$message.error(res.msg)
        }
      })
    },

    /**
     * 整理知识文库中需要展示的附件内容
     */
    getAttachments(){
      const attachments = !this.knowledgeDetails.attachments?[]:this.knowledgeDetails.attachments

      // let attachments = testArr
      for(let i=0;i<attachments.length;i++){
        switch (attachments[i].type) {
        case '1'://附件
          this.fileList.push({
            name: attachments[i].fileName,
            path: attachments[i].filePath
          })
          break
        case '2'://视频
          this.videoUrlList.push(attachments[i].filePath)
          break
        default:
          break
        }
      }

    }
  }
}
</script>

<style scoped>

</style>
