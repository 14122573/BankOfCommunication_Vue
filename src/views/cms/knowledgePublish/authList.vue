<template>
	<div class="routerWapper">
    <!-- <div class="layoutMargin layoutPadding" v-if="$route.name == '/cms/knowledgePublish'"> -->
    <div class="layoutMargin layoutPadding">
      <a-form class="protalForm" :form="knowledgeSearchForm">
        <a-row class="formItemLine" type="flex" :justify="simpleSearchForm?'end':'space-between'" align='middle' :gutter="simpleSearchForm?16:0">
          <a-col span="8">
            <a-form-item class='formItem' :label="simpleSearchForm?'':'标题'" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
              <a-input placeholder="请输入知识文献标题" v-decorator="['title']"/>
            </a-form-item>
          </a-col>
          <a-col span="8" v-if="!simpleSearchForm">
            <a-form-item class='formItem' label="作者" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
              <a-input placeholder="请输入作者姓名" v-decorator="['author']"/>
            </a-form-item>
          </a-col>
          <a-col :span="simpleSearchForm?6:24" class="algin-right">
            <a-button @click="reset">重置</a-button>
            <a-button type="primary" @click="getKnowLedgeList">搜索</a-button>
            <a-button type="primary" v-if='simpleSearchForm' @click="showMoreSearch">更多搜索</a-button>
            <a-button type="primary" v-if='!simpleSearchForm' @click="closeMoreSearch">简单搜索</a-button>
          </a-col>
        </a-row>
      </a-form>
      <p class="gayLine noline"></p>
      <template v-if="isReady">
        <div style="padding:16px 0">
          <template v-for="(knowledge,index) in knowledgeList">
          <div @click="goToView(knowledge.id)" :class='{"knowledge":true,"hasBg":(index+1)%2==1}' :key="index">[{{knowledge.years}}] - {{knowledge.title}} - [{{knowledge.author}}]</div>
          </template>
        </div>
        <a-row type="flex" justify="end">
          <a-col>
            <a-pagination size="small" :defaultPageSize="pagination.pageSize" showQuickJumper @change="onPageChange" :current="pagination.pageNo" :total="pagination.total" ></a-pagination>
          </a-col>
        </a-row>
      </template>
    </div>
		<!-- <RouterWapper v-else></RouterWapper> -->
  </div>
</template>
<style scoped>
.knowledge{ font-size: 14px; padding:10px 16px; line-height:1em; color:rgba(0,0,0,0.7); cursor: pointer;}
.knowledge.hasBg{ background-color: #F3F8FA}
.knowledge:hover,.knowledge.hasBg:hover{ background-color: #E8F8FF}
</style>

<script>

export default {
  components: {
  },
  data() {
    return {
      isReady:false,
      simpleSearchForm:true, // 展示、收取简单搜索开关，true为简单搜索
      searchFormOption:{
        type:[{
          label: '视频',
          value: '0'
        },{
          label: 'PDF',
          value: '1'
        }],
      },
      defaultSearchForm:{
        // type:['0','1'],
        anonymous:['0','1']
      },
      searchForm:{},
      knowledgeList:[],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
      },
    }
  },
  beforeCreate() {
    // if(this.$route.name == '/cms/knowledgePublish'){
    this.knowledgeSearchForm = this.$form.createForm(this)
    // }
  },
  mounted() {
    // if(this.$route.name == '/cms/knowledgePublish'){
    // this.searchForm.type_in = this.toKeyString(this.defaultSearchForm.type,',')
    this.searchForm.anonymous_in = this.toKeyString(this.defaultSearchForm.anonymous,',')
    this.getKnowLedgeList()
    // }
  },
  watch:{

  },
  computed:{
    formItemLabelCol(){
      let labelCol = {}
      if(this.simpleSearchForm){
        labelCol = {span: 0}
      }else{
        labelCol = {span: 8}
      }
      return labelCol
    },
    formItemWrapperCol(){
      let wrapperCol = {}
      if(this.simpleSearchForm){
        wrapperCol = {span: 24}
      }else{
        wrapperCol = {span: 16}
      }
      return wrapperCol
    }
  },
  methods: {
    closeMoreSearch(){
      this.simpleSearchForm = true
    },
    showMoreSearch(){
      this.simpleSearchForm = false
    },
    goToView(id){
      this.$router.push({
        name:'/cms/knowledgePublish/view',
        params:{
          id:id
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
     * 重置列表表单项内容，并重获取数据
     */
    reset(){
      this.searchForm ={
        // status_in:this.toKeyString(this.defaultSearchForm.status,','),
        // type_in:this.toKeyString(this.defaultSearchForm.type,','),
        anonymous_in:this.toKeyString(this.defaultSearchForm.anonymous,',')
      }
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.knowledgeSearchForm.setFieldsValue({title:'',author:''})

      this.getKnowLedgeList()
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
     * 调用结构，查询表单要求的知识文库资料
     */
    getKnowLedgeList(){
      let searchParms
      searchParms = Object.assign({},this.searchForm,{
        title_l:!this.knowledgeSearchForm.getFieldValue('title')?'':this.knowledgeSearchForm.getFieldValue('title'),
        author_l:!this.knowledgeSearchForm.getFieldValue('author')?'':this.knowledgeSearchForm.getFieldValue('author'),
      },{
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize
      })
      this.$ajax.get({
        url: this.$api.GET_CMS_KNOWLEDGE_LIST,
        params: searchParms
      }).then(res => {
        this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
        this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
        this.pagination.current = this.pagination.pageNo
        this.knowledgeList = this.$com.confirm(res, 'data.content', [])
        this.isReady = true
      })
    }

  },
}
</script>


