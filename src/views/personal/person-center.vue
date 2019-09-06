<template>
  <div class="portalDetailContentWapper">
    <div class="layoutMargin detailsPartSection">
      <p class="detailsPartTitle">
        <a-row type="flex" justify="space-between">
          <a-col span="4"> 基本信息 </a-col>
          <a-col offset="12" span="4" class="algin-right">
            <a-button>修改密码</a-button>
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
    <div class="layoutMargin detailsPartSection">
      <p class="detailsPartTitle">拥有子系统权限</p>
      <template v-if="userInfo.isAllPerm">
        <a-alert class="margin" message="您是超级管理员，将不详细展示权限内子系统清单" type="info" showIcon />
      </template>
      <template v-else>
        <div class="margin" v-for="(item,index) in authSysList" :key="index">
          <a-tag class="tag" color="blue" >{{item}}</a-tag>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.margin {margin:0 20px;}
.tag {margin:5px}
</style>
<script>
import { permission, } from '@/util/mixins'
export default {
  name: 'PersonCenter',
  mixins: [permission],
  data() {
    return {
      userInfo:null
    }
  },
  created() {
    if(!this.$store.state.userInfos){
      this.getInfo()
    }else{
      this.userInfo = this.$store.state.userInfos
    }
  },
  computed:{
    authSysList(){
      if(!this.userInfo){
        return []
      }else{
        let list = this.getSysList()
        return list
      }
    }
  },
  methods: {
    /**
     * 根据权限，获取权限子系统清单
     * @returns {Array}
     */
    getSysList(){
      let authSysList = []
      if(this.$com.oneOf('S1001',this.$store.state.permissionCodeList)){
        authSysList.push('学术会议')
      }
      if(this.$com.oneOf('S1002',this.$store.state.permissionCodeList)){
        authSysList.push('范蠡奖评审')
      }
      if(this.$com.oneOf('S0201',this.$store.state.permissionCodeList)){
        authSysList.push('团体标准管理')
      }
      if(this.$com.oneOf('S0602',this.$store.state.permissionCodeList)){
        authSysList.push('渔业兽医管理')
      }
      if(this.$com.oneOf('S0601',this.$store.state.permissionCodeList)){
        authSysList.push('水生动物防疫')
      }
      if(this.$com.oneOf('S0703',this.$store.state.permissionCodeList)){
        authSysList.push('质量追溯')
      }
      if(this.$com.oneOf('S0501',this.$store.state.permissionCodeList)){
        authSysList.push('水产新品种审定')
      }
      if(this.$com.oneOf('S0101',this.$store.state.permissionCodeList)){
        authSysList.push('科普教育基地申报管理')
      }
      if(this.$com.oneOf('S0502',this.$store.state.permissionCodeList)){
        authSysList.push('源良种场')
      }
      if(this.$com.oneOf('YQCB',this.$store.state.permissionCodeList)){
        authSysList.push('全国水产养殖动植物病情测报系统')
      }
      if(this.$com.oneOf('ZXJC',this.$store.state.permissionCodeList)){
        authSysList.push('国家水生动物疫病监测信息管理系统')
      }
      if(this.$com.oneOf('NYPC',this.$store.state.permissionCodeList)){
        authSysList.push('水产养殖动物病原菌耐药性普查数据分析系统')
      }
      if(this.$com.oneOf('SCYJ',this.$store.state.permissionCodeList)){
        authSysList.push('国家水生动物疫情预警系统')
      }
      return authSysList
    }
  }
}
</script>

<style>

</style>
