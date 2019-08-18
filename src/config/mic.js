/**
 * 配置需注册子项目的mic名称
 * 参数说明：
 *  baseUrl：子项目部署服务后，公网路由域名
 *  resourceName：子项目注册进Portal后的独立资源空间名称
 *  micId：子项目打包部署时自行定义的名称
 *  pathPrefix：子项目路由base参数
 */
const MicConfig = [
  // {
  //   baseUrl:'http://sub1.tao.com',
  //   resourceName:'spaone',
  //   micId:'mic:spaone',
  //   pathPrefix:'/spaone'
  // },
  // {
  //   baseUrl:'http://sub2.tao.com',
  //   resourceName:'management',
  //   micId:'mic:management',
  //   pathPrefix:'/management'
  // },
  {
    baseUrl:'http://scsd.tao.com',
    resourceName:'scsd',
    micId:'mic:scsd',
    pathPrefix:'/scsd'
  }
]
export const MicConfigs = [
  ...MicConfig,
]
