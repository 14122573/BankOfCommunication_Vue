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
						<a-input placeholder="请输入" v-decorator="['addr',searchFormRules.addr]" />
					</a-form-item>
				</a-col>
				<a-col span="6" pull="4">
					<a-form-item>
						<div class="position" @click="map=true;position=searchForm.getFieldValue('addr')">
							<a-icon type="environment" />&nbsp;查看地图定位</div>
					</a-form-item>
				</a-col>
			</a-row>
			<a-divider dashed />
			<a-row type="flex" justify="space-between">
				<a-col span="8">
					<a-form-item label="角色名称：" v-bind="colSpe">
						<a-select placeholder="请选择" @change="roleChange" allowClear mode="multiple" labelInValue v-decorator="['notes', searchFormRules.notes]">
							<a-select-option v-for="(item,index) in roleList" :key="index" :value="item.id">{{item.roleName}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col span="8">
					<a-form-item label="所属区域：" v-bind="colSpe">
						<a-tree-select :treeData="administrativeRegions" v-decorator="['area',searchFormRules.area]" :loadData="onLoadData"
						 :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }" placeholder='请选择' allowClear @change="onChangeTree">
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
		<a-tree showLine checkable disabled :treeData="treeData" v-model="checkedKeys" />
		<a-modal title="查看地图定位" :width='880' :bodyStyle="{'text-align':'center'}" :visible="map" :closable='false'>
			<template slot="footer">
				<a-button @click="map=false" ghost type="primary">取消</a-button>
				<a-button @click="map=false" type="primary">确认</a-button>
			</template>
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
        notes: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            message: '请选择角色名称！'
          }]
        }
      },
      isAdminator: '',
      administrativeRegions: [],
      groupLists: [],
      groupName: '',
      roleList: [],
      roles: []
    }
  },
  mounted() {
    this.isAdminator = this.$store.state.userInfos.isAllPerm
    this.getArea()
    this.getTree()
    this.getRoleLists()
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
    handleReturn() {
      this.$router.push({
        name: '/systemManagement/administrator'
      })
    },
    handleAdd() {
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          values.area = {
            id: this.areaCode,
            name: this.groupName
          }
          let isSelect=this.searchForm.isFieldTouched('area')
          if(isSelect){
            let groupId = JSON.parse(JSON.stringify(values.group))
            let data = this.groupLists.find(ele => ele.id == groupId)
            values.group = {
              id: groupId,
              name: data.groupName
            }
          }else{
            values.group = {
              id: this.detail.group.id,
              name: values.groupName
            }
          }
          values.roleIds = (this.roles.map(ele => {
            return ele.key
          })).join(',')
          values.roleNames = (this.roles.map(ele => {
            return ele.label
          })).join(',')
          if (!this.$route.query.id) {
            this.$ajax.post({
              url: this.$api.POST_ADD_USER,
              params: values
            }).then(res => {
              if (res.code == '200') {
                this.$message.success('新增成功！')
                this.$router.push({
                  name: '/systemManagement/administrator'
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$ajax.put({
              url: this.$api.PUT_USER_LIST.replace('{id}', this.$route.query.id),
              params:values
            }).then(res => {
              if (res.code == '200') {
                this.$message.success('修改成功！')
                this.$router.push({
                  name: '/systemManagement/administrator'
                })
              } else {
                this.$message.error('修改失败！')
              }
            })
          }
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
    onChangeTree(value, label) {
      this.areaCode = value
      this.groupName = label[0]
      this.groupLists=[]
      this.searchForm.setFieldsValue({group:''})
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
    },
    getRoleLists() {
      this.$ajax.get({
        url: this.$api.GET_ROLE_LIST,
        params: {
          pageNo: 1,
          pageSize: 10000
        }
      }).then(res => {
        this.roleList = this.$com.confirm(res, 'data.content', [])
        if (this.$route.query.id) {
          this.getDetail()
        }
      })
    },
    // 角色切换
    roleChange(item) {
      this.roles = item
      if (item.length != 0) {
        let params = item.map((it) => {
          return it.key
        })
        this.$ajax.get({
          url: this.$api.ROLE_DETAIL.replace('{id}', params)
        })
          .then(res => {
            if (res.code === '200') {
              let data = res.data.content
              this.checkedKeys = data.map((item) => {
                return item.id
              })
            } else {
              this.$message.error(res.msg)
            }
          })
      }
    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_USER_DETAIL.replace('{id}', this.$route.query.id)
      }).then(res => {
        this.detail = res.data.content
        this.onChangeTree(this.detail.area.id, [this.detail.area.areaName])
        const {
          mail,
          name,
          dept,
          phone,
          addr,
          zipCode
        } = this.detail

        let datas = this.detail.roleIds.split(',')
        let datas1 = this.detail.roleNames.split(',')
        datas.forEach((ele, index) => {
          datas[index] = {
            'key': ele,
            'label': datas1[index]
          }
        })
        let setDatas = {
          mail,
          name,
          dept,
          phone,
          addr,
          zipCode,
        }
        setDatas.group = this.detail.group.id
        setDatas.area = this.detail.area.areaName
        setDatas.notes = datas
        this.roles = datas
        this.searchForm.setFieldsValue(setDatas)
        this.roleChange(datas)
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
