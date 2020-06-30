<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">修改轮播图</span>
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
                  <a-form-item label="上传附件" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <FileUpload ref="childFile"
                      :multiple="false"
                      :maxCount="1"
                      :defaultFileList="defaultFileList"
                      :acceptTypes="uploadConfig.acceptTypesArray"
                      :maxFileSize="uploadConfig.maxSize"
                      :timestamp="Date.now()"
                    />
                  </a-form-item>
                  <a-form-item label="图片预览" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <img :src="imgPlaceholder" width="40%">
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
      ready          : false,
      imgPlaceholder : {},
      uploadFileList : [],
      defaultFileList: [],
      uploadConfig   : {
        maxSize         : 1*1024*1024,
        acceptTypesArray: [ 'jpg', 'jpeg', 'png' ]
      }
    }
  },
  mounted() {
    this.getDefaultFile()
  },
  components: {
    FileUpload
  },
  methods: {
    saveBanner() {
      let that = this
      this.imgContent = this.$refs.childFile.getUploadFileList()
      this.$ajax
        .put({
          url   : this.$api.PUT_BANNER.replace('{id}', this.$route.params.id), // 修改的bannerId
          params: {
            bannerName: this.bannerCreateForm.getFieldValue('title'),
            linkUrl   : this.bannerCreateForm.getFieldValue('jumpHref'),
            imgId     : that.imgContent[0].uid,
            id        : this.$route.params.id
          }
        })
        .then(res => {
          if (res.code === '200') {
            this.$message.success('修改成功')
            this.$router.push({
              name: '/cms/homepageInfoMaintain'
            })
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    getDefaultFile() {
      let that = this
      let query = this.$route.params.id
      this.$ajax
        .get({
          url: this.$api.GET_BANNER_DETAIL.replace('{id}', query)
        })
        .then(res => {
          if (res.code === '200') {
            this.bannerCreateForm.setFieldsValue({
              title   : this.$com.confirm(res, 'data.content.bannerName', null),
              jumpHref: this.$com.confirm(res, 'data.content.linkUrl', null)
            })
            that.defaultFileList.push(
              {
                'url'   : this.$com.confirm(res, 'data.content.filePath', {}),
                'uid'   : this.$com.confirm(res, 'data.content.imgId', {}),
                'name'  : this.$com.confirm(res, 'data.content.fileName', {}),
                'status': this.$com.confirm(res, 'data.content.status', {})
              }
            )
            that.imgPlaceholder = this.$com.confirm(res, 'data.content.filePath', {})
            
          } else {
            this.$message.error(res.msg)
          }
        })
    }
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
