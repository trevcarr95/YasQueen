const path = require("path");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "client/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        // OR 
        //exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: "babel-loader",
          options: {
            // runs from right to left inside the array 
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test:/\.jsx?$/,
        enforce: 'pre',
        use: ['source-map-loader']
      },
      {
        test: /\.s?[ac]ss/i,
        // use: ExtractTextPlugin.extract({
        //   use: ['style-loader', "css-loader", "sass-loader"],
        // }),
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ],
  },
  devServer: {
    publicPath: "/build",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
  plugins: []
};