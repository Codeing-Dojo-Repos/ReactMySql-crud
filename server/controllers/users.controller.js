const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'petsDB'
})

module.exports = {

    createUser: (req, res) => {
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