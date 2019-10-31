<template>
	<div class="routerWapper">
    <div class="layoutMargin layoutPadding" v-if="$route.name == '/cms/notice'">
      <a-form class="protalForm" :form="noticeSearchForm">
        <a-row class="formItemLine" type="flex" justify="start" align="middle">
          <a-col span="8">
            <a-form-item class='formItem' label="标题" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-input placeholder="请输入通知公告标题" v-decorator="['title']"/>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item class='formItem' label="状态" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-checkbox-group :options="searchFormOption.status" :defaultValue="defaultSearchForm.status" @change="onStatusChange" />
            </a-form-item>
          </a-col>
         <a-col span="6" class="algin-right" style="padding-right:8px">
            <a-button @click="reset">重置</a-button>
            <a-button type="primary" @click="getNoticeList">搜索</a-button>
          </a-col>
        </a-row>
      </a-form>
      <p class="gayLine"></p>
      <div class='portalTableOperates'>
        <a-button icon='plus' v-if="$permission('P31001')" type="primary" @click='goTo("create")'>新建通知公告</a-button>
      </div>
      <a-table size='small' class="portalTable" :columns="listColumns" :dataSource="noticeList" rowKey='id' :pagination='pagination'>
        <template slot="effectTime" slot-scope="text, record">
          <div class="BYCmsDataEffectTime">
            <p><span class="label">起：</span>{{$com.oneOf(record.startTime,['1900-01-01 00:00:00',''])?'发布即时生效':record.startTime}}</p>
            <p><span class="label">止：</span>{{$com.oneOf(record.endTime,['2099-01-01 00:00:00',''])?'∞':record.endTime}}</p>
          </div>
			  </template>
        <template slot="placement" slot-scope="text, record">
          <template  v-if="record.isTop=='1'">
            <a-tag color="blue">已置顶</a-tag>
            <p class="placementTime">{{record.topDate}}</p>
          </template>
          <a-tag v-else >未置顶</a-tag>
			  </template>
        <template slot="noticeStatus" slot-scope="text, record">
          <CMSDataStatus :cmsType='"notice"' :status='record.status'></CMSDataStatus>
        </template>
        <template slot="action" slot-scope="text, record">
          <span class="actionBtn" v-if="$permission('P31005')" @click='goTo("detail",record.id)'>查看<a-divider v-if="$com.oneOf(record.status,['0','1'])" type="vertical" /></span>
          <template v-if="record.status=='0'">
            <span class="actionBtn" v-if="$permission('P31001')" @click='goTo("edit",record.id)'>修改<a-divider type="vertical" /></span>
            <a-dropdown>
              <span class="actionBtn"> 更多 <a-icon type="down" /> </span>
                <a-menu slot="overlay" @click='(event)=>{doListOpeations(event.key,record)}'>
                  <a-menu-item class="actionBtn" key="publish" v-if="$permission('P31004')"> 发布 </a-menu-item>
                  <a-menu-item class="actionBtn" key="delete" v-if="$permission('P31002')"> 删除 </a-menu-item>
                </a-menu>
            </a-dropdown>
          </template>
          <template v-if="record.status=='1'">
            <span class="actionBtn" v-if="record.isTop=='0' && $permission('P31003')" @click="doListOpeations('top',record)">置顶</span>
            <span class="actionBtn" v-if="record.isTop=='1' && $permission('P31003')" @click="doListOpeations('down',record)">取消置顶</span>
            <span class="actionBtn" v-if="$permission('P31004')" @click="doListOpeations('recall',record)">撤回</span>
          </template>
        </template>
		  </a-table>
    </div>
		<RouterWapper v-else></RouterWapper>
  </div>
