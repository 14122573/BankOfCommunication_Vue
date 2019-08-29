<template>
	<a-card :bordered="false" :style="{margin:'0 0 0 14px'}">
		<a-row type="flex" :gutter="20">
			<a-col :span="6">
				<h2>行政区域</h2>
				<a-alert>
					<div slot="message">
						<a-tree showLine @select="onSelect" v-if="defaultSelectedKeys.length>0" :treeData="treeData" :defaultSelectedKeys="defaultSelectedKeys"
						 :loadData="onLoadData">
						</a-tree>
					</div>
				</a-alert>
			</a-col>
			<a-col :span="18">
				<a-form :form="searchForm">
					<a-row align="middle">
						<a-col span="9">
							<a-form-item label="组织机构名称：" :label-col="labelCol" :wrapper-col="wrapperCol">
								<a-input placeholder="请输入" v-model="searchForm.groupName_l" />
								<!-- <a-select placeholder="请选择" v-model="searchForm.groupName_l" :options='options.nameOptions' /> -->
							</a-form-item>
						</a-col>
						<a-col span="9">
							<a-form-item label="联系人：" :label-col="labelCol" :wrapper-col="wrapperCol">
								<a-input placeholder="请输入" v-model="searchForm.contact_l" />
							</a-form-item>
						</a-col>
						<a-col span="6" class="algin-right">
							<a-button type="primary" ghost @click="handleReset">重置</a-button>
							<a-button type="primary" @click="handleSearch">搜索</a-button>
						</a-col>
					</a-row>
				</a-form>
				<a-row>
					<a-button type="primary" @click="handleAdd">新建单位</a-button>
					<a-button type="primary" @click="toUpload">导入</a-button>
				</a-row>
				<a-table :columns="columns" class="table-margin" rowKey="groupName" :dataSource="dataSource" :pagination="false">
					<span slot="action" slot-scope="text, record">
						<a @click="$router.push({name:'/systemManagement/organization/view',query:{id:record.id}})">查看</a>
						<a-divider type="vertical" />
						<a @click="$router.push({name:'/systemManagement/organization/edit',query:{id:record.id,data:JSON.stringify(transData)}})">修改</a>
						<a-divider type="vertical" />
						<a @click="deleteBtn(text,record)">删除</a>
					</span>
					<span slot="contact" slot-scope="text, record">
						联系人:{{record.contactPhone || "暂无"}}
					</span>
				</a-table>
				<a-row type="flex" justify="end">
					<a-col>
						<a-pagination showQuickJumper :defaultCurrent="1" :total="total" @change="pageChange" />
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<!-- 删除确认 -->
		<a-modal title="操作确认" v-model="visible" @ok="handleOk" :bodyStyle='{"text-align":"center"}' :maskClosable="false"
		 cancelText="取消" okText="删除">
			<p>是否确认删除此组织机构？</p>
			<p>此操作不可撤销</p>
		</a-modal>
	</a-card>
</template>
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
        }],
      },
      dataSource: [],
      columns: [{
        title: '组织机构',
        dataIndex: 'groupName',
        key: 'groupName',
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
        width: 180,
        scopedSlots: {
          customRender: 'action'
        }
      }
      ],
      visible: false,
      pageNo: 1,
      pageSize: 10,
      areaCode: '',
      total: 0,
      opeationItem: {},
      treeData: [],
      defaultSelectedKeys: [],
      transData: {}
    }
  },
  mounted() {
    this.getArea()
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
      this.visible = true
      this.opeationItem = record
    },
    //确认删除
    handleOk() {
      this.$ajax.delete({
        url: this.$api.DELETE_ORGANIZATION_LIST.replace('{id}', this.opeationItem.id)
      }).then(res => {
        this.visible = false
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
      const options = { ...this.searchForm
      }
      const params = Object.assign(options, {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        areaCode: this.areaCode
      })
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.total = this.$com.confirm(res, 'data.totalRows', 0)
        this.dataSource = this.$com.confirm(res, 'data.content', [])
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
        datas.forEach((ele, index) => {
          this.treeData.push(this.getTreeNode(ele, index))
        })
        this.areaCode = this.treeData[0].id
        this.transData.area = this.treeData[0]
        this.defaultSelectedKeys = [this.areaCode]
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
          this.treeData = [...this.treeData]
          resolve()
        })
      })
    },
    onSelect(selectedKeys, info) {
      this.pageNo = 1
      this.areaCode = selectedKeys[0]
      this.transData.area = info.node.dataRef
      this.getLists()
    },
    //搜索
    handleSearch() {
      this.getLists()
    },
    //重置
    handleReset() {
      this.searchForm = {}
      this.getLists()
    },
    //分页
    pageChange(val) {
      this.pageNo = val
      this.getLists()
    },
    handleAdd() {
      if (this.areaCode == undefined) {
        this.$message.error('请先选择行政区域节点再去新增！')
      } else {
        this.$router.push({
          name: '/systemManagement/organization/create',
          query: {
            data: JSON.stringify(transData)
          }
        })
      }
    }
  }
}
</script>
<style scoped>
	.algin-right {
		text-align: right;
	}

	.table-margin {
		margin: 12px 0;
	}
</style>
