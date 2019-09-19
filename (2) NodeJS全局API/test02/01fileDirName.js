//1、引入原生模块
const http =require("http");
const path =require("path");//请求路径
const fs=require("fs");//读取文件

//2、创建一个服务器
var server=http.createServer(function(req,res){
    var htmlPath=path.join(__dirname,"../view/view.html");//文件路径拼接
    console.log(htmlPath);//输出路径
    var htmlContent=fs.readFileSync(htmlPath);
    htmlContent=htmlContent.toString("utf8");
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(htmlContent);
    res.end();

});


//3、服务器端口
server.listen(8080);
console.log("server is listening 8080");