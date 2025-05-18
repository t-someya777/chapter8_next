/** @type {import('stylelint').Config} */
module.exports = {
  extends: ["stylelint-config-standard-scss","stylelint-config-rational-order"],
  plugins: ["stylelint-scss", "stylelint-order"],
  rules: {
    "color-hex-length" : "short",
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$"
  }
};