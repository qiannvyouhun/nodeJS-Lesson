const http=require("http");
const fs=require("fs");
const path=require("path");

http.createServer(function(req,res){
    //读取图片文件
    var imgPath=path.join(__dirname,"/1.jpg");
    var imgBuffer=fs.readFileSync(imgPath);
    //将二进制编码转换成base64编码
    var base64Data=imgBuffer.toString("base64");
    console.log(base64Data);

    //图片src的属性值固定格式"data:image/jpg;base64,"+....
    var imgSrc="data:image/jpg;base64,"+base64Data;
    //得到html文件
    var htmlStr="<!DOCTYPE html><head></head>"+
    "<body><img src='"+imgSrc+"'></body>"+"</html>";
    //将html文件向客户端响应
    res.writeHead(200,{"Cotent-Type":"text/html"});
    res.write(htmlStr);
    res.end();

}).listen(8081);

console.log("server is listening 8081");