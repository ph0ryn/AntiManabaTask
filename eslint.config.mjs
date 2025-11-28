
import eslint from '@eslint/js';
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import googleappsscript from "eslint-plugin-googleappsscript";

export default tseslint.config(
    {
        ignores: [
            "src/*.js",
            "build.mjs",
            "dist/**"
        ],
    },
    eslint.configs.recommended,
    {
        files: ["src/*.ts"],
        extends: [
            ...tseslint.configs.recommendedTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            },
            globals: {
                ...googleappsscript.environments.googleappsscript.globals,
            }
        },
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            "semi": ["error", "always"],
            "semi-spacing": "error",
            "semi-style": ["error", "last"],
            "no-extra-semi": "error",

            "no-unexpected-multiline": "error",
            "no-unreachable": "error",

            "quotes": ["error", "double"],
            
            "no-multiple-empty-lines": [
                "error",
                {
                    "max": 1,
                    "maxEOF": 0
                }
            ],

            "@stylistic/indent": [ "error", 2 ],

            "@stylistic/padding-line-between-statements": [
                "error",
                {
                    "blankLine": "always",
                    "prev": "*",
                    "next": ["return", "multiline-expression", "block-like", "try", "throw"]
                },
                {
                    "blankLine": "always",
                    "prev": ["multiline-expression", "block-like", "const", "let"],
                    "next": "*"
                },
                {
                    "blankLine": "any",
                    "prev": ["const", "let"],
                    "next": ["const", "let"]
                }
            ],

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
        },
    }
);