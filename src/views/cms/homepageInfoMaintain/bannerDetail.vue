<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">轮播图详情</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
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
                    <a-input v-decorator="['lunboName',{initialValue: lunboName }]" disabled></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="跳转链接" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['jumpHref', {initialValue: jumpHref}]" disabled></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="图片预览" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <img :src="imgPlaceholder" width="40%">
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
export default {
  data() {
    return {
      data            : [],
      bannerId        : null,
      detailDesc      : [],
      imgPlaceholder  : [],
      lunboName       : null,
      jumpHref        : null,
      bannerCreateForm: this.$form.createForm(this)
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let that = this
      this.bannerId = this.$route.params.id
      this.$ajax
        .get({
          url: this.$api.GET_BANNER_DETAIL.replace('{id}', this.bannerId)
        })
        .then(res => {
          if (res.code === '200') {
            that.data = this.$com.confirm(res, 'data.content', [])
            that.imgPlaceholder = this.$com.confirm(res, 'data.content.filePath', [])
            that.lunboName = this.$com.confirm(res, 'data.content.fileName', [])
            that.jumpHref = this.$com.confirm(res, 'data.content.filePath', [])
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
  padding: 30px 30px;
}
</style>
