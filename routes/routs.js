const express = require('express')
const router = express.Router()
const { InsertItem, RemoveItem, RequestNotes } = require('../mongo/db')

router.use(express.json())

router.post('/insert', (req, res) => {
    console.log(req.body)
    InsertItem(req.body.id, req.body.content).then((resp) => {
        res.status((resp.status ? 200 : 400)).json({_id:resp.id, message:resp.message})
    })
})

router.post('/remove', (req, res) => {
    RemoveItem(req.body.id).then((resp) => {
        res.status((resp.status ? 200 : 400)).json({id: resp.id, dbQuery:resp.message})
    })
})

router.get('/request', (req, res) => {
    RequestNotes().then((resp) => {
        res.status(200).json(resp)
    })
})

module.exports = router