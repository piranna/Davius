# Davius
The obvious DAV server

Davius is a HTTP/WebDAV server that offer the content from the filesystem. You
can see it as the big brother of other static web servers like
[serve-static](https://github.com/expressjs/serve-static).

It's mostly focused to serve static content for NodeOS graphic applications, but
can be used wherever you want to expose a directory over HTTP and/or allow to
modify its content using WebDAV. It supports:

## Features

* HTTP 1.1 with RANGE header (also on PUT upload)
* WebDAV extensions (`COPY`, `MKCOL` and `MOVE`) [rfc4918](https://tools.ietf.org/html/rfc4918)
* Creation of symlinks [rfc4437](http://greenbytes.de/tech/webdav/rfc4437.html)

## Antifeatures

* `PATCH`
* `PROPFIND`
* `PROPPATCH`
* `LOCK`
* `UNLOCK`
* Extended `MKCOL` [rfc5689](http://www.ietf.org/rfc/rfc5689.txt)


## Why the name

Thinking about the *DAV* word it came to my mind the name of a friend of my
girlfriend (although she doesn't still know she is, it's a secret, shh... ;-) ),
and it was the *obvious* name :-D

Also, according to Google Translate, *davius* means *road of the penguin* in
Albanian. That's funny, and I love penguins :-P
