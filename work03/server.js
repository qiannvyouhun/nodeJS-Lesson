const http=require("http");
const fs=require("fs");
const path=require("path");
const url=require("url");
const queryString=require("querystring");
let {chapterList,userList}=require("./data");

http.createServer(function(req,res){
    //获取资源路径：
    var urlObj=url.parse(req.url);
    var pathName=urlObj.pathname;
    // console.log(pathName);
    if(pathName=="/list"){
        //得到chapterList.html页面路径
        var chapterListPath=path.join(__dirname,"/chapterList.html");
        //读取文件：
        var chapterListContent=fs.readFileSync(chapterListPath);
        //响应代码：
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(chapterListContent);
    }
    else if(pathName=="/login"){
        var loginPath=path.join(__dirname,"/login.html");
        var loginContent=fs.readFileSync(loginPath);
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(loginContent);
    }
    else if(pathName=="/listmanager"){
        var listPath=path.join(__dirname,"/list.html");
        var listContent=fs.readFileSync(listPath);
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(listContent);
    }
    else if(pathName=="/addChapter"){
        var addChapterPath=path.join(__dirname,"/addChapter.html");
        var addChapterContent=fs.readFileSync(addChapterPath);
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(addChapterContent);
    }
    else if(pathName=="/detail"){
        var ChapterPath=path.join(__dirname,"/Chapter.html");
        var ChapterContent=fs.readFileSync(ChapterPath);
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(ChapterContent);
    }
    else if(pathName.indexOf(".jpg")>=0 ||pathName.indexOf(".jpeg")>=0){
        var jpgPath=path.join(__dirname,pathName);
        var jpgContent=fs.readFileSync(jpgPath);
        res.writeHead(200,{"Content-Type":"image/jpg"});
        res.end(jpgContent);
    }
    else if(pathName.indexOf(".png")>=0){
        var pngPath=path.join(__dirname,pathName);
        var pngContent=fs.readFileSync(pngPath);
        res.writeHead(200,{"Content-Type":"image/png"});
        res.end(pngContent);
    }
    else if(pathName.indexOf(".gif")>=0){
        var gifPath=path.join(__dirname,pathName);
        var gifContent=fs.readFileSync(gifPath);
        res.writeHead(200,{"Content-Type":"image/gif"});
        res.end(gifContent);
    }
    else if(pathName.indexOf(".css")>=0){
        var cssPath=path.join(__dirname,pathName);
        var cssContent=fs.readFileSync(cssPath);
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(cssContent);
    }
    else if(pathName.indexOf(".js")>=0){
        var jsPath=path.join(__dirname,pathName);
        var jsContent=fs.readFileSync(jsPath);
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(jsContent);
    }
    else if(pathName=="/getChapterList"){
        //列表页
        var str=JSON.stringify(chapterList);
        res.end(str);
    }
    else if(pathName=="/getChapter"){
        //详情页
        console.log(queryString.parse(urlObj.query));
        var chapterId = queryString.parse(urlObj.query).chapterId;
        var detail = [];
        chapterList.forEach((data, index) => {
            if (data.chapterId == chapterId) {
                detail.push(data);
            }
        })
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var str = JSON.stringify(detail);
        res.end(str);
    }
    else if(pathName=="/getLogin"){
        //后台登录页面
        var userData="";
        req.on("data",function(chunk){
            userData+=chunk;
        });
        req.on("end",function(){
            var user=queryString.parse(userData);
            var username=user.username;
            var password=user.password;
            console.log(username,password);
            for(var i=0;i<userList.length;i++){
                if(userList[i].username==username&&userList[i].pwd==password){
                    var data=true;
                    console.log(data);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                    return;
                }
            }
            data = false;
            console.log(data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        });
    }
    else if (pathName=='/add') {
        var addData = "";
        req.on("data", function (chunk) {
            addData += chunk;
        });
        req.on("end", function () {
            var add = queryString.parse(addData);
            var title = add.title;
            var content = add.content;
            var date = new Date();
            var con = {
                "chapterId": chapterList[chapterList.length - 1].chapterId + 1,
                "chapterName": title,
                "imgPath": "",
                "chapterDes": content,
                "chapterContent": content,
                "publishTimer": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                "author": "admin",
                "views": 0
            }
            chapterList.push(con);
            data = { code: 0 };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        });
    }

}).listen(8083)
console.log("server is listening 8083");


