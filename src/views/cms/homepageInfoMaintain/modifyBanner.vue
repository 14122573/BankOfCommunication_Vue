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
                  <a-form-item label="上传图片" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <ImgUpload ref="childFile"
                      :multiple="false"
                      :maxCount="1"
                      :defaultFileList="defaultFileList"
                      :acceptTypes="uploadConfig.acceptTypesArray"
                      :maxFileSize="uploadConfig.maxSize"
                      :timestamp="Date.now()"
                      @change="limousine"
                    />
                  </a-form-item>
                  <a-form-item label="图片预览" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <img :src="imgPlaceholder" width="40%">
                    <a-alert style="margin-top:16px" message="可上传最大1M的JPG, JPEG, PNG图片，图片尺寸1462 * 420" type="info" showIcon />
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
import ImgUpload from '@/components/Upload/imgUpload'
export default {
  data() {
    return {
      isTriggered     : false, // 检查上传框是否被修改
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
      parseImgId     : null,
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
    ImgUpload
  },
  methods: {
    /**
     * @description 轮播图上传是否被触发
     * @param {Array} value 上传的图片地址
     */
    limousine(value) {
      this.isTriggered = true
      if(value.length !== 0) {
        this.imgPlaceholder = []
        this.imgPlaceholder = value[0].url
      } else {
        this.imgPlaceholder = []
      }
    },

    /**
     * @description 保存轮播图
     */
    saveBanner() {
      let that = this
      let params = {}
      if(this.isTriggered == false) {
        params = {
          bannerName: this.bannerCreateForm.getFieldValue('title'),
          linkUrl   : this.bannerCreateForm.getFieldValue('jumpHref'),
          imgId     : this.parseImgId,
          id        : this.$route.params.id
        }
      } else {
        this.imgContent = this.$refs.childFile.getUploadFileList()
        params = {
          bannerName: this.bannerCreateForm.getFieldValue('title'),
          linkUrl   : this.bannerCreateForm.getFieldValue('jumpHref'),
          imgId     : that.imgContent[0].uid,
          id        : this.$route.params.id
        }
      }

      this.$ajax
        .put({
          url   : this.$api.PUT_BANNER.replace('{id}', this.$route.params.id), // 修改的bannerId
          params: params
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
      // }
    },

    /**
     * @description 获取当前轮播图内容
     */
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
            this.parseImgId = this.$com.confirm(res, 'data.content.imgId', null),
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
