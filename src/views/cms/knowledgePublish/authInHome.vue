<template>
  <div class="knowledgeSection" v-if="isReady">
    <a-row class="knowledgeInHomeTitle" type="flex" justify="space-between" align="middle" :gutter='16' >
      <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">新闻资讯</span></a-col>
      <a-col :span="6" class="algin-right"><span v-if='knowledgeList.length>0' @click="$router.push({name:'/cms/industry'})" class="more">查看全部</span></a-col>
    </a-row>

    <div class="knowledgeInHomeList">
      <template v-if='knowledgeList.length>0'>
        <template v-for="(knowledge,index) in knowledgeList">
          <div @click="goToView(knowledge.id)" :class='{"knowledge":true,"hasBg":(index+1)%2==1}' :key="index" style="margin-bottom: 5px">
            <a-row>
              <a-col :span='18' style="padding-left: 8px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">
                {{knowledge.title}}
              </a-col>
              <a-col :span='6' style="text-align: right; font-weight: normal">
                {{knowledge.releaseDate}}
              </a-col>
            </a-row>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="noDataBox">
          <p class="tips">暂无知识文献</p>
        </div>
      </template>
    </div>
  </div>

</template>
<style scoped>
.knowledgeSection {margin: 0 16px; padding-top: 16px;}
.knowledgeInHomeTitle { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid  rgba(0,0,0,0.1)}
.knowledgeInHomeTitle .divider{ font-size: 16px; background-color:#1890ff; height: 16px; width: 5px; border-radius: 4px;}
.knowledgeInHomeTitle .title{ font-size: 16px;}
.knowledgeInHomeTitle .more{ cursor: pointer; color: #1890ff}

.knowledgeInHomeList { min-height: 360px}
.knowledge{ padding:2px 0;line-height:1.5em;  cursor: pointer; color:rgba(0,0,0,0.6);
font-weight: bold; padding-right:8px; word-break: break-all; display: inline-block; width: 100%; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
.noDataBox {height: 240px; color:rgba(0,0,0,0.6); font-size: 30px; display: flex;flex-direction: column; align-items: center;justify-content: center;}
</style>
<script>
import common from '@/util/common'
export default {
  name: 'authInHomeList',
  data() {
    return {
      isReady      : false,
      knowledgeList: [],
      searchForm   : {
        // type_in:'0,1',
        anonymous_in: '0,1',
        status_in   : '1'
      },
      pagination: {
        pageNo        : 1,
        pageSize      : 10,
        total         : 0,
        current       : 1,
        defaultCurrent: 1,
      },
    }
  },
  mounted() {
    this.getKnowLedgeList()
  },
  methods: {
    goToView(id){
      this.$router.push({
        name  : 'industryDetails',
        params: {
          id: id
        }
      })
    },

    /**
     * 调用结构，查询表单要求的知识文库资料
     */
    getKnowLedgeList(){
      let searchParms
      searchParms = Object.assign({}, this.searchForm, {
        pageNo         : this.pagination.pageNo,
        pageSize       : this.pagination.pageSize,
        titleManageId  : this.$titleId.industryId,
        createTime_desc: 'desc'
      })
      this.$ajax.get({
        url   : this.$api.GET_ANNOUNCE_LIST,
        params: searchParms
      }).then(res => {
        this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
        this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
        this.pagination.current = this.pagination.pageNo
        this.knowledgeList = this.$com.confirm(res, 'data.content', [])
        this.isReady = true
      })
    }
  }
}
</script>

