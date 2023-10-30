const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html' ,{root: __dirname})
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html' ,{root: __dirname})
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
})

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html')// 302 by default
    // 302 means the redirection is temporary, while 301 means it's permanent
})

module.exports = router