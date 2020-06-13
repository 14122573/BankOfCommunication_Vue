<template>
  <a-menu :mode="menuMode" @openChange="onOpenChange" :openKeys="defaultOpenKeys" v-model="defaultSelectedKeys" class="sideMenu" theme="dark" style="text-align:left;">
    <template v-for="menu in menus">
      <template v-if="menu.children && menu.children.length > 0">
        <a-sub-menu :key="menu.name">
          <span slot="title" :title="menu.meta.title">
            <template v-if="menu.meta.menuIcon">
              <a-icon :type="menu.meta.menuIcon" />
            </template>
            <template v-else>
              <a-icon type="bars" />
            </template>
            <span>{{menu.meta.title}}</span>
          </span>
          <template v-for="child in menu.children">
            <a-menu-item :key="child.name" @click="({item, key}) => {navigateTo({item, key},child)}">
              <template v-if="child.meta.menuIcon">
                <a-icon :type="child.meta.menuIcon" />
              </template>
              <template v-else>
                <a-icon type="bars" />
              </template>
              <span :title="child.meta.title">{{child.meta.title}}</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>

      <template v-else-if="!menu.children">
        <a-menu-item :key="menu.name" @click="({item, key}) => {navigateTo({item, key},menu)}">
          <template v-if="menu.meta.menuIcon">
            <a-icon :type="menu.meta.menuIcon" />
          </template>
          <template v-else>
            <a-icon type="bars" />
          </template>
          <span :title="menu.meta.title">{{menu.meta.title}}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script>
