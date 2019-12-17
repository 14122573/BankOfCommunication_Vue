<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">修改功能点</span>
			<div class="detailOperations">
				<a-button @click="$router.back()">取消</a-button>
				<a-button type="primary" @click="savePoint" >保存</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody">
        <div class="layoutMargin layoutPadding detailsPartSection">
          <template v-if="preparate.isReady && preparate.hasDetail">
            <a-alert message="请严格按照功能编码定义规则填写功能编码，否则可能导致业务或功能异常" type="info" showIcon />
            <a-form class=" layoutMargin" :form="pointEditForm">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col span="16">
                  <a-form-item class='formItem' label="业务子系统名称" :label-col="{span:4}" :wrapper-col="{span:16}">
                    <a-select placeholder="请选择业务系统" :options="sysListForSearch" :value="editForm.type" @change="onSysChange" />
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
                    <a-input :addonBefore="editForm.type?editForm.type:''" v-decorator="['pointKey',{validateTrigger:'blur',rules:!editForm.type?this.formRules.pointCodeRequir:this.formRules.pointCodeNoRequir}]" placeholder="请输入"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="start" align="middle">
                <a-col span="16">
                  <a-form-item label="归属权限" :label-col="{span:4}" :wrapper-col="{span:16}">
                    <a-select @change="handlePermsChange"  v-decorator="['permIds']" mode="multiple">
                      <a-select-opt-group v-for="(permGroup,groupIndex) in tree.roleTreeDataArranged" :key='groupIndex'>
                        <span slot="label">{{permGroup.title}}</span>
                        <a-select-option v-for="(perm) in permGroup.children" :value="perm.key" :key="perm.key">{{perm.title}}</a-select-option>
                      </a-select-opt-group>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </template>
          <template v-else>
            <a-alert message="获取功能点数据异常" type="error" showIcon />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const validatePointCode = (rule, value, callback) => {
      let code = (!this.editForm.type?'':this.editForm.type)+(!value?'':value)
      if (!!value && value.length>0 && !!this.editForm.type && !this.$com.checkNumber(value)) {
        callback('功能编码仅能填写数字')
      } else {
        if(this.pointDetail.pointKey==code){ //如果数据没有改变过 ，就功能吗重复不校验
          callback()
        }else{
          this.$ajax.get({
            url: this.$api.GET_CHECK_POINTCODE_EXIT + '?pointKey=' + code
          }).then(res => {
            if (res.data.content === false) {
              callback()
            } else {
              callback('功能点编码已存在!')
            }
          })
        }
      }
    }
    return {
      preparate:{
        isReady:false,
        hasDetail:false
      },
      editForm:{
        permIds:[]
      },
      sysListForSearch:[],
      pointDetail:null,
      formRules:{
        // 相关管理信息
        pointName:[
          { required: true, whitespace: true, message: '请填写功能点名称' }
        ],
        pointCode: [
          { required: true, whitespace: true, message: '请填写功能点编码' },
          { validator: validatePointCode }
        ],
        pointCodeRequir: [
          { required: true, whitespace: true, message: '请填写功能点编码' },
          { validator: validatePointCode }
        ],
        pointCodeNoRequir:[
          { validator: validatePointCode }
        ]
      },
      tree:{
        roleTreeData:[],
        roleTreeDataArranged:[]
      },

    }
  },
  watch: {
    defaultKey(){
      if(this.preparate.hasDetail = false){
        return []
      }else{
        return this.pointDetail.permIds
      }
    }
  },
  beforeCreate() {
    this.pointEditForm = this.$form.createForm(this)
  },
  created(){
    this.getRoleTree()
    this.getSysCodOptions()
    if(!this.$route.query.point){
      this.preparate.hasDetail = false
    }else{
      this.pointDetail = JSON.parse(this.$route.query.point)
      this.preparate.hasDetail = true
    }
    // 初始化表单值
    this.$nextTick(function () {
      this.editForm['type']=this.pointDetail.type=='0'?undefined:this.pointDetail.type
      this.editForm['typeName']=this.pointDetail.typeName
      this.pointEditForm.getFieldDecorator('pointName',{initialValue:this.pointDetail.pointName})
      this.pointEditForm.getFieldDecorator('pointKey',{initialValue:this.pointDetail.pointKey.replace(this.editForm.type, '')})
      if(Array.isArray(this.pointDetail.permSet) && this.pointDetail.permSet.length>0){
        this.pointDetail.permIds = []
        for(let i=0;i<this.pointDetail.permSet.length;i++){
          this.pointDetail.permIds.push(this.pointDetail.permSet[i].id)
        }
        this.editForm.permIds = this.pointDetail.permIds
        this.pointEditForm.getFieldDecorator('permIds',{initialValue:this.pointDetail.permIds})
      }
    })
    this.preparate.isReady = true
  },
  computed:{
  },
  watch:{
    pointDetail(){
      this.$nextTick(function () {
        this.editForm['type']=this.pointDetail.type=='0'?undefined:this.pointDetail.type
        this.editForm['typeName']=this.pointDetail.typeName
        this.pointEditForm.getFieldDecorator('pointName',{initialValue:this.pointDetail.pointName})
        this.pointEditForm.getFieldDecorator('pointKey',{initialValue:this.pointDetail.pointKey.replace(this.editForm.type, '')})
        if(Array.isArray(this.pointDetail.permSet) && this.pointDetail.permSet.length>0){
          this.pointDetail.permIds = []
          for(let i=0;i<this.pointDetail.permSet.length;i++){
            this.pointDetail.permIds.push(this.pointDetail.permSet[i].id)
          }
          this.editForm.permIds = this.pointDetail.permIds
          this.pointEditForm.getFieldDecorator('permIds',{initialValue:this.pointDetail.permIds})
        }
      })
    }
  },
  methods:{
    /**
     * 监听所属权限选择，获取已选权限id数组
     * @param {String} select 当前已选权限id数组
     */
    handlePermsChange(select){
      this.editForm.permIds = select
    },
    /**
     * 监听系统选择，获取选择系统的名称
     * @param {String} select 当前选择的系统code
     */
    onSysChange(select){
      this.sysListForSearch.forEach(element => {
        if(select==element.value) {
          this.editForm['typeName'] =  element.label
        }
      })
    },
    savePoint(){
      this.pointEditForm.validateFields(err => {
        if (!err) {
          let putParams = Object.assign({},this.editForm,{
            'pointName':this.pointEditForm.getFieldValue('pointName'),
            'pointKey':(!this.editForm.type?'':this.editForm.type)+this.pointEditForm.getFieldValue('pointKey'),
          })
          this.$ajax.put({
            url: this.$api.PUT_PREMSPOINT.replace('{id}', this.pointDetail.id),
            params: putParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('修改成功')
              this.$router.push({name:'/systemManagement/permissionConfig/point'})
            }
          })
        }else{
          this.$com.getFormValidErrTips(this,err)
        }
      })
    },
    /**
     * 查询权限树
     */
    getRoleTree(){
      this.$ajax.get({
        url:this.$api.GET_ALL_ROLE + '?isTree=true&isAll=true'
      }).then(res=>{
        if(!!res.data && !!res.data.content){
          let data=res.data.content
          data.forEach((item,index)=>{
            this.tree.roleTreeData.push(this.initRoleTreeNode(item))
          })

          // 重组需要展示的权限树
          let initializedRoleTree = []
          this.tree.roleTreeDataArranged = []
          this.tree.roleTreeData.forEach((item,index)=>{
            if(!item.canDelete && !!item.permKey){
              initializedRoleTree.push(item)
            }else{
              let node = Object.assign({}, item)
              this.tree.roleTreeDataArranged.push(node)
            }
          })
          this.tree.roleTreeDataArranged.push({
            'title':'初始化权限',
            'key':'-1',
            'permKey':'',
            'canDelete':false,
            'isHide':true,
            'children':[].concat(initializedRoleTree)
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
      let childrenNode={
        'title':item.permName,
        'key':item.id,
        'permKey':!item.permKey?'':item.permKey,
        'canDelete':item.canDelete===false?false:true,
        'isHide':item.isHide,
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
        url: this.$api.SYSTEM_LIST_ALL_GET,
        params:{type:'1'}
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

