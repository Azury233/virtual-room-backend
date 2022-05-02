var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')
const port = 8888

var server = http.createServer(function(request, response){
  var pathObj = url.parse(request.url, true);
  response.setHeader('Content-Type',getContentType(pathObj))
  //static文件夹的绝对路径
  var staticPath = path.resolve(__dirname, '')
  //获取资源文件绝对路径
  var filePath = path.join(staticPath, pathObj.pathname)
  if(!filePath.endsWith('favicon.ico')){//屏蔽浏览器默认对favicon.ico的请求
  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      console.log('404')
      response.writeHead(404, 'not found')
      response.end('<h1>404 Not Found</h1>')
    }else{
      response.write(fileContent, 'binary')
      response.end()
    }
  })
}

})
function getContentType(path){
  switch (path.pathname.replace(/.+\.(\w+)$/,"$1")) {
    case 'html':
    case 'htm':
      return "text/html;charset=utf-8"
    case 'jpg':
    case 'jpeg':
    case 'png':
      return "image/jpeg"
    default:
      return "text/plain;charset=utf-8";
  }
}

server.listen(port)
console.log('服务已启动：http://localhost:'+port)