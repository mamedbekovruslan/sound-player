const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  const isProd = env === "production";

  return {
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "bundle.[contenthash].js" : "bundle.js",
      publicPath: "/",
      clean: true,
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/[name].[hash][ext]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name].[hash][ext]",
          },
        },
        {
          test: /\.(mp3|wav)$/i,
          type: "asset/resource",
          generator: {
            filename: "sounds/[name].[hash][ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: isProd,
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? "styles.[contenthash].css" : "styles.css",
      }),
      new ESLintPlugin({
        extensions: ["json"],
        fix: true,
        failOnError: isProd,
        overrideConfigFile: path.resolve(__dirname, ".eslintrc.json")
      }),
    ],
  };
};