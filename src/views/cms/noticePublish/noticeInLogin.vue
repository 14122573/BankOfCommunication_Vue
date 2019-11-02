<template>
  <div class="noticeInLogin" v-if="isReady">
    <a-row class="noticeInLoginTitle" type="flex" justify="space-between" align="middle" :gutter='16' >
      <a-col :span="18"><span class="title">公告栏</span></a-col>
      <a-col :span="6" class="algin-right"><span @click="$router.push({name:'/cms/noticePublish'})" class="more">更多>></span></a-col>
    </a-row>
    <div class="noticeInLoginList">
      <template v-if='noticeList.length>0'>
        <template  v-for="(notice,index) in noticeList">
        <div @click="goToView(notice.id)" class='notice' :key="index">
          <a-row type="flex" justify="space-between" align="top" :gutter='16' >
            <a-col :span="19">
              <span class="title" style="padding-right:8px">{{notice.title}}</span>
              <a-tag v-if="notice.isVote=='1'" color="orange">投票结果公示</a-tag>
            </a-col>
            <a-col :span="5" class="algin-right">{{notice.startTime.split(' ')[0]}}</a-col>
          </a-row>
        </div>
        </template>
      </template>
      <template v-else>
        <div class="noNoticeBox">
          <p class="tips">暂无通知公告</p>
        </div>
      </template>
    </div>
  </div>

</template>
<style scoped>
.noticeInLogin {margin: 0 16px; padding-top: 16px;}
.noticeInLoginTitle { color: white; margin-bottom: 8px}
.noticeInLoginTitle .title{ font-size: 20px;}
.noticeInLoginTitle .more{ cursor: pointer}
.noticeInLoginList { min-height: 240px}
.notice{ padding:8px 0; line-height:1.5em; color:rgba(255,255,255,0.8); cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.2)}
.notice .title {
  font-weight: bold; padding-right:8px; word-break: break-all;
  display: inline-block; width: 100%; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
 }
 .noNoticeBox {height: 240px; color: white; font-size: 30px; display: flex;flex-direction: column; align-items: center;justify-content: center;}
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
        pageSize: 5,
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
        this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
        this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
        this.pagination.current = this.pagination.pageNo
        this.noticeList = this.$com.confirm(res, 'data.content', [])
        this.isReady = true
      })
    }
  }
}
</script>

