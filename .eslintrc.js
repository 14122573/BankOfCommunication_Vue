// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off', //禁用 console
    'no-empty': process.env.NODE_ENV === 'production' ? 'off' : 'warn', //禁止空块语句
    // 'no-empty-function': 2, // 禁止出现空函数
    'no-sparse-arrays': 2, // 禁用稀疏数组
    'no-mixed-spaces-and-tabs': process.env.NODE_ENV === 'production' ? 'off' : 'off', // 禁止空格和 tab 的混合缩进
    // 'dot-notation': 2, // 强制尽可能地使用点号
    'no-useless-concat': 1, // 禁止没必要的字符串拼接
    indent: ['error', 2],
    'linebreak-style': 'off',
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'], // 对象括号内部需要有空格
    'array-bracket-spacing': ['error', 'always'], // 强制数组方括号中使用一致的空格
    'default-case': 2, // 要求 switch 语句中有 default 分支
    semi: ['error', 'never'],
    camelcase: process.env.NODE_ENV === 'production' ? 'off' : 'off', //强制驼峰法命名
    'comma-spacing': 0, //逗号前后的空格
    'brace-style': 2, //强制在代码块中使用一致的大括号风格, 默认为1tbs
    'no-multiple-empty-lines': 2, // 禁止出现多行空行,默认最多两行
    'linebreak-style': ['error', 'unix'], // 强制使用一致的换行风格
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowArrayStart: true
      }
    ], // 要求在注释周围有空行
    'key-spacing': [
      'error',
      {
        align: {
          beforeColon: false,
          afterColon: true,
          on: 'colon',
          mode: 'strict'
        }
      }
    ],
    'space-before-function-paren': [0, 'always'] //函数定义时括号前面要不要有空格
  }
}
