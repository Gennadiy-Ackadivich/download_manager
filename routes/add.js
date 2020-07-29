const {Router} = require('express')
const fs = require('fs')

const {Api} = require('../api/api')

const router = Router()

router.get('/', (req, res) => {
    res.render('add')
})

router.post('/', async (req, res) => {
    try {
        const api = new Api()
        await api.fetchAdd({...req.body, id: Date.now()})
        console.log(1)
        res.redirect('/')
    } catch (e) {
        throw new Error(e)
    }
})



module.exports = router