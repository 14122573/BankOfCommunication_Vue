<template>
	<div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">{{fromCenter ? '账户基本信息修改' : $route.meta.title}}</span>
			<div class="detailOperations">
				<a-button @click='handleReturn'>返回</a-button>
				<a-button type="primary" @click='handleAdd' html-type="submit">保存</a-button>
			</div>
		</div>
		<div class="portalDetailContentWapper">
			<a-form class="protalForm portalDetailContentBody" :form="searchForm">
				<div class="layoutMargin detailsPartSection">
					<p class="detailsPartTitle">账户信息</p>
					<a-row class="formItemLine">
						<a-col span="8">
							<a-form-item class="formItem" label="姓名" v-bind="colSpe">
								<a-input placeholder="请输入" v-decorator="['name',searchFormRules.name]" />
							</a-form-item>
						</a-col>
						<a-col span="8">
							<a-form-item class="formItem" label="账号" v-bind="colSpe">
								<a-input placeholder="请输入手机号" :disabled="fromCenter" v-decorator="['phone',searchFormRules.phone]" />
							</a-form-item>
						</a-col>
						<a-col span="8">
							<a-form-item class="formItem" label="邮箱" v-bind="colSpe">
								<a-input placeholder="请输入" v-decorator="['mail',searchFormRules.mail]" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row class="formItemLine">
						<a-col span="8">
							<a-form-item class="formItem" label="邮编" v-bind="colSpe">
								<a-input placeholder="请输入" v-decorator="['zipCode',searchFormRules.zipCode]" />
							</a-form-item>
						</a-col>
						<a-col span="16">
							<a-form-item class="formItem" label="单位名称" :label-col="{span:3}" :wrapper-col="{span:15}" v-bind="colSpe">
								<a-input placeholder="请输入" v-decorator="['dept',searchFormRules.dept]" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row class="formItemLine">
						<a-col span="16">
							<a-form-item class="formItem" label="地址" :label-col="{span:3}" :wrapper-col="{span:15}">
								<a-input placeholder="请输入" v-decorator="['addr',searchFormRules.addr]" />
							</a-form-item>
						</a-col>
					</a-row>
				</div>
				<div v-if="!fromCenter" class="layoutMargin detailsPartSection">
					<p class="detailsPartTitle">账户信息</p>
					<a-row class="formItemLine">
						<a-col span="8" v-if="!fromCenter">
							<a-form-item label="角色名称" v-bind="colSpe">
								<a-select placeholder="请选择" @change="roleChange" allowClear mode="multiple" labelInValue v-decorator="['notes', searchFormRules.notes]">
									<a-select-option v-for="(item,index) in roleList" :key="index" :value="item.id">{{item.roleName}}</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col span="8">
							<a-form-item label="所属区域" v-bind="colSpe">
								<!-- <a-select v-if="isAdminator !== true" placeholder="请选择" labelInValue @change="onChangeTree" showSearch
								 v-decorator="['area',searchFormRules.area]">
									<a-select-option v-for="(item,index) in administrativeRegions" :key="index" :value="item.id">{{item.title}}</a-select-option>
								</a-select> -->
								<a-tree-select :treeData="administrativeRegions" v-decorator="['area',searchFormRules.area]" :loadData="onLoadData"
								 :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }" placeholder='请选择' allowClear @change="onChangeTree">
								</a-tree-select>
							</a-form-item>
						</a-col>
						<a-col span="8">
							<a-form-item label="组织机构" v-bind="colSpe">
								<a-select v-decorator="['group',searchFormRules.group]" allowClear placeholder='请选择'>
									<a-select-option v-for="(item,index) in groupLists" :key="index" :value="item.id">{{item.groupName}}</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<div class="layoutMargin detailsPartLine">
						<a-tree class="portalRoleTree" checkable disabled :treeData="treeData" v-model="checkedKeys" />
					</div>
				</div>
			</a-form>
		</div>
	</div>
</template>

