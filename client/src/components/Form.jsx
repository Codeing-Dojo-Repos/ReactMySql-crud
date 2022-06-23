import React, {useState, useEffect } from 'react'
import axios from 'axios'

const Form = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/create', {
            username: username,
            password: password
        })
        .then( res => {
            console.log(res.data)
        })
        .catch( err => {
            console.log(`Error! ${err}`)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" onChange={ (e) => setUsername(e.target.value)}></input>

                <label>Password:</label>
                <input type="text" onChange={ e => setPassword(e.target.value)}></input>

                <button>Submit</button>
            </form>
        </>
    )
}
export default Form