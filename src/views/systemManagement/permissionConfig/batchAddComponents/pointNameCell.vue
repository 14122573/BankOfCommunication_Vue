<template>
  <a-form class="protalForm" :form="pointNameForm">
    <a-form-item class='formItem' label="">
      <a-input v-decorator="['pointName',{rules:formRules.pointName}]" class="cellInput" @change="handleChange" @pressEnter="check"/>
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
    pointName: String
  },
  data () {
    return {
      value    : this.pointName,
      formRules: {
        // 相关管理信息
        pointName: [
          { required: true, whitespace: true, message: '请填写功能点名称' }
        ],
      },
    }
  },
  watch: {
    pointName(){
      this.value = this.pointName
      this.pointNameForm.setFieldsValue({ pointName: this.value })
      this.pointNameForm.validateFields()
    }
  },
  beforeCreate() {
    this.pointNameForm = this.$form.createForm(this)
  },
  created(){
    this.$nextTick(()=>{
      this.pointNameForm.setFieldsValue({ pointName: this.pointName })
    })
  },
  methods: {
    handleChange (e) {
      const value = e.target.value
      this.value = value
      this.pointNameForm.validateFields(err => {
        if (!err) {
          this.$emit('change', this.value)
        }
      })
    },
    check () {
      this.pointNameForm.validateFields(err => {
        if (!err) {
          this.$emit('change', this.value)
        }
      })
    },
  },
}
</script>
