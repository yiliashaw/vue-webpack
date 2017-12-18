'use strict'

//粉笔。 console.log(chalk.blue('Hello world!'));
const chalk = require('chalk')

//semantic versioner：语义化版本控制; 版本格式：主版本号(当你做了不兼容的 API 修改).次版本号(当你做了向下兼容的功能性新增).修订号(当你做了向下兼容的问题修正)
// https://github.com/npm/node-semver
const semver = require('semver')

//package.json
const packageConfig = require('../package.json')

//
const shell = require('shelljs')


function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()  //发起一个子进程，同步执行一个命令，并把命令的结果转化成字符串格式
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), // version.trim().replace(/^[=v]+/, '')
    versionRequirement: packageConfig.engines.node  //"node": ">= 4.0.0"
  }
]

//Searches for command in the system's PATH.Returns string containing the absolute path to the command.返回包含该命令的绝对路径。如找不到这个命令则会返回null。
if (shell.which('npm')) {
  versionRequirements.push({  // process.version直接在node里运行的，所以不需要exec，而npm --version是在bash里运行的。
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm  //"npm": ">= 3.0.0"
  })
}


// export a function
module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {  //satisfies(version, range): Return true if the version satisfies the range.
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
