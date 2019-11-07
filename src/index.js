// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
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
  // CollapsePanel
} from 'ant-design-vue'
import './assets/base.css' // 引入全局样式
import './assets/reset-ant.css' // 重置ant-design样式
import ActiveForm from '@/components/ActiveForm'
import ActiveTable from '@/components/ActiveTable'
import singleSpaVue from 'single-spa-vue'

// 由于日期组件默认是英文的，需要本地化
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
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
// Vue.use(Collapse-panel)

import RouterWapper from '@/components/Layout/content-wrapper'
import DetailsItem from '@/components/detail/detailItem'
import DetailsFile from '@/components/detail/detailFile'
Vue.component('RouterWapper', RouterWapper)
Vue.component('DetailsItem', DetailsItem)
Vue.component('DetailsFile', DetailsFile)

Vue.prototype.$ajax = ajax
Vue.prototype.$api = api
Vue.prototype.$cookie = cookie
Vue.prototype.$com = common
Vue.prototype.$permission = PermissionFilter
Vue.prototype.$message = message
Vue.prototype.$modal = Modal
Vue.prototype.$store = store
Vue.prototype.$moment = moment
// Vue.prototype.$moment.locale('zh-cn')

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
