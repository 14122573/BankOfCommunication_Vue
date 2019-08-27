<template>
	<a-card :bordered='false' :style="{margin:'0 0 0 14px'}">
		<a-row type="flex" justify="space-between" slot='title'>
			<a-col>
				{{$route.meta.title}}
			</a-col>
			<a-col>
				<a-button type="primary" ghost @click='handleReturn'>返回</a-button>
				<a-button type="primary" @click='handleAdd' html-type="submit">保存</a-button>
			</a-col>
		</a-row>
		<a-form :form="searchForm">
			<a-row type="flex" justify="space-between">
				<a-col span="8">
					<a-form-item label="姓名："  v-bind="colSpe">
						<a-input placeholder="请输入" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="账号：" v-bind="colSpe">
						<a-input placeholder="请输入" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="邮箱"  v-bind="colSpe">
						<a-input placeholder="请输入" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start">
				<a-col span="8">
					<a-form-item label="邮编：" v-bind="colSpe">
						<a-input placeholder="请输入" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start">
				<a-col span="16">
					<a-form-item label="单位名称：" :label-col="{span:3}" :wrapper-col="{span:15}">
						<a-input placeholder="请输入" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col span="16">
					<a-form-item label="地址：" :label-col="{span:3}" :wrapper-col="{span:15}">
						<a-input placeholder="请输入" @change='keyWords=searchForm.name' />
					</a-form-item>
				</a-col>
				<a-col span="6" pull="4">
					<a-form-item>
						<div class="position" @click="map=true">
							<a-icon type="environment" />&nbsp;查看地图定位</div>
					</a-form-item>
				</a-col>
			</a-row>
			<a-divider dashed />
			<a-row type="flex" justify="space-between">
				<a-col span="8">
					<a-form-item label="角色名称："  v-bind="colSpe">
						<a-input placeholder="请输入" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="组织机构："  v-bind="colSpe">
						<a-input placeholder="请输入" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="所属区域：" v-bind="colSpe">
						<a-input placeholder="请输入" />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<a-tree class="tree" :blockNode="true" checkable @expand="onExpand" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent"
		 v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData" />
		<a-modal title="查看地图定位" :width='880' :bodyStyle="{'text-align':'center'}" :visible="map" :closable='false'>
			<template slot="footer">
				<a-button @click="map=false" ghost type="primary">取消</a-button>
				<a-button @click="map=false" type="primary">确认</a-button>
			</template>
			<BMapComponent :height="250" :width="830" :keyWords="keyWords" />
		</a-modal>
	</a-card>
</template>

<script>
import BMapComponent from '@/components/BaiduMap/BMapComponent.vue'
export default {
  components: {
    BMapComponent
  },
  beforeCreate() {
    this.searchForm = this.$form.createForm(this)
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      colSpe:{
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 15
        }
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
      }],
      map: false,
      keyWords: ''
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
      this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    handleReturn() {
      this.$router.push({
        name: '/systemManagement/administrator'
      })
    },
    handleAdd() {}
  }
}
</script>

<style scoped>
	.position {
		margin-left: 5px;
		color: #1890ff;
		cursor: pointer;
	}
</style>
<style>
	.tree>li {
		background: rgba(247, 247, 247);
	}

	.tree li ul {
		background: white;
	}
</style>
