const express = require('express')
const router = express.Router() //db
// /db/save
router.get('/save', (req, res) => {
    console.log('User is in Home Page')
    res.status(200).send('OK')
})

module.exports = router