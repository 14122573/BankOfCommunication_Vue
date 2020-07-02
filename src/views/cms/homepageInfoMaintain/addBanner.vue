<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">新增轮播图</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
				<a-button type="primary" @click='saveBanner()'>保存</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="bannerCreateForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">轮播图信息</p>
            <div style="margin:0 16px;">
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="轮播图名称" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['title',{validateTrigger: 'blur',rules:rules.title}]" placeholder="请输入轮播图名称"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="跳转链接" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['jumpHref',{validateTrigger: 'blur',rules:rules.jumpHref}]" placeholder="请输入轮播图链接"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="上传图片" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <FileUpload ref="childFile"
                      :multiple="false"
                      :maxCount="1"
                      :acceptTypes="uploadConfig.acceptTypesArray"
                      :maxFileSize="uploadConfig.maxSize"
                      :timestamp="Date.now()"
                    />
                     <a-alert style="margin-top:16px" message="可上传最大1M的JPG, JPEG, PNG图片" type="info" showIcon />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/Upload/fileUpload'
export default {
  data() {
    return {
      data            : [],
      imgContent      : [],
      detailDesc      : [],
      bannerCreateForm: this.$form.createForm(this),
      rules           : {
        title: [
          { required: true, whitespace: true, message: '请输入轮播图名称!' },
        ],
        jumpHref: [
          { required: false, whitespace: true, message: '请输入跳转链接!' }
        ],
      },
      ready         : false,
      uploadFileList: [],
      uploadConfig  : {
        maxSize         : 1*1024*1024,
        acceptTypesArray: [ 'jpg', 'jpeg', 'png' ]
      }
    }
  },
  components: {
    FileUpload
  },
  methods: {
    saveBanner() {
      let that = this
      let query = this.$api.POST_BANNER
      this.imgContent = this.$refs.childFile.getUploadFileList()
      if (this.imgContent.length == []) {
        this.$message.error('请至少上传一张图片!')
      } else {
        this.$ajax
          .post({
            url   : query,
            params: {
              bannerName: this.bannerCreateForm.getFieldValue('title'),
              linkUrl   : this.bannerCreateForm.getFieldValue('jumpHref'),
              imgId     : that.imgContent[0].uid
            }
          })
          .then(res => {
            if (res.code === '200') {
              this.$message.success('轮播图添加成功')
              this.$router.push({
                name: '/cms/homepageInfoMaintain'
              })
            
            } else {
              this.$message.error(res.msg)
            }
          })
      }
    },
  }
}
</script>

<style scoped>
.detailWrapperTitle {
  background-color: #fff;
  margin: 10px 10px;
}

.detailWrapperContent {
  background-color: #fff;
  margin: 10px 10px;
  height: 300px;
  padding: 30px 30px;
}
</style>
