/**
 * 配置需跳转至外部系统的地址参数
 * 参数说明：
 *  键值名需与router中outsite的router.name\router.meta.authcode保持一致
 *
 */

let outsideUrl = {}
switch (process.env.NODE_ENV) {
case 'devol': // 本地线上部署环境下
  outsideUrl = {
    'SCYJ':'http://47.102.155.97:8080/Sso', // 国家水生动物疫情预警系统
    'YQCB':'http://47.102.155.97:8081/Sso', // 全国水产养殖动植物病情测报系统
    'ZXJC':'http://47.102.155.97:8082/Sso', // 国家水生动物疫病监测信息管理系统
    'NYPC':'http://47.102.155.97:8083/Sso', // 水产养殖动物病原菌耐药性普查数据分析系统
    'SCZN':'http://114.215.195.182:2280/SSJK.aspx', //“水产智能”健康养殖生产与大数据管理系统
    'XXYY':'http://123.206.129.108:8000/index/user/index', //休闲渔业
    'HYMC':'http://123.206.129.108:8082/index/user/index', // 海洋牧场
    'TGTX':'http://123.206.129.108:8083', // 水产推广体系
    'SCJG':'http://www.cninfoyu.cn/', // 水产价格采集
    'YMSZ':'http://www.csfish.org.cn:8080/fishincome/', // 渔民收支
    'YQJC':'http://139.129.222.144:8094/sys/Login', // 渔情监测
    'NLBL':'http://139.129.222.144:8093/default.aspx', // 内陆捕捞
    'ZYYH':'http://139.129.222.144:8091/Default.aspx', // 水生物资源养护信息采集系统
    'YYTJ':'http://139.129.222.144:8092/Account/Login.aspx', // 全国渔业统计
  }
  break
case 'sit': // sit环境下
  outsideUrl = {
    'SCYJ':'http://47.102.155.97:8080/Sso', // 国家水生动物疫情预警系统
    'YQCB':'http://47.102.155.97:8081/Sso', // 全国水产养殖动植物病情测报系统
    'ZXJC':'http://47.102.155.97:8082/Sso', // 国家水生动物疫病监测信息管理系统
    'NYPC':'http://47.102.155.97:8083/Sso', // 水产养殖动物病原菌耐药性普查数据分析系统
    'SCZN':'http://114.215.195.182:2280/SSJK.aspx', //“水产智能”健康养殖生产与大数据管理系统
    'XXYY':'http://123.206.129.108:8000/index/user/index', //休闲渔业
    'HYMC':'http://123.206.129.108:8082/index/user/index', // 海洋牧场
    'TGTX':'http://123.206.129.108:8083', // 水产推广体系
    'SCJG':'http://www.cninfoyu.cn/', // 水产价格采集
    'YMSZ':'http://www.csfish.org.cn:8080/fishincome/', // 渔民收支
    'YQJC':'http://139.129.222.144:8094/sys/Login', // 渔情监测
    'NLBL':'http://139.129.222.144:8093/default.aspx', // 内陆捕捞
    'ZYYH':'http://139.129.222.144:8091/Default.aspx', // 水生物资源养护信息采集系统
    'YYTJ':'http://139.129.222.144:8092/Account/Login.aspx', // 全国渔业统计
  }
  break
case 'uat': // uat环境下
  outsideUrl = {
    'SCYJ':'http://47.110.14.138:8080/Sso', // 国家水生动物疫情预警系统
    'YQCB':'http://47.110.14.138:8081/Sso', // 全国水产养殖动植物病情测报系统
    'ZXJC':'http://47.110.14.138:8082/Sso', // 国家水生动物疫病监测信息管理系统
    'NYPC':'http://47.110.14.138:8083/Sso', // 水产养殖动物病原菌耐药性普查数据分析系统
    'SCZN':'http://114.215.195.182:2280/SSJK.aspx', //“水产智能”健康养殖生产与大数据管理系统
    'XXYY':'http://123.206.129.108:8000/index/user/index', //休闲渔业
    'HYMC':'http://123.206.129.108:8082/index/user/index', // 海洋牧场
    'TGTX':'http://123.206.129.108:8083', // 水产推广体系
    'SCJG':'http://www.cninfoyu.cn/', // 水产价格采集
    'YMSZ':'http://www.csfish.org.cn:8080/fishincome/', // 渔民收支
    'YQJC':'http://139.129.222.144:8094/sys/Login', // 渔情监测
    'NLBL':'http://139.129.222.144:8093/default.aspx', // 内陆捕捞
    'ZYYH':'http://139.129.222.144:8091/Default.aspx', // 水生物资源养护信息采集系统
    'YYTJ':'http://139.129.222.144:8092/Account/Login.aspx', // 全国渔业统计
  }
  break
case 'production': // 生产环境下
  outsideUrl = {
    'SCYJ':'http://47.102.155.97:8080/Sso', // 国家水生动物疫情预警系统
    'YQCB':'http://47.102.155.97:8081/Sso', // 全国水产养殖动植物病情测报系统
    'ZXJC':'http://47.102.155.97:8082/Sso', // 国家水生动物疫病监测信息管理系统
    'NYPC':'http://47.102.155.97:8083/Sso', // 水产养殖动物病原菌耐药性普查数据分析系统
    'SCZN':'http://114.215.195.182:2280/SSJK.aspx', //“水产智能”健康养殖生产与大数据管理系统
    'XXYY':'http://123.206.129.108:9000/index/user/index', // 休闲渔业
    'HYMC':'http://123.206.129.108:8082/index/user/index', // 海洋牧场
    'TGTX':'http://znyj.nftec.agri.cn/tgtx/checkToken.htmls', // 水产推广体系
    'SCJG':'http://www.cninfoyu.cn/', // 水产价格采集
    'YMSZ':'http://znyj.nftec.agri.cn/fishincome', // 渔民收支
    'YQJC':'http://znyj.nftec.agri.cn:8088/Sys/Login', // 渔情监测
    'NLBL':'http://znyj.nftec.agri.cn:8093/default.aspx', // 内陆捕捞
    'ZYYH':'http://znyj.nftec.agri.cn:8086/Default.aspx', // 水生物资源养护信息采集系统
    'YYTJ':'http://znyj.nftec.agri.cn:8087/Account/Login.aspx', // 全国渔业统计
  }
  break
default: // 默认环境下（开发环境）
  outsideUrl = {
    'SCYJ':'http://47.102.155.97:8080/Sso', // 国家水生动物疫情预警系统
    'YQCB':'http://47.102.155.97:8081/Sso', // 全国水产养殖动植物病情测报系统
    'ZXJC':'http://47.102.155.97:8082/Sso', // 国家水生动物疫病监测信息管理系统
    'NYPC':'http://47.102.155.97:8083/Sso', // 水产养殖动物病原菌耐药性普查数据分析系统
    'SCZN':'http://114.215.195.182:2280/SSJK.aspx', //“水产智能”健康养殖生产与大数据管理系统
    'XXYY':'http://123.206.129.108:9000/index/user/index', // 休闲渔业
    'HYMC':'http://123.206.129.108:8082/index/user/index', // 海洋牧场
    'TGTX':'http://123.206.129.108:8083', // 水产推广体系
    'SCJG':'http://www.cninfoyu.cn/', // 水产价格采集
    'YMSZ':'http://www.csfish.org.cn:8080/fishincome/', // 渔民收支
    'YQJC':'http://139.129.222.144:8094/sys/Login', // 渔情监测
    'NLBL':'http://139.129.222.144:8093/default.aspx', // 内陆捕捞
    'ZYYH':'http://139.129.222.144:8091/Default.aspx', // 水生物资源养护信息采集系统
    'YYTJ':'http://139.129.222.144:8092/Account/Login.aspx', // 全国渔业统计
  }
  break
};

let oldSysCodes = ['SCYJ','YQCB','ZXJC','NYPC','SCZN','XXYY','HYMC','TGTX','SCJG','YMSZ','NLBL','YQJC','ZYYH','YYTJ']

export const OutsideUrls = {
  ...outsideUrl,
}
export const OldSysCodes = [
  ...oldSysCodes
]
