const http=require("http");
const fs=require("fs");
const path=require("path");

var userName=process.argv[2];
var passWord=process.argv[3];


if(userName!=undefined&&passWord!=undefined){
    var loginStr=userName+":"+passWord;
    var buf=Buffer.from(loginStr,"utf-8");
    var base64Str=buf.toString("base64");
    console.log("用户名："+userName+" 密码："+passWord);
    console.log("base64加密："+base64Str);
}
else{
    console.log("用户名和密码不能为空！");
}


