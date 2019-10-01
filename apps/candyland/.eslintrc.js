module.exports = {
    "env": {
        "browser": true,
        "protractor": true,
        "es6": true
    },
    "extends": [
      "eslint:all"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "settings": {
      "eslint.workingDirectories": [
        {"directory": "<PATH_TO_TSCONFIG>",
        "changeProcessCWD": true }
      ]
    },
    "rules": {
    }
};
