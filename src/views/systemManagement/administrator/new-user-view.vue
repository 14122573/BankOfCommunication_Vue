<template>
	<a-card :bordered='false' class="layoutMargin">
		<a-row type="flex" justify="space-between" slot='title'>
			<a-col>
				查看新用户信息
			</a-col>
			<a-col>
				<a-button type="primary" ghost @click='handleReturn'>返回</a-button>
				<a-button type="primary" @click='handleEdit'>修改</a-button>
			</a-col>
		</a-row>
		<a-row type="flex" justify="start">
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						姓名：
					</a-col>
					<a-col span="17">
						{{detail.name || "暂无"}}
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						账户：
					</a-col>
					<a-col span="17">
						{{detail.phone || "暂无"}}
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						邮箱：
					</a-col>
					<a-col span="17">
						{{detail.mail || "暂无"}}
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						邮编：
					</a-col>
					<a-col span="17">
						{{detail.zipCode || "暂无"}}
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						单位名称：
					</a-col>
					<a-col span="17">
						{{detail.dept|| "暂无"}}
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						地址：
					</a-col>
					<a-col span="17">
						{{detail.addr || "暂无"}} <span class="position" @click="map=true;position=detail.addr">
							<a-icon type="environment" />&nbsp;查看地图定位</span>
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-divider dashed />
		<a-row>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						角色名称：
					</a-col>
					<a-col span="17">
						{{detail.roleNames || "暂无"}}
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						组织机构名称：
					</a-col>
					<a-col span="17">
						{{detail.area!=null?detail.area.areaName:"暂无"}}
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						所属行政区域：
					</a-col>
					<a-col span="17">
						{{detail.group!=null?detail.group.groupName:"暂无"}}
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-tree showLine checkable :treeData="treeData" v-model="checkedKeys" disabled />
		<a-modal title="查看地图定位"  :width='880' :bodyStyle="{'text-align':'center'}" :visible="map" :closable='false'>
			<template slot="footer">
				<a-button @click="map=false" ghost type="primary">取消</a-button>
				<a-button @click="map=false" type="primary">确认</a-button>
			</template>
			<BMapComponent refs="bdMap" :height="250" :width="830" :keyWords="position" />
		</a-modal>
	</a-card>
</template>

<script>
import BMapComponent from '@/components/BaiduMap/BMapComponent.vue'
export default {
  components: {
    BMapComponent
  },
  data() {
    return {
      defaultExpandedKeys: [],
      checkedKeys: [],
      map: false,
      position: '',
      detail: {},
      treeData: []
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    handleReturn() {
      this.$router.back()
    },
    handleEdit() {
      this.$router.push({
        name: '/systemManagement/administrator/editNewUser',
        query: {
          id: this.$route.query.id
        }
      })
    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_USER_DETAIL.replace('{id}', this.$route.query.id)
      }).then(res => {
        this.detail = res.data.content
        this.getTree()
        this.getDefaultRole(this.detail.roleIds)
      })
    },
    // 查询权限树
    getTree() {
      this.$ajax.get({
        url: this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res => {
        let data = res.data.content
        data.forEach((item, index) => {
          this.treeData.push(this.getTreeData(item, index))
        })
      })
    },
    // 整理权限树
    getTreeData(item, index) {
      let childrenNode = {
        title: item.permName,
        key: item.id,
        value: item.id
      }
      if (item.childList && item.childList.length) {
        childrenNode.children = []
        item.childList.forEach((subItem, subIndex) => {
          let subkey = subItem.id
          childrenNode.children.push(this.getTreeData(subItem, subkey))
        })
      }
      return childrenNode
    },
    getDefaultRole(params) {
      this.$ajax.get({
        url: this.$api.ROLE_DETAIL.replace('{id}', params)
      })
        .then(res => {
          if (res.code === '200') {
            let data = res.data.content
            this.checkedKeys = data.map((item) => {
              return item.id
            })
          }
        })
    }
  }
}
</script>
<style scoped>
	.colMargin {
		margin-bottom: 20px;
	}

	.colLabel {
		text-align: right;
	}

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
