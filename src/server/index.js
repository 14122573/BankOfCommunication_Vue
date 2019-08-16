import ajax from './ajax'

export default {
  cancel: (txt = '取消请求') => ajax.cancel(txt), // 暴露出取消请求的方法，勿删
  login: (...args) => ajax.login(args), //登录获取token用
  gql: (query, variables) => ajax.gql(query, variables), // graphql的请求
  get: (...args) => ajax.get(args),
  post: (...args) => ajax.post(args),
  put: (...args) => ajax.put(args),
  delete: (...args) => ajax.delete(args),
  all: (...functions) => ajax.all(functions),
}
