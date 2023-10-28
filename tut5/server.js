const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises



const logEvents = require('./logEvents')
const EventEmitter = require('events')
class myEmitter extends EventEmitter {}

// initalize object
const Emitter = new myEmitter()
// console.log(Emitter instanceof EventEmitter)//true

Emitter.on('log', (msg, fileName) => logEvents(msg, fileName))
const PORT = process.env.PORT || 3600

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf8' : ''
        )
        const data = contentType === 'application/json'
            ? JSON.parse(rawData): rawData;
        response.writeHead(filePath.includes('404.html') ? 404: 200, {'Content-Type': contentType})
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )
    } catch (error) {
        console.error(error);   
        Emitter.emit('log', `${error.name}: ${error.message}`, 'errLog.txt')  
        response.end()
    }
}


const server = http.createServer((req, res) => {
    console.log(req.url, req.method)//req.url = url of the request(path), req.method = GET/POST/PUT/DELETE
    Emitter.emit('log', `${req.url} \t ${req.method}`, 'reqLog.txt')

    const extension = path.extname(req.url)

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpg'
            break;
        case '.json':
            contentType = 'application/json'
            break;
    
        default:
            contentType = 'text/html'
            break;
    }

    let filePath = 
        contentType === 'text/html' && req.url ==='/'
        ? path.join(__dirname, 'views', req.url, 'index.html') 
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : contentType === 'text/html'
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url)// we don't have to write views in url

    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'// we don't have to write .html in the url

    const fileExists = fs.existsSync(filePath)

    if(fileExists) {
        serveFile(filePath, contentType, res)
    } else {
        //301 - new url
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'})
                res.end()
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/'})
                res.end()
                break;
            default:
                //serve file as 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`))