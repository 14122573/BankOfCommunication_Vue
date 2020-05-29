<template>
  <div class="reviewSection">
    <a-row class="reviewInHomeTitle" type="flex" justify="space-between" align="middle" :gutter='16' >
      <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">待办评审</span></a-col>
    </a-row>
    <template v-if="sysListForSearch.length>0 && reviewTypeList.length>0 && preparate.isReady">
      <template v-if="reviewList.length>0">
        <div v-for="(review,index) in reviewSingleList" :key="index">
          <a-row type="flex" justify="space-between" align="middle" :gutter='16' >
            <a-col :span="17" style="display:flex;align-items: center;">
              <p>{{review.companyCode}} 申报(请) “{{systemName(review.systemCode)}}”</p>
            </a-col>
            <a-col :span="7" class="algin-right">
              <span class="contentOperate" @click="goMicReview(review.systemCode,review.busCode,review.taskCode)">去评审</span>
            </a-col>
          </a-row>
        </div>
        <div style="padding-top:16px;height:50px;">
            <a-pagination style="float:right" size="small" @change="onPageChange" :pageSize="reviewListPage.pageSize" :current="reviewListPage.current" :total="reviewListPage.total" />
        </div>
      </template>
      <template v-else>
        <a-alert message="暂无数据" type="info" >
          <p slot="description"> 您暂无需要评审的内容 </p>
        </a-alert>
      </template>
    </template>
    <template v-else>
      <a-skeleton active />
    </template>
  </div>
