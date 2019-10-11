<template>
  <div class="layoutMargin layoutPadding">
    <a-form :form="reviewHisSearchForm">
      <a-row type="flex" justify="space-between" class="formItemLine">
        <a-col span="6">
          <a-form-item class='formItem' label="业务系统名称"  :label-col="{span:8}" :wrapper-col="{span:16}">
          <a-select placeholder="请选择" :options="sysListForSearch" v-model="searchForm.systemCode" />
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="评审时间段" :label-col="{span:6}" :wrapper-col="{span:18}">
            <a-range-picker allowClear v-decorator="['finishTimes']"  :format="'YYYY-MM-DD'" style="width:100%" :placeholder="['请选择开始日期','请选择结束日期']"
              @change="onDateChange" />
          </a-form-item>
        </a-col>
        <a-col span="6" class="algin-right">
          <a-button @click="reset" html-type="submit">重置</a-button>
          <a-button type="primary" @click="getFinishReviewList" html-type="submit">搜索</a-button>
        </a-col>
      </a-row>
    </a-form>
    <p class="gayLine"></p>
    <div class="portalTableOperates">
      <a-button icon='rollback' @click="$router.back()">返回待评审列表</a-button>
    </div>
    <a-table class="portalTable" size="small" :dataSource="finishReviewList" rowKey="id" :pagination="pagination" :columns="tableColumns">
      <span slot="action" slot-scope="text, record">
        <span class="actionBtn" @click="goMicReview(record.systemCode,record.busCode,record.taskCode)">查看申请</span>
      </span>
		</a-table>
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
        isReady:false
      },
      searchForm:{},
      sysListForSearch:[],
      reviewTypeList:[],
      finishReviewList:[],
      searchTime:{
        selected:[],
        default:[this.$moment('2019-07-09','YYYY-MM-DD'),this.$moment('2019-08-09','YYYY-MM-DD')],
        selectedString:[]
      },
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onPageChange
      },
      tableColumns: [
        {
          title: '业务系统评审类型', dataIndex: 'busCode',
          customRender: (text, record, index) => {
            return this.reviewTypeName(text)
          },
        },
        {
          title: '业务系统名称', dataIndex: 'systemCode',
          customRender: (text, record, index) => {
            return this.systemName(text)
          },
        },
        { title: '申报单位名称',  dataIndex: 'companyCode' },
        { title: '申报材料名称', dataIndex: 'taskName' },
        {
          title: '评审时间', dataIndex: 'finishTime',
          customRender: (text, record, index) => {
            return this.$com.formatDate(text)
          },
        },
        { title: '操作', width: 140, dataIndex: 'action', scopedSlots: { customRender: 'action' } }
      ],
    }
  },
  beforeCreate() {
    this.reviewHisSearchForm = this.$form.createForm(this)
  },
  mounted(){
    this.getSysCodOptions()
    this.getReviewTypeList()
    this.getFinishReviewList()
    // 设置表单默认搜索时间段
    // this.$nextTick(function () {
    //   this.reviewHisSearchForm.getFieldDecorator('finishTimes',{initialValue:this.searchTime.default})
    // })
  },
  methods:{
    /**
     * 根据子系统code及申报材料ID，跳转至对应子系统申报材料详情页
     * @param {String} sysCode 子系统code
     * @param {String} reviewTypeCode 评审类型code
     * @param {String} taskCode 申报材料ID
     */
    goMicReview(sysCode,reviewTypeCode,taskCode){
      let micSysRouters = ExpertReviewRouters[sysCode]
      // 写死
      let nextRouter = ''
      for(let i=0;i<micSysRouters.length;i++){
        let micSysRouter = micSysRouters[i]
        if( micSysRouter.type=='detail'){
          nextRouter = micSysRouter.routerName
        }
      }
      // 根据系统判断跳转子系统方式
      switch (sysCode) {
      case 'S0501':// 新品种审核
        this.$router.push({
          name:nextRouter,
          params:{id:taskCode},
          query:{
            sourceRoutePath:this.$route.path,
            sourceRouteType:'portal'
          }
        })
        break
      case 'S0502': // 原良种复查
        this.$router.push({
          name:nextRouter,
          query:{
            id:taskCode
          }
        })
        break
      case 'S0503': // 原良种验收
        this.$router.push({
          name:nextRouter,
          query:{
            id:taskCode
          }
        })
        break
      case 'S0101': // 科普教育基地
        this.$router.push({
          name:nextRouter,
          query:{
            id:taskCode
          }
        })
        break
      case 'S0201': // 团体标准
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
     * 根据搜索条件及分页，获取已完成的数据列表
     */
    getFinishReviewList(){
      let queryParams = Object.assign({},this.searchForm,{
        status:1,
        // pageSize: this.pagination.pageSize,
        // pageNo: this.pagination.pageNo
      })
      this.$ajax.get({
        url: this.$api.GET_EXPERT_REVIEW_TODO_LIST.replace('{expertId}', this.expertId),
        params: queryParams
      }).then(res=>{
        if(res.code === '200'){
          this.finishReviewList = this.$com.confirm(res, 'data.content', [])
        }else{
          this.$message.error(res.msg)
        }
        this.preparate.isReady =true
      })
    },
    onPageChange(val) {
      this.pagination.pageNo = val
      this.pagination.current = val
      this.getFinishReviewList()
    },
    onDateChange(date, dateString) {
      this.searchTime.selected = date
      this.searchTime.selectedString = dateString
      this.searchForm['finishTime_gt'] = dateString[0]
      this.searchForm['finishTime_lt'] = dateString[1]
    },
    reset(){
      this.searchForm.systemCode = null
      this.reviewHisSearchForm.resetFields()
    }
  }
}
</script>
<style scoped>
 .align-right{
  text-align: right;
 }
 .table-title{
  background-color: rgb(247, 247, 247);
  border-bottom:1px solid #e0e0e0;
  padding-left:20px;height: 50px;
  color: #000;
  font-weight: bold;line-height: 50px;
 }
 .table-content{
  padding-bottom:20px;
 }
 .content-line{
  padding:0px 20px;border-bottom:1px solid #e0e0e0;
  height:50px;line-height: 50px;
 }
</style>