<script>
export default {
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
            validator: this.validatePhone
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
      areaName: '',
      roleList: [],
      roles: [],
      fromCenter: false, // 是否从个人中心-账户信息跳转过来的
    }
  },
  mounted() {
    this.isAdminator = this.$store.state.userInfos.isAllPerm
    this.getArea()
    this.getTree()
    this.getRoleLists()
    const {fromCenter} = this.$route.query
    this.fromCenter = (fromCenter && fromCenter === '1') // 从个人中心-账户信息跳过来的不能修改手机号
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
      this.$router.back()
    },
    handleAdd() {
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          values.area = {
            id: this.areaCode,
            name: this.areaName
          }
          let isSelect = this.searchForm.isFieldTouched('group')
          if (isSelect) {
            if (values.group != '' && values.group != undefined) {
              let groupId = JSON.parse(JSON.stringify(values.group))
              let data = this.groupLists.find(ele => ele.id == groupId)
              values.group = {
                id: groupId,
                name: data.groupName
              }
            } else {
              delete values.group
            }
          } else {
            if (this.detail && this.detail.group != null) {
              values.group = {
                id: this.detail.group.id,
                name: this.detail.group.groupName
              }
            } else {
              values.group = null
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
              }
            })
          } else {
            if (this.fromCenter) { // 如果是用户中心-基本信息过来修改的则用此接口
              this.$ajax.put({
                url: this.$api.PUT_EDIT_USER,
                params: values,
              }).then(res => {
                this.$modal.success({
                  title: '成功',
                  content: '修改成功',
                  okText: '确认',
                })
                this.$nextTick(() => this.$router.back())
              })
              return
            }
            this.$ajax.put({
              url: this.$api.PUT_USER_LIST.replace('{id}', this.$route.query.id),
              params: values
            }).then(res => {
              if (res.code == '200') {
                this.$message.success('修改成功！')
                this.$router.push({
                  name: '/systemManagement/administrator'
                })
              }
            })
          }
        } else {
          this.$com.getFormValidErrTips(this, err)
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
      // if (this.isAdminator != true) {
      //   this.areaCode = value.key
      //   this.areaName = value.label
      // } else {
      this.areaCode = value
      this.areaName = label[0]
      // }
      this.groupLists = []
      this.searchForm.setFieldsValue({
        group: ''
      })
      this.getListGroup()
    },
    getListGroup() {
      const params = {
        pageSize: 10000,
        pageNo: 1,
        areaCode: this.areaCode
      }
      // if (!this.isAdminator) {
      //   params.parentId = this.$store.state.userInfos.group?this.$store.state.userInfos.group.id:''
      // }
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.groupLists = this.$com.confirm(res, 'data.content', [])
      })
    },
    getRoleLists() {
      let curUserRoles = this.$store.state.userInfos.roleIds
      let sparams = {
        pageNo: 1,
        pageSize: 10000
      }
      if(!!curUserRoles){
        sparams['id_in'] = curUserRoles
      }
      console.log(this.$store.state.userInfos,sparams)
      this.$ajax.get({
        url: this.$api.GET_ROLE_LIST,
        params: sparams
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
        }).then(res => {
          if (res.code === '200') {
            let data = res.data.content
            for(let i=0;i<data.length;i++){
              if(false ===data[i].canDelete){
              }else{
                this.checkedKeys.push(data[i].id)
              }
            }
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
        if (this.detail.area != null) {
          // if (!this.isAdminator) {
          //   let obj = {
          //     key: this.detail.area.id,
          //     label: this.detail.area.areaName
          //   }
          //   this.onChangeTree(obj)
          // } else {
          this.onChangeTree(this.detail.area.id, [this.detail.area.areaName])
          // }
        }
        const {
          mail,
          name,
          dept,
          phone,
          addr,
          zipCode
        } = this.detail

        // 整理当前用户详情中的角色ID数据，去除重复
        let datas = this.detail.roleIds != null ? this.detail.roleIds.split(',') : []
        let userRoleIDs = []
        for(var i=0;i<datas.length;i++){
          if(userRoleIDs.indexOf(datas[i]) == -1){
            userRoleIDs.push(datas[i])
          }
        }
        // 整理当前用户详情中的角色名称数据，去除重复
        let datas1 = this.detail.roleNames != null ? this.detail.roleNames.split(',') : []
        let userRoleNames = []
        for(var i=0;i<datas1.length;i++){
          if(userRoleNames.indexOf(datas1[i]) == -1){
            userRoleNames.push(datas1[i])
          }
        }
        // 组装需要展示在用户信息表单“角色名称”项的初始数据
        userRoleIDs.forEach((ele, index) => {
          userRoleIDs[index] = {
            'key': ele,
            'label': userRoleNames[index]
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
        setDatas.group = this.detail.group != null ? this.detail.group.id : ''
        // if (this.isAdminator) {
        setDatas.area = this.detail.area != null ? this.detail.area.areaName : ''
        // } else {
        //   setDatas.area = {
        //     label: this.detail.area.areaName,
        //     key: this.detail.area.id
        //   }
        // }
        setDatas.notes = userRoleIDs
        this.roles = userRoleIDs
        this.searchForm.setFieldsValue(setDatas)
        this.roleChange(userRoleIDs)
      })
    },
    validatePhone(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入账号！')
      } else {
        if (!this.$route.query.id) {
          if (!this.$com.checkPhone(value)) {
            callback('登录手机号码不合法!')
          } else {
            if (value.length == '11') {
              this.$ajax.get({
                url: this.$api.GET_CHECK_PHONE_EXIST + '?phone=' + value
              }).then(res => {
                if (res.data.content == false) {
                  callback()
                } else {
                  callback('已存在该账号！')
                }
              })
            }
          }
        } else {
          callback()
        }
      }
    }
  }
}
</script>

<style scoped>
	.position {
		margin-left: 5px;
		color: #1890ff;
		cursor: pointer;
		display: inline;
	}
</style>
<style>

</style>
