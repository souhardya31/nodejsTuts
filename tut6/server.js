const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500


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
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})// /* actually means all but since express executes line by line, it will only get the urls we have not specified


app.listen(PORT, () => console.log(`server running on port ${PORT}`))