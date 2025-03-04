// @ts-check
import eslint from "@eslint/js";
import parser from "@typescript-eslint/parser";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["eslint.*", "prettier.*", "dist", "node_modules", "ui"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: true,
        projectService: true,
      },
    },
    rules: {
      "no-unused-labels": 0,
    },
  },
  eslintPluginPrettierRecommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      "no-unused-labels": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error", // or 'error'
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
);