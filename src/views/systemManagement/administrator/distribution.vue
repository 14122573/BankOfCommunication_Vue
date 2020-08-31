<template>
	<div class="portalDetailWapper">
    <div class="portalDetailTitle">
			<span class="title">权限分配</span>
			<div class="detailOperations">
				<a-button @click="$router.back();">返回</a-button>
					<a-button type="primary" html-type="submit" @click="save">保存</a-button>
			</div>
		</div>

    <div class="portalDetailContentWapper">
      <a-form class="portalDetailContentBody" :form="formData">
        <div class="layoutMargin detailsPartSection contentPadding">
          <UserDetail :id="$route.query.id" />
          <a-divider style="margin-top:0px;" dashed />
          <a-row class="formItemLine">
            <a-col span="8">
              <a-form-item label="角色名称" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-select placeholder="请选择"  @change="roleChange" allowClear mode="multiple"
                labelInValue v-decorator="['role', {rules: [rules.required],validateTrigger:'change'}]" >
                  <a-select-option v-for="(item,index) in options.roleList" :key="index" :value="item.id">{{item.roleName}}</a-select-option>
	              </a-select>
              </a-form-item>
            </a-col>
            <a-col span="8">
              <a-form-item label="所属行政区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-select v-if="isAdminator !== true" placeholder="请选择" :options="options.areaList" @change="areaChange"
                :filterOption="filterOption" v-decorator="['area',{rules: [rules.required],validateTrigger:'change'}]"
                showSearch allowClear />
                <a-tree-select v-else :treeData="organData" :loadData="onLoadData" showLine :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                placeholder='请选择' allowClear v-decorator="['area',{rules: [rules.required],validateTrigger:'change'} ]"
                @change="onChangeTree">
                </a-tree-select>
              </a-form-item>
            </a-col>
            <a-col span="8">
              <a-form-item label="组织机构" :label-col="labelCol" :wrapper-col="wrapperCol" allowClear>
                <a-select placeholder="请选择" :options="options.organList" v-decorator="['organ']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-tree class="portalRoleTree" checkable :treeData="treeData" v-model="checkedKeys" disabled />
        </div>
			</a-form>
    </div>

	</div>
