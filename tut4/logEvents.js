// the node_modules folder is added in the gitignore file so that it gets ignored when we store it in github

const { format } = require('date-fns')
const { v4: uuid} = require('uuid')//importing v4 as uuid


const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), `yyyyMMdd\tHH:mm:ss`)}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventing.txt'), logItem)
    } catch (err) {
        console.error(err)
    }
}

module.exports = logEvents;

// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))//\t means tab spacing

// console.log("Hello World...")

// testing

// console.log(uuid())// universally unique identifier