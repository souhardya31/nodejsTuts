const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises


const logEvents = require('./logEvents')
const EventEmitter = require('events')
class MyEmitter extends EventEmitter { };

//initialize object
const myEmitter = new MyEmitter()
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName))
const PORT = process.env.PORT || 3500// it's basically checking if there's a value for port in the current environment. If not(in this case) it will store port as 3500

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf8': ''
        )
        const data = contentType === 'application/json'
            ? JSON.parse(rawData): rawData;
            response.writeHead(filePath.includes('404.html') ? 404: 200, 
            { 'Content-Type': contentType }
        )
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )
    } catch (err) {
        console.log(err)
        myEmitter.emit('log', `${err.name}: ${err.messgae}`, 'errLog.txt')
        response.statusCode = 500
        response.end()
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)//req.url = url of the request, req.method = http method GET/POST/PUT/DELETE, ETC
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')

    const extension = path.extname(req.url)

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
            break;
    }

    let filePath = 
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ?path.join(__dirname, 'views', req.url)
                    :path.join(__dirname, req.url);//since we have done this, we don't have to write /views in the url

        if (!extension && req.url.slice(-1) !== '/') filePath += '.html'//makes the .html extension not required in the browser

        const fileExists = fs.existsSync(filePath)

        if (fileExists) {
            //serve the file
            serveFile(filePath, contentType, res)
        } else {
            //301- new url
            switch(path.parse(filePath).base) {
                case 'old-page.html':
                    res.writeHead(301, {'Location': '/new-page.html'})
                    res.end()
                    break;
                case 'www-page.html':
                    res.writeHead(301, {'Location': '/'})
                    res.end()
                    break;
                default:
                    //serve a 404 response
                    serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
            }
            
            // console.log(path.parse(filePath))// this will show the filePath that doesn't exist, so we need to write different codes for different errors
        }
});
server.listen(PORT, () => console.log(`server running on port ${PORT}`))