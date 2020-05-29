<template>
  <div class="routerWapper">
    <div v-if="$route.name == 'person'" class="portalDetailContentWapper" >
      <div class="layoutMargin detailsPartSection">
        <p class="detailsPartTitle">
          <a-row type="flex" justify="space-between">
            <a-col span="4"> 基本信息 </a-col>
            <a-col offset="8" span="8" class="algin-right">
              <a-button @click="toEditInfo">修改基本信息</a-button>
              <a-button @click="showPhoneModal = true">修改手机号</a-button>
              <a-button @click="showChangePwdModal">修改密码</a-button>
            </a-col>
          </a-row>
        </p>
        <a-row class="detailsPartLine">
          <a-col span="8">
            <DetailsItem :labelSpan='8' :textSpan="16" :label='"登录手机号"' :text='(!userInfo||!userInfo.phone)?"暂无":userInfo.phone'></DetailsItem>
          </a-col>
          <a-col span="8">
            <DetailsItem :labelSpan='8' :textSpan="16" :label='"姓名(账户名)"' :text='(!userInfo||!userInfo.name)?"暂无":userInfo.name'></DetailsItem>
          </a-col>
          <a-col span="8">
            <DetailsItem :labelSpan='8' :textSpan="16" :label='"邮箱"' :text='(!userInfo||!userInfo.mail)?"暂无":userInfo.mail'></DetailsItem>
          </a-col>
        </a-row>
        <a-row class="detailsPartLine">
          <a-col span="8">
            <DetailsItem :labelSpan='8' :textSpan="16" :label='"所在单位"' :text='(!userInfo||!userInfo.dept)?"暂无":userInfo.dept'></DetailsItem>
          </a-col>
          <a-col span="8">
            <DetailsItem :labelSpan='8' :textSpan="16" :label='"所在区域"' :text='(!userInfo ||!userInfo.area||!userInfo.area.areaName)?"暂无":userInfo.area.areaName'></DetailsItem>
          </a-col>
          <a-col span="8">
            <DetailsItem :labelSpan='8' :textSpan="16" :label='"邮编"' :text='(!userInfo||!userInfo.zipCode)?"暂无":userInfo.zipCode'></DetailsItem>
          </a-col>
        </a-row>
        <a-row class="detailsPartLine">
          <a-col span="16">
            <DetailsItem :labelSpan='4' :textSpan="20" :label='"单位地址"' :text='(!userInfo||!userInfo.addr)?"暂无":userInfo.addr'></DetailsItem>
          </a-col>
        </a-row>
        <a-row class="detailsPartLine">
          <a-col span="16">
            <DetailsItem :labelSpan='4' :textSpan="20" :label='"所在组织结构"' :text='(!userInfo||!userInfo.group||!userInfo.group.groupName)?"暂无":userInfo.group.groupName'></DetailsItem>
          </a-col>
        </a-row>
      </div>
      <div class="layoutMargin detailsPartSection" >
        <p class="detailsPartTitle">拥有子系统权限</p>
        <template v-if="userInfo.isAllPerm">
          <a-alert class="margin" message="您是超级管理员，将不详细展示权限内子系统清单" type="info" showIcon />
        </template>
        <template v-else>
          <div class="margin">
            <a-tag class="tag" color="blue" v-for="(item,index) in authSysList" :key="index">{{item}}</a-tag>
          </div>
        </template>
      </div>
      <ChangePassword @on-close='closeChangePwdModal' :resetPwdShow='isShowChangePwd'></ChangePassword>
      <ChangePhone v-model="showPhoneModal" @success="getData"/>
    </div>
    <RouterWapper v-else></RouterWapper>
  </div>
</template>
<style scoped>
.margin {margin:0 20px;}
.tag {margin:5px}
</style>
<script>
import { permission, } from '@/util/mixins'
import ChangePassword from '@/views/personal/changePassword'
import ChangePhone from './changePhone'
export default {
  name      : 'PersonCenter',
  mixins    : [ permission ],
  components: {
    ChangePassword,
    ChangePhone,
  },
  data() {
    return {
      userInfo       : {},
      isShowChangePwd: false,
      showPhoneModal : false,
      micSysConfigs  : []
    }
  },
  created(){
    if(this.$route.name == 'person'){
      // 获取目前接入portal的所有新系统、老系统配置
      this.$ajax.get({
        url: this.$api.SYSTEM_LIST_ALL_GET
      }).then(res => {
        if(res.code === '200'){
          this.micSysConfigs= this.$com.confirm(res, 'data.content', [])
        }else{
          this.$message.error(res.msg)
        }
      })
    }

  },
  mounted() {
    if(this.$route.name == 'person'){
      this.getData()
    }
  },
  computed: {
    showChangePwd(){
      return this.isShowChangePwd
    },
    authSysList(){
      if(!this.userInfo){
        return []
      }else{
        const list = this.getSysList()
        return list
      }
    }
  },
  methods: {
    getData() {
      this.getInfo().then(() => {
        this.userInfo = this.$store.state.userInfos
      })
    },
    toEditInfo() {
      const { id } = this.userInfo
      this.$router.push({
        name : '/systemManagement/administrator/editNewUser',
        query: {
          id,
          fromCenter: '1',
        },
      })
    },
    showChangePwdModal(){
      this.isShowChangePwd = true
    },
    closeChangePwdModal(){
      this.isShowChangePwd = false
    },

    /**
     * 根据权限，获取权限子系统清单
     * @returns {Array}
     */
    getSysList(){
      const authSysList = []
      for(let i=0;i<this.micSysConfigs.length;i++){
        if(this.$com.oneOf(this.micSysConfigs[i].sysCode, this.$store.state.permissionCodeList)){
          authSysList.push(this.micSysConfigs[i].sysName)
        }
      }
      return authSysList
    }
  }
}
</script>
