const path = require("path");
module.exports = {
    publicPath: './',
    outputDir: process.env.outputDir,
    css: {
        loaderOptions: {
            css: {
                loaderOptions: {
                    sass: {
                        prependData: `@import "@/my-scss.scss";`
                    }
                }
            },
            postcss: {
                /* plugins: [
                     require('postcss-px2rem')({
                         remUnit: 37.5
                     }),
                 ]*/
            },
            less: {
                modifyVars: {
                    /*red: '#03a9f4',
                    blue: '#3eaf7c',
                    orange: '#f08d49',
                    'text-color': '#111'*/
                    /*   'nav-bar-icon-color': "#fb3126",
                       'nav-bar-text-color': "#fb3126"*/
                }
            }
        }
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, "./src/my-scss.scss")
            ]
        }
    },

    lintOnSave: false,
    devServer: {
        disableHostCheck: true
    },
    runtimeCompiler: true,
};
