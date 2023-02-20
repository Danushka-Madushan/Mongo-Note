const express = require('express')
const router = express.Router()
const { InsertItem, RemoveItem, RequestNotes } = require('../scripts/mongo')

router.get('/insert', (req, res) => {
    InsertItem('7d8328d8-680b-4782-8850-551a81b876f8', 'Alex is My Friend').catch(console.dir);
    res.status(200).send('OK')
})

router.get('/remove', (req, res) => {
    RemoveItem('7d8328d8-680b-4782-8850-551a81b876f8').catch(console.dir);
    res.status(200).send('OK')
})

router.get('/request', (req, res) => {
    RequestNotes().then((data) => {
        res.status(200).json(data)
    })
})

module.exports = router