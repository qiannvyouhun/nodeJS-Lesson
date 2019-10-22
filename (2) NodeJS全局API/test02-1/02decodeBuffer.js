var base64Str = 'emhhbmdzYW46MTIzNDU2';
var buf2 = Buffer.from(base64Str,"base64");//转换为base64
console.log(buf2.toString("utf8"));//转换为utf-8并且读取
