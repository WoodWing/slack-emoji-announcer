import * as path from 'path';
import { Configuration } from 'webpack';

export default <Configuration>{
    mode: 'development',
    entry: path.join(__dirname, 'src/handler.ts'),
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: 'handler.js',
    },
    devtool: 'source-map',
};