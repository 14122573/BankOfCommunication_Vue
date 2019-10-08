<template>
  <div v-if="sysListForSearch.length>0">
    <a-form class="protalForm" :form="sysForm">
      <a-form-item class='formItem' label="">
        <a-select allowClear placeholder="请选择业务系统" class="cellInput" :options="sysListForSearch" v-decorator="['sysCode']" @change="onSysChange" />
      </a-form-item>
    </a-form>
  </div>
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
      type:String,
      default:''
    }
  },
  data () {
    return {
      sysListForSearch:[],
      value: this.sysCode,
      systemName: '',
    }
  },
  beforeCreate() {
    this.sysForm = this.$form.createForm(this)
  },
  created(){
    this.getSysCodOptions()
    this.$nextTick(()=>{
      this.sysForm.setFieldsValue({sysCode:this.value})
    })
  },
  watch:{
    sysCode(){
      this.value = this.sysCode
      this.sysForm.setFieldsValue({sysCode:this.value})
      this.systemName = this.initSysName(this.value)
    }
  },
  methods: {
    /**
     * 根据传入参数，初始化获得展示的系统名称
     */
    initSysName(code){
      let name = ''
      this.sysListForSearch.forEach(element => {
        if(code ==element.value) {
          name= element.label
        }
      })
      this.systemName = name
      return name
    },
    /**
     * 监听系统选择，获取选择系统的名称
     * @param {String} select 当前选择的系统code
     */
    onSysChange(select){
      this.value = select
      this.sysListForSearch.forEach(element => {
        if(select==element.value) {
          this.systemName =  element.label
        }
      })
      this.$emit('change', {sysCode:this.value,sysName:this.systemName})
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
  },
}
</script>
