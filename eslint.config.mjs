import js from "@eslint/js";
import globals from "globals";
import vuePlugin from 'eslint-plugin-vue'
import { defineConfig } from "eslint/config";
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import importPlugin from 'eslint-plugin-import'
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  js.configs.recommended,
  ...vuePlugin.configs["flat/recommended"],
  ...tailwindPlugin.configs["flat/recommended"],
  {
    files: ["resources/js/**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: false },
      },
      globals: { ...globals.browser, ...globals.builtin },
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
      vue: vuePlugin,
      tailwindcss: tailwindPlugin,
      import: importPlugin,
    },
    settings: {
      tailwindcss: {
        callees: ["class"],
        config: "tailwind.config.js",
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        cssFilesRefreshRate: 5000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [],
      },
    },
    rules: {
      "unicorn/no-null": "off",

      // //tailwind
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/no-arbitrary-value": "off",

      // //imports sorting
      "sort-imports": 'off',
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type"
          ],
        }
      ],
      "import/no-unresolved": "error",
      "import/no-absolute-path": "error",
      "import/no-duplicates": "error",
      "import/no-self-import": "error",
      "import/no-cycle": ["error", { "maxDepth": 3 }],
      "import/no-useless-path-segments": "error",
      "import/export": "error",
      "import/no-mutable-exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-amd": "error",
      "import/no-deprecated": "warn",
      "import/no-extraneous-dependencies": "error",
      "import/no-relative-packages": "error",
      "import/max-dependencies": ["warn", { "max": 25 }],
      "import/no-anonymous-default-export": "warn",
      "import/no-default-export": "off",

      //Basic rules
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "eqeqeq": ["error", "smart"],
      "curly": ["error", "all"],
      "camelcase": ["error", { "properties": "never" }],
      "no-var": "error",
      "prefer-const": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-trailing-spaces": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "no-return-await": "error",
      "no-useless-return": "error",
      "no-else-return": "error",
      "no-param-reassign": "error",
      "no-shadow": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-blocks": "error",
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "arrow-spacing": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "no-duplicate-imports": "error",
      "linebreak-style": ["error", "unix"],
      "indent": ["error", "tab", { SwitchCase: 1 }],
      "quote-props": ["error", "as-needed"],
      "comma-dangle": ["error", "only-multiline"],
      "arrow-parens": ["error", "always"],
      "max-len": ["warn", {
        code: 150,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreUrls: true,
        ignorePattern: 'd="([\\s\\S]*?)"'
      }],
      "max-depth": ["warn", 4],
      "max-params": ["warn", 4],
      "complexity": ["warn", 15],
      "no-warning-comments": ["warn", { "terms": ["todo", "fixme"] }],

      // Vue specific rules
      "vue/no-unused-vars": "error",
      "vue/no-mutating-props": "error",
      "vue/no-v-html": "warn",
      "vue/require-v-for-key": "error",
      "vue/no-use-v-if-with-v-for": ["error", { "allowUsingIterationVar": false }],
      "vue/require-default-prop": "error",
      "vue/no-unused-components": "error",
      "vue/no-dupe-keys": "error",
      "vue/html-indent": ["error", "tab", {
        "attribute": 1,
        "baseIndent": 1,
        "closeBracket": 0,
        "alignAttributesVertically": true,
        "ignores": []
      }],
      "vue/max-attributes-per-line": ["error", {
        singleline: 1,
        multiline: 1,
      }],
      "vue/no-side-effects-in-computed-properties": "error",
      "vue/attribute-hyphenation": ["error", "always"],
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/html-self-closing": ["error", {
        "html": {
          "void": "always",
          "normal": "always",
          "component": "always"
        }
      }],
      "vue/no-deprecated-v-is": "error",
      "vue/no-deprecated-slot-attribute": "error",
      "vue/no-duplicate-attributes": "error",
      "vue/no-empty-component-block": "error",
      "vue/html-closing-bracket-newline": ["error", {
        singleline: "never",
        multiline: "always",
      }],
      "vue/no-multiple-template-root": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/script-indent": ["error", "tab", {
        baseIndent: 0,
        switchCase: 1,
      }],
    },
  },
]);
