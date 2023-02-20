const express = require('express')
const router = express.Router()
const { InsertItem, RemoveItem, RequestNotes } = require('../mongo/db')

router.get('/insert', (req, res) => {
    InsertItem('7d8328d8-680b-4782-8850-551a81b876f8', 'Alex is My Friend').then((stat) => {
        if (stat.status) {
            res.status(200).json({status:200, _id:stat.id})
        } else {
            res.status(200).json({status:400, _id:stat.id, error:'uuid is already in use'})
        }
    })
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