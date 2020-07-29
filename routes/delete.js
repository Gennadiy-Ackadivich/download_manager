const {Router} = require('express')
const fs = require('fs')

const {Api} = require('../api/api')

const router = Router()

router.get('/:id', async (req, res) => {
    const api = new Api()
    await api.deleteById(req.params.id)
    res.redirect('/')
})


module.exports = router