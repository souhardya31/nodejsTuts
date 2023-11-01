const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const corsOptions = require('./configuration/corsOptions')
const PORT = process.env.PORT || 6000

app.use(logger)

app.use(cors(corsOptions))


app.use(express.urlencoded({ extended: false }))

app.use(express.json())

// serve static files
app.use(express.static(path.join(__dirname, '/public')))

app.use(require('./routes/root'))
app.use('/employees', require('./routes/api/employees'))




// ^ means start, - ^abc would match with abcdef but not with defabc
// $ means end, = $abc would match with defabc but not with abcdef
// Using ^ and $ at start and end of a text respectively means it will match only with the exact same string

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