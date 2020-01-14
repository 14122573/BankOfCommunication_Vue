/**
 * 判断store中是否存在子项目资源，不存在则远程调用接口存入store
 */

import axios from 'axios'
import API from '@/server/api'
import Common from '@/util/common'
import store from '@/store'

if(!store.state.micSystemResourceConfig){
  const newInstance = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {'Content-type': 'multipart/form-data'}
  })

  newInstance.get(API.CONFIGS_MICSYSTEMS_LIST).then(res => {
    if(res.status == 200){
      // 获取成功，存储配置文件结果
      let micSystemRecourceConfig = Common.confirm(res, 'data', {})
      // let micSystemRecourceConfig = AllMicSystemsList[process.env.NODE_ENV=='development'?'sit':process.env.NODE_ENV]
      store.commit('SET_MICSYSTEMS_RESOURCE_CONFIG', micSystemRecourceConfig)
    }
  })
}

