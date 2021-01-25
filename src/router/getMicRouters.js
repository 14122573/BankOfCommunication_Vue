import Axios from 'axios'
import TipsOutsite from '@/views/tips/outsite'
import api from '@/server/api'
// import dataJson from './micRouters1.json'
async function GetRoutes(router) {
  // const MicRouters = require('@/router/micRouter.json')
  const rv = Math.floor(Math.random() * Math.random() * 10000)
  const MicRouters = (
    await Axios.get(api.CONFIGS_MICSYSTEMS_ROUTERS + '?v=' + rv)
  ).data
  const micSystemRoutersConfigs = Object.assign({}, MicRouters)
  const { routes } = router.options
  const parent = routes.find(item => item.name === 'Layout')
  for (let key in micSystemRoutersConfigs) {
    for (let i = 0; i < micSystemRoutersConfigs[key].length; i++) {
      let firstRouter = Object.assign({}, micSystemRoutersConfigs[key][i])
      if (
        !!firstRouter.meta.openMode &&
        firstRouter.meta.openMode == 'outsite'
      ) {
        firstRouter['component'] = TipsOutsite
      }
      parent.children.push(Object.assign({}, firstRouter))
      router.addRoutes([ parent ])
    }
  }
}

export default GetRoutes
