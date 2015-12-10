// Web Distributed Authoring and Versioning (WebDAV) Redirect Reference Resources
//
// http://greenbytes.de/tech/webdav/rfc4437.html

var fs = require('fs')


function rfc4437(req, res, next)
{
  var path = req.url
  var destination


  return function(error)
  {
    if(error) return next(error)

    switch (req.method) {
      case 'MKREDIRECTREF':
        fs.symlink(destination, path, next)
      break;

      case 'UPDATEREDIRECTREF':
        fs.unlink(path, function(error)
        {
          if(error && error.code !== 'ENOEXIST') return next(error)

          fs.symlink(destination, path, next)
        })
      break;

      default:
        next()
    }
  }
}


module.export = rfc4437
