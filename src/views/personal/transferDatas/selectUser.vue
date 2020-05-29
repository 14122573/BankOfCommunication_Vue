<template>
  <a-modal :maskClosable="false" cancelText="取消" okText="确认数据接收人" @cancel="handleCancel" :width="700"
	 title="选择数据接收账户" :visible="isShow" :footer="null">
    <a-form class="protalForm" :form="userSearchForm">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col span="16">
          <a-form-item class='formItem' label="账户(手机号)" :label-col="{span:8}" :wrapper-col="{span:16}">
            <a-input placeholder="请输入" v-decorator="['phone_l']" />
          </a-form-item>
        </a-col>
        <a-col span="8" class="algin-right">
          <a-button @click="resetForm">重置</a-button>
          <a-button type="primary" @click="getLists">搜索</a-button>
        </a-col>
      </a-row>
    </a-form>
    <p class="gayLine noline"></p>
    <a-table size='small' class="portalTable" :columns="columns" :dataSource="userDatas" rowKey='id' :pagination='pagination'>
      <span slot="action" slot-scope="text, record">
        <span class="actionBtn" style="color:red" @click="toTransfer(record)">移交数据</span>
      </span>
    </a-table>
  </a-modal>
</template>
<script>
export default {
  name : 'transferTargetUser',
  props: {
    resetShow: {
      type    : Boolean,
      required: true
    },
    transferDatas: {
      type    : Array,
      required: true
    }
  },
  data() {
    return {
      isShow        : false,
      userDatas     : [],
      needsAuthCodes: [],
      columns       : [
        {
          title    : '账号',
          dataIndex: 'phone',
          key      : 'phone',
          width    : 120
        }, {
          title    : '姓名',
          dataIndex: 'name',
          key      : 'name',
          width    : 100
        }, {
          title    : '单位',
          dataIndex: 'dept',
          key      : 'dept',
          width    : 130
        }, {
          title    : '地址',
          dataIndex: 'companyAddress',
          key      : 'companyAddress',
        }, {
          title      : '操作',
          key        : 'operation',
          width      : 80,
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
    }
  },
  watch: {
    resetShow() {
      this.isShow = this.resetShow
    },
    transferDatas(){
      this.gerenateNeedsAuthCodes()
    }
  },
  beforeCreate() {
    this.userSearchForm = this.$form.createForm(this)
  },
  created(){
    this.getLists()
  },
  mounted() {
    this.gerenateNeedsAuthCodes()
  },
  methods: {
    /**
     * 根据传入的已选中需转移的数据，组装需要使用者这些数据要的权限码
     */
    gerenateNeedsAuthCodes(){
      this.needsAuthCodes = []
      this.transferDatas.forEach(element => {
        const singeDataAuthCode = !element.pointCode?[]:element.pointCode.split(',')
        const merged = this.needsAuthCodes.concat(singeDataAuthCode)
        const goHeavy = new Set(merged)
        this.needsAuthCodes = [].concat(Array.from(goHeavy))
      })
    },
    resetForm() {
      this.userSearchForm.resetFields()
      this.userDatas = []
      this.needsAuthCodes=[]
      this.pagination.pageNo = 1
      this.pagination.current = 1
      this.getLists()
    },
    handleCancel(){
      this.resetForm()
      this.$emit('on-success', false)
    },

    /**
     * 验证勾选用户权限合法性，并调用接口实现数据移交
     * @param {Object} targetUser 当前选中目标用户的数据
     */
    toTransfer(targetUser){
      const hasAuth = this.checkAuthCode(targetUser.permKey)
      if(hasAuth){
        this.$ajax.put({
          url   : this.$api.PUT_DECLARATION_TRANSFER,
          params: {
            targetUserId: targetUser.id,
            datas       : this.transferDatas
          }
        }).then(res => {
          if(res.code =='200'){
            this.$message.success('移交数据成功')
            this.resetForm()
            this.$emit('on-success', true)
          }else{
            this.$message.error(res.msg)
          }
        })
      }else{
        this.$modal.error({
          title  : '移交数据失败',
          content: '该用户缺少必要权限，无法使用转移数据'
        })
      }
    },

    /**
     * 判断当前选中目标用户，是否拥有需要转移数据全部操作权限
     * @param {Array} userCodes 当前选中目标用户的权限码数组
     * @returns {Boolean} true 拥有全部权限
     */
    checkAuthCode(userCodes){
      const userCodesArray = !userCodes?[]:userCodes.split(',')
      if(!(userCodesArray instanceof Array)||((userCodesArray.length < this.needsAuthCodes.length))){
        return false
      }
      let unInNum = 0
      this.needsAuthCodes.forEach(code => {
        console.log(code, userCodesArray.includes(code))
        if(!userCodesArray.includes(code)){
          unInNum ++
        }
      })
      if(unInNum>0){
        return false
      }else{
        return true
      }
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
      const options = this.$com.dealObjectValue(this.userSearchForm.getFieldsValue())
      this.$ajax.get({
        url   : this.$api.GET_DECLARATION_TARGETUSER_LIST,
        params: Object.assign({}, options, {
          pageNo  : this.pagination.pageNo,
          pageSize: this.pagination.pageSize
        })
      }).then(res => {
        if(res.code =='200'){
          this.userDatas = this.$com.confirm(res, 'data.content', [])
          this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
        }else{
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
