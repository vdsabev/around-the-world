module.exports = {
  extends: ['plugin:vue/vue3-recommended'],
  rules: {
    'no-debugger': 'warn',

    'vue/attributes-order': [
      'error',
      {
        order: [
          'CONDITIONALS',
          'LIST_RENDERING',
          'UNIQUE',
          'DEFINITION',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'TWO_WAY_BINDING',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
}
