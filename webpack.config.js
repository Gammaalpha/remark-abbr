var path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    libraryTarget: "commonjs2",
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader?configFile=tsconfig.prod.json",
      },
    ],
  },
};
