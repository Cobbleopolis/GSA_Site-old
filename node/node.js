var sys = require("sys"),
    my_http = require("http"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs"),
    mongo = require("./mongo.js");
my_http.createServer(function(request,response){
    var my_path = "/html" + url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(),my_path);
    if(my_path === "/html/"){
        full_path += "index.html";
    }
    //sys.puts("Path request: " + my_path);
    //sys.puts("Full request: " + full_path);
    //sys.puts("---------------");
    path.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
        }
        else{
            filesys.readFile(full_path, "binary", function(err, file) {
                if(err) {
                    response.writeHeader(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();

                }
                else{
                    response.writeHeader(200);

                    response.write(file, "binary");
                    response.end();
                }

            });
        }
    });
}).listen(80);
sys.puts("Server Running on 80");
mongo.test();
mongo.pageHandle();