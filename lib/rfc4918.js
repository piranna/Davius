// HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)
//
// https://tools.ietf.org/html/rfc4918

var fs      = require('fs-extra')
var request = require('http').request
var rimraf  = require('rimraf')


function copy(src, dest, callback)
{
  dest = URL.parse(dest)

  if(!dest.host)
    return fs.copy(src, dest, callback)

  // [ToDo] Copy directories
  src = fs.createReadStream(src)

  src.on('error', callback)
  src.on('open', function()
  {
    // Based on code from https://github.com/Topface/node-replicate-http
    dest.method  = 'PUT'
//    dest.headers = {"Content-Length": src.headers['content-length']}

    dest = request(dest, function(res)
    {
      if (res.statusCode != 201 && res.statusCode != 204)
        res.on("end", function()
        {
          callback(new Error("HTTP put failed with code " + res.statusCode + " for " + to));
        })
      else
        res.on("end", callback);

      // suck stream in
      res.resume();
    });

    dest.on("error", function(error)
    {
      // because we need to put it somewhere
      src.unpipe(dest);
      src.resume();

      callback(error);
    });

    src.pipe(dest);
  })
}

function move(src, dest)
{
  dest = URL.parse(dest)

  if(!dest.host)
    return fs.move(src, dest, next)

  fs.walk(src, dest, function(error)
  {
    del(src)
  })
}


function rfc4918(req, res, next)
{
  var path = req.url
  var dest = req.headers.Destination


  function del()
  {
    rimraf(path, function(error)
    {
      if(!error) return res.end(200)

      next(error)
    })
  }

  function mkcol()
  {
//    var body = ''

    function ondata(data)
    {
//      if(onMkcolBody) return onMkcolBody(data)
//      body += data

      next(415)
    }

    req.on('data', ondata)

    req.once('end', function()
    {
      req.removeListener('data', ondata)

      fs.mkdir(path, function(error)
      {
        if(!error) return next(201)

        switch(error.code)
        {
          case 'EACCES':
          case 'ENOTDIR':
          case 'EPERM':
            next(403)
          break

          case 'EEXIST':
            next(405)
          break

          case 'ENOENT':
            next(409)
          break

          case 'EDQUOT':
          case 'ENOSPC':
            next(507)
          break

          default:
            next()
        }
      })
    })
  }


  return function(error)
  {
    if(error) return next(error)

    switch(req.method)
    {
      case 'COPY':
        copy(path, dest)
      break;

      case 'DELETE':  // For collections
        del()
      break;

      case 'MKCOL':
        mkcol()
      break;

      case 'MOVE':
        move(path, dest)
      break;

      // case 'PROPFIND':
      // break;
      //
      // case 'PROPPATCH':
      // break;

      case 'POST':  // For collections
        next(405)
      break;

      case 'PUT':  // For collections
        next(405)
      break;

      // case 'LOCK':
      // break;
      //
      // case 'UNLOCK':
      // break;

      default:
        next()
    }
  }
}


module.exports = rfc4918