</template>
<script>
import { navigateToUrl } from 'single-spa'
import axios from 'axios'
export default {
  data(){
    return{
      expertId           : !this.$store.state.userInfos?'':this.$store.state.userInfos.id,
      // 专家库，各子系统评审路由配置
      ExpertReviewRouters: null,
      preparate          : {
        isReady         : 0,
        defaultActiveKey: ''
      },
      sysListForSearch: [],
      reviewTypeList  : [],
      reviewList      : [],
      reviewSingleList: [],
      reviewListPage  : {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        current        : 1,
        defaultCurrent : 1,
        showQuickJumper: true
      }
    }
  },
  watch: {
    '$store.state.userInfos': {
      handler: function(val) {
        if(!!val){
          this.expertId = !val.id?'':val.id
          this.getReviewList()
        }
      },
      deep: true
    },
  },
  mounted(){
    // 获取远程portal专家库评审各子系统内容的菜单跳转配置文件，
    const newInstance = axios.create({
      baseURL: '',
      timeout: 5000,
      headers: { 'Content-type': 'multipart/form-data' }
    })
    newInstance.get(this.$api.CONFIGS_EXPORTREVIEW_ROUTERS).then(res => {
      if(res.status == 200){
        // 获取成功，存储配置文件结果
        this.ExpertReviewRouters = this.$com.confirm(res, 'data', {})
        // 继续请求页面数据
        this.getReviewTypeList()
        this.getSysCodOptions()
        this.getReviewList()
      }else{
        // 获取失败，展示提示文字
        this.$message.error('获取配置文件错误')
      }
    })
  },
  methods: {
    /**
     * 根据syscode获取系统名称
     * @param {String} code 系统code
     * @returns name 业务系统名称
     */
    systemName(code){
      let name = ''
      for(let i=0;i<this.sysListForSearch.length;i++){
        const item = this.sysListForSearch[i]
        if(code ==item.value) {
          name = item.reviewName
        }
      }
      return name
    },

    /**
     * 根据syscode获取系统名称
     * @param {String} code 系统code
     * @returns name 业务系统名称
     */
    reviewTypeName(code){
      let name = ''
      for(let i=0;i<this.reviewTypeList.length;i++){
        const item = this.reviewTypeList[i]
        if(code ==item.code) {
          name = item.name
        }
      }
      return name
    },

    /**
     * 根据子系统code及申报材料ID，跳转至对应子系统申报材料详情页
     * @param {String} sysCode 子系统code
     * @param {String} reviewTypeCode 评审类型code
     * @param {String} taskCode 申报材料ID
     */
    goMicReview(sysCode, reviewTypeCode, taskCode){
      const micSysRouters = this.ExpertReviewRouters[sysCode]
      let nextRouter = ''
      for(let i=0;i<micSysRouters.length;i++){
        const micSysRouter = micSysRouters[i]
        if( micSysRouter.type=='review' && reviewTypeCode == micSysRouter.reviewTypeCode){
          nextRouter = micSysRouter.routerName
        }
      }
      // 根据系统判断跳转子系统方式
      switch (sysCode) {
      case 'S0501':
      // 新品种审核
        navigateToUrl(nextRouter.replace(':id', taskCode)+'?showType=check&sourceRouteType=portal&sourceRoutePath='+this.$route.path)
        break
      case 'S0502':
      // 原良种复查
        navigateToUrl(nextRouter+'?id='+taskCode)
        break
      case 'S0503':
      // 原良种验收
        navigateToUrl(nextRouter+'?id='+taskCode)
        break
      case 'S0101':
      // 科普教育基地
        navigateToUrl(nextRouter+'?id='+taskCode)
        break
      case 'S0201':
      // 团体标准
        navigateToUrl(nextRouter+'?id='+taskCode)
        break
      case 'S0401':
      // 海洋牧场
        navigateToUrl(nextRouter+'?id='+taskCode)
        break
      case 'S0301':
      // 休闲渔业
        navigateToUrl(nextRouter+'?id='+taskCode)
        break
      case 'S1002':
      // 中国水产学会团体标准函审
        navigateToUrl(nextRouter.replace(':id', taskCode)+'?sourceRouteType=portal&sourceRoutePath='+this.$route.path)
        break
      default:
        break
      }
    },

    /**
     * 获取专家抽取业务类型清单
     */
    getReviewTypeList(){
      this.$ajax.get({
        url: this.$api.GET_EXPERT_BASE_LIST.replace('{type}', '9')
      }).then(res => {
        if(res.code === '200'){
          const data = this.$com.confirm(res, 'data.content', [])
          this.reviewTypeList = data.map((item) => {
            return {
              name: item.name,
              code: item.id
            }
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    /**
     * 获取可选的子系统清单
     */
    getSysCodOptions(){
      this.$ajax.get({
        url: this.$api.SYSTEM_LIST_ALL_GET
      }).then(res => {
        if(res.code === '200'){
          const data = this.$com.confirm(res, 'data.content', [])
          this.sysListForSearch = data.map((item) => {
            let name=''
            switch (item.sysCode) {
            case 'S1001':
              name='中国水产学会学术会议管理'
              break
            case 'S1002':
              name='中国水产学会范蠡科学技术奖'
              break
            case 'S0201':
              name='中国水产学会团体标准'
              break
            case 'S0601':
              name='水生动物防疫系统实验室能力验证'
              break
            case 'S1003':
              name='中国水产学会理事会议'
              break
            case 'S0101':
              name='中国水产学会科普教育基地'
              break
            case 'S0501':
              name='水产新品种'
              break
            case 'S0503':
              name='水产原良种场验收'
              break
            case 'S0502':
              name='水产原良种场复查'
              break
            case 'S0401':
              name='国家级海洋牧场示范区'
              break
            case 'S0301':
              name='国家级休闲渔业品牌'
              break
            default:
              name=item.sysName
              break
            }
            return {
              label     : item.sysName,
              value     : item.sysCode,
              reviewName: name
            }
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    /**
     * 根据专家id，获取待评审数据
     */
    getReviewList(){
      if(this.expertId==''){
        return
      }
      this.$ajax.get({
        url   : this.$api.GET_EXPERT_REVIEW_TODO_LIST.replace('{expertId}', this.expertId),
        params: { status: 0 }
      }).then(res => {
        if(res.code === '200'){
          this.reviewList = []
          //整理数据，将二维数据整理成一维列表。并计算总页数
          const datas = this.$com.confirm(res, 'data.content', [])
          datas.forEach(reviewGroup => {
            const busCode = reviewGroup.busCode
            const systemCode = reviewGroup.systemCode
            reviewGroup.list.forEach(reviewItem => {
              const item = Object.assign({}, {
                'busCode'   : busCode,
                'systemCode': systemCode
              }, reviewItem)
              this.reviewList.push(item)
            })
          })
          this.reviewListPage.total = this.reviewList.length
          this.reviewSingleList = this.reviewList.slice(0, this.reviewListPage.pageSize)
        }else{
          this.$message.error(res.msg)
        }
        this.preparate.isReady =true
      })
    },
    onPageChange(val){
      this.reviewListPage.pageNo = val
      this.reviewListPage.current = val
      this.reviewSingleList = this.reviewList.slice((val-1)*this.reviewListPage.pageSize, ((val-1)*this.reviewListPage.pageSize+this.reviewListPage.pageSize))
    }
  }
}
</script>
<style scoped>
.reviewSection {margin: 0 16px; padding-top: 16px; padding-bottom: 16px;}
.reviewInHomeTitle { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid  rgba(0,0,0,0.1)}
.reviewInHomeTitle .divider{ font-size: 16px; background-color:#1890ff; height: 16px; width: 5px; border-radius: 4px;}
.reviewInHomeTitle .title{ font-size: 16px;}
.reviewInHomeTitle .more{ cursor: pointer; color: #1890ff}
.contentOperate{ color:#1890ff; cursor: pointer;display: inline-block; }
</style>

