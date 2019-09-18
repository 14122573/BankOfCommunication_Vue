<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">新增功能点</span>
			<div class="detailOperations">
				<a-button @click="$router.back()">取消</a-button>
				<a-button type="primary" @click="createPoint" >保存</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody">
        <div class="layoutMargin layoutPadding detailsPartSection">
          <a-alert message="请严格按照功能编码定义规则填写功能编码，否则可能导致业务或功能异常" type="info" showIcon />
          <a-form class=" layoutMargin" :form="porintCreateForm">
            <a-row type="flex" justify="space-between" align="middle">
              <a-col span="16">
                <a-form-item class='formItem' label="业务系统名称" :label-col="{span:4}" :wrapper-col="{span:16}">
                  <a-select placeholder="请选择业务系统" :options="sysListForSearch" v-model="createForm .type" @change="onSysChange" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="start" align="middle">
              <a-col span="8">
                <a-form-item label="功能点名称" :label-col="{span:8}" :wrapper-col="{span:16}">
                  <a-input v-decorator="['pointName',{validateTrigger:'blur',rules:formRules.pointName}]" placeholder="请输入"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="功能点编码" :label-col="{span:8}" :wrapper-col="{span:16}">
                  <a-input v-decorator="['pointKey',{validateTrigger:'blur',rules:formRules.pointCode}]" placeholder="请输入"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="start" align="middle">
              <a-col span="16">
                <a-form-item label="归属权限" :label-col="{span:4}" :wrapper-col="{span:16}">
                  <a-select @change="handlePermsChange"  mode="multiple">
                    <a-select-opt-group v-for="(permGroup,groupIndex) in tree.roleTreeDataArranged" :key='groupIndex'>
                      <span slot="label">{{permGroup.title}}</span>
                      <a-select-option v-for="(perm) in permGroup.children" :value="perm.key" :key="perm.key">{{perm.title}}</a-select-option>
                    </a-select-opt-group>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { OldSysCodes } from '@/config/outside-config'
export default {
  data() {
    const validatePointCode = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        this.$ajax.get({
          url: this.$api.GET_CHECK_POINTCODE_EXIT + '?pointKey=' + value
        }).then(res => {
          if (res.data.content === false) {
            callback()
          } else {
            callback('功能点编码已存在!')
          }
        })
      }
    }
    return {
      isReady:false,
      createForm :{
        permIds:[]
      },
      sysListForSearch:[],
      formRules:{
        // 相关管理信息
        pointName:[
          { required: true, whitespace: true, message: '请选择功能点名称' }
        ],
        pointCode: [
          { required: true, whitespace: true, message: '请选择功能点编码' },
          { validator: validatePointCode }
        ],
      },
      tree:{
        roleTreeData:[],
        roleTreeDataArranged:[]
      },

    }
  },
  watch: {
  },
  beforeCreate() {
    this.porintCreateForm = this.$form.createForm(this)
  },
  created(){
    this.getRoleTree()
    this.getSysCodOptions()
    this.isReady = true
  },
  methods:{
    /**
     * 监听所属权限选择，获取已选权限id数组
     * @param {String} select 当前已选权限id数组
     */
    handlePermsChange(select){
      this.createForm .permIds = select
    },
    /**
     * 监听系统选择，获取选择系统的名称
     * @param {String} select 当前选择的系统code
     */
    onSysChange(select){
      this.sysListForSearch.forEach(element => {
        if(select==element.value) {
          this.createForm ['typeName'] =  element.label
        }
      })
    },
    createPoint(){
      this.porintCreateForm.validateFields(err => {
        if (!err) {
          let postParams = Object.assign({},this.createForm ,{
            'pointName':this.porintCreateForm.getFieldValue('pointName'),
            'pointKey':this.porintCreateForm.getFieldValue('pointKey')
          })
          this.$ajax.post({
            url: this.$api.POST_PREMSPOINT,
            params: postParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('添加成功')
              this.$router.push({name:'/systemManagement/permissionConfig/point'})
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    /**
     * 查询权限树
     */
    getRoleTree(){
      this.$ajax.get({
        url:this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res=>{
        if(!!res.data && !!res.data.content){
          let data=res.data.content
          data.forEach((item,index)=>{
            this.tree.roleTreeData.push(this.initRoleTreeNode(item))
          })

          // 过滤获得老系统
          let oldSysPermissions = [],vm = this
          this.tree.roleTreeData.forEach((item,index)=>{
            if(this.$com.oneOf(item.permKey,OldSysCodes)){
              oldSysPermissions.push(item)
            }else{
              let node = Object.assign({}, item)
              this.tree.roleTreeDataArranged.push(node)
            }
          })
        }
      })
    },
    /**
     * 根据tree渲染数据所需结构，重组数据
     * @param {Object} item 单个权限对象
     * @returns childrenNode 对传入参数，已重组的数据
     */
    initRoleTreeNode(item){
      let isOldSys = (!!item.permKey && this.$com.oneOf(item.permKey,OldSysCodes)) ? true:false
      let childrenNode={
        'title':item.permName,
        'key':item.id,
        'permKey':!item.permKey?'':item.permKey,
        'isOldSys':isOldSys
      }
      if(item.childList && item.childList.length){
        childrenNode.children = []
        item.childList.forEach((subItem) =>{
          let subkey = subItem.id
          childrenNode.children.push(this.initRoleTreeNode(subItem))
        })
      }
      return childrenNode
    },
    /**
     * 获取可选的子系统清单
     */
    getSysCodOptions(){
      this.$ajax.get({
        url: this.$api.SYSTEM_LIST_ALL_GET
      }).then(res=>{
        if(res.code === '200'){
          let data = this.$com.confirm(res, 'data.content', [])
          this.sysListForSearch = data.map((item) => {
            return {
              label: item.sysName,
              value: item.sysCode
            }
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>


