<template>
	<div class="veterinary">
		<a-form class="veterinaryForm" :form="veterinaryForm">
			<a-row class="formItemLine" type="flex" :justify="simpleSearchForm?'end':'space-between'" align='top' :gutter="simpleSearchForm?18:0">
        <!-- 兽医类型选择框 -->
				<a-col span="4">
          <a-form-item :label="simpleSearchForm?'':'类型'" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
            <a-select placeholder="请选择兽医类型" v-decorator="['type']" >
              <a-select-option value="3">全部</a-select-option>
              <a-select-option value="0">乡村兽医</a-select-option>
              <a-select-option value="1">官方兽医</a-select-option>
              <a-select-option value="2">执业兽医</a-select-option>
            </a-select>
          </a-form-item>
				</a-col>
        <!-- 模糊搜索文字参数 info -->
				<a-col span="6">
					<a-form-item :label="simpleSearchForm?'':'关键字'" class="formItem" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
            <a-input placeholder="请输入查询内容" v-decorator="['info']" />
					</a-form-item>
				</a-col>
        <!-- 省市县区 -->
				<a-col span="8" v-show="!simpleSearchForm">
					<a-form-item label="地区选择" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
            <a-cascader
              v-decorator="['area']"
              :options="options.areas"
              :loadData="getAreas"
              placeholder="请选择"
              changeOnSelect
            />
					</a-form-item>
				</a-col>
        <!-- 功能按钮区 -->
				<a-col span="5" class="algin-right">
					<a-button @click="reset">重置</a-button>
					<a-button type="primary" @click="search">搜索</a-button>
          <a-button type="primary" v-if='simpleSearchForm' @click="showMoreSearch">更多搜索</a-button>
          <a-button type="primary" v-if='!simpleSearchForm' @click="closeMoreSearch">简单搜索</a-button>
				</a-col>
			</a-row>
		</a-form>

		<p class="gayLine noline"></p>
    <hr>
		<a-table class="portalTable" size="small" row-key="id" :pagination="pagination" :columns="columns" :dataSource="data">
			<span slot="createTime" slot-scope="text, record">
				{{$com.strTime(record.createTime)}}
			</span>
		  <span slot="action" slot-scope="text, record">
        <span class="actionBtn" v-if="$permission('P03101')" @click="viewBtn(record)">查看<a-divider v-if="$permission('P03101')" type="vertical" /></span>
        <span v-if="$permission('P03102')" class="actionBtn" @click="distributionBtn(record)">权限分配</span>
      </span>
		</a-table>
	</div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        areas: [],
      },
      searchForm: {},
      simpleSearchForm:true, // 展示、收取简单搜索开关，true为简单搜索
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onChange
      },
      params: {
        'ui.createTime_desc': '0',
        status: '0'
      },
      time: [],
      total: 0,
      data: [],
      columns: [
        // {
        //   title: '姓名',
        //   dataIndex: 'name',
        //   key: 'name'
        // },{
        //   title: '账号',
        //   width: 240,
        //   dataIndex: 'phone',
        //   key: 'phone'
        // },{
        //   title: '邮箱',
        //   dataIndex: 'mail',
        //   key: 'mail'
        // },{
        //   title: '单位',
        //   dataIndex: 'dept',
        //   key: 'dept'
        // },{
        //   title:'注册时间',
        //   dataIndex: 'createTime',
        //   key: 'createTime',
        //   width: 240,
        //   scopedSlots: {
        //     customRender: 'createTime'
        //   }
        // },{
        //   title: '操作',
        //   dataIndex: 'action',
        //   key: 'action',
        //   scopedSlots: {
        //     customRender: 'action'
        //   }
        // }
      ]
    }
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
    getAreas(selectedOptions) { // 初始化或者根据选择来获取省市区级联选择框的数据
      let targetOption = null
      if (selectedOptions) {
        targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true
      }
      this.$ajax.get({
        url: this.$api.GET_AREA_NEXT,
        params: {
          parentId: targetOption ? targetOption.value.split('#')[0] : '999999',
        },
        hideLoading: true,
      }).then(res => {
        const datas = this.$com.confirm(res, 'data.content', [])
        const result = datas.map(item => {
          return {
            label: item.areaName,
            value: item.id + '#' + item.areaName,
            isLeaf: item.lv > 3,
          }
        })
        if (targetOption) {
          targetOption.loading = false
          targetOption.children = result
        } else {
          this.options.areas = result
        }
        this.options.areas = [...this.options.areas]
      })
    },
    // 关闭更多搜索
    closeMoreSearch(){
      this.simpleSearchForm = true
    },
    // 打开更多搜索
    showMoreSearch(){
      this.simpleSearchForm = false
    },
    // 查询按钮
    search() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.getList()
    },
    // 重置按钮
    reset() {
      this.veterinaryForm.resetFields()
      this.searchForm = {}
      this.pagination.pageNo = 1
      this.pagination.current = 1
      this.getList()
    },
    onChange(current) {
      this.pagination.pageNo = current
      this.pagination.current = current
      this.getList()
    },
    // 查询列表
    getList() {
      // let searchParams = Object.assign({},this.searchForm,{
      //   'ui.phone_l': !this.veterinaryForm.getFieldValue('ui.phone_l')?'':this.veterinaryForm.getFieldValue('ui.phone_l'),
      //   name_l: !this.veterinaryForm.getFieldValue('name_l')?'':this.veterinaryForm.getFieldValue('name_l'),
      //   mail_l: !this.veterinaryForm.getFieldValue('mail_l')?'':this.veterinaryForm.getFieldValue('mail_l'),
      //   dept_l: !this.veterinaryForm.getFieldValue('dept_l')?'':this.veterinaryForm.getFieldValue('dept_l')
      // })
      // if (searchParams.createTime_desc) {
      //   searchParams['ui.createTime_btw'] = searchParams.createTime_desc.join(',')
      //   delete searchParams.createTime_desc
      // }
      // // if (params.createTime_desc) params.createTime_desc=params.createTime_desc.join(',');
      // this.$ajax.get({
      //   url: this.$api.USER_LIST_TYPE_GET.replace('{type}', 'new'),
      //   params: Object.assign({},searchParams, this.params, {
      //     pageSize: this.pagination.pageSize,
      //     pageNo: this.pagination.pageNo
      //   })
      // }).then(res => {
      //   if (res.code === '200') {
      //     this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
      //     this.data = this.$com.confirm(res, 'data.content', [])
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      //   // 存储当前页面列表的搜索添加和分页信息
      //   this.$com.storeSearchParams(
      //     this.$route.name+'/pending',
      //     this.pagination,
      //     Object.assign({},this.searchForm,{
      //       'ui.phone_l': !this.veterinaryForm.getFieldValue('ui.phone_l')?'':this.veterinaryForm.getFieldValue('ui.phone_l'),
      //       name_l: !this.veterinaryForm.getFieldValue('name_l')?'':this.veterinaryForm.getFieldValue('name_l'),
      //       mail_l: !this.veterinaryForm.getFieldValue('mail_l')?'':this.veterinaryForm.getFieldValue('mail_l'),
      //       dept_l: !this.veterinaryForm.getFieldValue('dept_l')?'':this.veterinaryForm.getFieldValue('dept_l')
      //     })
      //   )
      // })
    },

    onDateChange(date, dateString) {
      this.searchForm.createTime_desc = dateString
    },
    // 查看按钮
    viewBtn(item) {
      this.$router.push({
        name: '/systemManagement/administrator/pendingView',
        query: {
          id: item.id
        }
      })
    },
    // 权限分配按钮
    distributionBtn(item) {
      this.$router.push({
        name: '/systemManagement/administrator/distribution',
        query: {
          id: item.id
        }
      })
    },
    /**
     * 从vuex中或已存储的搜索条件，判断此条件是否为当前路由的 。如果是则使用
     */
    getSearchParams(){
      // let searchParams = !this.$store.state.listSearchParams?null:this.$store.state.listSearchParams[this.$route.name+'/pending']
      // if(!!searchParams && !!searchParams.routeName && (this.$route.name+'/pending' == searchParams.routeName)){
      //   if(!!searchParams.params){
      //     Object.keys(searchParams.params).forEach(elem=>{
      //       switch (elem) {
      //       case 'ui.phone_l':
      //         this.veterinaryForm.setFieldsValue({ 'ui.phone_l': searchParams.params[elem] })
      //         break
      //       case 'name_l':
      //         this.veterinaryForm.setFieldsValue({ 'name_l': searchParams.params[elem] })
      //         break
      //       case 'mail_l':
      //         this.veterinaryForm.setFieldsValue({ 'mail_l': searchParams.params[elem] })
      //         break
      //       case 'dept_l':
      //         this.veterinaryForm.setFieldsValue({ 'dept_l': searchParams.params[elem] })
      //         break
      //       default:
      //         this.searchForm[elem] = searchParams.params[elem]
      //         break
      //       }
      //     })
      //     if(!!this.searchForm['createTime_desc']){
      //       this.time = []
      //       this.time.push(this.$moment(this.searchForm['createTime_desc'][0],this.dateFormat))
      //       this.time.push(this.$moment(this.searchForm['createTime_desc'][1],this.dateFormat))
      //     }
      //   }
      //   if(!!searchParams.pagination){
      //     if(!!searchParams.pagination.pageNo && searchParams.pagination.pageNo!=1){
      //       this.pagination.pageNo = searchParams.pagination.pageNo
      //     }
      //   }
      // }
      // this.getList()
    },
  },
  beforeCreate() {
    this.veterinaryForm = this.$form.createForm(this)
  },
  mounted() {
    this.getAreas(null)

    // if(this.$route.name == '/Veterinary'){
    //   this.$nextTick(function () {
    //     this.getSearchParams()
    //   })
    // }
  }
}
</script>
<style scoped>
  .veterinary{
    width: 100%;
    height: 90%;
    margin-top: 50px;
  }
  .veterinaryForm{
    text-align: center;
  }
	.page-row {
		margin-top: 20px;
	}
</style>
