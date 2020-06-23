<template>
  <div class="portalDetailWapper">
    <div class="portalDetailTitle">
      <span class="title">轮播图排序</span>
      <div class="detailOperations">
        <a-button @click="$router.back()">取消</a-button>
        <a-button type="primary" @click="saveBanner()">保存</a-button>
      </div>
    </div>
    <div class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="bannerCreateForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">轮播图信息</p>
            <div style="margin:0 16px;">
              
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
