module.exports = {
  env: {
    // 支持浏览器环境
    browser: true,
    // 识别 CommonJS
    node: true,
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true
  },
  plugins: ["react"],
  // 继承 ESLint 的规则集
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "no-unused-vars": "warn"
  }
};
