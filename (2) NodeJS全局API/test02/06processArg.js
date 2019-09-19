const http=require("http");
var arg=process.argv[2];
if(arg==undefined){
    console.log("命令行参数错误！");
}
else if(arg=="-h"){
   console.log("帮助：命令行参数需要为算术运算式");
}
else {
    var result=eval(arg);
    console.log(arg+"=%s",result);
}