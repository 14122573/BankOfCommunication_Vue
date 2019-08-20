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
    'SCYJ':'http://47.102.155.97:8080/Sso', // 水产预警
    'YQCB':'', // 全国水产养殖动植物病情测报系统
    'ZXJC':'', // 国家水生动物疫病监测信息管理系统
    'NYPC':'', // 水产养殖动物病原菌耐药性普查数据分析系统
  }
  break
case 'sit': // sit环境下
  outsideUrl = {
    'SCYJ':'http://47.102.155.97:8080/Sso', // 水产预警
    'YQCB':'', // 全国水产养殖动植物病情测报系统
    'ZXJC':'', // 国家水生动物疫病监测信息管理系统
    'NYPC':'', // 水产养殖动物病原菌耐药性普查数据分析系统
  }
  break
case 'uat': // uat环境下
  break
case 'production': // 生产环境下
  break
default: // 默认环境下（开发环境）
  outsideUrl = {
    'SCYJ':'http://47.102.155.97:8080/Sso', // 水产预警
    'YQCB':'', // 全国水产养殖动植物病情测报系统
    'ZXJC':'', // 国家水生动物疫病监测信息管理系统
    'NYPC':'', // 水产养殖动物病原菌耐药性普查数据分析系统
  }
  break
};

export const OutsideUrls = {
  ...outsideUrl,
}
