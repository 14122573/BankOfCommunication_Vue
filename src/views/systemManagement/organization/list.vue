<template>
	<div class="routerWapper">
		<div v-if="$route.name == '/systemManagement/organization'" class="layoutMargin layoutPadding">
			<a-row :gutter="20">
				<a-col :span="6">
					<div class="institutionalTreeWapper">
						<h2 class="institutionalTreeTitle">行政区域</h2>
						<div class="institutionalTree" style="height:450px">
							<a-tree showLine @select="onSelect" @expand="expand" :expandedKeys="expandedKeys" v-if="selectedKeys.length>0"
							 :treeData="treeData" :selectedKeys="selectedKeys" :loadData="onLoadData">
							</a-tree>
						</div>
					</div>
				</a-col>
				<a-col :span="18">
					<a-form class="protalForm" :form="searchForm">
						<a-row type="flex" justify="center" align="middle">
							<a-col span="8">
								<a-form-item class="formItem" label="组织机构名" :label-col="labelCol" :wrapper-col="wrapperCol">
									<a-input placeholder="请输入" v-model="searchForm.groupName_l" />
								</a-form-item>
							</a-col>
							<a-col span="8">
								<a-form-item class="formItem" label="联系人" :label-col="labelCol" :wrapper-col="wrapperCol">
									<a-input placeholder="请输入" v-model="searchForm.contact_l" />
								</a-form-item>
							</a-col>
							<a-col span="8" class="algin-right">
								<a-button type="primary" ghost @click="handleReset">重置</a-button>
								<a-button type="primary" @click="handleSearch">搜索</a-button>
							</a-col>
						</a-row>
					</a-form>
					<p class="gayLine"></p>
					<div class="portalTableOperates">
						<a-button icon='plus' v-if="$permission('P01001')" type="primary" @click="handleAdd">新建组织机构</a-button>
						<!-- <a-button icon='download' v-if="$permission('P01005')" @click="toUpload">批量导入组织机构</a-button> -->
					</div>
					<a-table class="portalTable" size='small' :columns="columns" rowKey="groupName" :dataSource="dataSource"
					 :pagination="pagination">
						<span slot="action" slot-scope="text, record">
							<span class="actionBtn" v-if="$permission('P01002')" @click="$router.push({name:'/systemManagement/organization/view',query:{id:record.id}})">查看</span>
							<a-divider v-if="$permission('P01002')" type="vertical" />
							<span class="actionBtn" v-if="$permission('P01003')" @click="handleEdit(record)">修改</span>
							<a-divider v-if="$permission('P01003')" type="vertical" />
							<span class="actionBtn" v-if="$permission('P01004')" @click="deleteBtn(text,record)">删除</span>
						</span>
						<span slot="contact" slot-scope="text, record">
							联系人:&nbsp;{{record.contact || "暂无"}}<br />
							联系电话:&nbsp;{{record.contactPhone || "暂无"}}
						</span>
					</a-table>
				</a-col>
			</a-row>
		</div>
		<RouterWapper v-else></RouterWapper>
	</div>
</template>
<style scoped>
	.institutionalTreeWapper {
		height: 90%;
		width: 100%;
		overflow: hidden;
		padding-right: 16px;
		border-right: 1px solid #e0e0e0;
	}

	.institutionalTreeTitle {
		padding-top: 10px;
		width: 100%;
	}

	.institutionalTreeWapper>div {
		height: calc(100% - 50px);
		width: calc(100% - 10px);
		padding: 5px;
		overflow-y: auto;
		overflow-x: scroll;
	}
</style>

