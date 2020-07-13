<template>
  <a-form class="protalForm" :form="pointKeyForm">
    <a-form-item class='formItem' label="">
      <a-input :addonBefore="systemCode?systemCode:''" v-decorator="['pointKey',{rules:formRules.pointCode}]" class="cellInput" @change="handleChange" @pressEnter="check"/>
    </a-form-item>
  </a-form>
</template>
<style scoped>
.cellInput,.cellText { width: 90%}
.cellText { display: inline-block; margin: 0}
.cellBtn { cursor: pointer; color: #1890ff}
</style>

<script>
export default {
  props: {
    sysCode: {
      type   : String,
      default: ''
    },
    pointCode: {
      type   : String,
      default: ''
    }
  },
  data () {
    const validatePointCode = (rule, value, callback) => {
      const code = (!this.sysCode?'':this.sysCode)+(!value?'':value)
      if(!this.sysCode){
        this.$emit('change', '')
        callback('请选择系统！')
      }else{
        if(!value){
          this.$emit('change', '')
          callback('请填写功能点编码')
        }else{
          if (!!value && value.length>0 && !!this.sysCode && !this.$com.checkNumber(value)) {
            this.$emit('change', '')
            callback('功能编码仅能填写数字')
          } else {
            this.$ajax.get({
              url: this.$api.GET_CHECK_POINTCODE_EXIT + '?pointKey=' + code
            }).then(res => {
              if (res.data.content === false) {
                this.$emit('change', (this.systemCode + value))
                callback()
              } else {
                this.$emit('change', '')
                callback('功能点编码已存在!')
              }
            })
          }
        }
      }
    }
    return {
      systemCode: this.sysCode,
      value     : this.pointCode,
      formRules : {
        pointCode: [
          { validator: validatePointCode }
        ],
      },
    }
  },
  beforeCreate() {
    this.pointKeyForm = this.$form.createForm(this)
  },
  created(){
    this.$nextTick(() => {
      this.pointKeyForm.setFieldsValue({ pointKey: this.value })
    })
  },
  watch: {
    sysCode(){
      this.systemCode = this.sysCode
      this.pointKeyForm.validateFields()
    },
    pointCode(){
      this.value = this.pointCode
      this.pointKeyForm.setFieldsValue({ pointKey: this.value })
      this.pointKeyForm.validateFields()
    }
  },
  methods: {
    handleChange (e) {
      // const value = e.target.value
      // this.value = value
    },
    check () {
      // this.pointKeyForm.validateFields(err => {
      //   if (!err) {
      //     this.$emit('change', (this.systemCode + this.value))
      //   }
      // })
    },
  },
}
</script>
