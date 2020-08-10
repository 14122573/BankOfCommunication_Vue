<template>
<a-modal :maskClosable="false" cancelText="取消" okText="批量创建" @ok="handleCreate" @cancel="handleCancel" :width="465"
	 title="批量添加临时账户" :visible="isShow">
  <a-form class="protalForm" :form="tempAccountCreateForm">
			<a-row type="flex" class="formItemLine" justify="space-between" align='middle' >
        <a-col span="20">
          <a-form-item label="创建临时账号数" :label-col="{span:8}" :wrapper-col="{span:16}">
            	<a-input-number placeholder="请输入" :min="1" v-decorator="['number',searchFormRules.number]" />
          </a-form-item>
        </a-col>
				<a-col span="20">
					<a-form-item :label="'所属角色'" :label-col="{span:8}" :wrapper-col="{span:16}">
						<a-select placeholder="请选择" @change="roleChange" allowClear mode="multiple" labelInValue v-decorator="['roleIds', searchFormRules.roles]">
              <a-select-option v-for="(item,index) in roleList" :key="index" :value="item.id">{{item.roleName}}</a-select-option>
            </a-select>
					</a-form-item>
				</a-col>
        <a-col span="20">
          <a-form-item label="所属区域" :label-col="{span:8}" :wrapper-col="{span:16}">
            <!-- <a-select v-if="isAdminator !== true" placeholder="请选择" labelInValue @change="onChangeTree" showSearch
              v-decorator="['area',searchFormRules.area]">
              <a-select-option v-for="(item,index) in administrativeRegions" :key="index" :value="item.id">{{item.title}}</a-select-option>
            </a-select> -->
            <a-tree-select :treeData="administrativeRegions" v-decorator="['area',searchFormRules.area]" :loadData="onLoadData"
              :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }" placeholder='请选择' allowClear @change="onChangeTree">
            </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col span="20">
          <a-form-item label="组织机构" :label-col="{span:8}" :wrapper-col="{span:16}">
            <a-select v-decorator="['group']" allowClear placeholder='请选择'>
              <a-select-option v-for="(item,index) in groupLists" :key="index" :value="item.id">{{item.groupName}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>
<script>

export default {
  name : 'create-temp-user',
  props: {
    resetShow: {
      type    : Boolean,
      required: true
    }
  },
  data() {
    return {
      isShow               : false,
      isAdminator          : this.$store.state.userInfos.isAllPerm,
      tempAccountCreateForm: this.$form.createForm(this),
      createDatas          : {
        roleIds  : '',
        roleNames: ''
      },
      roleList             : [],
      administrativeRegions: [],
      groupLists           : [],
      searchFormRules      : {
        number: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true,
            message : '请输入需要创建临时账号数量，仅能为整数'
          } ]
        },
        area: {
          validateTrigger: 'change',
          rules          : [ {
            required: true,
            message : '请选择所属区域！'
          } ]
        },
        roles: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true,
            message : '请选择角色名称！'
          } ]
        }
      },
    }
  },
  computed: {
  },

  watch: {
    resetShow() {
      this.isShow = this.resetShow
    }
  },
  beforeCreate() {
    // 获取表单中可选的角色清单
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
    })
  },
  created(){
    this.getArea()
  },
  mounted() {
  },
  methods: {
    resetForm() {
      this.tempAccountCreateForm.resetFields()
    },
    handleCancel(){
      this.resetForm()
      this.$emit('on-success', false)
    },
    handleCreate(){
      this.tempAccountCreateForm.validateFields(err => {
        if (!err) {
          const createParams = Object.assign({}, this.createDatas, {
            'area': {
              // id:this.isAdminator?this.tempAccountCreateForm.getFieldValue('area'):this.tempAccountCreateForm.getFieldValue('area').key
              id: this.tempAccountCreateForm.getFieldValue('area')
            },
            // 'group': {
            //   id: this.tempAccountCreateForm.getFieldValue('group')
            // },
            'number': this.tempAccountCreateForm.getFieldValue('number')
          })
          if(this.tempAccountCreateForm.getFieldValue('group')){
            createParams.group = {
              id: this.tempAccountCreateForm.getFieldValue('group')
            }
          } 
          this.$ajax.post({
            url   : this.$api.POST_TEMPACCOUT_CREATE,
            params: createParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('添加成功')
              this.resetForm()
              this.$emit('on-success', true)
            }
          })
        }else{
          this.$com.getFormValidErrTips(this, err)
        }
      })
    },
    getArea() {
      this.$ajax.get({
        url   : this.$api.GET_AREA_NEXT,
        params: {
          parentId: this.isAdminator ? '0' : this.$store.state.userInfos.area.id
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
        title   : item.areaName,
        value   : item.id,
        id      : item.id,
        key     : item.id,
        parentId: item.parentId,
        children: item.childList
      }
      if(item.id == '999999'){
        childrenNode.selectable = false
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
          treeNode.dataRef.children = [].concat(array)
          resolve()
        })
      })
    },
    onChangeTree(value, label) {
      if (this.isAdminator != true) {
        this.areaCode = value.key
        this.areaName = value.label
      } else {
        this.areaCode = value
        this.areaName = label[0]
      }
      this.groupLists = []
      this.tempAccountCreateForm.setFieldsValue({
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
      if (!this.isAdminator) {
        params.parentId = this.$store.state.userInfos.group?this.$store.state.userInfos.group.id:''
      }
      this.$ajax.get({
        url   : this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.groupLists = this.$com.confirm(res, 'data.content', [])
      })
    },

    /**
     * 监听角色切换，将已选角色id、name，分别转为字符串， 存储在createDatas中
     * @param {Array} item 已选角色数组对象
     */
    roleChange(item) {
      if (item.length > 0) {
        const roleIds = item.map((it) => {
          return it.key
        })
        const roleNames = item.map((it) => {
          return it.label
        })
        this.createDatas.roleIds = roleIds.toString()
        this.createDatas.roleNames = roleNames.toString()
      }else{
        this.createDatas.roleIds = ''
        this.createDatas.roleNames = ''
      }
    },
  }
}
</script>
<style scoped>
</style>
