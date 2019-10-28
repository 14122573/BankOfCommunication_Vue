<template>
    <span class="cmsDataStatus">
        <a-badge :status="statusColor" :text="statusName" />
    </span>
</template>
<script>
export default {
  name:'CMSDataStatus',
  props:{
    cmsType:{
      type:String, // 知识：knowledge；通知：notice；投票：vote
      required:true
    },
    status:{
      type:String,
      required:true
    }
  },
  data(){
    return {
      statusColor:'default',
      statusName:''
    }
  },
  mounted(){
    this.checkStatusTags()
  },
  watch:{
    cmsType(){
      this.checkStatusTags()
    },
    status(){
      this.checkStatusTags()
    }
  },
  methods:{
    /**
     * 状态（通知、知识）：0-草稿 1-发布中 2-已失效
     * 状态（投票）：0-草稿 1-发布中 2-结束 3-结果已公示
     * @param {*} 接口返回的状态名称
     * @returns 返回tag的颜色类型
     */
    checkStatusTags() {
      switch (this.cmsType) {
      case 'knowledge':
        this.knowledgeStatus()
        break
      case 'notice':
        this.noticeStatus()
        break
      case 'vote':
        this.voteStatus()
        break
      default:
        break
      }

    },
    knowledgeStatus(){
      switch (this.status) {
      case '0':
        this.statusName = '草稿'
        this.statusColor = 'warning'
        break
      case '1':
        this.statusName = '发布中'
        this.statusColor = 'success'
        break
      case '2':
        this.statusName = '已失效'
        this.statusColor = 'default'
        break
      default:
        this.statusName = '-'
        this.statusColor = 'error'
        break
      }
    },
    noticeStatus(){
      switch (this.status) {
      case '0':
        this.statusName = '草稿'
        this.statusColor = 'warning'
        break
      case '1':
        this.statusName = '发布中'
        this.statusColor = 'success'
        break
      case '2':
        this.statusName = '已失效'
        this.statusColor = 'default'
        break
      default:
        this.statusName = '-'
        this.statusColor = 'error'
        break
      }
    },
    voteStatus(){
      switch (status) {
      case '0':
        this.statusName = '草稿'
        this.statusColor = 'warning'
        break
      case '1':
        this.statusName = '发布中'
        this.statusColor = 'processing'
        break
      case '2':
        this.statusName = '结束'
        this.statusColor = 'Success'
        break
      case '3':
        this.statusName = '结果已公示'
        this.statusColor = 'default'
        break
      default:
        this.statusName = '-'
        this.statusColor = 'Error'
        break
      }
    },
  }
}
</script>
<style>
.cmsDataStatus .ant-badge-status-dot{ width:9px; height:9px;}
</style>


