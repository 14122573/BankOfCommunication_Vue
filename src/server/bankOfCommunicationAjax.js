import axios from 'axios'
import qs from 'qs'
import bankOfCommunicationApi from './bankOfCommunicationApi'
import Store from '@/store'
import Cookie from '@/util/local-cookie'
import router from '@/router'
import Common from '@/util/common'
import { Modal } from 'ant-design-vue'

// 配置请求的根域名和超时时间
const Axios = axios.create({
  baseURL: bankOfCommunicationApi.BASE_URL,
  timeout: 15000,
})
const CancelToken = axios.CancelToken
let cancelRequest = null
let currentRouterName ='', currentApi='', currentMethod=''

// 处理请求状态码
const reponseCodeHandler = (res) => {
  const code = res.data && res.data.code
  if ('string' == typeof code) {
    if (code == '200') {
      // 无逻辑
    } else if (code == '911') {
      const params = {
        grant_type   : 'refresh_token',
        client_id    : 'house',
        client_secret: 'house',
        refreshToken : Cookie.get('refresh_token'),
      }
      request({
        method     : 'POST',
        url        : bankOfCommunicationApi.REFRESH_TOKEN_POST,
        params,
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      }).then(res => {
        if (res.code === '200') {
          Common.setToken(res.data.content.access_token, res.data.content.refresh_token)
          router.go(0)
        } else if (res.code === '912') {
          Common.handleLogOut()
        } else {
          Common.handleLogOut()
        }
      })
    } else if (code == '900') {
      router.push({ name: 'noautherr' })
    } else if (code == '429') {//同一对外IP，2s内请求超过100次
      router.push({ name: 'upperLimitErr' })
    }else if (code == '710' || code == '720') {
      if(Common.oneOf(currentMethod.toLocaleLowerCase(), [ 'post', 'put', 'delete' ])){
        Modal.error({
          title     : '提交错误',
          content   : !res.data.msg?'':res.data.msg,
          okText    : '确认',
          cancelText: '取消',
        })
      }
    }else if (code == '912') {
      //在refresh token 里的返回里已做处理，这里不做额外提示
    }else{
      if(Common.oneOf(currentMethod.toLocaleLowerCase(), [ 'post', 'put', 'delete' ])){
        Modal.error({
          title     : '提交错误',
          content   : '系统异常',
          okText    : '确认',
          cancelText: '取消',
        })
      }
    }
  }
}

const showErrPage= (api, routername, code) => {
  if(Common.oneOf(routername, [ 'login', 'register', 'bindPhone', 'bindTemporarayAccount' ])){
    if(!Common.oneOf(api, [ '/service-release/release/public/news' ])){
      router.push({
        name: 'networkerr'
      })
    }
  }else if(!!routername && routername.length>0){
    router.push({
      name: 'innerNetworkerr'
    })
  }else{
    router.push({
      name: 'networkerr'
    })
  }
}

// 根据报错的状态码进行错误处理
const errorHandler = (err) => {
  const errStatus = (err.response && err.response.status) || (err.data && err.data.errcode)
  if (errStatus) {
    switch (errStatus) {
    case 404: // 网络请求不存在,跳转统一报错页面
      showErrPage(currentApi, currentRouterName)
      break

    /** 强说home页的请求报500就跳过去了，无法进行下一步操作，故此先注释掉 */
    // case 500:
    //   const code = err.response.data && err.response.data.code
    //   showErrPage(currentApi,currentRouterName)
    //   break
    default: // 其他错误，统一到网络异常页面
      showErrPage(currentApi, currentRouterName)
      break
    }

    /**超时了就跳转了且无法进行下一步操作，故此先注释掉 */
  // } else if (err.toString().indexOf('timeout') != -1) { // 统一到网络异常页面
  //   showErrPage(currentApi,currentRouterName)
  } else if (err.toString().indexOf('Network Error') != -1) { // 统一到网络异常页面
    showErrPage(currentApi, currentRouterName)
  }
}

Axios.interceptors.request.use(config => {
  const token = Cookie.get('token') || Store.state.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  reponseCodeHandler(response)
  return response.data
}, error => {
  errorHandler(error)
  return error.response
})

/**
 * 请求
 * @param {String} method [请求方法]
 * @param {String} url [请求地址]
 * @param {Object} params [请求参数]
 * @param {String} contentType [请求头，默认为'application/json;charset=UTF-8']
 * @param {Boolean} hideLoading [隐藏请求时的loading图，默认为false]
 */
const request = ({ method, url, params, contentType = 'application/json;charset=UTF-8', hideLoading = false, routername }) => {
  if (!url || typeof(url) != 'string') {
    throw new Error('接口URL不正确')
  }
  // 存储当前调用接口所在的路由和API地址
  currentApi = url
  currentRouterName = !routername?'':routername
  currentMethod = method

  // transformResponse()执行完再执行then()。transformResponse函数用于提前处理返回的数据。返回的result对象比transformResponse函数的data对象包含的数据多。
  // if (method == 'get') {
  //   let timestamp = Date.now()
  //   url = (url.indexOf('?') != -1) ? (url + '&timestamp=' + timestamp) : (url + '?timestamp=' + timestamp)
  //   url = encodeURI(url) //针对IE下地址传值带中文，对其转义
  // }

  if (!params || typeof(params) == 'string' || typeof(params) == 'number') {
    params = {}
  }
  let config = {
    method,
    url,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type'    : contentType,
    },
    cancelToken: new CancelToken((c) => {
      cancelRequest = c
    }),
  }
  config = Object.assign(config, { params })
  // if (method === 'GET') {
  //   config = Object.assign(config, { params })
  // } else {
  //   if (contentType.toLowerCase().indexOf('x-www-form-urlencoded') >= 0) {
  //     config = Object.assign(config, { data: qs.stringify(params) })
  //   } else {
  //     config = Object.assign(config, {  params })
  //   }
  // }
  if (!hideLoading) {
    Store.commit('SET_LOADING', true)
  }

  return new Promise((resolve, reject) => {
    Axios(config)
      .then(res => {
        resolve(res)
        Store.commit('SET_LOADING', false)
      }).catch(err => {
        reject(err)
        Store.commit('SET_LOADING', false)
      })
  })
}

export default {
  /**
     * 取消请求
     * @param {String} txt [取消请求时需要显示在控制台的提示信息]
     */
  cancel(txt = '取消请求') {
    Store.commit('SET_LOADING', false)
    if (typeof(cancelRequest) === 'function') {
      return cancelRequest(txt)
    }
  },
  get(args) {
    return request({ method: 'GET', ...args })
  },
  post(args) {
    return request({ method: 'POST', ...args })
  },
  put(args) {
    return request({ method: 'PUT', ...args })
  },
  delete(args) {
    return request({ method: 'DELETE', ...args })
  },
  all(...ajaxs) {
    return Promise.all(ajaxs)
  },
}