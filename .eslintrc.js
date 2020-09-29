module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-console": "off",
        "arrow-parens": ["error", "as-needed"],
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "jsx-quotes": ["error", "prefer-single"],
        "max-len": ["error", 120, 2],
        "object-curly-newline": ["error", {"multiline": true, "consistent": true}],
    }
};
