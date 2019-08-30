<template>
    <span >
        <a-row type="flex" justify="start" >
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="6" class="colLabel">
                        姓名：
                    </a-col>
                    <a-col span="18">
                        {{detail.name | txt}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="6" class="colLabel">
                        账号：
                    </a-col>
                    <a-col span="18">
                        {{detail.phone | txt}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="6" class="colLabel">
                        邮箱：
                    </a-col>
                    <a-col span="18">
                        {{detail.mail | txt}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="6" class="colLabel">
                        邮编：
                    </a-col>
                    <a-col span="18">
                        {{detail.zipCode | txt}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="6" class="colLabel">
                        注册时间：
                    </a-col>
                    <a-col span="18">
                        {{$com.strTime(detail.createTime) | txt}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="6" class="colLabel">
                        单位：
                    </a-col>
                    <a-col span="18">
                        {{detail.dept | txt}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="6" class="colLabel">
                        地址：
                    </a-col>
                    <a-col span="18">
                        {{detail.addr | txt}}
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </span>
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
              let data=res.data.content
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

