/**使用方法：
    *1、打开窗口：在当前目录下点击shift+鼠标右键
    *2、编译node.js文件：node+文件名
    *3、每次修改了js文件之后，需要重新执行node+文件名
    *4、在node中的js文件，必须得编译才能执行
    *5、WebStorm
**/

//引入模块
const http = require("http");

//构造函数的参数是固定的，一个是请求对象req，一个是响应对象res
var server=http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write("hello world!");
    res.end();//响应结束
});

//接受一个8080的端口
server.listen(8080);
console.log("server is listening 8080");