<template>
	<a-modal :maskClosable="false" cancelText="取消" okText="确认" @ok="handleOk" @cancel="handleCancel" :width="600" title="添加权限" :visible="isShow">
		<a-form class=" layoutMargin" :form="permCreateForm">
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
            <a-select @change="handlePointChange" mode="multiple">
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
  name : 'CreatePermBranch',
  props: {
    parentNode: {
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
      createForm : {
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
    this.permCreateForm = this.$form.createForm(this)
  },
  computed: {
    /**
     * 当父级权限是不可分配的（isHide==true）,则子集权限也不可分配。并默认初始化子集权限是否可分配表单值
     * @returns {Boolean}
     */
    isDisabaleDistribution(){
      this.$nextTick(function () {
        this.permCreateForm.setFieldsValue({ isHide: this.parentNode.isHide?'1':'0' })
      })
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
      this.resetForm()
    },
    resetShow() {
      this.isShow = this.resetShow
    }
  },
  created(){
    this.getPointList()
  },
  methods: {
    /**
     * 监听功能点选择变动，获取已选功能点
     * @param {Array} select 已选功能点id数组
     */
    handlePointChange(select){
      for(let i=0;i<select.length;i++){
        this.createForm.pointSet.push({
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
      }).then(res=>{
        if(res.code === '200'){
          this.pointsList = this.$com.confirm(res, 'data.content', [])
          // 整理数据，可用于collapse展示
          this.pointsArray = []
          for(let item in this.pointsList){
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

    /**
     * 提交创建权限分支
     */
    handleOk() {
      this.permCreateForm.validateFields(err => {
        if (!err) {
          let postParams = Object.assign({ parentId: this.parentNode.key },this.createForm ,{
            'permName': this.permCreateForm.getFieldValue('permName'),
            'isHide'  : this.permCreateForm.getFieldValue('isHide')=='0'?false:true
          })
          this.$ajax.post({
            url   : this.$api.POST_PREMSBRANCH,
            params: postParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('添加成功')
              this.resetForm()
              this.$emit('on-success',true)
            }
          })
        }else{
          this.$com.getFormValidErrTips(this,err)
        }
      })
    },

    /**
     * 取消创建权限分支
     */
    handleCancel() {
      this.resetForm()
      this.$emit('on-success',false)
    },
    resetForm() {
      this.permCreateForm.resetFields()
    }
  }
}
</script>
