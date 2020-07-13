<template>
  <a-form class="protalForm" :form="pointNameForm">
    <a-form-item class='formItem' label="">
      <a-input v-decorator="['pointName',{ validateTrigger:'blur', rules:formRules.pointName}]" class="cellInput"/>
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
          { required: true, whitespace: true, validator: this.validatePointName } // message: '请填写功能点名称' }
        ],
      },
    }
  },
  beforeCreate() {
    this.pointNameForm = this.$form.createForm(this)
  },
  methods: {
    validatePointName(rule, value, callback){
      if(!value && !this.value){
        this.$emit('change', '' )
        callback('请填写功能点名称')
      }else{
        this.$emit('change', value )
        callback()
      }
    },
  },
}
</script>
