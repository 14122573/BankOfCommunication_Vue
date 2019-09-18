/**
 * 配置需注册子项目的mic名称
 * 参数说明：
 *  baseUrl：子项目部署服务后，公网路由域名
 *  resourceName：子项目注册进Portal后的独立资源空间名称
 *  micId：子项目打包部署时自行定义的名称
 *  pathPrefix：子项目路由base参数
 */

let MicConfig = []
switch (process.env.NODE_ENV) {
case 'devol': // 本地线上部署环境下
  MicConfig = [
    {
      baseUrl:'http://scsd.tao.com',
      resourceName:'scsd',
      micId:'mic:scsd',
      pathPrefix:'/scsd'
    },
    {
      baseUrl:'http://scylzc.tao.com', // 原良种验收
      resourceName:'scylzc',
      micId:'mic:scylzc',
      pathPrefix:'/scylzc'
    },
    {
      baseUrl:'http://ylzcre.tao.com', // 原良种复查
      resourceName:'ylzcre',
      micId:'mic:ylzcre',
      pathPrefix:'/ylzcre'
    }
  ]
  break
case 'sit': // sit环境下
  MicConfig = [
    {
      baseUrl:'http://scsd.omniview.pro',
      resourceName:'scsd',
      micId:'mic:scsd',
      pathPrefix:'/scsd'
    },
    // {
    //   baseUrl:'http://bbgl.omniview.pro',
    //   resourceName:'bbgl',
    //   micId:'mic:bbgl',
    //   pathPrefix:'/bbgl'
    // }
  ]
  break
case 'uat': // uat环境下
  MicConfig = [
    {
      baseUrl:'http://scsd.szjoin.net',
      resourceName:'scsd',
      micId:'mic:scsd',
      pathPrefix:'/scsd'
    }
  ]
  break
case 'production': // 生产环境下
  MicConfig = []
  break
default: // 默认环境下（开发环境）
  MicConfig = [
    {
      baseUrl:'http://scsd.tao.com',
      resourceName:'scsd',
      micId:'mic:scsd',
      pathPrefix:'/scsd'
    },
    {
      baseUrl:'http://scylzc.tao.com', // 原良种验收
      resourceName:'scylzc',
      micId:'mic:scylzc',
      pathPrefix:'/scylzc'
    },
    {
      baseUrl:'http://ylzcre.tao.com', // 原良种复查
      resourceName:'ylzcre',
      micId:'mic:ylzcre',
      pathPrefix:'/ylzcre'
    }
  ]
  break
};

export const MicConfigs = [
  ...MicConfig,
]
