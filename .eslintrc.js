module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  plugins: ['@babel'],
  extends: 'eslint:recommended',
  'rules': {

    // allow paren-less arrow functions
    'arrow-parens': 0,
    "arrow-spacing": 2,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    "quotes": 0,
    "space-in-parens": 0,
    "indent": ["warn", 2],
    "no-console": process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-unused-vars": [0, {"vars":"all","args":"none"}],
    "one-var": 0, //强制变量声明放在一起
    "no-dupe-keys": 2, // 重复key
    "no-case-declarations": 0, // 允许多个case
    "no-empty": 0, // 允许空块
    "no-with": 2,
    "eol-last": 2,
    "no-undef": 0,
    "keyword-spacing": 2,
    "semi": [2, "always"],
    "strict": [2, "function"],
    "eqeqeq": 0,
    "space-before-blocks": [2, "always"],
    "no-multiple-empty-lines": [2, {"max": 3}], //空行最多不能超过两行
    
    "object-curly-spacing":0,// 强制在花括号中使用一致的空格
    "key-spacing": process.env.NODE_ENV === 'production' ? [2, {"beforeColon":false,"afterColon":true}] : 0,// 强制在对象字面量的属性中键和值之间使用一致的间距
    "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}], //函数定义时括号前的空格
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "ignore",
        "imports": "never",
        "exports": "never",
        "functions": "ignore",
    }]//逗号结尾
  }
}