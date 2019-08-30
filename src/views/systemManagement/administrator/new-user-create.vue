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
					<a-form-item label="姓名：" v-bind="colSpe">
						<a-input placeholder="请输入" v-decorator="['name',searchFormRules.name]" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="账号：" v-bind="colSpe">
						<a-input placeholder="请输入" v-decorator="['phone',searchFormRules.phone]" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="邮箱" v-bind="colSpe">
						<a-input placeholder="请输入" v-decorator="['mail',searchFormRules.mail]" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start">
				<a-col span="8">
					<a-form-item label="邮编：" v-bind="colSpe">
						<a-input placeholder="请输入" v-decorator="['zipCode',searchFormRules.zipCode]" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start">
				<a-col span="16">
					<a-form-item label="单位名称：" :label-col="{span:3}" :wrapper-col="{span:15}" v-bind="colSpe">
						<a-input placeholder="请输入" v-decorator="['dept',searchFormRules.dept]" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col span="16">
					<a-form-item label="地址：" :label-col="{span:3}" :wrapper-col="{span:15}">
						<a-input placeholder="请输入" @blur='position=searchForm.getFieldValue("addr")' v-decorator="['addr',searchFormRules.addr]" />
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
					<a-form-item label="角色名称：" v-bind="colSpe">
						<a-input placeholder="请输入" v-decorator="['roleNames',searchFormRules.roleNames]" />
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="所属区域：" v-bind="colSpe">
						<a-tree-select :treeData="administrativeRegions"  v-decorator="['area',searchFormRules.area]" :loadData="onLoadData"
						 :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }" placeholder='请选择' allowClear @change="onChangeTree">
						</a-tree-select>
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="组织机构：" v-bind="colSpe">
						<a-select v-decorator="['group',searchFormRules.group]" placeholder='请选择'>
							<a-select-option v-for="(item,index) in groupLists" :key="index" :value="item.id">{{item.groupName}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<a-tree showLine checkable :treeData="treeData" v-model="checkedKeys" />
		<a-modal title="查看地图定位" :width='880' :bodyStyle="{'text-align':'center'}" :visible="map" :closable='false'>
			<template slot="footer">
				<a-button @click="map=false" ghost type="primary">取消</a-button>
				<a-button @click="map=false" type="primary">确认</a-button>
			</template>
			{{position}}
			<BMapComponent :height="250" :width="830" :keyWords="position" />
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
      colSpe: {
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
      treeData: [],
      map: false,
      position: '',
      searchFormRules: {
        name: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            message: '请输入姓名'
          }]
        },
        phone: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            message: '请输入账号'
          }]
        },
        mail: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            message: '请输入邮箱'
          }, {
            type: 'email',
            message: '邮箱格式不合法'
          }]
        },
        zipCode: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            message: '请输入邮编'
          }]
        },
        dept: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            message: '请输入单位名称'
          }]
        },
        addr: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            message: '请输入地址'
          }]
        },
        group: {
          validateTrigger: 'change',
          rules: [{
            required: true,
            message: '请选择组织机构！'
          }]
        },
        area: {
          validateTrigger: 'change',
          rules: [{
            required: true,
            message: '请选择所属区域！'
          }]
        },
        roleNames: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            message: '请输入角色名称！'
          }]
        }
      },
      isAdminator: '',
      administrativeRegions: [],
      groupLists: [],
      groupName:'',
      // showTree: false
    }
  },
  mounted() {
    this.isAdminator = this.$store.state.userInfos.isAllPerm
    this.getArea()
    this.getTree()
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  methods: {
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
        value:item.id
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
    handleReturn() {
      this.$router.push({
        name: '/systemManagement/administrator'
      })
    },
    handleAdd() {
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          values.area={id:this.areaCode,name:this.groupName}
          let groupId=JSON.parse(JSON.stringify(values.group))
          let data=this.groupLists.find(ele=>ele.id==groupId)
          values.group={id:groupId,name:data.groupName}
          values.roleIds=this.checkedKeys
          this.$ajax.post({url:this.$api.POST_ADD_USER,params:values}).then(res=>{
            if(res.code=='200'){
              this.$message.success('新增成功！')
            }else{
              this.$message.error('新增失败！')
            }
          })
        }
      })
    },
    getArea() {
      this.$ajax.get({
        url: this.$api.GET_AREA_NEXT,
        params: {
          parentId: this.isAdminator ? '999999' : this.$store.state.userInfos.area.id
        }
      }).then(res => {
        let datas = this.$com.confirm(res, 'data.content', [])
        datas.forEach((ele, index) => {
          this.administrativeRegions.push(this.getTreeNode(ele, index))
        })
      })
    },
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
          this.treeData = [...this.treeData]
          resolve()
        })
      })
    },
    onChangeTree(value, label, extra) {
      this.areaCode = value
      this.groupName=label[0]
      this.getListGroup()
    },
    getListGroup() {
      const params = {
        pageSize: 10000,
        pageNo: 1,
        areaCode: this.areaCode
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
