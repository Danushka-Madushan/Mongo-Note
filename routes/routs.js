const express = require('express')
const router = express.Router()
const { InsertItem, RemoveItem, RequestNotes } = require('../mongo/db')

router.get('/insert', (req, res) => {
    InsertItem('7d8328d8-680b-4782-8850-551a81b876f8', 'Alex is My Friend').then((resp) => {
        res.status((resp.status ? 200 : 400)).json({_id:resp.id, message:resp.message})
    })
})

router.get('/remove', (req, res) => {
    RemoveItem('7d8328d8-680b-4782-8850-551a81b876f8').then(resp => {
        res.status((resp.status ? 200 : 400)).json({id: resp.id, dbQuery:resp})
    })
})

router.get('/request', (req, res) => {
    RequestNotes().then((resp) => {
        res.status(200).json(resp)
    })
})

module.exports = router