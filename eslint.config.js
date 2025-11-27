import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
  plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  }
]);
