const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'index.js',
    },
    plugins: [new webpack.ProgressPlugin(), new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],

    devtool: debug ? 'inline-cheap-source-map' : false,
    target: 'node',

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/],
            },
        ],
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
