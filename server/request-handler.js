/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
// var qs = require('querystring');;
var storage = [];
var url = {};
exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */
  var statusCode = 200;
  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  // request.url = "http://127.0.0.1:3000/1/classes/chatterbox/";
  // request.headers.host = "http://127.0.0.1:3000/1/classes/chatterbox/";
  console.log("Serving request type " + request.method + " for url " + request.url);
  if (request.method === 'POST') {
    if (!(url[request.url] in url)) {
      url[request.url] = true;
      statusCode = 201;
    }
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
      request.on('end', function () {
      var post = JSON.parse(body);
      storage.push(post);
      statusCode;
    });
  }
  else if (request.method === "GET") {
    var obj = {};
    obj.results = storage;
    if (request.url.indexOf('classes') === -1) {
      statusCode = 404;
    } else {
      statusCode;
    }
  }
  // console.log(qs.stringify(storage[0]))


  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);

  /* .writeHead() tells our server what HTTP status code to send back */
  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  // response.write(chunk);

  response.end(JSON.stringify(obj));
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
