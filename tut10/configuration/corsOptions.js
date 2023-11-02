const whitelist = [
    'http://127.0.0.1:5500', 
    'https://www.google.com', 
    'hhtp://localhost:3500'
]
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

module.exports = corsOptions