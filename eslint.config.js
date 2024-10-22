import globals from 'globals'
import js from '@eslint/js'

export default [
    { ignores: ['build/**'], },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
                // google analytics globals
                ga: 'writable',
                gtag: 'readonly',
                dataLayer: 'writable',
                // Moodle & jQuery
                M: 'readonly',
                $: 'readonly',
            },
            sourceType: 'script',
        },
        rules: {
            indent: [ 'warn', 4 ],
            'linebreak-style': [ 'error', 'unix' ],
            'no-unused-vars': 'off',
            'no-empty': 'off',
            'quotes': [ 'warn', 'single' ],
            'semi': [ 'error', 'never' ],
        }
    },
    // gulpfile is commonjs
    {
        files: ['gulpfile.js', ],
        languageOptions: {
            globals: { ...globals.node, },
            sourceType: 'commonjs',
        }
    },
    // this file
    {
        files: ['eslint.config.js', ],
        languageOptions: {
            globals: { ...globals.node, },
            sourceType: 'module',
        },
    }
]
