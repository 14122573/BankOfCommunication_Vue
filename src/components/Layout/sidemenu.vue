<template>
  <a-menu  :mode="menuMode" theme="dark" style="text-align:left;">
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
          this.$router.push({name: menu.name})
          let href = menu.meta.outsiteLink
          window.open(href, '_blank')
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
