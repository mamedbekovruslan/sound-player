const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  const isProd = env === "production";

  return {
    entry: "./src/app.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "bundle.[contenthash].js" : "bundle.js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".js"], // Добавьте разрешение .ts файлов
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
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
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
        extensions: ["ts", "js"], // Добавьте проверку .ts файлов
        fix: true,
        failOnError: isProd,
        overrideConfigFile: path.resolve(__dirname, ".eslintrc.js")
      }),
    ],
  };
};