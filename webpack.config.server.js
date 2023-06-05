const path = require("path");
const nodeExternals = require("webpack-node-externals");

/**@type {import('webpack').Configuration} */
module.exports = {
  // 有development模式和production模式两种
  mode: "production",
  // 打包的入口文件地址
  entry: path.resolve(__dirname, "./app.js"),
  devtool: "source-map",
  output: {
    // 打包输出文件名称
    filename: "server.js",
    // 打包输出地址
    path: path.resolve(__dirname, "./server"),
    // 清除之前的打包文件
    clean: true,
  },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        // 对项目中.js结尾的文件，使用babel-loader进行转义处理
        test: /\.js$/,
        loader: "babel-loader", // 排除node_modules
        exclude: /node_modules/,
      },
      {
        test: /\iso.scss$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    moduleIds: "deterministic",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    name: "server",
  },
};
