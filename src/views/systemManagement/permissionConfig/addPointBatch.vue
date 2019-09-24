<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">批量添加功能点</span>
			<div class="detailOperations">
				<a-button @click="$router.back()">取消</a-button>
				<a-button type="primary" @click="createPointBatch" >保存</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody">
        <div class="layoutMargin layoutPadding detailsPartSection">
          <a-alert message="请严格按照功能编码定义规则填写功能编码，否则可能导致业务或功能异常" type="info" showIcon />
          <p class="gayLine noline"></p>
          <div class="portalTableOperates">
            <a-button icon='plus' class="editable-add-btn" @click="addTableLine">添加一行</a-button>
          </div>
          <a-table class="portalTable" size='small' :dataSource="dataSource" :columns="tableColumns">
            <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>
              <template v-if="'type' === column.dataIndex">
                <a-select allowClear placeholder="请选择业务系统"
                  style="width: 188px; margin-bottom: 8px; display: block;"
                  :options="sysListForSearch" :value="batchSetForm.sysCode" @change="select=>onBatchChange(select,column.dataIndex)" />
              </template>
              <template v-if="'pointName' === column.dataIndex">
                <a-input placeholder="请输入功能点名称"
                  style="width: 188px; margin-bottom: 8px; display: block;"
                  :value="batchSetForm.pointName" @change="e=>onBatchChange(e.target.value,column.dataIndex)" />
              </template>
              <template v-if="'pointKey' === column.dataIndex">
                <a-input placeholder="请输入功能点编码"
                  :addonBefore="batchSetForm.sysCode"
                  style="width: 188px; margin-bottom: 8px; display: block;"
                  :value="batchSetForm.pointCode" @change="e=>onBatchChange(e.target.value,column.dataIndex)" />
                <p v-if="disableBatchSet(column.dataIndex)" style="color:rgba(250, 0, 0, 1)">请输入数字</p>
              </template>
              <template v-if="'permIds' === column.dataIndex">
                <a-select @change="select=>onBatchChange(select,column.dataIndex)" style="width: 188px; margin-bottom: 8px; display: block;" mode="multiple">
                  <a-select-opt-group v-for="(permGroup,groupIndex) in tree.roleTreeDataArranged" :key='groupIndex'>
                    <span slot="label">{{permGroup.title}}</span>
                    <a-select-option v-for="(perm) in permGroup.children" :value="perm.key" :key="perm.key">{{perm.title}}</a-select-option>
                  </a-select-opt-group>
                </a-select>
              </template>
              <a-button
                :disabled="disableBatchSet(column.dataIndex)"
                type='primary'
                @click="() => handleBatchSet(selectedKeys, confirm, column.dataIndex)"
                size="small"
                style="width: 90px; margin-right: 8px"
              >确定</a-button>
              <a-button
                @click="() => handleBatchCancel(clearFilters, column.dataIndex)"
                size="small"
                style="width: 90px"
              >取消</a-button>
            </div>
            <a-icon slot="filterIcon" slot-scope="filtered" type='setting' :style="{ color: filtered ? '#108ee9' : undefined }" />

            <template slot="system" slot-scope="text, record">
              <SystemCell :sysCode="text" @change="onSystemChange(record.key, $event)"></SystemCell>
            </template>
            <template slot="pointName" slot-scope="text, record">
              <PointNameCell :pointName="text" @change="onPointChange(record.key, 'pointName', $event)"></PointNameCell>
            </template>
            <template slot="pointKey" slot-scope="text, record">
              <PointCodeCell :sysCode="record.type" :pointCode='record.pointKey.replace(record.type,"")' @change="onPointChange(record.key, 'pointKey', $event)"></PointCodeCell>
            </template>
            <template slot="permIds" slot-scope="text, record">
              <PermsCell :permIds="text" @change="onPointChange(record.key, 'permIds', $event)"></PermsCell>
            </template>
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm
                v-if="dataSource.length"
                title="Sure to delete?"
                @confirm="() => onTableLineDelete(record.key)">
                <a href="javascript:;">Delete</a>
              </a-popconfirm>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}
