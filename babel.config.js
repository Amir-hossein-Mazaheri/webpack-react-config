module.exports = {
  presets: [
    // third adds some polyfill or some legacy browser support
    "@babel/preset-env",
    // second translate jsx into js
    [
      "@babel/preset-react",
      { runtime: "automatic" },
    ],
    "@babel/preset-typescript", // first transpile tsx into jsx
  ],
};
