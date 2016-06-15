# Davius
The obvious DAV server

Davius is a HTTP/WebDAV server that offer the content from the filesystem. You
can see it as the big brother of other static web servers like
[serve-static](https://github.com/expressjs/serve-static).

It's mostly focused to serve static content for NodeOS graphic applications, but
can be used wherever you want to expose a directory over HTTP and/or allow to
modify its content using WebDAV.

## Features

* HTTP 1.1 with RANGE header (also for [partial PUT uploads](http://stackoverflow.com/a/6711496/586382))
* WebDAV extensions (`COPY`, `MKCOL` and `MOVE`) [rfc4918](https://tools.ietf.org/html/rfc4918)
* Creation of symlinks [rfc4437](http://greenbytes.de/tech/webdav/rfc4437.html)

## Antifeatures (maybe in the future?)

* `PATCH` [rfc5789](https://tools.ietf.org/html/rfc5789) (maybe as alternative for [partial PUT uploads](http://tus.io/protocols/resumable-upload.html#comment-866226341)?)
* `PROPFIND`, `PROPPATCH`, `LOCK` and `UNLOCK` WebDAV methods
* Extended `MKCOL` [rfc5689](http://www.ietf.org/rfc/rfc5689.txt)


## Why the name

Thinking about the *DAV* word it came to my mind the name of a friend of my
girlfriend (although she still doesn't know she is, it's a secret, shh... ;-) ),
and it was the *obvious* name :-D

Also, according to Google Translate, *davius* means *road of the penguin* in
Albanian. That's funny, and I love penguins :-P