<script>
export default {
  name: 'organization',
  data() {
    return {
      searchForm: {},
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
      options: {
        nameOptions: [{
          label: '1',
          value: '1'
        }],
        spaceOptions: [{
          label: '1',
          value: '1'
        }]
      },
      dataSource: [],
      columns: [{
        title: '组织机构',
        dataIndex: 'groupName',
        key: 'groupName'
      },
      {
        title: '联系人',
        dataIndex: 'contact',
        width: 180,
        key: 'contact',
        scopedSlots: {
          customRender: 'contact'
        }
      },
      {
        title: '地址',
        width: 180,
        dataIndex: 'addr',
        key: 'addr'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 160,
        scopedSlots: {
          customRender: 'action'
        }
      }
      ],
      areaCode: '',
      opeationItem: {},
      treeData: [],
      selectedKeys: [],
      expandedKeys: ['all'],
      transData: {},
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        current: 1,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.pageChange
      }
    }
  },
  mounted() {
    if (this.$route.name == '/systemManagement/organization') {
      this.getArea()
    }
  },
  watch: {
    areaCode() {
      this.selectedKeys = [String(this.areaCode)]
    }
  },
  methods: {
    //导入
    toUpload() {
      this.$router.push({
        name: '/systemManagement/organization/upload'
      })
    },
    //删除按钮
    deleteBtn(text, record) {
      let vm = this
      this.opeationItem = record
      this.$model.confirm({
        title: '是否确认删除此组织机构？',
        content: '此操作不可撤销',
        okText: '确认删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          vm.handleOk()
        }
      })
    },
    //确认删除
    handleOk() {
      this.$ajax.delete({
        url: this.$api.DELETE_ORGANIZATION_LIST.replace(
          '{id}',
          this.opeationItem.id
        )
      }).then(res => {
        if (res.code == '200') {
          this.$message.success('删除成功！')
          this.getLists()
        } else {
          this.$message.success('删除失败！')
        }
      })
    },
    //列表
    getLists() {
      const options = {
        ...this.searchForm
      }
      const params = Object.assign(options, {
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.pageNo,
        areaCode: this.areaCode == 'all' ? '' : this.areaCode
      })
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.dataSource = this.$com.confirm(res, 'data.content', [])
        this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    getArea() {
      this.$ajax.get({
        url: this.$api.GET_AREA_NEXT,
        params: {
          parentId: 999999
        }
      }).then(res => {
        let datas = this.$com.confirm(res, 'data.content', [])
        let trees = []
        datas.forEach((ele, index) => {
          trees.push(this.getTreeNode(ele, index))
        })
        this.treeData = [{
          title: '全部',
          key: 'all',
          children: trees
        }]
        this.areaCode = 'all'
        this.getLists()
      })
    },
    getTreeNode(item, index) {
      let childrenNode = {
        title: item.areaName,
        id: item.id,
        key: item.id,
        parentId: item.parentId
      }
      if (item.id.length == '9') {
        childrenNode.isLeaf = true
      }
      return childrenNode
    },
    onLoadData(treeNode) {
      return new Promise(resolve => {
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
          this.treeData = [...this.treeData]
          resolve()
        })
      })
    },
    onSelect(selectedKeys, info) {
      this.pagination.pageNo = 1
      this.pagination.current = 1
      this.areaCode = selectedKeys[0]
      this.transData.area = info.node.dataRef
      if (!this.areaCode) {
        this.areaCode = 'all'
        this.getLists()
      } else {
        this.getLists()
      }
    },
    //搜索
    handleSearch() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.getLists()
    },
    //重置
    handleReset() {
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.searchForm = {}
      this.getLists()
    },
    //分页
    pageChange(val) {
      this.pagination.pageNo = val
      this.pagination.current = val
      this.getLists()
    },
    handleAdd() {
      if (this.areaCode && this.areaCode !== 'all') {
        this.$router.push({
          name: '/systemManagement/organization/create',
          query: {
            data: JSON.stringify(this.transData)
          }
        })
      } else {
        this.$model.warning({
          title: '提示',
          content: '请先选择具体的行政区域节点再去新增！'
        })
      }
    },
    expand(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    handleEdit(record) {
      if (this.areaCode && this.areaCode !== 'all') {
        this.$router.push({
          name: '/systemManagement/organization/edit',
          query: {
            id: record.id,
            data: JSON.stringify(this.transData)
          }
        })
      } else {
        this.$model.warning({
          title: '提示',
          content: '请先选择具体的行政区域节点再去修改！'
        })
      }
    }
  }
}
</script>
