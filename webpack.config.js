// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const path = require("path");

// eslint-disable-next-line no-undef
module.exports = {
  entry: "./src/index.tsx",
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "production",
  optimization: {
    usedExports: true,
  },
  plugins: [
    new TerserPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
