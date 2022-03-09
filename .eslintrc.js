module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      useJSXTextNode: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint", "jest"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  rules: {
    "jsx-a11y/media-has-caption": "off",
    "jsx-a11y/control-has-associated-label": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/anchor-is-valid": 0,
    
    "import/extensions": "off",
    "linebreak-style": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/camelcase": "off",
    "import/no-cycle": "off",
    "no-nested-ternary": "off",
    "no-param-reassign": "off",
    "no-shadow": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "import/prefer-default-export": "off",
    "react/button-has-type": "off",
    "import/order": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "consistent-return": "off",
    "react/no-array-index-key": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ]
  },
  settings: {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src/"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
