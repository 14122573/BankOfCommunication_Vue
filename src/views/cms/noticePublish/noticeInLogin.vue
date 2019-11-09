<template>
  <div class="noticeSection" v-if="isReady">
    <template v-if="showPosition == 'login'">
      <a-row class="noticeInLoginTitle" type="flex" justify="space-between" align="middle" :gutter='16' >
        <a-col :span="18"><span class="title">公告栏</span></a-col>
        <a-col :span="6" class="algin-right"><span v-if='noticeList.length>0' @click="$router.push({name:'/cms/noticePublish'})" class="more">更多>></span></a-col>
      </a-row>
    </template>
    <template v-else-if="showPosition == 'home'">
      <a-row class="noticeInHomeTitle" type="flex" justify="space-between" align="middle" :gutter='16' >
        <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">公告栏</span></a-col>
        <a-col :span="6" class="algin-right"><span v-if='noticeList.length>0' @click="$router.push({name:'/cms/noticePublish'})" class="more">查看全部</span></a-col>
      </a-row>
    </template>

    <div :class="listCssClass">
      <template v-if='noticeList.length>0'>
        <template  v-for="(notice,index) in noticeList">
        <div @click="goToView(notice.id)" class='notice' :key="index">
          <a-row type="flex" justify="space-between" align="top" :gutter='16' >
            <a-col :span="18">
              <span class="title" style="padding-right:8px">{{notice.title}}</span>
              <a-tag v-if="notice.isVote=='1'" color="orange">投票结果公示</a-tag>
            </a-col>
            <a-col :span="6" class="algin-right">{{notice.startTime.split(' ')[0]}}</a-col>
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
.noticeSection {margin: 0 16px; padding-top: 16px;}

.noticeInLoginTitle { color: white; margin-bottom: 8px}
.noticeInLoginTitle .title{ font-size: 20px;}
.noticeInLoginTitle .more{ cursor: pointer}

.noticeInHomeTitle { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid  rgba(0,0,0,0.1)}
.noticeInHomeTitle .divider{ font-size: 16px; background-color:#1890ff; height: 16px; width: 5px; border-radius: 4px;}
.noticeInHomeTitle .title{ font-size: 16px;}
.noticeInHomeTitle .more{ cursor: pointer; color: #1890ff}

.noticeInLoginList { min-height: 240px}
.noticeInHomeList { min-height: 320px}
.notice{ line-height:1.5em;  cursor: pointer; }
.notice .title { font-weight: bold; padding-right:8px; word-break: break-all; display: inline-block; width: 100%; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
.noNoticeBox {height: 240px; color: white; font-size: 30px; display: flex;flex-direction: column; align-items: center;justify-content: center;}
.noticeInLoginList .notice{ padding:8px 0; color:rgba(255,255,255,0.8); border-bottom: 1px solid rgba(255,255,255,0.2)}
.noticeInLoginList .noNoticeBox{ color: white}
.noticeInHomeList .notice { padding:2px 0;}
.noticeInHomeList .notice, .noticeInHomeList .noNoticeBox { color:rgba(0,0,0,0.6);}

</style>
<script>
import common from '@/util/common'
export default {
  name:'noticeList',
  props:{
    showPosition:{
      type:String,
      required:true,
      default(){
        return 'login'
      },
      validator (value) {
        // login-登录页 home-工作台
        return common.oneOf(value, ['login', 'home'])
      }
    },
    pageSize:{
      type:Number,
      default(){
        return 5
      },
    }
  },
  data() {
    return {
      isReady:false,
      noticeList:[],
      pagination: {
        pageNo: 1,
        pageSize: this.pageSize,
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
    listCssClass(){
      let cssClass = ''
      switch (this.showPosition) {
      case 'login':
        cssClass = 'noticeInLoginList'
        break
      case 'home':
        cssClass = 'noticeInHomeList'
        break

      default:
        break
      }
      return cssClass
    }
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
        params: searchParms,
        hideLoading:true,
        routername:'login'
      }).then(res => {
        if(!!res && !!res.code && res.code =='200'){
          this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
          this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
          this.pagination.current = this.pagination.pageNo
          this.noticeList = this.$com.confirm(res, 'data.content', [])
        }else{
          this.noticeList = []
        }
        this.isReady = true
      })
    }
  }
}
</script>

