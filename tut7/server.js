const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const { error } = require('console')
const PORT = process.env.PORT || 3500

// Middleware- have access to request object, response object, and the next function

app.use(logger)

const whitelist = ['http://127.0.0.1:5500', 'https://www.google.com', 'hhtp://localhost:3500']
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            // the !origin is given as our local server shows undefined origin
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))// cors - Cross Origin Resource Sharing gives access to other websites

// built-in middleware to handle urlencoded data
// form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

// built in middleware for json
app.use(express.json())

// serve static files
app.use(express.static(path.join(__dirname, '/public')))
// since we are serving all the static files from the public folder, we can just remove ../ from the paths of our css link


// ^ means start, - ^abc would match with abcdef but not with defabc
// $ means end, = $abc would match with defabc but not with abcdef
// Using ^ and $ at start and end of a text respectively means it will match only with the exact same string
app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html' ,{root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html' ,{root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/subdir/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'subdir', 'index.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html')// 302 by default
    // 302 means the redirection is temporary, while 301 means it's permanent
})


// route handlers 

app.get('/hello(.html)?', (req, res, next) => {
    console.log("helloWorld")
    next()
}, (req, res) => {
    res.send("Hello World")
})// chaining route handler's functions(not the most common way)

const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res) => {
    console.log('three')
    res.send('finished')
}

app.get('/finished(.html)?', [one, two, three])


// express can identify status of 404 by default, but we want our custom 404 file to be used
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
// })// /* actually means all but since express executes line by line, it will only get the urls we have not specified

// custom error
app.use(errorHandler)

// app.all applies for all http methods
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found"})
    } else {
        res.type('txt').send("404 Not Found")
    }
})


app.listen(PORT, () => console.log(`server running on port ${PORT}`))