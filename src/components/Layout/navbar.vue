<template>
  <div class="header">
    <a-breadcrumb>
      <template v-for="(item,index) in list">
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
import {routes} from '@/router/routes'
export default {
  name: 'NavBar',
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    const list = this.$cookie.get('NavbarList')
    if(list && list.length>0){
      this.list = JSON.parse(list)
    }else{
      this.list = [{title: '首页',routerName:'home', path: '/home'}]
    }
    this.list.forEach((element)=>{
      this.checkPath(element)
    })
    this.getRoutes()
  },
  methods: {
    /**
     * @param {Object} navItem 当前展示路由的完整父子级中的一个路由节点
     * @returns {Object} hideBread 是否隐藏在面包屑中，true为隐藏
     *                    showBreadPath 是否在面包屑展中可点击跳转，true为可点击
     */
    checkPath(navItem) {
      let hideBread=false, showBreadPath = true
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
    },
    getRoutes() {
      const layoutRoutes = routes.find(route => route.name == 'Layout')
      let list = []
      layoutRoutes.children.forEach(parent => {
        if (parent.children && parent.children.length > 0) {
          parent.children.forEach(child => {
            list.push(child)
          })
        }
      })
      this.routeList = list
    }
  },
  watch: {
    $route(to, from) {
      let navList = []
      if(to && to.matched && Array.isArray(to.matched)){
        if (!to.name) {
          const parentRoute = this.routeList.find(item => to.path.startsWith(item.path))
          navList.push({ title: '首页', routerName:'home', path: '/home' })
          navList.push({ title: parentRoute.meta.title, routerName: parentRoute.name, path: parentRoute.path })
          // navList.push({ title: '详情', path: to.path })
        }
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
      } else {
        navList = [{title: '首页', path: '/'}]
      }
      navList.forEach((element)=>{
        this.checkPath(element)
      })
      this.list = navList
      this.$cookie.set('NavbarList', JSON.stringify(navList))
    }
  },
}
</script>


