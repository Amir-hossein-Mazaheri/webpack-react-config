const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// common configs between production and development mode
const common = {
  entry: "./src/index.js",
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s?(a|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      hash: true,
      title: "Promise and Webpack Test",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

module.exports = (env, argv) => {
  // special configs for development mode
  if (argv.mode === "development") {
    return {
      ...common,
      devtool: "source-map",
      mode: "development",
      devServer: {
        static: {
          directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 9000,
        hot: true,
      },
    };
  }

  // special configs for production mode
  if (argv.mode === "production") {
    return {
      ...common,
      mode: "production",
    };
  }
};
