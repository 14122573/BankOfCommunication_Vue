<template>
  <div class="portalDetailContentWapper">
    <a-row class="detailsPartLine">
      <a-col span="8">
        <DetailsItem :labelSpan='8' :textSpan="16" :label='"姓名"' :text='!detail.name?"暂无":detail.name'></DetailsItem>
      </a-col>
      <a-col span="8">
        <DetailsItem :labelSpan='8' :textSpan="16" :label='"账号"' :text='!detail.phone?"暂无":detail.phone'></DetailsItem>
      </a-col>
      <a-col span="8">
        <DetailsItem :labelSpan='8' :textSpan="16" :label='"邮箱"' :text='!detail.mail?"暂无":detail.mail'></DetailsItem>
      </a-col>
    </a-row>
    <a-row class="detailsPartLine">
      <a-col span="8">
        <DetailsItem :labelSpan='8' :textSpan="16" :label='"单位名称"' :text='!detail.dept?"暂无":detail.dept'></DetailsItem>
      </a-col>
      <a-col span="8">
        <DetailsItem :labelSpan='8' :textSpan="16" :label='"邮编"' :text='!detail.zipCode?"暂无":detail.zipCode'></DetailsItem>
      </a-col>
      <a-col span="8">
        <DetailsItem :labelSpan='8' :textSpan="16" :label='"注册时间"' :text='!$com.strTime(detail.createTime)?"暂无":$com.strTime(detail.createTime)'></DetailsItem>
      </a-col>
    </a-row>
    <a-row class="detailsPartLine">
      <a-col span="16">
        <DetailsItem :labelSpan='4' :textSpan="20" :label='"地址"' :text='!detail.addr?"暂无":detail.addr'></DetailsItem>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props:{
    id:{
      type:String,
      default:null
    }
  },
  data(){
    return{
      detail:{},
    }
  },
  methods:{
    getDetail(){
      if(this.id !== null){
        this.$ajax.get({
          url:this.$api.USER_ACCOUNT_DETAIL.replace('{id}',this.id)
        })
          .then((res)=>{
            if(res.code === '200'){
              let data = this.$com.confirm(res, 'data.content', {})
              this.detail=data
            }else{
              this.$message.error(res.msg)
            }
          })
      }
    }
  },
  mounted(){
    this.getDetail()
  },
  filters:{
    txt(value){
      if(value !== null && value !== ''){
        return value
      }else{
        return '暂无'
      }
    }
  }
}
</script>
<style scoped>
    .colMargin {
        margin-bottom: 20px;
    }

    .colLabel {
        text-align: right;
    }
</style>

