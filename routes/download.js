const {Router} = require('express')
const {Api, Formatter} = require('../api/api')

const router = Router()

router.get('/', async (req, res) => {
    const api = new Api()
    const data = await api.fetchAll()
    const result = await new Formatter(data).all()
    res.render('download', {title: "download page", data: JSON.parse(result)})
})

module.exports = router