#!/usr/bin/env node

'use strict'

const boxen = require('boxen')
const chalk = require('chalk')
const inquirer = require('inquirer')
const clear = require('clear')
const open = require('open')
const fs = require('fs')
const request = require('request')
const path = require('path')
const ora = require('ora')
const cliSpinners = require('cli-spinners')

clear()

const prompt = inquirer.createPromptModule()

const info = [
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      {
        name: `Send me an ${chalk.green.bold('email')}?`,
        value: (() => {
          open('mailto:thiago.silva@imd.ufrn.br')
          console.log('\nDone, I will contact you soon. Thanks!\n')
        })
      },
      {
        name: `Download my ${chalk.magentaBright.bold('resume')}?`,
        value: (() => {
          const loader = ora({
            test: 'Downloading resume',
            spinner: cliSpinners.material,
          }).start()

          const url = 'https://github.com/silva-thiago/silva-thiago/blob/master/api/resume'

          let pipe = request(url).pipe(fs.createWriteStream('./thiago-silva-resume.html'))

          pipe.on('finish', (() => {
            let downloadPath = path.join(process.cwd(), 'thiago-silva-resume.html')

            console.log(`\nResume downloaded at ${downloadPath}\n`)

            open(downloadPath)
            loader.stop()
          }))
        })
      },
      {
        name: 'Just quit.',
        value: (() => {
          console.log('I hope you enjoyed it! Have a nice day!')
        })
      }
    ]
  }
]

const data = {
  name: chalk.bold.green('             Thiago Silva'),
  handle: chalk.white('@silva-thiago'),
  work: `${chalk.white('Front-end developer at')} ${chalk
    .hex('#2b82b2')
    .bold('STI UFRN & DTI IMD')}`,
  github: chalk.gray('https://github.com/') + chalk.green('silva-thiago'),
  linkedin: chalk.gray('https://linkedin.com/in/') + chalk.blue('s-thiago'),
  telegram: chalk.gray('https://t.me/') + chalk.cyan('silvathiago'),
  web: chalk.cyanBright('https://silva-thiago.github.io'),
  npx: chalk.red('npx') + ' ' + chalk.white('thiagosilva'),

  labelWork: chalk.white.bold('       Work:'),
  labelGitHub: chalk.white.bold('     GitHub:'),
  labelLinkedIn: chalk.white.bold('   LinkedIn:'),
  labelTelegram: chalk.white.bold('   Telegram:'),
  labelWeb: chalk.white.bold('        Web:'),
  labelCard: chalk.white.bold('       Card:')
}

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork} ${data.work}`,
    ``,
    `${data.labelGitHub} ${data.github}`,
    `${data.labelLinkedIn} ${data.linkedin}`,
    `${data.labelTelegram} ${data.telegram}`,
    `${data.labelWeb} ${data.web}`,
    ``,
    `${data.labelCard} ${data.npx}`,
    ``,
    /* `${chalk.italic(
      'I am currently looking for new opportunities,'
    )}`, */
    `${chalk.italic('My inbox is always open.')}`,
    `${chalk.italic(
      'Whether you have a question or just want to say hi.'
    )}`,
    `${chalk.italic(
      'I will try my best to get back to you!'
    )}`
  ].join('\n'),
  {
    borderColor: 'green',
    borderStyle: 'single',
    float: 'center',
    margin: 1,
    padding: 1
  }
)

console.log(me)

const tip = [
  `Tip: Try ${chalk.cyanBright.bold(
    'cmd/ctrl + click'
  )} on the links above.`,
  '',
].join('\n')

console.log(tip)

prompt(info).then(answer => answer.action())