// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: [
    "vue",
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential"
  ],
  rules: {
    "semi": "error",
    "quotes": ["error", "double"],
    "no-undef": "off", // 让ts检查undefined
    "no-unused-vars": "off",
    "vue/max-len": ["error", {
      code: 200,
      template: 90
    }],
    "vue/no-unused-vars": "warn",
    "vue/multi-word-component-names": "off"
  }
};