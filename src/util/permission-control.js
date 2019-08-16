import Vue from 'vue'
import {PermissionFilter} from './permission-filter'

const PermissionControl = Vue.directive('permission', {
  bind: function (el, binding, vnode) { // 对于没有权限的按钮在虚拟DOM阶段将其注释掉，不渲染出来
    if (!PermissionFilter(binding.value, vnode)) {
      const comment = document.createComment(' ')
      Object.defineProperty(comment, 'setAttribute', {
        value: () => undefined,
      })
      vnode.elm = comment
      vnode.text = ' '
      vnode.isComment = true
      vnode.context = undefined
      vnode.tag = undefined
      vnode.data.directives = undefined

      if (vnode.componentInstance) {
        vnode.componentInstance.$el = comment
      }
      if (el.parentNode) {
        el.parentNode.replaceChild(comment, el)
      }
    }
  }
})

export default PermissionControl
