import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";

export default [
  // Base ESLint rules
  js.configs.recommended,

  // Ignore built output
  {
    ignores: ["dist", ".next"],
  },

  // TypeScript + React settings
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslintParser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        React: "readonly", // Needed for Next.js
      },
    },
    plugins: {
      "@typescript-eslint": tseslintPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // TypeScript Recommended Rules
      ...tseslintPlugin.configs.recommended.rules,

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh (for fast refresh safety)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // React/TSX Common Preferences
      "react/react-in-jsx-scope": "off", // Next.js doesn't require React in scope
      "react/prop-types": "off", // Using TypeScript instead

      // Code style
      "semi": ["error", "always"],
      "quotes": ["error", "double"],

      // TypeScript strictness
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],

      // Console logging control
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
];
