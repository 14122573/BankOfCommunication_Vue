<template>
  <div class="portalDetailWapper">
      <div class="portalDetailTitle">
        <span class="title">详情</span>
        <div class="detailOperations">
           <!-- <a-button  type="danger" @click="delectById($route.query.id)">删除</a-button> -->
          <a-button @click="$router.back()">返回</a-button>
        </div>
      </div>
      <div class="portalDetailContentWapper">
        <div class="portalDetailContentBody">
        <div class="layoutMargin layoutPadding detailsPartSection">
          <a-row :gutter="8" class="detailsPartLine">
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"模块名称"' :text='!detail.modName?"暂无":detail.modName'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"功能点描述"' :text='!detail.desPoint?"暂无":detail.desPoint'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"请求方式"' :text='!detail.method?"暂无":detail.method'></DetailsItem>
            </a-col>
          </a-row>
          <a-row :gutter="8" class="detailsPartLine">
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"操作姓名"' :text='!detail.opeName?"暂无":detail.opeName'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"操作人账户"' :text='!detail.opeUser?"暂无":detail.sysName'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"请求ip"' :text='!detail.reqIp?"暂无":detail.reqIp'></DetailsItem>
            </a-col>

          </a-row>

           <a-row :gutter="8" class="detailsPartLine">
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"响应编码"' :text='!detail.statusCode?"暂无":detail.statusCode'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"操作日期"' :text='!detail.opeTime?"暂无":detail.opeTime'></DetailsItem>
            </a-col>
             <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"系统名称"' :text='!detail.sysName?"暂无":detail.sysName'></DetailsItem>
            </a-col>
          </a-row>
          <a-row :gutter="8" class="detailsPartLine">
            <a-col span="16">
              <a-row type="flex" justify="start">
                <a-col span="4" style="text-align:right;color:#999">请求url：</a-col>
                <a-col span="18">
                  {{detail.reqUrl || "暂无"}}
                </a-col>
              </a-row>
            </a-col>
          </a-row>
           <a-row :gutter="8" class="detailsPartLine">
            <a-col span="16">
              <a-row type="flex" justify="start">
                <a-col span="4" style="text-align:right;color:#999">请求参数：</a-col>
                <a-col span="18">
                  {{detail.reqParams || "暂无"}}
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="8" class="detailsPartLine">
            <a-col span="16">
              <a-row type="flex" justify="start">
                <a-col span="4" style="text-align:right;color:#999">备注：</a-col>
                <a-col span="18">
                  {{detail.notes || "暂无"}}
                </a-col>
              </a-row>
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
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    handleOk(e) {
    },
    getDetail(){
      this.$ajax.get({
        url: this.$api.GET_OPERLOG_PARTICULARS_BYID.replace('{id}', this.$route.query.id)
      }).then(res => {
        this.detail = res.data.content
      })
    },
    // 删除单个
    // delectById(item){
    //   const _this = this
    //   if(!!item) {
    //     this.$modal.confirm({
    //       title     : '是否确认删除此数据？',
    //       content   : '此操作不可撤销',
    //       okText    : '确认',
    //       okType    : 'danger',
    //       cancelText: '取消',
    //       onOk() {
    //         _this.$ajax.post({
    //             url: _this.$api.POST_OPERLOG_DELECT_BYID.replace('{id}', item)
    //         }).then(res => {
    //             _this.$router.push({name : '/systemManagement/operlog'})
    //         })
    //       }
    //     })
    //   }
    // }
  },
};
</script>
<style scoped>
</style>
