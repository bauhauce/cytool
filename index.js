#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const clone = require('git-clone')
const shell = require('shelljs')
const spinner = require('ora')()

const questions = [
  {
    type: 'list',
    name: 'platform',
    choices: ['-pc', '-mobile'],
    message: '请选择平台',
    default: '-pc'
  }
]

function init (url) {
  spinner.start('项目开始初始化...')
  clone(url, '_', null, function (err) {
    if (err) {
      console.log(err)
    }
    spinner.succeed('项目初始化成功!')
    shell.cd('_')
    shell.exec('yarn')
    spinner.start('开始安装依赖...')
    shell.exec('gulp')
    spinner.succeed('项目依赖安装成功!')
  })
}


program.version('0.0.1', '-v, --version')

program.command('init <project-name>').action(function () {

  inquirer.prompt(questions).then(answer => {

    switch (answer.platform) {
      case '-pc': 
        init('git@github.com:bauhauce/cytool-tpl-pc.git')
        break
      case '-mobile': 
        init('git@github.com:bauhauce/cytool-tpl-mobile.git')
        break
    }

  })

})

program.parse(process.argv);