<template>
  <div class="routerWapper">
    <div class="layoutMargin layoutPadding">
      <a-form class="protalForm" :form="datasSearchForm">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col span="10">
            <a-form-item class='formItem' label="业务系统" :label-col="{span:6}" :wrapper-col="{span:18}">
              <a-select mode="multiple" style="width:100%" placeholder="请选择业务系统" v-decorator="['systemCode']">
                <a-select-option v-for="(system,index) in sysListForSearch" :key="index" :value="system.value">{{system.label}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item class='formItem' label="申请(报)材料名称" :label-col="{span:10}" :wrapper-col="{span:14}">
              <a-input placeholder="请输入" v-decorator="['title']" />
            </a-form-item>
          </a-col>
          <a-col span="6" class="algin-right">
            <a-button @click="reset">重置</a-button>
            <a-button type="primary"  @click="getLists">搜索</a-button>
          </a-col>
        </a-row>
      </a-form>
      <p class="gayLine noline"></p>
      <div class='portalTableOperates'>
        <a-button icon='retweet' type="primary" @click="batchSelectTranferData">批量转移数据</a-button>
      </div>
      <a-table size='small' class="portalTable" :columns="columns" :dataSource="declarationDatas" :rowSelection="rowSelection" rowKey='id' :pagination='pagination'>
        <span slot="system" slot-scope="text, record">
          {{getSystemNameByCode(record.systemCode)}}
        </span>
        <span slot="action" slot-scope="text, record">
         	<span class="actionBtn" style="color:red" @click="batchSelectTranferData(record)">转移数据</span>
        </span>
      </a-table>
    </div>
    <SelectTargetUser @on-success='closeSelectTagetUserModal' :transferDatas='selecteds.confirmDatas' :resetShow='modalControlers'></SelectTargetUser>
  </div>
</template>
<script>
import SelectTargetUser from '@/views/personal/transferDatas/selectUser'
export default {
  name      : 'transferPersonalDatas',
  components: {
    SelectTargetUser
  },
  data() {
    return {
      modalControlers : false,
      allSystemCodes  : '',
      sysListForSearch: [],
      declarationDatas: [],
      columns         : [
        {
          title    : '申请(报)材料名称',
          dataIndex: 'title',
          key      : 'title',
        },{
          title    : '提交时间',
          dataIndex: 'time',
          key      : 'time',
          width    : 180
        },{
          title    : '审请(报)状态',
          dataIndex: 'status',
          key      : 'status',
          width    : 130
        },{
          title      : '所属系统',
          dataIndex  : 'systemCode',
          key        : 'systemCode',
          width      : 240,
          scopedSlots: {
            customRender: 'system'
          }
        },{
          title      : '操作',
          key        : 'operation',
          width      : 100,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      pagination: {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        current        : 1,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.onPageChange
      },
      selecteds: {
        selectedDatas: [],
        confirmDatas : [],
        targetUserId : ''
      },
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selecteds.selectedDatas = selectedRows
        }
      }
    }
  },
  beforeCreate() {
    this.datasSearchForm = this.$form.createForm(this)
  },
  created(){
    this.getSysCodOptions()
  },
  mounted() {
    this.getLists()
  },
  computed: {
  },
  methods: {
    /**
     * 批量或单条确认选中 需转移的数据，并展示选择数据接收目标用户弹窗
     * @param {Object} seletedRows 单条确认选中的需转移的数据
     */
    batchSelectTranferData(seletedRows){
      if(!!seletedRows && (seletedRows instanceof Object) && !!seletedRows.systemCode){
        this.selecteds.confirmDatas = []
        this.selecteds.confirmDatas.push(seletedRows)
      }else{
        this.selecteds.confirmDatas = [].concat(this.selecteds.selectedDatas)
      }
      if(this.selecteds.confirmDatas.length==0){
        this.$modal.warning({
          title  : '未选择需转移数据',
          content: '请勾选至少一条申报(请)数据'
        })
      }else{
        this.modalControlers = true
      }
    },

    /**
     * 关闭批量创建账号弹窗表单，并根据传参判断是否重载列表
     * @param {Boolean} isReload 是否重载列表
     */
    closeSelectTagetUserModal(isReload){
      this.modalControlers = false
      if(isReload){
        this.getLists()
      }
    },

    /**
     * 获取子系统
     * @param {String} code 系统编码
     * @returns {String} 系统编码
     */
    getSystemNameByCode(code){
      let name = ''
      if(!!code){
        this.sysListForSearch.forEach(item =>{
          if(item.value == code){
            name = item.label
          }
        })
      }
      return name
    },

    /**
     * 清空表单搜索条件，展示默认列表内容
     */
    reset(){
      this.datasSearchForm.resetFields()
      this.getLists()
    },

    /**
     * 监听分页变化，调用数据查询
     * @param {Int} val 当前选择的分页
     */
    onPageChange(val){
      this.pagination.pageNo = val
      this.pagination.current = val
      this.getLists()
    },
    getLists(){
      const options = this.$com.dealObjectValue(this.datasSearchForm.getFieldsValue())
      let params = {}
      if(!options.systemCode){
        params['systemCode'] = this.allSystemCodes
      }else{
        let codes = ''
        options.systemCode.forEach(item => {
          codes += item +','
        })
        params['systemCode'] = codes.slice(0,-1)
      }
      if(options.title){
        params['title'] = options.title
      }
      this.$ajax.get({
        url   : this.$api.GET_DECLARATION_LIST,
        params: Object.assign({},params,{
          pageNo  : this.pagination.pageNo,
          pageSize: this.pagination.pageSize
        })
      }).then(res=>{
        if(res.code =='200'){
          this.declarationDatas = this.$com.confirm(res, 'data.content', [])
          this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    /**
     * 获取可选的子系统清单
     */
    getSysCodOptions(){
      this.$ajax.get({
        url   : this.$api.SYSTEM_LIST_ALL_GET,
        params: { type: '1' }
      }).then(res=>{
        if(res.code === '200'){
          let data = this.$com.confirm(res, 'data.content', [])
          this.sysListForSearch = []
          this.sysListForSearch = data.map((item) => {
            return {
              label: item.sysName,
              value: item.sysCode
            }
          })
          this.allSystemCodes=''
          this.sysListForSearch.forEach(item => {
            this.allSystemCodes += item.value+','
          })
          this.allSystemCodes = this.allSystemCodes.slice(0,-1)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>
