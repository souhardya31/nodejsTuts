// If you are here to revise make sure you create starter.txt and lorem.txt inside files folder, and then proceed. In starter.txt, write "Hello I'm Souhardya", and in lorem.txt add lorem500 text

// const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8')
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'))
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), 'promise Write')
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you.')
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'renamed.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'renamed.txt'), 'utf8')
        console.log(newData)
    } catch (err) {
        console.error(err)
    }
}

fileOps()

// without path
    // fs.readFile('files/starter.txt', 'utf8', (err, data) => {
    //     if (err) throw err
    //     console.log(data)//you can either write it as data.toString() or specify 'utf8'
    // })

    // console.log('Hello....')// This line will be executed first as the fs.readFile is an asynchronous function

    // // exit on uncaught errors
    // process.on('uncaughtException', err => {
    //     console.error(`There was an uncaught error: ${err}`)
    //     process.exit(1)
    // })
// with path

    
    

    // fs.readFile(path.join(__dirname, 'files', 'starter.txt'), (err, data) => {
    //     if (err) throw err
    //     console.log(data.toString())
    // })

    // console.log('Hello....')// This line will be executed first as the fs.readFile is an asynchronous function

    // fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err) => {
    //     if (err) throw err
    //     console.log("Write complete")

    //     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\ntesting text', (err) => {
    //         if (err) throw err
    //         console.log("Append1 complete")

    //         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'renamed.tx'), (err) => {
    //             if (err) throw err
    //             console.log("rename complete")
    //         })

    //     })//If we wanna create a file and change it, than it's better to call it inside the writeFile function

    // })// Since it's written after readFile, if there's an error in readFile, then only file will be created, no text will be written

    // fs.appendFile(path.join(__dirname, 'files', 'lorem.txt'), 'testing text', (err) => {
    //     if (err) throw err
    //     console.log("Append2 complete")
    // })



    // exit on uncaught errors
    // process.on('uncaughtException', err => {
    //     console.error(`There was an uncaught error: ${err}`)
    //     process.exit(1)
    // })

    // console.log(__dirname)
    
