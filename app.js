require('dotenv').config()
const express = require('express')
const app = express()

// const PORT = process.env.SERVER_PORT_ACCOUNT || 3001

// app.use(express.json())
// app.use('/api', require('./src/app/routes'))

// app.listen(PORT, () => {
//     console.log('Application running on port ', PORT)
// })

const appPromise = require('./src/app/middlewares/configprovider').appPromise
 
appPromise.then(function(app) {
    const PORT = process.env.SERVER_PORT_ACCOUNT || 3001
    app.use('/api', require('./src/app/routes'))
    app.listen(PORT, () => {
        console.log('Application running on port ', PORT)
    })
});
