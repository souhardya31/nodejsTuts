const fs = require('fs')

const rs = fs.createReadStream('files/lorem.txt', {encoding: 'utf8'})

const ws = fs.createWriteStream('./files/new-lorem.txt')// It breaks down the data into smaller chunks and emits these chunks as events, typically 'data' event

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

rs.pipe(ws)//does the same thing
