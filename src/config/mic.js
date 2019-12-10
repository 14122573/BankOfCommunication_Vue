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
      baseUrl: 'http://scsd.tao.com',
      resourceName: 'scsd',
      micId: 'mic:scsd',
      pathPrefix: '/scsd'
    },
    {
      baseUrl: 'http://txc.tao.com', // 科普基地
      resourceName: 'kpjd',
      micId: 'mic:kpjd',
      pathPrefix: '/kpjd'
    },
    {
      baseUrl: 'http://scylzc.tao.com', // 原良种验收
      resourceName: 'scylzc',
      micId: 'mic:scylzc',
      pathPrefix: '/scylzc'
    },
    {
      baseUrl: 'http://ylzcre.tao.com', // 原良种复查
      resourceName: 'ylzcre',
      micId: 'mic:ylzcre',
      pathPrefix: '/ylzcre'
    },
    {
      baseUrl: 'http://yysygl.tao.com',// 渔业兽医
      resourceName: 'yysygl',
      micId: 'mic:yysygl',
      pathPrefix: '/yysygl'
    },
    {
      baseUrl: 'http://fljps.tao.com',// 范蠡奖
      resourceName: 'fljps',
      micId: 'mic:fljps',
      pathPrefix: '/fljps'
    }
  ]
  break
case 'sit': // sit环境下
  MicConfig = [{
    baseUrl: 'http://scsd.omniview.pro', //新品种
    resourceName: 'scsd',
    micId: 'mic:scsd',
    pathPrefix: '/scsd'
  },
  {
    baseUrl: 'http://scylzc.omniview.pro', //原良种验收
    resourceName: 'scylzc',
    micId: 'mic:scylzc',
    pathPrefix: '/scylzc'
  },
  {
    baseUrl: 'http://ylzcre.omniview.pro', //原良种复查
    resourceName: 'ylzcre',
    micId: 'mic:ylzcre',
    pathPrefix: '/ylzcre'
  },
  {
    baseUrl: 'http://bbgl.omniview.pro', //智慧报表
    resourceName: 'bbgl',
    micId: 'mic:bbgl',
    pathPrefix: '/bbgl'
  },
  {
    baseUrl: 'http://zlzs.omniview.pro', //质量安全追述
    resourceName: 'zlzs',
    micId: 'mic:zlzs',
    pathPrefix: '/zlzs'
  },
  {
    baseUrl: 'http://yysygl.omniview.pro', //智慧报表
    resourceName: 'yysygl',
    micId: 'mic:yysygl',
    pathPrefix: '/yysygl'
  },
  {
    baseUrl: 'http://kpjd.omniview.pro', // 科普基地
    resourceName: 'kpjd',
    micId: 'mic:kpjd',
    pathPrefix: '/kpjd'
  },
  {
    baseUrl: 'http://xshy.omniview.pro', // 学术会议
    resourceName: 'xshy',
    micId: 'mic:xshy',
    pathPrefix: '/xshy'
  },
  {
    baseUrl: 'http://iftp.omniview.pro/lshy', // 理事会议
    resourceName: 'lshy',
    micId: 'mic:lshy',
    pathPrefix: '/lshy'
  },
  {
    baseUrl: 'http://ssdw.omniview.pro', // 水生动物防疫系统实验室能力验证
    resourceName: 'ssdw',
    micId: 'mic:ssdw',
    pathPrefix: '/ssdw'
  },
  {
    baseUrl: 'http://pjsf.omniview.pro', // 中国水产学会团体标准管理
    resourceName: 'ttbz',
    micId: 'mic:ttbz',
    pathPrefix: '/ttbz'
  },
  {
    baseUrl: 'http://fljps.omniview.pro', // 范蠡奖评审
    resourceName: 'fljps',
    micId: 'mic:fljps',
    pathPrefix: '/fljps'
  },
  ]
  break
case 'uat': // uat环境下
  MicConfig = [{
    baseUrl: 'http://scsd.szjoin.net',
    resourceName: 'scsd',
    micId: 'mic:scsd',
    pathPrefix: '/scsd'
  }]
  break
case 'production': // 生产环境下
  MicConfig = [{ //质量安全/追述
    baseUrl: 'http://znyj.nftec.agri.cn/zlaq',
    resourceName: 'zlzs',
    micId: 'mic:zlzs',
    pathPrefix: '/zlzs'
  }]
  break
default: // 默认环境下（开发环境）
  MicConfig = [{
    baseUrl: 'http://scylzc.tao.com', // 原良种验收
    resourceName: 'scylzc',
    micId: 'mic:scylzc',
    pathPrefix: '/scylzc'
  },
  {
    baseUrl: 'http://ylzcre.tao.com', // 原良种复查
    resourceName: 'ylzcre',
    micId: 'mic:ylzcre',
    pathPrefix: '/ylzcre'
  },
  ]
  break
};

export const MicConfigs = [
  ...MicConfig,
]
