const http = require("http");

const server = http.createServer()

server.on("request", function ( request , response ){
    if(request.url === "/"){
        response.write("bonjour les amis")
        response.end()
    }

    if(request.url === "/contact"){
        const html = `<input type="text" placeholder="Email" />`;
        response.write(html)
        response.end
    }
})
 server.listen( 4000 , "localhost" )