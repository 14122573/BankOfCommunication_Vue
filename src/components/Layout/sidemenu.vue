<template>
  <a-menu :mode="menuMode" @openChange="onOpenChange" :openKeys="defaultOpenKeys" v-model="defaultSelectedKeys" class="sideMenu" theme="dark" style="text-align:left;">
    <template v-for="menu in menus">
      <template v-if="menu.children && menu.children.length > 0">
        <a-sub-menu :key="menu.name">
          <span slot="title">
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
              <span>{{child.meta.title}}</span>
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
          <span>{{menu.meta.title}}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script>
import {navigateToUrl} from 'single-spa'
import common from '@/util/common'
import { OutsideUrls } from '@/config/outside-config'
export default {
  name: 'SideMenu',
  props: {
    menuMode:{
      type: String,
      required: true,
      validator (value) {
        return common.oneOf(value, ['inline', 'vertical'])
      }
    }
  },
  data(){
    return{
      userInfo:null,
      openKeys: [],
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
    }
  },
  created() {
    const {defaultSelectedKeys, defaultOpenKeys} = this.$store.state.defaultMenuStatus
    this.defaultSelectedKeys = defaultSelectedKeys || []
    this.defaultOpenKeys = (defaultOpenKeys.length <= 0 || !defaultOpenKeys[0]) ? [] : defaultOpenKeys
  },
  computed: {
    menus() {
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
      if('string' == typeof OutsideUrls[sysCode] && OutsideUrls[sysCode] !=''){
        redirctUrl = OutsideUrls[sysCode]+'?userId='+userId+'&accessToken='+this.$cookie.get('token')+'&refreshToken='+this.$cookie.get('refresh_token')
      }
      return redirctUrl==''?false:redirctUrl
    },
    /**
     * 根据菜单打开方式，做不同动作
     * @param {Object} menu 菜单的route对象
     *
     */
    navigateTo({item, key},menu) {
      if(menu.meta){
        let openMode = menu.meta.openMode?menu.meta.openMode:'normal'
        switch (openMode) {
        case 'outsite':
          if(!this.$cookie.get('token')){
            this.$com.handleLogOut()
          }else{
            let href = this.getRedirctUrl(key)
            if(href) {
              this.$router.push({
                name: menu.name,
                params: {
                  sysname: menu.meta.title
                }})
              window.open(href, '_blank')
            }else{
              this.$router.push({name: 'noautherr'})
            }
          }
          break
        case 'normal':
          this.$router.push({name: menu.name})
          break
        case 'spa':
          navigateToUrl(key)
          break
        default:
          this.$router.push({name: menu.name})
          break
        }
      }else{
        this.$router.push({name: menu.name})
      }
    },
    // 点击菜单，收起其他展开的所有菜单
    onOpenChange (openKeys) {
      const menuKeys = this.menus.map(item => item.name)
      const latestOpenKey = openKeys.find(key => this.defaultOpenKeys.indexOf(key) === -1)
      if (menuKeys.indexOf(latestOpenKey) === -1) {
        this.defaultOpenKeys = openKeys
      } else {
        this.defaultOpenKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
  },
  watch: {
    $route(to) {
      if (!to.name) return
      // if (this.defaultSelectedKeys.indexOf(to.name) < 0) {
      if (to.name.indexOf(this.defaultSelectedKeys[0]) < 0){ // 当当前路由不为选定路由或选定路由的子集，则清空设置
        this.defaultSelectedKeys = []
        this.defaultOpenKeys = []
        this.$store.commit('SET_DEFAULTMENU_STATUS', {
          defaultSelectedKeys: [],
          defaultOpenKeys: [],
        })
      }else{ // 否则就保存现有的菜单展开设置
        this.$store.commit('SET_DEFAULTMENU_STATUS', {
          defaultSelectedKeys: this.defaultSelectedKeys,
          defaultOpenKeys: this.defaultOpenKeys,
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
}
</style>
