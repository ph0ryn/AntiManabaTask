import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import importX from "eslint-plugin-import-x";
import googleappsscript from "eslint-plugin-googleappsscript";

export default defineConfig([
    {
        files: [
            "src/*.ts"
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: [".gs"],
            },
            globals: {
                "googleappsscript/googleappsscript": true
            }
        },
        plugins: {
            "import-x": importX,
            "@typescript-eslint": tseslint.plugin,
            "googleappsscript": googleappsscript,
        },
        rules: {
            "semi": ["error", "always"],
            "semi-spacing": "error",
            "semi-style": ["error", "last"],
            "no-extra-semi": "error",

            "no-unexpected-multiline": "error",
            "no-unreachable": "error",

            "quotes": ["error", "double"],

            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "class",
                    "format": ["StrictPascalCase"]
                },
                {
                    "selector": "property",
                    "format": ["StrictPascalCase", "strictCamelCase"]
                },
                {
                    "selector": ["variable", "parameter", "class", "property"],
                    "format": ["strictCamelCase"]
                }
            ],

            "import-x/order": ["error", {
                "alphabetize": { "order": "asc" },
                "groups": [
                    "builtin",
                    "external",
                    "internal",
                    ["parent", "sibling", "index"],
                    "type"
                ],
                "newlines-between": "never"
            }]
        },
    },
]);