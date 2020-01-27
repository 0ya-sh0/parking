const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/public')))
app.get('/', (req, res) => { res.redirect('display.html') })

let state = {}

for (const ch of ['A', 'B', 'C']) {
    for (let i = 1; i <= 3; i++) {
        state[`${ch}-${i}`] = 1
    }
}

app.get('/api/state', (req, res) => {
    res.json(state)
})

app.post('/api/state', (req, res) => {
    console.log(req.body)
    state = req.body
    res.json(state)
})


app.listen(port, () => console.log(`Parking app listening on port ${port}!`))