</template>
<script>
import UserDetail from './user-detail'
export default {
  name      : 'pendingPermissions-distribution',
  components: {
    UserDetail
  },
  data() {
    return {
      formData        : this.$form.createForm(this),
      exclusionRoleIds: [ '999999', '899999', '133333', '144444', '155555', '166666', '177777', '188888', '199999', '1000000', '122221', '122222', '122223', '122224', '122225', '122226', '122227', '122228', '122231', '122232', '122233', '122234' ],
      userRoldIDsOrg  : [],
      detail          : null,
      labelCol        : {
        span: 8
      },
      wrapperCol: {
        span: 14
      },
      rules: {
        required: {
          required: true,
          message : '请选择'
        }
      },
      options: {
        roleList : [],
        areaList : [],
        organList: []
      },
      //选择的数组
      checkedKeys: [],
      treeData   : [],
      // 默认展开的数组
      roles      : [],
      // 行政区域
      organData  : [],
      isAdminator: ''
    }
  },
  methods: {
    // 角色切换
    roleChange(item) {
      let treeRoles = []
      this.userRoldIDsOrg.forEach((userRoldId)=>{
        if(this.$com.oneOf(userRoldId.key, this.exclusionRoleIds)){
          treeRoles.push(userRoldId)
        }
      })

      this.roles = item
      treeRoles = item.concat(treeRoles)
      if (treeRoles.length != 0) {
        const params = treeRoles.map((it) => {
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
    filterOption(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) >= 0
    },
    // 行政区域改变
    areaChange(value) {
      this.options.organList = []
      this.formData.resetFields('organ')
      this.getOrganList(value)
    },
    // 查询组织机构
    getOrganList(value) {
      const info = this.$store.state.userInfos
      const params = {
        pageSize: 10000,
        pageNo  : 1,
        areaCode: value,
      }
      if (!this.isAdminator && info.group.id) {
        params.parentId = info.group.id
      }
      if (value !== '') {
        this.$ajax.get({
          url        : this.$api.GET_ORGANIZATION_LIST,
          params     : params,
          hideLoading: true
        }).then(res => {
          if (res.code === '200') {
            const data = this.$com.confirm(res, 'data.content', [])
            this.options.organList = data.map((item) => {
              return {
                label: item.groupName,
                value: item.id
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
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
        this.options.roleList = this.$com.confirm(res, 'data.content', [])
        if (this.$route.query.id) {
          this.getDetail()
        }
      })
    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_USER_DETAIL.replace('{id}', this.$route.query.id)
      }).then(res => {
        this.detail = this.$com.confirm(res, 'data.content',{})

        // 整理当前用户详情中的角色ID数据，去除重复
        const userRoldIdsOrg = this.detail.roleIds != null ? this.detail.roleIds.split(',') : []
        if(userRoldIdsOrg.length>0 && userRoldIdsOrg[0]=='999999'){
          userRoldIdsOrg.shift()
        }
        const userRoleIDs = []
        for(var i=0;i<userRoldIdsOrg.length;i++){
          if(!this.$com.oneOf(userRoldIdsOrg[i], userRoleIDs) && !this.$com.oneOf(userRoldIdsOrg[i], this.exclusionRoleIds)){
            userRoleIDs.push(userRoldIdsOrg[i])
          }
        }
        // 整理当前用户详情中的角色名称数据，去除重复
        const userRoldNamesOrg = this.detail.roleNames != null ? this.detail.roleNames.split(',') : []
        const userRoleNames = []
        for(var i=0;i<userRoldNamesOrg.length;i++){
          if(userRoleNames.indexOf(userRoldNamesOrg[i]) == -1){
            userRoleNames.push(userRoldNamesOrg[i])
          }
        }
        // 组装需要展示在用户信息表单“角色名称”项的初始数据
        userRoleIDs.forEach((ele, index) => {
          userRoleIDs[index] = {
            'key'  : ele,
            'label': userRoleNames[index]
          }
        })
        let _this = this
        this.userRoldIDsOrg = []
        userRoldIdsOrg.forEach((ele, index) => {
          this.userRoldIDsOrg.push({
            'key'  : ele,
            'label': userRoldNamesOrg[index]
          })
        })
        let setDatas = {
          organ: this.detail.group != null ? this.detail.group.id : '',
          area : this.detail.area != null ? this.detail.area.areaName : ''
        }

        this.roles = userRoleIDs
        this.formData.setFieldsValue(setDatas)
        this.roleChange(this.userRoldIDsOrg)
      })
    },

    // // 查询权限树
    getTree() {
      this.$ajax.get({
        url: this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res => {
        const data = this.$com.confirm(res, 'data.content', [])
        this.allData = data

        data.forEach((item, index) => {
          this.treeData.push(this.getTreeNode(item, index))
        })
      })
    },
    // 整理权限树
    getTreeNode(item, index) {
      const childrenNode = {
        title: item.permName,
        key  : item.id,
        value: item.permName,
      }
      if (item.childList && item.childList.length) {
        childrenNode.children = []
        item.childList.forEach((subItem, subIndex) => {
          const subkey = subItem.id
          childrenNode.children.push(this.getTreeNode(subItem, subkey))
        })
      }
      return childrenNode
    },
    // 行政区域修改---
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
            array.push(this.getOrganTree(ele, index))
          })
          treeNode.dataRef.children = array
          this.organData = [ ...this.organData ]
          resolve()
        })
      })
    },
    // 行政区域修改---
    onChangeTree(value, label, extra) {
      this.options.organList = []
      this.formData.resetFields('organ')
      this.getOrganList(value)
    },
    getArea() {
      this.$ajax.get({
        url   : this.$api.GET_AREA_NEXT,
        params: {
          parentId: this.isAdminator ? '0' : this.$store.state.userInfos.area?this.$store.state.userInfos.area.id:0
        }
      }).then(res => {
        const datas = this.$com.confirm(res, 'data.content', [])
        datas.forEach((ele, index) => {
          this.organData.push(this.getOrganTree(ele, index))
        })
      })
    },
    getOrganTree(item, index) {
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
    // 保存按钮
    save() {
      this.formData.validateFields((err) => {
        if (!err) {
          const formData = this.formData.getFieldsValue()
          const params = {}
          if (formData.organ) {
            params.group = {
              id: formData.organ
            }
          }
          params.area = {
            id: formData.area
          }
          params.roleIds = formData.role.map((item) => {
            return item.key
          })
          params.roleIds = params.roleIds.join(',')
          params.roleNames = formData.role.map((item) => {
            return item.label
          })
          params.roleNames = params.roleNames.join(',')
          params.id = this.$route.query.id
          this.$ajax.post({
            url   : this.$api.CONFIG_ROLES_TO_USER,
            params: params
          }).then((res) => {
            if (res.code === '200') {
              this.$message.success('分配成功')
              this.$router.push({
                name: '/systemManagement/administrator'
              })
            }
          })
        }else{
          this.$com.getFormValidErrTips(this, err)
        }
      })
    }
  },
  mounted() {
    this.isAdminator = this.$store.state.userInfos.isAllPerm
    this.getArea()
    this.getTree()
    this.getRoleLists()
  }
}
</script>
<style>
	.distribution-span li.ant-tree-treenode-disabled>span:not(.ant-tree-switcher),
	li.ant-tree-treenode-disabled>.ant-tree-node-content-wrapper,
	li.ant-tree-treenode-disabled>.ant-tree-node-content-wrapper span {
		color: rgba(0, 0, 0, 1);
	}
</style>
