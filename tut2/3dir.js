const fs = require('fs')

if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err
        console.log('Directory created')
    })
}//mkdir stands for make directories

if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err
        console.log('Directory Deleted')
    })
}//rmdir stands for remove directories