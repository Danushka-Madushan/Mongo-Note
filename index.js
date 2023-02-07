const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    console.log('User is in Home Page')
    res.status(200).send('OK')
})

const dbRoutes = require('./routes/routs')
app.use('/db', dbRoutes)

app.listen(5000)