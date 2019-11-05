<template>
	<div class="loginFrame" :style="'background-image: url(' + require('@/assets/images/bg.jpg') + ')'">
    <div class="cmsPublishFrame">
      <div class="cmsPublishFrameTitle">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="4"><span class="titleName">通知公告</span></a-col>
          <a-col :span="2"><a-button type="primary" @click="$router.push({name:'login'})" ghost> 返回 </a-button> </a-col>
        </a-row>
      </div>
      <template v-if="isReady">
        <div style="padding:16px">
          <template v-for="(notice,index) in noticeList">
          <div @click="goToView(notice.id)" :class='{"notice":true,"hasBg":(index+1)%2==1}' :key="index">
            <a-row type="flex" justify="space-between" align="middle" :gutter='16'>
              <a-col :span="20"><span style="padding-right:8px">{{notice.title}}</span><a-tag v-if="notice.isTop=='1'" color="blue">置顶</a-tag><a-tag v-if="notice.isVote=='1'" color="orange">投票结果公示</a-tag></a-col>
              <a-col :span="4">{{notice.startTime}}</a-col>
            </a-row>
          </div>
          </template>
        </div>
        <a-row style="padding:0 16px" type="flex" justify="end">
          <a-col>
            <a-pagination size="small" :defaultPageSize="pagination.pageSize" showQuickJumper @change="onPageChange" :current="pagination.pageNo" :total="pagination.total" ></a-pagination>
          </a-col>
        </a-row>
      </template>
    </div>
		<div class="footer">
			<p>主办单位：全国水产技术推广总站、中国水产学会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
			<p>COPYRIGHT&copy;-{{$com.getCurrentYear()}} ALL RIGHTS RESERVED</p>
		</div>
	</div>
</template>
<style scoped>
.loginFrame { width: 100%; height: 100%; min-width: 1000px;  min-height: 700px; margin: 0px; padding: 0px; position: relative; background-size: cover; }
.cmsPublishFrame{ width: 1000px; background-color: #fff;  min-height: 600px; height: 80%; position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto;}
.cmsPublishFrameTitle { margin: 16px;  border-bottom: 1px solid #E0E0E0; padding-bottom: 10px;}
.cmsPublishFrameTitle .titleName{ font-size: 18px; color: rgba(0, 0, 0, 0.7);}
.notice{ font-size: 14px; padding:10px 16px; line-height:1em; color:rgba(0,0,0,0.7); cursor: pointer;}
.notice.hasBg{ background-color: #F3F8FA}
.notice:hover,.notice.hasBg:hover{ background-color: #E8F8FF}
.footer { height: 50px; width: 100%; text-align: center; position: absolute; bottom: 0px; left: 0px; color: #cfd7f3; font-size: 14px;}
.footer p {	margin: 0; }
.footer p:last-of-type { 	color: #829bdc; }
</style>
<script>
export default {
  beforeCreate() {
  },
  data() {
    return {
      isReady:false,
      noticeList:[],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
      },
    }
  },
  mounted() {
    this.getNoticeList()
  },
  computed: {

  },
  watch: {

  },
  methods:{
    goToView(id){
      this.$router.push({
        name:'/cms/noticePublish/view',
        params:{
          id:id
        }
      })
    },
    /**
     * 记录翻页，并获取当前页的数据
     * @param {Number} current 当前页码
     */
    onPageChange(current) {
      this.pagination.current = current
      this.pagination.pageNo = current
      this.getKnowLedgeList()
    },
    /**
     * 调用接口，查询表单要求的通知公告资料
     */
    getNoticeList(){
      let searchParms
      searchParms = Object.assign({},{
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        status_in: '1'
      })
      this.$ajax.get({
        url: this.$api.GET_CMS_NOTICE_LIST,
        params: searchParms
      }).then(res => {
        if(!!res && !!res.code && res.code =='200'){
          this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
          this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
          this.pagination.current = this.pagination.pageNo
          this.noticeList = this.$com.confirm(res, 'data.content', [])
        }else{
          this.noticeList = []
        }
      })
    }
  }
}
</script>

