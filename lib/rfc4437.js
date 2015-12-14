// Web Distributed Authoring and Versioning (WebDAV) Redirect Reference Resources
//
// http://greenbytes.de/tech/webdav/rfc4437.html

var fs = require('fs')


function rfc4437(req, res, next)
{
  var path = req.url
  var dest = req.headers.Destination


  return function(error)
  {
    if(error) return next(error)

    switch(req.method)
    {
      case 'MKREDIRECTREF':
        fs.symlink(dest, path, next)
      break;

      case 'UPDATEREDIRECTREF':
        fs.unlink(path, function(error)
        {
          if(error && error.code !== 'ENOEXIST') return next(error)

          fs.symlink(dest, path, next)
        })
      break;

      default:
        next()
    }
  }
}


module.exports = rfc4437
