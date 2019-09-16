/**
 * 配置需注册子项目的mic名称
 * 参数说明：
 *  baseUrl：子项目部署服务后，公网路由域名
 *  resourceName：子项目注册进Portal后的独立资源空间名称
 *  micId：子项目打包部署时自行定义的名称
 *  pathPrefix：子项目路由base参数
 */

let expertReviewRouter = {
  'S0501':[
    {
      reviewTypeCode:'',
      routerName:'/scsd/post/scsdPost/view',
      authCode: 'S050104',
      title:'函审信息'
    },
    {
      reviewTypeCode:'',
      routerName:'/scsd/post/scsdPost/view',
      authCode: 'S050105',
      title:'现场审定专家意见'
    },
  ]
}


export const ExpertReviewRouters = {
  ...expertReviewRouter,
}

