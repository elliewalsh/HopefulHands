const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    plugins: [
        new NodePolyfillPlugin()
    ],
    target: 'node',
    resolve: {
        fallback: {
            "crypto": { process: require.resolve("crypto-browserify") },
            "fs": { process: require.resolve("browserify-fs") },
            "http": { process: require.resolve("stream-http") },
            "net": false,
            "zlib": false
        }
    }
};