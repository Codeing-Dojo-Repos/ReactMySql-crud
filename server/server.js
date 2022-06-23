const express = require('express')
const cors = require("cors")
const app = express()
const mysql = require('mysql')

// middle-ware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(cors({origin: ['http://localhost:3000','https://localhost:3000']}))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'petsDB'
})

app.post('/create', (req, res) => {
    console.log('Hit /create endpoint')
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    db.query('insert into users (username, password) values (?,?)', 
        [username, password],
        (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json("values inserted")
            }
        }
    )
})

app.get('/employees', (req, res) => {
    console.log('hit /employee endpoint')

    db.query('select * from users',
        (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json(result)
            }
        }    
    )
})

app.get('/employees/:id', (req, res) => {
    console.log('hit /employee/:id endpoint')

    db.query('select * from users where id=?',req.params.id,
        (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json(result)
            }
        }    
    )
})

app.put('/employees/:id', (req, res) => {
    console.log('hit /employee/id endpoint')

    db.query(`update users
                set password = ?
              where id = ?`, [req.body.password, req.params.id],
        (err, result) => {
        if (err) {
            res.status(500).send(err)
        }else{
            res.json(result)
        }
    })
        
})

app.delete('/employees/delete/:id', (req, res) => {
    console.log('hit /employee/delete/id endpoint')
    console.log("id: " + req.params.id)
    
    const sql = "delete from users where id = ?"
    db.query(sql, req.params.id, (err, result) => {
        if (err){
            res.status(500).send(err)
        } else {
            res.json(result)
        }
    })
})




app.listen(8000, ()=>{console.log("http server started... port 8000") })