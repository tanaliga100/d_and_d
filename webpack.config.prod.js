const path = require("path");
const ClearPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "dist",
  },

  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new ClearPlugin.CleanWebpackPlugin()],
};
