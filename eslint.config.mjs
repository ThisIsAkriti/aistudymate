import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// FlatCompat returns an array - keep it as an array
const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
    ],
  }),
  // Add your custom rules/plugins as a separate config object
  {
    plugins: [],
    rules: {
      'prettier/prettier': 'error',
      'react/no-escape-entities': 'off',
    },
  }
];

export default eslintConfig;