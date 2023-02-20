const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).render('index.html')
})

const dbRoutes = require('./routes/routs')
app.use('/db', dbRoutes)

app.listen(5000) // localhost:5000
