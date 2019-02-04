const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        http: './src/http.ts',
    },
    mode: 'production',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'http',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
                include: [
                    path.resolve(__dirname, "src"),

                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
    externals: [
        'request',
    ],
}