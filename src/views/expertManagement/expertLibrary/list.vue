<template>
	<div class="routerWapper">
		<div v-if="$route.name =='/expertManagement/expertLibrary'" class="layoutMargin layoutPadding">
			<a-form :form="searchForm" class="protalForm">
				<a-row type="flex" class="formItemLine" :justify="simpleSearchForm?'end':'space-between'" align='middle' :gutter="simpleSearchForm?16:0">
					<a-col span="6">
						<a-form-item class="formItem" :label="simpleSearchForm?'':'姓名'" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
							<a-input v-decorator="['name_l']" placeholder="请输入专家姓名"></a-input>
						</a-form-item>
					</a-col>
					<a-col span="6" v-if="!simpleSearchForm">
						<a-form-item label="联系电话" class="formItem" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
							<a-input v-decorator="['phone_l']" placeholder="请输入"></a-input>
						</a-form-item>
					</a-col>
					<a-col span="6" v-if="!simpleSearchForm">
						<a-form-item label="职称" class="formItem" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
							<a-select v-decorator="['jobTitle']" placeholder="请选择" allowClear>
								<a-select-option v-for="(item,index) in options.jobList" :key="index" :value="item.id">{{item.name}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
          <a-col span="8" v-if="!simpleSearchForm">
						<a-form-item label="用户状态" class="formItem" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
							<a-checkbox-group v-decorator="['status_in',{initialValue: []}]" :options="options.statusList"></a-checkbox-group>
						</a-form-item>
					</a-col>
					<a-col span="11" v-if="!simpleSearchForm">
						<a-form-item label="级别认定" class="formItem" :label-col="{span:3}" :wrapper-col="{span:12}">
							<a-checkbox-group v-decorator="['proStatus',{initialValue: ['all']}]" :options="options.proList"></a-checkbox-group>
						</a-form-item>
					</a-col>
					<a-col span="5" class="algin-right">
						<a-button @click="reset">重置</a-button>
						<a-button type="primary" @click="search">搜索</a-button>
          <a-button type="primary" v-if='simpleSearchForm' @click="showMoreSearch">更多搜索</a-button>
          <a-button type="primary" v-if='!simpleSearchForm' @click="closeMoreSearch">简单搜索</a-button>
					</a-col>
				</a-row>
			</a-form>
			<p class="gayLine noline"></p>
			<a-row class="portalTableOperates">
				<a-button type="primary" icon='plus' @click="addExpertUser=true">新增专家</a-button>
				<a-button icon='download' @click="$router.push({name: '/expertManagement/expertLibrary/upload'})">导入专家</a-button>
			</a-row>
			<a-table class="portalTable" size="small" :dataSource="dataSource" rowKey="id" :pagination="pagination" :columns="columns">
				<span slot="confirm" slot-scope="text, record">
          <p class="confirmInfo"><span class="label">部级认定:&nbsp;</span>{{record.unitConfirm || "暂无"}}</p>
          <p class="confirmInfo"><span class="label">省级认定:&nbsp;</span>{{record.provinceConfirm || "暂无"}}</p>
				</span>
        <span slot="status" slot-scope="text, record">
					<userStatus :status="record.status" />
				</span>
        <span slot="operator" slot-scope="text, record">
          <DataOperatorInList :creator='!record.creator?"":record.creator' :lastOperator='!record.operator?"":record.operator'></DataOperatorInList>
        </span>
				<span slot="action" slot-scope="text, record">
					<span class="actionBtn" @click="$router.push({name:'/expertManagement/expertLibrary/view',query:{id:record.expertId}})">查看</span>
          <template v-if="$com.oneOf(record.status,['0','1'])">
					  <span class="actionBtn" @click="editBtn(record)"><a-divider type="vertical" />修改</span>
          </template>
				</span>
			</a-table>
			<a-modal :maskClosable="false" okText="确认" @ok="handleJump" @cancel="addExpertUser=false" :width="480" title="新增专家用户"
			 :visible="addExpertUser">
				<a-row type="flex" justify="space-around">
					<a-col span="11">
						<div @click="chooseIndex=1" :class='{"active":chooseIndex==1}'>
							<a-row type="flex" align="middle" class='block'>
								<img src="@/assets/images/bgResetPwd.png" alt="" class="bgImage">
								<a-col span='8' class="algin-right"><img src="@/assets/images/head1.png" alt="" class="icon1"></a-col>
								<a-col span='16'>
									<div>将已有的账户中心用户<br />添加为专家用户</div>
								</a-col>
							</a-row>
						</div>
					</a-col>
					<a-col span="11">
						<div @click="chooseIndex=2" :class='{"active":chooseIndex==2}'>
							<a-row type="flex" align="middle" class='block'>
								<img src="@/assets/images/bgResetPwd.png" alt="" class="bgImage">
								<a-col span='8' class="algin-right"><img src="@/assets/images/head3.png" alt="" class="icon2"></a-col>
								<a-col span='16'>
									<div>直接新增专家用户</div>
								</a-col>
							</a-row>
						</div>
					</a-col>
				</a-row>
			</a-modal>
		</div>
		<RouterWapper v-else></RouterWapper>
	</div>
</template>
<script>
import userStatus from '@/views/systemManagement/components/user-status'
import DataOperatorInList from '@/views/systemManagement/components/dataOperatorInList'
export default {
  name: 'Talent',
  components: {
    userStatus,DataOperatorInList
  },
  data() {
    return {
      searchForm: this.$form.createForm(this),
      simpleSearchForm:true, // 展示、收取简单搜索开关，true为简单搜索
      options: {
        proList: [
          {
            label: '全部',
            value: 'all'
          }, {
            label: '省级认定',
            value: '1'
          },
          {
            label: '部级认定',
            value: '0'
          }
        ],
        levList: [
          {
            label: '是',
            value: '1'
          },{
            label: '否',
            value: '0'
          }
        ],
        statusList: [
          {
            label: '正常',
            value: '1'
          },{
            label: '禁用',
            value: '9'
          },{
            label: '已注销',
            value: '8'
          }
        ],
        jobList: []
      },
      dataSource: [],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name'
        },{
          title: '联系电话',
          dataIndex: 'phone'
        },{
          title: '工作单位',
          dataIndex: 'workCompany'
        },{
          title: '职称',
          dataIndex: 'jobTitleName',
          width: 100,
        },{
          title: '部/省级认定',
          dataIndex: 'provinceConfirm',
          width: 120,
          scopedSlots: {
            customRender: 'confirm'
          }
        },{
          title: '用户状态',
          dataIndex: 'status',
          width: 80,
          scopedSlots: {
            customRender: 'status'
          }
        },{
          title: '操作人',
          width: 150,
          dataIndex: 'creator',
          key: 'creator',
          scopedSlots: {
            customRender: 'operator'
          }
        },{
          title: '操作',
          width: 140,
          dataIndex: 'action',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onChange
      },
      opeationItem: {},
      addExpertUser: false,
      chooseIndex: 1
    }
  },
  mounted() {
    if (this.$route.name == '/expertManagement/expertLibrary') {
      this.getJobLists()
      this.getLists()
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
    closeMoreSearch(){
      this.simpleSearchForm = true
    },
    showMoreSearch(){
      this.simpleSearchForm = false
    },
    getLists() {
      const options = this.$com.dealObjectValue(this.searchForm.getFieldsValue())
      if (options.status_in) options.status_in = options.status_in.join(',')
      if (options.proStatus && options.proStatus.indexOf('all') == -1) {
        if (options.proStatus && options.proStatus.length > 1) {
          options.provinceConfirm = '是'
          options.unitConfirm = '是'
        } else {
          if (options.proStatus) {
            if (options.proStatus[0] === '0') {
              options.unitConfirm = '是'
              options.provinceConfirm = '否'
            } else {
              options.unitConfirm = '否'
              options.provinceConfirm = '是'
            }
          } else {
            options.provinceConfirm = '否'
            options.unitConfirm = '否'
          }
        }
      }
      delete options.proStatus
      const params = Object.assign(options, {
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.pageNo
      })
      this.$ajax.get({
        url: this.$api.GET_EXPERT_LIST,
        params: params
      }).then(res => {
        this.dataSource = this.$com.confirm(res, 'data.content', [])
        this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    // 查询
    search() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.getLists()
    },
    // 重置
    reset() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.searchForm.resetFields()
      this.getLists()
    },
    handleJump() {
      if (this.chooseIndex == 1) {
        //转换
        this.$router.push({
          name: '/expertManagement/expertLibrary/select'
        })
      } else {
        //直接新增
        this.$router.push({
          name: '/expertManagement/expertLibrary/create'
        })
      }
    },
    editBtn(item) {
      this.$router.push({
        name: '/expertManagement/expertLibrary/edit',
        query: {
          id: item.id
        }
      })
    },
    getJobLists() {
      this.$ajax.get({
        url: this.$api.DICTIONARY_TYPE_GET.replace('{type}', '3')
      }).then(res => {
        this.options.jobList = this.$com.confirm(res, 'data.content', [])
      })
    },
    onChange(val) {
      this.pagination.pageNo = val
      this.pagination.current = val
      this.getLists()
    }
  }
}
</script>
<style scoped>
.block { height: 70px; outline: 1px solid #e8e8e8; font-size: 12px; color: black; cursor: pointer; position: relative;}
.block .algin-right .icon1 { width: 45px; margin-right: 10px;}
.block .algin-right .icon2 { width: 60px; margin-right: 10px; }
.bgImage { position: absolute; top: 0px; left: 0px; height: 70px; width: 100%;}
.active { outline: 2px solid #40a9ff; }
.confirmInfo {font-size:12px; margin:0; }
.confirmInfo .label{ color: rgba(0, 0, 0, 0.4)}
</style>
