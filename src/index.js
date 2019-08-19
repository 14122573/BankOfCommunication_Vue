// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// import App from './App'
import App from '@/components/Layout/main'

import router from './router'
import store from './store'
import ajax from './server/ajax'
import api from './server/api'
import cookie from './util/local-cookie'
import common from './util/common'
import PermissionControl from './util/permission-control.js' // 权限自定义指令 v-permission="code"
import { PermissionFilter } from './util/permission-filter.js' // 权限全局方法 v-if="$permission('code')"
import {
  Button,
  message,
  Spin,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Form,
  Input,
  Card,
  Dropdown,
  Row,
  Col,
  Checkbox,
  Select,
  Alert
} from 'ant-design-vue'

import singleSpaVue from 'single-spa-vue'

Vue.use(Button)
Vue.use(Spin)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Form)
Vue.use(Input)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Alert)
Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.prototype.$api = api
Vue.prototype.$cookie = cookie
Vue.prototype.$com = common
Vue.prototype.$permission = PermissionFilter
Vue.prototype.$message = message
Vue.prototype.$store = store

Vue.config.productionTip = false
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#portal',
    router,
    store,
    render: h => h('div', {
      attrs: { id: 'Layout' }
    }, [h(App)]),
  },
})

export const bootstrap = [
  vueLifecycles.bootstrap,
]

export const mount = [
  vueLifecycles.mount,
]

export const unmount = [
  vueLifecycles.unmount,
]