const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/api')
const methodOverride = require('method-override')
const dbConnect = require('./configs/db')
require('dotenv').config()
const app = express(); 
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(jsonParser)
app.use(urlencodedParser)

app.use(express.static('public'))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method
        delete req.body._method
        return method
    }
}))

routes(app)

dbConnect()
.then(() => console.log('connected to db'))
.catch(_ => console.log('error connecting to db '))

app.listen(3001, () => {
    console.log('app started')
})