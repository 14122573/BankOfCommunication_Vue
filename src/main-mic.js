import {registerApplication, start} from 'single-spa'
import axios from 'axios'
import fetchInject from 'fetch-inject'
import { MicConfigs } from '@/config/mic'


(async function loadApp(){
  window.isSpa = true

  await registerApplication('layout', () => import('@/index.js'), () => true)

  // 读取子项目配置
  for(let i=0;i<MicConfigs.length;i++){
    // await loadResource(MicConfigs[i].baseUrl)
    // registerApplication(MicConfigs[i].resourceName, () => Promise.resolve(window[MicConfigs[i].micId]),  pathPrefix(MicConfigs[i].pathPrefix))
  }

})()


start()

async function loadResource(url) {
  const res = await axios.get(url + '/index.html')

  // 获取所有js、css、网站图标
  const html = res.data, base = url + '/static/',
    css = html.match(/css\/app.*?\.css/gi),
    manifest = html.match(/js\/manifest.*?\.js/gi),
    vendor = html.match(/js\/vendor.*?\.js/gi),
    app = html.match(/js\/app.*?\.js/gi),
    ico = html.match(/[a-z]*?\.ico/gi)

  // 从css文件中获取所有字体文件、背景图片
  // const cssRes = await axios.get(base + css[0])
  // const cssContent = cssRes.data,
  //   font = cssContent.match(/fonts\/ionicons.[a-z0-9]*\.(ttf|woff)/gi),
  //   svg = cssContent.match(/img\/ionicons.[a-z0-9]*?\.svg/gi),
  //   img = cssContent.match(/img\/[a-z0-9\.]*?\.(png|jpg|gif|jpeg)/gi)

  // console.log(url,font,svg,img,ico)
  // 优先注入,避免‘call’ of undefined的错误
  await fetchInject([
    base + manifest[0],
    base + vendor[0],
  ])

  // app.js需要在manifest和vendor之后注入
  await fetchInject([
    base + app[0],
    base + css[0],
  ])
}

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.indexOf(`${prefix}`) == 0
  }
}
