# 框架介绍

## 命令行说明
> 执行以下打包命令可分别打生产环境、SIT环境、UAT环境的包。

```zsh
npm run build
npm run build:sit
npm run build:uat
```

> 执行以下命令可以检查、并自动修复一些代码格式错误，如空格、分号等，以保持代码格式统一。同时我加入了指令，会在commit到git时自动执行此命令。相关代码规则可在[.eslintrc.js](./.eslintrc.js)中配置。

```zsh
npm run lint
```

## [Ant Design Vue](https://vue.ant.design/docs/vue/introduce/) 说明
> 使用ant design vue框架中的组件时，需要在[/src/main.js](/src/main.js)中手动地import和use。这看起来有点麻烦，但其实避免了import了整个包却只使用了部分组件造成的打包体积过大和性能的浪费。

```javascript
/*main.js中*/
/** 省略 **/
import {
  Button,
  Card,
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Card)
/** 省略 **/
```

```html
<!-- 使用 -->
<a-card>
  <h1>Example</h1>
  <a-button type="primary">Btn1</a-button>
  <a-button type="dashed">Btn2</a-button>
  <a-button type="danger">Btn3</a-button>
</a-card>
```


## 封装方法说明

- ## this.$cookie
> 封装了js-cookie方法，用于判断electron状态下使用localstorage替换js-cookie。

```javascript
this.$cookie.set('cookieName', 'cookieData')
this.$cookie.get('cookieName')
this.$cookie.remove('cookieName')
```

- ## this.$api
> 请求的api集合，可自动根据不同的环境（即process.env.NODE_ENV）切换对应的请求根地址。详情可查看[/src/server/ajax.js](/src/server/api.js)

- ## this.$ajax
> 将axios进行二次封装的请求方法。详细信息可查看[/src/server/ajax.js](/src/server/ajax.js)

```javascript
/**
 * @param {Object} args [请求的参数，包含如下]
 * @param {String} url [请求地址]
 * @param {Object} params [请求参数]
 * @param {String} contentType [请求头，默认为'application/json;charset=UTF-8']
 * @param {Boolean} hideLoading [隐藏请求时的loading图，默认为false]
 */
this.$ajax.get(args)
this.$ajax.post(args)
this.$ajax.put(args)
this.$ajax.delete(args)

//示例
this.$ajax.post({
  url: this.$api.GET_TOKEN,
  params: {
    userName: 'test',
  },
  contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
}).then(res => {
  this.$cookie.set('token', res.access_token)
  this.$cookie.set('refresh_token', res.refresh_token)
})
```

- ## this.$com
> 公共方法，详细方法见文件[/src/util/common.js](/src/util/common.js)的方法注释。

- ## this.$permission
> 传入权限编码，判断权限的方法。也可以使用v-permission自定义指令。详情见[/src/util/permission-control.js](/src/util/permission-control.js)和[/src/util/permission-filter.js](/src/util/permission-filter.js)

```html
<div v-if="$permission('code')">测试</div>
<div v-permission="'code'">测试</div>
```
> 请求、获取、判断权限编码列表，并据此设置权限菜单详见文件[/src/util/mixins.js](/src/util/mixins.js)。当登录或者刷新页面时都会调用此文件中的方法。
