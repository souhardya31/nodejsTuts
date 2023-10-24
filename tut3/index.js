// the node_modules folder is added in the gitignore file so that it gets ignored when we store it in github

const { format } = require('date-fns')
const { v4: uuid} = require('uuid')//importing v4 as uuid

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))//\t means tab spacing

console.log("Hello World...")

console.log(uuid())// universally unique identifier