</template>
<style scoped>
.BYCmsDataEffectTime p {margin: 0; line-height: 18px;}
.BYCmsDataEffectTime .label { color:#1890ff; font-size: 12px}
.placementTime { padding-top: 8px; margin: 0; font-size: 12px }
</style>

<script>
import CMSDataStatus from '@/views/cms/components/cmsStatus'

export default {
  components: {
    CMSDataStatus
  },
  data() {
    return {
      isReady:false,
      searchFormOption:{
        status:[{
          label: '草稿',
          value: '0'
        },{
          label: '发布中',
          value: '1'
        },{
          label: '已失效',
          value: '2'
        }]
      },
      defaultSearchForm:{
        status:['0','1']
      },
      searchForm:{},
      noticeList:[],
      listColumns:[
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        },{
          title: '生效时间段',
          dataIndex: 'startTime',
          key: 'startTime',
          width: 210,
          scopedSlots: {
            customRender: 'effectTime'
          }
        },{
          title: '置顶否',
          dataIndex: 'isTop',
          key: 'isTop',
          width: 180,
          scopedSlots: {
            customRender: 'placement'
          }
        },{
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          width: 140,
          scopedSlots: {
            customRender: 'noticeStatus'
          }
        },{
          title: '操作',
          key: 'operation',
          width: 180,
          scopedSlots: {
            customRender: 'action'
          }
        }],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onPageChange
      },
    }
  },
  beforeCreate() {
    if(this.$route.name == '/cms/notice'){
      this.noticeSearchForm = this.$form.createForm(this)
    }
  },
  mounted() {
    if(this.$route.name == '/cms/notice'){
      this.searchForm.status_in = this.toKeyString(this.defaultSearchForm.status,',')
      this.getNoticeList()
    }
  },
  watch:{

  },
  computed:{

  },
  methods: {
    /**
     * 根据列表操作类型，弹窗用户确认后执行相应操作或请求
     * @param {String} eventKey 操作类型，发布：publish；删除：delete；撤回：recall
     * @param {Object} data 被操作数据的详情信息
     */
    doListOpeations(eventKey, data) {
      let opeation = {
        title:'',
        tips:''
      }
      let toStatus = ''
      switch (eventKey) {
      case 'publish':
        opeation.title='您确认发布“'+data.title+'”吗？'
        opeation.tips='发布后即可被本平台用户浏览。可使用【撤回】取消发布。'
        toStatus = '1'
        break
      case 'delete':
        opeation.title='您确认删除“'+data.title+'”吗？'
        opeation.tips='删除后将无法找回！'
        break
      case 'recall':
        opeation.title='您确认撤销“'+data.title+'”的发布状态吗？'
        opeation.tips='撤回后将无法再次编辑、发布或删除！'
        toStatus = '2'
        break

      case 'top':
        opeation.title='您确认置顶“'+data.title+'”吗？'
        opeation.tips='置顶后将在展示列表，按最新置顶时间降序排列'
        toStatus = '1'
        break
      case 'down':
        opeation.title='您确认取消置顶“'+data.title+'”吗？'
        opeation.tips='取消置顶后，此通知公告将不会在展示列表优先展示'
        toStatus = '0'
        break
      default:
        break
      }
      if(this.$com.oneOf(eventKey,['publish','delete','recall','top','down'])){
        let vm = this
        this.$model.confirm({
          title: opeation.title,
          content: opeation.tips,
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            if(eventKey=='delete'){
              vm.toDoDelete(data.id)
            }else if(this.$com.oneOf(eventKey,['publish','recall'])){
              vm.toChangeStatus(data.id,toStatus)
            }else if(this.$com.oneOf(eventKey,['top','down'])){
              vm.toChangePlacement(data.id,toStatus)
            }
          },
        })
      }
    },
    /**
     * 更改指定数据的置顶状态
     * @param {String} id 被操作数据key
     * @param {String} status 目标状态Key ，置顶：1；不置顶：0
     */
    toChangePlacement(id,status){
      this.$ajax.put({
        url: this.$api.PUT_CMS_NOTICE_PLACEMENT.replace('{id}', id).replace('{top}', status)
      }).then(res=>{
        if(res.code=='200'){
          let successMsg = status=='1'?'置顶成功':'取消置顶成功'
          this.$message.success(successMsg)
          this.getNoticeList()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 删除指定数据
     * @param {String} id 被删除数据key
     */
    toDoDelete(id){
      this.$ajax.delete({
        url: this.$api.DELETE_CMS_NOTICE.replace('{id}', id)
      }).then(res=>{
        if(res.code=='200'){
          this.$message.success('删除成功')
          this.getNoticeList()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 更改指定数据发布状态
     * @param {String} id 被操作数据key
     * @param {String} status 目标状态Key ，发布：1；失效：2
     */
    toChangeStatus(id,status){
      this.$ajax.put({
        url: this.$api.PUT_CMS_NOTICE_STATUS.replace('{id}', id).replace('{status}', status)
      }).then(res=>{
        if(res.code=='200'){
          let successMsg = status=='1'?'发布成功':'撤回成功'
          this.$message.success(successMsg)
          this.getNoticeList()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 将一维数据键值数组，转为指定字串串链接的字符串
     * @param {Array} keyArray 包含数据key的一维数组
     * @param {String} splitStr key转为字符串后，每个key的链接符
     * @returns {String} keyString 拼接后的字串串
     */
    toKeyString(keyArray,splitStr){
      let keyString = ''
      if(Array.isArray(keyArray) && keyArray.length>0){
        keyArray.forEach(element => {
          keyString += element+splitStr
        })
        keyString = keyString.substring(0,keyString.length-1)
      }
      return keyString
    },
    /**
     * 监听搜索表单中文库状态选项勾选内容变更，并暂存勾选结果
     * @param {Array} selecteds 已勾选项的key
     */
    onStatusChange(selecteds){
      this.searchForm.status_in = this.toKeyString(selecteds,',')
    },
    /**
     * 进入数据操作页面
     * @param {String} type 页面类型， 创建：create；修改：edit；详情：detail
     * @param {String} id 数据key
     */
    goTo(type,id){
      type = !type?'create':type.toLowerCase()
      id = !id?'':id
      switch (type) {
      case 'create':
        this.$router.push({
          name:'/cms/notice/create',
        })
        break
      case 'detail':
        this.$router.push({
          name:'/cms/notice/details',
          params:{
            id:id
          }
        })
        break
      case 'edit':
        this.$router.push({
          name:'/cms/notice/edit',
          params:{
            id:id
          }
        })
        break
      default:
        break
      }
    },
    /**
     * 重置列表表单项内容，并重获取数据
     */
    reset(){
      this.searchForm ={
        status_in:this.toKeyString(this.defaultSearchForm.status,',')
      }
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.noticeSearchForm.setFieldsValue({title:''})

      this.getNoticeList()
    },
    /**
     * 记录翻页，并获取当前页的数据
     * @param {Number} current 当前页码
     */
    onPageChange(current) {
      this.pagination.current = current
      this.pagination.pageNo = current
      this.getNoticeList()
    },
    /**
     * 调用接口，查询表单要求的通知公告资料
     */
    getNoticeList(){
      let searchParms
      searchParms = Object.assign({},this.searchForm,{
        title_l:!this.noticeSearchForm.getFieldValue('title')?'':this.noticeSearchForm.getFieldValue('title')
      },{
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize
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
  },
}
</script>


