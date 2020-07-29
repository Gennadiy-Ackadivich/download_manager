const express = require('express')
const exhbs = require('express-handlebars')

const downloadsRouter = require('./routes/download')
const addRoutes = require('./routes/add')
const deleteRoutes = require('./routes/delete')

const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

const app = express()

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: true}))

app.use('/', downloadsRouter)
app.use('/add', addRoutes)
app.use('/delete', deleteRoutes)

const PORT = process.env.port || 3000

app.listen(PORT)