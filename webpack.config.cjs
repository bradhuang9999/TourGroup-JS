const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
    {
        mode: 'production',
        entry: './src/tourgroup.js',
        output: {
            filename: 'tourgroup.js',
            path: __dirname + '/dist',
            library: 'TourGroup',
            libraryTarget: 'window',
            clean: true,            
        },
        optimization: {
            minimize: false,
        },
    },
    {
        mode: 'production',
        entry: './src/tourgroup.js',
        output: {
            filename: 'tourgroup.min.js',
            path: __dirname + '/dist',
            library: 'TourGroup',
            libraryTarget: 'window',
        },
    },
    {
        mode: 'production',
        entry: './src/tourgroup.js',
        output: {
            filename: 'tourgroup.esm.js',
            path: __dirname + '/dist',
            libraryTarget: 'module'
        },
        experiments: {
            outputModule: true
        },
        optimization: {
            minimize: false,
        }
    },
    {
        mode: 'production',
        entry: './src/tourgroup.js',
        output: {
            filename: 'tourgroup.esm.min.js',
            path: __dirname + '/dist',
            libraryTarget: 'module'
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: 6,
                    },
                }),
            ],
        },
        experiments: {
            outputModule: true
        }
    },
];