<template>
	<a-card :bordered='false'>
		<a-row type="flex" justify="space-between" slot='title'>
			<a-col>
				新增用户信息
			</a-col>
			<a-col>
				<a-button type="primary" ghost @click='handleReturn'>返回</a-button>
				<a-button type="primary" @click='handleAdd'>保存</a-button>
			</a-col>
		</a-row>
		<a-form :form="searchForm">
			<a-row type="flex" justify="space-between">
				<a-col span="8">
					<a-form-item label="姓名：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="账号：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="邮箱" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start">
				<a-col span="8">
					<a-form-item label="邮编：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start">
				<a-col span="16">
					<a-form-item label="单位名称：" :label-col="{span:3}" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start">
				<a-col span="16">
					<a-form-item label="地址：" :label-col="{span:3}" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-divider dashed />
			<a-row type="flex" justify="space-between">
				<a-col span="8">
					<a-form-item label="角色名称：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="组织机构：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="所属区域：" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-input placeholder="请输入" v-model="searchForm.name" />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<a-tree class="tree" checkable @expand="onExpand" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent"
		 v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData" />
	</a-card>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: ''
      },
      dateFormat: 'YYYY-MM-DD',
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 15
      },
      autoExpandParent: true,
      checkedKeys: [],
      expandedKeys: [],
      selectedKeys: [],
      treeData: [{
        title: '0-0',
        key: '0-0',
        children: [{
          title: '0-0-0',
          key: '0-0-0',
          children: [{
            title: '0-0-0-0',
            key: '0-0-0-0'
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1'
          },
          {
            title: '0-0-0-2',
            key: '0-0-0-2'
          },
          ],
        }, {
          title: '0-0-1',
          key: '0-0-1',
          children: [{
            title: '0-0-1-0',
            key: '0-0-1-0'
          },
          {
            title: '0-0-1-1',
            key: '0-0-1-1'
          },
          {
            title: '0-0-1-2',
            key: '0-0-1-2'
          },
          ],
        }, {
          title: '0-0-2',
          key: '0-0-2',
        }],
      }, {
        title: '0-1',
        key: '0-1',
        children: [{
          title: '0-1-0-0',
          key: '0-1-0-0'
        },
        {
          title: '0-1-0-1',
          key: '0-1-0-1'
        },
        {
          title: '0-1-0-2',
          key: '0-1-0-2'
        },
        ],
      }, {
        title: '0-2',
        key: '0-2',
      }]
    }
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // this.expandedKeys.push(expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      // this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    handleReturn(){
      this.$router.push({
        name:'/systemManagement/administrator'
      })
    },
    handleSave(){
				
    }
  }
}
</script>

<style scoped>

</style>
<style>
	.tree>li {
		background: rgba(247, 247, 247);
	}

	.tree li ul {
		background: white;
	}
</style>