</style>
<script>
import { OldSysCodes } from '@/config/outside-config'
import PointNameCell from './batchAddComponents/pointNameCell'
import SystemCell from './batchAddComponents/systemCell'
import PointCodeCell from './batchAddComponents/pointCodeCell'
import PermsCell from './batchAddComponents/permsCell'
export default {
  components: {
    PointNameCell,SystemCell,PointCodeCell,PermsCell
  },
  data() {

    return {
      isReady:false,
      sysListForSearch:[],
      tree:{
        roleTreeData:[],
        roleTreeDataArranged:[]
      },
      dataSource:[{
        key: '0',
        type:'', // 所属系统编码
        typeName:'', // 所属系统名称
        pointName:'', // 功能点名称
        pointKey:'', // 功能点编码
        permIds:[] // 功能点归属权限id
      }],
      dataCount:1,
      batchSetForm:{
        sysCode:'',
        pointName:'',
        pointCode:'',
        pointPermIds:[]
      },
      tableColumns: [{
        title: '业务子系统名称',
        dataIndex: 'type',
        width: '20%',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'system'
        },
      }, {
        title: '功能点名称',
        dataIndex: 'pointName',
        width: '20%',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'pointName'
        },
      }, {
        title: '功能点编码',
        dataIndex: 'pointKey',
        width: '20%',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'pointKey'
        },
      }, {
        title: '归属权限',
        dataIndex: 'permIds',
        width: '30%',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'permIds'
        },
      },{
        title: '操作',
        dataIndex: 'operation',
        width: '10%',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  watch: {
  },
  beforeCreate() {
    // this.porintCreateForm = this.$form.createForm(this)
  },
  created(){
    this.getRoleTree()
    this.getSysCodOptions()
    this.isReady = true
  },
  computed:{
  },
  methods:{
    /**
     * 判断列表批量设置时，当前展开的下拉框是否可以提交
     * @param {String} dataIndex table列的字段名
     * @returns {Boolean} true 有错 ； false 无错
     */
    disableBatchSet(dataIndex){
      let dis = false
      if('pointKey' === dataIndex && !this.$com.checkNumber(this.batchSetForm.pointCode)){
        if(!!this.batchSetForm.sysCode && this.batchSetForm.sysCode.length>0){ // 如果已经有系统code
          if(!this.batchSetForm.pointCode){ // 没有输入功能code数字位，则效验通过
            dis = true
          }else{
            if(!this.$com.checkNumber(this.batchSetForm.pointCode)){ // 有输入功能code数字位，必须为数字才效验通过
              dis = true
            }else{
              dis = false
            }
          }
        }else{ // 如果没有系统code
          if(!this.batchSetForm.pointCode){  // 没有输入过功能code数字位，则效验不通过
            dis = true
          }else{ // 有输入功能code数字位，必须为数字才效验通过
            if(!this.$com.checkNumber(this.batchSetForm.pointCode)){
              dis = true
            }else{
              dis = false
            }
          }
        }
      }
      if('type' === dataIndex && !this.batchSetForm.sysCode){
        dis = true
      }
      return dis
    },
    /**
     * 监听table批量设置表单字段的change事件，获取保存对应的值
     * @param {String,Array} select 对应输入项的值
     * @param {String} dataIndex table列的字段名
     */
    onBatchChange(select,dataIndex){
      switch (dataIndex) {
      case 'type':
        this.batchSetForm.sysCode = select
        break
      case 'pointName':
        this.batchSetForm.pointName = select
        break
      case 'pointKey':
        this.batchSetForm.pointCode = select
        break
      case 'permIds':
        this.batchSetForm.pointPermIds = select
        break
      default:
        break
      }
    },
    /**
     * 批量设置指定table列的值
     * @param {String} dataIndex table列的字段名
     */
    handleBatchSet(selectedKeys, confirm, dataIndex){
      switch(dataIndex){
      case 'type':
        this.dataSource.forEach((item,index)=>{
          item.type = this.batchSetForm.sysCode
          const target = this.sysListForSearch.find(sys => sys.value === item.type)
          item.typeName = target.label
        })
        break
      case 'pointName':
        this.dataSource.forEach((item,index)=>{
          item.pointName = this.batchSetForm.pointName
        })
        break
      case 'pointKey':
        this.dataSource.forEach((item,index)=>{
          item.pointKey = this.batchSetForm.sysCode+this.batchSetForm.pointCode
        })
        break
      case 'permIds':
        this.dataSource.forEach((item,index)=>{
          item.permIds = this.batchSetForm.pointPermIds
        })
        break
      default:
        break
      }
      confirm()
    },
    /**
     * 取消批量指定table列的值
     * @param {String} dataIndex table列的字段名
     */
    handleBatchCancel(clearFilters, dataIndex){
      clearFilters()
      switch(dataIndex){
      case 'type':
        this.batchSetForm.sysCode = undefined
        break
      case 'pointName':
        this.batchSetForm.pointName = ''
        break
      case 'pointKey':
        this.batchSetForm.pointCode = ''
        break
      case 'permIds':
        this.batchSetForm.pointPermIds = []
        break
      default:
        break
      }
    },
    /**
     * 添加一条空数据
     */
    addTableLine(){
      const { dataCount, dataSource } = this
      const newData = {
        key: dataCount,
        type:'', // 所属系统编码
        typeName:'', // 所属系统名称
        pointName:'', // 功能点名称
        pointKey:'', // 功能点编码
        permIds:[] // 功能点归属权限id
      }
      this.dataSource = [...dataSource, newData]
      this.dataCount = dataCount + 1
    },
    /**
     * 删除table指定key 的数据
     * @param {String} key 本次添加中的功能点数据的key值
     */
    onTableLineDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    /**
     * 监听单元格中功能点所属业务系统的change事件，获取子组件传递的更改后的值
     * @param {String} key 本次变更的功能点数据的key值
     * @param {Object} value 本次变更的功能点数据的业务系统值 {sysCode:业务系统code,sysName:业务子系统名称}
     */
    onSystemChange (key, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target['type'] = value.sysCode
        target['typeName'] = value.sysName
        this.dataSource = dataSource
      }
    },
    /**
     * 监听单元格中功能点名称的change事件，获取子组件传递的更改后的值
     * @param {String} key 本次变更的功能点数据的key值
     * @param {String} dataIndex 本次变更值在tableColumns中键值名称
     * @param {String} value 本次变更的功能点数据的名称
     */
    onPointChange (key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    createPointBatch(){
      let pushData = []
      let errs = {
        pointKey:false
      }
      pushData = this.dataSource.map((item) => {
        if(!item.pointKey){
          errs.pointKey = true
        }
        return {
          type:item.type, // 所属系统编码
          typeName:item.typeName, // 所属系统名称
          pointName:item.pointName, // 功能点名称
          pointKey:item.pointKey, // 功能点编码
          permIds:item.permIds // 功能点归属权限id
        }
      })
      if(!errs.pointKey){

        this.$ajax.post({
          url: this.$api.POST_PREMSPOINT_BATCH,
          params: pushData
        }).then(res => {
          if (res.code === '200') {
            this.$message.success('添加成功')
            this.$router.push({name:'/systemManagement/permissionConfig/point'})
          } else {
            this.$message.error(res.msg)
          }
        })
      }else{
        this.$message.error('功能编码不能为空！')
      }
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


