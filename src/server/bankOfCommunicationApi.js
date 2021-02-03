let BASE_URL = ''

BASE_URL = 'http://localhost:8091'


export default {
  BASE_URL,
  //脚本
  getAllScriptData: '/dev-tool/scripts/list',
  getScriptInfo: '/dev-tool/scripts/info',
  saveScriptInfo: '/dev-tool/scripts/save',
  updateScriptInfo: '/dev-tool/scripts/update',
  //数据源
  getAllDataSource: '/dev-tool/data/ListQuery',
  getDataSourceByDsId: '/dev-tool/data/Query',
  saveDataSource: '/dev-tool/data/Add',
  updateDataSource: '/dev-tool/data/Update',
  deleteDataSource: '/dev-tool/data/Delete',
  //ETL
  getAllETL: '/dev-tool/etl/ListQuery',
  getETLBySrvId: '/dev-tool/etl/Query',
  saveEtl: '/dev-tool/etl/Add',
  updateEtl: '/dev-tool/etl/Update',
  deleteEtl: '/dev-tool/etl/Delete',
  getEtlType: '/dev-tool/etl/getEtlType',
  //任务
  getAllScriptStatus: '/dev-tool/task/getStatus',
  getAllPlatform: '/dev-tool/task/getPlatForm',
  getTaskByTaskId: '/dev-tool/task/TaskQuery',
  getAllTask: '/dev-tool/task/ListQuery'

}
