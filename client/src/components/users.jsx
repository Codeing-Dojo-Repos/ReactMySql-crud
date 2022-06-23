import React, {useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {
     const [users, setUsers] = useState([])

    const getEmployees = (e) => {
        axios.get('http://localhost:8000/employees')
            .then( res => {
                console.log(res)
                setUsers(res.data)
            })
            .catch( err => {
                console.log(`Error! ${err}`)
            })
    }

    return (
        <div>
            {
                users.map( (u, key) => (
                    <p>{u.username} {u.password}</p>
                ))
            }
            <button onClick={getEmployees}>get employees</button>
        </div>
    )
}

export default Users