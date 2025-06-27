module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  semi: true,
  arrowParens: "avoid",
  trailingComma: "es5",
  bracketSameLine: true,
  printWidth: 200,
  endOfLine: "auto",
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
};
