/**
 * 配置需注册子项目的mic名称
 * 参数说明：
 *  baseUrl：子项目部署服务后，公网路由域名
 *  resourceName：子项目注册进Portal后的独立资源空间名称
 *  micId：子项目打包部署时自行定义的名称
 *  pathPrefix：子项目路由base参数
 */

let expertReviewRouter = {
  'S0501':[ // 水产新品种
    {
      type:'review',
      reviewTypeCode:'SCSDWritten',
      routerName:'/scsd/post/scsdExamCheck/view/:id',
      authCode: 'S05010106',
    },
    {
      type:'review',
      reviewTypeCode:'SCSDScene',
      routerName:'/scsd/post/scsdLocalCheck/view/:id',
      authCode: 'S05010106',
    },
    {
      type:'detail',
      routerName:'/scsd/post/scsdPost/view/:id',
      authCode: 'S05010106',
    },
  ],
  'S0502':[ //水产原良种复查
    {
      type:'review',
      reviewTypeCode:'YLZCREWritten',
      routerName:'/ylzcre/afVerification/list/check',
      authCode: 'S05020601',
    },
    {
      type:'detail',
      routerName:'/ylzcre/afVerification/list/view',
      authCode: 'S05020203',
    },
  ],
  'S0503':[ //水产原良种场验收审定
    {
      type:'review',
      reviewTypeCode:'SCYLZCWritten',
      routerName:'/scylzc/afVerification/list/check',
      authCode: 'S05030501',
    },
    {
      type:'detail',
      routerName:'/scylzc/afVerification/list/view',
      authCode: 'S05030103',
    },
  ],
  'S0101':[ //中国水产学会科普教育基地评审
    {
      type:'review',
      reviewTypeCode:'KPJYWritten',
      routerName:'/kpjd/declare/organizationExpert/expertAdd',
      authCode: 'S01010402',
    },
    {
      type:'detail',
      routerName:'/kpjd/declare/Declare/DeclareInfo',
      authCode: 'S05030103',
    },
  ],
  'S0201':[ //中国水产学会团体标准函审
    {
      type:'review',
      reviewTypeCode:'TTBZWritten',
      routerName:'/ttbz/letterReviewmanager/letterReview/addLetterReview',
      authCode: 'S02010602',
    },
    {
      type:'detail',
      routerName:'/ttbz/organizationExpert/standardExpertDetail',
      authCode: 'S02010601',
    },
  ],
  'S1002':[ //中国水产学会团体标准函审
    {
      type:'review',
      reviewTypeCode:'FLJPSWritten',
      routerName:'/fljps/flaReportDetail/flaReportDetail',
      authCode: 'S10020801',
    },
    {
      type:'detail',
      routerName:'/fljps/flaReportDetail/flaReportDetail',
      authCode: 'S10020802',
    },
  ],
  'S0401':[ //海洋牧场
    {
      type:'review',
      reviewTypeCode:'HYMCFCWritten',
      routerName:'/hymc/ReviewManageHy/ReviewScoreInfo/:id',
      authCode: 'S04012802',
    },
    {
      type:'detail',
      reviewTypeCode:'HYMCFCWritten',
      routerName:'/hymc/evaluateHy/YearPs/CheckReview/:id',
      authCode: 'S04010702',
    },
    {
      type:'review',
      reviewTypeCode:'HYMCWritten',
      routerName:'/hymc/evaluateHy/ScoreInfo/:id',
      authCode: 'S04010402',
    },
    {
      type:'detail',
      reviewTypeCode:'HYMCWritten',
      routerName:'/hymc/evaluateHy/YearPs/CheckYearPs/:id',
      authCode: 'S04010702',
    },
    {
      type:'review',
      reviewTypeCode:'HYMCYJWritten',
      routerName:'/hymc/evaluateYj/YjScoreInfo/:id',
      authCode: 'S04011002',
    },
    {
      type:'detail',
      reviewTypeCode:'HYMCYJWritten',
      routerName:'/hymc/evaluateYj/YearPs/CheckYearPs/:id',
      authCode: 'S04011302',
    },
    {
      type:'review',
      reviewTypeCode:'HYMCYJYSWritten',
      routerName:'/hymc/evaluateYj/AcceptExpertEdit/:id',
      authCode: 'S04012803',
    },
    {
      type:'detail',
      reviewTypeCode:'HYMCYJYSWritten',
      routerName:'/hymc/evaluateYj/ProjectAccept/ProjectAcceptSee/:id',
      authCode: 'S04012805',
    },
  ]
}


export const ExpertReviewRouters = {
  ...expertReviewRouter,
}

