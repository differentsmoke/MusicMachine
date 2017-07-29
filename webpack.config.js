const WebpackHtmlPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: ["babel-loader"]
            },
            {
                test: /\.css/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        open: true,
    },
    plugins: [
        new WebpackHtmlPlugin({
            template: "./src/index.ejs"
        })
    ]
};
