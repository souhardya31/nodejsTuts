// How NodeJS differs from Vanilla JS 
// 1) Node rus on server - not in a browser (backend not fronted )
// 2) The console is the terminal window

// console.log('Hello World')
// // 3) Global object instead of window object
// // console.log(this)
// // console.log(global)
// // 4) has common core modules that we will explore
// // 5) CommonJS modules instead of ES6 modules

// const os = require('os')
// const path = require('path')

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// // console.log(__dirname)//directory name
// // console.log(__filename)

// console.log(path.dirname(__filename))//returns directory
// console.log(path.basename(__filename))//returns only filename
// console.log(path.parse(__filename))//returns an whole object
// console.log(path.parse(__filename).ext)

const {add, subtract, multiply, divide} = require('./math')
console.log(add(3, 5))
console.log(subtract(3, 5))
console.log(multiply(3, 5))
console.log(divide(3, 5))




