<template>
  <div class="header">
    <a-breadcrumb>
      <template v-for="(item,index) in list">
        <!-- <a-breadcrumb-item :key="index">
            <router-link v-if="checkPath(item.path)" class="navlink" :to="item.path">{{item.title}}</router-link>
            <span v-else>{{item.title}}</span>
        </a-breadcrumb-item> -->
        <a-breadcrumb-item :key="index">
          <template v-if="!item.hideBread">
            <router-link v-if="item.showBreadPath" class="navlink" :to="item.path">{{item.title}}</router-link>
            <span v-else>{{item.title}}</span>
          </template>
        </a-breadcrumb-item>
      </template>

    </a-breadcrumb>
  </div>
</template>

<script>
// 不够严谨，临时制造，需要改进

import {checkHideInBread} from '@/util/mixins'
export default {
  name: 'NavBar',
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    if(this.$cookie.get('NavbarList') && this.$cookie.get('NavbarList').length>0){
      let list= this.$cookie.get('NavbarList')
      this.list = JSON.parse(list)
    }else{
      this.list = [{title: '首页',routerName:'home', path: '/home'}]
    }
    this.list.forEach((element)=>{
      this.checkPath(element)
    })
    // console.log(this.list)
  },
  methods: {
    checkPath2(path) {
      return this.list[0].path === path
    },
    /**
     * @param {Object} navItem 当前展示路由的完整父子级中的一个路由节点
     * @returns {Object} hideBread 是否隐藏在面包屑中，true为隐藏
     *                    showBreadPath 是否在面包屑展中可点击跳转，true为可点击
     */
    checkPath(navItem) {
      let hideBread=false, showBreadPath = true
      // console.log(navItem)
      if(this.$route.path === navItem.path){
        // 面包屑中的路径与当前路由一致时，无法点击,但要显示在面包屑中
        navItem.hideBread = false
        navItem.showBreadPath = false
      }else{
        if('/home' === navItem.path || '/' === navItem.path){
          // 默认面包屑中的“首页”都是可以点击的
          navItem.hideBread = false
          navItem.showBreadPath = true
        }else{
          navItem.hideBread = checkHideInBread(navItem.routerName)
          navItem.showBreadPath = hideBread ? false:true
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      let navList = []
      if(to && to.matched && Array.isArray(to.matched)){
        to.matched.forEach((element,index) => {
          if(0===index){
            if (element.path.indexOf('/')>=0) {
              if('/'===element.path || '/home'===element.path){
                navList.push({
                  title: element.meta.title,
                  routerName:element.name,
                  path: element.path
                })
              }else{
                navList.push({ title: '首页', routerName:'home', path: '/home' })
                navList.push({
                  title: element.meta.title,
                  routerName:element.name,
                  path: element.path
                })
              }
            }else{
              navList.push({ title: '首页', routerName:'home', path: '/home' })
            }
          }else {
            if('/'!=element.path && ''!=element.path && '/home'!=element.path){
              navList.push({
                title: element.meta.title,
                routerName:element.name,
                path: element.path
              })
            }
          }
        })
      }else {
        navList = [{title: '首页', path: '/'}]
      }
      this.list =  navList
      this.list.forEach((element)=>{
        this.checkPath(element)
      })
      const NavbarList = JSON.stringify(this.list)
      this.$cookie.set('NavbarList', NavbarList)

    }
  },
}
</script>


