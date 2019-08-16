import {registerApplication, start} from 'single-spa'
import axios from 'axios'
import fetchInject from 'fetch-inject';


(async function loadApp(){
  window.isSpa = true

  await registerApplication('layout', () => import('@/index.js'), () => true)

//   await loadResource('http://sub1.tao.com')
//   registerApplication('spaone', () => Promise.resolve(window['mic:spaone']),  pathPrefix('/spaone'))
// 
//   await loadResource('http://sub2.tao.com')
//   registerApplication('management', () => Promise.resolve(window['mic:management']),  pathPrefix('/management'))
})()


start()

async function loadResource(url) {
  const res = await axios.get(url + '/index.html')
  const html = res.data, base = url + '/static/',
    css = html.match(/css\/app.*?\.css/gi),
    manifest = html.match(/js\/manifest.*?\.js/gi),
    vendor = html.match(/js\/vendor.*?\.js/gi),
    app = html.match(/js\/app.*?\.js/gi)

  await fetchInject([ // 优先注入,避免‘call’ of undefined的错误
    base + manifest[0],
    base + vendor[0],
  ])
  await fetchInject([ // app.js需要在manifest和vendor之后注入
    base + app[0],
    base + css[0],
  ])
}

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.indexOf(`${prefix}`) == 0
  }
}
