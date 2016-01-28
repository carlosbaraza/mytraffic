var fs = require('fs')
var moment = require('moment')

var CronJob = require('cron').CronJob;

// PhantomJS
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

init()

function init() {
  'use strict'
  mkdir('./images')

  new CronJob('0 */5 * * * *', takeScreenshot, null, true, 'CET')
}

function takeScreenshot() {
  var now = moment()
  var dir = path.join(__dirname, 'images', now.format('YYYY-MM-DD'))
  mkdir(dir)

  var imgPath = path.join(dir, now.format('YYYY-MM-DD-HHmmss') + '.png')
  var childArgs = [
    path.join(__dirname, 'mytraffic.js'),
    imgPath
  ]

  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    if (err) console.log(err)
    if (stdout) console.log(stdout)
    if (stderr) console.log(stderr)
  })
}

function mkdir(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}
