<template>
	<a-modal :maskClosable="false" cancelText="取消" okText="确认" @ok="handleOk" @cancel="handleCancel" :width="600" title="修改权限" :visible="isShow">
		<a-form class="layoutMargin" :form="permEditForm">
      <a-row type="flex" justify="start" align="middle">
        <a-col span="24">
          <a-form-item label="权限名称" :label-col="{span:4}" :wrapper-col="{span:20}">
            <a-input v-decorator="['permName',{ validateTrigger:'blur',rules:formRules.permName}]" placeholder="请输入权限分支名称"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start" align="middle">
        <a-col span="24">
          <a-form-item label="可分配否" :label-col="{span:4}" :wrapper-col="{span:20}">
            <a-radio-group :disabled="isDisabaleDistribution" v-decorator="['isHide',{validateTrigger:'blur',rules:formRules.isHide}]">
              <a-radio-button value="0">可分配</a-radio-button>
              <a-radio-button value="1">不可分配</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start" align="middle">
        <a-col span="24">
          <a-form-item label="拥有功能点" :label-col="{span:4}" :wrapper-col="{span:20}">
            <a-select @change="handlePointChange" v-decorator="['pointIds']" mode="multiple">
              <a-select-opt-group v-for="(pointsGroup,groupIndex) in pointsArray" :key='groupIndex'>
                <span slot="label">{{pointsGroup.name}}</span>
                <a-select-option v-for="(point) in pointsGroup.children" :value="point.id" :key="point.id">{{point.pointKey+'('+point.pointName+')'}}</a-select-option>
              </a-select-opt-group>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
	</a-modal>
</template>

<script>
export default {
  name : 'EditPermBranch',
  props: {
    parentNode: {
      type    : Object,
      required: true,
    },
    perm: {
      type    : Object,
      required: true,
    },
    timestamp: {
      type    : Number,
      required: true
    },
    resetShow: {
      type    : Boolean,
      required: true
    }
  },
  data() {
    return {
      isShow     : false,
      pointsArray: [],
      pointsList : null,
      editForm   : {
        pointSet: []
      },
      formRules: {
        permName: [
          { required: true, whitespace: true, message: '请输入权限分支名称' }
        ],
        isHide: [
          { required: true, whitespace: true, message: '请选择是否可分配' }
        ]
      },
    }
  },
  beforeCreate() {
    this.permEditForm = this.$form.createForm(this)
  },
  computed: {
    /**
     * 当父级权限是不可分配的（isHide==true）,则子集权限也不可分配。
     * @returns {Boolean}
     */
    isDisabaleDistribution(){
      if(this.parentNode.isHide){
        // 不可用
        return true
      }else{
        // 可用
        return false
      }
    }
  },
  watch: {
    timestamp(){
      this.getPointList()
      this.resetForm()
      if(this.perm.title){
        this.$nextTick(function () {
          this.permEditForm.setFieldsValue({ permName: this.perm.title })
          this.permEditForm.setFieldsValue({ isHide: this.perm.isHide?'1':'0' })
          this.permEditForm.getFieldDecorator('pointIds', { initialValue: this.perm.pointSet })
        })
      }
    },
    resetShow() {
      this.isShow = this.resetShow
      if(this.isShow){
        if(this.perm.title){
          // 初始化表单值
          this.$nextTick(function () {
            this.permEditForm.setFieldsValue({ permName: this.perm.title })
            this.permEditForm.setFieldsValue({ isHide: this.perm.isHide?'1':'0' })
            this.permEditForm.getFieldDecorator('pointIds', { initialValue: this.perm.pointSet })
          })
        }
      }
    }
  },
  created(){
    this.getPointList()
    // 初始化表单值
    if(this.perm.title){
      this.$nextTick(function () {
        this.permEditForm.setFieldsValue({ permName: this.perm.title })
        this.permEditForm.setFieldsValue({ isHide: this.perm.isHide?'1':'0' })
        this.permEditForm.getFieldDecorator('pointIds', { initialValue: this.perm.pointSet })
      })
    }

  },
  methods: {
    /**
     * 监听功能点选择变动，获取已选功能点
     * @param {Array} select 已选功能点id数组
     */
    handlePointChange(select){
      for(let i=0;i<select.length;i++){
        this.editForm.pointSet.push({
          id: select[i]
        })
      }
    },

    /**
     * 搜索获取功能点清单
     */
    getPointList(){
      this.$ajax.get({
        url: this.$api.GET_PREMSPOINT_LIST,
      }).then(res => {
        if(res.code === '200'){
          this.pointsList = this.$com.confirm(res, 'data.content', [])
          // 整理数据，可用于collapse展示
          this.pointsArray = []
          for(const item in this.pointsList){
            this.pointsArray.push({
              name    : item,
              children: [].concat(this.pointsList[item])
            })
          }
        }else{
          this.$message.error(res.msg)
        }
        this.isReady =true
      })
    },
    getSelectPointSetObject(pointSetArr){
      const selected = []
      for(let i=0;i<pointSetArr.length;i++){
        selected.push({
          id: pointSetArr[i]
        })
      }
      return selected
    },

    /**
     * 提交创建权限分支
     */
    handleOk() {
      this.permEditForm.validateFields(err => {
        if (!err) {
          const parentPermid = this.parentNode.key=='-1'?'0':this.parentNode.key
          const putParams = Object.assign({ parentId: parentPermid }, {
            'permName': this.permEditForm.getFieldValue('permName'),
            'isHide'  : this.permEditForm.getFieldValue('isHide')=='0'?false:true,
            'pointSet': this.getSelectPointSetObject(this.permEditForm.getFieldValue('pointIds'))
          })

          this.$ajax.post({
            url   : this.$api.PUT_PREMSBRANCH.replace('{id}', this.perm.key),
            params: putParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('修改成功')
              this.resetForm()
              this.$emit('on-success', true)
            }
          })
        }else{
          this.$com.getFormValidErrTips(this, err)
        }
      })
    },

    /**
     * 取消创建权限分支
     */
    handleCancel() {
      // this.resetForm()
      this.$emit('on-success', false)
    },
    resetForm() {
      this.permEditForm.resetFields()
    }
  }
}
</script>
