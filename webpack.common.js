const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    publicPath: "/",
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(mp3|wav)$/i,
        type: "asset/resource",
        generator: {
          filename: "sounds/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new ESLintPlugin({
      context: path.resolve(__dirname, "src/js"),
      extensions: ["js"],
      fix: true,
      overrideConfigFile: path.resolve(__dirname, ".eslintrc.json"),
    }),
  ],
};
