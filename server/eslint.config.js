const js = require("@eslint/js");
const globals = require("globals");
const jsdoc = require("eslint-plugin-jsdoc");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, jsdoc },
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jsdoc.configs.recommended.rules,

      // Enforce JSDoc presence
      "jsdoc/require-jsdoc": [
        "warn",
        {
          publicOnly: false, // If true, checks only exported functions
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],

      // Enforce descriptions and tag consistency
      "jsdoc/require-description": "warn",
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "warn",
      "jsdoc/check-tag-names": "warn",
      "jsdoc/check-types": "warn",
    },
  },

  {
    files: ["**/__tests__/**/*.js", "**/tests/**/*.js"],
    languageOptions: {
      globals: globals.jest,
    },
  },

  {
    ignores: ["node_modules"],
  },
]);