// import { navigateToUrl } from 'single-spa'
import common from '@/util/common'
export default {
  name : 'SideMenu',
  props: {
    menuMode: {
      type    : String,
      required: true,
      validator (value) {
        return common.oneOf(value, [ 'inline', 'vertical' ])
      }
    }
  },
  data(){
    return{
      userInfo           : null,
      openKeys           : [],
      defaultSelectedKeys: [],
      defaultOpenKeys    : [],
      micSysConfigs      : [],
      oldSysUrls         : {}
    }
  },
  created() {
    const { defaultSelectedKeys, defaultOpenKeys } = this.$store.state.defaultMenuStatus
    this.defaultSelectedKeys = defaultSelectedKeys || []
    this.defaultOpenKeys = (defaultOpenKeys.length <= 0 || !defaultOpenKeys[0]) ? [] : defaultOpenKeys

    // 获取目前接入portal的所有新系统、老系统配置
    if (this.$cookie.get('token')) {
      this.$ajax.get({
        url: this.$api.SYSTEM_LIST_ALL_GET
      }).then(res => {
        if(res.code === '200'){
          this.micSysConfigs= this.$com.confirm(res, 'data.content', [])
          for(let i=0;i<this.micSysConfigs.length;i++){
            // 抓取老系统配置，并重新组装数据
            if(!this.micSysConfigs[i].type){
              this.oldSysUrls[this.micSysConfigs[i].sysCode] = this.micSysConfigs[i].sysUrl
            }
          }
        }else{
          this.$message.error(res.msg)
        }
        // console.log('oldSysUrls',this.micSysConfigs,this.oldSysUrls)
      })
    }
  },
  computed: {
    menus() {
      // console.log('computed',this.$store.state.menuList)
      return this.$store.state.menuList
    }
  },
  methods: {
    /**
     * 组装需要跳转的外部地址
     * @param {String} sysCode 当前点击的外部系统的系统code
     * @returns false 代表没有找到；
     */
    getRedirctUrl(sysCode){
      if(!sysCode) return false

      this.userInfo = (null == this.userInfo) ? this.$store.state.userInfos : this.userInfo
      let userId = ''

      if(Array.isArray(this.userInfo.oldAccountSet) && this.userInfo.oldAccountSet.length>0){

        this.userInfo.oldAccountSet.forEach(element => {
          if('object'== typeof element.sysDic && 'string' == typeof element.sysDic.sysCode && element.sysDic.sysCode.length>0 ){
            if(element.sysDic.sysCode===sysCode) userId = element.userId
          }
        })
        if ( userId =='') userId = this.userInfo.id
      }else {
        userId = this.userInfo.id
      }
      let redirctUrl = ''
      if('string' == typeof this.oldSysUrls[sysCode] && this.oldSysUrls[sysCode] !=''){
        redirctUrl = this.oldSysUrls[sysCode]+'?userId='+userId+'&accessToken='+this.$cookie.get('token')+'&refreshToken='+this.$cookie.get('refresh_token')
      }
      return redirctUrl==''?false:redirctUrl
    },

    /**
     * 根据菜单打开方式，做不同动作
     * @param {Object} menu 菜单的route对象
     *
     */
    navigateTo({ item, key }, menu) {
      // console.log(item, key, menu)
      if(menu.meta){
        const openMode = menu.meta.openMode?menu.meta.openMode:'normal'
        switch (openMode) {
        case 'outsite':
          if(!this.$cookie.get('token')){
            this.$com.handleLogOut()
          }else{
            const href = this.getRedirctUrl(key)
            if(href) {
              this.$router.push({
                name  : menu.name,
                params: {
                  sysname: menu.meta.title
                } })
              window.open(href, '_blank')
            }else{
              this.$router.push({ name: 'noautherr' })
            }
          }
          break
        case 'normal':
          this.$router.push({ name: menu.name })
          break
        case 'spa':
          this.$router.push({ path: menu.path })
          break
        default:
          this.$router.push({ name: menu.name })
          break
        }
      }else{
        this.$router.push({ name: menu.name })
      }
    },
    // 点击菜单，收起其他展开的所有菜单
    onOpenChange (openKeys) {
      const menuKeys = this.menus.map(item => item.name)
      const latestOpenKey = openKeys.find(key => this.defaultOpenKeys.indexOf(key) === -1)
      if (menuKeys.indexOf(latestOpenKey) === -1) {
        this.defaultOpenKeys = openKeys
      } else {
        this.defaultOpenKeys = latestOpenKey ? [ latestOpenKey ] : []
      }
    },

    /**
     * 遍历左侧菜单,根据目标跳转路由的route.name找到目标路由在左侧菜单的父级
     * 通常此方法解决的是 专家库-》专家评审 跳转到子项目
     * @param {String} toName 目标跳转路由
     * @returns {Object}
     */
    findDefaultMenuKeys(toName){
      let selectedKeys = '', openKeys=''
      for(let i=0;i<this.$store.state.menuList.length;i++){
        const menuGroup = this.$store.state.menuList[i]
        if(toName.indexOf(menuGroup.name) >= 0){
          openKeys = menuGroup.name
          // if('scsd'== menuGroup.name){ // 由于scsd的评审页面路由与其真正的父级菜单路由不匹配，故都默认为函审路由
          //   selectedKeys = '/scsd/exam/scsdExam'
          // }else{
          for(let j=0;j<menuGroup.children.length;j++){
            const menuChild = menuGroup.children[j]
            if(toName.indexOf(menuChild.name)>=0){
              selectedKeys = menuChild.name
            }
          }
          // }
        }
      }
      return {
        // 当前需要展开的一级菜单的route.name
        openKeys    : openKeys,
        // 当前需要默认选中的二级菜单的route.name
        selectedKeys: selectedKeys
      }
    }
  },
  watch: {
    $route(to) {
      if (!to.name) return
      // if (this.defaultSelectedKeys.indexOf(to.name) < 0) {
      if (to.name.indexOf(this.defaultSelectedKeys[0]) < 0){
        // 当前路由不为选定路由或选定路由的子集，则清空设置
        // 遍历左侧菜单，找到to路由的父级
        const defaultMenuKeys = this.findDefaultMenuKeys(to.name)
        //没有找到，清空设置
        if(''==defaultMenuKeys.openKeys){
          this.defaultSelectedKeys = []
          this.defaultOpenKeys = []
        }else{
          //找到了，定位左侧菜单，并存储左侧菜单展开设置
          this.defaultOpenKeys = []
          this.defaultOpenKeys.push(defaultMenuKeys.openKeys)
          this.defaultSelectedKeys = []
          this.defaultSelectedKeys.push(defaultMenuKeys.selectedKeys)
        }
        this.$store.commit('SET_DEFAULTMENU_STATUS', {
          defaultSelectedKeys: this.defaultSelectedKeys,
          defaultOpenKeys    : this.defaultOpenKeys,
        })
      }else{
        // 否则就保存现有的菜单展开设置
        this.$store.commit('SET_DEFAULTMENU_STATUS', {
          defaultSelectedKeys: this.defaultSelectedKeys,
          defaultOpenKeys    : this.defaultOpenKeys,
        })
      }
    },
  },
}
</script>

<style>
.sideMenu {
  padding-top: 10px;
  height: 90%;
  overflow-y: auto;
  /* ie滚动条样式 */
  scrollbar-arrow-color: #00284e; /*三角箭头的颜色*/
  scrollbar-face-color: #00284e; /*立体滚动条的颜色（包括箭头部分的背景色）*/
  scrollbar-3dlight-color: #00284e; /*立体滚动条亮边的颜色*/
  scrollbar-highlight-color: #00284e; /*滚动条的高亮颜色（左阴影？）*/
  scrollbar-shadow-color: #00284e; /*立体滚动条阴影的颜色*/
  scrollbar-darkshadow-color: #00284e; /*立体滚动条外阴影的颜色*/
  scrollbar-track-color: #000c17; /*立体滚动条背景颜色*/
  scrollbar-base-color:#00284e; /*滚动条的基色*/
}
/* 设置滚动条的样式 */
.sideMenu::-webkit-scrollbar {
  width: 10px;
}
/* 滚动条滑块 */
.sideMenu::-webkit-scrollbar-thumb {
  background:#00284e;
}
</style>
