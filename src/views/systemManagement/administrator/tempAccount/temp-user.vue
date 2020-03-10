<template>
	<div>
		<a-form class="protalForm" :form="searchForm">
			<a-row type="flex" class="formItemLine" :justify="simpleSearchForm?'end':'space-between'" align='middle' :gutter="simpleSearchForm?16:0">
				<a-col span="6">
					<a-form-item :label="simpleSearchForm?'':'角色名称'" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
						<a-select placeholder="请选择" :options="roleList" allowClear v-model="searchForm['ui.roleIds_l']" />
					</a-form-item>
				</a-col>
				<a-col span="6" v-if="!simpleSearchForm">
					<a-form-item label="行政区域" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
						<a-select v-model="searchForm['a.id']" v-if="isAdminator !== true" placeholder="请选择" @change="onChangeTree"
						 showSearch allowClear>
							<a-select-option v-for="(item,index) in treeData" :key="index" :value="item.id">{{item.title}}</a-select-option>
						</a-select>
						<a-tree-select v-else :treeData="treeData" :loadData="onLoadData" :defaultValue="defaultValue" show-line v-model="searchForm['a.id']"
						 :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }" placeholder='请选择' allowClear @change="onChangeTree">
						</a-tree-select>
					</a-form-item>
				</a-col>
				<a-col span="6" v-if="!simpleSearchForm">
					<a-form-item label="组织机构" :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
						<a-select v-model="searchForm['g.id']" placeholder='请选择'>
							<a-select-option v-for="(item,index) in groupLists" allowClear :key="index" :value="item.id">{{item.groupName}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col span="6" class="algin-right">
					<a-button @click="reset" html-type="submit">重置</a-button>
					<a-button type="primary" @click="search" html-type="submit">搜索</a-button>
          <a-button type="primary" v-if='simpleSearchForm' @click="showMoreSearch">更多搜索</a-button>
          <a-button type="primary" v-if='!simpleSearchForm' @click="closeMoreSearch">简单搜索</a-button>
				</a-col>
			</a-row>
		</a-form>
		<p class="gayLine noline"></p>
		<div class='portalTableOperates'>
			<a-button icon='plus' v-if="$permission('P03401')" type="primary" @click='modalControlers.createTempAccount=true'>批量添加临时账户</a-button>
			<a-button icon='delete' v-if="$permission('P03401')" type="danger" @click='comfirmDeleteTempAccounts'>批量删除</a-button>
			<a-button icon='cloud-download' v-if="$permission('P03402')" class="exportBtn" @click='exportTempAccounts'>导出临时账户</a-button>
		</div>
		<a-table size='small' class="portalTable" :columns="columns" :dataSource="dataTable" :rowSelection="rowSelection" rowKey='BATCH' :pagination='pagination'>
			<span slot="action" slot-scope="text, record">
				<span class="actionBtn" style="color:red" v-if="$permission('P03401')" @click="comfirmDeleteTempAccounts(record.BATCH)">删除</span>
			</span>
      <span slot="operator" slot-scope="text, record">
        <DataOperatorInList :creator='!record.creator?"":record.CREATOR' :lastOperator='!record.CREATOR?"":record.CREATOR'></DataOperatorInList>
      </span>
		</a-table>
    <CreateTempAccount @on-success='closeAccountCreateModal' :resetShow='modalControlers.createTempAccount'></CreateTempAccount>
	</div>
</template>
<script>
import DataOperatorInList from '@/views/systemManagement/components/dataOperatorInList'
import CreateTempAccount from '@/views/systemManagement/administrator/tempAccount/createAccount'

export default {
  name: 'temp-user',
  components: {
    DataOperatorInList,
    CreateTempAccount
  },
  props: {
    roleList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isAdminator: this.$store.state.userInfos.isAllPerm,
      simpleSearchForm:true, // 展示、收取简单搜索开关，true为简单搜索
      params: {
        'ta.batch_desc': 1
      },
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.pageChange
      },
      searchForm: {
      },
      modalControlers:{
        createTempAccount:false
      },
      defaultValue:'',
      dataTable: [],
      columns: [
        {
          title: '临时账号数量',
          dataIndex: 'NUMBERS',
          key: 'NUMBERS',
          width: 120
        },{
          title: '角色名称',
          dataIndex: 'ROLENAME',
          key: 'ROLENAME'
        },{
          title: '所属组织机构',
          dataIndex: 'GROUPNAME',
          key: 'GROUPNAME'
        },{
          title: '所属行政区域',
          dataIndex: 'AREANAME',
          key: 'AREANAME'
        },{
          title: '操作人',
          width: 180,
          dataIndex: 'CREATOR',
          key: 'CREATOR',
          scopedSlots: {
            customRender: 'operator'
          }
        },{
          title: '操作',
          key: 'operation',
          width: 60,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      treeData: [],
      areaCode: '',
      groupLists: [],
      selectedIds:{
        selectIds:'',
        deleteIds:'',
        exportIds:''
      },
      rowSelection:{
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedIds.selectIds = selectedRowKeys
        }
      }
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
  mounted() {
    this.getList()
    this.getArea()
  },
  methods: {
    /**
     * 批量导出多个批次下的临时账户excel
     */
    exportTempAccounts(){
      this.selectedIds.exportIds = this.selectedIds.selectIds
      if(this.selectedIds.exportIds==''){
        this.$modal.warning({
          title: '未选择临时账户批次',
          content: '请勾选至少一条临时账户批次'
        })
      }else{
        window.open(this.$api.BASE_URL+this.$api.GET_TEMPACCOUT_EXCEL_BY_BATCH.replace('{batchids}', this.selectedIds.exportIds).replace('{token}', this.$cookie.get('token')))
        this.selectedIds.exportIds = ''
      }
    },
    /**
     * 删除临时账户批次时，用户二次确认;支持批量删除、单条删除
     * @param {String} id 单条删除时，传入的批次id
     */
    comfirmDeleteTempAccounts(id){
      if(!!id && typeof id=='string'){
        this.selectedIds.deleteIds = id
      }else{
        this.selectedIds.deleteIds = this.selectedIds.selectIds
      }
      if(this.selectedIds.deleteIds==''){
        this.$modal.warning({
          title: '未选择临时账户批次',
          content: '请勾选至少一条临时账户批次'
        })
      }else{
        let vm = this
        this.$modal.confirm({
          title: '是否确认删除已选临时账户批次下所有账户',
          content: '临时账户删除成功后，任何方式都无法找回',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            vm.deleteTempAccounts()
          },
          onCancel() {
            this.selectedIds.deleteIds = ''
          },
        })
      }
    },
    /**
     * 执行临时账户批次删除。并刷新列表
     */
    deleteTempAccounts(){
      this.$ajax.delete({
        url: this.$api.DELETE_TEMPACCOUT.replace('{ids}', this.selectedIds.deleteIds)
      }).then(res => {
        if (res.code === '200') {
          this.selectedIds.deleteIds = ''
          this.$modal.success({
            title: '操作成功',
            content: '删除临时账户成功'
          })
          this.getList()
        }
      })
    },
    /**
     * 关闭批量创建账号弹窗表单，并根据传参判断是否重载列表
     * @param {Boolean} isReload 是否重载列表
     */
    closeAccountCreateModal(isReload){
      this.modalControlers.createTempAccount = false
      if(isReload){
        this.getList()
      }
    },
    closeMoreSearch(){
      this.simpleSearchForm = true
    },
    showMoreSearch(){
      this.simpleSearchForm = false
    },
    pageChange(current) {
      this.pagination.current = current
      this.pagination.pageNo = current
      this.getList()
    },
    // 查询按钮
    search() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.getList()
    },
    // 重置按钮
    reset() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      delete this.searchForm['ui.roleIds_l']
      delete this.searchForm['a.id']
      delete this.searchForm['g.id']
      this.getList()
    },
    // 查询列表
    getList() {
      const params = Object.assign({}, this.params,this.searchForm, {
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize
      })
      if (params['g.id']=='') {
        delete params['g.id']
      }
      this.$ajax.get({
        url: this.$api.GET_TEMPACCOUT_LIST,
        params: params
      }).then(res => {
        this.dataTable = this.$com.confirm(res, 'data.content', [])
        this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    /**
     * 获取当前用户，数据权限范围内的省市区列表
     */
    getArea() {
      this.$ajax.get({
        url: this.$api.GET_AREA_NEXT,
        params: {
          parentId: this.isAdminator ? '999999' : this.$store.state.userInfos.area.id
        }
      }).then(res => {
        let datas = this.$com.confirm(res, 'data.content', [])
        datas.forEach((ele, index) => {
          this.treeData.push(this.getTreeNode(ele, index))
        })
      })
    },
    /**
     * 对接口返回的省市区数据，进行格式化整理
     */
    getTreeNode(item, index) {
      let childrenNode = {
        title: item.areaName,
        value: item.id,
        id: item.id,
        key: item.id,
        parentId: item.parentId,
        children: item.childList
      }
      return childrenNode
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        this.$ajax.get({
          url: this.$api.GET_AREA_NEXT,
          params: {
            parentId: treeNode.dataRef.id
          }
        }).then(res => {
          let datas = this.$com.confirm(res, 'data.content', [])
          let array = []
          datas.forEach((ele, index) => {
            array.push(this.getTreeNode(ele, index))
          })
          treeNode.dataRef.children = array
          // this.treeData = [...this.treeData]
          resolve()
        })
      })
    },
    onChangeTree(value, label, extra) {
      this.defaultValue=label
      this.areaCode = value
      delete this.searchForm['g.id']
      this.getListGroup()
    },
    getListGroup() {
      const params = {
        pageSize: 10000,
        pageNo: 1,
        areaCode: this.areaCode
      }
      if (!this.isAdminator) {
        params.parentId = this.$store.state.userInfos.group.id
      }
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.groupLists = this.$com.confirm(res, 'data.content', [])
      })
    }
  }
}
</script>
<style scoped>
	.exportBtn {
    color:#1890ff;
    border-color: #1890ff;
	}
</style>
