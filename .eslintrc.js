module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'vue/multi-word-component-names': 'warn',
    'max-len': ['warn', 150],
    'linebreak-style': ['warn', 'windows'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vuejs-accessibility/label-has-for': [
      'warn',
      {
        components: ['VLabel'],
        controlComponents: ['VInput'],
        required: {
          every: ['nesting', 'id'],
        },
        allowChildren: false,
      },
    ],
    'vuejs-accessibility/form-control-has-label': [
      'warn',
      {
        labelComponents: ['CustomLabel'],
        controlComponents: ['CustomInput'],
      },
    ],
  },
};
