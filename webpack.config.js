const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/Type/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "ppx.html",
      inject: "body",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_moudles/,
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    host: "localhost",
    port: 3777,
  },
};
