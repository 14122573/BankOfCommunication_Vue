// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import cookie from './util/local-cookie'
import common from './util/common'
import ajax from '@/server/ajax'
import api from '@/server/api'
import { registerMicroApps, start } from 'qiankun'
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
  InputNumber,
  Card,
  Dropdown,
  Row,
  Col,
  Checkbox,
  Select,
  Alert,
  Table,
  Divider,
  Upload,
  Modal,
  badge,
  Tree,
  Tabs,
  DatePicker,
  skeleton,
  pagination,
  Tag,
  Badge,
  TreeSelect,
  Radio,
  Cascader,
  LocaleProvider,
  Steps,
  Anchor,
  Collapse,
  Popconfirm,
  Progress,
  Switch,
  Calendar,
  BackTop,
  Carousel,
  Tooltip,
  List
} from 'ant-design-vue'
import './assets/base.css' // 引入全局样式
import './assets/reset-ant.css' // 重置ant-design样式
import ActiveForm from '@/components/ActiveForm'
import ActiveTable from '@/components/ActiveTable'

// 由于日期组件默认是英文的，需要本地化
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.prototype.$ajax = ajax
Vue.prototype.$api = api
Vue.prototype.$cookie = cookie
Vue.prototype.$com = common
Vue.prototype.$message = message
Vue.prototype.$store = store
Vue.prototype.$permission = PermissionFilter
Vue.prototype.$moment = moment
Vue.prototype.$modal = Modal

Vue.use(ActiveForm)
Vue.use(ActiveTable)
Vue.use(Button)
Vue.use(Spin)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Form)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Alert)
Vue.use(Table)
Vue.use(Divider)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(badge)
Vue.use(skeleton)
Vue.use(Tree)
Vue.use(Tabs)
Vue.use(DatePicker)
Vue.use(pagination)
Vue.use(Tag)
Vue.use(Badge)
Vue.use(TreeSelect)
Vue.use(Radio)
Vue.use(Cascader)
Vue.use(LocaleProvider)
Vue.use(Steps)
Vue.use(Anchor)
Vue.use(Collapse)
Vue.use(Popconfirm)
Vue.use(Progress)
Vue.use(Switch)
Vue.use(Calendar)
Vue.use(BackTop)
Vue.use(Carousel)
Vue.use(Tooltip)
Vue.use(List)
Vue.config.productionTip = false

import RouterWapper from '@/components/Layout/content-wrapper'
import DetailsItem from '@/components/detail/detailItem'
import DetailsFile from '@/components/detail/detailFile'
Vue.component('RouterWapper', RouterWapper)
Vue.component('DetailsItem', DetailsItem)
Vue.component('DetailsFile', DetailsFile)

/* eslint-disable no-new */

import Axios from 'axios'
import TipsOutsite from '@/views/tips/outsite'
let app = null
const checkPrefix = prefix => {
  // 检查路径前缀
  return location => location.pathname.startsWith(prefix)
}
const render = async ({ appContent, loading } = {}) => {
  // 渲染方法
  if (!app) {
    const MicRouters = require('@/router/micRouter.json')
    // let MicRouters = (await Axios.get(api.CONFIGS_MICSYSTEMS_ROUTERS)).data
    let micSystemRoutersConfigs = Object.assign({}, MicRouters)

    for (let key in micSystemRoutersConfigs) {
      for (let i = 0; i < micSystemRoutersConfigs[key].length; i++) {
        let firstRouter = Object.assign({}, micSystemRoutersConfigs[key][i])
        if (
          !!firstRouter.meta.openMode &&
          firstRouter.meta.openMode == 'outsite'
        ) {
          firstRouter['component'] = TipsOutsite
        }
        const { routes } = router.options
        const parent = routes.find(item => item.name === 'Layout')
        parent.children.push(Object.assign({}, firstRouter))
        router.addRoutes([ parent ])
      }
    }

    app = new Vue({
      el: '#portal',
      store,
      router,
      data() {
        return {
          content: appContent,
          loading
        }
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading
          }
        })
      }
    })
  } else {
    app.content = appContent
    app.loading = loading
  }
}

;(async function loadMicsystem() {
  let MicRouters = (await Axios.get(api.CONFIGS_MICSYSTEMS_LIST)).data
  let system = Object.assign({}, MicRouters)

  let projects = []
  for (let i = 0; i < system.sit.length; i++) {
    if (system.sit[i].name != 'zlzs') {
      projects.push({
        name      : system.sit[i].name,
        entry     : system.sit[i].entry,
        render,
        activeRule: checkPrefix(system.sit[i].activeRule)
      })
    }
  }
  registerMicroApps(projects) // 注册子项目

  render()

  start()
})()
