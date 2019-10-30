<template>
  <div :class="{'loginFrame':true,'minHeight':knowledgeDetails.type=='0'}" :style="'background-image: url(' + require('@/assets/images/bg.jpg') + ')'"  v-if="knowledgeDetails.title">
    <div class="knowledgeFrame">
      <div class="knowledgeFrameTitle">
        <a-row type="flex" justify="space-between" align="top" :gutter='16'>
          <a-col :span="20">
            <p class="titleName">{{knowledgeDetails.title}}</p>
            <p class="titleSub"><span style="padding-right:16px">作者：{{knowledgeDetails.author}}</span> <span>年代：{{knowledgeDetails.years}}</span></p>
          </a-col>
          <a-col :span="4"> <a-button type="primary" @click="$router.back()" ghost> 返回知识文献列表 </a-button> </a-col>
        </a-row>
      </div>
      <div class="layoutMargin" style="padding-bottom:16px" >
        <template v-if="knowledgeDetails.type=='1'">
          <cpdf :pdfurl='"http://iftp.omniview.pro/group1/M00/00/16/CgAB212oLYqABmhpAAODjgte9WM808.pdf"'></cpdf>
        </template>
        <template v-else-if="knowledgeDetails.type=='0'">
          <!-- <cpdf :pdfurl='"http://iftp.omniview.pro/group1/M00/00/16/CgAB212oLYqABmhpAAODjgte9WM808.pdf"'></cpdf> -->
          <iframe height=498 width='100%' :src='"http://player.youku.com/embed/XNDQxMTcwOTczNg=="' frameborder=0 ></iframe>
        </template>
      </div>
    </div>
		<div class="footer">
			<p>主办单位：全国水产技术推广总站、中国水产学会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
			<p>COPYRIGHT&copy;-{{$com.getCurrentYear()}} ALL RIGHTS RESERVED</p>
		</div>
	</div>
</template>

<style scoped>
.loginFrame { position: relative; width: 100%; min-width: 1000px; margin: 0px; padding: 0px; padding: 80px 0; background-size: cover;  background-repeat:repeat-y }
.loginFrame.minHeight { min-height: 100%}
.knowledgeFrame{ position: relative; width: 1000px; background-color: #fff; margin: 0 auto;}
.knowledgeFrameTitle { padding-top: 16px; margin:0 16px 16px;  border-bottom: 1px solid #E0E0E0; padding-bottom: 10px;}
.knowledgeFrameTitle p{ margin: 0;color: rgba(0, 0, 0, 0.7); line-height: 1.5em}
.knowledgeFrameTitle .titleName{ font-size: 18px;  font-weight: bold;}
.knowledgeFrameTitle .titleSub{ font-size: 14px;}
.knowledge{ font-size: 14px; padding:10px 16px; line-height:1em; color:rgba(0,0,0,0.7); cursor: pointer;}
.knowledge.hasBg{ background-color: #F3F8FA}
.knowledge:hover,.knowledge.hasBg:hover{ background-color: #E8F8FF}
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
      id:this.$route.params.id,
      knowledgeDetails:{},
    }
  },
  mounted() {
    this.getDetail()
  },
  computed:{
  },
  methods: {
    /**
     * 获取详情
     */
    getDetail(){
      this.$ajax.get({
        url: this.$api.GET_CMS_KNOWLEDGE_DETAIL.replace('{id}', this.id)
      }).then(res => {
        if(res.code =='200'){
          this.knowledgeDetails = this.$com.confirm(res, 'data.content', {})
          console.log(this.knowledgeDetails)
          this.checkAnonymous()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    checkAnonymous(){
      if(this.knowledgeDetails.anonymous=='1'){ //为非匿名浏览，就需要token
        let token = this.$cookie.get('token')
        if (!token) {
          this.$router.push({name:'login'})
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
