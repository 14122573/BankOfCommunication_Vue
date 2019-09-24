<template>
  <div class="routerWapper">
    <div v-if='$route.name=="/expertManagement/reiview"' class="layoutMargin layoutPadding">
      <a-form class="protalForm" :form="searchForm">
        <a-row type="flex" justify="space-between" class="formItemLine">
          <a-col span="8">
            <a-form-item class='formItem' label="业务系统名称" :label-col="{span:6}" :wrapper-col="{span:18}">
              <a-select placeholder="请选择业务系统" :options="sysListForSearch" v-model="searchForm.systemCode" />
            </a-form-item>
          </a-col>
          <a-col span="6" class="algin-right">
            <a-button @click="reset" html-type="submit">重置</a-button>
            <a-button type="primary" @click="getReviewList" html-type="submit">搜索</a-button>
          </a-col>
        </a-row>
      </a-form>
      <p class="gayLine"></p>
      <div class="portalTableOperates">
        <a-button icon='database' @click="$router.push({name:'/expertManagement/reiview/history'})">评审历史查询</a-button>
      </div>
      <template v-if="sysListForSearch.length>0 && reviewTypeList.length>0 && preparate.isReady">
        <a-collapse v-if='reviewList.length>0' class='reviewSeationGroup' :defaultActiveKey="preparate.defaultActiveKey" :bordered="false">
          <template v-for="(reviewGroup) in reviewList">
            <a-collapse-panel :key='reviewGroup.systemCode+"-"+reviewGroup.busCode' class='reviewSeation' >
              <template slot="header">
                <div class="reviewSeationTitle">
                  <span class="sysName">{{systemName(reviewGroup.systemCode)}}</span>
                  <span class="projectName">{{reviewTypeName(reviewGroup.busCode)}}</span>
                </div>
              </template>
              <a-row class="reviewSeationContent" :gutter="16">
                <template v-for="(review,index) in reviewGroup.list">
                  <a-col span="6" class="reviewCard" :key="index">
                    <div class="contentBody">
                      <div class="title">{{review.taskName}}</div>
                      <div class="des">{{review.companyCode}}</div>
                    </div>
                    <div class="contentOperate">
                      <span @click="goMicReview(reviewGroup.systemCode,reviewGroup.busCode,review.taskCode)">去评审</span>
                    </div>
                  </a-col>
                </template>
              </a-row>
            </a-collapse-panel>
          </template>
        </a-collapse>
        <template v-else>
          <a-alert message="暂无数据" type="info" >
            <p slot="description"> 您暂无需要审核的数据 </p>
          </a-alert>
        </template>
      </template>
      <template v-else>
        <a-skeleton active />
      </template>
    </div>
    <RouterWapper v-else></RouterWapper>
  </div>
</template>
<script>
import {navigateToUrl} from 'single-spa'
import { ExpertReviewRouters } from '@/config/expert-review-router'
export default {
  data(){
    return{
      expertId:!this.$store.state.userInfos?'':this.$store.state.userInfos.id,
      preparate:{
        isReady:0,
        defaultActiveKey:''
      },
      searchForm:{},
      sysListForSearch:[],
      reviewTypeList:[],
      reviewDatas:[],
      reviewList:[]
    }
  },
  mounted(){
    if(this.$route.name=='/expertManagement/reiview'){
      this.getReviewTypeList()
      this.getSysCodOptions()
      this.getReviewList(this.expertId)
    }
  },
  methods:{
    /**
     * 根据syscode获取系统名称
     * @param {String} code 系统code
     * @returns name 业务系统名称
     */
    systemName(code){
      let name = ''
      for(let i=0;i<this.sysListForSearch.length;i++){
        let item = this.sysListForSearch[i]
        if(code ==item.value) {
          name = item.label
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
        let item = this.reviewTypeList[i]
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
    goMicReview(sysCode,reviewTypeCode,taskCode){
      let micSysRouters = ExpertReviewRouters[sysCode]
      let nextRouter = ''
      for(let i=0;i<micSysRouters.length;i++){
        let micSysRouter = micSysRouters[i]
        if( micSysRouter.type=='review' && reviewTypeCode == micSysRouter.reviewTypeCode){
          nextRouter = micSysRouter.routerName
        }
      }
      // 根据系统判断跳转子系统方式
      switch (sysCode) {
      case 'S0501':
        this.$router.push({
          name:nextRouter,
          params:{id:taskCode},
          query:{
            showType:'check',
            sourceRoutePath:this.$route.path,
            sourceRouteType:'portal'
          }
        })
        break
      case 'S0502':
        this.$router.push({
          name:nextRouter,
          query:{
            id:taskCode
          }
        })
        break
      case 'S0503':
        this.$router.push({
          name:nextRouter,
          query:{
            id:taskCode
          }
        })
        break
      default:
        break
      }
    },
    /**
     * 获取折叠面板默认展开的key值
     */
    initCollapseDefaultKey(){
      let defaultKey = ''
      if(Array.isArray(this.reviewList) && this.reviewList.length>0){
        this.preparate.defaultActiveKey = this.reviewList[0].systemCode+'-'+this.reviewList[0].busCode
      }
    },
    /**
     * 获取专家抽取业务类型清单
     */
    getReviewTypeList(){
      this.$ajax.get({
        url:this.$api.GET_EXPERT_BASE_LIST.replace('{type}', '9')
      }).then(res=>{
        if(res.code === '200'){
          let data = this.$com.confirm(res, 'data.content', [])
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
      }).then(res=>{
        if(res.code === '200'){
          let data = this.$com.confirm(res, 'data.content', [])
          this.sysListForSearch = data.map((item) => {
            return {
              label: item.sysName,
              value: item.sysCode
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
      let params = Object.assign({status:0},this.searchForm)
      this.$ajax.get({
        url: this.$api.GET_EXPERT_REVIEW_TODO_LIST.replace('{expertId}', this.expertId),
        params: params
      }).then(res=>{
        if(res.code === '200'){
          this.reviewList = this.$com.confirm(res, 'data.content', [])
          this.initCollapseDefaultKey()
        }else{
          this.$message.error(res.msg)
        }
        this.preparate.isReady =true
      })
    },
    // 重置
    reset(){
      this.searchForm.systemCode = null
    },
    // 查询
    search(){

    }
  }
}
</script>
<style scoped>
.reviewSeationGroup { padding-bottom:16px; }
.reviewSeationTitle span{  padding-right:10px; font-size: 12px; color:rgb(0, 0, 0,0.6);}
.reviewSeationTitle .sysName{ color:rgb(0, 0, 0,0.8); font-weight: bold; font-size: 14px;}
.reviewSeationContent { padding:0; margin:0;}
.reviewCard { height:120px; margin-bottom:20px;}
.reviewCard .contentBody{ height:80px; padding:10px 10px; vertical-align: middle; background: #fff;  border-radius: 2px; border-bottom:1px solid #e0e0e0; border:1px solid #e0e0e0 }
.reviewCard .contentBody .title, .reviewCard .contentBody .des {line-height: 20px; font-size: 12px; color:rgb(0, 0, 0,0.6)}
.reviewCard .contentBody .title { font-size: 14px; font-weight: bold; color:rgb(0, 0, 0,0.8)}
.reviewCard .contentOperate{ border:1px solid #e0e0e0; border-top: none; height: 38px;background-color: rgb(234, 244, 254); padding-right:20px;text-align: right;line-height: 38px;}
.contentOperate span{ color:#1890ff; cursor: pointer;display: inline-block; }
.contentOperate .title{color:#000;font-weight:bold;}
</style>


