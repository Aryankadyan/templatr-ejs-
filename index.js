const express = require('express')
const app = express()
const path = require('path')
const redditData = require('./data.json')
const { name } = require('ejs')

// Serving Static Assests in Express
// app.use(express.static('public'))
// OR (both are correct )
app.use(express.static(path.join(__dirname, 'public')))
// this one just join the ejs path with its directory name.

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cats', (req, res) => {
    const cats = [
        'Bluer', 'Rocket', 'Montyt', 'Rolly', 'Lucy'
    ]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params
    const data = redditData[subreddit]
    if (data) {
        res.render('subreddit', { ...data })
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1
    res.render('random', { num })
})

app.listen(8000, () => {
    console.log("LISTENING ON PORT 8000")
})  