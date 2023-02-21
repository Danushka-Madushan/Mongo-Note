const express = require('express')
const app = express()

const dbRoutes = require('./routes/routs')

app.use(express.static('public'))
app.use('/db', dbRoutes)

app.get('/', (req, res) => {
    res.status(200).render('index.html')
})

app.listen(5000) // localhost:5000
