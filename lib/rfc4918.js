// HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)
//
// https://tools.ietf.org/html/rfc4918

var fs = require('fs-extra')


function copy(src, dest)
{
  dest = URL.parse(dest)

  if(!dest.host)
    return fs.copy(src, dest, next)

  localCopy(src, dest)
}

function move(src, dest)
{
  dest = URL.parse(dest)

  if(!dest.host)
    return fs.move(src, dest, next)

  fs.walk(src, dest, function(error)
  {
    delete(src)
  })
}


function rfc4918(req, res, next)
{
  var path = req.url

  function mkcol()
  {
    // [ToDo] Wait for body

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
  }


  return function(error)
  {
    if(error) return next(error)

    var dest = req.headers.Destination

    switch(req.method)
    {
      case 'COPY':
        copy(src, dest)
      break;

      case 'MKCOL':
        mkcol()
      break;

      case 'MOVE':
        move(src, dest)
      break;

      // case 'PROPFIND':
      // break;
      //
      // case 'PROPPATCH':
      // break;
      //
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


module.export = rfc4918
