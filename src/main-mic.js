import 'babel-polyfill'
import {registerApplication, start} from 'single-spa'
import axios from 'axios'
import API from '@/server/api'
import Common from '@/util/common'
// import fetchInject from 'fetch-inject'
// import { MicConfigs } from '@/config/mic'
// import com from '@/util/common'
import store from './store'

(async function loadApp(){

  window.isSpa = true
  await registerApplication('layout', () => import('@/index.js'), () => true)
  window.onload = async () => {
    // let progress = 0
    // store.commit('SET_LOADING_PROGRESS', {progress, len: MicConfigs.length})
    const newInstance = axios.create({
      baseURL: '',
      timeout: 5000,
      headers: {'Content-type': 'multipart/form-data'}
    })
    newInstance.get(API.CONFIGS_MICSYSTEMS_LIST).then(res => {
      if(res.status == 200){
        // 获取成功，存储配置文件结果
        let AllMicSystemsList = Common.confirm(res, 'data', {})
        let MicSystemsList = AllMicSystemsList[process.env.NODE_ENV=='development'?'sit':process.env.NODE_ENV]

        // 当页面加载好了，有了#content元素后才加载子项目，避免刷新后空白的问题
        let progress = 0
        store.commit('SET_LOADING_PROGRESS', {progress, len: MicSystemsList.length})
        // 循环已接入子系统配置
        for(let i=0;i<MicSystemsList.length;i++){
          // 读取子项目配置
          Promise.resolve(loadResource(MicSystemsList[i].baseUrl)).then(() => {
            registerApplication(MicSystemsList[i].resourceName, () => Promise.resolve(window[MicSystemsList[i].micId]),  pathPrefix(MicSystemsList[i].pathPrefix))
            store.commit('SET_LOADING_PROGRESS', {progress: progress += 1, len: MicSystemsList.length})
          }).catch(() => {
            store.commit('SET_LOADING_PROGRESS', {progress: progress += 1, len: MicSystemsList.length})
          })
        }
      }
    })

  }
  start()
})()

async function loadResource(url) {
  const res = await axios.get(url + '/index.html')
  // 获取所有js、css、网站图标
  const html = res.data, base = url + '/static/',
    css = html.match(/css\/app.*?\.css/gi),
    manifest = html.match(/js\/manifest.*?\.js/gi),
    vendor = html.match(/js\/vendor.*?\.js/gi),
    app = html.match(/js\/app.*?\.js/gi),
    ico = html.match(/[a-z]*?\.ico/gi)


  const frag = document.createDocumentFragment()
  const a = document.createElement('script')
  a.innerHTML = (await axios.get(base + manifest[0])).data
  frag.appendChild(a)
  const b = document.createElement('script')
  b.innerHTML = (await axios.get(base + vendor[0])).data
  frag.appendChild(b)
  const c = document.createElement('script')
  c.innerHTML = (await axios.get(base + app[0])).data
  frag.appendChild(c)
  const d = document.createElement('style')
  d.innerHTML = (await axios.get(base + css[0])).data
  frag.appendChild(d)
  document.head.appendChild(frag)

  // 从css文件中获取所有字体文件、背景图片
  // const cssRes = await axios.get(base + css[0])
  // const cssContent = cssRes.data,
  //   font = cssContent.match(/fonts\/ionicons.[a-z0-9]*\.(ttf|woff)/gi),
  //   svg = cssContent.match(/img\/ionicons.[a-z0-9]*?\.svg/gi),
  //   img = cssContent.match(/img\/[a-z0-9\.]*?\.(png|jpg|gif|jpeg)/gi)
  // console.log(url,font,svg,img,ico)

  // let a = document.createElement('script')
  // a.innerHTML = (await axios.get(base + manifest[0])).data
  // document.head.appendChild(a)
  // let b = document.createElement('script')
  // b.innerHTML = (await axios.get(base + vendor[0])).data
  // document.head.appendChild(b)
  // let c = document.createElement('script')
  // c.innerHTML = (await axios.get(base + app[0])).data
  // document.head.appendChild(c)
  // let d = document.createElement('style')
  // d.innerHTML = (await axios.get(base + css[0])).data
  // document.head.appendChild(d)

  // if (com.IEVersion() == -1) { // 非ie浏览器
  //   // 优先注入,避免‘call’ of undefined的错误
  //   await fetchInject([
  //     base + manifest[0],
  //     base + vendor[0],
  //   ])
  //   // app.js需要在manifest和vendor之后注入
  //   await fetchInject([
  //     base + app[0],
  //     base + css[0],
  //   ])
  // } else { // ie环境
  //   let a = document.createElement('script')
  //   a.innerHTML = (await axios.get(base + manifest[0])).data
  //   document.head.appendChild(a)
  //   let b = document.createElement('script')
  //   b.innerHTML = (await axios.get(base + vendor[0])).data
  //   document.head.appendChild(b)
  //   let c = document.createElement('script')
  //   c.innerHTML = (await axios.get(base + app[0])).data
  //   document.head.appendChild(c)
  //   let d = document.createElement('style')
  //   d.innerHTML = (await axios.get(base + css[0])).data
  //   document.head.appendChild(d)
  // }
}

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.indexOf(`${prefix}`) == 0
  }
}
