<template>
	<div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">新增专家账号</span>
			<div class="detailOperations">
				<a-button @click='handleReturn'>返回</a-button>
				<a-button type="primary" @click='handleAdd'>保存</a-button>
			</div>
		</div>
		<div class="portalDetailContentWapper">
			<div class="portalDetailContentBody">
				<div class="layoutMargin layoutPadding">
					<a-form class="protalForm" :form="searchForm">
						<a-row type="flex" justify="space-between" class="formItemLine">
							<a-col span="6">
								<a-form-item label="姓名" v-bind="colSpe">
									<a-input placeholder="请输入" v-model="searchForm.name_l" />
								</a-form-item>
							</a-col>
							<a-col span="6">
								<a-form-item label="手机号" v-bind="colSpe">
									<a-input placeholder="请输入" v-model="searchForm['ui.phone_l']" />
								</a-form-item>
							</a-col>
							<a-col span="6">
								<a-form-item label="账户角色" v-bind="colSpe">
									<a-select placeholder="请选择" :options="roleList" allowClear v-model="searchForm['ui.roleIds']" />
								</a-form-item>
							</a-col>
							<a-col span="6">
								<a-form-item label="行政区域" v-bind="colSpe">
									<a-select v-model="searchForm['ui.areaId']" allowClear v-if="isAdminator !== true" placeholder="请选择" @change="onChangeTree"
									 showSearch>
										<a-select-option v-for="(item,index) in treeData" :key="index" :value="item.id">{{item.title}}</a-select-option>
									</a-select>
									<a-tree-select v-else :treeData="treeData" :loadData="onLoadData" v-model="searchForm['ui.areaId']"
									 :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }" placeholder='请选择' allowClear @change="onChangeTree">
									</a-tree-select>
								</a-form-item>
							</a-col>
						</a-row>
						<a-row type="flex" justify="space-between" align='middle' class="formItemLine">
							<a-col span="6">
								<a-form-item label="组织机构" v-bind="colSpe">
									<a-select v-model="searchForm['ui.groupId']" allowClear placeholder='请选择'>
										<a-select-option v-for="(item,index) in groupLists" :key="index" :value="item.id">{{item.groupName}}</a-select-option>
									</a-select>
								</a-form-item>
							</a-col>
							<a-col span="6" class="algin-right">
								<a-button @click="reset" html-type="submit">重置</a-button>
								<a-button type="primary" @click="search" html-type="submit">搜索</a-button>
							</a-col>
						</a-row>
					</a-form>
					<p class="gayLine"></p>
					<a-table size='small' class="portalTable" :rowSelection="rowSelection" :columns="columns" :dataSource="dataTable"
					 rowKey='id' :pagination='pagination'>
						<span slot="group" slot-scope="text, record">
							{{record.group!=null?record.group.groupName: "暂无"}}
						</span>
						<span slot="area" slot-scope="text, record">
							{{record.area!=null?record.area.areaName: "暂无"}}
						</span>
						<span slot="roleNames" slot-scope="text, record">
							{{record.roleNames!=null?record.roleNames: "暂无"}}
						</span>
					</a-table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'expertLibrary-select',
  data() {
    return {
      roleList: [],
      colSpe  : {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        },
      },
      params: {
        'ui.createTime_desc': 1,
      },
      pagination: {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.pageChange
      },
      searchForm: {

      },
      dataTable: [],
      columns  : [ {
        title    : '姓名',
        dataIndex: 'name'
      },
      {
        title    : '账号',
        dataIndex: 'phone'
      },
      {
        title      : '账户角色',
        dataIndex  : 'roleNames',
        scopedSlots: {
          customRender: 'roleNames'
        }
      },
      {
        title      : '组织机构',
        dataIndex  : 'group',
        scopedSlots: {
          customRender: 'group'
        }
      },
      {
        title      : '行政区域',
        dataIndex  : 'area',
        scopedSlots: {
          customRender: 'area'
        }
      }
      ],
      opeation: {
        title: '',
        tips : '',
        type : '',
        item : null
      },
      treeData    : [],
      isAdminator : '',
      areaCode    : '',
      groupLists  : [],
      rowSelection: {
        onChange: this.tableSelectChange
      },
      selectedRowKeys: []
    }
  },
  mounted() {
    this.getList()
    this.isAdminator = this.$store.state.userInfos.isAllPerm
    this.getArea()
    this.getRoleList()
  },
  methods: {
    pageChange(current) {
      this.pagination.pageNo = current
      this.getList()
    },
    // 查询按钮
    search() {
      this.pagination.pageNo = 1
      this.getList()
    },
    // 重置按钮
    reset() {
      this.pagination.pageNo = 1
      delete this.searchForm.name_l
      delete this.searchForm['ui.phone_l']
      delete this.searchForm['ui.roleIds']
      delete this.searchForm['ui.areaId']
      delete this.searchForm['ui.groupId']
      this.getList()
    },
    // 查询列表
    getList() {
      let options = JSON.parse(JSON.stringify(this.searchForm))
      const params = Object.assign(options, {
        pageNo              : this.pagination.pageNo,
        pageSize            : this.pagination.pageSize,
        'oa.status_in'      : '0,1',
        'ui.createTime_desc': '1'
      })
      this.$ajax.get({
        url   : this.$api.GET_USER_EXPERT_LIST,
        params: params
      }).then(res => {
        this.dataTable = res.data.content
        this.pagination.total = res.data.totalRows
      })
    },
    getArea() {
      this.$ajax.get({
        url   : this.$api.GET_AREA_NEXT,
        params: {
          parentId: this.isAdminator ? '0' : this.$store.state.userInfos.area.id
        }
      }).then(res => {
        let datas = this.$com.confirm(res, 'data.content', [])
        datas.forEach((ele, index) => {
          this.treeData.push(this.getTreeNode(ele, index))
        })
      })
    },
    getTreeNode(item, index) {
      let childrenNode = {
        title   : item.areaName,
        value   : item.id,
        id      : item.id,
        key     : item.id,
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
          url   : this.$api.GET_AREA_NEXT,
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
          this.treeData = [ ...this.treeData ]
          resolve()
        })
      })
    },
    onChangeTree(value, label, extra) {
      this.areaCode = value
      delete this.searchForm['ui.groupId']
      this.getListGroup()
    },
    getListGroup() {
      const params = {
        pageSize: 10000,
        pageNo  : 1,
        areaCode: this.areaCode
      }
      if (!this.isAdminator) {
        params.parentId = this.$store.state.userInfos.group.id
      }
      this.$ajax.get({
        url   : this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.groupLists = this.$com.confirm(res, 'data.content', [])
      })
    },
    // 查询角色列表
    getRoleList() {
      this.$ajax.get({
        url   : this.$api.GET_ROLE_LIST,
        params: {
          pageNo  : 1,
          pageSize: 10000
        }
      }).then(res => {
        if (res.code === '200') {
          let data = res.data.content
          this.roleList = data.map(item => {
            return {
              label: item.roleName,
              value: item.id
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    tableSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleAdd() {
      if (this.selectedRowKeys.length > 0) {
        this.$ajax.put({
          url   : this.$api.PUT_CHANGE_EXPERT,
          params: this.selectedRowKeys
        }).then(res => {
          this.$router.push({
						 name: '/expertManagement/expertLibrary'
					 })
        })
      } else {
        this.$modal.warning({
          title  : '提示',
          content: '请至少选择一条数据！',
        })
      }
    },
    handleReturn() {
      this.$router.push({
        name: '/expertManagement/expertLibrary'
      })
    }
  }
}
</script>
<style scoped>
</style>
