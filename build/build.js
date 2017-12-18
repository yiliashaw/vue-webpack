'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

//Elegant terminal spinner,
const ora = require('ora')

//UNIX command rm -rf; rimraf(globbing pattern for files, [opts], callback); opt参数可以省略。
const rm = require('rimraf')

// path
const path = require('path')

// 粉笔
const chalk = require('chalk')

//webpack，返回一个名为webpack的函数。调用： webpack(config, (err, stats)=>{})
const webpack = require('webpack')

//config文件夹
const config = require('../config')

//只取生产环境下的webpack config
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start() //开始spinner动画


// assetsRoot: path.resolve(__dirname, '../dist'),
// assetsSubDirectory: 'static',
//assetsPublicPath: '/',
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => { // path: ../dist/static, 删除static文件夹
  if (err) throw err

  webpack(webpackConfig, function (err, stats) {
    spinner.stop() //结束spinner
    if (err) throw err
    console.log(stats.compilation.entrypoints); //所有的入口文件
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: true,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
