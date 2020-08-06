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
				<div class="layoutMargin layoutPadding detailsPartSection">
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
					<a-row class="formItemLine">
						<a-col span="8" v-if="!fromCenter">
							<a-form-item label="角色名称" v-bind="colSpe">
								<a-select placeholder="请选择" @change="roleChange" allowClear mode="multiple" labelInValue v-decorator="['notes', searchFormRules.notes]">
									<a-select-option v-for="(item,index) in roleList" :key="index" :value="item.id">{{item.roleName}}</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col span="8" v-if="!fromCenter">
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
						<a-col span="8" v-if="!fromCenter">
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
      exclusionRoleIds: [ '999999', '899999', '133333', '144444', '155555', '166666', '177777', '188888', '199999', '1000000', '122221', '122222', '122223', '122224', '122225', '122226', '122227', '122228', '122231', '122232', '122233', '122234' ],
      dateFormat      : 'YYYY-MM-DD',
      colSpe          : {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 15
        }
      },
      autoExpandParent: true,
      checkedKeys     : [],
      selectedKeys    : [],
      treeData        : [],
      searchFormRules : {
        name: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true,
            message : '请输入姓名'
          } ]
        },
        phone: {
          validateTrigger: 'blur',
          rules          : [ {
            required : true,
            validator: this.validatePhone
          } ]
        },
        mail: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true,
            message : '请输入邮箱'
          }, {
            type   : 'email',
            message: '邮箱格式不合法'
          } ]
        },
        zipCode: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true,
            message : '请输入邮编'
          } ]
        },
        dept: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true,
            message : '请输入单位名称'
          } ]
        },
        addr: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true,
            message : '请输入地址'
          } ]
        },
        area: {
          validateTrigger: 'change',
          rules          : [ {
            required: true,
            message : '请选择所属区域！'
          } ]
        },
        notes: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true,
            message : '请选择角色名称！'
          } ]
        }
      },
      isAdminator          : '',
      administrativeRegions: [],
      groupLists           : [],
      areaName             : '',
      roleList             : [],
      roles                : [],
      // 是否从个人中心-账户信息跳转过来的
      fromCenter           : false,
    }
  },
  mounted() {
    this.isAdminator = this.$store.state.userInfos.isAllPerm
    this.getArea()
    this.getTree()
    this.getRoleLists()
    const { fromCenter } = this.$route.query
    // 从个人中心-账户信息跳过来的不能修改手机号
    this.fromCenter = (fromCenter && fromCenter === '1')
  },
  methods: {
    // 查询权限树
    getTree() {
      this.$ajax.get({
        url: this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res => {
        const data = res.data.content
        data.forEach((item, index) => {
          this.treeData.push(this.getTreeData(item, index))
        })
      })
    },
    // 整理权限树
    getTreeData(item, index) {
      const childrenNode = {
        title: item.permName,
        key  : item.id,
        value: item.id
      }
      if (item.childList && item.childList.length) {
        childrenNode.children = []
        item.childList.forEach((subItem, subIndex) => {
          const subkey = subItem.id
          childrenNode.children.push(this.getTreeData(subItem, subkey))
        })
      }
      return childrenNode
    },
    handleReturn() {
      this.$router.back()
    },
    //添加账户
    handleAdd() {
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          values.area = {
            id  : this.areaCode,
            name: this.areaName
          }
          const isSelect = this.searchForm.isFieldTouched('group')
          if (isSelect) {
            if (values.group != '' && values.group != undefined) {
              const groupId = JSON.parse(JSON.stringify(values.group))
              const data = this.groupLists.find(ele => ele.id == groupId)
              values.group = {
                id  : groupId,
                name: data.groupName
              }
            } else {
              delete values.group
            }
          } else {
            if (this.detail && this.detail.group != null) {
              values.group = {
                id  : this.detail.group.id,
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
              url   : this.$api.POST_ADD_USER,
              params: values
            }).then(res => {
              if (res.code == '200') {
                const _this=this
                this.$modal.confirm({
                  title: '新增成功！是否继续完善人员信息？',
                  type : 'success',
                  icon : 'check-circle',
                  onOk() {
                    _this.$router.push({
                      name : '/systemManagement/administrator/edit',
                      query: {
                        id        : res.data.content,
                        loginPhone: _this.searchForm.getFieldValue('phone'),
                      }
                    })
                  },
                  onCancel() {
                    _this.$router.push({
                      name: '/systemManagement/administrator'
                    })
                  },
                })
              }
            })
          } else {
            if (this.fromCenter) {
              // 如果是用户中心-基本信息过来修改的则用此接口
              this.$ajax.put({
                url   : this.$api.PUT_EDIT_USER,
                params: values,
              }).then(res => {
                this.$modal.success({
                  title  : '成功',
                  content: '修改成功',
                  okText : '确认',
                })
                this.$nextTick(() => this.$router.back())
              })
              return
            }
            this.$ajax.put({
              url   : this.$api.PUT_USER_LIST.replace('{id}', this.$route.query.id),
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
        url   : this.$api.GET_AREA_NEXT,
        params: {
          // parentId: this.isAdminator ? '0' : this.$store.state.userInfos.area.id
          parentId: this.isAdminator ? '0' : this.$store.state.userInfos.area?this.$store.state.userInfos.area.id:0
        }
      }).then(res => {
        const datas = this.$com.confirm(res, 'data.content', [])
        datas.forEach((ele, index) => {
          this.administrativeRegions.push(this.getTreeNode(ele, index))
        })
      })
    },
    getTreeNode(item, index) {
      const childrenNode = {
        'title'   : item.areaName,
        'value'   : item.id,
        'id'      : item.id,
        'key'     : item.id,
        'parentId': item.parentId,
        'children': item.childList
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
          const datas = this.$com.confirm(res, 'data.content', [])
          const array = []
          datas.forEach((ele, index) => {
            array.push(this.getTreeNode(ele, index))
          })
          treeNode.dataRef.children = array
          this.treeData = [ ...this.treeData ]
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
        pageNo  : 1,
        areaCode: this.areaCode
      }
      // if (!this.isAdminator) {
      //   params.parentId = this.$store.state.userInfos.group?this.$store.state.userInfos.group.id:''
      // }
      this.$ajax.get({
        url   : this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.groupLists = this.$com.confirm(res, 'data.content', [])
      })
    },
    getRoleLists() {
      const curUserRoles = this.$store.state.userInfos.roleIds
      const sparams = {
        pageNo  : 1,
        pageSize: 10000
      }
      if(!!curUserRoles){
        sparams.id_in = curUserRoles
      }
      this.$ajax.get({
        url   : this.$api.GET_CHOOSE_ROLE_LIST,
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
        const params = item.map((it) => {
          return it.key
        })
        this.checkedKeys = []
        this.$ajax.get({
          url: this.$api.ROLE_DETAIL.replace('{id}', params)
        }).then(res => {
          if (res.code === '200') { 
            const data = res.data.content
            for(let i=0;i<data.length;i++){
              this.checkedKeys.push(data[i].id)
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
          this.onChangeTree(this.detail.area.id, [ this.detail.area.areaName ])
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
        const datas = this.detail.roleIds != null ? this.detail.roleIds.split(',') : []
        const userRoleIDs = []
        for(var i=0;i<datas.length;i++){
          if(!this.$com.oneOf(datas[i], userRoleIDs) && !this.$com.oneOf(datas[i], this.exclusionRoleIds)){
            userRoleIDs.push(datas[i])
          }
        }
        // 整理当前用户详情中的角色名称数据，去除重复
        const datas1 = this.detail.roleNames != null ? this.detail.roleNames.split(',') : []
        const userRoleNames = []
        for(var i=0;i<datas1.length;i++){
          if(userRoleNames.indexOf(datas1[i]) == -1){
            userRoleNames.push(datas1[i])
          }
        }
        // 组装需要展示在用户信息表单“角色名称”项的初始数据
        userRoleIDs.forEach((ele, index) => {
          userRoleIDs[index] = {
            'key'  : ele,
            'label': userRoleNames[index]
          }
        })
        const setDatas = {
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
