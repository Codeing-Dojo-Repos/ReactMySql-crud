const mysql = require('mysql')
const crypto = require('crypto')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'rootroot',
    database: 'petsDB'
})

module.exports = {

    createUser: (req, res) => {
        console.log('Hit /create endpoint')
        console.log(req.body)
        const username = req.body.username
        const password = req.body.password

        let buffer = crypto.randomBytes(8).toString('hex')
        console.log(`buffer: ${buffer}`)
        hash = crypto.createHash('md5').update(password+buffer).digest('hex')
        console.log(`Password hash is ${hash}`)
        

        db.connect( (err) => {
            if (err) {
                console.log("Error connecting, ")
                throw err
            }
            db.query('insert into users (username, password) values (?,?)', 
                [username, hash],
                (err, result) => {
                    if (err) {
                        console.log("Error in /create")
                        res.status(500).send(err)
                    } else {
                        console.log("Values inserted")
                        res.json("values inserted")
                    }
                }
            )
        })
    },

    getUsers: (req, res) => {
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
    },

    getUserById: (req, res) => {
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
    },

    updateUserById: (req, res) => {
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
    },

    deleteUserById: (req, res) => {
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
    }
}