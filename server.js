var readDir = require('fs').readDir

var oneshoot = require('oneshoot')

var finalhandler = require('finalhandler')
var minimist     = require('minimist')
var recv         = require('recv')
var serveStatic  = require('serve-static')

var rfc4918 = require('./rfc4918')
var rfc4437 = require('./rfc4437')


const HOME = process.env.HOME


// Check arguments
var args = minimist(process.argv.slice(2),
{
  string: 'hostname',
  default:
  {
    hostname: '0.0.0.0',
    port: 0
  }
})


// Create server
var server = createServer(args.timeout)


// HTTP
var options =
{
  dotfiles: 'allow',
  index: function(path)
  {
    var res = this.res

    readDir(path, function(error, files)
    {
      if(error) return next(error)

      res.setHeaders('Content-Type', 'application/json')
      res.end(JSON.stringify(files))
    })
  }
}

var static = serveStatic(HOME, options)

server.on('request', function(req, res)
{
  var done = finalhandler(req, res)

  var symlinks = rfc4437(req, res, done)
  var dav      = rfc4918(req, res, symlinks)
  var httpRecv = recv   (req, res, dav)

  static(req, res, httpRecv)
})


// Start server
server.listen(args.port, args.hostname, function()
{
  var port = this.address().port

  // Executed with `child_process.fork()`, send port over comunnication channel
  if(process.send) return process.send(port)

  // Running standalone, show port on stdout
  console.log(port)
})
