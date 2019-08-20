<template>
  <a-menu :mode="menuMode" theme="dark" style="text-align:left;">
    <template v-for="menu in menus">
      <template v-if="menu.children && menu.children.length > 0">
      <a-sub-menu :key="menu.name">
        <span slot="title">
          <template v-if="menu.meta.menuIcon">
            <a-icon :type="menu.meta.menuIcon" />
          </template>
          <span>{{menu.meta.title}}</span>
        </span>
        <template v-for="child in menu.children">
          <a-menu-item :key="child.name" @click="({item, key}) => {navigateTo({item, key},child)}">
            <template v-if="child.meta.menuIcon">
              <a-icon :type="child.meta.menuIcon" />
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
          <span>{{menu.meta.title}}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script>
// import {permission} from '@/util/mixins'
import {navigateToUrl} from 'single-spa'
import common from '@/util/common'
import { OutsideUrls } from '@/config/outside-config'
export default {
  name: 'SideMenu',
  // mixins: [permission],
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
      userInfo:null
    }
  },
  created() {

  },
  computed: {
    menus() {
      return this.$store.state.menuList
    }
  },
  methods: {
    isSpaMenu(menu){
      return 'spa'===menu.meta.openMode?true:false
    },
    /**
     * 组装需要跳转的外部地址
     * @param {String} sysCode 当前点击的外部系统的系统code
     * @returns false 代表没有找到；
     */
    getRedirctUrl(sysCode){
      if(!sysCode) return false

      this.userInfo = (this.userInfo==null) ? JSON.parse(this.$cookie.get('userInfo')) : this.userInfo
      let userId = ''
      if(Array.isArray(this.userInfo.oldAccountSet) && this.userInfo.oldAccountSet.length>0){
        this.userInfo.oldAccountSet.forEach(element => {
          if(element.sysDic && element.sysDic.sysCode ){
            userId = (element.sysDic.sysCode===sysCode)?element.userId:this.userInfo.id
          }
        })
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
          this.$store.commit('SET_SHOWSPACONTENT', false)
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
          break
        case 'normal':
          this.$store.commit('SET_SHOWSPACONTENT', false)
          this.$router.push({name: menu.name})
          break
        case 'spa':
          this.$store.commit('SET_SHOWSPACONTENT', true)
          navigateToUrl(key)
          break
        default:
          this.$store.commit('SET_SHOWSPACONTENT', false)
          this.$router.push({name: menu.name})
          break
        }
      }else{
        this.$store.commit('SET_SHOWSPACONTENT', false)
        this.$router.push({name: menu.name})
      }
    },

  }
}
</script>

<style>

</style>
