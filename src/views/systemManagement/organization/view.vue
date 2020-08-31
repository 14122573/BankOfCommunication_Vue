<template>
	<div class="portalDetailWapper">
    <div class="portalDetailTitle">
			<span class="title">组织机构</span>
			<div class="detailOperations">
				<a-button @click="$router.back()"> 返回 </a-button>
				<a-button type="danger" v-if="$permission('P01004')" ghost @click="handleDel"> 删除 </a-button>
			</div>
		</div>
    <div class="portalDetailContentWapper">
      <div class="portalDetailContentBody">
        <div class="layoutMargin detailsPartSection contentPadding">
          <a-row type="flex" justify="start" class="formItemLine" style="margin-bottom:16px;">
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"组织机构名称"' :text='!detail.groupName?"暂无":detail.groupName'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"联系人"' :text='!detail.contact?"暂无":detail.contact'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"联系电话"' :text='!detail.contactPhone?"暂无":detail.contactPhone'></DetailsItem>
            </a-col>
          </a-row>
          <a-row type="flex" justify="start" class="formItemLine" style="margin-bottom:16px;">
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"所属行政区域"' :text='!detail.areaName?"暂无":detail.areaName'></DetailsItem>
            </a-col>
          </a-row>
          <a-row type="flex" justify="start" class="formItemLine" style="margin-bottom:16px;">
            <a-col span="16">
              <DetailsItem :labelSpan='2' :textSpan="18" :label='"地址"' :text='!detail.addr?"暂无":detail.addr'></DetailsItem>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      detail : {},
      loading: true
    }
  },
  methods: {
    handleDel() {
      this.$ajax.post({
        url: this.$api.DELETE_ORGANIZATION_LIST.replace('{id}', this.$route.query.id)
      }).then(res => {
        if (res.code == '200') {
          this.$message.success('删除成功！')
          this.$router.push({
            name: '/systemManagement/organization'
          })
        } else {
          this.$message.success('删除失败！')
        }
      })
    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST_DETAIL.replace('{id}', this.$route.query.id)
      }).then(res => {
        this.loading = false
        this.detail = this.$com.confirm(res, 'data.content', {})
      })
    }
  },
  mounted() {
    this.getDetail()
  }
}
</script>

<style scoped>
	.colMargin {
		margin-bottom: 20px;
	}

	.colLabel {
		text-align: right;
	}
</style>
