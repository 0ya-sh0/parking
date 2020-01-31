const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/public')))
app.get('/', (req, res) => { res.redirect('display.html') })

let arduinoState = "0000"

app.get('/api/state', (req, res) => {
    res.json({
        "A-1" : parseInt(arduinoState[0]),
        "B-1" : parseInt(arduinoState[1]),
        "C-1" : parseInt(arduinoState[2]),
        "D-1" : parseInt(arduinoState[3])
    })
})

app.get('/api/arduino/:value', (req, res) => {
    console.log(`New value recieved : ${req.params.value}`)
    arduinoState = req.params.value
    res.json({value: req.params.value});
})


app.listen(port, () => console.log(`Parking app listening on port ${port}!`))