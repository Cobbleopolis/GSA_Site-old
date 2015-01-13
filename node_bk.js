var sys = require("sys"),
    my_http = require("http"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs"),
    mongo = require("./mongo.js"),
    express = require('express'),
    app = express();

//my_http.createServer(function(request,response){
//    var my_path = "/html" + url.parse(request.url).pathname;
//    var full_path = path.join(process.cwd(),my_path);
//    if(my_path === "/html/"){
//        full_path += "index.html";
//    }
//    //console.log("Path request: " + my_path);
//    //console.log("Full request: " + full_path);
//    //console.log("---------------");
//    filesys.exists(full_path,function(exists){
//        if(!exists){
//            response.writeHeader(404, {"Content-Type": "text/plain"});
//            response.write("404 Not Found\n");
//            response.end();
//        }
//        else{
//            filesys.readFile(full_path, "binary", function(err, file) {
//                if(err) {
//                    response.writeHeader(500, {"Content-Type": "text/plain"});
//                    response.write(err + "\n");
//                    response.end();
//
//                }
//                else{
//                    response.writeHeader(200);
//                    mongo.pageHandle(full_path, file, response);
//                    response.write(file);
//                    response.end();
//                }
//            });
//        }
//    });
//}).listen(80);
app.configure(function () {
    app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname) //where your static content is located in your filesystem
    );
});
app.listen(3000); //the port you want to use
console.log("Server Running on 80");